import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionScene({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">SCENE</legend>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Starting Variant
            <select
              value={config.startingVariant}
              onChange={(e) => update("startingVariant", e.target.value)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            >
              <option value="v1">V1 · Splash circular</option>
              <option value="v2">V2 · Neon grid</option>
              <option value="v3">V3 · Poster + portraits</option>
              <option value="v4">V4 · Tipografia + marquee</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Quote Variant
            <select
              value={config.quoteVariant}
              onChange={(e) => update("quoteVariant", e.target.value)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            >
              <option value="editorial">editorial</option>
              <option value="serif">serif</option>
              <option value="minimal">minimal</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Screen Content
            <select
              value={config.screenContent}
              onChange={(e) => update("screenContent", e.target.value as TweakConfig["screenContent"])}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            >
              <option value="code">code</option>
              <option value="browser">browser</option>
              <option value="slides">slides</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Screen Title
            <input
              type="text"
              value={config.screenTitle}
              onChange={(e) => update("screenTitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Starting Title
            <input
              type="text"
              value={config.startingTitle}
              onChange={(e) => update("startingTitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Starting Subtitle
            <input
              type="text"
              value={config.startingSubtitle}
              onChange={(e) => update("startingSubtitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-xs text-white/60">
          Starting Countdown (seconds)
          <input
            type="number"
            min={10}
            max={1800}
            step={10}
            value={config.startingCountdownSeconds}
            onChange={(e) => update("startingCountdownSeconds", Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Ending Title
            <input
              type="text"
              value={config.endingTitle}
              onChange={(e) => update("endingTitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Ending Subtitle
            <input
              type="text"
              value={config.endingSubtitle}
              onChange={(e) => update("endingSubtitle", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
