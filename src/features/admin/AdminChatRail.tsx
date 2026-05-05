import { useEffect, useRef } from "react";
import type { ChatMessage, LowerThird } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface AdminChatRailProps {
  lowerThird: LowerThird;
  setLowerThird: (lt: LowerThird) => void;
}

export function AdminChatRail({ lowerThird, setLowerThird }: AdminChatRailProps) {
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
          return (
            <button
              key={(m.key ?? 0) + "-" + i}
              onClick={() => handleClick(m, i)}
              className={`flex items-start gap-2 rounded-md px-2 py-1.5 text-left transition ${
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
              {active && <span className="text-xs text-accent">▶</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
