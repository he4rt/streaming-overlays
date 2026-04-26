import type { TweakConfig } from "@/shared/types";
import { HeartLogo } from "@/shared/components/HeartLogo";

interface QuoteSerifProps {
  config: TweakConfig;
}

export function QuoteSerif({ config }: QuoteSerifProps) {
  const { primary, accent, quoteText, quoteAuthor, quoteAuthorRole, episodeNumber, episodeTitle } = config;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-24 py-14">
      {/* HeartLogo top-left */}
      <div className="absolute left-10 top-10">
        <HeartLogo size={1} white="#FFFFFF" purple={accent} />
      </div>

      {/* Huge serif quote mark */}
      <div
        className="pointer-events-none select-none absolute"
        style={{
          fontSize: 320,
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: `${accent}18`,
          lineHeight: 1,
          top: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        "
      </div>

      {/* Center block */}
      <div className="relative flex flex-col items-center gap-8 max-w-4xl text-center">
        {/* Quote text — italic serif */}
        <blockquote
          className="leading-snug text-white/90"
          style={{
            fontSize: 64,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            textShadow: `0 0 40px ${primary}33`,
          }}
        >
          {quoteText}
        </blockquote>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accent}99, transparent)`,
          }}
        />

        {/* Author */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-heading text-xl text-white"
            style={{ fontFamily: "'Russo One', sans-serif" }}
          >
            {quoteAuthor}
          </span>
          <span className="font-body text-sm" style={{ color: `${accent}99` }}>
            {quoteAuthorRole}
          </span>
        </div>
      </div>

      {/* Episode info — bottom center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span
          className="rounded-full px-3 py-1 font-heading text-xs tracking-[0.15em] text-white/50"
          style={{ background: `${primary}22`, border: `1px solid ${accent}33` }}
        >
          {episodeNumber}
        </span>
        <span className="font-body text-sm text-white/30">{episodeTitle}</span>
      </div>
    </div>
  );
}
