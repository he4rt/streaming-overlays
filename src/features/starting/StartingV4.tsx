import type { TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { HeartMark } from "@/shared/components/HeartMark";
import { MarqueeChat } from "@/shared/chat/MarqueeChat";

interface StartingV4Props {
  config: TweakConfig;
}

export function StartingV4({ config }: StartingV4Props) {
  const {
    primary,
    accent,
    startingTitle,
    startingSubtitle,
    episodeTitle,
    episodeNumber,
    date,
    time,
    startingCountdownSeconds,
  } = config;

  const { remaining, mm, ss } = useCountdown(startingCountdownSeconds);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* radial bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, ${primary}55 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, ${accent}33 0%, transparent 50%)`,
      }} />

      {/* huge stacked typography (left) */}
      <div style={{
        position: "absolute", left: 80, top: 80, bottom: 200,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
            <HeartMark size={28} color={accent} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 13,
              color: "#fff", letterSpacing: "0.28em", fontWeight: 800,
            }}>HE4RT TALKS · {episodeNumber}</span>
          </div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 96, color: "#fff", lineHeight: 0.92,
            letterSpacing: "-0.02em", maxWidth: 1100,
          }}>
            <span style={{
              background: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{startingTitle}</span>
            <br />
            <span style={{ color: "#fff" }}>{episodeTitle}</span>
          </div>
          <div style={{
            marginTop: 22,
            fontFamily: "Inter, sans-serif", fontSize: 22,
            color: "rgba(255,255,255,0.7)", maxWidth: 800, fontWeight: 500,
          }}>{startingSubtitle}</div>
        </div>
      </div>

      {/* circular countdown (right) */}
      <div style={{
        position: "absolute", right: 120, top: "50%", transform: "translateY(-50%)",
        width: 480, height: 480,
      }}>
        <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primary} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="none" stroke={`${accent}22`} strokeWidth="2" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ringGrad)" strokeWidth="2"
            strokeDasharray={`${(remaining / Math.max(1, startingCountdownSeconds)) * 578} 578`}
            transform="rotate(-90 100 100)" strokeLinecap="round" />
          <circle cx="100" cy="100" r="78" fill="none" stroke={`${accent}11`} strokeWidth="1" strokeDasharray="2 4" />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8,
        }}>
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 14,
            color: accent, letterSpacing: "0.3em", fontWeight: 700, textTransform: "uppercase",
          }}>Começa em</div>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 130, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em",
            display: "flex", alignItems: "baseline", gap: 6,
          }}>
            <span>{mm}</span>
            <span style={{ color: accent, animation: "pulse 1s ease-in-out infinite" }}>:</span>
            <span>{ss}</span>
          </div>
          <div style={{
            fontFamily: "ui-monospace, monospace", fontSize: 14,
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em", marginTop: 4,
          }}>{date} · {time}</div>
        </div>
      </div>

      {/* marquee chat at bottom */}
      <MarqueeChat config={config} />

      {/* bottom-most caption */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 24,
        textAlign: "center",
        fontFamily: "Inter, sans-serif", fontSize: 12,
        color: "rgba(255,255,255,0.4)", letterSpacing: "0.3em", fontWeight: 700,
        textTransform: "uppercase",
      }}>↑ chat ao vivo · #he4rttalks · entre no discord.app/he4rt</div>
    </div>
  );
}
