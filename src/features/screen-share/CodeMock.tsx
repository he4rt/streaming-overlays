interface CodeMockProps {
  accent: string;
  primary: string;
}

export function CodeMock({ accent }: CodeMockProps) {
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
