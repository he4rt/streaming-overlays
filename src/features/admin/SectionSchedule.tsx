import type { TweakConfig, ScheduleItem } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionSchedule({ config, update }: SectionProps) {
  const { schedule, lowerThird } = config;

  const setItem = (idx: number, patch: Partial<ScheduleItem>) => {
    update("schedule", schedule.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const addItem = () => {
    const id = `item-${Date.now().toString(36)}`;
    update("schedule", [
      ...schedule,
      { id, time: "00h00", title: "Novo bloco", details: "" },
    ]);
  };

  const removeItem = (idx: number) => {
    const removed = schedule[idx];
    update("schedule", schedule.filter((_, i) => i !== idx));
    if (removed && lowerThird?.kind === "schedule" && lowerThird.scheduleId === removed.id) {
      update("lowerThird", null);
    }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...schedule];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target]!, next[idx]!];
    update("schedule", next);
  };

  const trigger = (item: ScheduleItem) => {
    update("lowerThird", { kind: "schedule", scheduleId: item.id });
  };

  const isActive = (item: ScheduleItem) =>
    lowerThird?.kind === "schedule" && lowerThird.scheduleId === item.id;

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          CRONOGRAMA · {schedule.length} blocos
        </legend>

        <div className="flex flex-col gap-3">
          {schedule.length === 0 && (
            <p className="text-xs text-white/40">Nenhum item no cronograma.</p>
          )}

          {schedule.map((item, idx) => (
            <ScheduleCard
              key={item.id}
              item={item}
              isActive={isActive(item)}
              isFirst={idx === 0}
              isLast={idx === schedule.length - 1}
              onChange={(patch) => setItem(idx, patch)}
              onRemove={() => removeItem(idx)}
              onTrigger={() => trigger(item)}
              onMoveUp={() => move(idx, -1)}
              onMoveDown={() => move(idx, 1)}
            />
          ))}

          <button
            type="button"
            onClick={addItem}
            className="rounded-lg border border-dashed border-white/15 px-3 py-2 font-body text-xs font-bold text-white/55 transition hover:border-accent hover:text-accent"
          >
            + adicionar bloco
          </button>
        </div>
      </fieldset>
    </div>
  );
}

function ScheduleCard({
  item,
  isActive,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onTrigger,
  onMoveUp,
  onMoveDown,
}: {
  item: ScheduleItem;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<ScheduleItem>) => void;
  onRemove: () => void;
  onTrigger: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div
      className={`rounded-lg border p-3 transition ${
        isActive ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/3"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* time + reorder */}
        <div className="flex w-20 shrink-0 flex-col gap-1">
          <Input
            label="Horário"
            value={item.time}
            onChange={(v) => onChange({ time: v })}
          />
          <div className="flex gap-1">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={isFirst}
              className="flex-1 rounded bg-white/5 py-0.5 font-body text-[10px] text-white/55 transition hover:bg-white/10 disabled:opacity-30"
              title="Mover pra cima"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={isLast}
              className="flex-1 rounded bg-white/5 py-0.5 font-body text-[10px] text-white/55 transition hover:bg-white/10 disabled:opacity-30"
              title="Mover pra baixo"
            >
              ↓
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Input
            label="Atividade"
            value={item.title}
            onChange={(v) => onChange({ title: v })}
          />
          <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/40">
            Detalhes
            <textarea
              rows={2}
              value={item.details}
              onChange={(e) => onChange({ details: e.target.value })}
              className="rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTrigger}
              disabled={isActive}
              className={`rounded-md px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider transition ${
                isActive
                  ? "bg-accent/30 text-accent"
                  : "bg-accent/15 text-accent hover:bg-accent/25"
              }`}
            >
              {isActive ? "▶ no ar" : "Destacar na overlay"}
            </button>
            <span className="font-body text-[10px] text-white/30">id: {item.id}</span>
            <button
              type="button"
              onClick={onRemove}
              className="ml-auto rounded-md border border-red-500/20 px-2 py-1 font-body text-[10px] font-bold text-red-400 transition hover:bg-red-500/10"
            >
              remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/40">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
      />
    </label>
  );
}
