import type { ChatMessage } from "@/shared/types";

interface ChatRowProps {
  msg: ChatMessage;
  accent: string;
  primary: string;
  entering?: boolean;
}

export function ChatRow({ msg, primary, entering }: ChatRowProps) {
  return (
    <div style={{
      display: 'flex', gap: 11, alignItems: 'flex-start',
      animation: entering ? 'slideIn 0.4s ease-out' : 'none',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: `linear-gradient(135deg, ${msg.color}, ${msg.color}99)`,
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
        color: '#fff', textTransform: 'uppercase',
        boxShadow: `0 2px 8px ${msg.color}55`,
      }}>
        {msg.user[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {msg.badge && (
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 800,
              color: '#fff', background: msg.badge === 'mod' ? '#22C55E' : primary,
              padding: '2px 6px', borderRadius: 4, letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>{msg.badge}</span>
          )}
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 700,
            color: msg.color,
          }}>{msg.user}</span>
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          color: 'rgba(255,255,255,0.92)', lineHeight: 1.4,
          marginTop: 2, wordBreak: 'break-word',
        }}>
          {msg.msg}
        </div>
      </div>
    </div>
  );
}
