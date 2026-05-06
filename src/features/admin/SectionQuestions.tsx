import type { TweakConfig, Question } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
  updateMany: (patch: Partial<TweakConfig>) => void;
}

function nowHHMM() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// Cor consistente derivada do nome — só usada quando admin adiciona manual.
// Mensagens vindas do chat já trazem a cor original.
function colorFromName(name: string | undefined | null): string {
  const safe = name ?? "";
  let h = 0;
  for (let i = 0; i < safe.length; i++) {
    h = (h * 31 + safe.charCodeAt(i)) | 0;
  }
  const hue = Math.abs(h) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

export function SectionQuestions({ config, update, updateMany }: SectionProps) {
  const { questions, lowerThird } = config;

  const setItem = (idx: number, patch: Partial<Question>) => {
    update(
      "questions",
      questions.map((q, i) => {
        if (i !== idx) return q;
        const next = { ...q, ...patch };
        // Recolore quando o nome muda — só se a cor atual for derivada do nome anterior.
        if (patch.user !== undefined && q.color === colorFromName(q.user)) {
          next.color = colorFromName(patch.user);
        }
        return next;
      }),
    );
  };

  const addItem = () => {
    const id = `q-${Date.now().toString(36)}`;
    update("questions", [
      ...questions,
      { id, user: "", color: colorFromName(""), text: "" },
    ]);
  };

  const removeItem = (idx: number) => {
    const removed = questions[idx];
    update("questions", questions.filter((_, i) => i !== idx));
    if (removed && lowerThird?.kind === "question" && lowerThird.questionId === removed.id) {
      update("lowerThird", null);
    }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...questions];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target]!, next[idx]!];
    update("questions", next);
  };

  const trigger = (idx: number, item: Question) => {
    const askedAt = nowHHMM();
    const stamped = { ...item, askedAt };
    // Single POST: questions + lowerThird juntos pra evitar estado intermediário
    // visível no overlay (que faz polling 200ms).
    updateMany({
      questions: questions.map((q, i) => (i === idx ? stamped : q)),
      lowerThird: { kind: "question", questionId: item.id, triggeredAt: Date.now() },
    });
  };

  const isActive = (item: Question) =>
    lowerThird?.kind === "question" && lowerThird.questionId === item.id;

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          PERGUNTAS · {questions.length} na fila
        </legend>

        <p className="mb-3 font-body text-[11px] text-white/40">
          Clique no <span className="font-bold text-accent">+</span> ao lado de uma mensagem do chat
          (à direita) pra adicionar à fila com o avatar do usuário. Ou adicione manual abaixo.
          Some sozinha 30s depois de ser exibida.
        </p>

        <div className="flex flex-col gap-3">
          {questions.length === 0 && (
            <p className="text-xs text-white/40">Nenhuma pergunta cadastrada.</p>
          )}

          {questions.map((item, idx) => (
            <QuestionCard
              key={item.id}
              item={item}
              isActive={isActive(item)}
              isFirst={idx === 0}
              isLast={idx === questions.length - 1}
              onChange={(patch) => setItem(idx, patch)}
              onRemove={() => removeItem(idx)}
              onTrigger={() => trigger(idx, item)}
              onMoveUp={() => move(idx, -1)}
              onMoveDown={() => move(idx, 1)}
            />
          ))}

          <button
            type="button"
            onClick={addItem}
            className="rounded-lg border border-dashed border-white/15 px-3 py-2 font-body text-xs font-bold text-white/55 transition hover:border-accent hover:text-accent"
          >
            + adicionar manualmente
          </button>
        </div>
      </fieldset>
    </div>
  );
}

function QuestionCard({
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
  item: Question;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<Question>) => void;
  onRemove: () => void;
  onTrigger: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const user = item.user ?? "";
  const text = item.text ?? "";
  const initial = (user || "?")[0]!.toUpperCase();
  const canTrigger = user.trim().length > 0 && text.trim().length > 0;

  return (
    <div
      className={`rounded-lg border p-3 transition ${
        isActive ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/3"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* avatar (cor do chat) + reorder */}
        <div className="flex w-20 shrink-0 flex-col gap-2">
          <div
            className="flex aspect-square w-full items-center justify-center rounded text-lg font-bold uppercase text-white"
            style={{ background: item.color }}
            title={`@${user}`}
          >
            {initial}
          </div>
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
            label="Quem fez"
            value={user}
            onChange={(v) => onChange({ user: v })}
            placeholder="@nome"
          />

          <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/40">
            Pergunta
            <textarea
              rows={2}
              value={text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Digite a pergunta…"
              className="resize-none rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTrigger}
              disabled={isActive || !canTrigger}
              className={`rounded-md px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider transition ${
                isActive
                  ? "bg-accent/30 text-accent"
                  : "bg-accent/15 text-accent hover:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
              }`}
            >
              {isActive ? "▶ no ar" : "Destacar na overlay"}
            </button>
            {item.askedAt && (
              <span className="font-body text-[10px] text-white/40">
                disparada às {item.askedAt}
              </span>
            )}
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/40">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
      />
    </label>
  );
}
