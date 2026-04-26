import { type ReactNode } from "react";

interface GradientBackgroundProps {
  primary: string;
  primaryDeep: string;
  accent: string;
  bgDeep: string;
  children: ReactNode;
}

export function GradientBackground({ primary, primaryDeep, bgDeep, children }: GradientBackgroundProps) {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(ellipse at 15% 20%, ${primaryDeep}66 0%, transparent 50%),
                   radial-gradient(ellipse at 85% 80%, ${primary}55 0%, transparent 55%),
                   linear-gradient(135deg, ${bgDeep} 0%, #050110 100%)`,
    }}>
      {children}
    </div>
  );
}
