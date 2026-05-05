import { useObs, obsToInternal } from "@/hooks/ObsProvider";
import type { ObsAudioInput } from "@/hooks/ObsProvider";
import { useOverlayConfig, saveOverlayConfig } from "@/hooks/useOverlayConfig";
import { guestAvatarUrl } from "@/shared/types";
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
        <div className="grid h-full auto-rows-max grid-cols-2 gap-1.5 overflow-y-auto pr-1">
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
function InteractionsPanel() {
  return (
    <PanelShell title="Interações">
      <div className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
        <GuestLTToggles />
        <ScheduleLTToggles />
      </div>
    </PanelShell>
  );
}

function ScheduleLTToggles() {
  const config = useOverlayConfig();
  const { schedule, lowerThird } = config;

  if (schedule.length === 0) return null;

  const isActive = (id: string) =>
    lowerThird?.kind === "schedule" && lowerThird.scheduleId === id;

  const toggle = (id: string) => {
    const next = isActive(id) ? null : ({ kind: "schedule", scheduleId: id } as const);
    saveOverlayConfig({ ...config, lowerThird: next });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-body text-[10px] font-bold uppercase tracking-widest text-white/40">
        Cronograma
      </div>
      {schedule.map((s) => {
        const active = isActive(s.id);
        return (
          <button
            key={s.id}
            onClick={() => toggle(s.id)}
            className={`flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition ${
              active
                ? "bg-accent/25 ring-1 ring-accent/60"
                : "bg-white/5 hover:bg-white/10"
            }`}
            title={active ? "Tirar do ar" : `Mostrar "${s.title}" na overlay`}
          >
            <span className="w-12 shrink-0 font-mono text-[11px] font-bold text-white/85 tabular-nums">
              {s.time}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-body text-xs font-bold text-white/90">
                {s.title}
              </span>
              {s.details && (
                <span className="truncate font-body text-[10px] text-white/45">
                  {s.details}
                </span>
              )}
            </div>
            <span
              className={`font-body text-[10px] font-bold uppercase tracking-wider ${
                active ? "text-accent" : "text-white/30"
              }`}
            >
              {active ? "▶ no ar" : "off"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GuestLTToggles() {
  const config = useOverlayConfig();
  const { guests, lowerThird } = config;

  if (guests.length === 0) {
    return (
      <p className="font-body text-[11px] text-white/30">
        Nenhum convidado cadastrado.
      </p>
    );
  }

  const isActive = (id: string) =>
    lowerThird?.kind === "guest" && lowerThird.guestId === id;

  const toggle = (id: string) => {
    const next = isActive(id) ? null : ({ kind: "guest", guestId: id } as const);
    saveOverlayConfig({ ...config, lowerThird: next });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-body text-[10px] font-bold uppercase tracking-widest text-white/40">
        Lower-third de palestrantes
      </div>
      {guests.map((g) => {
        const active = isActive(g.id);
        return (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition ${
              active
                ? "bg-accent/25 ring-1 ring-accent/60"
                : "bg-white/5 hover:bg-white/10"
            }`}
            title={active ? "Tirar do ar" : `Mostrar ${g.name} na overlay`}
          >
            {/* avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-black/30">
              {g.githubHandle ? (
                <img
                  src={guestAvatarUrl(g.githubHandle)}
                  alt={g.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
              ) : null}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-body text-xs font-bold text-white/90">
                {g.name}
              </span>
              <span className="truncate font-body text-[10px] text-white/45">
                {g.talk || "—"}
              </span>
            </div>
            <span
              className={`font-body text-[10px] font-bold uppercase tracking-wider ${
                active ? "text-accent" : "text-white/30"
              }`}
            >
              {active ? "▶ no ar" : "off"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────── HELPERS ────────────────────────── */
function PanelShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d071c] p-3">
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
