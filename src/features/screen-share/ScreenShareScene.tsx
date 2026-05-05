import { Stage } from "@/features/stage/Stage";
import { ScreenShareV2 } from "./ScreenShareV2";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useObs } from "@/hooks/ObsProvider";

export function ScreenShareScene() {
  const baseConfig = useOverlayConfig();
  const obs = useObs();

  // Aspect priority: ?aspect=URL → OBS active scene aspect → config default
  const aspectParam = new URLSearchParams(window.location.search).get("aspect");
  const urlAspect: "16:9" | "16:10" | null =
    aspectParam === "16:9" || aspectParam === "16:10" ? aspectParam : null;
  const obsAspect = obs.connected ? obs.aspect : null;
  const aspectOverride = urlAspect ?? obsAspect;
  const t = aspectOverride
    ? { ...baseConfig, screenShareAspect: aspectOverride }
    : baseConfig;

  return (
    <Stage>
      <ScreenShareV2 config={t} />
    </Stage>
  );
}
