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

      {/* decorative diagonal accent lines */}
      <div style={{
        position: 'absolute', left: -100, top: -100,
        width: 400, height: 400,
        background: `linear-gradient(135deg, ${t.primary}33 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: -100, bottom: -100,
        width: 500, height: 500,
        background: `radial-gradient(circle, ${t.accent}33 0%, transparent 70%)`,
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {t.showTopBar && <TopBar config={t} />}
      {children}
      {t.showChat && <ChatPanel config={t} />}
      {t.showLowerThird && <LowerThird config={t} />}
      {t.showTicker && <TickerBar config={t} />}
    </GradientBackground>
  );
}
