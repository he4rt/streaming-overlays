/* eslint-disable */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// Top bar — episode title, live badge, viewers
// ─────────────────────────────────────────────
function TopBar({ tweaks }) {
  const { primary, accent, episodeTitle, episodeNumber, topic, showLiveBadge } = tweaks;
  const [viewers, setViewers] = useState(2847);
  useEffect(() => {
    const id = setInterval(() => setViewers(v => v + Math.floor(Math.random() * 7) - 2), 3000);
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

// ─────────────────────────────────────────────
// Lower third — date, time, social handles
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Lower third — date, time, social handles
// ─────────────────────────────────────────────
function LowerThird({ tweaks }) {
  const { primary, accent, date, time } = tweaks;
  return (
    <div style={{
      position: 'absolute', left: 30, bottom: 30, right: 480,
      height: 110,
      display: 'flex', alignItems: 'center', gap: 24,
      pointerEvents: 'none',
    }}>
      {/* logo block */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        background: 'rgba(11,4,24,0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid rgba(168,85,247,0.3)`,
        borderRadius: 14,
        padding: '14px 24px',
      }}>
        <HeartLogo size={0.8} purple={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 2 }}>
          <div style={{
            height: 4, width: 60,
            background: `linear-gradient(90deg, ${primary}, ${accent})`,
            borderRadius: 2,
          }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Russo One', sans-serif", fontSize: 16, color: '#fff',
            letterSpacing: '0.04em',
          }}>
            <Clock /> {date}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Russo One', sans-serif", fontSize: 16, color: '#fff',
            letterSpacing: '0.04em',
          }}>
            <Clock /> {time}
          </div>
        </div>
      </div>

      {/* socials block */}
      <div style={{
        flex: 1,
        display: 'flex', justifyContent: 'flex-end', gap: 14,
      }}>
        {[
          { icon: 'ig', label: '@he4rtdevs' },
          { icon: 'in', label: '/he4rt' },
          { icon: 'gh', label: '/he4rt-developers' },
          { icon: 'x',  label: '@he4rtdevs' },
          { icon: 'yt', label: '/@he4rtdevs' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(11,4,24,0.78)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(168,85,247,0.25)`,
            borderRadius: 10,
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#fff', fontWeight: 600,
          }}>
            <SocialIcon kind={s.icon} color={accent} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TickerBar({ tweaks }) {
  const { primary, accent, tickerText, showChat } = tweaks;
  const text = (tickerText + '   ').repeat(3);
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 0,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(90deg, ${primary} 0%, ${accent} 50%, ${primary} 100%)`,
        height: 36,
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        boxShadow: `0 -8px 24px ${primary}44`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          animation: 'tickerScroll 60s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 24,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 15, color: '#fff', letterSpacing: '0.08em',
            paddingLeft: 32,
          }}>
            <HeartMark size={22} color="#fff" />
            <span>{text}</span>
            <HeartMark size={22} color="#fff" />
            <span>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Corner logo (top-left small mark)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Ticker — bottom strip
// ─────────────────────────────────────────────
function Ticker({ tweaks }) {
  const { primary, accent, tickerText, showChat } = tweaks;
  return (
    <div style={{
      position: 'absolute',
      left: 30,
      right: showChat ? 480 : 30,
      bottom: 0,
      height: 0,
      pointerEvents: 'none',
    }}>
      {/* not used as fixed bottom — see TickerBar instead */}
    </div>
  );
}

// ─────────────────────────────────────────────
// Corner logo (top-left small mark)
// ─────────────────────────────────────────────
function CornerLogo({ tweaks }) {
  return null; // covered by top bar already
}

// ─────────────────────────────────────────────
// Main overlay
// ─────────────────────────────────────────────


Object.assign(window, { TopBar, LowerThird, TickerBar, Ticker, CornerLogo });
