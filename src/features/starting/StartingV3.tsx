import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartMark } from "@/shared/components/HeartMark";
import { BubbleChatStrip } from "@/shared/chat/BubbleChatStrip";

interface StartingV3Props {
  config: TweakConfig;
}

export function StartingV3({ config }: StartingV3Props) {
  const {
    primary,
    accent,
    startingSubtitle,
    episodeTitle,
    episodeNumber,
    topic,
    date,
    time,
    startingCountdownSeconds,
    guest1Name,
    guest1Role,
    guest2Name,
    guest2Role,
    showCameraPlaceholders,
  } = config;

  const { mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      {/* LEFT — editorial */}
      <div style={{
        position: "relative",
        background: `linear-gradient(160deg, ${primary} 0%, #1a0530 60%, #0b0418 100%)`,
        padding: "80px 72px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {/* top */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <HeartMark size={32} color={accent} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 14,
              color: "#fff", letterSpacing: "0.25em", fontWeight: 800,
            }}>HE4RT TALKS</span>
          </div>
          <div style={{
            fontFamily: "ui-monospace, monospace", fontSize: 13,
            color: accent, letterSpacing: "0.25em", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 14,
          }}>{episodeNumber} · {topic}</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 88, color: "#fff", lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}>{episodeTitle}</div>
          <div style={{
            marginTop: 24,
            fontFamily: "Inter, sans-serif", fontSize: 22,
            color: "rgba(255,255,255,0.8)", lineHeight: 1.4,
            maxWidth: 560,
          }}>{startingSubtitle}</div>
        </div>

        {/* countdown block — bottom */}
        <div>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: accent, letterSpacing: "0.3em", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: accent }} />
            Começa em
          </div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 180, color: "#fff", lineHeight: 1,
            letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums",
            display: "flex", alignItems: "baseline", gap: 8,
          }}>
            <span>{mm}</span>
            <span style={{ color: accent }}>:</span>
            <span>{ss}</span>
            <span style={{
              fontSize: 32, color: accent, marginLeft: 16, letterSpacing: "0.2em",
            }}>MIN</span>
          </div>
          <div style={{
            marginTop: 24, display: "flex", alignItems: "center", gap: 20,
            fontFamily: "Inter, sans-serif", fontSize: 16,
            color: "rgba(255,255,255,0.6)", fontWeight: 600,
          }}>
            <span>{date}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span>{time}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span style={{
              padding: "4px 10px", background: "#EF4444",
              borderRadius: 4, color: "#fff", fontSize: 12, fontWeight: 800,
              letterSpacing: "0.18em",
            }}>EM BREVE</span>
          </div>
        </div>
      </div>

      {/* RIGHT — guest portraits + bubble chat */}
      <div style={{
        position: "relative",
        background: `radial-gradient(ellipse at top right, ${accent}33 0%, #0b0418 60%)`,
        overflow: "hidden",
      }}>
        {/* mosaic of guest cards */}
        <div style={{
          position: "absolute", top: 80, left: 60, right: 60,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18,
        }}>
          {[{ name: guest1Name, role: guest1Role, color: accent }, { name: guest2Name, role: guest2Role, color: primary }].map((g, i) => (
            <div key={i} style={{
              aspectRatio: "3/4",
              background: showCameraPlaceholders ? `linear-gradient(160deg, ${g.color}88 0%, ${g.color}33 100%)` : '#00FF00',
              borderRadius: 16, border: `1px solid ${accent}44`,
              padding: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end",
              position: "relative", overflow: "hidden",
              animation: `floatY 5s ease-in-out ${i * 0.6}s infinite`,
            }}>
              {/* placeholder portrait blob */}
              {showCameraPlaceholders && (
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 80,
                background: `radial-gradient(circle at 50% 60%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              }} />
              )}
              <div style={{
                position: "absolute", top: 16, right: 16,
                width: 32, height: 32, borderRadius: "50%",
                border: `2px solid ${accent}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 800,
              }}>{i + 1}</div>
              <div>
                <div style={{
                  fontFamily: "'Russo One', sans-serif", fontSize: 22, color: "#fff", lineHeight: 1.1,
                }}>{g.name}</div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.1em", marginTop: 4, fontWeight: 600, textTransform: "uppercase",
                }}>{g.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* bubble chat strip floating on the right */}
        <BubbleChatStrip config={config} side="right" />
      </div>
    </div>
  );
}
