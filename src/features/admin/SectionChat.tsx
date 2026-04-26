import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionChat({ config, update }: SectionProps) {
  const isLive = config.useLiveChat;
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">CHAT</legend>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Chat Title
          <input
            type="text"
            value={config.chatTitle}
            onChange={(e) => update("chatTitle", e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
          />
        </label>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-xs font-bold text-white/70">Fonte do chat</div>
            <div className="font-body text-[10px] text-white/40">
              {isLive ? "Restream · Twitch + Kick ao vivo" : "Mensagens de teste (sample)"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => update("useLiveChat", !isLive)}
            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 font-body text-xs font-bold tracking-wider transition ${
              isLive
                ? "border-green-500/40 bg-green-500/20 text-green-400"
                : "border-white/10 bg-white/5 text-white/40 hover:border-white/20"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: isLive ? "#22C55E" : "rgba(255,255,255,0.3)",
                animation: isLive ? "pulse 1.4s ease-in-out infinite" : "none",
              }}
            />
            {isLive ? "LIVE" : "TESTE"}
          </button>
        </div>
      </div>
    </fieldset>
  );
}
