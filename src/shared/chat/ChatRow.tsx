import type { ChatMessage } from "@/shared/types";

interface ChatRowProps {
  msg: ChatMessage;
  accent: string;
  primary: string;
  entering?: boolean;
}

export function ChatRow({ msg, primary, entering }: ChatRowProps) {
  return (
    <div className="flex items-start gap-[11px]" style={{ animation: entering ? "slideIn 0.4s ease-out" : "none" }}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-body text-[13px] font-bold uppercase text-white"
        style={{ background: `linear-gradient(135deg, ${msg.color}, ${msg.color}99)`, boxShadow: `0 2px 8px ${msg.color}55` }}>
        {msg.user[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {msg.badge && (
            <span className="rounded px-1.5 py-0.5 font-body text-[9px] font-extrabold uppercase tracking-[0.1em] text-white"
              style={{ background: msg.badge === "mod" ? "#22C55E" : primary }}>
              {msg.badge}
            </span>
          )}
          <span className="font-body text-[13.5px] font-bold" style={{ color: msg.color }}>{msg.user}</span>
        </div>
        <div className="mt-0.5 break-words font-body text-sm leading-[1.4] text-white/[0.92]">{msg.msg}</div>
      </div>
    </div>
  );
}
