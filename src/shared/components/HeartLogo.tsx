interface HeartLogoProps {
  size?: number;
  white?: string;
  purple?: string;
}

export function HeartLogo({ size = 1, white = "#FFFFFF", purple = "#A855F7" }: HeartLogoProps) {
  return (
    <svg viewBox="0 0 420 90" style={{ height: 70 * size, display: 'block' }}>
      <defs>
        <style>{`
          .ht-letter { fill: none; stroke-width: 3; font-family: 'Russo One', sans-serif; font-size: 76px; letter-spacing: 1px; paint-order: stroke; font-weight: 900; }
        `}</style>
      </defs>
      <text x="0" y="68" className="ht-letter" stroke={white} fill="none" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, letterSpacing: '1px' }}>
        HE4RT
      </text>
      <text x="222" y="68" className="ht-letter" stroke={purple} fill="none" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, letterSpacing: '1px' }}>
        TALKS
      </text>
    </svg>
  );
}
