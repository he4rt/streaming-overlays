import { useEffect, useRef } from "react";
import type { ChatMessage, LowerThird, Question } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface AdminChatRailProps {
  lowerThird: LowerThird;
  setLowerThird: (lt: LowerThird) => void;
  questions: Question[];
  setQuestions: (qs: Question[]) => void;
}

export function AdminChatRail({
  lowerThird,
  setLowerThird,
  questions,
  setQuestions,
}: AdminChatRailProps) {
  const messages = useChatMessages();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const activeChat = lowerThird?.kind === "chat" ? lowerThird.message : null;

  const isHighlighted = (m: ChatMessage) =>
    !!activeChat && activeChat.key !== undefined && activeChat.key === m.key;

  const handleClick = (m: ChatMessage, idx: number) => {
    if (isHighlighted(m)) {
      setLowerThird(null);
      return;
    }
    const withKey: ChatMessage = m.key !== undefined ? m : { ...m, key: Date.now() + idx };
    setLowerThird({ kind: "chat", message: withKey });
  };

  const isQueued = (m: ChatMessage) =>
    !!m.key && questions.some((q) => q.id === `chat-${m.key}`);

  const addToQuestions = (m: ChatMessage, idx: number) => {
    const key = m.key ?? Date.now() + idx;
    const id = `chat-${key}`;
    if (questions.some((q) => q.id === id)) return; // já tá na fila
    const q: Question = {
      id,
      user: m.user,
      color: m.color,
      text: m.msg,
      badges: m.badges,
    };
    setQuestions([...questions, q]);
  };

  // banner da LT atual: pode ser chat ou guest, mostramos label correto
  const currentLabel =
    lowerThird?.kind === "chat"
      ? `Chat · ${lowerThird.message.user}`
      : lowerThird?.kind === "guest"
        ? `Guest · ${lowerThird.guestId}`
        : null;

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-white/10 bg-[#0d071c]">
      {/* header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="font-body text-xs font-bold uppercase tracking-widest text-white/70">
            Chat ao vivo
          </span>
        </div>
        <span className="font-body text-[10px] text-white/30">{messages.length}</span>
      </div>

      {/* lower-third banner */}
      {currentLabel ? (
        <div className="flex shrink-0 items-start gap-2 border-b border-white/10 bg-accent/10 px-3 py-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">
              ▶ no ar
            </span>
            <span className="truncate font-body text-xs font-bold text-white">
              {currentLabel}
            </span>
            {lowerThird?.kind === "chat" && (
              <span className="line-clamp-2 font-body text-[11px] text-white/70">
                {lowerThird.message.msg}
              </span>
            )}
          </div>
          <button
            onClick={() => setLowerThird(null)}
            className="rounded px-2 py-0.5 font-body text-[10px] font-bold text-red-400 transition hover:bg-red-500/20"
          >
            Limpar
          </button>
        </div>
      ) : (
        <div className="border-b border-white/10 px-3 py-2 font-body text-[10px] text-white/30">
          Clique numa mensagem pra colocar como destaque na overlay.
        </div>
      )}

      {/* messages */}
      <div ref={listRef} className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-3">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center font-body text-xs text-white/30">
            Sem mensagens ainda
          </div>
        )}
        {messages.map((m, i) => {
          const active = isHighlighted(m);
          const queued = isQueued(m);
          return (
            <div
              key={(m.key ?? 0) + "-" + i}
              role="button"
              tabIndex={0}
              onClick={() => handleClick(m, i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(m, i);
                }
              }}
              className={`group relative flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-left transition ${
                active
                  ? "bg-accent/20 ring-1 ring-accent/40"
                  : "hover:bg-white/5"
              }`}
              title={active ? "Clique pra remover destaque" : "Clique pra destacar essa mensagem na overlay"}
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
                style={{ background: m.color }}
              >
                {m.user[0]!.toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {m.badges?.slice(0, 2).map((b, j) => (
                    <img
                      key={j}
                      src={b.imageUrl}
                      alt={b.title}
                      className="h-3 w-3 rounded-sm"
                    />
                  ))}
                  <span className="font-body text-[11px] font-bold" style={{ color: m.color }}>
                    {m.user}
                  </span>
                  {m.badge && (
                    <span className="rounded bg-accent/30 px-1 py-px font-body text-[8px] font-bold uppercase text-accent">
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="break-words font-body text-[11px] leading-snug text-white/75">
                  {m.msg}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                {active && (
                  <span className="text-xs leading-none text-accent" aria-label="No ar">
                    ▶
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToQuestions(m, i);
                  }}
                  disabled={queued}
                  title={
                    queued
                      ? "Já está na fila de perguntas"
                      : "Adicionar à fila de perguntas"
                  }
                  aria-label={
                    queued ? "Pergunta já na fila" : "Adicionar à fila de perguntas"
                  }
                  className={`flex h-5 w-5 items-center justify-center rounded font-body text-xs font-bold transition focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-accent/60 ${
                    queued
                      ? "bg-accent/30 text-accent cursor-default opacity-100"
                      : "bg-white/10 text-white/50 opacity-40 hover:bg-accent/30 hover:text-accent hover:opacity-100 group-hover:opacity-100"
                  }`}
                >
                  {queued ? "✓" : "+"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
