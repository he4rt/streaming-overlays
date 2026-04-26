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

export function AdminPanel() {
  const [config, setConfig] = useState<TweakConfig>(() => {
    const stored = localStorage.getItem("he4rt-overlay-config");
    if (stored) {
      try { return { ...DEFAULTS, ...JSON.parse(stored) }; } catch { /* ignore */ }
    }
    return DEFAULTS;
  });

  const update = useCallback((key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value };
      saveOverlayConfig(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
  }, []);

  useEffect(() => {
    saveOverlayConfig(config);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HeartLogo size={0.6} />
            <span className="font-body text-sm tracking-widest text-white/50">ADMIN PANEL</span>
          </div>
          <button
            onClick={reset}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-body text-xs font-bold tracking-wider text-red-400 transition hover:bg-red-500/20"
          >
            RESET DEFAULTS
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <SectionScene config={config} update={update} />
          <SectionEpisode config={config} update={update} />
          <SectionGuests config={config} update={update} />
          <SectionColors config={config} update={update} />
          <SectionToggles config={config} update={update} />
          <SectionChat config={config} update={update} />
          <SectionBrb config={config} update={update} />
          <SectionQuestion config={config} update={update} />
          <SectionPoll config={config} update={update} />
          <SectionQuote config={config} update={update} />
        </div>
      </div>
    </div>
  );
}
