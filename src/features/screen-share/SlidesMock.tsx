interface SlidesMockProps {
  accent: string;
  primary: string;
}

export function SlidesMock({ accent, primary }: SlidesMockProps) {
  return (
    <div style={{ flex: 1, background: '#0b0418', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 24, left: 24,
        fontFamily: 'Inter, sans-serif', fontSize: 12,
        color: accent, letterSpacing: '0.2em', fontWeight: 700,
      }}>SLIDE 04 / 12</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
        <div style={{ height: 4, width: 80, background: `linear-gradient(90deg, ${primary}, ${accent})`, borderRadius: 2 }} />
        <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 64, color: '#fff', lineHeight: 1.05 }}>
          Por que comunidade<br />importa em <span style={{ color: accent }}>2026?</span>
        </div>
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
          Networking, mentoria e oportunidades reais — não dá pra escalar sozinho.
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
          {[
            { n: '80K+', l: 'membros' },
            { n: '15K', l: 'mensagens/dia' },
            { n: '120+', l: 'eventos/ano' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 38, color: accent }}>{s.n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
