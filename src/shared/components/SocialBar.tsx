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
    <div style={{ display: 'flex', gap: 14 }}>
      {SOCIALS.map((s, i) => (
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
  );
}
