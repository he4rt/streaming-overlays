import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { Clock } from "@/shared/components/Clock";
import { BubbleChatStrip } from "@/shared/chat/BubbleChatStrip";

interface StartingV3Props {
  config: TweakConfig;
}

export function StartingV3({ config }: StartingV3Props) {
  const {
    primary,
    primaryDeep,
    accent,
    startingTitle,
    startingSubtitle,
    episodeTitle,
    episodeNumber,
    topic,
    date,
    time,
    startingCountdownSeconds,
    guest1Name,
    guest1Role,
    guest1Handle,
    guest2Name,
    guest2Role,
    guest2Handle,
  } = config;

  const { mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* LEFT COLUMN */}
      <div className="relative flex flex-col justify-center gap-8 px-16 py-12">
        {/* Subtle radial glow behind content */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 30% 50%, ${primary}1A 0%, transparent 70%)`,
          }}
        />

        {/* Brand */}
        <div className="flex items-center gap-3">
          <HeartMark size={30} color={accent} />
          <HeartLogo size={0.95} white="#FFFFFF" purple={accent} />
        </div>

        {/* Episode number + topic */}
        <div className="flex flex-col gap-2">
          <div
            className="inline-flex self-start items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: `${primary}22`,
              border: `1px solid ${accent}44`,
            }}
          >
            <span
              className="font-heading text-xs tracking-[0.2em] text-white/80 uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
              {episodeNumber}
            </span>
          </div>
          <p
            className="font-body text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {topic}
          </p>
        </div>

        {/* Episode title */}
        <h1
          className="font-heading leading-[1.05] text-white"
          style={{ fontSize: 88, letterSpacing: "-0.02em" }}
        >
          {episodeTitle}
        </h1>

        {/* Subtitle */}
        <p className="font-body text-base text-white/55" style={{ letterSpacing: "0.03em" }}>
          {startingSubtitle}
        </p>

        {/* Countdown section */}
        <div className="flex flex-col gap-2">
          <span
            className="font-body text-xs uppercase tracking-[0.2em]"
            style={{ color: `${accent}88`, letterSpacing: "0.2em" }}
          >
            {startingTitle}
          </span>
          <div
            className="font-heading leading-none text-white"
            style={{
              fontSize: 180,
              fontFamily: "'Russo One', sans-serif",
              textShadow: `0 0 60px ${primary}88, 0 0 120px ${primary}44`,
              letterSpacing: "-0.02em",
            }}
          >
            {mm}
            <span style={{ color: accent }}>:</span>
            {ss}
          </div>
        </div>

        {/* Date / time / badge row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-body text-sm text-white/50">
            <Clock />
            {date}
          </div>
          <div className="h-4 w-px" style={{ background: `${accent}33` }} />
          <div className="flex items-center gap-2 font-body text-sm text-white/50">
            <Clock />
            {time}
          </div>
          <div className="h-4 w-px" style={{ background: `${accent}33` }} />
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: `linear-gradient(135deg, ${primary}, ${primaryDeep})`,
              boxShadow: `0 4px 16px ${primary}55`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="font-heading text-[10px] tracking-[0.2em] text-white">EM BREVE</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — guest portraits + chat */}
      <div className="relative flex items-center justify-center gap-6 px-10">
        {/* Vertical divider */}
        <div
          className="pointer-events-none absolute left-0 inset-y-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, ${accent}33 30%, ${accent}33 70%, transparent)` }}
        />

        {/* Guest card 1 */}
        <div
          className="relative flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: 280,
            aspectRatio: "3/4",
            background: `linear-gradient(160deg, ${primary}22 0%, ${primaryDeep}44 100%)`,
            border: `1px solid ${accent}33`,
            boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${accent}22`,
            animation: "floatY 4s ease-in-out infinite",
          }}
        >
          {/* Placeholder avatar gradient */}
          <div
            className="flex flex-1 items-center justify-center"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${primary}44 0%, transparent 60%)`,
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full font-heading text-3xl text-white"
              style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
            >
              {guest1Name[0]}
            </div>
          </div>
          {/* Info bar */}
          <div
            className="px-5 py-4"
            style={{
              background: "rgba(11,4,24,0.72)",
              borderTop: `1px solid ${accent}22`,
            }}
          >
            <div className="font-heading text-base text-white leading-tight">{guest1Name}</div>
            <div className="mt-1 font-body text-xs text-white/55">{guest1Role}</div>
            <div className="mt-1 font-body text-[11px]" style={{ color: `${accent}99` }}>
              {guest1Handle}
            </div>
          </div>
        </div>

        {/* Guest card 2 */}
        <div
          className="relative flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: 280,
            aspectRatio: "3/4",
            background: `linear-gradient(160deg, ${primary}22 0%, ${primaryDeep}44 100%)`,
            border: `1px solid ${accent}33`,
            boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${accent}22`,
            animation: "floatY 4s ease-in-out infinite 1.2s",
          }}
        >
          <div
            className="flex flex-1 items-center justify-center"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${accent}22 0%, transparent 60%)`,
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full font-heading text-3xl text-white"
              style={{ background: `linear-gradient(135deg, ${accent}, ${primary})` }}
            >
              {guest2Name[0]}
            </div>
          </div>
          <div
            className="px-5 py-4"
            style={{
              background: "rgba(11,4,24,0.72)",
              borderTop: `1px solid ${accent}22`,
            }}
          >
            <div className="font-heading text-base text-white leading-tight">{guest2Name}</div>
            <div className="mt-1 font-body text-xs text-white/55">{guest2Role}</div>
            <div className="mt-1 font-body text-[11px]" style={{ color: `${accent}99` }}>
              {guest2Handle}
            </div>
          </div>
        </div>

        {/* Bubble chat strip on the right side */}
        <BubbleChatStrip config={config} side="right" />
      </div>
    </div>
  );
}
