import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatBadge, ChatMessage, ChatPart } from "@/shared/types";

interface RestreamReplace {
  from: number;
  to: number;
  type: string;
  payload?: { url?: string };
}

// Twitch v1 URLs are PNG-only (static frame even for animated emotes).
// v2 `/default/` serves WebP that animates when the emote is animated, PNG otherwise.
// `https://static-cdn.jtvnw.net/emoticons/v1/<id>/3.0`
//   → `https://static-cdn.jtvnw.net/emoticons/v2/<id>/default/dark/1.0`
function toAnimatedUrl(url: string): string {
  const v1 = url.match(
    /^https:\/\/static-cdn\.jtvnw\.net\/emoticons\/v1\/([^/]+)\/[\d.]+\/?$/,
  );
  if (v1) {
    return `https://static-cdn.jtvnw.net/emoticons/v2/${v1[1]}/default/dark/1.0`;
  }
  // Already v2 — just normalize the size
  return url.replace(/\/[\d.]+\/?$/, "/1.0");
}

function buildParts(text: string, replaces: RestreamReplace[] | undefined): ChatPart[] {
  const imageReplaces = (replaces ?? [])
    .filter((r) => r.type === "imageUrl" && r.payload?.url && r.from < r.to)
    .sort((a, b) => a.from - b.from);

  if (imageReplaces.length === 0) return [{ type: "text", value: text }];

  const chars = Array.from(text); // safe for surrogate pairs
  const parts: ChatPart[] = [];
  let cursor = 0;

  for (const r of imageReplaces) {
    if (r.from < cursor) continue; // overlap — skip
    if (r.from > cursor) {
      const slice = chars.slice(cursor, r.from).join("");
      if (slice) parts.push({ type: "text", value: slice });
    }
    // `to` is inclusive in Restream payloads — slice end is to + 1
    const end = r.to + 1;
    const alt = chars.slice(r.from, end).join("").trim() || "emote";
    const url = toAnimatedUrl(r.payload!.url!);
    parts.push({ type: "emote", url, alt });
    cursor = end;
  }

  if (cursor < chars.length) {
    const tail = chars.slice(cursor).join("");
    if (tail) parts.push({ type: "text", value: tail });
  }
  return parts;
}

const WS_URL =
  "wss://backend.chat.restream.io/ws/embed?token=54eceb28-9f1a-4117-bcfd-a84876a526d5";

const TWITCH_SOURCE_ID = 2;
const KICK_SOURCE_ID = 29;

const PROVIDER_COLORS = [
  "#A855F7", "#EC4899", "#22D3EE", "#34D399",
  "#F97316", "#3B82F6", "#FACC15", "#06B6D4",
];

function pickColor(username: string): string {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PROVIDER_COLORS[Math.abs(hash) % PROVIDER_COLORS.length]!;
}

export function useRestreamChat(maxMessages = 12) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout>>();
  const seenIds = useRef<Set<string>>(new Set());

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data as string);
        if (parsed.action !== "event") return;

        const { eventSourceId, eventPayload, eventIdentifier } = parsed.payload;
        if (!eventPayload?.text) return;

        if (seenIds.current.has(eventIdentifier)) return;
        seenIds.current.add(eventIdentifier);
        if (seenIds.current.size > 200) {
          const arr = Array.from(seenIds.current);
          seenIds.current = new Set(arr.slice(-100));
        }

        const isTwitch = eventSourceId === TWITCH_SOURCE_ID;
        const isKick = eventSourceId === KICK_SOURCE_ID;
        if (!isTwitch && !isKick) return;

        const author = eventPayload.author;
        const username = author?.displayName ?? author?.username ?? "anon";
        const color = isTwitch
          ? (author?.color || pickColor(username))
          : pickColor(username);

        const parts = buildParts(eventPayload.text, eventPayload.replaces);
        const badges: ChatBadge[] = Array.isArray(author?.badges)
          ? author.badges
              .filter((b: any) => b?.imageUrl)
              .slice(0, 3)
              .map((b: any) => ({ imageUrl: b.imageUrl, title: b.title ?? "" }))
          : [];

        const msg: ChatMessage = {
          user: username,
          color,
          msg: eventPayload.text,
          key: Date.now(),
          provider: isTwitch ? "twitch" : "kick",
          parts,
          badges,
        };

        setMessages((prev) => [...prev.slice(-(maxMessages - 1)), msg]);
      } catch {
        // ignore non-JSON frames
      }
    };

    ws.onclose = () => {
      reconnectTimeout.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, [maxMessages]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return messages;
}