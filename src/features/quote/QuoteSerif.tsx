import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";

interface QuoteSerifProps {
  config: TweakConfig;
}

export function QuoteSerif({ config }: QuoteSerifProps) {
  const { primary, accent, quoteText, quoteAuthor, quoteAuthorRole, quoteContext, episodeNumber, episodeTitle } = config;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, ${primary}55 0%, transparent 60%), #0b0418`,
      }} />

      <div style={{
        position: "absolute", top: 50, left: 50,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <HeartMark size={28} color={accent} />
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 13,
          color: "#fff", letterSpacing: "0.28em", fontWeight: 800,
        }}>HE4RT TALKS</span>
      </div>

      {/* center column */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: 1500, width: "85%",
        textAlign: "center",
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
          fontSize: 64, color: "#fff", lineHeight: 1.2,
          fontStyle: "italic", fontWeight: 400,
        }}>
          {quoteText}
        </div>

        {/* author */}
        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 80, height: 1, background: accent }} />
          <div style={{
            fontFamily: "'Russo One', sans-serif", fontSize: 28,
            color: "#fff", letterSpacing: "0.04em",
          }}>{quoteAuthor}</div>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: accent, letterSpacing: "0.3em", fontWeight: 700,
            textTransform: "uppercase",
          }}>{quoteAuthorRole}</div>
          {quoteContext && (
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em",
              textTransform: "uppercase", marginTop: 8,
            }}>— {quoteContext} —</div>
          )}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        fontFamily: "Inter, sans-serif", fontSize: 11,
        color: "rgba(255,255,255,0.35)", letterSpacing: "0.3em", fontWeight: 700,
        textTransform: "uppercase",
      }}>{episodeNumber} · {episodeTitle}</div>
    </div>
  );
}
