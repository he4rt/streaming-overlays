import { createContext, useContext, useState, useEffect } from "react";
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

export function ChatProvider({ children }: { children: ReactNode }) {
  const config = useOverlayConfig();
  const liveMessages = useRestreamChat(20);
  const sampleMessages = useSampleChat(20);

  const messages = config.useLiveChat ? liveMessages : sampleMessages;

  return (
    <ChatContext.Provider value={messages}>
      {children}
    </ChatContext.Provider>
  );
}
