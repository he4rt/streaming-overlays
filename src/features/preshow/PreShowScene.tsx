import { useState, useEffect } from "react";
import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";

function LiveCounter({ start = 1247, color, size = 56 }: { start?: number; color: string; size?: number }) {
  const [n, setN] = useState(start);
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => v + Math.floor(Math.random() * 5) + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      fontFamily: "'Russo One', sans-serif", fontSize: size,
      color: '#fff', fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.02em',
      textShadow: `0 0 24px ${color}88`,
    }}>{n.toLocaleString('pt-BR')}</span>
  );
}

export function PreShowScene() {
  const t = useOverlayConfig();
  const {
    primary, accent, showCameraPlaceholders,
    preshowHostName, preshowHostHandle, preshowAgenda,
    preshowOnlineStart, preshowHashtag, preshowGuestTeaser,
    episodeNumber, episodeTitle, topic,
  } = t;

  return (
    <Stage>
      <Overlay>
        <div style={{ position: 'absolute', inset: 0, right: t.showChat ? 480 : 0 }}>
          {/* full-bleed cam area */}
          <div style={{
            position: 'absolute', inset: 0,
            background: showCameraPlaceholders
              ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0 14px, transparent 14px 28px), linear-gradient(135deg, ${primary}22, #050110 70%)`
              : '#00FF00',
            overflow: 'hidden',
          }}>
            {showCameraPlaceholders && (<>
              {/* radial vignette */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(0,0,0,0.55) 80%)',
              }} />

              {/* center placeholder hint */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
                color: 'rgba(255,255,255,0.25)',
              }}>
                <div style={{
                  width: 84, height: 84, borderRadius: '50%',
                  border: `2px dashed ${accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'glow 3s ease-in-out infinite',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: '#EF4444',
                    boxShadow: '0 0 24px #EF4444',
                    animation: 'pulse 1.4s ease-in-out infinite',
                  }} />
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 800,
                  letterSpacing: '0.4em',
                }}>CÂMERA · {preshowHostName.toUpperCase()}</div>
              </div>
            </>)}

            {/* gradient bottom */}
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 320,
              background: 'linear-gradient(180deg, transparent, rgba(11,4,24,0.85))',
            }} />

            {/* gradient top */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 200,
              background: 'linear-gradient(180deg, rgba(11,4,24,0.7), transparent)',
            }} />
          </div>

          {/* TOP-LEFT — episode + live tag */}
          <div style={{
            position: 'absolute', left: 56, top: 100,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 14px', borderRadius: 4,
              background: '#EF4444', color: '#fff',
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              letterSpacing: '0.32em', fontWeight: 800,
              width: 'fit-content',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#fff',
                animation: 'pulse 1s ease-in-out infinite',
              }} />
              AO VIVO
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.4em', fontWeight: 700,
            }}>HE4RT TALKS · {episodeNumber} · PRÉ-SHOW</div>
          </div>

          {/* TOP-RIGHT — online counter */}
          <div style={{
            position: 'absolute', top: 100, right: 60,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 14px',
            background: 'rgba(11,4,24,0.45)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 999,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 12px #22c55e',
              animation: 'pulse 1.4s ease-in-out infinite',
            }} />
            <LiveCounter start={preshowOnlineStart} color={accent} size={16} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              color: 'rgba(255,255,255,0.55)', fontWeight: 600,
              letterSpacing: '0.16em',
            }}>online</span>
          </div>

          {/* BOTTOM — big title + topic + host plate */}
          <div style={{
            position: 'absolute', left: 56, bottom: 60, right: 60,
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, color: accent,
              letterSpacing: '0.4em', fontWeight: 700, marginBottom: 14,
            }}>HOJE</div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 84,
              color: '#fff', lineHeight: 0.92, letterSpacing: '-0.02em',
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}>{episodeTitle}<span style={{ color: accent }}>.</span></div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18,
              color: 'rgba(255,255,255,0.75)', marginTop: 16, lineHeight: 1.4,
              maxWidth: 720, fontWeight: 500,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}>{topic}</div>

            {/* host plate */}
            <div style={{
              marginTop: 24,
              display: 'inline-flex', alignItems: 'center', gap: 14,
              padding: '12px 18px',
              background: 'rgba(11,4,24,0.45)', backdropFilter: 'blur(20px)',
              border: `1px solid ${accent}44`,
              borderRadius: 12,
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 4,
                background: accent, color: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 10,
                letterSpacing: '0.32em', fontWeight: 800,
              }}>HOST</div>
              <div style={{
                fontFamily: "'Russo One', sans-serif", fontSize: 18, color: '#fff',
              }}>{preshowHostName}</div>
              <span style={{ color: `${accent}55` }}>·</span>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: 'rgba(255,255,255,0.7)', fontWeight: 500,
              }}>{preshowHostHandle}</div>
            </div>
          </div>

          {/* BOTTOM-RIGHT — agenda */}
          <div style={{
            position: 'absolute', right: 60, bottom: 60,
            width: 280, textAlign: 'right',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, color: accent,
              letterSpacing: '0.32em', fontWeight: 800, marginBottom: 12,
            }}>NESSA LIVE</div>
            {preshowAgenda.slice(0, 3).map((a, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                justifyContent: 'flex-end',
                marginTop: i ? 8 : 0,
                opacity: 0.95 - i * 0.15,
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.35, fontWeight: 500,
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}>{a}</div>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', background: accent,
                  marginTop: 7, flexShrink: 0,
                  boxShadow: `0 0 8px ${accent}`,
                }} />
              </div>
            ))}
          </div>

          {/* CENTER-RIGHT — guest teaser */}
          <div style={{
            position: 'absolute', right: 60, top: 200,
            width: 280, textAlign: 'right',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.32em', fontWeight: 700, marginBottom: 6,
            }}>EM BREVE</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4, fontWeight: 500, fontStyle: 'italic',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}>"{preshowGuestTeaser}"</div>
          </div>

          {/* hashtag */}
          <div style={{
            position: 'absolute', left: 56, top: 160,
            fontFamily: "'Russo One', sans-serif", fontSize: 14,
            color: accent, letterSpacing: '0.18em',
            opacity: 0.8,
          }}>{preshowHashtag}</div>
        </div>
      </Overlay>
    </Stage>
  );
}
