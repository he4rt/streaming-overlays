import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionBrb({ config, update }: SectionProps) {
  const source = config.brbNowPlayingSource;
  const isBrbScene = config.scene === "brb";

  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">BRB</legend>
      {isBrbScene && (
        <div className="mb-4 flex flex-col gap-2">
          <span className="text-xs text-white/60">Now Playing Source</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => update("brbNowPlayingSource", "brb")}
              className={`rounded-full border px-4 py-1.5 font-body text-xs font-bold tracking-wider transition ${
                source === "brb"
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              BRB
            </button>
            <button
              type="button"
              onClick={() => update("brbNowPlayingSource", "spotify")}
              className={`rounded-full border px-4 py-1.5 font-body text-xs font-bold tracking-wider transition ${
                source === "spotify"
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              Spotify
            </button>
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1 text-xs text-white/60">
        BRB Track
        <input
          type="text"
          value={config.brbTrack}
          onChange={(e) => update("brbTrack", e.target.value)}
          disabled={source === "spotify"}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
        />
      </label>
    </fieldset>
  );
}
