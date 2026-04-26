import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { TerminalChat } from "@/shared/chat/TerminalChat";
import { Clock } from "@/shared/components/Clock";

interface StartingV2Props {
  config: TweakConfig;
}

export function StartingV2({ config }: StartingV2Props) {
  const {
    primary,
    primaryDeep,
    accent,
    bgDeep,
    startingTitle,
    startingSubtitle,
    episodeTitle,
    episodeNumber,
    topic,
    date,
    time,
    startingCountdownSeconds,
  } = config;

  const { mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neon grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${accent}18 1px, transparent 1px),
            linear-gradient(90deg, ${accent}18 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "gridDrift 8s linear infinite",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: 320,
          background: `linear-gradient(0deg, ${primary}33 0%, transparent 100%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Terminal chat — left */}
      <TerminalChat config={config} x={60} y={300} w={520} h={620} />

      {/* Right side content */}
      <div
        className="absolute flex flex-col justify-center gap-8"
        style={{ right: 80, top: 0, bottom: 0, width: 1100 }}
      >
        {/* Eyebrow pill */}
        <div
          className="inline-flex self-start items-center gap-3 rounded-full px-5 py-2.5"
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}44`,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent, animation: "pulse 1.2s ease-in-out infinite" }}
          />
          <span className="text-xs tracking-[0.25em] text-white/80 uppercase">
            {startingTitle}
          </span>
          <span
            className="ml-2 rounded px-2 py-0.5 text-xs font-bold tracking-[0.1em]"
            style={{ background: `${primary}44`, color: accent }}
          >
            {episodeNumber}
          </span>
        </div>

        {/* Episode title */}
        <div>
          <h1
            className="font-heading leading-[1.05] text-white"
            style={{ fontSize: 76, letterSpacing: "-0.01em" }}
          >
            {episodeTitle}
          </h1>
          <p
            className="mt-3 font-body text-lg tracking-[0.12em] uppercase"
            style={{ color: accent }}
          >
            {topic}
          </p>
        </div>

        {/* Giant countdown */}
        <div className="relative">
          <div
            className="font-heading leading-none"
            style={{
              fontSize: 320,
              fontFamily: "'Russo One', sans-serif",
              background: `linear-gradient(135deg, ${accent}, ${primary}, ${primaryDeep})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: `drop-shadow(0 0 40px ${primary}88)`,
              letterSpacing: "-0.03em",
            }}
          >
            {mm}:{ss}
          </div>
          {/* Outline layer for depth */}
          <div
            className="pointer-events-none absolute inset-0 font-heading leading-none"
            style={{
              fontSize: 320,
              fontFamily: "'Russo One', sans-serif",
              WebkitTextStroke: `2px ${accent}22`,
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            {mm}:{ss}
          </div>
        </div>

        {/* Meta row */}
        <div
          className="flex items-center gap-8"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
        >
          <div className="flex items-center gap-2 text-sm text-white/55">
            <Clock />
            <span>{date}</span>
          </div>
          <div className="h-4 w-px" style={{ background: `${accent}33` }} />
          <div className="flex items-center gap-2 text-sm text-white/55">
            <Clock />
            <span>{time}</span>
          </div>
          <div className="h-4 w-px" style={{ background: `${accent}33` }} />
          <span className="text-sm" style={{ color: `${accent}88` }}>
            {startingSubtitle}
          </span>
        </div>
      </div>

      {/* Corner brand — top left */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <HeartMark size={28} color={accent} />
        <HeartLogo size={0.9} white="#FFFFFF" purple={accent} />
      </div>

      {/* Corner brand — bottom right */}
      <div className="absolute bottom-10 right-10">
        <span
          className="font-body text-xs tracking-[0.15em] text-white/30 uppercase"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
        >
          twitch.tv/he4rttalks
        </span>
      </div>
    </div>
  );
}
