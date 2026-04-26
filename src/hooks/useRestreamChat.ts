import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage } from "@/shared/types";

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

        const msg: ChatMessage = {
          user: username,
          color,
          msg: eventPayload.text,
          key: Date.now(),
          provider: isTwitch ? "twitch" : "kick",
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