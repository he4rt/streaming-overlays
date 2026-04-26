import type { TweakConfig } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface MarqueeChatProps {
  config: TweakConfig;
}

export function MarqueeChat({ config }: MarqueeChatProps) {
  const { accent, primary } = config;
  const messages = useChatMessages();
  const items = messages.concat(messages);

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 80,
      height: 56, overflow: 'hidden',
      background: 'linear-gradient(90deg, rgba(11,4,24,0) 0%, rgba(11,4,24,0.85) 8%, rgba(11,4,24,0.85) 92%, rgba(11,4,24,0) 100%)',
      borderTop: `1px solid ${accent}22`,
      borderBottom: `1px solid ${accent}22`,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 40,
        animation: 'marqueeChat 80s linear infinite',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        {items.map((m, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            paddingLeft: i === 0 ? 60 : 0,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 800,
              color: '#fff', textTransform: 'uppercase', flexShrink: 0,
            }}>{m.user[0]}</div>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
              color: m.color,
            }}>{m.user}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
            }}>{m.msg}</span>
            <span style={{ color: `${accent}66`, fontSize: 18, marginLeft: 4 }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
