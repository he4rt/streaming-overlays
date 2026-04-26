interface BrowserMockProps {
  accent: string;
  primary: string;
}

export function BrowserMock({ primary }: BrowserMockProps) {
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
