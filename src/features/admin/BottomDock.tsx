import { useEffect, useState } from "react";
import { useObs, obsToInternal } from "@/hooks/ObsProvider";
import type { ObsAudioInput } from "@/hooks/ObsProvider";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { guestAvatarUrl, QUESTION_LT_DURATION_MS } from "@/shared/types";
import type { LowerThird } from "@/shared/types";
import { Slider } from "@/shared/components/Slider";

type InteractionFilter = "all" | "guests" | "schedule" | "questions";

interface BottomDockProps {
  /**
   * Sincroniza writes da lower-third com o estado local do AdminPanel,
   * evitando dois write paths e a janela de inconsistência (até 200ms) que
   * existiria se chamássemos `saveOverlayConfig` direto aqui.
   */
  setLowerThird: (lt: LowerThird) => void;
}

const VOL_MIN_DB = -60;
const VOL_MAX_DB = 0;

export function BottomDock({ setLowerThird }: BottomDockProps) {
  return (
    <div className="grid h-56 shrink-0 grid-cols-3 gap-3 border-t border-white/10 bg-[#0a0612] px-4 py-3">
      <ScenesPanel />
      <AudioPanel />
      <InteractionsPanel setLowerThird={setLowerThird} />
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
function InteractionsPanel({ setLowerThird }: { setLowerThird: (lt: LowerThird) => void }) {
  const [filter, setFilter] = useState<InteractionFilter>("all");
  const [compact, setCompact] = useState(false);

  const showGuests = filter === "all" || filter === "guests";
  const showSchedule = filter === "all" || filter === "schedule";
  const showQuestions = filter === "all" || filter === "questions";

  return (
    <PanelShell
      title="Interações"
      actions={
        <div className="flex items-center gap-1">
          <FilterChip label="Tudo" active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip
            label="Palestrantes"
            active={filter === "guests"}
            onClick={() => setFilter("guests")}
          />
          <FilterChip
            label="Cronograma"
            active={filter === "schedule"}
            onClick={() => setFilter("schedule")}
          />
          <FilterChip
            label="Perguntas"
            active={filter === "questions"}
            onClick={() => setFilter("questions")}
          />
          <button
            type="button"
            onClick={() => setCompact((c) => !c)}
            title={compact ? "Modo expandido" : "Modo compacto"}
            className={`ml-1 flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold transition ${
              compact
                ? "bg-accent/30 text-accent"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            {compact ? "▦" : "≡"}
          </button>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
        {showGuests && <GuestLTToggles compact={compact} setLowerThird={setLowerThird} />}
        {showSchedule && <ScheduleLTToggles compact={compact} setLowerThird={setLowerThird} />}
        {showQuestions && (
          <QuestionLTToggles compact={compact} setLowerThird={setLowerThird} />
        )}
      </div>
    </PanelShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-1.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-wider transition ${
        active
          ? "bg-accent/25 text-accent"
          : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}

function QuestionLTToggles({
  compact,
  setLowerThird,
}: {
  compact: boolean;
  setLowerThird: (lt: LowerThird) => void;
}) {
  const { questions, lowerThird } = useOverlayConfig();

  if (questions.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <CategoryHeader label="Perguntas" />
        <CategoryEmpty msg="Nenhuma pergunta na fila." />
      </div>
    );
  }

  const isActive = (id: string) =>
    lowerThird?.kind === "question" && lowerThird.questionId === id;

  const activeTriggeredAt =
    lowerThird?.kind === "question" ? lowerThird.triggeredAt : null;

  const toggle = (id: string) => {
    setLowerThird(
      isActive(id)
        ? null
        : { kind: "question", questionId: id, triggeredAt: Date.now() },
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <CategoryHeader label="Perguntas" />
      {questions.map((q) => {
        const active = isActive(q.id);
        const initial = (q.user || "?")[0]!.toUpperCase();
        const avatarSize = compact ? "h-5 w-5 text-[10px]" : "h-7 w-7 text-xs";
        return (
          <button
            key={q.id}
            onClick={() => toggle(q.id)}
            className={`flex items-center gap-3 rounded-lg text-left transition ${
              compact ? "px-2 py-1" : "px-2.5 py-1.5"
            } ${
              active
                ? "bg-accent/25 ring-1 ring-accent/60"
                : "bg-white/5 hover:bg-white/10"
            }`}
            title={active ? "Tirar do ar" : `Mostrar pergunta de ${q.user}`}
          >
            <div
              className={`flex shrink-0 items-center justify-center rounded font-bold uppercase text-white ${avatarSize}`}
              style={{ background: q.color }}
            >
              {initial}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-body text-xs font-bold" style={{ color: q.color }}>
                {q.user || "—"}
              </span>
              {!compact && (
                <span className="truncate font-body text-[10px] text-white/55">
                  {q.text || "—"}
                </span>
              )}
            </div>
            {active && activeTriggeredAt !== null ? (
              <CountdownBadge triggeredAt={activeTriggeredAt} />
            ) : (
              <ActiveBadge active={active} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function CountdownBadge({ triggeredAt }: { triggeredAt: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const remainingMs = Math.max(0, triggeredAt + QUESTION_LT_DURATION_MS - now);
  const remainingS = Math.ceil(remainingMs / 1000);
  return (
    <span
      className="font-mono text-[10px] font-bold tabular-nums text-accent"
      title={`Sai automaticamente em ${remainingS}s`}
    >
      ▶ {remainingS}s
    </span>
  );
}

function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`font-body text-[10px] font-bold uppercase tracking-wider ${
        active ? "text-accent" : "text-white/30"
      }`}
    >
      {active ? "▶ no ar" : "off"}
    </span>
  );
}

function CategoryHeader({ label }: { label: string }) {
  return (
    <div className="font-body text-[10px] font-bold uppercase tracking-widest text-white/40">
      {label}
    </div>
  );
}

function CategoryEmpty({ msg }: { msg: string }) {
  return <p className="font-body text-[11px] text-white/30">{msg}</p>;
}

function ScheduleLTToggles({
  compact,
  setLowerThird,
}: {
  compact: boolean;
  setLowerThird: (lt: LowerThird) => void;
}) {
  const { schedule, lowerThird } = useOverlayConfig();

  if (schedule.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <CategoryHeader label="Cronograma" />
        <CategoryEmpty msg="Nenhum item no cronograma." />
      </div>
    );
  }

  const isActive = (id: string) =>
    lowerThird?.kind === "schedule" && lowerThird.scheduleId === id;

  const toggle = (id: string) => {
    setLowerThird(isActive(id) ? null : { kind: "schedule", scheduleId: id });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <CategoryHeader label="Cronograma" />
      {schedule.map((s) => {
        const active = isActive(s.id);
        return (
          <button
            key={s.id}
            onClick={() => toggle(s.id)}
            className={`flex items-center gap-3 rounded-lg text-left transition ${
              compact ? "px-2 py-1" : "px-2.5 py-1.5"
            } ${
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
              {!compact && s.details && (
                <span className="truncate font-body text-[10px] text-white/45">
                  {s.details}
                </span>
              )}
            </div>
            <ActiveBadge active={active} />
          </button>
        );
      })}
    </div>
  );
}

function GuestLTToggles({
  compact,
  setLowerThird,
}: {
  compact: boolean;
  setLowerThird: (lt: LowerThird) => void;
}) {
  const { guests, lowerThird } = useOverlayConfig();

  if (guests.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <CategoryHeader label="Lower-third de palestrantes" />
        <CategoryEmpty msg="Nenhum convidado cadastrado." />
      </div>
    );
  }

  const isActive = (id: string) =>
    lowerThird?.kind === "guest" && lowerThird.guestId === id;

  const toggle = (id: string) => {
    setLowerThird(isActive(id) ? null : { kind: "guest", guestId: id });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <CategoryHeader label="Lower-third de palestrantes" />
      {guests.map((g) => {
        const active = isActive(g.id);
        const avatarSize = compact ? "h-6 w-6" : "h-9 w-9";
        return (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`flex items-center gap-3 rounded-lg text-left transition ${
              compact ? "px-2 py-1" : "px-2.5 py-2"
            } ${
              active
                ? "bg-accent/25 ring-1 ring-accent/60"
                : "bg-white/5 hover:bg-white/10"
            }`}
            title={active ? "Tirar do ar" : `Mostrar ${g.name} na overlay`}
          >
            {/* avatar */}
            <div
              className={`flex shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-black/30 ${avatarSize}`}
            >
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
              {!compact && (
                <span className="truncate font-body text-[10px] text-white/45">
                  {g.talk || "—"}
                </span>
              )}
            </div>
            <ActiveBadge active={active} />
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────── HELPERS ────────────────────────── */
function PanelShell({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d071c] p-3">
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <h3 className="shrink-0 font-body text-xs font-bold uppercase tracking-widest text-white/65">
          {title}
        </h3>
        {actions ? (
          actions
        ) : (
          <button
            className="flex h-5 w-5 items-center justify-center rounded text-sm text-white/40 hover:bg-white/10 hover:text-white"
            title="Adicionar"
          >
            +
          </button>
        )}
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
