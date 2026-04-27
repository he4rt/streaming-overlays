import { useState, useEffect } from "react";
import { TweakConfig } from "../types";

interface PartnersPanelProps {
  config: TweakConfig;
  width?: number | string;
}

const SLIDE_INTERVAL_MS = 4000;

const PartnersPanel = ({ config, width = 420 }: PartnersPanelProps) => {
  const { bgPanel, panelOpacity } = config;
  const partners = config.partners ?? [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (partners.length <= 1) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % partners.length);
        setVisible(true);
      }, 400);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [partners.length]);

  // Reset index when partners list shrinks
  useEffect(() => {
    if (activeIndex >= partners.length && partners.length > 0) {
      setActiveIndex(0);
    }
  }, [partners.length, activeIndex]);

  if (partners.length === 0) return null;

  const partner = partners[activeIndex];

  const bgAlpha = Math.floor(panelOpacity * 255)
    .toString(16)
    .padStart(2, "0");

  return (
    <div
      style={{
        position: "absolute",
        right: 30,
        bottom: 50,
        width: width,
        height: 230,
        background: `linear-gradient(180deg, ${bgPanel}E6 0%, ${bgPanel}${bgAlpha} 100%)`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid rgba(168,85,247,0.35)`,
        borderRadius: 20,
        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.15) inset, 0 0 60px rgba(124,58,237,0.15)`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(168,85,247,0.7)",
          fontFamily: "var(--font-body, Inter, sans-serif)",
        }}
      >
        Parceiros
      </span>

      {/* Logo + name */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          style={{
            width: 160,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            key={partner?.logoUrl}
            src={partner?.logoUrl}
            alt={partner?.name}
            style={{
              userSelect: "none",
              pointerEvents: "none",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              marginBottom: 5,
              filter: partner?.monochrome
                ? "brightness(0) invert(1)"
                : undefined,
            }}
          />
        </div>
      </div>

      {/* Dots */}
      {partners.length > 1 && (
        <div style={{ display: "flex", gap: 5 }}>
          {partners.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? 16 : 5,
                height: 5,
                borderRadius: 999,
                background:
                  i === activeIndex
                    ? "rgba(168,85,247,0.9)"
                    : "rgba(255,255,255,0.2)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersPanel;
