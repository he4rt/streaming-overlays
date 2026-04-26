import type { TweakConfig } from "@/shared/types";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { Clock } from "@/shared/components/Clock";
import { SocialIcon } from "@/shared/components/SocialIcon";

interface LowerThirdProps {
  config: TweakConfig;
}

export function LowerThird({ config }: LowerThirdProps) {
  const { primary, accent, date, time } = config;
  return (
    <div style={{
      position: 'absolute', left: 30, bottom: 30, right: 480,
      height: 110,
      display: 'flex', alignItems: 'center', gap: 24,
      pointerEvents: 'none',
    }}>
      {/* logo block */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        background: 'rgba(11,4,24,0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid rgba(168,85,247,0.3)`,
        borderRadius: 14,
        padding: '14px 24px',
      }}>
        <HeartLogo size={0.8} purple={accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 2 }}>
          <div style={{
            height: 4, width: 60,
            background: `linear-gradient(90deg, ${primary}, ${accent})`,
            borderRadius: 2,
          }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Russo One', sans-serif", fontSize: 16, color: '#fff',
            letterSpacing: '0.04em',
          }}>
            <Clock /> {date}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Russo One', sans-serif", fontSize: 16, color: '#fff',
            letterSpacing: '0.04em',
          }}>
            <Clock /> {time}
          </div>
        </div>
      </div>

      {/* socials block */}
      <div style={{
        flex: 1,
        display: 'flex', justifyContent: 'flex-end', gap: 14,
      }}>
        {[
          { icon: 'ig' as const, label: '@he4rtdevs' },
          { icon: 'in' as const, label: '/he4rt' },
          { icon: 'gh' as const, label: '/he4rt-developers' },
          { icon: 'x' as const,  label: '@he4rtdevs' },
          { icon: 'yt' as const, label: '/@he4rtdevs' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(11,4,24,0.78)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(168,85,247,0.25)`,
            borderRadius: 10,
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#fff', fontWeight: 600,
          }}>
            <SocialIcon kind={s.icon} color={accent} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
