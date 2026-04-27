import { useState, useEffect } from "react";
import type { ComponentType } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { TwoCamsScene } from "@/features/two-cams/TwoCamsScene";
import { ScreenShareScene } from "@/features/screen-share/ScreenShareScene";
import { StartingScene } from "@/features/starting/StartingScene";
import { EndingScene } from "@/features/ending/EndingScene";
import { BrbScene } from "@/features/brb/BrbScene";
import { QuestionScene } from "@/features/question/QuestionScene";
import { PollScene } from "@/features/poll/PollScene";
import { QuoteScene } from "@/features/quote/QuoteScene";
import { PreShowScene } from "@/features/preshow/PreShowScene";

const SCENE_MAP: Record<string, ComponentType> = {
  preshow: PreShowScene,
  "two-cams": TwoCamsScene,
  "screen-share": ScreenShareScene,
  starting: StartingScene,
  brb: BrbScene,
  question: QuestionScene,
  poll: PollScene,
  quote: QuoteScene,
  ending: EndingScene,
};

const FADE_MS = 400;

export function SceneOrchestrator() {
  const { scene: targetScene } = useOverlayConfig();
  const [activeScene, setActiveScene] = useState(targetScene);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (targetScene === activeScene) return;

    setOpacity(0);

    const timer = setTimeout(() => {
      setActiveScene(targetScene);
      // double-rAF: garante que o React pintou a nova cena antes de iniciar o fade-in
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setOpacity(1)),
      );
    }, FADE_MS);

    return () => clearTimeout(timer);
  }, [targetScene]);

  const SceneComponent = SCENE_MAP[activeScene] ?? TwoCamsScene;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        opacity,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <SceneComponent />
    </div>
  );
}
