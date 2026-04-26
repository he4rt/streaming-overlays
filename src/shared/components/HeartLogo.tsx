interface HeartLogoProps {
  size?: number;
  white?: string;
  purple?: string;
}

export function HeartLogo({ size = 1, white = "#FFFFFF", purple = "#A855F7" }: HeartLogoProps) {
  return (
    <svg viewBox="0 0 420 90" style={{ height: 70 * size }} className="block">
      <text x="0" y="68" stroke={white} fill="none"
        style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, strokeWidth: 3, paintOrder: "stroke", letterSpacing: "1px" }}>
        HE4RT
      </text>
      <text x="222" y="68" stroke={purple} fill="none"
        style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, strokeWidth: 3, paintOrder: "stroke", letterSpacing: "1px" }}>
        TALKS
      </text>
    </svg>
  );
}
