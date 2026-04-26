import { useState, useEffect } from "react";
import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { HeartMark } from "@/shared/components/HeartMark";
import { BigChatFeed } from "@/shared/chat/BigChatFeed";

export function BrbScene() {
  const t = useOverlayConfig();
  const { primary, accent, bgDeep, bgPanel, brbTrack } = t;

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  // SVG timer circle
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const maxSeconds = 300;
  const progress = Math.min(elapsed / maxSeconds, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden flex" style={{ background: bgDeep }}>
        {/* PAUSA badge — top right */}
        <div
          className="absolute right-10 top-10 z-10 flex items-center gap-2 rounded-full px-5 py-2"
          style={{ background: accent, boxShadow: `0 4px 20px ${accent}55` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="font-heading text-xs tracking-[0.2em] text-white">PAUSA</span>
        </div>

        {/* LEFT — 60% */}
        <div className="relative flex flex-col items-center justify-center" style={{ width: "60%", flexShrink: 0 }}>
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: 800,
              height: 800,
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${primary}1A 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />

          {/* HeartMark + label */}
          <div className="relative flex flex-col items-center gap-3" style={{ animation: "floatY 4s ease-in-out infinite" }}>
            <HeartMark size={72} color={accent} />
            <span
              className="font-heading tracking-[0.3em] text-white/60"
              style={{ fontSize: 13, letterSpacing: "0.3em" }}
            >
              HE4RT TALKS
            </span>
          </div>

          {/* Main text */}
          <div className="relative mt-8 flex flex-col items-center gap-2 text-center">
            <div
              className="leading-none"
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: 200,
                lineHeight: 0.9,
              }}
            >
              <span
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${primary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                JÁ
              </span>
              <br />
              <span className="text-white">VOLTAMOS!</span>
            </div>
          </div>

          {/* Coffee message */}
          <p className="relative mt-6 font-body text-white/50" style={{ fontSize: 18 }}>
            Buscando um café ☕ — já já a gente volta
          </p>

          {/* Timer pill with circular SVG */}
          <div
            className="relative mt-8 flex items-center gap-5 rounded-full px-8 py-4"
            style={{
              background: `${bgPanel}CC`,
              border: `1px solid ${accent}33`,
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Circular SVG progress */}
            <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={`${accent}22`}
                  strokeWidth="3"
                />
                {/* Progress */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={accent}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span
                  className="font-heading text-white leading-none"
                  style={{ fontFamily: "'Russo One', sans-serif", fontSize: 22 }}
                >
                  {mm}:{ss}
                </span>
                <span className="font-body text-white/40 text-xs mt-0.5">pausa</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-body text-xs text-white/40 tracking-[0.12em] uppercase">
                Tocando agora
              </span>
              <span className="font-body text-sm text-white/80">{brbTrack}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — 40% chat area */}
        <div
          className="relative flex flex-col"
          style={{
            width: "40%",
            background: `${bgPanel}88`,
            borderLeft: `1px solid ${accent}1A`,
          }}
        >
          {/* Chat header */}
          <div
            className="flex shrink-0 flex-col gap-2 px-8 pt-8 pb-4"
            style={{ borderBottom: `1px solid ${accent}1A` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1"
                style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#22C55E", animation: "pulse 1.4s ease-in-out infinite" }}
                />
                <span className="font-body text-xs text-white/70">Chat ativo</span>
              </div>
            </div>
            <h2
              className="font-heading text-white"
              style={{ fontFamily: "'Russo One', sans-serif", fontSize: 26 }}
            >
              Continue na conversa
            </h2>
          </div>

          {/* Chat feed */}
          <div className="relative flex-1 overflow-hidden">
            <BigChatFeed config={t} />
          </div>
        </div>
      </div>
    </Stage>
  );
}
