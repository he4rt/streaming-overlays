import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/shared/types";
import { useChatMessages } from "@/hooks/ChatProvider";

interface LaravelChatProps {
  width?: number;
  top?: number;
  maxMessages?: number;
  accent?: string;
  title?: string;
  subtitle?: string;
  livePillLabel?: string;
  footerLeft?: string;
  footerRight?: string;
}

export function LaravelChat({
  width = 472,
  top = 0,
  maxMessages = 12,
  accent = "#ff2d20",
  title = "CHAT",
  subtitle = "Manda um oi aí",
  livePillLabel = "AO VIVO",
  footerLeft = "#LARAVELDAYSP",
  footerRight = "twitch.tv/he4rt",
}: LaravelChatProps) {
  const messages = useChatMessages();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const visibleMessages = messages.slice(-maxMessages);

  return (
    <div style={{
      position: "absolute", right: 0, top, bottom: 0,
      width,
      background: `linear-gradient(180deg, #0c0c0f 0%, #131317 100%)`,
      borderLeft: `1px solid rgba(255,255,255,0.06)`,
      display: "flex", flexDirection: "column",
      boxShadow: `inset 1px 0 0 ${accent}14, -20px 0 60px rgba(0,0,0,0.6)`,
    }}>
      {/* graffiti accent stroke */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 140, height: 90,
        pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -6, left: -30,
          width: 180, height: 8, background: accent,
          transform: "rotate(-18deg)", transformOrigin: "left center",
          boxShadow: `0 0 20px ${accent}99`,
        }} />
        <div style={{
          position: "absolute", top: 22, left: -20,
          width: 110, height: 3, background: accent, opacity: 0.6,
          transform: "rotate(-18deg)", transformOrigin: "left center",
        }} />
      </div>

      {/* header */}
      <div style={{ padding: "44px 32px 20px", position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: accent, color: "#fff",
          padding: "5px 12px", borderRadius: 4,
          fontFamily: "Inter, sans-serif", fontWeight: 800,
          fontSize: 11, letterSpacing: "0.18em",
          marginBottom: 14,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#fff",
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          {livePillLabel}
        </div>

        <div style={{
          fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
          fontSize: 72, color: "#fdfdff", lineHeight: 0.9,
          letterSpacing: "-0.02em",
          textShadow: `0 4px 0 rgba(0,0,0,0.5), 0 0 30px ${accent}33`,
        }}>
          {title}
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 3, height: 18, background: accent }} />
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13, color: "rgba(255,255,255,0.6)",
            fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}>
            {subtitle}
          </div>
        </div>
      </div>

      {/* divider */}
      <div style={{
        margin: "0 32px",
        height: 2,
        backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 14px, transparent 14px 22px)`,
        opacity: 0.7,
      }} />

      {/* messages */}
      <div ref={listRef} style={{
        flex: 1, overflow: "hidden",
        padding: "20px 24px 28px",
        display: "flex", flexDirection: "column", gap: 12,
        maskImage: "linear-gradient(180deg, transparent 0%, black 5%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 5%, black 92%, transparent 100%)",
      }}>
        {visibleMessages.map((m, i) => (
          <LaravelChatRow
            key={(m.key ?? 0) + "-" + i}
            msg={m}
            accent={accent}
            entering={i === visibleMessages.length - 1}
          />
        ))}
      </div>

      {/* footer */}
      <div style={{
        padding: "14px 32px 20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 800,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.4)",
      }}>
        <span>{footerLeft}</span>
        <span style={{ color: accent }}>{footerRight}</span>
      </div>
    </div>
  );
}

function LaravelChatRow({
  msg,
  accent,
  entering,
}: {
  msg: ChatMessage;
  accent: string;
  entering?: boolean;
}) {
  return (
    <div style={{
      position: "relative",
      display: "flex", gap: 12, alignItems: "flex-start",
      padding: "10px 12px 10px 14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderLeft: `3px solid ${accent}`,
      borderRadius: 4,
      animation: entering ? "slideIn 0.4s ease-out" : "none",
    }}>
      <div style={{
        width: 40, height: 40, flexShrink: 0,
        background: msg.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
        fontSize: 26, color: "#fff",
        textTransform: "uppercase",
        boxShadow: `2px 2px 0 rgba(0,0,0,0.5)`,
        transform: "rotate(-2deg)",
      }}>
        {msg.user[0]}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {msg.badges?.map((b, i) => (
            <img
              key={i}
              src={b.imageUrl}
              alt={b.title}
              title={b.title}
              style={{ width: 20, height: 20, borderRadius: 2, display: "block" }}
            />
          ))}
          {msg.badge && (
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 900,
              color: "#fff",
              background: msg.badge === "mod" ? "#22c55e" : accent,
              padding: "2px 6px",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>{msg.badge}</span>
          )}
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 800,
            color: accent, letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>{msg.user}</span>
        </div>
        <div style={{
          marginTop: 4,
          fontFamily: "Inter, sans-serif", fontSize: 17,
          color: "rgba(255,255,255,0.92)", lineHeight: 1.4,
          wordBreak: "break-word",
        }}>
          {msg.parts && msg.parts.length > 0
            ? msg.parts.map((p, i) =>
                p.type === "emote" ? (
                  <img
                    key={i}
                    src={p.url}
                    alt={p.alt}
                    title={p.alt}
                    style={{
                      height: "1.6em", width: "auto",
                      verticalAlign: "middle", margin: "0 2px",
                      display: "inline-block",
                    }}
                  />
                ) : (
                  <span key={i}>{p.value}</span>
                )
              )
            : msg.msg}
        </div>
      </div>
    </div>
  );
}
