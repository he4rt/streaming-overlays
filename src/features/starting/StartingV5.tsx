import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { LaravelChat } from "@/shared/chat/LaravelChat";

interface StartingV5Props {
  config: TweakConfig;
}

const SIDEBAR_WIDTH = 472;

function CalendarIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ChatsIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 11a6 6 0 1 1 4.5 5.81L7 18l1-3.5A6 6 0 0 1 8 11z" />
      <path d="M15 8.5a4.5 4.5 0 0 1 4 6.74L20 19l-3.5-.9A4.5 4.5 0 0 1 12 16" />
    </svg>
  );
}

export function StartingV5({ config }: StartingV5Props) {
  const {
    episodeTitle,
    topic,
    date,
    time,
    startingSubtitle,
    startingCountdownSeconds,
    laravel,
  } = config;
  const RED = laravel.accent;
  const TAGS = laravel.tags;

  const { mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* urban photo background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${laravel.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />

      {/* dark scrim for text legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 30% 55%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%),
          linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)
        `,
      }} />

      {/* HERO */}
      <div style={{
        position: "absolute",
        left: 199, top: 246,
        width: 1051,
        display: "flex", flexDirection: "column", gap: 112,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          {/* live pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: RED, color: "#fff",
            padding: "8px 16px", borderRadius: 4,
            fontFamily: "Inter, sans-serif", fontWeight: 800,
            fontSize: 16, letterSpacing: "0.04em",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#fff",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            A LIVE JÁ VAI COMEÇAR
          </div>

          {/* graffiti title */}
          <div style={{
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 150, lineHeight: 0.95, color: RED,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            textShadow: `0 6px 0 rgba(0,0,0,0.55), 0 0 50px ${RED}55`,
            whiteSpace: "nowrap",
          }}>
            {episodeTitle}
          </div>

          {/* subtitle with red bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 4, height: 30, background: RED }} />
            <div style={{
              fontFamily: "'Cal Sans', 'Inter', sans-serif",
              fontSize: 22, color: "#fdfdff",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}>
              {topic}
            </div>
          </div>
        </div>

        {/* countdown + meta row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-end" }}>
          <div style={{
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 150, lineHeight: 1,
            background: "linear-gradient(180deg, #fdfdff 0%, #ddddde 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", color: "transparent",
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            filter: "drop-shadow(0 6px 0 rgba(0,0,0,0.4))",
            whiteSpace: "nowrap",
          }}>
            {mm}:{ss}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MetaItem icon={<CalendarIcon />} label={date} />
            <Divider color={RED} />
            <MetaItem icon={<ClockIcon />} label={time} />
            <Divider color={RED} />
            <MetaItem icon={<ChatsIcon />} label={startingSubtitle.replace(/[☕☀️🔥]/g, "").trim().toUpperCase() || "SENTA QUE O PAPO VAI LONGE"} />
          </div>
        </div>
      </div>

      {/* footer tags */}
      <div style={{
        position: "absolute", left: 199, bottom: 64,
        display: "flex", alignItems: "center", gap: 14,
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
        color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}>
        {TAGS.map((t, i) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: RED }} />}
            <span>{t}</span>
          </span>
        ))}
      </div>

      <LaravelChat
        width={SIDEBAR_WIDTH}
        accent={RED}
        title={laravel.chatTitle}
        subtitle={laravel.chatSubtitle}
        livePillLabel={laravel.chatLivePill}
        footerLeft={laravel.chatFooterLeft}
        footerRight={laravel.chatFooterRight}
      />
    </div>
  );
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {icon}
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 800,
        color: "#fdfdff", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

function Divider({ color }: { color: string }) {
  return <div style={{ width: 2, height: 26, background: color }} />;
}
