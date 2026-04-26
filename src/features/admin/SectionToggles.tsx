import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

const toggleFields: { key: keyof TweakConfig; label: string }[] = [
  { key: "showChat", label: "Chat" },
  { key: "showTopBar", label: "Top Bar" },
  { key: "showLowerThird", label: "Lower Third" },
  { key: "showTicker", label: "Ticker" },
  { key: "showLiveBadge", label: "Live Badge" },
  { key: "showHeartParticles", label: "Heart Particles" },
];

export function SectionToggles({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">TOGGLES</legend>
      <div className="flex flex-wrap gap-2">
        {toggleFields.map(({ key, label }) => {
          const active = config[key] as boolean;
          return (
            <button
              key={key}
              type="button"
              onClick={() => update(key, !active)}
              className={`rounded-full border px-4 py-1.5 font-body text-xs font-bold tracking-wider transition ${
                active
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
