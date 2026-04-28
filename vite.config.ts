import { defineConfig, type Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { SpotifyNowPlaying } from "./src/shared/types";

interface SpotifyEnv {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
}

function configApiPlugin(env: SpotifyEnv): Plugin {
  let configData: Record<string, unknown> = {};
  let chatMessages: unknown[] = [];
  let spotifyAccessToken: string | null = null;
  let spotifyAccessTokenExpiresAt = 0;
  let nowPlayingCache: SpotifyNowPlaying | null = null;
  let nowPlayingCacheExpiresAt = 0;
  let nowPlayingInFlight: Promise<SpotifyNowPlaying> | null = null;

  const SPOTIFY_TOKEN_SKEW_MS = 30_000;
  const NOW_PLAYING_CACHE_MS = 3_000;

  function emptyNowPlaying(): SpotifyNowPlaying {
    return {
      isPlaying: false,
      progressMs: 0,
      updatedAt: new Date().toISOString(),
      track: null,
    };
  }

  function getSpotifyCredentials() {
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = env.SPOTIFY_REFRESH_TOKEN;
    if (!clientId || !clientSecret || !refreshToken) return null;
    return { clientId, clientSecret, refreshToken };
  }

  async function fetchSpotifyAccessToken() {
    const creds = getSpotifyCredentials();
    if (!creds) throw new Error("spotify env vars missing");

    const validUntil = spotifyAccessTokenExpiresAt - SPOTIFY_TOKEN_SKEW_MS;
    if (spotifyAccessToken && Date.now() < validUntil) return spotifyAccessToken;

    const basicAuth = Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: creds.refreshToken,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text().catch(() => "");
      throw new Error(`spotify token error ${tokenRes.status}: ${errText}`);
    }

    const tokenData = (await tokenRes.json()) as {
      access_token?: string;
      expires_in?: number;
    };
    if (!tokenData.access_token) throw new Error("spotify token payload missing access_token");

    spotifyAccessToken = tokenData.access_token;
    spotifyAccessTokenExpiresAt = Date.now() + (tokenData.expires_in ?? 3600) * 1000;
    return spotifyAccessToken;
  }

  async function fetchNowPlayingFromSpotify(accessToken: string): Promise<Response> {
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  function parseNowPlaying(data: unknown): SpotifyNowPlaying {
    if (!data || typeof data !== "object") return emptyNowPlaying();
    const parsed = data as {
      is_playing?: boolean;
      progress_ms?: number;
      currently_playing_type?: string;
      item?: {
        id?: string;
        name?: string;
        duration_ms?: number;
        external_urls?: { spotify?: string };
        artists?: Array<{ name?: string }>;
        album?: {
          name?: string;
          images?: Array<{ url?: string }>;
        };
      };
    };

    const item = parsed.item;
    if (!item || parsed.currently_playing_type !== "track") {
      return {
        isPlaying: Boolean(parsed.is_playing),
        progressMs: parsed.progress_ms ?? 0,
        updatedAt: new Date().toISOString(),
        track: null,
      };
    }

    const artists = item.artists?.map((a) => a.name).filter((name): name is string => Boolean(name)) ?? [];

    return {
      isPlaying: Boolean(parsed.is_playing),
      progressMs: parsed.progress_ms ?? 0,
      updatedAt: new Date().toISOString(),
      track: {
        id: item.id ?? "",
        name: item.name ?? "Faixa desconhecida",
        album: item.album?.name ?? "Álbum desconhecido",
        artists: artists.join(", "),
        coverUrl: item.album?.images?.[0]?.url ?? null,
        trackUrl: item.external_urls?.spotify ?? null,
        durationMs: item.duration_ms ?? 0,
      },
    };
  }

  async function fetchSpotifyNowPlaying(): Promise<SpotifyNowPlaying> {
    const creds = getSpotifyCredentials();
    if (!creds) return emptyNowPlaying();

    if (nowPlayingCache && Date.now() < nowPlayingCacheExpiresAt) {
      return nowPlayingCache;
    }

    if (nowPlayingInFlight) return nowPlayingInFlight;

    nowPlayingInFlight = (async () => {
      try {
        let accessToken = await fetchSpotifyAccessToken();
        let currentRes = await fetchNowPlayingFromSpotify(accessToken);

        if (currentRes.status === 401) {
          spotifyAccessToken = null;
          spotifyAccessTokenExpiresAt = 0;
          accessToken = await fetchSpotifyAccessToken();
          currentRes = await fetchNowPlayingFromSpotify(accessToken);
        }

        if (currentRes.status === 204) {
          const payload = emptyNowPlaying();
          nowPlayingCache = payload;
          nowPlayingCacheExpiresAt = Date.now() + NOW_PLAYING_CACHE_MS;
          return payload;
        }

        if (!currentRes.ok) {
          const errText = await currentRes.text().catch(() => "");
          throw new Error(`spotify now-playing error ${currentRes.status}: ${errText}`);
        }

        const payload = parseNowPlaying(await currentRes.json());
        nowPlayingCache = payload;
        nowPlayingCacheExpiresAt = Date.now() + NOW_PLAYING_CACHE_MS;
        return payload;
      } catch {
        const payload = emptyNowPlaying();
        nowPlayingCache = payload;
        nowPlayingCacheExpiresAt = Date.now() + NOW_PLAYING_CACHE_MS;
        return payload;
      } finally {
        nowPlayingInFlight = null;
      }
    })();

    return nowPlayingInFlight;
  }

  return {
    name: "config-api",
    configureServer(server) {
      server.middlewares.use("/api/config", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }

        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(configData));
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
          req.on("end", () => {
            try {
              configData = JSON.parse(body);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "invalid json" }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end();
      });

      server.middlewares.use("/api/chat", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }

        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(chatMessages));
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
          req.on("end", () => {
            try {
              chatMessages = JSON.parse(body);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "invalid json" }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end();
      });

      server.middlewares.use("/api/spotify/now-playing", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "GET") {
          res.statusCode = 405;
          res.end();
          return;
        }

        const payload = await fetchSpotifyNowPlaying();
        const hasSpotifyEnv = Boolean(getSpotifyCredentials());

        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            ...payload,
            configured: hasSpotifyEnv,
          })
        );
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), configApiPlugin(env)],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      host: true,
      port: 5173,
    },
  };
});
