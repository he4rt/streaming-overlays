import { useState, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";
import { ChatRow } from "./ChatRow";
import { SAMPLE_CHAT } from "./sample-messages";

interface ChatPanelProps {
  config: TweakConfig;
}

export function ChatPanel({ config }: ChatPanelProps) {
  const { primary, accent, bgPanel, panelOpacity, chatTitle } = config;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 8));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-9), { ...next, key: Date.now() }];
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="absolute right-[30px] top-[30px] flex h-[760px] w-[420px] flex-col overflow-hidden rounded-[20px] border border-accent/35 backdrop-blur-[14px]"
      style={{
        background: `linear-gradient(180deg, ${bgPanel}E6 0%, ${bgPanel}${Math.floor(panelOpacity * 255).toString(16).padStart(2, "0")} 100%)`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.15) inset, 0 0 60px rgba(124,58,237,0.15)`,
      }}>
      {/* corner accent */}
      <div className="absolute -right-px -top-px h-[70px] w-[70px] rounded-tr-[20px] opacity-95"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
          clipPath: "polygon(40% 0, 100% 0, 100% 60%, 100% 100%, 60% 100%, 100% 60%, 40% 0)",
        }}>
        <div className="absolute right-3 top-3">
          <HeartMark size={26} color="#fff" />
        </div>
      </div>

      {/* header */}
      <div className="border-b border-accent/[0.22] px-[26px] pb-[18px] pt-6">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body text-xs font-bold tracking-[0.1em] text-white"
          style={{ background: primary }}>
          <span className="h-2 w-2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-white" />
          AO VIVO
        </div>
        <div className="mt-3.5 font-heading text-[28px] leading-[1.05] text-white tracking-[0.02em]">{chatTitle}</div>
        <div className="mt-1.5 font-body text-[13px] tracking-[0.05em] text-white/55">discord.app/he4rt · #live-chat</div>
      </div>

      {/* messages */}
      <div ref={listRef} className="flex flex-1 flex-col gap-3.5 overflow-hidden px-[22px] py-[18px]"
        style={{ maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 100%)" }}>
        {messages.map((m, i) => (
          <ChatRow key={(m.key ?? 0) + "-" + i} msg={m} accent={accent} primary={primary} entering={i === messages.length - 1} />
        ))}
      </div>

      {/* input bar */}
      <div className="flex items-center gap-2.5 border-t border-accent/[0.22] bg-black/25 px-[18px] py-3.5">
        <div className="flex-1 rounded-[10px] border border-accent/25 bg-white/5 px-3.5 py-2.5 font-body text-[13px] text-white/40">
          envie sua mensagem…
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px]"
          style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
}
