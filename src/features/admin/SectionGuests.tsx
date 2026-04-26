import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionGuests({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">GUESTS</legend>
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-white/40">CONVIDADO 1</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 text-xs text-white/60">
                Name
                <input
                  type="text"
                  value={config.guest1Name}
                  onChange={(e) => update("guest1Name", e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs text-white/60">
                Role
                <input
                  type="text"
                  value={config.guest1Role}
                  onChange={(e) => update("guest1Role", e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-xs text-white/60">
              Handle
              <input
                type="text"
                value={config.guest1Handle}
                onChange={(e) => update("guest1Handle", e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-bold tracking-widest text-white/40">HOST</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 text-xs text-white/60">
                Name
                <input
                  type="text"
                  value={config.guest2Name}
                  onChange={(e) => update("guest2Name", e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs text-white/60">
                Role
                <input
                  type="text"
                  value={config.guest2Role}
                  onChange={(e) => update("guest2Role", e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-xs text-white/60">
              Handle
              <input
                type="text"
                value={config.guest2Handle}
                onChange={(e) => update("guest2Handle", e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
