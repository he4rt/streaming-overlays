import { type ReactNode } from "react";
import { useStageScale } from "@/hooks/useStageScale";

interface StageProps {
  children: ReactNode;
}

export function Stage({ children }: StageProps) {
  const scale = useStageScale();
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      <div className="relative shrink-0" style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center" }}>
        {children}
      </div>
    </div>
  );
}
