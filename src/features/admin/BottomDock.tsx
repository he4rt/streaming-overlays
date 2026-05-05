import { useObs, obsToInternal } from "@/hooks/ObsProvider";
import type { ObsAudioInput } from "@/hooks/ObsProvider";
import { Slider } from "@/shared/components/Slider";

const VOL_MIN_DB = -60;
const VOL_MAX_DB = 0;

export function BottomDock() {
  return (
    <div className="grid h-56 shrink-0 grid-cols-3 gap-3 border-t border-white/10 bg-[#0a0612] px-4 py-3">
      <ScenesPanel />
      <AudioPanel />
      <InteractionsPanel />
    </div>
  );
}

/* ────────────────────────── PANEL: GRUPO DE CENAS ────────────────────────── */
function ScenesPanel() {
  const obs = useObs();
  return (
    <PanelShell title="Grupo de cenas">
      {!obs.connected && <Empty msg="OBS desconectado" />}
      {obs.connected && obs.sceneList.length === 0 && <Empty msg="Sem cenas" />}
      {obs.connected && (
        <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1">
          {obs.sceneList.map((name) => {
            const active = obs.obsScene === name;
            const mapped = obsToInternal(name);
            const known = mapped !== null;
            return (
              <button
                key={name}
                onClick={() => obs.setScene(name)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left font-body text-xs transition ${
                  active
                    ? "bg-accent/25 text-accent shadow-[inset_0_0_0_1px_rgba(168,85,247,0.4)]"
                    : "bg-white/3 text-white/65 hover:bg-white/8 hover:text-white"
                }`}
                title={name}
              >
                {active ? (
                  <span className="text-sm">▶</span>
                ) : (
                  <span className="text-[10px] text-white/30">{known ? "·" : "?"}</span>
                )}
                <span className="truncate">{name.replace(/^\[HT\]\s*/, "")}</span>
              </button>
            );
          })}
        </div>
      )}
    </PanelShell>
  );
}

/* ────────────────────────── PANEL: OBS STATS (audio) ────────────────────────── */
function AudioPanel() {
  const obs = useObs();
  return (
    <PanelShell title="Obs Stats">
      {!obs.connected && <Empty msg="OBS desconectado" />}
      {obs.connected && obs.audioInputs.length === 0 && <Empty msg="Sem fontes de áudio" />}
      {obs.connected && obs.audioInputs.length > 0 && (
        <div className="flex h-full items-stretch gap-3 overflow-x-auto px-1">
          {obs.audioInputs.map((i) => (
            <AudioMeter key={i.name} input={i} />
          ))}
        </div>
      )}
    </PanelShell>
  );
}

function AudioMeter({ input }: { input: ObsAudioInput }) {
  const obs = useObs();
  const pct = Math.max(0, Math.min(1, input.level)) * 100;
  const clampedDb = Math.max(VOL_MIN_DB, Math.min(VOL_MAX_DB, input.volumeDb));

  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-1.5">
      <div className="w-full truncate text-center font-body text-[10px] font-bold text-white/55" title={input.name}>
        {input.name.length > 12 ? input.name.slice(0, 11) + "…" : input.name}
      </div>

      {/* meter + vertical slider lado a lado */}
      <div className="flex h-full w-full min-h-0 items-stretch gap-1.5">
        {/* meter bar */}
        <div className="relative w-3 overflow-hidden rounded bg-black/40 ring-1 ring-white/5">
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: `${pct}%`,
              background: "linear-gradient(180deg, #ef4444 0%, #f59e0b 30%, #84cc16 60%, #22d3ee 100%)",
              transition: "height 80ms linear",
            }}
          />
          {[20, 40, 60, 80].map((y) => (
            <div
              key={y}
              className="absolute inset-x-0 h-px bg-black/30"
              style={{ bottom: `${y}%` }}
            />
          ))}
        </div>

        {/* vertical volume slider */}
        <div className="flex flex-1 items-stretch justify-center">
          <Slider
            orientation="vertical"
            value={clampedDb}
            min={VOL_MIN_DB}
            max={VOL_MAX_DB}
            step={1}
            onChange={(db) => obs.setVolume(input.name, db)}
            ariaLabel={`Volume de ${input.name}`}
          />
        </div>
      </div>

      {/* mute + valor */}
      <div className="flex w-full items-center gap-1">
        <button
          onClick={() => obs.toggleMute(input.name)}
          className={`flex-1 rounded px-1.5 py-0.5 font-body text-[10px] font-bold transition ${
            input.muted
              ? "bg-red-500/30 text-red-300"
              : "bg-white/5 text-white/50 hover:bg-white/10"
          }`}
          title={input.muted ? "Desmutar" : "Mutar"}
        >
          {input.muted ? "🔇" : "🔊"}
        </button>
        <span className="font-mono text-[10px] tabular-nums text-white/55">
          {input.volumeDb.toFixed(0)}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────── PANEL: INTERAÇÕES ────────────────────────── */
const INTERACTIONS = [
  { id: "vote", label: "Votação", desc: "Abrir poll widget no chat" },
  { id: "challenge", label: "Desafio", desc: "Disparar desafio" },
  { id: "goal", label: "Meta", desc: "Mostrar meta da live" },
  { id: "shoutout", label: "Shoutout", desc: "Destacar viewer" },
];

function InteractionsPanel() {
  return (
    <PanelShell title="Interações">
      <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1">
        {INTERACTIONS.map((it) => (
          <button
            key={it.id}
            onClick={() => console.log("[interaction]", it.id)}
            className="flex flex-col gap-0.5 rounded-lg bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
            title={it.desc}
          >
            <span className="font-body text-xs font-semibold text-white/85">{it.label}</span>
            <span className="font-body text-[10px] text-white/35">{it.desc}</span>
          </button>
        ))}
      </div>
    </PanelShell>
  );
}

/* ────────────────────────── HELPERS ────────────────────────── */
function PanelShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-[#0d071c] p-3">
      <header className="mb-2 flex shrink-0 items-center justify-between">
        <h3 className="font-body text-xs font-bold uppercase tracking-widest text-white/65">
          {title}
        </h3>
        <button
          className="flex h-5 w-5 items-center justify-center rounded text-sm text-white/40 hover:bg-white/10 hover:text-white"
          title="Adicionar"
        >
          +
        </button>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="flex h-full items-center justify-center font-body text-xs text-white/30">
      {msg}
    </div>
  );
}
