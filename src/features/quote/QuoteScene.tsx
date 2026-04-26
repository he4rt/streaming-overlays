import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { QuoteEditorial } from "./QuoteEditorial";
import { QuoteSerif } from "./QuoteSerif";
import { QuoteMinimal } from "./QuoteMinimal";

export function QuoteScene() {
  const t = useOverlayConfig();
  const variant = t.quoteVariant;

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
