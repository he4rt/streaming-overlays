import { type ReactNode } from "react";
import { useStageScale } from "@/hooks/useStageScale";

interface StageProps {
  children: ReactNode;
}

export function Stage({ children }: StageProps) {
  const scale = useStageScale();
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 1920, height: 1080, position: 'relative',
        transform: `scale(${scale})`, transformOrigin: 'center center',
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}
