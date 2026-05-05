interface ChromaScreenProps {
  /** Aspect ratio of the captured screen — "16:9" (FHD/1080p) or "16:10" (MacBook) */
  aspect?: "16:9" | "16:10" | string;
  /** Chroma fill color */
  color?: string;
  /** Available container width */
  width: number;
  /** Available container height */
  height: number;
}

function parseAspect(aspect: string): number {
  const [w, h] = aspect.split(":").map(Number);
  if (!w || !h) return 16 / 9;
  return w / h;
}

export function ChromaScreen({
  aspect = "16:9",
  color = "#00FF00",
  width,
  height,
}: ChromaScreenProps) {
  const ratio = parseAspect(aspect);
  // fit within (width, height) preserving ratio
  let w = width;
  let h = w / ratio;
  if (h > height) {
    h = height;
    w = h * ratio;
  }

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ width: w, height: h, background: color }} />
    </div>
  );
}
