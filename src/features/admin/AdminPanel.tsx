import { useState, useCallback, useEffect, useRef } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";
import { useOverlayConfig, saveOverlayConfig } from "@/hooks/useOverlayConfig";
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
import { SectionQuote } from "./SectionQuote";
import { SectionPartners } from "./SectionPartners";
import { SAMPLE_CHAT } from "@/shared/chat/sample-messages";
import type { ChatMessage } from "@/shared/types";

const SCENES = [
  { value: "preshow", label: "Pré-Show", icon: "🎙" },
  { value: "two-cams", label: "2 Cams", icon: "👥" },
  { value: "screen-share", label: "Screen", icon: "🖥" },
  { value: "starting", label: "Starting", icon: "⏳" },
  { value: "brb", label: "BRB", icon: "☕" },
  { value: "question", label: "Pergunta", icon: "❓" },
  { value: "poll", label: "Enquete", icon: "📊" },
  { value: "quote", label: "Quote", icon: "💬" },
  { value: "ending", label: "Ending", icon: "🎬" },
] as const;

type TabId = "config" | "episode" | "guests" | "visuals";

const TABS: { tab: TabId; icon: string; label: string; hint: string }[] = [
  { tab: "config", icon: "⚙️", label: "Config", hint: "1" },
  { tab: "episode", icon: "🎙", label: "Episódio", hint: "2" },
  { tab: "guests", icon: "👤", label: "Guests", hint: "3" },
  { tab: "visuals", icon: "🎨", label: "Visual", hint: "4" },
];

function LiveChatSidebar({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT.slice(0, 8));

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[prev.length % SAMPLE_CHAT.length]!;
        return [...prev.slice(-12), { ...next, key: Date.now() }];
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-[#0e0820]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden />
          <span className="font-body text-xs font-bold uppercase tracking-widest text-white/70">
            Chat ao vivo
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar chat"
          className="rounded-md p-1 text-white/40 transition hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3 admin-scroll">
        {messages.map((m, i) => (
          <div
            key={(m.key ?? 0) + "-" + i}
            className="flex items-start gap-2 [animation:slideIn_220ms_ease-out_both]"
          >
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: m.color }}
              aria-hidden
            >
              {m.user[0]!.toUpperCase()}
            </div>
            <div className="min-w-0">
              <span className="font-body text-xs font-bold" style={{ color: m.color }}>
                {m.user}
              </span>
              {m.badge && (
                <span className="ml-1 rounded bg-accent/30 px-1 py-px text-[9px] font-bold uppercase text-accent">
                  {m.badge}
                </span>
              )}
              <p className="font-body text-xs leading-relaxed text-white/80">{m.msg}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-xs text-white/30">
          envie sua mensagem…
        </div>
      </div>
    </div>
  );
}

function SaveToast({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-green-400/30 bg-green-500/15 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-green-300 backdrop-blur-md transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <span className="mr-1.5" aria-hidden>✓</span> Salvo
    </div>
  );
}

function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel, onConfirm]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 [animation:fadeIn_160ms_ease-out_both]"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#160A2A] p-5 shadow-2xl [animation:pop_180ms_ease-out_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="font-heading text-lg tracking-wide text-white">
          {title}
        </h2>
        <p className="mt-2 font-body text-sm text-white/60">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-body text-xs font-bold uppercase tracking-wider text-white/70 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            className="rounded-lg border border-red-500/40 bg-red-500/20 px-4 py-2 font-body text-xs font-bold uppercase tracking-wider text-red-300 transition hover:bg-red-500/30 focus-visible:outline-2 focus-visible:outline-red-400"
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}

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

  const liveConfig = useOverlayConfig();
  const localSceneRef = useRef(config.scene);
  localSceneRef.current = config.scene;
  useEffect(() => {
    if (liveConfig.scene !== localSceneRef.current) {
      setConfig((prev) => ({ ...prev, scene: liveConfig.scene }));
    }
  }, [liveConfig.scene]);

  const [activeTab, setActiveTab] = useState<TabId>("config");
  const [chatOpen, setChatOpen] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);
  const [savedAt, setSavedAt] = useState<number>(0);

  const flashSaved = useCallback(() => setSavedAt(Date.now()), []);

  const update = useCallback(
    (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => {
      setConfig((prev) => {
        const next = { ...prev, [key]: value };
        saveOverlayConfig(next);
        return next;
      });
      flashSaved();
    },
    [flashSaved]
  );

  const reset = useCallback(() => {
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
    setConfirmReset(false);
    flashSaved();
  }, [flashSaved]);

  useEffect(() => {
    if (loaded) saveOverlayConfig(config);
  }, [loaded]);

  // Cmd/Ctrl+1..4 switches tabs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const idx = ["1", "2", "3", "4"].indexOf(e.key);
      if (idx >= 0) {
        e.preventDefault();
        setActiveTab(TABS[idx]!.tab);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Toast auto-hide
  const [toastVisible, setToastVisible] = useState(false);
  useEffect(() => {
    if (!savedAt) return;
    setToastVisible(true);
    const id = setTimeout(() => setToastVisible(false), 1300);
    return () => clearTimeout(id);
  }, [savedAt]);

  const currentScene = SCENES.find((s) => s.value === config.scene) ?? SCENES[0];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0418] text-white">
      {/* ─── TOP NAV BAR ─── */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#0e0820]/95 px-4 py-2.5 backdrop-blur-sm sm:px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <HeartLogo size={0.45} />
          <div className="hidden h-5 w-px bg-white/10 sm:block" />
          <span className="hidden font-body text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 sm:inline">
            Stream Manager
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            aria-pressed={chatOpen}
            aria-label={chatOpen ? "Esconder chat" : "Mostrar chat"}
            className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-body text-[10px] font-bold uppercase tracking-wider text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent lg:inline-flex"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </button>

          <div
            className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1"
            role="status"
            aria-label="Stream ao vivo"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
            <span className="font-body text-[10px] font-bold uppercase tracking-wider text-green-400">
              Ao vivo
            </span>
          </div>
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:scale-[1.03] hover:bg-red-500/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-red-400"
          >
            Reset
          </button>
        </div>
      </header>

      {/* ─── SCENE SWITCHER BAR ─── */}
      <div
        role="tablist"
        aria-label="Selecionar cena"
        className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#0d071c] px-3 py-2 sm:px-4"
      >
        <span className="hidden shrink-0 font-body text-[10px] font-bold uppercase tracking-widest text-white/30 sm:inline">
          Cena
        </span>
        <div className="admin-scroll-x flex flex-1 items-center gap-1 overflow-x-auto scroll-smooth">
          {SCENES.map((scene) => {
            const active = config.scene === scene.value;
            return (
              <button
                key={scene.value}
                role="tab"
                aria-selected={active}
                onClick={() => update("scene", scene.value)}
                className={`group relative flex shrink-0 snap-start items-center gap-1.5 rounded-lg px-3 py-1.5 font-body text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                  active
                    ? "bg-accent/20 text-accent shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                    : "text-white/40 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <span className="text-sm transition-transform duration-200 group-hover:scale-110" aria-hidden>
                  {scene.icon}
                </span>
                {scene.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 -bottom-[7px] h-[2px] rounded-full bg-accent [animation:slideIn_240ms_ease-out_both]"
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5">
            <span className="text-sm" aria-hidden>{currentScene.icon}</span>
            <span className="font-body text-xs font-bold text-accent">{currentScene.label}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const url = `/${config.scene === "two-cams" ? "" : config.scene}`;
              window.open(url, `scene-${config.scene}`, "width=1920,height=1080,menubar=no,toolbar=no,location=no,status=no");
            }}
            aria-label={`Abrir cena ${currentScene.label} em nova janela`}
            className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 font-body text-xs font-bold text-accent transition-all duration-200 hover:scale-[1.03] hover:bg-accent/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Abrir Scene
          </button>
        </div>
      </div>

      {/* ─── MAIN LAYOUT: tab rail + content + chat ─── */}
      <div className="flex min-h-0 flex-1">
        {/* Side rail (md+) */}
        <nav
          aria-label="Seções do painel"
          className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/10 bg-[#0d071c] p-3 md:flex"
        >
          {TABS.map(({ tab, icon, label, hint }) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={active}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-left font-body text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                  active
                    ? "bg-accent/15 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent [animation:slideIn_220ms_ease-out_both]"
                  />
                )}
                <span className="text-base transition-transform duration-200 group-hover:scale-110" aria-hidden>
                  {icon}
                </span>
                <span className="flex-1 font-semibold">{label}</span>
                <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-white/40 group-hover:text-white/60 lg:inline">
                  ⌘{hint}
                </kbd>
              </button>
            );
          })}
        </nav>

        {/* Bottom tab bar (mobile) */}
        <nav
          aria-label="Seções do painel (mobile)"
          className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-white/10 bg-[#0d071c]/95 backdrop-blur-md md:hidden"
        >
          {TABS.map(({ tab, icon, label }) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={active}
                className={`relative flex flex-1 flex-col items-center gap-0.5 px-2 py-2 font-body text-[10px] font-bold uppercase tracking-wider transition focus-visible:outline-2 focus-visible:outline-accent ${
                  active ? "text-accent" : "text-white/40"
                }`}
              >
                <span className="text-base" aria-hidden>{icon}</span>
                {label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-[2px] rounded-full bg-accent [animation:slideIn_220ms_ease-out_both]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Center content */}
        <main className="flex-1 overflow-y-auto admin-scroll p-4 pb-20 sm:p-5 md:pb-5">
          {!loaded ? (
            <div className="mx-auto max-w-3xl space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl border border-white/5 bg-white/[0.02] [animation:pulse_1.6s_ease-in-out_infinite]"
                  aria-hidden
                />
              ))}
              <span className="sr-only">Carregando configuração…</span>
            </div>
          ) : (
            <div
              key={activeTab}
              className="mx-auto max-w-3xl [animation:tabFade_220ms_ease-out_both]"
            >
              {activeTab === "config" && (
                <div className="flex flex-col gap-4">
                  <SectionScene config={config} update={update} />
                  <SectionToggles config={config} scene={config.scene} update={update} />
                  <SectionBrb config={config} update={update} />
                  <SectionQuestion config={config} update={update} />
                  <SectionPoll config={config} update={update} />
                  <SectionQuote config={config} update={update} />
                  <SectionChat config={config} update={update} />
                </div>
              )}

              {activeTab === "episode" && (
                <div className="flex flex-col gap-4">
                  <SectionEpisode config={config} update={update} />
                </div>
              )}

              {activeTab === "guests" && (
                <div className="flex flex-col gap-4">
                  <SectionGuests config={config} update={update} />
                </div>
              )}

              {activeTab === "visuals" && (
                <div className="flex flex-col gap-4">
                  <SectionColors config={config} update={update} />
                  <SectionPartners config={config} update={update} />
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right chat sidebar (lg+, collapsible) */}
        {chatOpen && (
          <aside className="hidden w-72 shrink-0 lg:block [animation:slideInRight_240ms_ease-out_both]">
            <LiveChatSidebar onClose={() => setChatOpen(false)} />
          </aside>
        )}
      </div>

      <SaveToast visible={toastVisible} />
      <ConfirmDialog
        open={confirmReset}
        title="Resetar configuração?"
        message="Isso vai restaurar todos os valores para o padrão. Não dá pra desfazer."
        onCancel={() => setConfirmReset(false)}
        onConfirm={reset}
      />
    </div>
  );
}
