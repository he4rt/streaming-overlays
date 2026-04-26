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
  const { accent, primary } = config;
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

  const positionStyle = y == null
    ? { left: x, bottom: 60 }
    : { left: x, top: y };

  return (
    <div style={{
      position: 'absolute', ...positionStyle,
      width: w, height: h,
      background: 'rgba(8,2,18,0.78)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${accent}44`,
      borderRadius: 12,
      boxShadow: `0 30px 80px rgba(0,0,0,0.5)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    }}>
      {/* terminal header */}
      <div style={{
        height: 32, background: 'rgba(0,0,0,0.4)',
        borderBottom: `1px solid ${accent}33`,
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{
          flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.55)',
          fontSize: 12, letterSpacing: '0.04em',
        }}>he4rt@talks ~ /live-chat</span>
        <span style={{
          fontSize: 10, color: accent, fontWeight: 700, letterSpacing: '0.15em',
        }}>● TAIL -F</span>
      </div>

      {/* feed */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '14px 16px',
        display: 'flex', flexDirection: 'column', gap: 6,
        fontSize: 13.5, lineHeight: 1.55,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
      }}>
        {messages.map((m, i) => {
          const ts = new Date(m.key ?? Date.now()).toLocaleTimeString('pt-BR', { hour12: false });
          return (
            <div key={(m.key ?? 0) + '-' + i} style={{
              display: 'flex', gap: 8,
              animation: i === messages.length - 1 ? 'slideIn 0.3s ease-out' : 'none',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>[{ts}]</span>
              <span style={{ color: m.color, fontWeight: 700, flexShrink: 0 }}>{m.user}</span>
              <span style={{ color: accent }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', flex: 1, wordBreak: 'break-word' }}>{m.msg}</span>
            </div>
          );
        })}
      </div>

      {/* prompt */}
      <div style={{
        padding: '10px 16px', borderTop: `1px solid ${accent}22`,
        background: 'rgba(0,0,0,0.3)',
        fontSize: 13, color: 'rgba(255,255,255,0.6)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: '#7ee787' }}>he4rt@talks</span>
        <span style={{ color: accent }}>$</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>aguardando você...</span>
        <span style={{
          display: 'inline-block', width: 8, height: 14, marginLeft: 'auto',
          background: accent, animation: 'pulse 1s steps(2) infinite',
        }} />
      </div>
    </div>
  );
}
