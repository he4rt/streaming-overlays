interface CornerBracketsProps {
  color?: string;
  size?: number;
  inset?: number;
  strokeWidth?: number;
}

export function CornerBrackets({ color = "#A855F7", size = 22, inset = 14, strokeWidth = 2 }: CornerBracketsProps) {
  const border = `${strokeWidth}px solid ${color}`;
  const corners = [
    { top: inset, left: inset, borderTop: border, borderLeft: border },
    { top: inset, right: inset, borderTop: border, borderRight: border },
    { bottom: inset, left: inset, borderBottom: border, borderLeft: border },
    { bottom: inset, right: inset, borderBottom: border, borderRight: border },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div key={i} className="absolute" style={{ width: size, height: size, ...style }} />
      ))}
    </>
  );
}
