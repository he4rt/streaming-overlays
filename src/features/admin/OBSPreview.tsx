import { useEffect, useRef, useState } from "react";

const WHEP_URL =
  (import.meta.env.VITE_WHEP_URL as string | undefined) ??
  "http://localhost:8889/heart/whep";

type Status = "connecting" | "live" | "waiting" | "error";

export function OBSPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let pc: RTCPeerConnection | null = null;
    let retryTimer: number | undefined;
    let cancelled = false;

    const scheduleRetry = (delayMs: number) => {
      if (cancelled) return;
      retryTimer = window.setTimeout(() => setAttempt((n) => n + 1), delayMs);
    };

    async function connect() {
      setStatus("connecting");
      setError(null);
      try {
        pc = new RTCPeerConnection();
        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        pc.ontrack = (ev) => {
          const [stream] = ev.streams;
          if (videoRef.current && stream) videoRef.current.srcObject = stream;
        };

        pc.onconnectionstatechange = () => {
          if (!pc || cancelled) return;
          if (pc.connectionState === "connected") setStatus("live");
          else if (
            pc.connectionState === "failed" ||
            pc.connectionState === "disconnected" ||
            pc.connectionState === "closed"
          ) {
            setStatus("waiting");
            setError("conexão perdida — reconectando");
            scheduleRetry(2000);
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const res = await fetch(WHEP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/sdp" },
          body: offer.sdp ?? "",
        });

        if (res.status === 404) {
          setStatus("waiting");
          setError("nenhuma transmissão ativa em " + WHEP_URL);
          scheduleRetry(3000);
          return;
        }
        if (!res.ok) {
          throw new Error(`WHEP ${res.status}: ${await res.text()}`);
        }

        const answer = await res.text();
        if (cancelled) return;
        await pc.setRemoteDescription({ type: "answer", sdp: answer });
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : String(e));
        scheduleRetry(3000);
      }
    }

    connect();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      pc?.close();
    };
  }, [attempt]);

  const dot =
    status === "live"
      ? "bg-green-400 animate-pulse"
      : status === "connecting"
      ? "bg-yellow-400 animate-pulse"
      : "bg-red-400";

  const label =
    status === "live"
      ? "LIVE"
      : status === "connecting"
      ? "CONECTANDO"
      : status === "waiting"
      ? "AGUARDANDO OBS"
      : "ERRO";

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0e0820] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          <span className="font-body text-[11px] font-bold uppercase tracking-widest text-white/70">
            Preview OBS · {label}
          </span>
        </div>
        <span className="font-body text-[10px] text-white/30">{WHEP_URL}</span>
      </div>
      <div className="relative aspect-video w-full bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-contain"
        />
        {status !== "live" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 p-4 text-center">
            <span className="font-body text-xs text-white/60">{label}</span>
            {error && (
              <span className="font-body text-[11px] text-white/35">{error}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
