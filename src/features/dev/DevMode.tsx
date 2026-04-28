import { useState, useEffect, useCallback, useRef } from "react";
import { SceneOrchestrator } from "@/features/scene-orchestrator/SceneOrchestrator";
import { useOverlayConfig, saveOverlayConfig } from "@/hooks/useOverlayConfig";
import { DEFAULTS } from "@/config/defaults";

const SCENES = [
  { key: "1", value: "preshow", label: "Pré-Show", icon: "🎙" },
  { key: "2", value: "two-cams", label: "2 Cams", icon: "👥" },
  { key: "3", value: "screen-share", label: "Screen", icon: "🖥" },
  { key: "4", value: "starting", label: "Starting", icon: "⏳" },
  { key: "5", value: "brb", label: "BRB", icon: "☕" },
  { key: "6", value: "question", label: "Pergunta", icon: "❓" },
  { key: "7", value: "poll", label: "Enquete", icon: "📊" },
  { key: "8", value: "quote", label: "Quote", icon: "💬" },
  { key: "9", value: "ending", label: "Ending", icon: "🎬" },
] as const;

// Snapshot da config completa para preservar todos os campos ao trocar cena
function useConfigSnapshot() {
  const snapshotRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    async function sync() {
      try {
        const res = await fetch("/api/config");
        if (!res.ok) return;
        const data = await res.json();
        snapshotRef.current = data;
      } catch {
        // server not ready
      }
    }
    sync();
    const id = setInterval(sync, 500);
    return () => clearInterval(id);
  }, []);

  return snapshotRef;
}

export function DevMode() {
  const config = useOverlayConfig();
  const snapshotRef = useConfigSnapshot();
  const [hudVisible, setHudVisible] = useState(true);
  const [flash, setFlash] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>();

  const switchScene = useCallback(async (sceneValue: string) => {
    const merged = { ...DEFAULTS, ...snapshotRef.current, scene: sceneValue };
    await saveOverlayConfig(merged as Parameters<typeof saveOverlayConfig>[0]);
    setFlash(sceneValue);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 600);
  }, [snapshotRef]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === "h") {
        setHudVisible((v) => !v);
        return;
      }

      const scene = SCENES.find((s) => s.key === e.key);
      if (scene) switchScene(scene.value);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [switchScene]);

  const currentScene = SCENES.find((s) => s.value === config.scene);

  return (
    <>
      <SceneOrchestrator />

      {/* HUD */}
      {hudVisible ? (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Cena atual */}
          <div
            style={{
              background: "rgba(11,4,24,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: 10,
              padding: "4px 14px",
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(168,85,247,0.9)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {currentScene?.icon} {currentScene?.label ?? config.scene}
            <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: 10 }}>H · ocultar</span>
          </div>

          {/* Botões de cena */}
          <div
            style={{
              display: "flex",
              gap: 6,
              background: "rgba(11,4,24,0.85)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "10px 14px",
            }}
          >
            {SCENES.map((scene) => {
              const active = config.scene === scene.value;
              const flashing = flash === scene.value;
              return (
                <button
                  key={scene.value}
                  onClick={() => switchScene(scene.value)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: active
                      ? "1px solid rgba(168,85,247,0.6)"
                      : "1px solid rgba(255,255,255,0.06)",
                    background: flashing
                      ? "rgba(168,85,247,0.35)"
                      : active
                        ? "rgba(168,85,247,0.18)"
                        : "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s, transform 0.1s",
                    transform: flashing ? "scale(0.94)" : "scale(1)",
                    minWidth: 58,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{scene.icon}</span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: active ? "rgba(168,85,247,1)" : "rgba(255,255,255,0.5)",
                      letterSpacing: "0.05em",
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}
                  >
                    {scene.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      color: active ? "rgba(168,85,247,0.7)" : "rgba(255,255,255,0.2)",
                      background: active ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      padding: "1px 5px",
                    }}
                  >
                    {scene.key}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Indicador mínimo quando HUD oculto */
        <button
          onClick={() => setHudVisible(true)}
          style={{
            position: "fixed",
            bottom: 12,
            right: 16,
            zIndex: 9999,
            background: "rgba(11,4,24,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: "4px 10px",
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          H · mostrar atalhos
        </button>
      )}
    </>
  );
}
