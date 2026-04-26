import { useSearchParams } from "react-router-dom";
import { Stage } from "@/features/stage/Stage";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { StartingV1 } from "./StartingV1";
import { StartingV2 } from "./StartingV2";
import { StartingV3 } from "./StartingV3";
import { StartingV4 } from "./StartingV4";

export function StartingScene() {
  const [params] = useSearchParams();
  const variant = params.get("variant") ?? "v1";
  const t = DEFAULTS;

  const Scene =
    variant === "v2"
      ? StartingV2
      : variant === "v3"
        ? StartingV3
        : variant === "v4"
          ? StartingV4
          : StartingV1;

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: t.bgDeep }}>
        <ParticleField enabled={t.showHeartParticles} color={t.accent} />
        <Scene config={t} />
      </div>
    </Stage>
  );
}
