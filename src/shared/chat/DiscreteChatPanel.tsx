import { useState, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface DiscreteChatPanelProps {
  config: TweakConfig;
}

export function DiscreteChatPanel({ config }: DiscreteChatPanelProps) {
  const { primary, accent } = config;
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
    <div style={{
      position: 'absolute',
      right: 40, bottom: 40,
      width: 360, height: 380,
      background: 'rgba(11,4,24,0.55)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${accent}33`,
      borderRadius: 16,
      boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* header */}
      <div style={{
        padding: '12px 18px',
        borderBottom: `1px solid ${accent}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
          color: 'rgba(255,255,255,0.85)', letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: accent,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          chat ao vivo
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
        }}>discord.app/he4rt</div>
      </div>

      {/* messages */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '14px 18px',
        display: 'flex', flexDirection: 'column', gap: 10,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
      }}>
        {messages.map((m, i) => (
          <div key={(m.key ?? 0) + '-' + i} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            animation: i === messages.length - 1 ? 'slideIn 0.4s ease-out' : 'none',
            opacity: 0.92,
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              color: m.color, flexShrink: 0,
            }}>{m.user}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12.5,
              color: 'rgba(255,255,255,0.78)', lineHeight: 1.4,
              wordBreak: 'break-word',
            }}>{m.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
