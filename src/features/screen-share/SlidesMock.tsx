interface SlidesMockProps {
  accent: string;
  primary: string;
}

export function SlidesMock({ accent }: SlidesMockProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center bg-bg-deep p-[60px]">
      <div className="absolute left-6 top-6 font-body text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>SLIDE 04 / 12</div>
      <div className="flex max-w-[800px] flex-col gap-6">
        <div className="h-1 w-20 rounded-sm" style={{ background: `linear-gradient(90deg, ${primary}, ${accent})` }} />
        <div className="font-heading text-[64px] leading-[1.05] text-white">
          Por que comunidade<br />importa em <span style={{ color: accent }}>2026?</span>
        </div>
        <div className="font-body text-[22px] leading-[1.4] text-white/70">Networking, mentoria e oportunidades reais — não dá pra escalar sozinho.</div>
        <div className="mt-4 flex gap-8">
          {[{ n: "80K+", l: "membros" }, { n: "15K", l: "mensagens/dia" }, { n: "120+", l: "eventos/ano" }].map((s, i) => (
            <div key={i}>
              <div className="font-heading text-[38px]" style={{ color: accent }}>{s.n}</div>
              <div className="font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
