import { useEffect, useState } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { guestAvatarUrl } from "@/shared/types";
import type { Guest } from "@/shared/types";

interface GuestLowerThirdProps {
  bottom?: number;
  left?: number;
  accent?: string;
}

/**
 * Lower-third de speaker: lê `lowerThird` quando kind=="guest" e mostra um
 * cartão grande com avatar do GitHub, nome e título da palestra.
 */
export function GuestLowerThird({
  bottom = 80,
  left = 80,
  accent = "#ff2d20",
}: GuestLowerThirdProps) {
  const { lowerThird, guests } = useOverlayConfig();
  const guestId = lowerThird?.kind === "guest" ? lowerThird.guestId : null;
  const guest = guestId ? guests.find((g) => g.id === guestId) ?? null : null;

  const [shown, setShown] = useState<Guest | null>(guest);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (guest) {
      setShown(guest);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setShown(null), 350);
      return () => clearTimeout(t);
    }
  }, [guest?.id, guest?.name]);

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
          padding: "20px 32px 20px 24px",
          display: "flex",
          gap: 24,
          alignItems: "center",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
        }}
      >
        {/* avatar via github */}
        <div
          style={{
            width: 120, height: 120, flexShrink: 0,
            background: "#222",
            border: `3px solid ${accent}`,
            boxShadow: `4px 4px 0 rgba(0,0,0,0.55)`,
            transform: "rotate(-2deg)",
            overflow: "hidden",
          }}
        >
          <img
            src={guestAvatarUrl(shown.githubHandle)}
            alt={shown.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          {/* live tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              No ar
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700,
                color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              @{shown.githubHandle}
            </span>
          </div>

          {/* name */}
          <div
            style={{
              fontFamily: "'Sedgwick Ave Display', 'Russo One', sans-serif",
              fontSize: 56, lineHeight: 0.95, color: "#fdfdff",
              letterSpacing: "-0.02em", textTransform: "uppercase",
              textShadow: `0 4px 0 rgba(0,0,0,0.5), 0 0 30px ${accent}55`,
            }}
          >
            {shown.name}
          </div>

          {/* talk title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <div style={{ width: 4, height: 24, background: accent }} />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 20, color: "#fdfdff",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {shown.talk}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
