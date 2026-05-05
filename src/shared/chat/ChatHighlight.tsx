import { useEffect, useState } from "react";
import type { ChatMessage } from "@/shared/types";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";

interface ChatHighlightProps {
  /** Posição vertical em px desde o topo da Stage 1920×1080 */
  bottom?: number;
  /** Margem esquerda */
  left?: number;
  /** Largura máxima do card */
  maxWidth?: number;
  /** Cor de destaque (default red Laravel) */
  accent?: string;
}

/**
 * Lower-third de chat: lê config.chatHighlight (mensagem a destacar) e
 * renderiza um card grande em baixo à esquerda. Some quando highlight=null.
 * Anima entrada (slide + fade) com animação de saída ao limpar.
 */
export function ChatHighlight({
  bottom = 80,
  left = 80,
  maxWidth = 900,
  accent = "#ff2d20",
}: ChatHighlightProps) {
  const { lowerThird } = useOverlayConfig();
  const message = lowerThird?.kind === "chat" ? lowerThird.message : null;
  const [shown, setShown] = useState<ChatMessage | null>(message);
  const [visible, setVisible] = useState(false);

  // entra/sai com transição: quando muda, mostra novo; quando some, fade out
  useEffect(() => {
    if (message) {
      setShown(message);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setShown(null), 350);
      return () => clearTimeout(t);
    }
  }, [message?.key, message?.user, message?.msg]);

  if (!shown) return null;

  return (
    <div
      style={{
        position: "absolute",
        left, bottom,
        maxWidth,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(12,12,15,0.92)",
          backdropFilter: "blur(8px)",
          border: `1px solid rgba(255,255,255,0.08)`,
          borderLeft: `6px solid ${accent}`,
          padding: "20px 28px",
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
        }}
      >
        {/* avatar stamp */}
        <div
          style={{
            width: 64, height: 64, flexShrink: 0,
            background: shown.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 42, color: "#fff",
            textTransform: "uppercase",
            boxShadow: `3px 3px 0 rgba(0,0,0,0.5)`,
            transform: "rotate(-2deg)",
          }}
        >
          {shown.user[0]}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* live tag + username */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: accent, color: "#fff",
                padding: "3px 10px", borderRadius: 3,
                fontFamily: "Inter, sans-serif", fontWeight: 800,
                fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#fff",
                  animation: "pulse 1.4s ease-in-out infinite",
                }}
              />
              Destaque
            </span>
            {shown.badges?.slice(0, 3).map((b, i) => (
              <img
                key={i}
                src={b.imageUrl}
                alt={b.title}
                style={{ width: 22, height: 22, borderRadius: 2, display: "block" }}
              />
            ))}
            <span
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 800,
                color: accent, letterSpacing: "0.04em", textTransform: "uppercase",
              }}
            >
              {shown.user}
            </span>
          </div>

          {/* message */}
          <div
            style={{
              fontFamily: "Inter, sans-serif", fontSize: 26,
              color: "#fdfdff", lineHeight: 1.35,
              fontWeight: 600,
              wordBreak: "break-word",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {shown.parts && shown.parts.length > 0
              ? shown.parts.map((p, i) =>
                  p.type === "emote" ? (
                    <img
                      key={i}
                      src={p.url}
                      alt={p.alt}
                      style={{
                        height: "1.4em", width: "auto",
                        verticalAlign: "middle", margin: "0 3px",
                        display: "inline-block",
                      }}
                    />
                  ) : (
                    <span key={i}>{p.value}</span>
                  ),
                )
              : shown.msg}
          </div>
        </div>
      </div>
    </div>
  );
}
