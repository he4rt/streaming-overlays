import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { StartingV5 } from "./StartingV5";

export function StartingScene() {
  const t = useOverlayConfig();
  return (
    <Stage>
      <StartingV5 config={t} />
    </Stage>
  );
}
