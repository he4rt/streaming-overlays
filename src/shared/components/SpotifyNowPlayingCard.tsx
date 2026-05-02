import type { SpotifyNowPlaying } from "@/shared/types";

interface SpotifyNowPlayingCardProps {
  nowPlaying: SpotifyNowPlaying;
  configured: boolean;
  isLoading?: boolean;
  primary: string;
  accent: string;
  bgPanel: string;
  width?: number;
}

export function SpotifyNowPlayingCard({
  nowPlaying,
  configured,
  isLoading = false,
  primary,
  accent,
  bgPanel,
  width = 420,
}: SpotifyNowPlayingCardProps) {
  const track = nowPlaying.track;
  const hasTrack = Boolean(track);
  const shouldSpinVinyl = configured && hasTrack && nowPlaying.isPlaying;

  let statusText = "NADA TOCANDO";
  if (!configured) statusText = "SPOTIFY NÃO CONFIGURADO";
  if (isLoading) statusText = "CARREGANDO";
  if (configured && hasTrack && !nowPlaying.isPlaying) statusText = "PAUSADO";
  if (configured && hasTrack && nowPlaying.isPlaying) statusText = "TOCANDO";

  return (
    <div
      style={{
        width,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "14px 18px",
        borderRadius: 16,
        background: `linear-gradient(180deg, ${bgPanel}F0 0%, ${bgPanel}C9 100%)`,
        border: `1px solid ${accent}55`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: `0 14px 36px rgba(0,0,0,0.45), 0 0 0 1px ${primary}22 inset`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 92,
          height: 92,
          borderRadius: "50%",
          flexShrink: 0,
          background: "repeating-radial-gradient(circle, #090909 0 2px, #121212 2px 4px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), 0 8px 18px rgba(0,0,0,0.45)",
          animation: shouldSpinVinyl ? "vinylSpin 3.2s linear infinite" : "none",
          willChange: shouldSpinVinyl ? "transform" : "auto",
          transform: "translateZ(0)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12), transparent 42%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: `2px solid ${accent}66`,
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 16px ${accent}55`,
          }}
        >
          {track?.coverUrl ? (
            <img
              src={track.coverUrl}
              alt={track.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: 16,
                color: "#fff",
                letterSpacing: "0.08em",
              }}
            >
              ♪
            </span>
          )}
        </div>
      </div>

      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.18em",
            color: accent,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: nowPlaying.isPlaying ? "#22c55e" : accent,
              boxShadow: nowPlaying.isPlaying ? "0 0 12px #22c55e" : "none",
              animation: nowPlaying.isPlaying ? "pulse 1.2s ease-in-out infinite" : "none",
            }}
          />
          {statusText}
        </div>

        <div
          style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 22,
            color: "#fff",
            lineHeight: 1.02,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          title={track?.name ?? ""}
        >
          {track?.name ?? "Nenhuma faixa ativa"}
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.72)",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          title={track?.album ?? ""}
        >
          {track?.album ?? "Abra o player para começar"}
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.52)",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          title={track?.artists ?? ""}
        >
          {track?.artists ?? "Spotify"}
        </div>
      </div>
    </div>
  );
}
