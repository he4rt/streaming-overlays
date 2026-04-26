/* eslint-disable */
// ─────────────────────────────────────────────
// Question Scene — Audience question highlighted, cams reduced
// Use case: hosts pause to answer a viewer question
// ─────────────────────────────────────────────
(() => {
  const { useState, useEffect } = React;

  function QuestionScene({ tweaks }) {
    const {
      primary, accent,
      questionAuthor = 'jpcoder',
      questionAuthorBadge = 'SUB',
      questionText = 'Vale a pena começar com Rust em 2026 mesmo sem experiência com sistemas de baixo nível?',
      questionFrom = 'twitch.tv/he4rttalks',
      guest1Name, guest1Role, guest2Name, guest2Role,
    } = tweaks;

    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* ambient bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 20% 30%, ${primary}55 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, ${accent}33 0%, transparent 50%)`,
        }} />

        {/* top eyebrow */}
        <div style={{
          position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)',
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '10px 22px',
          background: 'rgba(11,4,24,0.7)', backdropFilter: 'blur(14px)',
          border: `1px solid ${accent}66`, borderRadius: 99,
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: accent, letterSpacing: '0.3em', fontWeight: 800,
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: accent,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          Pergunta da Audiência
          <span style={{ color: `${accent}55` }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em' }}>{questionFrom}</span>
        </div>

        {/* HUGE quote mark watermark */}
        <div style={{
          position: 'absolute', top: 100, left: 80,
          fontFamily: "'Russo One', sans-serif", fontSize: 720,
          color: `${accent}11`, lineHeight: 0.7,
          pointerEvents: 'none', userSelect: 'none',
        }}>"</div>

        {/* MAIN — question card centered */}
        <div style={{
          position: 'absolute', left: 140, right: 140, top: 160, bottom: 280,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: 32,
        }}>
          {/* author row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg, ${primary}, ${accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Russo One', sans-serif", fontSize: 28,
              color: '#fff', textTransform: 'uppercase',
              boxShadow: `0 8px 24px ${primary}66`,
            }}>{questionAuthor[0]}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {questionAuthorBadge && (
                  <span style={{
                    padding: '3px 10px', borderRadius: 4,
                    background: accent,
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 800,
                    color: '#0b0418', letterSpacing: '0.15em',
                  }}>{questionAuthorBadge}</span>
                )}
                <span style={{
                  fontFamily: "'Russo One', sans-serif", fontSize: 28,
                  color: '#fff', letterSpacing: '0.01em',
                }}>{questionAuthor}</span>
              </div>
              <div style={{
                marginTop: 4,
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: accent, letterSpacing: '0.18em', fontWeight: 700,
                textTransform: 'uppercase',
              }}>perguntou ao vivo</div>
            </div>
          </div>

          {/* the question */}
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 76, color: '#fff', lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textWrap: 'pretty',
            maxWidth: 1500,
          }}>
            {questionText}
          </div>

          {/* tag row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            <span style={{
              padding: '6px 12px', borderRadius: 4,
              background: `${primary}33`, border: `1px solid ${accent}33`,
              color: '#fff',
            }}>respondendo agora</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span>{tweaks.episodeNumber} · {tweaks.episodeTitle}</span>
          </div>
        </div>

        {/* BOTTOM — small camera strip with hosts */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 240,
          background: 'linear-gradient(180deg, transparent 0%, rgba(11,4,24,0.85) 50%)',
          padding: '40px 60px',
          display: 'flex', alignItems: 'flex-end', gap: 24,
        }}>
          {[
            { name: guest1Name, role: guest1Role, label: 'CAM 01' },
            { name: guest2Name, role: guest2Role, label: 'CAM 02' },
          ].map((g, i) => (
            <div key={i} style={{
              flex: 1, height: 160,
              background: `linear-gradient(160deg, ${primary}33 0%, ${primary}11 100%)`,
              borderRadius: 12,
              border: `1px solid ${accent}44`,
              position: 'relative', overflow: 'hidden',
              padding: 16,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              {/* corner brackets */}
              {[
                { top: 6, left: 6, br: '0 0 0 0', rotate: 0 },
                { top: 6, right: 6, br: '0 0 0 0', rotate: 90 },
                { bottom: 6, right: 6, br: '0 0 0 0', rotate: 180 },
                { bottom: 6, left: 6, br: '0 0 0 0', rotate: 270 },
              ].map((c, j) => (
                <div key={j} style={{
                  position: 'absolute', ...c,
                  width: 14, height: 14,
                  borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`,
                  transform: `rotate(${c.rotate}deg)`,
                }} />
              ))}
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 22,
                color: '#fff', lineHeight: 1.1,
              }}>{g.name}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: accent, letterSpacing: '0.15em', marginTop: 4,
                fontWeight: 700, textTransform: 'uppercase',
              }}>{g.role}</div>
              {/* live dot */}
              <div style={{
                position: 'absolute', top: 14, right: 14,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '3px 10px', borderRadius: 4,
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
          ))}

          {/* counter */}
          <div style={{
            flex: '0 0 auto', width: 200, height: 160,
            background: 'rgba(11,4,24,0.6)', backdropFilter: 'blur(14px)',
            border: `1px solid ${accent}33`, borderRadius: 12,
            padding: 18,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              color: accent, letterSpacing: '0.25em', fontWeight: 700,
              textTransform: 'uppercase',
            }}>Perguntas na fila</div>
            <div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 56,
                color: '#fff', lineHeight: 1,
              }}>{tweaks.questionQueue || 12}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.5)', marginTop: 4,
              }}>aguardando</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Object.assign(window, { QuestionScene });
})();
