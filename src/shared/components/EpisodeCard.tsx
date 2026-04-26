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
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      background: 'rgba(11,4,24,0.7)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: `1px solid ${accent}44`,
      borderRadius: 16,
      padding: '18px 28px',
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        padding: '8px 16px', borderRadius: 8,
        fontFamily: "'Russo One', sans-serif",
        fontSize: 18, color: '#fff', letterSpacing: '0.06em',
      }}>{episodeNumber}</div>
      <div style={{ textAlign: 'left' }}>
        <div style={{
          fontFamily: "'Russo One', sans-serif",
          fontSize: 30, color: '#fff', lineHeight: 1.1,
        }}>{episodeTitle}</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, color: accent,
          letterSpacing: '0.12em', marginTop: 6, fontWeight: 600,
          textTransform: 'uppercase',
        }}>{topic}</div>
      </div>
      <div style={{ width: 1, height: 50, background: `${accent}33`, margin: '0 8px' }} />
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock /> {date}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock /> {time}</div>
      </div>
    </div>
  );
}
