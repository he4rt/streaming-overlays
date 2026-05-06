import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  scene: TweakConfig["scene"];
  update: (
    key: keyof TweakConfig,
    value: TweakConfig[keyof TweakConfig],
  ) => void;
}

const toggleFields: { key: keyof TweakConfig; label: string }[] = [
  { key: "showChat", label: "Chat" },
  { key: "showTopBar", label: "Top Bar" },
  { key: "showPartnersPanel", label: "Partners Panel" },
  { key: "showLowerThird", label: "Lower Third" },
  { key: "showTicker", label: "Ticker" },
  { key: "showLiveBadge", label: "Live Badge" },
  { key: "showHeartParticles", label: "Heart Particles" },
  { key: "showCameraPlaceholders", label: "Camera Placeholders" },
  { key: "showSpotifyNowPlaying", label: "Spotify Now Playing" },
];

const SPOTIFY_SCENES = new Set(["preshow", "two-cams", "screen-share"]);

export function SectionToggles({ config, scene, update }: SectionProps) {
  const visibleToggles = toggleFields.filter(({ key }) => {
    if (key !== "showSpotifyNowPlaying") return true;
    return SPOTIFY_SCENES.has(scene);
  });

  const activeCount = visibleToggles.filter(({ key }) => config[key]).length;

  return (
    <fieldset className="rounded-xl border border-white/10 bg-white/[0.015] p-4 transition-colors hover:border-white/15">
      <legend className="flex items-center gap-2 px-2 font-heading text-sm tracking-wider text-accent">
        TOGGLES
        <span className="rounded-full bg-accent/10 px-2 py-0.5 font-body text-[10px] font-bold tracking-wider text-accent/80">
          {activeCount}/{visibleToggles.length}
        </span>
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Visibilidade dos componentes">
        {visibleToggles.map(({ key, label }) => {
          const active = config[key] as boolean;
          return (
            <button
              key={key}
              type="button"
              role="switch"
              aria-checked={active}
              onClick={() => update(key, !active)}
              className={`group flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-xs font-bold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                active
                  ? "border-accent bg-accent/20 text-accent shadow-[0_0_10px_rgba(168,85,247,0.18)]"
                  : "border-white/10 bg-white/5 text-white/40 hover:-translate-y-0.5 hover:border-white/20 hover:text-white/70"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all duration-200 ${
                  active
                    ? "border-accent bg-accent text-[#0b0418]"
                    : "border-white/20 bg-transparent"
                }`}
              >
                {active && (
                  <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
