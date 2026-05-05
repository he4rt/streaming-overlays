import { useState, useCallback, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";
import { useOverlayConfig, saveOverlayConfig } from "@/hooks/useOverlayConfig";
import { useObs, obsToInternal } from "@/hooks/ObsProvider";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { SectionScene } from "./SectionScene";
import { SectionEpisode } from "./SectionEpisode";
import { SectionGuests } from "./SectionGuests";
import { SectionColors } from "./SectionColors";
import { SectionToggles } from "./SectionToggles";
import { SectionChat } from "./SectionChat";
import { SectionBrb } from "./SectionBrb";
import { SectionQuestion } from "./SectionQuestion";
import { SectionPoll } from "./SectionPoll";
import { SectionPartners } from "./SectionPartners";
import { SectionLaravel } from "./SectionLaravel";
import { BottomDock } from "./BottomDock";

const SCENES = [
  { value: "preshow", label: "Pré-Show" },
  { value: "two-cams", label: "2 Cams" },
  { value: "screen-share", label: "Screen Share" },
  { value: "starting", label: "Starting" },
  { value: "brb", label: "BRB" },
  { value: "question", label: "Pergunta" },
  { value: "ending", label: "Ending" },
] as const;

type SectionId =
  | "overview"
  | "episode"
  | "guests"
  | "laravel"
  | "visual"
  | "scenes"
  | "brb"
  | "question"
  | "poll"
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
    ],
  },
  {
    title: "Tema",
    items: [
      { id: "laravel", label: "Laravel Edition", description: "Cor, tags, chat, backgrounds" },
      { id: "visual", label: "Visual (legado)", description: "Cores roxo, partners" },
    ],
  },
  {
    title: "Dados das cenas",
    items: [
      { id: "scenes", label: "Starting / Screen / Ending (V1)", description: "Campos das cenas legadas" },
      { id: "brb", label: "BRB", description: "Tempo + faixa" },
      { id: "question", label: "Pergunta", description: "Texto da pergunta no ar" },
      { id: "poll", label: "Poll widget", description: "Dados da enquete (overlay no chat)" },
      { id: "chat", label: "Chat", description: "Configurações do chat" },
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

  const reset = useCallback(() => {
    if (!confirm("Resetar todas as configurações pro default?")) return;
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
  }, []);

  useEffect(() => {
    if (loaded) saveOverlayConfig(config);
  }, [loaded]);

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
    const path = activeInternalScene === "two-cams" ? "/" : `/${activeInternalScene}`;
    window.open(path, `scene-${activeInternalScene}`, "width=1920,height=1080");
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
          <HeartLogo size={0.4} />
          <div className="font-heading text-base text-white">Heart Talks</div>
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
            <SectionContent section={section} config={config} update={update} />
          </div>
        </main>
      </div>

      {/* BOTTOM DOCK — OBS interactions */}
      <BottomDock />
    </div>
  );
}

function SectionContent({
  section,
  config,
  update,
}: {
  section: SectionId;
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}) {
  switch (section) {
    case "overview":
      return (
        <Page title="Resumo" subtitle="Visão geral da live">
          <SectionToggles config={config} scene={config.scene} update={update} />
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
    case "laravel":
      return (
        <Page
          title="Laravel Edition"
          subtitle="Tema das cenas Pré-Show V2, Starting V5 e Screen Share V2"
        >
          <SectionLaravel config={config} update={update} />
        </Page>
      );
    case "visual":
      return (
        <Page title="Visual (legado)" subtitle="Tema das cenas V1 (roxo / partners)">
          <SectionColors config={config} update={update} />
          <SectionPartners config={config} update={update} />
        </Page>
      );
    case "scenes":
      return (
        <Page title="Cenas legadas (V1)" subtitle="Starting / Screen Share / Ending — versões anteriores">
          <SectionScene config={config} update={update} />
        </Page>
      );
    case "brb":
      return (
        <Page title="BRB" subtitle="Cena de pausa">
          <SectionBrb config={config} update={update} />
        </Page>
      );
    case "question":
      return (
        <Page title="Pergunta" subtitle="Pergunta destacada da audiência">
          <SectionQuestion config={config} update={update} />
        </Page>
      );
    case "poll":
      return (
        <Page
          title="Poll widget"
          subtitle="Dados da enquete (a renderizar como overlay no chat)"
        >
          <SectionPoll config={config} update={update} />
        </Page>
      );
    case "chat":
      return (
        <Page title="Chat" subtitle="Configurações do chat">
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
