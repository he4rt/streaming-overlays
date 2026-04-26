import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionBrb({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">BRB</legend>
      <label className="flex flex-col gap-1 text-xs text-white/60">
        BRB Track
        <input
          type="text"
          value={config.brbTrack}
          onChange={(e) => update("brbTrack", e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
        />
      </label>
    </fieldset>
  );
}
