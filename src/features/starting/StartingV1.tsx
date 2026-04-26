import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { EpisodeCard } from "@/shared/components/EpisodeCard";
import { SocialIcon } from "@/shared/components/SocialIcon";
import { DiscreteChatPanel } from "@/shared/chat/DiscreteChatPanel";
import { Clock } from "@/shared/components/Clock";

interface StartingV1Props {
  config: TweakConfig;
}

export function StartingV1({ config }: StartingV1Props) {
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
  } = config;

  const { mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Concentric rings */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          border: `1px solid ${accent}33`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${primary}11 0%, transparent 70%)`,
          animation: "startingPulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 900,
          height: 900,
          borderRadius: "50%",
          border: `1px solid ${accent}44`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${primary}18 0%, transparent 70%)`,
          animation: "startingPulse 6s ease-in-out infinite 1s",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `1px solid ${accent}55`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
          animation: "startingPulse 6s ease-in-out infinite 2s",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8 text-center">
        {/* Logo with glow */}
        <div style={{ animation: "glow 3s ease-in-out infinite" }}>
          <HeartLogo size={1.6} white="#FFFFFF" purple={accent} />
        </div>

        {/* Title pill */}
        <div
          className="flex items-center gap-3 rounded-full px-7 py-3"
          style={{
            background: `${primary}22`,
            border: `1px solid ${accent}44`,
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: accent,
              animation: "pulse 1.4s ease-in-out infinite",
            }}
          />
          <span
            className="font-heading text-sm tracking-[0.25em] text-white/90"
            style={{ letterSpacing: "0.25em" }}
          >
            {startingTitle}
          </span>
        </div>

        {/* Countdown */}
        <div
          className="font-heading leading-none text-white"
          style={{
            fontSize: 220,
            fontFamily: "'Russo One', sans-serif",
            textShadow: `0 0 80px ${primary}88, 0 0 160px ${primary}44`,
            letterSpacing: "-0.02em",
          }}
        >
          {mm}:{ss}
        </div>

        {/* Episode card */}
        <EpisodeCard
          episodeNumber={episodeNumber}
          episodeTitle={episodeTitle}
          topic={topic}
          date={date}
          time={time}
          primary={primary}
          accent={accent}
        />

        {/* Subtitle */}
        <p className="font-body text-lg text-white/60" style={{ letterSpacing: "0.04em" }}>
          {startingSubtitle}
        </p>

        {/* Social row */}
        <div className="flex items-center gap-6">
          {(["x", "ig", "yt", "gh"] as const).map((kind) => (
            <div
              key={kind}
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: `${accent}18`,
                border: `1px solid ${accent}33`,
              }}
            >
              <SocialIcon kind={kind} color={`${accent}CC`} />
            </div>
          ))}
          <span className="ml-2 font-body text-sm text-white/40 tracking-[0.08em]">
            @he4rttalks
          </span>
        </div>
      </div>

      {/* Corner brand — top left */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <HeartMark size={32} color={accent} />
        <span
          className="font-heading text-xs tracking-[0.2em] text-white/50"
          style={{ letterSpacing: "0.2em" }}
        >
          HE4RT TALKS
        </span>
      </div>

      {/* "EM BREVE" badge — top right */}
      <div
        className="absolute right-10 top-10 flex items-center gap-2 rounded-full px-5 py-2"
        style={{
          background: `linear-gradient(135deg, ${primary}, ${primaryDeep})`,
          boxShadow: `0 4px 20px ${primary}55`,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="font-heading text-xs tracking-[0.2em] text-white">EM BREVE</span>
      </div>

      {/* Date/time — bottom left */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 font-body text-sm text-white/50">
          <Clock />
          {date} · {time}
        </div>
        <div
          className="font-body text-xs tracking-[0.1em]"
          style={{ color: `${accent}88` }}
        >
          twitch.tv/he4rttalks
        </div>
      </div>

      {/* Discrete chat — bottom right */}
      <DiscreteChatPanel config={config} />
    </div>
  );
}
