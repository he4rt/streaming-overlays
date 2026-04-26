/* eslint-disable */
// ─────────────────────────────────────────────
// Quote / Highlight Scene — pull-quote moment, NYT-style
// Use case: convidado disse algo marcante; pause for emphasis (great for clip)
// ─────────────────────────────────────────────
(() => {
  const { useState, useEffect } = React;

  function QuoteScene({ tweaks }) {
    const {
      primary, accent,
      quoteText = 'A melhor tecnologia é aquela que some — você só percebe que ela existe quando para de funcionar.',
      quoteAuthor = 'Marina Costa',
      quoteAuthorRole = 'Senior Frontend Engineer',
      quoteContext = 'Sobre design de APIs',
      quoteVariant = 'editorial',
    } = tweaks;

    if (quoteVariant === 'serif') return <QuoteSerifVariant tweaks={tweaks} quoteText={quoteText} quoteAuthor={quoteAuthor} quoteAuthorRole={quoteAuthorRole} quoteContext={quoteContext} />;
    if (quoteVariant === 'minimal') return <QuoteMinimalVariant tweaks={tweaks} quoteText={quoteText} quoteAuthor={quoteAuthor} quoteAuthorRole={quoteAuthorRole} quoteContext={quoteContext} />;
    return <QuoteEditorialVariant tweaks={tweaks} quoteText={quoteText} quoteAuthor={quoteAuthor} quoteAuthorRole={quoteAuthorRole} quoteContext={quoteContext} />;
  }

  // ─── Editorial: massive sans-serif, gradient, bold (default)
  function QuoteEditorialVariant({ tweaks, quoteText, quoteAuthor, quoteAuthorRole, quoteContext }) {
    const { primary, accent } = tweaks;
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex' }}>
        {/* LEFT — quote (70%) */}
        <div style={{
          flex: '0 0 65%', position: 'relative',
          background: `linear-gradient(160deg, ${primary} 0%, #1a0530 60%, #0b0418 100%)`,
          padding: '90px 100px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* top: brand + context */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}>
              <HeartMark size={32} color={accent} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: '#fff', letterSpacing: '0.28em', fontWeight: 800,
              }}>HE4RT TALKS · {tweaks.episodeNumber}</span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 14px', borderRadius: 4,
              background: `${accent}22`, border: `1px solid ${accent}66`,
              fontFamily: 'Inter, sans-serif', fontSize: 12,
              color: accent, letterSpacing: '0.25em', fontWeight: 800,
              textTransform: 'uppercase',
            }}>
              ★ Momento marcante
              {quoteContext && (<><span style={{ color: `${accent}66` }}>·</span><span>{quoteContext}</span></>)}
            </div>
          </div>

          {/* center: huge quote */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', marginTop: 40 }}>
            {/* watermark quote mark */}
            <div style={{
              position: 'absolute', top: -60, left: -40,
              fontFamily: "'Russo One', sans-serif",
              fontSize: 360, color: `${accent}22`, lineHeight: 0.8,
              pointerEvents: 'none', userSelect: 'none',
            }}>"</div>
            <div style={{
              position: 'relative',
              fontFamily: "'Russo One', sans-serif",
              fontSize: 72, color: '#fff', lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textWrap: 'pretty',
            }}>
              <span style={{ color: accent, marginRight: 4 }}>"</span>
              <span style={{
                background: `linear-gradient(135deg, #fff 0%, #fff 60%, ${accent} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{quoteText}</span>
              <span style={{ color: accent, marginLeft: 4 }}>"</span>
            </div>
          </div>

          {/* bottom: attribution */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18, marginTop: 30,
          }}>
            <div style={{ width: 60, height: 1, background: accent }} />
            <div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 32,
                color: '#fff', lineHeight: 1.1,
              }}>{quoteAuthor}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: accent, letterSpacing: '0.18em', fontWeight: 700,
                marginTop: 4, textTransform: 'uppercase',
              }}>{quoteAuthorRole}</div>
            </div>
          </div>
        </div>

        {/* RIGHT — portrait card (35%) */}
        <div style={{
          flex: 1, position: 'relative',
          background: `radial-gradient(ellipse at center, ${accent}22 0%, #0b0418 80%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 60,
        }}>
          {/* portrait placeholder */}
          <div style={{
            width: '100%', maxWidth: 480, aspectRatio: '3/4',
            background: `linear-gradient(160deg, ${primary}66 0%, ${accent}33 100%)`,
            borderRadius: 24, position: 'relative', overflow: 'hidden',
            border: `1px solid ${accent}44`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.5)`,
          }}>
            {/* portrait blob */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.25) 0%, transparent 55%)`,
            }} />
            {/* corner brackets */}
            {['tl', 'tr', 'br', 'bl'].map((c, j) => {
              const pos = {
                tl: { top: 14, left: 14, br: '0 0 0 4px', bd: 'top left' },
                tr: { top: 14, right: 14, br: '0 0 0 4px', bd: 'top right' },
                br: { bottom: 14, right: 14, br: '0 0 0 4px', bd: 'bottom right' },
                bl: { bottom: 14, left: 14, br: '0 0 0 4px', bd: 'bottom left' },
              }[c];
              const borders = {
                tl: { borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
                tr: { borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
                br: { borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
                bl: { borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
              }[c];
              return (
                <div key={c} style={{
                  position: 'absolute', ...pos, ...borders,
                  width: 26, height: 26,
                }} />
              );
            })}
            {/* speaker label at bottom */}
            <div style={{
              position: 'absolute', left: 24, right: 24, bottom: 24,
              padding: '14px 18px', borderRadius: 12,
              background: 'rgba(11,4,24,0.85)', backdropFilter: 'blur(10px)',
              border: `1px solid ${accent}44`,
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 11,
                color: accent, letterSpacing: '0.22em', fontWeight: 700,
                textTransform: 'uppercase',
              }}>Falando agora</div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 22,
                color: '#fff', lineHeight: 1.1, marginTop: 4,
              }}>{quoteAuthor}</div>
            </div>
            {/* live dot */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 4,
              background: '#EF4444', color: '#fff',
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 800,
              letterSpacing: '0.18em',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#fff',
                animation: 'pulse 1.4s ease-in-out infinite',
              }} />
              LIVE
            </div>
          </div>
        </div>

        {/* clip CTA (bottom-right strip) */}
        <div style={{
          position: 'absolute', bottom: 30, right: 30,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 14px', borderRadius: 99,
          background: 'rgba(11,4,24,0.7)', backdropFilter: 'blur(10px)',
          border: `1px solid ${accent}44`,
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          <span style={{ color: accent }}>✂</span> clipa esse momento
        </div>
      </div>
    );
  }

  // ─── Serif: more classical, magazine pull-quote
  function QuoteSerifVariant({ tweaks, quoteText, quoteAuthor, quoteAuthorRole, quoteContext }) {
    const { primary, accent } = tweaks;
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${primary}55 0%, transparent 60%), #0b0418`,
        }} />

        <div style={{
          position: 'absolute', top: 50, left: 50,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <HeartMark size={28} color={accent} />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#fff', letterSpacing: '0.28em', fontWeight: 800,
          }}>HE4RT TALKS</span>
        </div>

        {/* center column */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 1500, width: '85%',
          textAlign: 'center',
        }}>
          {/* huge mark */}
          <div style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: 320, color: accent, lineHeight: 0.5,
            marginBottom: 10, fontWeight: 400,
          }}>"</div>

          {/* quote */}
          <div style={{
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: 64, color: '#fff', lineHeight: 1.2,
            fontStyle: 'italic', fontWeight: 400,
            textWrap: 'balance',
          }}>
            {quoteText}
          </div>

          {/* author */}
          <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 80, height: 1, background: accent }} />
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 28,
              color: '#fff', letterSpacing: '0.04em',
            }}>{quoteAuthor}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: accent, letterSpacing: '0.3em', fontWeight: 700,
              textTransform: 'uppercase',
            }}>{quoteAuthorRole}</div>
            {quoteContext && (
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginTop: 8,
              }}>— {quoteContext} —</div>
            )}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', fontWeight: 700,
          textTransform: 'uppercase',
        }}>{tweaks.episodeNumber} · {tweaks.episodeTitle}</div>
      </div>
    );
  }

  // ─── Minimal: stripped, just text on dark
  function QuoteMinimalVariant({ tweaks, quoteText, quoteAuthor, quoteAuthorRole, quoteContext }) {
    const { accent } = tweaks;
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#0b0418', overflow: 'hidden' }}>
        {/* subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${accent}11 1px, transparent 1px), linear-gradient(90deg, ${accent}11 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }} />

        <div style={{
          position: 'absolute', left: 100, top: 100, right: 100, bottom: 100,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 60,
        }}>
          <div style={{
            display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 14,
            fontFamily: 'ui-monospace, monospace', fontSize: 13,
            color: accent, letterSpacing: '0.3em', fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 40, height: 1, background: accent }} />
            Highlight {quoteContext && `· ${quoteContext}`}
          </div>

          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 96, color: '#fff', lineHeight: 1.05,
            letterSpacing: '-0.025em',
            textWrap: 'pretty',
            maxWidth: 1700,
          }}>
            {quoteText}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `linear-gradient(135deg, ${tweaks.primary}, ${accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Russo One', sans-serif", fontSize: 30,
              color: '#fff', textTransform: 'uppercase',
            }}>{quoteAuthor[0]}</div>
            <div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 36,
                color: '#fff', lineHeight: 1.1,
              }}>{quoteAuthor}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 16,
                color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', fontWeight: 600,
                marginTop: 6, textTransform: 'uppercase',
              }}>{quoteAuthorRole}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Object.assign(window, { QuoteScene });
})();
