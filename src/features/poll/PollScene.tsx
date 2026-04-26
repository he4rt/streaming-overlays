import { useState, useEffect } from "react";
import { Stage } from "@/features/stage/Stage";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { PollIcon } from "./PollIcon";

export function PollScene() {
  const t = DEFAULTS;
  const {
    primary,
    accent,
    bgDeep,
    bgPanel,
    pollQuestion,
    pollTotalVotes,
    pollTimeLeft,
  } = t;

  const opts = t.pollOptions ?? [
    { label: "Rust 🦀", votes: 712, color: "#F97316" },
    { label: "Go 🐹", votes: 524, color: "#22D3EE" },
    { label: "TypeScript", votes: 481, color: "#3B82F6" },
    { label: "Outro (manda no chat)", votes: 130, color: "#A78BFA" },
  ];

  const totalVotes = opts.reduce((s, o) => s + o.votes, 0);

  // Animated bar widths — staggered reveal
  const [widths, setWidths] = useState(opts.map(() => 0));
  const [displayVotes, setDisplayVotes] = useState(0);

  useEffect(() => {
    // Stagger bars in
    opts.forEach((opt, i) => {
      const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
      setTimeout(() => {
        setWidths((prev) => {
          const next = [...prev];
          next[i] = pct;
          return next;
        });
      }, 200 + i * 150);
    });

    // Count up total votes
    let frame = 0;
    const steps = 60;
    const id = setInterval(() => {
      frame++;
      setDisplayVotes(Math.round((frame / steps) * pollTotalVotes));
      if (frame >= steps) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Leading option
  const leadingIdx = opts.reduce((best, opt, i) => (opt.votes > opts[best]!.votes ? i : best), 0);

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: bgDeep }}>
        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 800,
            height: 800,
            borderRadius: "50%",
            top: "20%",
            left: "10%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${primary}18 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            top: "80%",
            left: "85%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        {/* Particles */}
        <ParticleField enabled={t.showHeartParticles} color={accent} />

        {/* Main content */}
        <div className="absolute inset-0 flex flex-col px-16 py-12">
          {/* Eyebrow row */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: `${primary}22`,
                border: `1px solid ${accent}44`,
                backdropFilter: "blur(12px)",
              }}
            >
              <PollIcon color={accent} />
              <span className="font-heading text-sm tracking-[0.2em] text-white/80">
                Enquete ao vivo
              </span>
            </div>

            {/* Time remaining */}
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: `${bgPanel}88`,
                border: `1px solid ${accent}22`,
              }}
            >
              <span className="font-mono text-sm text-white/60">{pollTimeLeft}</span>
              <span className="font-body text-xs text-white/40">restantes</span>
            </div>

            {/* Green dot live indicator */}
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-green-400"
                style={{ animation: "pulse 1.4s ease-in-out infinite" }}
              />
              <span className="font-body text-xs text-green-400/70">votação aberta</span>
            </div>
          </div>

          {/* Poll question */}
          <div
            className="mb-4 leading-tight text-white"
            style={{
              fontSize: 64,
              fontFamily: "'Russo One', sans-serif",
              textShadow: `0 0 40px ${primary}44`,
              maxWidth: "80%",
            }}
          >
            {pollQuestion}
          </div>

          {/* Leading indicator pill */}
          <div className="mb-8 flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: `${opts[leadingIdx]!.color}22`,
                border: `1px solid ${opts[leadingIdx]!.color}55`,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: opts[leadingIdx]!.color }} />
              <span className="font-body text-sm" style={{ color: opts[leadingIdx]!.color }}>
                {opts[leadingIdx]!.label} na frente
              </span>
            </div>
          </div>

          {/* Poll bars */}
          <div className="flex flex-col gap-5 flex-1">
            {opts.map((opt, i) => {
              const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
              const isLeading = i === leadingIdx;
              return (
                <div key={opt.label} className="flex items-center gap-6">
                  {/* Number bullet */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-sm"
                    style={{
                      background: isLeading ? opt.color : `${opt.color}22`,
                      color: isLeading ? "#fff" : opt.color,
                      border: `1px solid ${opt.color}55`,
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Label */}
                  <span className="w-56 shrink-0 font-body text-white/90" style={{ fontSize: 28 }}>
                    {opt.label}
                  </span>

                  {/* Bar */}
                  <div className="relative flex-1 overflow-hidden rounded-full" style={{ height: 28, background: `${opt.color}18` }}>
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${widths[i] ?? 0}%`,
                        background: `linear-gradient(90deg, ${opt.color}CC, ${opt.color})`,
                        boxShadow: isLeading ? `0 0 16px ${opt.color}66` : "none",
                        transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      {/* Shine */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Votes count */}
                  <span className="w-20 shrink-0 text-right font-body text-sm text-white/50">
                    {opt.votes.toLocaleString("pt-BR")}
                  </span>

                  {/* Percentage */}
                  <span
                    className="w-16 shrink-0 text-right font-heading leading-none"
                    style={{
                      fontFamily: "'Russo One', sans-serif",
                      fontSize: 36,
                      color: isLeading ? opt.color : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {Math.round(pct)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom: vote counter + instructions */}
          <div
            className="mt-8 flex items-center justify-between rounded-2xl px-8 py-5"
            style={{
              background: `${bgPanel}88`,
              border: `1px solid ${accent}22`,
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Big vote counter */}
            <div className="flex items-baseline gap-3">
              <span
                className="font-heading leading-none text-white"
                style={{ fontFamily: "'Russo One', sans-serif", fontSize: 72 }}
              >
                {displayVotes.toLocaleString("pt-BR")}
              </span>
              <span className="font-body text-lg text-white/40">votos</span>
            </div>

            {/* Como votar instructions */}
            <div className="flex flex-col items-end gap-2">
              <span className="font-body text-sm text-white/50 tracking-[0.1em]">Como votar</span>
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full px-4 py-1.5 font-mono text-sm"
                  style={{ background: `${accent}22`, border: `1px solid ${accent}44`, color: accent }}
                >
                  !vote 1–4
                </div>
                <span className="font-body text-xs text-white/30">·</span>
                <span className="font-body text-xs text-white/40">discord.app/he4rt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}
