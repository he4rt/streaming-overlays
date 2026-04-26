import type { TweakConfig } from "@/shared/types";
import { SAMPLE_CHAT } from "./sample-messages";

interface MarqueeChatProps {
  config: TweakConfig;
}

export function MarqueeChat({ config }: MarqueeChatProps) {
  const { accent } = config;
  const items = SAMPLE_CHAT.concat(SAMPLE_CHAT);

  return (
    <div className="absolute inset-x-0 bottom-[80px] flex h-14 items-center overflow-hidden"
      style={{
        background: "linear-gradient(90deg, rgba(11,4,24,0) 0%, rgba(11,4,24,0.85) 8%, rgba(11,4,24,0.85) 92%, rgba(11,4,24,0) 100%)",
        borderTop: `1px solid ${accent}22`,
        borderBottom: `1px solid ${accent}22`,
      }}>
      <div className="flex shrink-0 animate-[marqueeChat_80s_linear_infinite] items-center gap-10 whitespace-nowrap">
        {items.map((m, i) => (
          <div key={i} className="inline-flex items-center gap-3" style={{ paddingLeft: i === 0 ? 60 : 0 }}>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-body text-[11px] font-extrabold uppercase text-white"
              style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
              {m.user[0]}
            </div>
            <span className="font-body text-sm font-bold" style={{ color: m.color }}>{m.user}</span>
            <span className="font-body text-sm text-white/85">{m.msg}</span>
            <span style={{ color: `${accent}66`, fontSize: 18, marginLeft: 4 }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
