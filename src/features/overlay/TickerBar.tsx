import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";

interface TickerBarProps {
  config: TweakConfig;
}

export function TickerBar({ config }: TickerBarProps) {
  const { primary, accent, tickerText } = config;
  const text = (tickerText + "   ").repeat(3);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0">
      <div className="absolute inset-x-0 bottom-0 flex h-9 items-center overflow-hidden"
        style={{ background: `linear-gradient(90deg, ${primary} 0%, ${accent} 50%, ${primary} 100%)`, boxShadow: `0 -8px 24px ${primary}44` }}>
        <div className="flex animate-[tickerScroll_60s_linear_infinite] items-center whitespace-nowrap">
          <div className="inline-flex items-center gap-6 pl-8 font-heading text-[15px] tracking-[0.08em] text-white">
            <HeartMark size={22} color="#fff" />
            <span>{text}</span>
            <HeartMark size={22} color="#fff" />
            <span>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
