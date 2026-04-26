import type { TweakConfig } from "@/shared/types";
import { HeartMark } from "@/shared/components/HeartMark";

interface TickerBarProps {
  config: TweakConfig;
}

export function TickerBar({ config }: TickerBarProps) {
  const { primary, accent, tickerText } = config;
  const text = (tickerText + '   ').repeat(3);
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 0,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(90deg, ${primary} 0%, ${accent} 50%, ${primary} 100%)`,
        height: 36,
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        boxShadow: `0 -8px 24px ${primary}44`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          animation: 'tickerScroll 60s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 24,
            fontFamily: "'Russo One', sans-serif",
            fontSize: 15, color: '#fff', letterSpacing: '0.08em',
            paddingLeft: 32,
          }}>
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
