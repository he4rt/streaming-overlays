import { useState, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface TerminalChatProps {
  config: TweakConfig;
  x?: number;
  y?: number | null;
  w?: number;
  h?: number;
}

export function TerminalChat({ config, x = 60, y = null, w = 460, h = 540 }: TerminalChatProps) {
  const { accent } = config;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 8));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-9), { ...next, key: Date.now() }];
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const positionStyle = y == null ? { left: x, bottom: 60 } : { left: x, top: y };

  return (
    <div className="absolute flex flex-col overflow-hidden rounded-xl font-mono backdrop-blur-[16px]"
      style={{
        ...positionStyle, width: w, height: h,
        background: "rgba(8,2,18,0.78)",
        border: `1px solid ${accent}44`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}>
      {/* terminal header */}
      <div className="flex h-8 items-center gap-2.5 border-b bg-black/40 px-3.5" style={{ borderColor: `${accent}33` }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="flex-1 text-center text-xs tracking-[0.04em] text-white/55">he4rt@talks ~ /live-chat</span>
        <span className="text-[10px] font-bold tracking-[0.15em]" style={{ color: accent }}>● TAIL -F</span>
      </div>

      {/* feed */}
      <div ref={listRef} className="flex flex-1 flex-col gap-1.5 overflow-hidden px-4 py-3.5 text-[13.5px] leading-[1.55]"
        style={{ maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 100%)" }}>
        {messages.map((m, i) => {
          const ts = new Date(m.key ?? Date.now()).toLocaleTimeString("pt-BR", { hour12: false });
          return (
            <div key={(m.key ?? 0) + "-" + i} className="flex gap-2"
              style={{ animation: i === messages.length - 1 ? "slideIn 0.3s ease-out" : "none" }}>
              <span className="shrink-0 text-white/35">[{ts}]</span>
              <span className="shrink-0 font-bold" style={{ color: m.color }}>{m.user}</span>
              <span style={{ color: accent }}>›</span>
              <span className="flex-1 break-words text-white/[0.88]">{m.msg}</span>
            </div>
          );
        })}
      </div>

      {/* prompt */}
      <div className="flex items-center gap-2 border-t bg-black/30 px-4 py-2.5 text-[13px] text-white/60" style={{ borderColor: `${accent}22` }}>
        <span className="text-[#7ee787]">he4rt@talks</span>
        <span style={{ color: accent }}>$</span>
        <span className="text-white/40">aguardando você...</span>
        <span className="ml-auto inline-block h-3.5 w-2 animate-[pulse_1s_steps(2)_infinite]" style={{ background: accent }} />
      </div>
    </div>
  );
}
