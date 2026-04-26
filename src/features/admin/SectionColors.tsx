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
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">COLORS</legend>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-3">
          {colorFields.map(({ key, label }) => (
            <label key={key} className="flex flex-col items-center gap-2 text-xs text-white/60">
              <input
                type="color"
                value={config[key] as string}
                onChange={(e) => update(key, e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
              />
              <span className="text-center">{label}</span>
            </label>
          ))}
        </div>

        <label className="flex flex-col gap-2 text-xs text-white/60">
          <div className="flex items-center justify-between">
            <span>Panel Opacity</span>
            <span className="font-mono text-white">{config.panelOpacity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={config.panelOpacity}
            onChange={(e) => update("panelOpacity", Number(e.target.value))}
            className="w-full accent-accent"
          />
        </label>
      </div>
    </fieldset>
  );
}
