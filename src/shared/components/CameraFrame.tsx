interface CameraFrameProps {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  role: string;
  handle: string;
  side: "left" | "right";
  primary: string;
  accent: string;
  showPlaceholder?: boolean;
}

export function CameraFrame({ x, y, w, h, name, role, handle, side, primary, accent, showPlaceholder = true }: CameraFrameProps) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
    }}>
      {/* outer purple gradient border */}
      <div style={{
        position: 'absolute', inset: -3,
        background: `linear-gradient(${side === 'left' ? '135deg' : '225deg'}, ${accent} 0%, ${primary} 50%, transparent 80%)`,
        borderRadius: 18,
        opacity: 0.9,
      }} />
      {/* camera content (placeholder) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden',
        background: showPlaceholder ? `linear-gradient(135deg, #2a1850 0%, #0b0418 100%)` : '#00FF00',
        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.25) inset`,
      }}>
        {showPlaceholder && (<>
        {/* simulated camera feed gradient + soft circle */}
        <div style={{
          position: 'absolute', inset: 0,
          background: side === 'left'
            ? 'radial-gradient(ellipse at 35% 45%, rgba(160,120,200,0.35) 0%, rgba(20,8,45,0.95) 65%)'
            : 'radial-gradient(ellipse at 65% 50%, rgba(120,90,180,0.3) 0%, rgba(15,6,35,0.95) 65%)',
        }} />
        {/* placeholder "subject" silhouette */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '58%',
          transform: 'translate(-50%, -50%)',
          width: '38%', aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%)',
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.18)', fontSize: 18, fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em',
          }}>
            CAM {side === 'left' ? '01' : '02'}
          </div>
        </div>
        </>)}
        {/* corner brackets */}
        {[
          { top: 14, left: 14, borders: ['top', 'left'] },
          { top: 14, right: 14, borders: ['top', 'right'] },
          { bottom: 14, left: 14, borders: ['bottom', 'left'] },
          { bottom: 14, right: 14, borders: ['bottom', 'right'] },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: 22, height: 22,
            top: 'top' in c ? (c as { top: number }).top : undefined,
            left: 'left' in c ? (c as { left: number }).left : undefined,
            bottom: 'bottom' in c ? (c as { bottom: number }).bottom : undefined,
            right: 'right' in c ? (c as { right: number }).right : undefined,
            borderTop: c.borders.includes('top') ? `2px solid ${accent}` : 'none',
            borderBottom: c.borders.includes('bottom') ? `2px solid ${accent}` : 'none',
            borderLeft: c.borders.includes('left') ? `2px solid ${accent}` : 'none',
            borderRight: c.borders.includes('right') ? `2px solid ${accent}` : 'none',
          }} />
        ))}
      </div>

      {/* Name plate — sits below camera, anchored to inner corner */}
      <div style={{
        position: 'absolute',
        left: side === 'left' ? 0 : 'auto',
        right: side === 'right' ? 0 : 'auto',
        bottom: -54,
        display: 'flex', alignItems: 'center', gap: 14,
        flexDirection: side === 'left' ? 'row' : 'row-reverse',
      }}>
        {/* purple accent block */}
        <div style={{
          width: 6, height: 44,
          background: `linear-gradient(180deg, ${accent}, ${primary})`,
          borderRadius: 3,
        }} />
        <div style={{ textAlign: side === 'left' ? 'left' : 'right' }}>
          <div style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 22, color: '#fff', letterSpacing: '0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            lineHeight: 1,
          }}>{name}</div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, color: accent,
            marginTop: 6, letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: 600,
          }}>{role} · {handle}</div>
        </div>
      </div>
    </div>
  );
}
