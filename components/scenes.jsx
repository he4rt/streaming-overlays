/* eslint-disable */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// Starting Scene — router (delegates to a variant)
// ─────────────────────────────────────────────
function StartingScene({ tweaks }) {
  const v = tweaks.startingVariant || 'v1';
  if (v === 'v2') return <StartingSceneV2 tweaks={tweaks} />;
  if (v === 'v3') return <StartingSceneV3 tweaks={tweaks} />;
  if (v === 'v4') return <StartingSceneV4 tweaks={tweaks} />;
  return <StartingSceneV1 tweaks={tweaks} />;
}

// ─────────────────────────────────────────────
// Starting V1 — original splash (centered countdown + ring + discrete chat bottom-right)
// ─────────────────────────────────────────────
function StartingSceneV1({ tweaks }) {
  const { primary, accent, startingTitle, startingSubtitle, startingCountdownSeconds, episodeTitle, episodeNumber, topic, date, time } = tweaks;
  const [remaining, setRemaining] = useState(startingCountdownSeconds);
  useEffect(() => {
    setRemaining(startingCountdownSeconds);
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [startingCountdownSeconds]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* large central glowing ring */}
      <div style={{
        position: 'absolute', width: 1200, height: 1200, borderRadius: '50%',
        border: `2px solid ${accent}33`,
        animation: 'startingPulse 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 900, height: 900, borderRadius: '50%',
        border: `1px solid ${accent}55`,
        animation: 'startingPulse 4s ease-in-out 0.5s infinite',
      }} />
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${primary}55 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }} />

      {/* central content */}
      <div style={{
        position: 'relative', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        maxWidth: 1100,
      }}>
        {/* logo */}
        <div style={{ animation: 'glow 3s ease-in-out infinite' }}>
          <HeartLogo size={1.6} purple={accent} />
        </div>

        {/* tagline */}
        <div style={{
          marginTop: 12,
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '10px 22px',
          background: `${primary}26`,
          border: `1px solid ${accent}66`,
          borderRadius: 99,
          fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#fff',
          letterSpacing: '0.18em', fontWeight: 700,
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%', background: accent,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          {startingTitle}
        </div>

        {/* countdown */}
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 220, color: '#fff', lineHeight: 1,
          letterSpacing: '0.04em',
          textShadow: `0 0 60px ${accent}88, 0 0 120px ${primary}55`,
          display: 'flex', alignItems: 'center', gap: 30,
        }}>
          <span>{mm}</span>
          <span style={{ color: accent, animation: 'pulse 1s ease-in-out infinite' }}>:</span>
          <span>{ss}</span>
        </div>

        {/* episode info card */}
        <div style={{
          marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 18,
          background: 'rgba(11,4,24,0.7)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${accent}44`,
          borderRadius: 16,
          padding: '18px 28px',
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            padding: '8px 16px', borderRadius: 8,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 18, color: '#fff', letterSpacing: '0.06em',
          }}>{episodeNumber}</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontFamily: "'Russo One', sans-serif",
              fontSize: 30, color: '#fff', lineHeight: 1.1,
            }}>{episodeTitle}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: accent,
              letterSpacing: '0.12em', marginTop: 6, fontWeight: 600,
              textTransform: 'uppercase',
            }}>{topic}</div>
          </div>
          <div style={{ width: 1, height: 50, background: `${accent}33`, margin: '0 8px' }} />
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock /> {date}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock /> {time}</div>
          </div>
        </div>

        {/* subtitle */}
        <div style={{
          marginTop: 18,
          fontFamily: 'Inter, sans-serif', fontSize: 22, color: 'rgba(255,255,255,0.75)',
          fontWeight: 500,
        }}>
          {startingSubtitle}
        </div>

        {/* social row */}
        <div style={{
          marginTop: 18, display: 'flex', gap: 14, alignItems: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)',
        }}>
          <span style={{ letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>Siga</span>
          <SocialIcon kind="ig" color={accent} /><span>@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="x" color={accent} /><span>@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="yt" color={accent} /><span>/@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="gh" color={accent} /><span>/he4rt-developers</span>
        </div>
      </div>

      {/* corner brand marks */}
      <div style={{
        position: 'absolute', top: 40, left: 40,
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(11,4,24,0.6)', backdropFilter: 'blur(10px)',
        padding: '10px 16px', borderRadius: 10,
        border: `1px solid ${accent}33`,
      }}>
        <HeartMark size={24} color={accent} />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: 12,
          color: '#fff', letterSpacing: '0.2em', fontWeight: 700,
        }}>HE4RT TALKS</span>
      </div>
      <div style={{
        position: 'absolute', top: 40, right: 40,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#EF4444', padding: '8px 16px', borderRadius: 6,
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 800,
        color: '#fff', letterSpacing: '0.15em',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: '#fff',
          animation: 'pulse 1.4s ease-in-out infinite',
        }} />
        EM BREVE
      </div>
      {/* Discrete chat panel for starting scene */}
      <DiscreteChatPanel tweaks={tweaks} />
    </div>
  );
}

// ─────────────────────────────────────────────
// Discrete chat — minimal floating panel for starting/ending scenes
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Starting V2 — Neon Grid (huge typographic countdown, terminal chat on the left)
// ─────────────────────────────────────────────
function StartingSceneV2({ tweaks }) {
  const { primary, accent, startingTitle, startingSubtitle, startingCountdownSeconds, episodeTitle, episodeNumber, topic, date, time } = tweaks;
  const [remaining, setRemaining] = useState(startingCountdownSeconds);
  useEffect(() => {
    setRemaining(startingCountdownSeconds);
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [startingCountdownSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* neon grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
        backgroundSize: '80px 80px, 80px 80px',
        animation: 'gridDrift 8s linear infinite',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />
      {/* horizon glow */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%',
        background: `linear-gradient(180deg, transparent 0%, ${primary}55 60%, ${accent}88 100%)`,
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* terminal chat (left) */}
      <TerminalChat tweaks={tweaks} x={60} y={300} w={520} h={620} />

      {/* main stage (right side, big typo) */}
      <div style={{
        position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)',
        width: 1100, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18,
      }}>
        {/* eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '8px 18px',
          background: `${primary}33`,
          border: `1px solid ${accent}88`,
          borderRadius: 4,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13,
          color: accent, letterSpacing: '0.3em', fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 8, height: 8, background: accent,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          {startingTitle} · {episodeNumber}
        </div>

        {/* episode title */}
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 76, color: '#fff', lineHeight: 0.95,
          letterSpacing: '-0.02em',
          textShadow: `0 0 40px ${accent}66`,
        }}>{episodeTitle}</div>

        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 18, color: accent,
          letterSpacing: '0.18em', fontWeight: 600,
          textTransform: 'uppercase',
        }}>{topic}</div>

        {/* big countdown */}
        <div style={{ marginTop: 24, position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 320, lineHeight: 0.9, letterSpacing: '-0.02em',
            color: 'transparent', WebkitTextStroke: `2px ${accent}55`,
            transform: 'translate(8px, 8px)',
          }}>{mm}:{ss}</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 320, lineHeight: 0.9, letterSpacing: '-0.02em',
            color: '#fff',
            background: `linear-gradient(180deg, #fff 0%, ${accent} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            position: 'relative',
          }}>{mm}:{ss}</div>
        </div>

        {/* meta row */}
        <div style={{
          marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 24,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 14, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          <span><span style={{ color: accent }}>›</span> {date}</span>
          <span style={{ color: `${accent}55` }}>│</span>
          <span><span style={{ color: accent }}>›</span> {time}</span>
          <span style={{ color: `${accent}55` }}>│</span>
          <span><span style={{ color: accent }}>›</span> {startingSubtitle}</span>
        </div>
      </div>

      {/* corner brand */}
      <div style={{
        position: 'absolute', top: 40, left: 40,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <HeartMark size={28} color={accent} />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: '#fff', letterSpacing: '0.25em', fontWeight: 800,
        }}>HE4RT TALKS</span>
      </div>
      <div style={{
        position: 'absolute', top: 40, right: 40,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'transparent', border: `1px solid ${accent}88`,
        padding: '8px 16px', borderRadius: 4,
        fontFamily: 'ui-monospace, monospace', fontSize: 12, fontWeight: 700,
        color: accent, letterSpacing: '0.2em',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: accent,
          animation: 'pulse 1.4s ease-in-out infinite',
        }} />
        STANDBY
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Starting V3 — Split poster (left: editorial info, right: portrait + bubble chat)
// ─────────────────────────────────────────────
function StartingSceneV3({ tweaks }) {
  const { primary, accent, startingTitle, startingSubtitle, startingCountdownSeconds, episodeTitle, episodeNumber, topic, date, time, guest1Name, guest1Role, guest2Name, guest2Role } = tweaks;
  const [remaining, setRemaining] = useState(startingCountdownSeconds);
  useEffect(() => {
    setRemaining(startingCountdownSeconds);
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [startingCountdownSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
      {/* LEFT — editorial */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(160deg, ${primary} 0%, #1a0530 60%, #0b0418 100%)`,
        padding: '80px 72px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* top */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <HeartMark size={32} color={accent} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: '#fff', letterSpacing: '0.25em', fontWeight: 800,
            }}>HE4RT TALKS</span>
          </div>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 13,
            color: accent, letterSpacing: '0.25em', fontWeight: 700,
            textTransform: 'uppercase', marginBottom: 14,
          }}>{episodeNumber} · {topic}</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 88, color: '#fff', lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}>{episodeTitle}</div>
          <div style={{
            marginTop: 24,
            fontFamily: 'Inter, sans-serif', fontSize: 22,
            color: 'rgba(255,255,255,0.8)', lineHeight: 1.4,
            maxWidth: 560,
          }}>{startingSubtitle}</div>
        </div>

        {/* countdown block — bottom */}
        <div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: accent, letterSpacing: '0.3em', fontWeight: 700,
            textTransform: 'uppercase', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: accent }} />
            Começa em
          </div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 180, color: '#fff', lineHeight: 1,
            letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'baseline', gap: 8,
          }}>
            <span>{mm}</span>
            <span style={{ color: accent }}>:</span>
            <span>{ss}</span>
            <span style={{
              fontSize: 32, color: accent, marginLeft: 16, letterSpacing: '0.2em',
            }}>MIN</span>
          </div>
          <div style={{
            marginTop: 24, display: 'flex', alignItems: 'center', gap: 20,
            fontFamily: 'Inter, sans-serif', fontSize: 16,
            color: 'rgba(255,255,255,0.6)', fontWeight: 600,
          }}>
            <span>{date}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span>{time}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span style={{
              padding: '4px 10px', background: '#EF4444',
              borderRadius: 4, color: '#fff', fontSize: 12, fontWeight: 800,
              letterSpacing: '0.18em',
            }}>EM BREVE</span>
          </div>
        </div>
      </div>

      {/* RIGHT — guest portraits + bubble chat */}
      <div style={{
        position: 'relative',
        background: `radial-gradient(ellipse at top right, ${accent}33 0%, #0b0418 60%)`,
        overflow: 'hidden',
      }}>
        {/* mosaic of guest cards */}
        <div style={{
          position: 'absolute', top: 80, left: 60, right: 60,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
        }}>
          {[{ name: guest1Name, role: guest1Role, color: accent }, { name: guest2Name, role: guest2Role, color: primary }].map((g, i) => (
            <div key={i} style={{
              aspectRatio: '3/4',
              background: `linear-gradient(160deg, ${g.color}88 0%, ${g.color}33 100%)`,
              borderRadius: 16, border: `1px solid ${accent}44`,
              padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', overflow: 'hidden',
              animation: `floatY 5s ease-in-out ${i * 0.6}s infinite`,
            }}>
              {/* placeholder portrait blob */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 80,
                background: `radial-gradient(circle at 50% 60%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              }} />
              <div style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: '50%',
                border: `2px solid ${accent}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 800,
              }}>{i + 1}</div>
              <div>
                <div style={{
                  fontFamily: "'Russo One', sans-serif", fontSize: 22, color: '#fff', lineHeight: 1.1,
                }}>{g.name}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.1em', marginTop: 4, fontWeight: 600, textTransform: 'uppercase',
                }}>{g.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* bubble chat strip floating on the right */}
        <BubbleChatStrip tweaks={tweaks} side="right" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Starting V4 — Vertical typography + horizontal marquee chat at bottom
// ─────────────────────────────────────────────
function StartingSceneV4({ tweaks }) {
  const { primary, accent, startingTitle, startingSubtitle, startingCountdownSeconds, episodeTitle, episodeNumber, topic, date, time } = tweaks;
  const [remaining, setRemaining] = useState(startingCountdownSeconds);
  useEffect(() => {
    setRemaining(startingCountdownSeconds);
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [startingCountdownSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* radial bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, ${primary}55 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, ${accent}33 0%, transparent 50%)`,
      }} />

      {/* huge stacked typography (left) */}
      <div style={{
        position: 'absolute', left: 80, top: 80, bottom: 200,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <HeartMark size={28} color={accent} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: '#fff', letterSpacing: '0.28em', fontWeight: 800,
            }}>HE4RT TALKS · {episodeNumber}</span>
          </div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 96, color: '#fff', lineHeight: 0.92,
            letterSpacing: '-0.02em', maxWidth: 1100,
          }}>
            <span style={{
              background: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{startingTitle}</span>
            <br />
            <span style={{ color: '#fff' }}>{episodeTitle}</span>
          </div>
          <div style={{
            marginTop: 22,
            fontFamily: 'Inter, sans-serif', fontSize: 22,
            color: 'rgba(255,255,255,0.7)', maxWidth: 800, fontWeight: 500,
          }}>{startingSubtitle}</div>
        </div>
      </div>

      {/* circular countdown (right) */}
      <div style={{
        position: 'absolute', right: 120, top: '50%', transform: 'translateY(-50%)',
        width: 480, height: 480,
      }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primary} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="none" stroke={`${accent}22`} strokeWidth="2" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ringGrad)" strokeWidth="2"
            strokeDasharray={`${(remaining / Math.max(1, tweaks.startingCountdownSeconds)) * 578} 578`}
            transform="rotate(-90 100 100)" strokeLinecap="round" />
          <circle cx="100" cy="100" r="78" fill="none" stroke={`${accent}11`} strokeWidth="1" strokeDasharray="2 4" />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8,
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            color: accent, letterSpacing: '0.3em', fontWeight: 700, textTransform: 'uppercase',
          }}>Começa em</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 130, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'baseline', gap: 6,
          }}>
            <span>{mm}</span>
            <span style={{ color: accent, animation: 'pulse 1s ease-in-out infinite' }}>:</span>
            <span>{ss}</span>
          </div>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 14,
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', marginTop: 4,
          }}>{date} · {time}</div>
        </div>
      </div>

      {/* marquee chat at bottom */}
      <MarqueeChat tweaks={tweaks} />

      {/* bottom-most caption */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 24,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif', fontSize: 12,
        color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', fontWeight: 700,
        textTransform: 'uppercase',
      }}>↑ chat ao vivo · #he4rttalks · entre no discord.app/he4rt</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Ending scene — same as before
// ─────────────────────────────────────────────
function EndingScene({ tweaks }) {
  const { primary, accent, endingTitle, endingSubtitle, guest1Name, guest1Role, guest1Handle, guest2Name, guest2Role, guest2Handle } = tweaks;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* big radial glow */}
      <div style={{
        position: 'absolute', width: 1400, height: 1400, borderRadius: '50%',
        background: `radial-gradient(circle, ${primary}44 0%, transparent 65%)`,
        filter: 'blur(60px)',
      }} />

      {/* central content */}
      <div style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
        maxWidth: 1300, textAlign: 'center',
      }}>
        {/* mark */}
        <div style={{ animation: 'glow 3s ease-in-out infinite' }}>
          <HeartMark size={96} color={accent} />
        </div>

        {/* title */}
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 140, color: '#fff', lineHeight: 1,
          letterSpacing: '0.02em',
          textShadow: `0 0 60px ${accent}66`,
        }}>
          {endingTitle}
        </div>

        {/* subtitle */}
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 28, color: 'rgba(255,255,255,0.8)',
          fontWeight: 500, letterSpacing: '0.02em',
        }}>
          {endingSubtitle}
        </div>

        {/* divider */}
        <div style={{
          height: 4, width: 200,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          borderRadius: 2,
          margin: '6px 0',
        }} />

        {/* hosts row */}
        <div style={{
          display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center',
          marginTop: 8,
        }}>
          {[
            { name: guest1Name, role: guest1Role, handle: guest1Handle },
            { name: guest2Name, role: guest2Role, handle: guest2Handle },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'rgba(11,4,24,0.65)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${accent}44`,
              padding: '16px 24px',
              borderRadius: 14,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${primary}, ${accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Russo One', sans-serif", fontSize: 22, color: '#fff',
              }}>{p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: "'Russo One', sans-serif",
                  fontSize: 22, color: '#fff', lineHeight: 1,
                }}>{p.name}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12, color: accent,
                  letterSpacing: '0.1em', marginTop: 6, fontWeight: 600,
                  textTransform: 'uppercase',
                }}>{p.handle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — like, share, sub */}
        <div style={{ display: 'flex', gap: 30, marginTop: 24 }}>
          {[
            { icon: '👍', label: 'Curta o vídeo', color: '#3B82F6' },
            { icon: '🔔', label: 'Inscreva-se no canal', color: '#EF4444' },
            { icon: '💬', label: 'Comenta o que achou', color: accent },
          ].map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(11,4,24,0.7)',
              border: `2px solid ${c.color}55`,
              padding: '14px 22px', borderRadius: 12,
              fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700,
              color: '#fff',
            }}>
              <span style={{ fontSize: 24 }}>{c.icon}</span>
              {c.label}
            </div>
          ))}
        </div>

        {/* socials grid */}
        <div style={{
          marginTop: 30,
          display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
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
              background: 'rgba(11,4,24,0.7)',
              border: `1px solid ${accent}33`,
              borderRadius: 10,
              padding: '10px 16px',
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: '#fff', fontWeight: 600,
            }}>
              <SocialIcon kind={s.icon} color={accent} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* logo bottom */}
      <div style={{
        position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)',
        opacity: 0.85,
      }}>
        <HeartLogo size={0.9} purple={accent} />
      </div>

      {/* corner OFFLINE badge */}
      <div style={{
        position: 'absolute', top: 40, right: 40,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(11,4,24,0.8)',
        border: `1px solid #6B7280`,
        padding: '8px 16px', borderRadius: 6,
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 800,
        color: '#9CA3AF', letterSpacing: '0.15em',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9CA3AF' }} />
        OFFLINE
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Camera Frame — placeholder photo + corner brackets + name plate
// ─────────────────────────────────────────────


Object.assign(window, { StartingScene, EndingScene });
