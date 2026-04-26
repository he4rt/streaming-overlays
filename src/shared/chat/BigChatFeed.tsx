import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface BigChatFeedProps {
  config: TweakConfig;
}

export function BigChatFeed({ config: _ }: BigChatFeedProps) {
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 7));

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-9), { ...next, key: Date.now() }];
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col gap-[18px] overflow-hidden px-10 pb-10 pt-6"
      style={{
        maskImage: "linear-gradient(180deg, transparent 0%, black 6%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 6%, black 92%, transparent 100%)",
      }}>
      {messages.slice(-9).map((m, i) => (
        <div key={(m.key ?? 0) + "-" + i} className="flex items-start gap-3.5"
          style={{ animation: i === messages.slice(-9).length - 1 ? "slideIn 0.4s ease-out" : "none" }}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-body text-base font-extrabold uppercase text-white"
            style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
            {m.user[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 font-body text-sm font-bold" style={{ color: m.color }}>{m.user}</div>
            <div className="font-body text-[17px] leading-[1.4] text-white/[0.92]">{m.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
