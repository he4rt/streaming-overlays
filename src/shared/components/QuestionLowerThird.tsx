import { useEffect, useState } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import type { Question } from "@/shared/types";

interface QuestionLowerThirdProps {
  bottom?: number;
  left?: number;
  accent?: string;
}

/**
 * Lower-third de pergunta da audiência: lê `lowerThird` quando kind=="question"
 * e mostra um cartão com avatar (inicial sobre cor do chat), nome do autor,
 * hora e a pergunta.
 */
export function QuestionLowerThird({
  bottom = 80,
  left = 80,
  accent = "#ff2d20",
}: QuestionLowerThirdProps) {
  const { lowerThird, questions } = useOverlayConfig();
  const id = lowerThird?.kind === "question" ? lowerThird.questionId : null;
  const triggeredAt = lowerThird?.kind === "question" ? lowerThird.triggeredAt : null;
  const item = id ? questions.find((q) => q.id === id) ?? null : null;

  const [shown, setShown] = useState<Question | null>(item);
  const [visible, setVisible] = useState(false);

  // Re-anima se a mesma pergunta for re-disparada (triggeredAt muda).
  useEffect(() => {
    if (item) {
      setShown(item);
      setVisible(false);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setShown(null), 350);
      return () => clearTimeout(t);
    }
  }, [item?.id, triggeredAt]);

  if (!shown) return null;

  const initial = (shown.user || "?")[0]!.toUpperCase();

  return (
    <div
      style={{
        position: "absolute",
        left,
        bottom,
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
          padding: "20px 32px 20px 24px",
          display: "flex",
          gap: 24,
          alignItems: "center",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
          maxWidth: 1100,
        }}
      >
        {/* avatar — inicial sobre cor do chat */}
        <div
          style={{
            width: 120,
            height: 120,
            flexShrink: 0,
            background: shown.color,
            border: `3px solid ${accent}`,
            boxShadow: `4px 4px 0 rgba(0,0,0,0.55)`,
            transform: "rotate(-2deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
            fontSize: 64,
            color: "#fdfdff",
            textTransform: "uppercase",
            textShadow: "0 2px 0 rgba(0,0,0,0.45)",
          }}
        >
          {initial}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          {/* tag row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: accent,
                color: "#fff",
                padding: "3px 10px",
                borderRadius: 3,
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#fff",
                  animation: "pulse 1.4s ease-in-out infinite",
                }}
              />
              Pergunta
            </span>
            {shown.badges?.slice(0, 3).map((b, i) => (
              <img
                key={i}
                src={b.imageUrl}
                alt={b.title}
                style={{ width: 18, height: 18, borderRadius: 3 }}
              />
            ))}
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 800,
                color: shown.color,
                letterSpacing: "0.06em",
              }}
            >
              {shown.user}
            </span>
            {shown.askedAt && (
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.18em",
                }}
              >
                · {shown.askedAt}
              </span>
            )}
          </div>

          {/* the question */}
          <div
            style={{
              fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
              fontSize: 34,
              lineHeight: 1.1,
              color: "#fdfdff",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              textShadow: `0 3px 0 rgba(0,0,0,0.5)`,
              maxWidth: 880,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {shown.text}
          </div>
        </div>
      </div>
    </div>
  );
}
