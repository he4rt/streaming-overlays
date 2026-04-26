import type { TweakConfig } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface BigChatFeedProps {
  config: TweakConfig;
}

export function BigChatFeed({ config }: BigChatFeedProps) {
  const { accent, primary } = config;
  const messages = useChatMessages();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      padding: '24px 40px 40px',
      display: 'flex', flexDirection: 'column', gap: 18,
      overflow: 'hidden',
      maskImage: 'linear-gradient(180deg, transparent 0%, black 6%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 6%, black 92%, transparent 100%)',
    }}>
      {messages.slice(-9).map((m, i) => (
        <div key={(m.key ?? 0) + '-' + i} style={{
          display: 'flex', gap: 14, alignItems: 'flex-start',
          animation: i === messages.slice(-9).length - 1 ? 'slideIn 0.4s ease-out' : 'none',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 800,
            color: '#fff', textTransform: 'uppercase',
          }}>{m.user[0]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
              color: m.color, marginBottom: 2,
            }}>{m.user}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 17,
              color: 'rgba(255,255,255,0.92)', lineHeight: 1.4,
            }}>{m.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
