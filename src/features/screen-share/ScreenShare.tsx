import type { TweakConfig } from "@/shared/types";
import { CodeMock } from "./CodeMock";
import { BrowserMock } from "./BrowserMock";
import { SlidesMock } from "./SlidesMock";

interface ScreenShareProps {
  config: TweakConfig;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function ScreenShare({ config, x, y, w, h }: ScreenShareProps) {
  const { accent, primary, screenContent, screenTitle } = config;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      <div style={{
        position: 'absolute', inset: -3,
        background: `linear-gradient(135deg, ${accent} 0%, ${primary} 50%, ${accent} 100%)`,
        borderRadius: 18,
        opacity: 0.9,
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden',
        background: '#0d1117',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* window chrome */}
        <div style={{
          height: 38, background: '#161b22',
          display: 'flex', alignItems: 'center', padding: '0 16px',
          borderBottom: '1px solid #30363d',
          gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <div style={{
            flex: 1, textAlign: 'center',
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#8b949e', fontWeight: 500,
          }}>
            {screenTitle}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(168,85,247,0.15)',
            border: `1px solid ${accent}66`,
            padding: '4px 10px', borderRadius: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
            color: accent, letterSpacing: '0.1em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: accent,
              animation: 'pulse 1.4s ease-in-out infinite',
            }} />
            COMPARTILHANDO
          </div>
        </div>
        {/* content */}
        {screenContent === 'code' && <CodeMock accent={accent} primary={primary} />}
        {screenContent === 'browser' && <BrowserMock accent={accent} primary={primary} />}
        {screenContent === 'slides' && <SlidesMock accent={accent} primary={primary} />}
      </div>
    </div>
  );
}
