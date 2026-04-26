/* eslint-disable */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// Heart Talks logo (matches the outlined HE4RT TALKS style)
// ─────────────────────────────────────────────
function HeartLogo({ size = 1, white = "#FFFFFF", purple = "#A855F7" }) {
  return (
    <svg viewBox="0 0 420 90" style={{ height: 70 * size, display: 'block' }}>
      <defs>
        <style>{`
          .ht-letter { fill: none; stroke-width: 3; font-family: 'Russo One', sans-serif; font-size: 76px; letter-spacing: 1px; paint-order: stroke; font-weight: 900; }
        `}</style>
      </defs>
      <text x="0" y="68" className="ht-letter" stroke={white} fill="none" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, letterSpacing: '1px' }}>
        HE4RT
      </text>
      <text x="222" y="68" className="ht-letter" stroke={purple} fill="none" style={{ fontFamily: "'Russo One', sans-serif", fontSize: 76, fontWeight: 900, letterSpacing: '1px' }}>
        TALKS
      </text>
    </svg>
  );
}

// Stylized "H" mark — repurposed from the brand chevron-heart

// Stylized "H" mark — repurposed from the brand chevron-heart
function HeartMark({ size = 36, color = "#FFFFFF" }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ display: 'block' }}>
      <path
        d="M5 6 L11 6 L16 14 L21 6 L27 6 L18 20 L18 26 L14 26 L14 20 Z"
        fill={color}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Animated background — subtle particle field
// ─────────────────────────────────────────────

function Clock() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#A855F7' }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function SocialIcon({ kind, color }) {
  const props = { width: 18, height: 18, fill: color, viewBox: '0 0 24 24' };
  switch (kind) {
    case 'ig': return <svg {...props}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.7-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 7.9a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zm5-8.1a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z"/></svg>;
    case 'in': return <svg {...props}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.6 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.46h-4.55v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V22H7.82V8z"/></svg>;
    case 'gh': return <svg {...props}><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4C17.5 4.4 18.5 4.7 18.5 4.7c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z"/></svg>;
    case 'x':  return <svg {...props}><path d="M18.9 2H22l-7.6 8.7L23.4 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.4L.9 2h7.2l5 6.6L18.9 2zm-2.5 18h2L7.7 4H5.6l10.8 16z"/></svg>;
    case 'yt': return <svg {...props}><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>;
    default: return null;
  }
}

// ─────────────────────────────────────────────
// Ticker — bottom strip
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Animated background — subtle particle field
// ─────────────────────────────────────────────
function ParticleField({ enabled = true, color = "#A855F7" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.fillStyle = color;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1920; if (p.x > 1920) p.x = 0;
        if (p.y < 0) p.y = 1080; if (p.y > 1080) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      // connecting lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.18;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [enabled, color]);
  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.55, pointerEvents: 'none',
      }}
    />
  );
}

// ─────────────────────────────────────────────
// Small camera (PiP-style for screen-share scene)
// ─────────────────────────────────────────────


Object.assign(window, { HeartLogo, HeartMark, Clock, SocialIcon, ParticleField });
