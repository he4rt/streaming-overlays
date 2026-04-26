import { useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";
import { ChatRow } from "./ChatRow";
import { useChatMessages } from "@/hooks/ChatProvider";

interface ChatPanelProps {
  config: TweakConfig;
}

export function ChatPanel({ config }: ChatPanelProps) {
  const { primary, accent, bgPanel, panelOpacity, chatTitle } = config;
  const messages = useChatMessages();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={{
      position: 'absolute',
      right: 30, top: 30,
      width: 420, height: 760,
      background: `linear-gradient(180deg, ${bgPanel}E6 0%, ${bgPanel}${Math.floor(panelOpacity * 255).toString(16).padStart(2, '0')} 100%)`,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: `1px solid rgba(168,85,247,0.35)`,
      borderRadius: 20,
      boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.15) inset, 0 0 60px rgba(124,58,237,0.15)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* corner accent */}
      <div style={{
        position: 'absolute', top: -1, right: -1, width: 70, height: 70,
        background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
        borderTopRightRadius: 20,
        clipPath: 'polygon(40% 0, 100% 0, 100% 60%, 100% 100%, 60% 100%, 100% 60%, 40% 0)',
        opacity: 0.95,
      }}>
        <div style={{
          position: 'absolute', top: 12, right: 12, color: '#fff',
        }}>
          <HeartMark size={26} color="#fff" />
        </div>
      </div>

      {/* header */}
      <div style={{
        padding: '24px 26px 18px', borderBottom: `1px solid rgba(168,85,247,0.22)`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: primary, padding: '6px 14px', borderRadius: 99,
          fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
          color: '#fff', letterSpacing: '0.1em',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#fff',
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          AO VIVO
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: "'Russo One', sans-serif",
          fontSize: 28, color: '#fff', letterSpacing: '0.02em',
          lineHeight: 1.05,
        }}>
          {chatTitle}
        </div>
        <div style={{
          marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em',
        }}>
          discord.app/he4rt · #live-chat
        </div>
      </div>

      {/* messages */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '18px 22px',
        display: 'flex', flexDirection: 'column', gap: 14,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
      }}>
        {messages.map((m, i) => (
          <ChatRow key={(m.key ?? 0) + '-' + i} msg={m} accent={accent} primary={primary} entering={i === messages.length - 1} />
        ))}
      </div>

      {/* input bar */}
      <div style={{
        padding: '14px 18px',
        borderTop: `1px solid rgba(168,85,247,0.22)`,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: 10, padding: '10px 14px',
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
        }}>
          envie sua mensagem…
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${primary}, ${accent})`,
          width: 40, height: 40, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
