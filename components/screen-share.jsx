/* eslint-disable */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// Screen share placeholder (code editor mock)
// ─────────────────────────────────────────────
function ScreenShare({ tweaks, x, y, w, h }) {
  const { accent, primary, screenContent, screenTitle } = tweaks;
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

function CodeMock({ accent, primary }) {
  const lines = [
    { n: 1,  t: 'import', c: '#ff7b72', rest: ' { useState, useEffect } ', s: '#79c0ff', w: "from 'react';" },
    { n: 2,  t: '', c: '', rest: '', s: '', w: '' },
    { n: 3,  t: '// authentication context', c: '#8b949e', rest: '', s: '', w: '' },
    { n: 4,  t: 'export', c: '#ff7b72', rest: ' ', s: '', w: '' },
    { n: 5,  t: 'function', c: '#ff7b72', rest: ' ', s: '#d2a8ff', w: 'useAuth() {' },
    { n: 6,  t: '  const', c: '#ff7b72', rest: ' [user, setUser] = ', s: '#79c0ff', w: 'useState(null);' },
    { n: 7,  t: '  const', c: '#ff7b72', rest: ' [loading, setLoading] = ', s: '#79c0ff', w: 'useState(true);' },
    { n: 8,  t: '', c: '', rest: '', s: '', w: '' },
    { n: 9,  t: '  useEffect', c: '#d2a8ff', rest: '(() => {', s: '', w: '' },
    { n: 10, t: '    const', c: '#ff7b72', rest: ' token = localStorage.', s: '#d2a8ff', w: "getItem('he4rt_token');" },
    { n: 11, t: '    if', c: '#ff7b72', rest: ' (token) {', s: '', w: '' },
    { n: 12, t: '      verifyToken', c: '#d2a8ff', rest: '(token).', s: '#d2a8ff', w: 'then(setUser);' },
    { n: 13, t: '    }', c: '', rest: '', s: '', w: '' },
    { n: 14, t: '    setLoading', c: '#d2a8ff', rest: '(', s: '#79c0ff', w: 'false);' },
    { n: 15, t: '  }, []);', c: '', rest: '', s: '', w: '' },
    { n: 16, t: '', c: '', rest: '', s: '', w: '' },
    { n: 17, t: '  return', c: '#ff7b72', rest: ' { user, loading, signIn, signOut };', s: '', w: '' },
    { n: 18, t: '}', c: '', rest: '', s: '', w: '' },
  ];
  return (
    <div style={{
      flex: 1, display: 'flex', position: 'relative', overflow: 'hidden',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>
      {/* sidebar */}
      <div style={{ width: 220, background: '#0d1117', borderRight: '1px solid #21262d', padding: '14px 0', fontSize: 13, color: '#8b949e' }}>
        <div style={{ padding: '4px 16px', color: '#c9d1d9', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>EXPLORER</div>
        <div style={{ marginTop: 10 }}>
          {[
            { n: '📁 he4rt-talks', a: true },
            { n: '  📁 src', a: true },
            { n: '    📁 hooks', a: true },
            { n: '      📄 useAuth.ts', selected: true },
            { n: '      📄 useChat.ts' },
            { n: '    📁 components' },
            { n: '    📁 pages' },
            { n: '  📄 package.json' },
            { n: '  📄 README.md' },
          ].map((f, i) => (
            <div key={i} style={{
              padding: '3px 16px',
              background: f.selected ? '#1f6feb33' : 'transparent',
              color: f.selected ? '#fff' : '#8b949e',
              fontSize: 12.5,
            }}>{f.n}</div>
          ))}
        </div>
      </div>
      {/* code area */}
      <div style={{ flex: 1, padding: '14px 0', overflow: 'hidden', fontSize: 14, lineHeight: '22px' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', padding: '0 16px' }}>
            <span style={{ width: 36, color: '#484f58', textAlign: 'right', marginRight: 18, userSelect: 'none' }}>{l.n}</span>
            <span style={{ color: '#c9d1d9' }}>
              <span style={{ color: l.c }}>{l.t}</span>
              <span>{l.rest}</span>
              <span style={{ color: l.s }}>{l.w}</span>
            </span>
          </div>
        ))}
        {/* terminal at bottom */}
        <div style={{
          marginTop: 20, borderTop: '1px solid #21262d',
          padding: '12px 16px', fontSize: 12.5, color: '#8b949e',
        }}>
          <div style={{ color: '#7ee787' }}>$ npm run dev</div>
          <div style={{ color: '#8b949e' }}>  ▲ Next.js 14.2.0</div>
          <div style={{ color: '#8b949e' }}>  - Local:   http://localhost:3000</div>
          <div style={{ color: '#7ee787', marginTop: 4 }}>✓ Ready in 1.2s</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <span style={{ color: accent }}>$</span>
            <span style={{ color: '#c9d1d9' }}>_</span>
            <span style={{
              display: 'inline-block', width: 8, height: 14,
              background: '#c9d1d9', marginLeft: -2,
              animation: 'pulse 1s steps(2) infinite',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserMock({ accent, primary }) {
  return (
    <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 42, background: '#f6f8fa', borderBottom: '1px solid #d0d7de', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, color: '#8b949e' }}>
          <span>←</span><span>→</span><span>⟳</span>
        </div>
        <div style={{ flex: 1, background: '#fff', border: '1px solid #d0d7de', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#57606a', fontFamily: 'Inter, sans-serif' }}>
          🔒 he4rtdevs.com.br/comunidade
        </div>
      </div>
      <div style={{ flex: 1, padding: 60, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 56, color: '#1f2328', lineHeight: 1.05 }}>
          A maior comunidade<br />
          <span style={{ color: primary }}>dev do Brasil</span>
        </div>
        <div style={{ fontSize: 18, color: '#57606a', maxWidth: 600 }}>
          Mais de 80 mil devs trocando código, carreira e cervejas no nosso Discord.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ background: primary, color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}>
            Entrar no Discord
          </div>
          <div style={{ background: 'transparent', border: `2px solid ${primary}`, color: primary, padding: '12px 26px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}>
            GitHub
          </div>
        </div>
      </div>
    </div>
  );
}

function SlidesMock({ accent, primary }) {
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

// ─────────────────────────────────────────────
// Starting Soon scene — full-bleed splash with countdown
// ─────────────────────────────────────────────


Object.assign(window, { ScreenShare, CodeMock, BrowserMock, SlidesMock });
