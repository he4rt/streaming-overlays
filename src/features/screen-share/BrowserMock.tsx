interface BrowserMockProps {
  accent: string;
  primary: string;
}

export function BrowserMock({ primary }: BrowserMockProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex h-[42px] items-center gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4">
        <div className="flex gap-1 text-[#8b949e]"><span>←</span><span>→</span><span>⟳</span></div>
        <div className="flex-1 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 font-body text-xs text-[#57606a]">🔒 he4rtdevs.com.br/comunidade</div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-[60px] font-body">
        <div className="font-heading text-[56px] leading-[1.05] text-[#1f2328]">
          A maior comunidade<br /><span style={{ color: primary }}>dev do Brasil</span>
        </div>
        <div className="max-w-[600px] text-lg text-[#57606a]">Mais de 80 mil devs trocando código, carreira e cervejas no nosso Discord.</div>
        <div className="flex gap-3">
          <div className="rounded-[10px] px-7 py-3.5 text-base font-bold text-white" style={{ background: primary }}>Entrar no Discord</div>
          <div className="rounded-[10px] border-2 px-[26px] py-3 text-base font-bold" style={{ borderColor: primary, color: primary }}>GitHub</div>
        </div>
      </div>
    </div>
  );
}
