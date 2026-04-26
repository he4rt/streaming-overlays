import { useSearchParams } from "react-router-dom";
import { Stage } from "@/features/stage/Stage";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { QuoteEditorial } from "./QuoteEditorial";
import { QuoteSerif } from "./QuoteSerif";
import { QuoteMinimal } from "./QuoteMinimal";

export function QuoteScene() {
  const [params] = useSearchParams();
  const variant = params.get("variant") ?? DEFAULTS.quoteVariant ?? "editorial";
  const t = DEFAULTS;

  const Variant =
    variant === "serif"
      ? QuoteSerif
      : variant === "minimal"
        ? QuoteMinimal
        : QuoteEditorial;

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: t.bgDeep }}>
        <ParticleField enabled={t.showHeartParticles} color={t.accent} />
        <Variant config={t} />
      </div>
    </Stage>
  );
}
