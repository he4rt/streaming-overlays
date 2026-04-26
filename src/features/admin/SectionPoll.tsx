import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionPoll({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">POLL</legend>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Poll Question
          <textarea
            value={config.pollQuestion}
            onChange={(e) => update("pollQuestion", e.target.value)}
            rows={3}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent resize-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Total Votes
            <input
              type="number"
              value={config.pollTotalVotes}
              onChange={(e) => update("pollTotalVotes", Number(e.target.value))}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Time Left
            <input
              type="text"
              value={config.pollTimeLeft}
              onChange={(e) => update("pollTimeLeft", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
