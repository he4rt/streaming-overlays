import { useState, useEffect } from "react";

export function useStageScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(w / 1920, h / 1080);
      if (isFinite(s) && s > 0) setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return scale;
}
