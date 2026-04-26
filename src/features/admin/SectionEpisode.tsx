import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionEpisode({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">EPISODE</legend>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Episode Number
            <input
              type="text"
              value={config.episodeNumber}
              onChange={(e) => update("episodeNumber", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Episode Title
            <input
              type="text"
              value={config.episodeTitle}
              onChange={(e) => update("episodeTitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-xs text-white/60">
          Topic
          <input
            type="text"
            value={config.topic}
            onChange={(e) => update("topic", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Date
            <input
              type="text"
              value={config.date}
              onChange={(e) => update("date", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Time
            <input
              type="text"
              value={config.time}
              onChange={(e) => update("time", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-xs text-white/60">
          Ticker Text
          <input
            type="text"
            value={config.tickerText}
            onChange={(e) => update("tickerText", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
          />
        </label>
      </div>
    </fieldset>
  );
}
