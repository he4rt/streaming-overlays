import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { ChatMessage } from "@/shared/types";
import { useOverlayConfig } from "./useOverlayConfig";
import { useRestreamChat } from "./useRestreamChat";
import { SAMPLE_CHAT } from "@/shared/chat/sample-messages";

const ChatContext = createContext<ChatMessage[]>([]);

export function useChatMessages(): ChatMessage[] {
  return useContext(ChatContext);
}

function useSampleChat(maxMessages = 12): ChatMessage[] {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT.slice(0, 8));

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-(maxMessages - 1)), { ...next, key: Date.now() }];
      });
    }, 2400);
    return () => clearInterval(id);
  }, [maxMessages]);

  return messages;
}

function useChatApi(maxMessages: number, enabled: boolean): ChatMessage[] {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!enabled) return;
    let active = true;

    const poll = async () => {
      try {
        const res = await fetch("/api/chat");
        if (!res.ok || !active) return;
        const data = await res.json();
        if (!active || !Array.isArray(data)) return;
        setMessages(data.slice(-maxMessages));
      } catch {
        // server not ready
      }
    };

    poll();
    const id = setInterval(poll, 500);
    return () => { active = false; clearInterval(id); };
  }, [maxMessages, enabled]);

  return messages;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const config = useOverlayConfig();
  const liveMessages = useRestreamChat(20);
  const sampleMessages = useSampleChat(20);
  const apiMessages = useChatApi(20, config.useLiveChat);
  const lastPushed = useRef("");

  // Push messages to API when WebSocket is producing them (Chrome/admin)
  useEffect(() => {
    if (!config.useLiveChat || liveMessages.length === 0) return;
    const serialized = JSON.stringify(liveMessages);
    if (serialized === lastPushed.current) return;
    lastPushed.current = serialized;
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: serialized,
    }).catch(() => {});
  }, [liveMessages, config.useLiveChat]);

  let messages: ChatMessage[];
  if (!config.useLiveChat) {
    messages = sampleMessages;
  } else if (liveMessages.length > 0) {
    // WebSocket working (Chrome) — use directly
    messages = liveMessages;
  } else {
    // WebSocket not working (OBS) — fall back to API polling
    messages = apiMessages;
  }

  return (
    <ChatContext.Provider value={messages}>
      {children}
    </ChatContext.Provider>
  );
}
