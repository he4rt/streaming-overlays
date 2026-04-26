/* eslint-disable */
// ─────────────────────────────────────────────
// BRB Scene — "Já voltamos!" with timer and prominent chat
// Use case: hosts step away mid-stream, audience stays engaged
// ─────────────────────────────────────────────
(() => {
  const { useState, useEffect, useRef } = React;

  function BrbScene({ tweaks }) {
    const { primary, accent, brbDuration = 120 } = tweaks;
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setElapsed((s) => s + 1), 1000);
      return () => clearInterval(id);
    }, []);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const ss = String(elapsed % 60).padStart(2, '0');

    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex' }}>
        {/* LEFT — large BRB visual */}
        <div style={{
          flex: '0 0 60%',
          position: 'relative',
          background: `radial-gradient(ellipse at 30% 50%, ${primary}66 0%, transparent 60%), linear-gradient(160deg, #1a0530 0%, #0b0418 100%)`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 100px', gap: 32,
        }}>
          {/* logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <HeartMark size={36} color={accent} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: '#fff', letterSpacing: '0.28em', fontWeight: 800,
            }}>HE4RT TALKS</span>
          </div>

          {/* huge "JÁ VOLTAMOS" */}
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 200, color: '#fff', lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}>
            <span style={{
              background: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>JÁ</span>
            <br />
            VOLTAMOS<span style={{ color: accent }}>!</span>
          </div>

          {/* coffee/break message */}
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 26,
            color: 'rgba(255,255,255,0.75)', maxWidth: 680, fontWeight: 500,
            lineHeight: 1.4,
          }}>
            <span style={{ fontSize: 32, marginRight: 8 }}>☕</span>
            Pausa rápida pra esticar as pernas. Manda sua pergunta no chat enquanto isso!
          </div>

          {/* timer pill */}
          <div style={{
            marginTop: 12,
            display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 18,
            padding: '14px 26px',
            background: 'rgba(11,4,24,0.6)', backdropFilter: 'blur(14px)',
            border: `1px solid ${accent}66`, borderRadius: 99,
          }}>
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
                <circle cx="25" cy="25" r="22" fill="none" stroke={`${accent}33`} strokeWidth="3" />
                <circle cx="25" cy="25" r="22" fill="none" stroke={accent} strokeWidth="3"
                  strokeDasharray={`${(elapsed % 60) * 2.3} 138`}
                  transform="rotate(-90 25 25)" strokeLinecap="round" />
              </svg>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: accent,
                  animation: 'pulse 1.4s ease-in-out infinite',
                }} />
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 11,
                color: accent, letterSpacing: '0.25em', fontWeight: 700,
                textTransform: 'uppercase',
              }}>Tempo de pausa</div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 36,
                color: '#fff', lineHeight: 1, marginTop: 4,
              }}>{mm}:{ss}</div>
            </div>
          </div>

          {/* now-playing strip */}
          {tweaks.brbTrack && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: accent, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', fontSize: 12,
              }}>
                ♪ TOCANDO
              </span>
              <span>{tweaks.brbTrack}</span>
            </div>
          )}
        </div>

        {/* RIGHT — prominent chat with header */}
        <div style={{
          flex: 1, position: 'relative',
          background: `linear-gradient(180deg, #0b0418 0%, ${primary}22 100%)`,
          borderLeft: `1px solid ${accent}22`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '40px 40px 20px',
            borderBottom: `1px solid ${accent}22`,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 99,
              background: `${primary}33`, border: `1px solid ${accent}66`,
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              color: accent, letterSpacing: '0.2em', fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: accent,
                animation: 'pulse 1.4s ease-in-out infinite',
              }} />
              Chat ativo
            </div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 38,
              color: '#fff', lineHeight: 1.1, marginTop: 14,
            }}>Continue na conversa</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: 'rgba(255,255,255,0.55)', marginTop: 6,
            }}>discord.app/he4rt · #live-chat</div>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <BigChatFeed tweaks={tweaks} />
          </div>
        </div>

        {/* corner standby badge */}
        <div style={{
          position: 'absolute', top: 40, right: 40,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `${accent}`, padding: '8px 16px', borderRadius: 6,
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 800,
          color: '#fff', letterSpacing: '0.2em',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#fff',
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          PAUSA
        </div>
      </div>
    );
  }

  // Big chat feed — bigger rows than ChatPanel, no input box
  function BigChatFeed({ tweaks }) {
    const { accent, primary } = tweaks;
    const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 7));
    useEffect(() => {
      const id = setInterval(() => {
        setMessages((prev) => {
          const next = SAMPLE_CHAT[(prev.length) % SAMPLE_CHAT.length];
          return [...prev.slice(-9), { ...next, key: Date.now() }];
        });
      }, 2400);
      return () => clearInterval(id);
    }, []);
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
          <div key={(m.key || 0) + '-' + i} style={{
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

  Object.assign(window, { BrbScene });
})();
