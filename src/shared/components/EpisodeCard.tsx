import { Clock } from "./Clock";

interface EpisodeCardProps {
  episodeNumber: string;
  episodeTitle: string;
  topic: string;
  date: string;
  time: string;
  primary: string;
  accent: string;
}

export function EpisodeCard({ episodeNumber, episodeTitle, topic, date, time, primary, accent }: EpisodeCardProps) {
  return (
    <div className="flex items-center gap-4.5 rounded-2xl border border-accent/25 bg-bg-deep/70 px-7 py-4.5 backdrop-blur-[14px]">
      <div className="rounded-lg px-4 py-2 font-heading text-lg tracking-[0.06em] text-white"
        style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, boxShadow: `0 8px 24px ${primary}55` }}>
        {episodeNumber}
      </div>
      <div className="text-left">
        <div className="font-heading text-[30px] leading-[1.1] text-white">{episodeTitle}</div>
        <div className="mt-1.5 font-body text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>{topic}</div>
      </div>
      <div className="mx-2 h-12 w-px" style={{ background: `${accent}33` }} />
      <div className="flex flex-col gap-1 font-body text-sm text-white">
        <div className="flex items-center gap-2"><Clock /> {date}</div>
        <div className="flex items-center gap-2"><Clock /> {time}</div>
      </div>
    </div>
  );
}
