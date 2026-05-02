import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { ScreenShare } from "./ScreenShare";
import { MiniCamera } from "@/shared/components/MiniCamera";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";
import { SpotifyNowPlayingCard } from "@/shared/components/SpotifyNowPlayingCard";

export function ScreenShareScene() {
  const t = useOverlayConfig();
  const { nowPlaying, configured, isLoading } = useSpotifyNowPlaying();
  const camAreaLeft = 30;
  const camAreaTop = 130;
  const camAreaRight = t.showChat ? 480 : 30;
  const camWidth = 1920 - camAreaLeft - camAreaRight;
  const camAreaH = 1080 - camAreaTop - 196;

  return (
    <Stage>
      <Overlay>
        <ScreenShare config={t} x={camAreaLeft} y={camAreaTop} w={camWidth - 300} h={camAreaH} />
        <div style={{ position: "absolute", display: "flex", flexDirection: "column", gap: 24, left: camAreaLeft + camWidth - 280, top: camAreaTop }}>
          <MiniCamera name={t.guest1Name} role={t.guest1Role} side="left" primary={t.primary} accent={t.accent} showPlaceholder={t.showCameraPlaceholders} />
          <MiniCamera name={t.guest2Name} role={t.guest2Role} side="right" primary={t.primary} accent={t.accent} showPlaceholder={t.showCameraPlaceholders} />
        </div>

        {t.showChat && t.showSpotifyNowPlaying && (
          <div
            style={{
              position: "absolute",
              right: 30,
              top: 804,
              width: 420,
              zIndex: 2,
            }}
          >
            <SpotifyNowPlayingCard
              nowPlaying={nowPlaying}
              configured={configured}
              isLoading={isLoading}
              primary={t.primary}
              accent={t.accent}
              bgPanel={t.bgPanel}
            />
          </div>
        )}
      </Overlay>
    </Stage>
  );
}
