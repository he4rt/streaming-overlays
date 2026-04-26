import { useState, useCallback, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";
import { saveOverlayConfig } from "@/hooks/useOverlayConfig";
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
import { SAMPLE_CHAT } from "@/shared/chat/sample-messages";
import type { ChatMessage } from "@/shared/types";

const SCENES = [
  { value: "two-cams", label: "2 Cams", icon: "👥" },
  { value: "screen-share", label: "Screen", icon: "🖥" },
  { value: "starting", label: "Starting", icon: "⏳" },
  { value: "brb", label: "BRB", icon: "☕" },
  { value: "question", label: "Pergunta", icon: "❓" },
  { value: "poll", label: "Enquete", icon: "📊" },
  { value: "quote", label: "Quote", icon: "💬" },
  { value: "ending", label: "Ending", icon: "🎬" },
] as const;

function LiveChatSidebar() {
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
      {/* chat header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="font-body text-xs font-bold uppercase tracking-widest text-white/70">
            Chat ao vivo
          </span>
        </div>
        <span className="font-body text-[10px] text-white/30">discord.app/he4rt</span>
      </div>

      {/* messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div key={(m.key ?? 0) + "-" + i} className="flex items-start gap-2">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: m.color }}
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

      {/* input */}
      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-xs text-white/30">
          envie sua mensagem…
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

  const [config, setConfig] = useState<TweakConfig>(() => {
    const stored = localStorage.getItem("he4rt-overlay-config");
    if (stored) {
      try {
        return { ...DEFAULTS, ...JSON.parse(stored) };
      } catch {
        /* ignore */
      }
    }
    return DEFAULTS;
  });

  const [activeTab, setActiveTab] = useState<"config" | "episode" | "guests" | "visuals">(
    "config"
  );

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
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
  }, []);

  useEffect(() => {
    saveOverlayConfig(config);
  }, []);

  const currentScene = SCENES.find((s) => s.value === config.scene) ?? SCENES[0];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0418] text-white">
      {/* ─── TOP NAV BAR ─── */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0e0820] px-5 py-2.5">
        <div className="flex items-center gap-4">
          <HeartLogo size={0.45} />
          <div className="h-5 w-px bg-white/10" />
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
            Stream Manager
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-green-500/15 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="font-body text-[10px] font-bold uppercase tracking-wider text-green-400">
              Ao vivo
            </span>
          </div>
          <button
            onClick={reset}
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500/20"
          >
            Reset
          </button>
        </div>
      </header>

      {/* ─── SCENE SWITCHER BAR ─── */}
      <div className="flex shrink-0 items-center gap-1 border-b border-white/10 bg-[#0d071c] px-4 py-2">
        <span className="mr-3 font-body text-[10px] font-bold uppercase tracking-widest text-white/30">
          Cena:
        </span>
        {SCENES.map((scene) => {
          const active = config.scene === scene.value;
          return (
            <button
              key={scene.value}
              onClick={() => update("scene", scene.value)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-body text-xs font-semibold transition ${
                active
                  ? "bg-accent/20 text-accent shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <span className="text-sm">{scene.icon}</span>
              {scene.label}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5">
          <span className="text-sm">{currentScene.icon}</span>
          <span className="font-body text-xs font-bold text-accent">{currentScene.label}</span>
        </div>
      </div>

      {/* ─── MAIN LAYOUT: sidebar tabs + content + chat ─── */}
      <div className="flex min-h-0 flex-1">
        {/* Left tab nav */}
        <nav className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/10 bg-[#0d071c] pt-3">
          {(
            [
              { tab: "config" as const, icon: "⚙️", label: "Config" },
              { tab: "episode" as const, icon: "🎙", label: "Episódio" },
              { tab: "guests" as const, icon: "👤", label: "Guests" },
              { tab: "visuals" as const, icon: "🎨", label: "Visual" },
            ] as const
          ).map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              title={label}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-base transition ${
                activeTab === tab
                  ? "bg-accent/20 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              {icon}
            </button>
          ))}
        </nav>

        {/* Center content */}
        <main className="flex-1 overflow-y-auto p-5">
          <div className="mx-auto max-w-2xl">
            {activeTab === "config" && (
              <div className="flex flex-col gap-4">
                <SectionScene config={config} update={update} />
                <SectionToggles config={config} update={update} />
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
              </div>
            )}
          </div>
        </main>

        {/* Right chat sidebar */}
        <aside className="w-72 shrink-0">
          <LiveChatSidebar />
        </aside>
      </div>
    </div>
  );
}
