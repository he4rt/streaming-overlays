import type { TweakConfig } from "@/shared/types";
import { LaravelChat } from "@/shared/chat/LaravelChat";
import { ChromaScreen } from "@/shared/components/ChromaScreen";

interface ScreenShareV2Props {
  config: TweakConfig;
}

const SIDEBAR_WIDTH = 472;
const CAM_HEIGHT = 290;

export function ScreenShareV2({ config }: ScreenShareV2Props) {
  const { episodeTitle, guests, activeSpeakerId, showCameraPlaceholders, screenShareAspect, laravel } = config;
  const RED = laravel.accent;
  const TAGS = laravel.tags;
  const speaker = guests.find((g) => g.id === activeSpeakerId) ?? guests[0];
  const speakerName = speaker?.name ?? "";
  const speakerTalk = speaker?.talk ?? "";

  const heroLeft = 60;
  const heroRight = SIDEBAR_WIDTH + 40;
  const heroTop = 80;
  const titleH = 200;
  const panelH = 1080 - heroTop - titleH;
  const panelW = 1920 - heroLeft - heroRight;

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

      {/* dark scrim */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.75) 100%)`,
      }} />

      {/* AO VIVO pill */}
      <div style={{
        position: "absolute", left: heroLeft, top: 32,
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
        AO VIVO · CODE
      </div>

      {/* CODE PANEL */}
      <div style={{
        position: "absolute",
        left: heroLeft, top: heroTop,
        width: panelW, height: panelH,
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${RED}22`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* graffiti accent stroke (top-left) */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: 180, height: 90,
          pointerEvents: "none", overflow: "hidden", zIndex: 3,
        }}>
          <div style={{
            position: "absolute", top: -6, left: -30,
            width: 220, height: 8, background: RED,
            transform: "rotate(-18deg)", transformOrigin: "left center",
            boxShadow: `0 0 20px ${RED}99`,
          }} />
          <div style={{
            position: "absolute", top: 22, left: -20,
            width: 140, height: 3, background: RED, opacity: 0.6,
            transform: "rotate(-18deg)", transformOrigin: "left center",
          }} />
        </div>

        {/* chroma key area — OBS composites screen capture here, aspect-locked */}
        <div style={{ flex: 1, position: "relative", background: "#0d1117" }}>
          <ChromaScreen aspect={screenShareAspect} width={panelW} height={panelH} />
        </div>
      </div>

      {/* CAMERA — perched on top of chat sidebar */}
      <div style={{
        position: "absolute",
        right: 0, top: 0,
        width: SIDEBAR_WIDTH, height: CAM_HEIGHT,
        background: "#0c0c0f",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        borderBottom: `3px solid ${RED}`,
        boxShadow: `inset 1px 0 0 ${RED}22, -20px 0 60px rgba(0,0,0,0.6)`,
        overflow: "hidden",
      }}>
        {/* graffiti corner stroke */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: 140, height: 80,
          pointerEvents: "none", overflow: "hidden", zIndex: 3,
        }}>
          <div style={{
            position: "absolute", top: -6, left: -30,
            width: 180, height: 8, background: RED,
            transform: "rotate(-18deg)", transformOrigin: "left center",
            boxShadow: `0 0 20px ${RED}99`,
          }} />
          <div style={{
            position: "absolute", top: 22, left: -20,
            width: 110, height: 3, background: RED, opacity: 0.6,
            transform: "rotate(-18deg)", transformOrigin: "left center",
          }} />
        </div>

        {/* camera content (full bleed) */}
        <div style={{
          position: "absolute", inset: 0,
          background: showCameraPlaceholders
            ? `linear-gradient(135deg, #2a1850 0%, #0b0418 100%)`
            : "#00FF00",
        }}>
          {showCameraPlaceholders && (
            <>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 45%, rgba(160,120,200,0.35) 0%, rgba(20,8,45,0.95) 65%)",
              }} />
              <div style={{
                position: "absolute",
                left: "50%", top: "50%", transform: "translate(-50%, -50%)",
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.22)",
                fontSize: 18, letterSpacing: "0.28em",
              }}>
                CAM 01
              </div>
            </>
          )}
        </div>

        {/* nameplate stamp (bottom-left of camera) */}
        <div style={{
          position: "absolute",
          left: 16, bottom: 14,
          background: "rgba(12,12,15,0.82)",
          border: `2px solid ${RED}`,
          padding: "6px 12px",
          display: "flex", alignItems: "center", gap: 10,
          backdropFilter: "blur(6px)",
          boxShadow: "3px 3px 0 rgba(0,0,0,0.6)",
          zIndex: 2,
        }}>
          <div style={{ width: 4, height: 22, background: RED }} />
          <div>
            <div style={{
              fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
              fontSize: 18, color: "#fdfdff", lineHeight: 1,
              letterSpacing: "0.02em",
            }}>{speakerName}</div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, color: RED,
              fontWeight: 800, letterSpacing: "0.18em",
              textTransform: "uppercase", marginTop: 2,
            }}>{speakerTalk}</div>
          </div>
        </div>
      </div>

      {/* graffiti title bottom-left */}
      <div style={{
        position: "absolute",
        left: heroLeft, bottom: 110,
        fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
        fontSize: 72, lineHeight: 0.95, color: RED,
        letterSpacing: "-0.03em", textTransform: "uppercase",
        textShadow: `0 5px 0 rgba(0,0,0,0.55), 0 0 40px ${RED}55`,
        maxWidth: 1100,
      }}>
        {episodeTitle}
      </div>

      {/* footer tags */}
      <div style={{
        position: "absolute", left: heroLeft, bottom: 56,
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
        top={CAM_HEIGHT}
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
