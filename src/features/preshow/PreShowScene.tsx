import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { PreShowV2 } from "./PreShowV2";

export function PreShowScene() {
  const t = useOverlayConfig();
  return (
    <Stage>
      <PreShowV2 config={t} />
    </Stage>
  );
}
