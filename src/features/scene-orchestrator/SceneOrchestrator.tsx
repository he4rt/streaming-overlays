import { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { useObs } from "@/hooks/ObsProvider";
import { ScreenShareScene } from "@/features/screen-share/ScreenShareScene";
import { StartingScene } from "@/features/starting/StartingScene";
import { PreShowScene } from "@/features/preshow/PreShowScene";
import { LowerThirdsScene } from "@/features/lower-thirds/LowerThirdsScene";

const SCENE_MAP: Record<string, ComponentType> = {
  preshow: PreShowScene,
  "screen-share": ScreenShareScene,
  starting: StartingScene,
  "lower-thirds": LowerThirdsScene,
};

const TRANSITION_MS = 500;

export function SceneOrchestrator() {
  const { scene: configScene } = useOverlayConfig();
  const { connected: obsConnected, scene: obsScene } = useObs();
  // OBS é fonte da verdade quando conectado; senão cai no config interno
  const targetScene = obsConnected && obsScene ? obsScene : configScene;

  // back: cena estável — nunca toca durante a transição
  const [backScene, setBackScene] = useState(targetScene);
  // front: nova cena monta invisível e faz fade+slide por cima do back
  const [frontScene, setFrontScene] = useState(targetScene);
  // key força remount do front a cada transição para zerar estado CSS
  const [frontKey, setFrontKey] = useState(0);
  // false = front invisível (opacity 0), true = visível (opacity 1)
  const [frontVisible, setFrontVisible] = useState(true);

  const raf1 = useRef(0);
  const raf2 = useRef(0);
  const syncTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (targetScene === frontScene) return;

    // cancela qualquer transição em andamento
    cancelAnimationFrame(raf1.current);
    cancelAnimationFrame(raf2.current);
    clearTimeout(syncTimer.current);

    // monta nova cena no front, invisível — back NÃO é tocado aqui
    setFrontScene(targetScene);
    setFrontVisible(false);
    setFrontKey((k) => k + 1);

    // double-rAF: espera o browser pintar o front antes de animar
    raf1.current = requestAnimationFrame(() => {
      raf2.current = requestAnimationFrame(() => setFrontVisible(true));
    });

    // só atualiza o back depois que a transição termina — elimina o pulo
    syncTimer.current = setTimeout(
      () => setBackScene(targetScene),
      TRANSITION_MS + 50,
    );

    return () => {
      cancelAnimationFrame(raf1.current);
      cancelAnimationFrame(raf2.current);
      clearTimeout(syncTimer.current);
    };
  }, [targetScene]);

  const BackScene = SCENE_MAP[backScene] ?? PreShowScene;
  const FrontScene = SCENE_MAP[frontScene] ?? PreShowScene;

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      {/* Back: cena anterior permanece intacta durante toda a transição */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <BackScene />
      </div>

      {/* Front: nova cena entra com fade + leve slide */}
      <div
        key={frontKey}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: frontVisible ? 1 : 0,
          transform: frontVisible ? "translateX(0%)" : "translateX(4%)",
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <FrontScene />
      </div>
    </div>
  );
}
