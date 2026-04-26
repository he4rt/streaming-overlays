import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface BubbleChatStripProps {
  config: TweakConfig;
  side?: "left" | "right";
}

export function BubbleChatStrip({ config, side = "right" }: BubbleChatStripProps) {
  const { accent, primary } = config;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 4));

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-3), { ...next, key: Date.now() }];
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute top-[100px] bottom-[100px] flex w-[360px] flex-col-reverse gap-4"
      style={{ [side]: 60 }}>
      {messages.slice().reverse().map((m, i) => (
        <div key={(m.key ?? 0) + "-" + i} className="px-[18px] py-3.5 backdrop-blur-[14px]"
          style={{
            background: i === 0 ? `linear-gradient(135deg, ${primary}DD, ${accent}DD)` : "rgba(11,4,24,0.72)",
            border: i === 0 ? "none" : `1px solid ${accent}33`,
            borderRadius: 18,
            borderBottomRightRadius: side === "right" ? 4 : 18,
            borderBottomLeftRadius: side === "left" ? 4 : 18,
            opacity: Math.max(0.35, 1 - i * 0.18),
            transform: i === 0 ? "scale(1)" : `scale(${1 - i * 0.04})`,
            transformOrigin: side === "right" ? "right bottom" : "left bottom",
            animation: i === 0 ? "slideIn 0.4s ease-out" : "none",
            boxShadow: i === 0 ? `0 12px 32px ${primary}55` : "0 6px 20px rgba(0,0,0,0.3)",
          }}>
          <div className="mb-1.5 flex items-center gap-2.5">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-body text-[11px] font-extrabold uppercase text-white"
              style={{ background: i === 0 ? "rgba(255,255,255,0.25)" : `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
              {m.user[0]}
            </div>
            <div className="font-body text-xs font-bold tracking-[0.02em]"
              style={{ color: i === 0 ? "#fff" : m.color }}>
              {m.user}
            </div>
          </div>
          <div className="font-body text-[15px] leading-[1.4]"
            style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.88)" }}>
            {m.msg}
          </div>
        </div>
      ))}
    </div>
  );
}
