import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

const colorFields: { key: keyof TweakConfig; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "primaryDeep", label: "Primary Deep" },
  { key: "accent", label: "Accent" },
  { key: "bgDeep", label: "BG Deep" },
  { key: "bgPanel", label: "BG Panel" },
];

export function SectionColors({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 bg-white/[0.015] p-4 transition-colors hover:border-white/15">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">COLORS</legend>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {colorFields.map(({ key, label }) => {
            const value = config[key] as string;
            const id = `color-${key}`;
            return (
              <div
                key={key}
                className="group flex flex-col items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.04]"
              >
                <label
                  htmlFor={id}
                  className="relative h-12 w-full cursor-pointer overflow-hidden rounded-md border border-white/10 shadow-inner transition-shadow group-hover:shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                  style={{ background: value }}
                  aria-label={`${label} color`}
                >
                  <input
                    id={id}
                    type="color"
                    value={value}
                    onChange={(e) => update(key, e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>
                <span className="text-center text-xs font-semibold text-white/70">{label}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        <label className="flex flex-col gap-2 text-xs text-white/60">
          <div className="flex items-center justify-between">
            <span>Panel Opacity</span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-white">
              {config.panelOpacity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={config.panelOpacity}
            onChange={(e) => update("panelOpacity", Number(e.target.value))}
            className="w-full accent-accent"
            aria-label="Panel opacity"
          />
        </label>
      </div>
    </fieldset>
  );
}
