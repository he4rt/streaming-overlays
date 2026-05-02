import { useEffect, useState } from "react";
import type { SpotifyNowPlaying } from "@/shared/types";

const API_URL = "/api/spotify/now-playing";
const POLL_INTERVAL = 5_000;

interface SpotifyNowPlayingApiResponse extends SpotifyNowPlaying {
  configured?: boolean;
}

interface UseSpotifyNowPlayingResult {
  nowPlaying: SpotifyNowPlaying;
  configured: boolean;
  isLoading: boolean;
}

const EMPTY_NOW_PLAYING: SpotifyNowPlaying = {
  isPlaying: false,
  progressMs: 0,
  updatedAt: "",
  track: null,
};

export function useSpotifyNowPlaying(): UseSpotifyNowPlayingResult {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlaying>(EMPTY_NOW_PLAYING);
  const [configured, setConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok || !active) return;

        const data = (await res.json()) as SpotifyNowPlayingApiResponse;
        if (!active) return;

        const next: SpotifyNowPlaying = {
          isPlaying: Boolean(data.isPlaying),
          progressMs: data.progressMs ?? 0,
          updatedAt: data.updatedAt ?? "",
          track: data.track ?? null,
        };

        setConfigured(Boolean(data.configured));
        setNowPlaying((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
          return next;
        });
      } catch {
        if (!active) return;
      } finally {
        if (active) setIsLoading(false);
      }
    }

    poll();
    const id = setInterval(poll, POLL_INTERVAL);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return { nowPlaying, configured, isLoading };
}
