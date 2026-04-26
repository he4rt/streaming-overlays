import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage } from "@/shared/types";

const WS_URL =
  "wss://backend.chat.restream.io/ws/embed?token=54eceb28-9f1a-4117-bcfd-a84876a526d5";

export function useRestreamChat(maxMessages = 12) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout>>();

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data as string);
        if (parsed.action === "event" && parsed.payload?.eventPayload) {
          const ep = parsed.payload.eventPayload;
          const msg: ChatMessage = {
            user: ep.author?.displayName ?? "anon",
            color: "#A855F7",
            msg: ep.text ?? "",
            key: Date.now(),
          };
          setMessages((prev) => [...prev.slice(-(maxMessages - 1)), msg]);
        }
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
