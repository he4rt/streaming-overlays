import { SocialIcon } from "./SocialIcon";

const SOCIALS = [
  { icon: "ig" as const, label: "@he4rtdevs" },
  { icon: "in" as const, label: "/he4rt" },
  { icon: "gh" as const, label: "/he4rt-developers" },
  { icon: "x" as const, label: "@he4rtdevs" },
  { icon: "yt" as const, label: "/@he4rtdevs" },
];

interface SocialBarProps {
  accent: string;
}

export function SocialBar({ accent }: SocialBarProps) {
  return (
    <div className="flex gap-3.5">
      {SOCIALS.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-[10px] border border-accent/25 bg-bg-deep/[0.78] px-3.5 py-2.5 font-body text-[13px] font-semibold text-white backdrop-blur-[10px]">
          <SocialIcon kind={s.icon} color={accent} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
