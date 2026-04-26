import { useState, useEffect } from "react";
import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { PollIcon } from "./PollIcon";

export function PollScene() {
  const t = useOverlayConfig();
  const {
    primary,
    accent,
    bgDeep,
    pollQuestion,
    pollTotalVotes,
    pollTimeLeft,
  } = t;

  const opts = t.pollOptions ?? [
    { label: "Rust 🦀", votes: 712, color: "#F97316" },
    { label: "Go 🐹", votes: 524, color: "#22D3EE" },
    { label: "TypeScript", votes: 481, color: "#3B82F6" },
    { label: "Outro (manda no chat)", votes: 130, color: "#A78BFA" },
  ];
  const total = opts.reduce((s, o) => s + o.votes, 0) || 1;

  // animated reveal
  const [revealed, setRevealed] = useState(opts.map(() => 0));
  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setRevealed(opts.map((o, i) => {
        const target = (o.votes / total);
        const delay = i * 8;
        const progress = Math.max(0, Math.min(1, (frame - delay) / 30));
        const eased = 1 - Math.pow(1 - progress, 3);
        return target * eased;
      }));
      if (frame > 60) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollTotalVotes, JSON.stringify(opts.map(o => o.votes))]);

  // total ticker (counts up)
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.ceil((pollTotalVotes - v) / 12);
      if (v >= pollTotalVotes) { v = pollTotalVotes; clearInterval(id); }
      setTicker(v);
    }, 30);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollTotalVotes]);

  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: bgDeep }}>
        {/* bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 20%, ${primary}55 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, ${accent}33 0%, transparent 60%)`,
        }} />

        {/* eyebrow */}
        <div style={{
          position: "absolute", top: 50, left: "50%", transform: "translateX(-50%)",
          display: "inline-flex", alignItems: "center", gap: 14,
          padding: "10px 24px",
          background: "rgba(11,4,24,0.7)", backdropFilter: "blur(14px)",
          border: `1px solid ${accent}66`, borderRadius: 99,
          fontFamily: "Inter, sans-serif", fontSize: 13,
          color: accent, letterSpacing: "0.3em", fontWeight: 800,
          textTransform: "uppercase",
        }}>
          <PollIcon color={accent} />
          Enquete ao vivo
          <span style={{ color: `${accent}55` }}>·</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#fff", letterSpacing: "0.15em",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#22C55E",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            Aberta · {pollTimeLeft} restantes
          </span>
        </div>

        {/* MAIN — question + bars */}
        <div style={{
          position: "absolute", left: 120, right: 120, top: 140, bottom: 220,
          display: "flex", flexDirection: "column", gap: 36,
        }}>
          {/* question */}
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 64, color: "#fff", lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 1400,
          }}>
            {pollQuestion}
          </div>

          {/* leading indicator */}
          {(() => {
            const leader = opts.reduce((a, b) => (a.votes > b.votes ? a : b));
            return (
              <div style={{
                display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 10,
                fontFamily: "Inter, sans-serif", fontSize: 14,
                color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em", fontWeight: 700,
                textTransform: "uppercase",
              }}>
                <span>Liderando</span>
                <span style={{
                  padding: "4px 12px", borderRadius: 4,
                  background: leader.color, color: "#fff",
                  fontWeight: 800,
                }}>{leader.label}</span>
                <span style={{
                  color: leader.color, fontWeight: 800, letterSpacing: "0.05em",
                }}>{Math.round((leader.votes / total) * 100)}%</span>
              </div>
            );
          })()}

          {/* bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
            {opts.map((o, i) => {
              const pct = revealed[i] || 0;
              const finalPct = o.votes / total;
              const isLeader = o.votes === Math.max(...opts.map(x => x.votes));
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  {/* number bullet */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: `${o.color}22`, border: `1px solid ${o.color}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "'Russo One', sans-serif", fontSize: 26,
                    color: o.color,
                  }}>{i + 1}</div>

                  {/* label + bar column */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex", alignItems: "baseline", justifyContent: "space-between",
                      marginBottom: 8,
                    }}>
                      <span style={{
                        fontFamily: "'Russo One', sans-serif", fontSize: 28,
                        color: "#fff", letterSpacing: "0.01em",
                      }}>{o.label}</span>
                      <span style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                        <span style={{
                          fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: "rgba(255,255,255,0.5)",
                        }}>{o.votes.toLocaleString("pt-BR")} votos</span>
                        <span style={{
                          fontFamily: "'Russo One', sans-serif", fontSize: 36,
                          color: isLeader ? o.color : "#fff", lineHeight: 1,
                        }}>{Math.round(pct * 100)}<span style={{ fontSize: 22 }}>%</span></span>
                      </span>
                    </div>
                    <div style={{
                      position: "relative", height: 14, borderRadius: 7,
                      background: `${o.color}1a`, overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: `${pct * 100}%`,
                        background: `linear-gradient(90deg, ${o.color}, ${o.color}cc)`,
                        borderRadius: 7,
                        boxShadow: isLeader ? `0 0 24px ${o.color}88` : "none",
                        transition: "width 0.05s linear",
                      }}>
                        {/* shine */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                          borderRadius: 7,
                        }} />
                      </div>
                      {/* leader marker */}
                      {isLeader && pct === finalPct && (
                        <div style={{
                          position: "absolute", top: "50%", transform: "translateY(-50%)",
                          left: `calc(${pct * 100}% - 16px)`,
                          width: 32, height: 32, borderRadius: "50%",
                          background: o.color, border: "3px solid #0b0418",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 14, fontWeight: 800,
                        }}>★</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM bar — vote count + how to vote */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 180,
          background: "linear-gradient(180deg, transparent 0%, rgba(11,4,24,0.9) 50%)",
          padding: "40px 100px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
        }}>
          {/* big vote count */}
          <div>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 12,
              color: accent, letterSpacing: "0.3em", fontWeight: 700,
              textTransform: "uppercase",
            }}>Total de votos</div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 72,
              color: "#fff", lineHeight: 1, marginTop: 6,
              display: "flex", alignItems: "baseline", gap: 14,
            }}>
              {ticker.toLocaleString("pt-BR")}
              <span style={{
                fontSize: 18, color: "#22C55E", letterSpacing: "0.1em",
                animation: "pulse 1.4s ease-in-out infinite",
              }}>● ao vivo</span>
            </div>
          </div>

          {/* how to vote */}
          <div style={{
            display: "flex", alignItems: "center", gap: 32,
            padding: "20px 28px",
            background: "rgba(11,4,24,0.6)", backdropFilter: "blur(14px)",
            border: `1px solid ${accent}33`, borderRadius: 16,
          }}>
            <div>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 11,
                color: accent, letterSpacing: "0.25em", fontWeight: 700,
                textTransform: "uppercase",
              }}>Como votar</div>
              <div style={{
                fontFamily: "ui-monospace, monospace", fontSize: 18,
                color: "#fff", marginTop: 6,
              }}>!vote 1 · !vote 2 · !vote 3 · !vote 4</div>
            </div>
            <div style={{ width: 1, height: 50, background: `${accent}33` }} />
            <div>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 11,
                color: accent, letterSpacing: "0.25em", fontWeight: 700,
                textTransform: "uppercase",
              }}>No Discord</div>
              <div style={{
                fontFamily: "ui-monospace, monospace", fontSize: 18,
                color: "#fff", marginTop: 6,
              }}>discord.app/he4rt</div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}
