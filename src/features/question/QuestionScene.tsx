import { Stage } from "@/features/stage/Stage";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { CornerBrackets } from "@/shared/components/CornerBrackets";

export function QuestionScene() {
  const t = DEFAULTS;
  const {
    primary,
    accent,
    bgDeep,
    bgPanel,
    questionAuthor,
    questionAuthorBadge,
    questionText,
    questionFrom,
    questionQueue,
    guest1Name,
    guest2Name,
  } = t;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: bgDeep }}>
        {/* Ambient radial blobs */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 900,
            height: 900,
            borderRadius: "50%",
            top: "30%",
            left: "20%",
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
            top: "70%",
            left: "75%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${accent}0F 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        {/* Particle field */}
        <ParticleField enabled={t.showHeartParticles} color={accent} />

        {/* Huge quote watermark */}
        <div
          className="pointer-events-none absolute select-none"
          style={{
            fontSize: 720,
            fontFamily: "'Russo One', sans-serif",
            color: `${accent}06`,
            lineHeight: 1,
            top: -80,
            left: -40,
          }}
        >
          "
        </div>

        {/* Top eyebrow */}
        <div className="absolute left-1/2 top-12 flex -translate-x-1/2 items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2"
            style={{
              background: `${primary}22`,
              border: `1px solid ${accent}44`,
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: accent, animation: "pulse 1.4s ease-in-out infinite" }}
            />
            <span className="font-heading text-sm tracking-[0.2em] text-white/80">
              Pergunta da Audiência
            </span>
            <span className="font-body text-xs text-white/40 ml-2">{questionFrom}</span>
          </div>
        </div>

        {/* Center: author + question */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-24">
          {/* Author row */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full font-heading text-xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${primary}, ${accent})`,
                boxShadow: `0 0 28px ${primary}55`,
              }}
            >
              {questionAuthor.slice(0, 2).toUpperCase()}
            </div>
            {/* Badge */}
            <div
              className="rounded px-2 py-0.5 font-heading text-xs text-white"
              style={{ background: accent, letterSpacing: "0.12em" }}
            >
              {questionAuthorBadge}
            </div>
            <span className="font-heading text-base text-white/80">{questionAuthor}</span>
          </div>

          {/* Question text */}
          <div
            className="max-w-5xl text-center leading-tight text-white"
            style={{
              fontSize: 76,
              fontFamily: "'Russo One', sans-serif",
              textShadow: `0 0 40px ${primary}44`,
            }}
          >
            {questionText}
          </div>

          {/* "respondendo agora" tag */}
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}33`,
            }}
          >
            <span className="h-2 w-2 rounded-full bg-green-400" style={{ animation: "pulse 1.4s ease-in-out infinite" }} />
            <span className="font-body text-sm text-white/70 tracking-[0.08em]">respondendo agora</span>
          </div>
        </div>

        {/* Bottom strip — 240px */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-stretch gap-6 px-10 py-6"
          style={{
            height: 240,
            background: `linear-gradient(180deg, transparent, ${bgPanel}CC)`,
            borderTop: `1px solid ${accent}18`,
          }}
        >
          {/* Camera card 1 */}
          <div
            className="relative flex flex-1 items-center justify-center rounded-xl overflow-hidden"
            style={{
              background: `${bgPanel}88`,
              border: `1px solid ${accent}22`,
            }}
          >
            <CornerBrackets color={`${accent}88`} size={16} inset={8} />
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg text-white"
                style={{ background: `${primary}44` }}
              >
                {initials(guest1Name)}
              </div>
              <span className="font-body text-xs text-white/50">{guest1Name}</span>
            </div>
            {/* LIVE dot */}
            <div
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ background: "#DC2626" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "pulse 1.4s ease-in-out infinite" }} />
              <span className="font-heading text-xs text-white" style={{ letterSpacing: "0.1em" }}>LIVE</span>
            </div>
          </div>

          {/* Camera card 2 */}
          <div
            className="relative flex flex-1 items-center justify-center rounded-xl overflow-hidden"
            style={{
              background: `${bgPanel}88`,
              border: `1px solid ${accent}22`,
            }}
          >
            <CornerBrackets color={`${accent}88`} size={16} inset={8} />
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg text-white"
                style={{ background: `${primary}44` }}
              >
                {initials(guest2Name)}
              </div>
              <span className="font-body text-xs text-white/50">{guest2Name}</span>
            </div>
            {/* LIVE dot */}
            <div
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ background: "#DC2626" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "pulse 1.4s ease-in-out infinite" }} />
              <span className="font-heading text-xs text-white" style={{ letterSpacing: "0.1em" }}>LIVE</span>
            </div>
          </div>

          {/* Queue counter card */}
          <div
            className="relative flex w-48 shrink-0 flex-col items-center justify-center gap-1 rounded-xl"
            style={{
              background: `${bgPanel}88`,
              border: `1px solid ${accent}22`,
            }}
          >
            <span
              className="font-heading leading-none text-white"
              style={{ fontFamily: "'Russo One', sans-serif", fontSize: 52 }}
            >
              {questionQueue}
            </span>
            <span className="font-body text-xs text-white/40 tracking-[0.1em]">na fila</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}
