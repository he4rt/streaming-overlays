import type { ChatMessage } from "@/shared/types";

function TwitchIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  );
}

function KickIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
      <path d="M1.333 0v24h5.338V13.421L13.005 24h7.328l-8.003-12L20.333 0h-7.328L6.671 10.579V0z" />
    </svg>
  );
}

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
          {msg.provider && (
            <span style={{ display: 'flex', alignItems: 'center', opacity: 0.6 }}>
              {msg.provider === 'twitch' ? <TwitchIcon size={11} /> : <KickIcon size={11} />}
            </span>
          )}
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
