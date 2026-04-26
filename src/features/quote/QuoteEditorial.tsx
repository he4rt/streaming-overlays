import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";
import { CornerBrackets } from "@/shared/components/CornerBrackets";

interface QuoteEditorialProps {
  config: TweakConfig;
}

export function QuoteEditorial({ config }: QuoteEditorialProps) {
  const { primary, accent, bgPanel, quoteText, quoteAuthor, quoteAuthorRole, quoteContext, guest1Name } = config;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="absolute inset-0 flex">
      {/* LEFT — 65% */}
      <div className="relative flex flex-col justify-between px-16 py-14" style={{ width: "65%" }}>
        {/* Brand row */}
        <div className="flex items-center gap-3">
          <HeartMark size={28} color={accent} />
          <span className="font-heading text-xs tracking-[0.25em] text-white/40" style={{ letterSpacing: "0.25em" }}>
            HE4RT TALKS
          </span>
        </div>

        {/* Center block */}
        <div className="flex flex-col gap-8">
          {/* "Momento marcante" pill */}
          <div
            className="flex w-fit items-center gap-2 rounded-full px-5 py-2"
            style={{
              background: `${primary}22`,
              border: `1px solid ${accent}44`,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            <span className="font-heading text-xs tracking-[0.2em] text-white/70">Momento marcante</span>
          </div>

          {/* Quote text */}
          <div className="relative">
            {/* Decorative opening quote mark */}
            <div
              className="pointer-events-none select-none absolute -top-6 -left-2"
              style={{
                fontSize: 120,
                fontFamily: "Georgia, serif",
                color: `${accent}33`,
                lineHeight: 1,
              }}
            >
              "
            </div>
            <blockquote
              className="relative leading-snug text-white"
              style={{
                fontSize: 72,
                fontFamily: "'Russo One', sans-serif",
                textShadow: `0 0 40px ${primary}33`,
              }}
            >
              {quoteText}
            </blockquote>
            {/* Closing quote mark */}
            <div
              className="pointer-events-none select-none absolute -bottom-8 right-0"
              style={{
                fontSize: 120,
                fontFamily: "Georgia, serif",
                color: `${accent}33`,
                lineHeight: 1,
              }}
            >
              "
            </div>
          </div>

          {/* Author attribution */}
          <div className="flex items-center gap-4 mt-4">
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${accent}55, transparent)`, maxWidth: 60 }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-heading text-base text-white">{quoteAuthor}</span>
              <span className="font-body text-sm" style={{ color: `${accent}99` }}>{quoteAuthorRole}</span>
            </div>
            <span className="font-body text-xs text-white/30">{quoteContext}</span>
          </div>
        </div>

        {/* Bottom spacer */}
        <div />
      </div>

      {/* Vertical divider */}
      <div
        className="shrink-0 self-stretch"
        style={{ width: 1, background: `linear-gradient(180deg, transparent, ${accent}44, transparent)` }}
      />

      {/* RIGHT — 35% */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 px-10 py-14">
        {/* Portrait placeholder card */}
        <div
          className="relative flex w-full flex-1 items-center justify-center rounded-2xl overflow-hidden"
          style={{
            background: `${bgPanel}88`,
            border: `1px solid ${accent}22`,
            maxHeight: 460,
          }}
        >
          <CornerBrackets color={`${accent}77`} size={20} inset={12} />
          {/* Placeholder avatar */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full font-heading text-2xl text-white"
              style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
            >
              {initials(guest1Name)}
            </div>
            <span className="font-body text-sm text-white/40">{guest1Name}</span>
          </div>
          {/* "Falando agora" label */}
          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-1.5 whitespace-nowrap"
            style={{ background: `${bgPanel}CC`, border: `1px solid ${accent}33` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#22C55E", animation: "pulse 1.4s ease-in-out infinite" }}
            />
            <span className="font-body text-xs text-white/60">Falando agora</span>
          </div>
        </div>

        {/* "clipa esse momento" pill */}
        <div
          className="flex items-center gap-2 rounded-full px-5 py-2"
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}33`,
          }}
        >
          <span className="text-sm">✂️</span>
          <span className="font-body text-sm text-white/50">clipa esse momento</span>
        </div>
      </div>
    </div>
  );
}
