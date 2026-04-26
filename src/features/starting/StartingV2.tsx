import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartMark } from "@/shared/components/HeartMark";
import { TerminalChat } from "@/shared/chat/TerminalChat";

interface StartingV2Props {
  config: TweakConfig;
}

export function StartingV2({ config }: StartingV2Props) {
  const {
    primary,
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
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* neon grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
        backgroundSize: "80px 80px, 80px 80px",
        animation: "gridDrift 8s linear infinite",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }} />
      {/* horizon glow */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "40%",
        background: `linear-gradient(180deg, transparent 0%, ${primary}55 60%, ${accent}88 100%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* terminal chat (left) */}
      <TerminalChat config={config} x={60} y={300} w={520} h={620} />

      {/* main stage (right side, big typo) */}
      <div style={{
        position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)",
        width: 1100, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18,
      }}>
        {/* eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "8px 18px",
          background: `${primary}33`,
          border: `1px solid ${accent}88`,
          borderRadius: 4,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13,
          color: accent, letterSpacing: "0.3em", fontWeight: 700,
          textTransform: "uppercase",
        }}>
          <span style={{
            width: 8, height: 8, background: accent,
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          {startingTitle} · {episodeNumber}
        </div>

        {/* episode title */}
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 76, color: "#fff", lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textShadow: `0 0 40px ${accent}66`,
        }}>{episodeTitle}</div>

        <div style={{
          fontFamily: "Inter, sans-serif", fontSize: 18, color: accent,
          letterSpacing: "0.18em", fontWeight: 600,
          textTransform: "uppercase",
        }}>{topic}</div>

        {/* big countdown */}
        <div style={{ marginTop: 24, position: "relative" }}>
          <div style={{
            position: "absolute", inset: 0,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 320, lineHeight: 0.9, letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            color: "transparent", WebkitTextStroke: `2px ${accent}55`,
            transform: "translate(8px, 8px)",
          }}>{mm}:{ss}</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 320, lineHeight: 0.9, letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            color: "#fff",
            background: `linear-gradient(180deg, #fff 0%, ${accent} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            position: "relative",
          }}>{mm}:{ss}</div>
        </div>

        {/* meta row */}
        <div style={{
          marginTop: 8,
          display: "flex", alignItems: "center", gap: 24,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 14, color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          <span><span style={{ color: accent }}>›</span> {date}</span>
          <span style={{ color: `${accent}55` }}>│</span>
          <span><span style={{ color: accent }}>›</span> {time}</span>
          <span style={{ color: `${accent}55` }}>│</span>
          <span><span style={{ color: accent }}>›</span> {startingSubtitle}</span>
        </div>
      </div>

      {/* corner brand */}
      <div style={{
        position: "absolute", top: 40, left: 40,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <HeartMark size={28} color={accent} />
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 13,
          color: "#fff", letterSpacing: "0.25em", fontWeight: 800,
        }}>HE4RT TALKS</span>
      </div>
      <div style={{
        position: "absolute", top: 40, right: 40,
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "transparent", border: `1px solid ${accent}88`,
        padding: "8px 16px", borderRadius: 4,
        fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700,
        color: accent, letterSpacing: "0.2em",
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: accent,
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
        STANDBY
      </div>
    </div>
  );
}
