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
    <div className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <div className="absolute -inset-[3px] rounded-[18px] opacity-90"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${primary} 50%, ${accent} 100%)` }} />
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#0d1117]"
        style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
        {/* window chrome */}
        <div className="flex h-[38px] items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center font-body text-[13px] font-medium text-[#8b949e]">{screenTitle}</div>
          <div className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-body text-[11px] font-bold tracking-[0.1em]"
            style={{ background: `rgba(168,85,247,0.15)`, borderColor: `${accent}66`, color: accent }}>
            <span className="h-1.5 w-1.5 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full" style={{ background: accent }} />
            COMPARTILHANDO
          </div>
        </div>
        {/* content */}
        {screenContent === "code" && <CodeMock accent={accent} primary={primary} />}
        {screenContent === "browser" && <BrowserMock accent={accent} primary={primary} />}
        {screenContent === "slides" && <SlidesMock accent={accent} primary={primary} />}
      </div>
    </div>
  );
}
