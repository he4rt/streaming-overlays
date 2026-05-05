import type { ChatMessage, TweakConfig } from "@/shared/types";
import { useCountdown } from "@/hooks/useCountdown";
import { useChatMessages } from "@/hooks/ChatProvider";
import { useEffect, useRef } from "react";

interface StartingV5Props {
  config: TweakConfig;
}

const RED = "#ff2d20";
const SIDEBAR_WIDTH = 472;
const TAGS = ["Laravel", "3Pontos", "PHPSP", "He4rt Devs", "FIAP + Alura"];

function CalendarIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ChatsIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 11a6 6 0 1 1 4.5 5.81L7 18l1-3.5A6 6 0 0 1 8 11z" />
      <path d="M15 8.5a4.5 4.5 0 0 1 4 6.74L20 19l-3.5-.9A4.5 4.5 0 0 1 12 16" />
    </svg>
  );
}

export function StartingV5({ config }: StartingV5Props) {
  const {
    episodeTitle,
    topic,
    date,
    time,
    startingSubtitle,
    startingCountdownSeconds,
  } = config;

  const { mm, ss } = useCountdown(startingCountdownSeconds);
  const messages = useChatMessages();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const visibleMessages = messages.slice(-12);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* urban photo background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/laravel-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />

      {/* dark scrim for text legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 30% 55%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%),
          linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)
        `,
      }} />

      {/* HERO */}
      <div style={{
        position: "absolute",
        left: 199, top: 246,
        width: 1051,
        display: "flex", flexDirection: "column", gap: 112,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          {/* live pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: RED, color: "#fff",
            padding: "8px 16px", borderRadius: 4,
            fontFamily: "Inter, sans-serif", fontWeight: 800,
            fontSize: 16, letterSpacing: "0.04em",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#fff",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            A LIVE JÁ VAI COMEÇAR
          </div>

          {/* graffiti title */}
          <div style={{
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 150, lineHeight: 0.95, color: RED,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            textShadow: `0 6px 0 rgba(0,0,0,0.55), 0 0 50px ${RED}55`,
            whiteSpace: "nowrap",
          }}>
            {episodeTitle}
          </div>

          {/* subtitle with red bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 4, height: 30, background: RED }} />
            <div style={{
              fontFamily: "'Cal Sans', 'Inter', sans-serif",
              fontSize: 22, color: "#fdfdff",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}>
              {topic}
            </div>
          </div>
        </div>

        {/* countdown + meta row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-end" }}>
          <div style={{
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 150, lineHeight: 1,
            background: "linear-gradient(180deg, #fdfdff 0%, #ddddde 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", color: "transparent",
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            filter: "drop-shadow(0 6px 0 rgba(0,0,0,0.4))",
            whiteSpace: "nowrap",
          }}>
            {mm}:{ss}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MetaItem icon={<CalendarIcon />} label={date} />
            <Divider />
            <MetaItem icon={<ClockIcon />} label={time} />
            <Divider />
            <MetaItem icon={<ChatsIcon />} label={startingSubtitle.replace(/[☕☀️🔥]/g, "").trim().toUpperCase() || "SENTA QUE O PAPO VAI LONGE"} />
          </div>
        </div>
      </div>

      {/* footer tags */}
      <div style={{
        position: "absolute", left: 199, bottom: 64,
        display: "flex", alignItems: "center", gap: 14,
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
        color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}>
        {TAGS.map((t, i) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: RED }} />}
            <span>{t}</span>
          </span>
        ))}
      </div>

      {/* CHAT SIDEBAR */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: SIDEBAR_WIDTH,
        background: `linear-gradient(180deg, #0c0c0f 0%, #131317 100%)`,
        borderLeft: `1px solid rgba(255,255,255,0.06)`,
        display: "flex", flexDirection: "column",
        boxShadow: "inset 1px 0 0 rgba(255,45,32,0.08), -20px 0 60px rgba(0,0,0,0.6)",
      }}>
        {/* graffiti accent stroke (top-left of sidebar) */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: 140, height: 90,
          pointerEvents: "none", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -6, left: -30,
            width: 180, height: 8, background: RED,
            transform: "rotate(-18deg)", transformOrigin: "left center",
            boxShadow: `0 0 20px ${RED}99`,
          }} />
          <div style={{
            position: "absolute", top: 22, left: -20,
            width: 110, height: 3, background: RED, opacity: 0.6,
            transform: "rotate(-18deg)", transformOrigin: "left center",
          }} />
        </div>

        {/* header */}
        <div style={{ padding: "44px 32px 20px", position: "relative" }}>
          {/* AO VIVO pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: RED, color: "#fff",
            padding: "5px 12px", borderRadius: 4,
            fontFamily: "Inter, sans-serif", fontWeight: 800,
            fontSize: 11, letterSpacing: "0.18em",
            marginBottom: 14,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#fff",
              animation: "pulse 1.4s ease-in-out infinite",
            }} />
            AO VIVO
          </div>

          <div style={{
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 72, color: "#fdfdff", lineHeight: 0.9,
            letterSpacing: "-0.02em",
            textShadow: `0 4px 0 rgba(0,0,0,0.5), 0 0 30px ${RED}33`,
          }}>
            CHAT
          </div>
          <div style={{
            marginTop: 10, display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 3, height: 18, background: RED }} />
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.6)",
              fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}>
              Manda um oi aí
            </div>
          </div>
        </div>

        {/* divider with graffiti dashes */}
        <div style={{
          margin: "0 32px",
          height: 2,
          backgroundImage: `repeating-linear-gradient(90deg, ${RED} 0 14px, transparent 14px 22px)`,
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
            <UrbanChatRow
              key={(m.key ?? 0) + "-" + i}
              msg={m}
              entering={i === visibleMessages.length - 1}
            />
          ))}
        </div>

        {/* footer hashtag */}
        <div style={{
          padding: "14px 32px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 800,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}>
          <span>#LARAVELDAYSP</span>
          <span style={{ color: RED }}>twitch.tv/he4rt</span>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {icon}
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 800,
        color: "#fdfdff", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 2, height: 26, background: RED }} />;
}

function UrbanChatRow({ msg, entering }: { msg: ChatMessage; entering?: boolean }) {
  return (
    <div style={{
      position: "relative",
      display: "flex", gap: 12, alignItems: "flex-start",
      padding: "10px 12px 10px 14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderLeft: `3px solid ${RED}`,
      borderRadius: 4,
      animation: entering ? "slideIn 0.4s ease-out" : "none",
    }}>
      {/* square stamp avatar */}
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
              background: msg.badge === "mod" ? "#22c55e" : RED,
              padding: "2px 6px",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>{msg.badge}</span>
          )}
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 800,
            color: RED, letterSpacing: "0.06em",
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
