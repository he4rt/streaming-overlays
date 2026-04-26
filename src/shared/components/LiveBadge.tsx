interface LiveBadgeProps {
  label?: string;
  color?: string;
}

export function LiveBadge({ label = "LIVE", color = "#EF4444" }: LiveBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-body text-xs font-extrabold tracking-[0.15em] text-white" style={{ background: color }}>
      <span className="h-2 w-2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-white" />
      {label}
    </div>
  );
}
