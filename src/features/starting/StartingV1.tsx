import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { SocialIcon } from "@/shared/components/SocialIcon";
import { DiscreteChatPanel } from "@/shared/chat/DiscreteChatPanel";
import { Clock } from "@/shared/components/Clock";

interface StartingV1Props {
  config: TweakConfig;
}

export function StartingV1({ config }: StartingV1Props) {
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
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* large central glowing ring */}
      <div style={{
        position: "absolute", width: 1200, height: 1200, borderRadius: "50%",
        border: `2px solid ${accent}33`,
        animation: "startingPulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 900, height: 900, borderRadius: "50%",
        border: `1px solid ${accent}55`,
        animation: "startingPulse 4s ease-in-out 0.5s infinite",
      }} />
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${primary}55 0%, transparent 70%)`,
        filter: "blur(40px)",
      }} />

      {/* central content */}
      <div style={{
        position: "relative", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        maxWidth: 1100,
      }}>
        {/* logo */}
        <div style={{ animation: "glow 3s ease-in-out infinite" }}>
          <HeartLogo size={1.6} purple={accent} />
        </div>

        {/* tagline */}
        <div style={{
          marginTop: 12,
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "10px 22px",
          background: `${primary}26`,
          border: `1px solid ${accent}66`,
          borderRadius: 99,
          fontFamily: "Inter, sans-serif", fontSize: 16, color: "#fff",
          letterSpacing: "0.18em", fontWeight: 700,
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: "50%", background: accent,
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          {startingTitle}
        </div>

        {/* countdown */}
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 220, color: "#fff", lineHeight: 1,
          letterSpacing: "0.04em",
          textShadow: `0 0 60px ${accent}88, 0 0 120px ${primary}55`,
          display: "flex", alignItems: "center", gap: 30,
        }}>
          <span>{mm}</span>
          <span style={{ color: accent, animation: "pulse 1s ease-in-out infinite" }}>:</span>
          <span>{ss}</span>
        </div>

        {/* episode info card */}
        <div style={{
          marginTop: 8,
          display: "flex", alignItems: "center", gap: 18,
          background: "rgba(11,4,24,0.7)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${accent}44`,
          borderRadius: 16,
          padding: "18px 28px",
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            padding: "8px 16px", borderRadius: 8,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 18, color: "#fff", letterSpacing: "0.06em",
          }}>{episodeNumber}</div>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontFamily: "'Russo One', sans-serif",
              fontSize: 30, color: "#fff", lineHeight: 1.1,
            }}>{episodeTitle}</div>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 14, color: accent,
              letterSpacing: "0.12em", marginTop: 6, fontWeight: 600,
              textTransform: "uppercase",
            }}>{topic}</div>
          </div>
          <div style={{ width: 1, height: 50, background: `${accent}33`, margin: "0 8px" }} />
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 14, color: "#fff",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Clock /> {date}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Clock /> {time}</div>
          </div>
        </div>

        {/* subtitle */}
        <div style={{
          marginTop: 18,
          fontFamily: "Inter, sans-serif", fontSize: 22, color: "rgba(255,255,255,0.75)",
          fontWeight: 500,
        }}>
          {startingSubtitle}
        </div>

        {/* social row */}
        <div style={{
          marginTop: 18, display: "flex", gap: 14, alignItems: "center",
          fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)",
        }}>
          <span style={{ letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>Siga</span>
          <SocialIcon kind="ig" color={accent} /><span>@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="x" color={accent} /><span>@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="yt" color={accent} /><span>/@he4rtdevs</span>
          <span style={{ color: `${accent}55` }}>·</span>
          <SocialIcon kind="gh" color={accent} /><span>/he4rt-developers</span>
        </div>
      </div>

      {/* corner brand marks */}
      <div style={{
        position: "absolute", top: 40, left: 40,
        display: "flex", alignItems: "center", gap: 12,
        background: "rgba(11,4,24,0.6)", backdropFilter: "blur(10px)",
        padding: "10px 16px", borderRadius: 10,
        border: `1px solid ${accent}33`,
      }}>
        <HeartMark size={24} color={accent} />
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 12,
          color: "#fff", letterSpacing: "0.2em", fontWeight: 700,
        }}>HE4RT TALKS</span>
      </div>
      <div style={{
        position: "absolute", top: 40, right: 40,
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#EF4444", padding: "8px 16px", borderRadius: 6,
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 800,
        color: "#fff", letterSpacing: "0.15em",
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: "#fff",
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
        EM BREVE
      </div>
      {/* Discrete chat panel for starting scene */}
      <DiscreteChatPanel config={config} />
    </div>
  );
}
