import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";

interface TopBarProps {
  config: TweakConfig;
}

export function TopBar({ config }: TopBarProps) {
  const { primary, accent, episodeTitle, episodeNumber, topic, showLiveBadge } = config;
  const [viewers, setViewers] = useState(2847);

  useEffect(() => {
    const id = setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 7) - 2), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'absolute', left: 30, top: 30, right: 480,
      height: 80,
      display: 'flex', alignItems: 'center', gap: 20,
      pointerEvents: 'none',
    }}>
      {/* episode number — solid block */}
      <div style={{
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        padding: '10px 18px',
        borderRadius: 10,
        fontFamily: "'Russo One', sans-serif",
        fontSize: 18, color: '#fff', letterSpacing: '0.06em',
        boxShadow: `0 8px 24px ${primary}55`,
      }}>
        {episodeNumber}
      </div>

      {/* title block */}
      <div style={{
        background: 'rgba(11,4,24,0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid rgba(168,85,247,0.3)`,
        borderRadius: 12,
        padding: '10px 22px',
        flex: 1, minWidth: 0,
      }}>
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 22, color: '#fff', letterSpacing: '0.01em',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          lineHeight: 1.1,
        }}>
          {episodeTitle}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 12,
          color: accent, letterSpacing: '0.12em', marginTop: 4,
          textTransform: 'uppercase', fontWeight: 600,
        }}>
          {topic}
        </div>
      </div>

      {/* live + viewers */}
      {showLiveBadge && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#EF4444', padding: '6px 14px', borderRadius: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 800,
            color: '#fff', letterSpacing: '0.15em',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#fff',
              animation: 'pulse 1.4s ease-in-out infinite',
            }} />
            LIVE
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
            color: '#fff', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill={accent}>
              <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
            </svg>
            {viewers.toLocaleString('pt-BR')} assistindo
          </div>
        </div>
      )}
    </div>
  );
}
