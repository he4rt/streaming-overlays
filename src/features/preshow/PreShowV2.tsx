import type { TweakConfig } from "@/shared/types";
import { LaravelChat } from "@/shared/chat/LaravelChat";

interface PreShowV2Props {
  config: TweakConfig;
}

const SIDEBAR_WIDTH = 472;

export function PreShowV2({ config }: PreShowV2Props) {
  const { episodeTitle, topic, showChat, laravel } = config;
  const RED = laravel.accent;
  const TAGS = laravel.tags;

  const heroLeft = 80;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* full-bleed stage photo (drop /preshow-bg.png in /public, falls back to dark) */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${laravel.preshowBgImage}'), url('${laravel.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0c0c0f",
      }} />

      {/* dark scrim for legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, rgba(0,0,0,0.35) 80%),
          linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.85) 100%)
        `,
      }} />

      {/* AO VIVO pill (top-left) */}
      <div style={{
        position: "absolute", left: heroLeft, top: 56,
        display: "inline-flex", alignItems: "center", gap: 10,
        background: RED, color: "#fff",
        padding: "8px 16px", borderRadius: 4,
        fontFamily: "Inter, sans-serif", fontWeight: 800,
        fontSize: 14, letterSpacing: "0.18em",
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: "#fff",
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
        EM BREVE · PRÉ-SHOW
      </div>

      {/* graffiti hero (bottom-left) */}
      <div style={{
        position: "absolute",
        left: heroLeft, bottom: 140,
        display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start",
        maxWidth: 1100,
      }}>
        <div style={{
          fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
          fontSize: 132, lineHeight: 0.92, color: RED,
          letterSpacing: "-0.04em", textTransform: "uppercase",
          textShadow: `0 6px 0 rgba(0,0,0,0.55), 0 0 50px ${RED}55`,
        }}>
          {episodeTitle}
        </div>

        {/* subtitle with red bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 28, background: RED }} />
          <div style={{
            fontFamily: "'Cal Sans', 'Inter', sans-serif",
            fontSize: 22, color: "#fdfdff",
            fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}>
            {topic}
          </div>
        </div>
      </div>

      {/* footer tags */}
      <div style={{
        position: "absolute", left: heroLeft, bottom: 64,
        display: "flex", alignItems: "center", gap: 14,
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
        color: "rgba(255,255,255,0.65)", letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}>
        {TAGS.map((t, i) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: RED }} />}
            <span>{t}</span>
          </span>
        ))}
      </div>

      {showChat && (
        <LaravelChat
          width={SIDEBAR_WIDTH}
          accent={RED}
          title={laravel.chatTitle}
          subtitle={laravel.chatSubtitle}
          livePillLabel={laravel.chatLivePill}
          footerLeft={laravel.chatFooterLeft}
          footerRight={laravel.chatFooterRight}
        />
      )}
    </div>
  );
}
