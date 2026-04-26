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
    <div className="pointer-events-none absolute bottom-[30px] left-[30px] right-[480px] flex h-[110px] items-center gap-6">
      {/* logo block */}
      <div className="flex flex-col gap-2.5 rounded-[14px] border border-accent/30 bg-bg-deep/[0.78] px-6 py-3.5 backdrop-blur-[10px]">
        <HeartLogo size={0.8} purple={accent} />
        <div className="mt-0.5 flex items-center gap-4">
          <div className="h-1 w-15 rounded-sm" style={{ background: `linear-gradient(90deg, ${primary}, ${accent})` }} />
          <div className="flex items-center gap-2 font-heading text-base tracking-[0.04em] text-white">
            <Clock /> {date}
          </div>
          <div className="flex items-center gap-2 font-heading text-base tracking-[0.04em] text-white">
            <Clock /> {time}
          </div>
        </div>
      </div>

      {/* socials */}
      <div className="flex flex-1 justify-end gap-3.5">
        {[
          { icon: "ig" as const, label: "@he4rtdevs" },
          { icon: "in" as const, label: "/he4rt" },
          { icon: "gh" as const, label: "/he4rt-developers" },
          { icon: "x" as const, label: "@he4rtdevs" },
          { icon: "yt" as const, label: "/@he4rtdevs" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-[10px] border border-accent/25 bg-bg-deep/[0.78] px-3.5 py-2.5 font-body text-[13px] font-semibold text-white backdrop-blur-[10px]">
            <SocialIcon kind={s.icon} color={accent} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
