import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { HeartMark } from "@/shared/components/HeartMark";
import { SocialIcon } from "@/shared/components/SocialIcon";

export function EndingScene() {
  const t = useOverlayConfig();
  const { primary, accent, bgDeep, endingTitle, endingSubtitle, guest1Name, guest1Handle, guest2Name, guest2Handle } = t;

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: bgDeep }}>
        {/* Radial glow background */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 1400,
            height: 1400,
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />

        {/* Particle field */}
        <ParticleField enabled={t.showHeartParticles} color={accent} />

        {/* OFFLINE badge — top right */}
        <div
          className="absolute right-10 top-10 flex items-center gap-2 rounded-full px-5 py-2"
          style={{ background: "#374151", border: "1px solid #4B5563" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="font-heading text-xs tracking-[0.2em] text-gray-300">OFFLINE</span>
        </div>

        {/* HeartMark — top left */}
        <div className="absolute left-10 top-10 flex items-center gap-3">
          <HeartMark size={32} color={accent} />
          <span className="font-heading text-xs tracking-[0.2em] text-white/50" style={{ letterSpacing: "0.2em" }}>
            HE4RT TALKS
          </span>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
          {/* HeartMark with glow */}
          <div style={{ animation: "glow 3s ease-in-out infinite" }}>
            <HeartMark size={96} color={accent} />
          </div>

          {/* Ending title */}
          <div
            className="text-center leading-none text-white"
            style={{
              fontSize: 140,
              fontFamily: "'Russo One', sans-serif",
              textShadow: `0 0 80px ${primary}88, 0 0 160px ${primary}44`,
              letterSpacing: "-0.02em",
            }}
          >
            {endingTitle}
          </div>

          {/* Subtitle */}
          <p className="font-body text-white/60" style={{ fontSize: 28 }}>
            {endingSubtitle}
          </p>

          {/* Gradient divider */}
          <div
            style={{
              width: 200,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
            }}
          />

          {/* Hosts row */}
          <div className="flex items-center gap-12">
            {[
              { name: guest1Name, handle: guest1Handle },
              { name: guest2Name, handle: guest2Handle },
            ].map((host) => (
              <div key={host.handle} className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${primary}, ${accent})`,
                    boxShadow: `0 0 24px ${primary}55`,
                  }}
                >
                  {host.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-sm text-white">{host.name}</span>
                  <span className="font-body text-xs" style={{ color: `${accent}99` }}>
                    {host.handle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-4">
            {[
              { emoji: "👍", label: "Curta" },
              { emoji: "🔔", label: "Inscreva-se" },
              { emoji: "💬", label: "Comenta" },
            ].map((cta) => (
              <div
                key={cta.label}
                className="flex items-center gap-2 rounded-full px-6 py-3"
                style={{
                  background: `${primary}22`,
                  border: `1px solid ${accent}44`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="text-xl">{cta.emoji}</span>
                <span className="font-heading text-sm tracking-[0.12em] text-white/80">
                  {cta.label}
                </span>
              </div>
            ))}
          </div>

          {/* Social icons grid */}
          <div className="flex items-center gap-4">
            {(["x", "ig", "yt", "gh", "in"] as const).map((kind) => (
              <div
                key={kind}
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}33`,
                }}
              >
                <SocialIcon kind={kind} color={`${accent}CC`} />
              </div>
            ))}
            <span className="ml-2 font-body text-sm text-white/40 tracking-[0.08em]">
              @he4rttalks
            </span>
          </div>

          {/* HeartLogo at bottom */}
          <div style={{ marginTop: 8 }}>
            <HeartLogo size={1.2} white="#FFFFFF" purple={accent} />
          </div>
        </div>
      </div>
    </Stage>
  );
}
