import { useState, useCallback, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { QUESTION_LT_DURATION_MS } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";
import { useOverlayConfig, saveOverlayConfig } from "@/hooks/useOverlayConfig";
import { useObs, obsToInternal } from "@/hooks/ObsProvider";
import { SectionEpisode } from "./SectionEpisode";
import { SectionGuests } from "./SectionGuests";
import { SectionToggles } from "./SectionToggles";
import { SectionChat } from "./SectionChat";
import { SectionLaravel } from "./SectionLaravel";
import { SectionSchedule } from "./SectionSchedule";
import { SectionQuestions } from "./SectionQuestions";
import { BottomDock } from "./BottomDock";
import { OBSPreview } from "./OBSPreview";
import { AdminChatRail } from "./AdminChatRail";

const SCENES = [
  { value: "preshow", label: "Pré-Show" },
  { value: "starting", label: "Starting" },
  { value: "screen-share", label: "Screen Share" },
  { value: "lower-thirds", label: "Lower Thirds" },
] as const;

type SectionId =
  | "overview"
  | "episode"
  | "guests"
  | "schedule"
  | "questions"
  | "laravel"
  | "chat";

interface NavItem {
  id: SectionId;
  label: string;
  description: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    title: "Ao vivo",
    items: [
      { id: "overview", label: "Resumo", description: "Cena atual e overlays" },
    ],
  },
  {
    title: "Evento",
    items: [
      { id: "episode", label: "Episódio", description: "Título, número, data, tema" },
      { id: "guests", label: "Convidados", description: "Hosts e convidados" },
      { id: "schedule", label: "Cronograma", description: "Blocos do evento (lower-third)" },
      { id: "questions", label: "Perguntas", description: "Fila de perguntas (lower-third)" },
    ],
  },
  {
    title: "Tema",
    items: [
      { id: "laravel", label: "Laravel Edition", description: "Cor, tags, chat, backgrounds" },
    ],
  },
  {
    title: "Outros",
    items: [
      { id: "chat", label: "Chat", description: "Fonte (live ou sample)" },
    ],
  },
];

export function AdminPanel() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const [config, setConfig] = useState<TweakConfig>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setConfig({ ...DEFAULTS, ...data });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Sincroniza a cena quando alterada externamente (ex: /dev)
  const liveConfig = useOverlayConfig();
  const localSceneRef = useRef(config.scene);
  localSceneRef.current = config.scene;
  useEffect(() => {
    if (liveConfig.scene !== localSceneRef.current) {
      setConfig((prev) => ({ ...prev, scene: liveConfig.scene }));
    }
  }, [liveConfig.scene]);

  const [section, setSection] = useState<SectionId>("overview");
  const obs = useObs();

  const update = useCallback(
    (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => {
      setConfig((prev) => {
        const next = { ...prev, [key]: value };
        saveOverlayConfig(next);
        return next;
      });
    },
    []
  );

  // Atualiza várias chaves do config em uma única chamada — evita múltiplos
  // POSTs (e estados intermediários no overlay) quando uma ação muda mais de
  // um campo (ex: trigger de pergunta atualiza `questions` + `lowerThird`).
  const updateMany = useCallback((patch: Partial<TweakConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      saveOverlayConfig(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (!confirm("Resetar todas as configurações pro default?")) return;
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
  }, []);

  useEffect(() => {
    if (loaded) saveOverlayConfig(config);
  }, [loaded]);

  // Auto-clear: lower-third de pergunta sai sozinho QUESTION_LT_DURATION_MS
  // após o triggeredAt. Observa o estado do servidor pra funcionar independente
  // de quem disparou (SectionQuestions, BottomDock, AdminChatRail…).
  // Dep no `key` (id+triggeredAt) pra: (a) não reiniciar timer com mudanças
  // não-relacionadas; (b) reiniciar quando re-disparar a mesma pergunta.
  const liveQKey =
    liveConfig.lowerThird?.kind === "question"
      ? `${liveConfig.lowerThird.questionId}@${liveConfig.lowerThird.triggeredAt}`
      : null;
  const liveConfigRef = useRef(liveConfig);
  liveConfigRef.current = liveConfig;
  useEffect(() => {
    if (!liveQKey || liveConfig.lowerThird?.kind !== "question") return;
    const target = liveConfig.lowerThird;
    const remaining = Math.max(
      0,
      target.triggeredAt + QUESTION_LT_DURATION_MS - Date.now(),
    );
    const timer = setTimeout(() => {
      const current = liveConfigRef.current;
      if (
        current.lowerThird?.kind === "question" &&
        current.lowerThird.questionId === target.questionId &&
        current.lowerThird.triggeredAt === target.triggeredAt
      ) {
        const next = { ...current, lowerThird: null };
        saveOverlayConfig(next);
        setConfig((prev) => ({ ...prev, lowerThird: null }));
      }
    }, remaining);
    return () => clearTimeout(timer);
  }, [liveQKey]);

  // Cena ativa: OBS é fonte da verdade quando conectado
  const activeInternalScene = obs.connected && obs.scene ? obs.scene : config.scene;
  const currentScene =
    SCENES.find((s) => s.value === activeInternalScene) ?? SCENES[0];

  // No switcher do sidebar: quando OBS conectado, mostra só cenas que existem lá;
  // offline mostra a lista completa pra dev local.
  const obsInternalScenes = obs.connected
    ? new Set(obs.sceneList.map((n) => obsToInternal(n)?.scene).filter(Boolean) as string[])
    : null;
  const visibleScenes = obsInternalScenes
    ? SCENES.filter((s) => obsInternalScenes.has(s.value))
    : SCENES;

  const openScene = () => {
    window.open(
      `/${activeInternalScene}`,
      `scene-${activeInternalScene}`,
      "width=1920,height=1080",
    );
  };

  const switchScene = (internal: string) => {
    // Atualiza config interno (fallback offline)
    update("scene", internal);
    if (!obs.connected) return;
    // Acha cena OBS cuja forma mapeada bate com o internal pedido
    const match = obs.sceneList.find((name) => obsToInternal(name)?.scene === internal);
    if (match) {
      obs.setScene(match);
    } else {
      console.warn(`[admin] nenhuma cena OBS bate com "${internal}". sceneList:`, obs.sceneList);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0612] text-white">
      {/* TOP BAR */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0e0820] px-6 py-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 items-center justify-center rounded font-heading text-sm font-bold text-white"
            style={{ background: "#ff2d20" }}
          >
            L
          </span>
          <div className="font-heading text-base text-white">Laravel Day</div>
          <span className="rounded bg-white/5 px-2 py-0.5 font-body text-[10px] uppercase tracking-widest text-white/40">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* OBS connection status */}
          <div
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-body text-[11px] font-bold ${
              obs.connected
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
            title={obs.connected ? "OBS conectado em ws://localhost:4455" : "OBS desconectado"}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                obs.connected ? "bg-green-400 animate-pulse" : "bg-red-400"
              }`}
            />
            OBS {obs.connected ? "ON" : "OFF"}
          </div>
          {obs.streaming && (
            <span className="rounded-md bg-red-500/20 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-red-400">
              ● LIVE
            </span>
          )}
          {obs.recording && (
            <span className="rounded-md bg-orange-500/20 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-orange-400">
              ● REC
            </span>
          )}
          <span className="font-body text-[11px] text-white/40">cena:</span>
          <span className="rounded-md bg-accent/15 px-3 py-1 font-body text-xs font-bold text-accent">
            {currentScene.label}
          </span>
          <button
            onClick={openScene}
            className="rounded-md border border-white/10 px-3 py-1 font-body text-xs text-white/60 transition hover:border-accent/50 hover:text-accent"
          >
            Abrir preview
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-red-500/20 px-3 py-1 font-body text-xs text-red-400 transition hover:bg-red-500/10"
          >
            Reset
          </button>
        </div>
      </header>

      {/* MAIN: sidebar + content */}
      <div className="flex min-h-0 flex-1">
        {/* SIDEBAR */}
        <nav className="flex w-72 shrink-0 flex-col gap-1 overflow-y-auto border-r border-white/10 bg-[#0d071c] px-4 py-5">
          {/* Sticky scene picker */}
          <div className="mb-3 rounded-xl border border-white/10 bg-[#15092e] p-3">
            <div className="mb-2 font-body text-[10px] font-bold uppercase tracking-widest text-white/40">
              Trocar cena
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {visibleScenes.map((s) => {
                const active = activeInternalScene === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => switchScene(s.value)}
                    className={`rounded-md px-2 py-1.5 text-left font-body text-xs font-semibold transition ${
                      active
                        ? "bg-accent/25 text-accent"
                        : "bg-white/3 text-white/55 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {NAV.map((group) => (
            <div key={group.title} className="mb-2">
              <div className="px-2 py-2 font-body text-[10px] font-bold uppercase tracking-widest text-white/35">
                {group.title}
              </div>
              {group.items.map((item) => {
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition ${
                      active
                        ? "bg-accent/15 text-white shadow-[inset_2px_0_0_rgb(168_85_247)]"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="font-body text-sm font-semibold">{item.label}</span>
                    <span className="font-body text-[11px] text-white/35">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-8 py-8">
            <SectionContent
              section={section}
              config={config}
              update={update}
              updateMany={updateMany}
            />
          </div>
        </main>

        {/* RIGHT CHAT RAIL */}
        <AdminChatRail
          lowerThird={config.lowerThird}
          setLowerThird={(lt) => update("lowerThird", lt)}
          questions={config.questions}
          setQuestions={(qs) => update("questions", qs)}
        />
      </div>

      {/* BOTTOM DOCK — OBS interactions */}
      <BottomDock setLowerThird={(lt) => update("lowerThird", lt)} />
    </div>
  );
}

function SectionContent({
  section,
  config,
  update,
  updateMany,
}: {
  section: SectionId;
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
  updateMany: (patch: Partial<TweakConfig>) => void;
}) {
  switch (section) {
    case "overview":
      return (
        <Page title="Resumo" subtitle="Visão geral da live">
          <SectionToggles config={config} update={update} />
          <OBSPreview />
        </Page>
      );
    case "episode":
      return (
        <Page title="Episódio" subtitle="Informações compartilhadas entre todas as cenas">
          <SectionEpisode config={config} update={update} />
        </Page>
      );
    case "guests":
      return (
        <Page title="Convidados" subtitle="Host e convidados da live">
          <SectionGuests config={config} update={update} />
        </Page>
      );
    case "schedule":
      return (
        <Page
          title="Cronograma"
          subtitle="Blocos do evento — cada um pode ser disparado como lower-third"
        >
          <SectionSchedule config={config} update={update} />
        </Page>
      );
    case "questions":
      return (
        <Page
          title="Perguntas"
          subtitle="Fila de perguntas — admin dispara cada uma como lower-third quando for ler"
        >
          <SectionQuestions config={config} update={update} updateMany={updateMany} />
        </Page>
      );
    case "laravel":
      return (
        <Page title="Laravel Edition" subtitle="Tema das cenas Pré-Show, Starting e Screen Share">
          <SectionLaravel config={config} update={update} />
        </Page>
      );
    case "chat":
      return (
        <Page title="Chat" subtitle="Fonte do chat (live ou sample)">
          <SectionChat config={config} update={update} />
        </Page>
      );
  }
}

function Page({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
        <h1 className="font-heading text-2xl text-white">{title}</h1>
        <p className="font-body text-sm text-white/50">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
