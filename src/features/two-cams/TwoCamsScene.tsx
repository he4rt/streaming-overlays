import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { CameraFrame } from "@/shared/components/CameraFrame";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";
import { SpotifyNowPlayingCard } from "@/shared/components/SpotifyNowPlayingCard";

export function TwoCamsScene() {
  const t = useOverlayConfig();
  const { nowPlaying, configured, isLoading } = useSpotifyNowPlaying();
  const camAreaLeft = 30;
  const camAreaTop = 130;
  const camAreaRight = t.showChat ? 480 : 30;
  const camAreaBottom = 196;
  const camWidth = 1920 - camAreaLeft - camAreaRight;
  const camAreaH = 1080 - camAreaTop - camAreaBottom;
  const gap = 24;
  const camW = (camWidth - gap) / 2;
  const camH = camAreaH;

  return (
    <Stage>
      <Overlay>
        <CameraFrame x={camAreaLeft} y={camAreaTop} w={camW} h={camH}
          name={t.guest1Name} role={t.guest1Role} handle={t.guest1Handle} side="left" primary={t.primary} accent={t.accent} showPlaceholder={t.showCameraPlaceholders} />
        <CameraFrame x={camAreaLeft + camW + gap} y={camAreaTop} w={camW} h={camH}
          name={t.guest2Name} role={t.guest2Role} handle={t.guest2Handle} side="right" primary={t.primary} accent={t.accent} showPlaceholder={t.showCameraPlaceholders} />

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
