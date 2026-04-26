import type { TweakConfig } from "@/shared/types";

interface QuoteMinimalProps {
  config: TweakConfig;
}

export function QuoteMinimal({ config }: QuoteMinimalProps) {
  const { primary, accent, quoteText, quoteAuthor, quoteAuthorRole } = config;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-20 py-14">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-start gap-10 max-w-5xl w-full">
        {/* Monospace label */}
        <div
          className="font-mono text-sm tracking-[0.3em] uppercase"
          style={{ color: `${accent}77` }}
        >
          ── Highlight
        </div>

        {/* Huge quote text */}
        <div
          className="leading-tight text-white"
          style={{
            fontSize: 96,
            fontFamily: "'Russo One', sans-serif",
            textShadow: `0 0 60px ${primary}33`,
          }}
        >
          {quoteText}
        </div>

        {/* Author row */}
        <div className="flex items-center gap-5">
          {/* Avatar circle */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg text-white"
            style={{
              background: `linear-gradient(135deg, ${primary}, ${accent})`,
              boxShadow: `0 0 20px ${primary}44`,
            }}
          >
            {initials(quoteAuthor)}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-base text-white">{quoteAuthor}</span>
            <span className="font-body text-sm" style={{ color: `${accent}99` }}>
              {quoteAuthorRole}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
