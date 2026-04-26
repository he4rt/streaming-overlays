import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";

interface TopBarProps {
  config: TweakConfig;
}

export function TopBar({ config }: TopBarProps) {
  const { primary, accent, episodeTitle, episodeNumber, topic, showLiveBadge } = config;
  const [viewers, setViewers] = useState(2847);

  useEffect(() => {
    const id = setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 7) - 2), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute left-[30px] right-[480px] top-[30px] flex h-20 items-center gap-5">
      {/* episode number */}
      <div className="rounded-[10px] px-[18px] py-2.5 font-heading text-lg tracking-[0.06em] text-white"
        style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, boxShadow: `0 8px 24px ${primary}55` }}>
        {episodeNumber}
      </div>

      {/* title block */}
      <div className="min-w-0 flex-1 rounded-xl border border-accent/30 bg-bg-deep/[0.72] px-[22px] py-2.5 backdrop-blur-[10px]">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-heading text-[22px] leading-[1.1] tracking-[0.01em] text-white">
          {episodeTitle}
        </div>
        <div className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
          {topic}
        </div>
      </div>

      {/* live + viewers */}
      {showLiveBadge && (
        <div className="flex flex-col items-end gap-1.5">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#EF4444] px-3.5 py-1.5 font-body text-xs font-extrabold tracking-[0.15em] text-white">
            <span className="h-[7px] w-[7px] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-white" />
            LIVE
          </div>
          <div className="flex items-center gap-1.5 font-body text-[13px] font-bold text-white">
            <svg viewBox="0 0 24 24" width="14" height="14" fill={accent}>
              <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            {viewers.toLocaleString("pt-BR")} assistindo
          </div>
        </div>
      )}
    </div>
  );
}
