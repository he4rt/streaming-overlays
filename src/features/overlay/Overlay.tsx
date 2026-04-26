import { type ReactNode } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { GradientBackground } from "@/shared/components/GradientBackground";
import { TopBar } from "./TopBar";
import { LowerThird } from "./LowerThird";
import { TickerBar } from "./TickerBar";
import { ChatPanel } from "@/shared/chat/ChatPanel";

interface OverlayProps {
  children: ReactNode;
}

export function Overlay({ children }: OverlayProps) {
  const t = useOverlayConfig();
  return (
    <GradientBackground primary={t.primary} primaryDeep={t.primaryDeep} accent={t.accent} bgDeep={t.bgDeep}>
      <ParticleField enabled={t.showHeartParticles} color={t.accent} />
      {t.showTopBar && <TopBar config={t} />}
      {children}
      {t.showChat && <ChatPanel config={t} />}
      {t.showLowerThird && <LowerThird config={t} />}
      {t.showTicker && <TickerBar config={t} />}
    </GradientBackground>
  );
}
