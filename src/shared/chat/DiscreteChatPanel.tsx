import { useState, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface DiscreteChatPanelProps {
  config: TweakConfig;
}

export function DiscreteChatPanel({ config }: DiscreteChatPanelProps) {
  const { accent } = config;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 6));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-6), { ...next, key: Date.now() }];
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="absolute bottom-10 right-10 flex h-[380px] w-[360px] flex-col overflow-hidden rounded-2xl backdrop-blur-[20px]"
      style={{
        background: "rgba(11,4,24,0.55)",
        border: `1px solid ${accent}33`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
      {/* header */}
      <div className="flex items-center justify-between border-b px-[18px] py-3" style={{ borderColor: `${accent}22` }}>
        <div className="inline-flex items-center gap-2 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-white/85">
          <span className="h-[7px] w-[7px] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full" style={{ background: accent }} />
          chat ao vivo
        </div>
        <div className="font-body text-[11px] text-white/40">discord.app/he4rt</div>
      </div>

      {/* messages */}
      <div ref={listRef} className="flex flex-1 flex-col gap-2.5 overflow-hidden px-[18px] py-3.5"
        style={{ maskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 100%)" }}>
        {messages.map((m, i) => (
          <div key={(m.key ?? 0) + "-" + i} className="flex items-start gap-2 opacity-[0.92]"
            style={{ animation: i === messages.length - 1 ? "slideIn 0.4s ease-out" : "none" }}>
            <span className="shrink-0 font-body text-xs font-bold" style={{ color: m.color }}>{m.user}</span>
            <span className="break-words font-body text-[12.5px] leading-[1.4] text-white/[0.78]">{m.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
