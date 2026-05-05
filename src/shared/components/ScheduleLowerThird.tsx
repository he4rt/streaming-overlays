import { useEffect, useState } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import type { ScheduleItem } from "@/shared/types";

interface ScheduleLowerThirdProps {
  bottom?: number;
  left?: number;
  accent?: string;
}

export function ScheduleLowerThird({
  bottom = 80,
  left = 80,
  accent = "#ff2d20",
}: ScheduleLowerThirdProps) {
  const { lowerThird, schedule } = useOverlayConfig();
  const id = lowerThird?.kind === "schedule" ? lowerThird.scheduleId : null;
  const item = id ? schedule.find((s) => s.id === id) ?? null : null;

  const [shown, setShown] = useState<ScheduleItem | null>(item);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (item) {
      setShown(item);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setShown(null), 350);
      return () => clearTimeout(t);
    }
  }, [item?.id, item?.title]);

  if (!shown) return null;

  return (
    <div
      style={{
        position: "absolute",
        left, bottom,
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
          padding: "20px 32px",
          display: "flex",
          gap: 28,
          alignItems: "center",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
          maxWidth: 1100,
        }}
      >
        {/* time block */}
        <div
          style={{
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            paddingRight: 28,
            borderRight: `2px solid ${accent}55`,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 800,
              color: accent, letterSpacing: "0.22em", textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Agora
          </div>
          <div
            style={{
              fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
              fontSize: 64, lineHeight: 0.95, color: "#fdfdff",
              letterSpacing: "-0.02em",
              textShadow: `0 4px 0 rgba(0,0,0,0.5), 0 0 30px ${accent}55`,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {shown.time}
          </div>
        </div>

        {/* title + details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
              fontSize: 38, lineHeight: 1, color: "#fdfdff",
              letterSpacing: "-0.01em", textTransform: "uppercase",
              textShadow: `0 3px 0 rgba(0,0,0,0.5)`,
            }}
          >
            {shown.title}
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 17, color: "rgba(253,253,255,0.85)",
              fontWeight: 500, lineHeight: 1.4,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {shown.details}
          </div>
        </div>
      </div>
    </div>
  );
}
