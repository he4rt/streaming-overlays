import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionQuote({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">QUOTE</legend>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Quote Text
          <textarea
            value={config.quoteText}
            onChange={(e) => update("quoteText", e.target.value)}
            rows={3}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent resize-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Author
            <input
              type="text"
              value={config.quoteAuthor}
              onChange={(e) => update("quoteAuthor", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Author Role
            <input
              type="text"
              value={config.quoteAuthorRole}
              onChange={(e) => update("quoteAuthorRole", e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-xs text-white/60">
          Context
          <input
            type="text"
            value={config.quoteContext}
            onChange={(e) => update("quoteContext", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
          />
        </label>
      </div>
    </fieldset>
  );
}
