import type { TweakConfig } from "@/shared/types";

interface QuoteMinimalProps {
  config: TweakConfig;
}

export function QuoteMinimal({ config }: QuoteMinimalProps) {
  const { primary, accent, quoteText, quoteAuthor, quoteAuthorRole, quoteContext } = config;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0b0418", overflow: "hidden" }}>
      {/* subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${accent}11 1px, transparent 1px), linear-gradient(90deg, ${accent}11 1px, transparent 1px)`,
        backgroundSize: "120px 120px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }} />

      <div style={{
        position: "absolute", left: 100, top: 100, right: 100, bottom: 100,
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 60,
      }}>
        <div style={{
          display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 14,
          fontFamily: "ui-monospace, monospace", fontSize: 13,
          color: accent, letterSpacing: "0.3em", fontWeight: 700,
          textTransform: "uppercase",
        }}>
          <span style={{ width: 40, height: 1, background: accent }} />
          Highlight {quoteContext && `· ${quoteContext}`}
        </div>

        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 96, color: "#fff", lineHeight: 1.05,
          letterSpacing: "-0.025em",
          maxWidth: 1700,
        }}>
          {quoteText}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 24,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Russo One', sans-serif", fontSize: 30,
            color: "#fff", textTransform: "uppercase",
          }}>{quoteAuthor[0]}</div>
          <div>
            <div style={{
              fontFamily: "'Russo One', sans-serif", fontSize: 36,
              color: "#fff", lineHeight: 1.1,
            }}>{quoteAuthor}</div>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 16,
              color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", fontWeight: 600,
              marginTop: 6, textTransform: "uppercase",
            }}>{quoteAuthorRole}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
