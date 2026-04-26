import { useState, useEffect } from "react";
import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { HeartMark } from "@/shared/components/HeartMark";
import type { TweakConfig } from "@/shared/types";

interface WallMessage {
  user: string;
  color: string;
  msg: string;
  heart?: boolean;
}

const WALL: WallMessage[] = [
  { user: "devbruno", color: "#A855F7", msg: "esse foi o melhor papo do ano", heart: true },
  { user: "mariana_dev", color: "#EC4899", msg: "aprendi mais aqui do que na faculdade kkkkk" },
  { user: "jpcoder", color: "#3B82F6", msg: "a parte sobre rust no backend valeu por todo o episódio 🔥" },
  { user: "sara.tech", color: "#10B981", msg: "mandando salve do RJ! 🍻" },
  { user: "igorzinho", color: "#F59E0B", msg: "comunidade he4rt é tudo" },
  { user: "paula_qa", color: "#EF4444", msg: "a Marina tem que voltar mais vezes!! 💜" },
  { user: "tio_dev", color: "#06B6D4", msg: "já tô esperando o próximo" },
  { user: "ana_design", color: "#A855F7", msg: "que setup, que produção, que papo. parabéns gente." },
  { user: "mateus_ml", color: "#EC4899", msg: "partiu refatorar a api hoje à noite" },
  { user: "fabi.codes", color: "#84CC16", msg: "discordância saudável é o que faz dev crescer" },
  { user: "rodrigo_ops", color: "#F97316", msg: "TIL: nunca mais escrevo middleware sem testar" },
  { user: "carolfront", color: "#3B82F6", msg: "+1 pelos chips de tópico nas próximas, ficou show" },
  { user: "pedro.dev", color: "#A855F7", msg: 'a parte do "código é texto, não arte" foi gold' },
  { user: "lara_iot", color: "#10B981", msg: "live no celular debaixo do edredom representa", heart: true },
  { user: "gust_be", color: "#EC4899", msg: "nunca falto, vou levar o casal todo" },
  { user: "bia.ux", color: "#06B6D4", msg: "design + dev numa boa, isso aqui é raro" },
];

function ChatTile({ m, big }: { m: WallMessage; big: boolean }) {
  const initial = m.user[0]!.toUpperCase();
  return (
    <div style={{
      position: "relative",
      padding: big ? "22px 24px" : "16px 18px",
      background: "rgba(11,4,24,0.72)",
      backdropFilter: "blur(14px)",
      border: `1px solid ${m.color}44`,
      borderRadius: 14,
      display: "flex", gap: 14, alignItems: "flex-start",
      animation: "pop 0.5s ease-out backwards, drift 6s ease-in-out infinite",
      animationDelay: `${Math.random() * 0.6}s, ${Math.random() * 4}s`,
      boxShadow: big ? `0 12px 40px ${m.color}33` : "none",
    }}>
      <div style={{
        width: big ? 44 : 36, height: big ? 44 : 36, borderRadius: "50%",
        background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        fontFamily: "'Russo One', sans-serif",
        fontSize: big ? 18 : 14, color: "#fff",
      }}>{initial}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: big ? 14 : 12, fontWeight: 700,
          color: m.color, marginBottom: 4,
          letterSpacing: "0.02em",
        }}>{m.user}</div>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: big ? 19 : 15,
          color: "rgba(255,255,255,0.92)", lineHeight: 1.35,
          fontWeight: big ? 500 : 400,
        }}>{m.msg}</div>
      </div>
      {m.heart && (
        <div style={{
          position: "absolute", top: -10, right: -10,
          width: 28, height: 28, borderRadius: "50%",
          background: "#EC4899",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px #EC489966",
        }}>
          <span style={{ fontSize: 14 }}>♥</span>
        </div>
      )}
    </div>
  );
}

function StatTile({
  n,
  label,
  sub,
  accent,
}: {
  n: number;
  label: string;
  sub: string;
  accent: string;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | undefined;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1400);
      setVal(Math.floor(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  return (
    <div style={{
      padding: "20px 22px",
      background: "rgba(11,4,24,0.7)",
      backdropFilter: "blur(14px)",
      border: `1px solid ${accent}44`,
      borderRadius: 14,
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{
        fontFamily: "'Russo One', sans-serif", fontSize: 44,
        color: "#fff", lineHeight: 1, letterSpacing: "-0.01em",
        fontVariantNumeric: "tabular-nums",
        animation: "startingPulse 2.4s ease-in-out infinite",
      }}>{val.toLocaleString("pt-BR")}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 11,
        color: accent, letterSpacing: "0.32em", marginTop: 6, fontWeight: 700,
      }}>{label}</div>
      {sub && <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 12,
        color: "rgba(255,255,255,0.5)", marginTop: 2, fontWeight: 500,
      }}>{sub}</div>}
    </div>
  );
}

export function EndingScene() {
  const t = useOverlayConfig();
  const {
    primary,
    accent,
    endingTitle,
    endingSubtitle,
    episodeNumber,
    nextEpisodeNumber,
    nextEpisodeTitle,
    nextEpisodeGuest,
    nextEpisodeDate,
    endStatViewers,
    endStatMessages,
    endStatSubs,
    endStatQuestions,
  } = t;

  const titleParts = String(endingTitle).split(" ");
  const titleLine1 = titleParts.slice(0, 1).join(" ");
  const titleLine2 = titleParts.slice(1, -1).join(" ") || titleParts[0];
  const titleLine3 = titleParts.slice(-1).join(" ");
  const useThreeLines = titleParts.length >= 3;

  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* base */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, ${primary}55 0%, transparent 55%),
                       radial-gradient(ellipse at 70% 80%, #EC489922 0%, transparent 55%),
                       linear-gradient(135deg, #0b0418 0%, #050110 100%)`,
        }} />
        <ParticleField enabled={t.showHeartParticles} color={accent} />

        {/* TOP — heart logo + episode encerrada badge */}
        <div style={{
          position: "absolute", top: 48, left: 64, right: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <HeartMark size={32} color={accent} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 12,
              color: "#fff", letterSpacing: "0.32em", fontWeight: 800,
            }}>HE4RT TALKS · {episodeNumber}</span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 18px", borderRadius: 6,
            background: accent, color: "#fff",
            fontFamily: "Inter, sans-serif", fontSize: 11,
            letterSpacing: "0.3em", fontWeight: 800,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#fff",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            AO VIVO ENCERRADA
          </div>
        </div>

        {/* HEADER block */}
        <div style={{
          position: "absolute", left: 64, top: 130, width: 820,
        }}>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: accent, letterSpacing: "0.4em", fontWeight: 700,
          }}>OBRIGADO POR ASSISTIR</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 120, color: "#fff", lineHeight: 0.9,
            marginTop: 18, letterSpacing: "-0.02em",
          }}>
            {useThreeLines ? (
              <>
                {titleLine1}<br />
                <span style={{
                  background: `linear-gradient(135deg, ${accent}, #EC4899)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{titleLine2}</span><br />
                {titleLine3}<span style={{ color: accent }}>.</span>
              </>
            ) : (
              <span style={{
                background: `linear-gradient(135deg, #fff, ${accent})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{endingTitle}</span>
            )}
          </div>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 22,
            color: "rgba(255,255,255,0.65)", marginTop: 24, lineHeight: 1.4,
            maxWidth: 720, fontWeight: 500,
          }}>
            {endingSubtitle}
          </div>

          {/* Stats row */}
          <div style={{
            marginTop: 36,
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
            maxWidth: 760,
          }}>
            <StatTile n={endStatViewers}   label="VIEWERS"    sub="pico simultâneo" accent={accent} />
            <StatTile n={endStatMessages}  label="MENSAGENS"  sub="no chat ao vivo" accent={accent} />
            <StatTile n={endStatSubs}      label="NOVOS SUBS" sub="bem-vindos!"     accent={accent} />
            <StatTile n={endStatQuestions} label="PERGUNTAS"  sub="respondidas"     accent={accent} />
          </div>

          {/* CTA cluster */}
          <div style={{
            marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 760,
          }}>
            {[
              { label: "discord.app/he4rt",    sub: "fica na conversa",  color: "#5865F2" },
              { label: "@he4rtdevs",           sub: "instagram",         color: "#EC4899" },
              { label: "/he4rt",               sub: "youtube",           color: "#EF4444" },
              { label: "twitch.tv/he4rttalks", sub: "próxima live",      color: "#9146FF" },
            ].map((c, i) => (
              <div key={i} style={{
                padding: "12px 16px",
                border: `1px solid ${c.color}88`,
                background: `${c.color}11`,
                borderRadius: 10,
                minWidth: 170,
              }}>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 16,
                  color: "#fff", fontWeight: 700,
                }}>{c.label}</div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 11,
                  color: c.color, marginTop: 4, fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MURAL — masonry on the right (3 flex columns, distributed) */}
        <div style={{
          position: "absolute", top: 130, right: 64, bottom: 100,
          width: 920,
          display: "flex", gap: 14,
        }}>
          {[0, 1, 2].map((col) => (
            <div key={col} style={{
              flex: 1, display: "flex", flexDirection: "column", gap: 14,
            }}>
              {WALL.filter((_, i) => i % 3 === col).map((m, i) => {
                const idx = i * 3 + col;
                return (
                  <ChatTile key={idx} m={m} big={idx === 0 || idx === 5 || idx === 9} />
                );
              })}
            </div>
          ))}
        </div>

        {/* BOTTOM — next episode strip */}
        <div style={{
          position: "absolute", left: 64, right: 64, bottom: 36,
          display: "flex", alignItems: "center", gap: 18,
          padding: "14px 20px",
          background: "rgba(11,4,24,0.78)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${accent}44`,
          borderRadius: 14,
        }}>
          <div style={{
            padding: "6px 12px", borderRadius: 4,
            background: accent, color: "#fff",
            fontFamily: "Inter, sans-serif", fontSize: 11,
            letterSpacing: "0.32em", fontWeight: 800,
          }}>PRÓXIMO {nextEpisodeNumber}</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif", fontSize: 22,
            color: "#fff",
          }}>{nextEpisodeTitle}</div>
          <span style={{ color: `${accent}55` }}>·</span>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 16,
            color: "rgba(255,255,255,0.7)", fontWeight: 500,
          }}>{nextEpisodeGuest}</div>
          <div style={{ flex: 1 }} />
          <div style={{
            fontFamily: "'Russo One', sans-serif", fontSize: 22,
            color: accent,
          }}>{nextEpisodeDate}</div>
        </div>
      </div>
    </Stage>
  );
}
