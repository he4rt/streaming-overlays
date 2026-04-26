import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { MarqueeChat } from "@/shared/chat/MarqueeChat";

interface StartingV4Props {
  config: TweakConfig;
}

const CIRCLE_SIZE = 480;
const RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StartingV4({ config }: StartingV4Props) {
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

  const { remaining, mm, ss } = useCountdown(startingCountdownSeconds);
  const progress = startingCountdownSeconds > 0 ? remaining / startingCountdownSeconds : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Radial bg blobs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          top: "10%",
          left: "-10%",
          background: `radial-gradient(circle, ${primary}18 0%, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          bottom: "5%",
          right: "5%",
          background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Main content: two columns */}
      <div className="absolute inset-0 flex items-center" style={{ paddingBottom: 140 }}>
        {/* LEFT — typography */}
        <div className="flex flex-col justify-center gap-10 px-20" style={{ width: 960 }}>
          {/* Brand row */}
          <div className="flex items-center gap-3">
            <HeartMark size={28} color={accent} />
            <HeartLogo size={0.9} white="#FFFFFF" purple={accent} />
            <div
              className="ml-4 rounded-full px-3 py-1 font-heading text-[10px] tracking-[0.2em] text-white/70"
              style={{
                background: `${primary}22`,
                border: `1px solid ${accent}44`,
                letterSpacing: "0.2em",
              }}
            >
              {episodeNumber}
            </div>
          </div>

          {/* Huge stacked text */}
          <div className="flex flex-col gap-3">
            {/* startingTitle with gradient */}
            <div
              className="font-heading leading-none uppercase"
              style={{
                fontSize: 56,
                fontFamily: "'Russo One', sans-serif",
                background: `linear-gradient(90deg, ${accent}, ${primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.04em",
              }}
            >
              {startingTitle}
            </div>
            {/* episodeTitle large */}
            <h1
              className="font-heading leading-[1.0] text-white"
              style={{
                fontSize: 96,
                fontFamily: "'Russo One', sans-serif",
                letterSpacing: "-0.025em",
                textShadow: `0 0 80px ${primary}55`,
              }}
            >
              {episodeTitle}
            </h1>
          </div>

          {/* Topic tag */}
          <p
            className="font-body text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: `${accent}CC` }}
          >
            {topic}
          </p>

          {/* Subtitle */}
          <p className="font-body text-lg text-white/50" style={{ letterSpacing: "0.03em" }}>
            {startingSubtitle}
          </p>

          {/* Date / time meta */}
          <div
            className="flex items-center gap-4"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
          >
            <span className="text-sm text-white/45">{date}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span className="text-sm text-white/45">{time}</span>
            <span style={{ color: `${accent}55` }}>·</span>
            <span className="text-sm" style={{ color: `${accent}88` }}>
              twitch.tv/he4rttalks
            </span>
          </div>
        </div>

        {/* RIGHT — circular SVG countdown */}
        <div
          className="flex flex-1 items-center justify-center"
          style={{ position: "relative" }}
        >
          {/* Outer glow */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: CIRCLE_SIZE + 80,
              height: CIRCLE_SIZE + 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${primary}22 0%, transparent 65%)`,
              filter: "blur(24px)",
            }}
          />

          <svg
            width={CIRCLE_SIZE}
            height={CIRCLE_SIZE}
            viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
            style={{ display: "block" }}
          >
            {/* Background ring */}
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={`${accent}18`}
              strokeWidth={12}
            />

            {/* Track ring (dim) */}
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={`${primary}33`}
              strokeWidth={12}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
            />

            {/* Progress ring */}
            <circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={`url(#progressGrad)`}
              strokeWidth={12}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />

            {/* Gradient def */}
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor={primary} />
              </linearGradient>
            </defs>

            {/* Center countdown text */}
            <text
              x={CIRCLE_SIZE / 2}
              y={CIRCLE_SIZE / 2 - 20}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: 112,
                letterSpacing: "-0.04em",
              }}
            >
              {mm}:{ss}
            </text>

            {/* Label below timer */}
            <text
              x={CIRCLE_SIZE / 2}
              y={CIRCLE_SIZE / 2 + 68}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={`${accent}99`}
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              MINUTOS RESTANTES
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom caption */}
      <div
        className="absolute bottom-[148px] left-20 right-20 flex items-center justify-between"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-5 py-2"
          style={{
            background: `linear-gradient(135deg, ${primary}, ${primaryDeep})`,
            boxShadow: `0 4px 20px ${primary}55`,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="text-xs tracking-[0.2em] text-white">EM BREVE</span>
        </div>
        <span className="text-xs tracking-[0.15em] text-white/30 uppercase">
          discord.app/he4rt · #he4rttalks
        </span>
      </div>

      {/* Marquee chat at bottom */}
      <MarqueeChat config={config} />
    </div>
  );
}
