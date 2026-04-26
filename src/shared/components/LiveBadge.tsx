interface LiveBadgeProps {
  label?: string;
  color?: string;
}

export function LiveBadge({ label = "LIVE", color = "#EF4444" }: LiveBadgeProps) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: color, padding: '6px 14px', borderRadius: 6,
      fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 800,
      color: '#fff', letterSpacing: '0.15em',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%', background: '#fff',
        animation: 'pulse 1.4s ease-in-out infinite',
      }} />
      {label}
    </div>
  );
}
