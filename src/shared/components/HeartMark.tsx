interface HeartMarkProps {
  size?: number;
  color?: string;
}

export function HeartMark({ size = 36, color = "#FFFFFF" }: HeartMarkProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="block">
      <path d="M5 6 L11 6 L16 14 L21 6 L27 6 L18 20 L18 26 L14 26 L14 20 Z" fill={color} />
    </svg>
  );
}
