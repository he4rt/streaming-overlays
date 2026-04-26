import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";

interface QuoteEditorialProps {
  config: TweakConfig;
}

export function QuoteEditorial({ config }: QuoteEditorialProps) {
  const { primary, accent, quoteText, quoteAuthor, quoteAuthorRole, quoteContext, episodeNumber, showCameraPlaceholders } = config;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex" }}>
      {/* LEFT — quote (65%) */}
      <div style={{
        flex: "0 0 65%", position: "relative",
        background: `linear-gradient(160deg, ${primary} 0%, #1a0530 60%, #0b0418 100%)`,
        padding: "90px 100px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {/* top: brand + context */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
            <HeartMark size={32} color={accent} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 13,
              color: "#fff", letterSpacing: "0.28em", fontWeight: 800,
            }}>HE4RT TALKS · {episodeNumber}</span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "6px 14px", borderRadius: 4,
            background: `${accent}22`, border: `1px solid ${accent}66`,
            fontFamily: "Inter, sans-serif", fontSize: 12,
            color: accent, letterSpacing: "0.25em", fontWeight: 800,
            textTransform: "uppercase",
          }}>
            ★ Momento marcante
            {quoteContext && (<><span style={{ color: `${accent}66` }}>·</span><span>{quoteContext}</span></>)}
          </div>
        </div>

        {/* center: huge quote */}
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", marginTop: 40 }}>
          {/* watermark quote mark */}
          <div style={{
            position: "absolute", top: -60, left: -40,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 360, color: `${accent}22`, lineHeight: 0.8,
            pointerEvents: "none", userSelect: "none",
          }}>"</div>
          <div style={{
            position: "relative",
            fontFamily: "'Russo One', sans-serif",
            fontSize: 72, color: "#fff", lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>
            <span style={{ color: accent, marginRight: 4 }}>"</span>
            <span style={{
              background: `linear-gradient(135deg, #fff 0%, #fff 60%, ${accent} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{quoteText}</span>
            <span style={{ color: accent, marginLeft: 4 }}>"</span>
          </div>
        </div>

        {/* bottom: attribution */}
        <div style={{
          display: "flex", alignItems: "center", gap: 18, marginTop: 30,
        }}>
          <div style={{ width: 60, height: 1, background: accent }} />
          <div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 32,
              color: "#fff", lineHeight: 1.1,
            }}>{quoteAuthor}</div>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 14,
              color: accent, letterSpacing: "0.18em", fontWeight: 700,
              marginTop: 4, textTransform: "uppercase",
            }}>{quoteAuthorRole}</div>
          </div>
        </div>
      </div>

      {/* RIGHT — portrait card (35%) */}
      <div style={{
        flex: 1, position: "relative",
        background: `radial-gradient(ellipse at center, ${accent}22 0%, #0b0418 80%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 60,
      }}>
        {/* portrait placeholder */}
        <div style={{
          width: "100%", maxWidth: 480, aspectRatio: "3/4",
          background: showCameraPlaceholders ? `linear-gradient(160deg, ${primary}66 0%, ${accent}33 100%)` : '#00FF00',
          borderRadius: 24, position: "relative", overflow: "hidden",
          border: `1px solid ${accent}44`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}>
          {/* portrait blob */}
          {showCameraPlaceholders && (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.25) 0%, transparent 55%)",
          }} />
          )}
          {/* corner brackets */}
          {(["tl", "tr", "br", "bl"] as const).map((c) => {
            const posMap: Record<string, React.CSSProperties> = {
              tl: { top: 14, left: 14, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
              tr: { top: 14, right: 14, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
              br: { bottom: 14, right: 14, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
              bl: { bottom: 14, left: 14, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
            };
            return (
              <div key={c} style={{
                position: "absolute", ...posMap[c],
                width: 26, height: 26,
              }} />
            );
          })}
          {/* speaker label at bottom */}
          <div style={{
            position: "absolute", left: 24, right: 24, bottom: 24,
            padding: "14px 18px", borderRadius: 12,
            background: "rgba(11,4,24,0.85)", backdropFilter: "blur(10px)",
            border: `1px solid ${accent}44`,
          }}>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 11,
              color: accent, letterSpacing: "0.22em", fontWeight: 700,
              textTransform: "uppercase",
            }}>Falando agora</div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 22,
              color: "#fff", lineHeight: 1.1, marginTop: 4,
            }}>{quoteAuthor}</div>
          </div>
          {/* live dot */}
          <div style={{
            position: "absolute", top: 20, right: 20,
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 10px", borderRadius: 4,
            background: "#EF4444", color: "#fff",
            fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 800,
            letterSpacing: "0.18em",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#fff",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            LIVE
          </div>
        </div>
      </div>

      {/* clip CTA (bottom-right strip) */}
      <div style={{
        position: "absolute", bottom: 30, right: 30,
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "8px 14px", borderRadius: 99,
        background: "rgba(11,4,24,0.7)", backdropFilter: "blur(10px)",
        border: `1px solid ${accent}44`,
        fontFamily: "Inter, sans-serif", fontSize: 11,
        color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em", fontWeight: 700,
        textTransform: "uppercase",
      }}>
        <span style={{ color: accent }}>✂</span> clipa esse momento
      </div>
    </div>
  );
}
