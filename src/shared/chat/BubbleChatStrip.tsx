import type { TweakConfig } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface BubbleChatStripProps {
  config: TweakConfig;
  side?: "left" | "right";
}

export function BubbleChatStrip({ config, side = "right" }: BubbleChatStripProps) {
  const { accent, primary } = config;
  const messages = useChatMessages().slice(-4);

  return (
    <div style={{
      position: 'absolute',
      [side]: 60, top: 100, bottom: 100,
      width: 360,
      display: 'flex', flexDirection: 'column-reverse', gap: 16,
      pointerEvents: 'none',
    }}>
      {messages.slice().reverse().map((m, i) => (
        <div key={(m.key ?? 0) + '-' + i} style={{
          background: i === 0 ? `linear-gradient(135deg, ${primary}DD, ${accent}DD)` : 'rgba(11,4,24,0.72)',
          backdropFilter: 'blur(14px)',
          border: i === 0 ? 'none' : `1px solid ${accent}33`,
          borderRadius: 18,
          borderBottomRightRadius: side === 'right' ? 4 : 18,
          borderBottomLeftRadius: side === 'left' ? 4 : 18,
          padding: '14px 18px',
          opacity: Math.max(0.35, 1 - i * 0.18),
          transform: i === 0 ? 'scale(1)' : `scale(${1 - i * 0.04})`,
          transformOrigin: side === 'right' ? 'right bottom' : 'left bottom',
          animation: i === 0 ? 'slideIn 0.4s ease-out' : 'none',
          boxShadow: i === 0 ? `0 12px 32px ${primary}55` : '0 6px 20px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: i === 0 ? 'rgba(255,255,255,0.25)' : `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 800,
              color: '#fff', textTransform: 'uppercase',
            }}>{m.user[0]}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              color: i === 0 ? '#fff' : m.color, letterSpacing: '0.02em',
            }}>{m.user}</div>
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15,
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.88)',
            lineHeight: 1.4,
          }}>{m.msg}</div>
        </div>
      ))}
    </div>
  );
}
