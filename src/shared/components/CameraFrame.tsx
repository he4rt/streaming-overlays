import { CornerBrackets } from "./CornerBrackets";

interface CameraFrameProps {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  role: string;
  handle: string;
  side: "left" | "right";
  primary: string;
  accent: string;
}

export function CameraFrame({ x, y, w, h, name, role, handle, side, primary, accent }: CameraFrameProps) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      {/* gradient border */}
      <div className="absolute -inset-[3px] rounded-[18px] opacity-90"
        style={{ background: `linear-gradient(${side === "left" ? "135deg" : "225deg"}, ${accent} 0%, ${primary} 50%, transparent 80%)` }} />
      {/* camera content */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #2a1850 0%, #0b0418 100%)",
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.25) inset`,
        }}>
        <div className="absolute inset-0"
          style={{
            background: side === "left"
              ? "radial-gradient(ellipse at 35% 45%, rgba(160,120,200,0.35) 0%, rgba(20,8,45,0.95) 65%)"
              : "radial-gradient(ellipse at 65% 50%, rgba(120,90,180,0.3) 0%, rgba(15,6,35,0.95) 65%)",
          }} />
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2" style={{ width: "38%", aspectRatio: "1" }}>
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 font-body text-lg tracking-[0.2em] text-white/[0.18]">
            CAM {side === "left" ? "01" : "02"}
          </div>
        </div>
        <CornerBrackets color={accent} />
      </div>

      {/* name plate */}
      <div className="absolute -bottom-[54px] flex items-center gap-3.5"
        style={{
          left: side === "left" ? 0 : "auto",
          right: side === "right" ? 0 : "auto",
          flexDirection: side === "left" ? "row" : "row-reverse",
        }}>
        <div className="h-11 w-1.5 rounded-sm" style={{ background: `linear-gradient(180deg, ${accent}, ${primary})` }} />
        <div style={{ textAlign: side === "left" ? "left" : "right" }}>
          <div className="font-heading text-[22px] leading-none tracking-[0.02em] text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            {name}
          </div>
          <div className="mt-1.5 font-body text-[13px] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>
            {role} · {handle}
          </div>
        </div>
      </div>
    </div>
  );
}
