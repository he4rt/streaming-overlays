import { CornerBrackets } from "./CornerBrackets";

interface MiniCameraProps {
  name: string;
  role: string;
  side: "left" | "right";
  primary: string;
  accent: string;
}

export function MiniCamera({ name, role, side, primary, accent }: MiniCameraProps) {
  return (
    <div className="relative h-[200px] w-[280px]">
      <div className="absolute -inset-0.5 rounded-[14px]"
        style={{ background: `linear-gradient(${side === "left" ? "135deg" : "225deg"}, ${accent} 0%, ${primary} 60%, transparent 90%)` }} />
      <div className="absolute inset-0 overflow-hidden rounded-xl"
        style={{ background: "linear-gradient(135deg, #2a1850 0%, #0b0418 100%)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0"
          style={{
            background: side === "left"
              ? "radial-gradient(ellipse at 35% 45%, rgba(160,120,200,0.35) 0%, rgba(20,8,45,0.95) 65%)"
              : "radial-gradient(ellipse at 65% 50%, rgba(120,90,180,0.3) 0%, rgba(15,6,35,0.95) 65%)",
          }} />
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 font-body text-[13px] tracking-[0.2em] text-white/[0.18]">
          CAM {side === "left" ? "01" : "02"}
        </div>
        <CornerBrackets color={accent} size={14} inset={8} />
        {/* nameplate */}
        <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3 pt-6" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(11,4,24,0.95) 100%)" }}>
          <div className="flex items-center gap-2">
            <div className="h-7 w-1 rounded-sm" style={{ background: `linear-gradient(180deg, ${accent}, ${primary})` }} />
            <div className="min-w-0 flex-1">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-heading text-sm leading-none tracking-[0.02em] text-white">{name}</div>
              <div className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap font-body text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>{role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
