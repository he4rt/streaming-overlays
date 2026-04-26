interface CodeMockProps {
  accent: string;
  primary: string;
}

export function CodeMock({ accent }: CodeMockProps) {
  const lines = [
    { n: 1, t: "import", c: "#ff7b72", rest: " { useState, useEffect } ", s: "#79c0ff", w: "from 'react';" },
    { n: 2, t: "", c: "", rest: "", s: "", w: "" },
    { n: 3, t: "// authentication context", c: "#8b949e", rest: "", s: "", w: "" },
    { n: 4, t: "export", c: "#ff7b72", rest: " ", s: "", w: "" },
    { n: 5, t: "function", c: "#ff7b72", rest: " ", s: "#d2a8ff", w: "useAuth() {" },
    { n: 6, t: "  const", c: "#ff7b72", rest: " [user, setUser] = ", s: "#79c0ff", w: "useState(null);" },
    { n: 7, t: "  const", c: "#ff7b72", rest: " [loading, setLoading] = ", s: "#79c0ff", w: "useState(true);" },
    { n: 8, t: "", c: "", rest: "", s: "", w: "" },
    { n: 9, t: "  useEffect", c: "#d2a8ff", rest: "(() => {", s: "", w: "" },
    { n: 10, t: "    const", c: "#ff7b72", rest: " token = localStorage.", s: "#d2a8ff", w: "getItem('he4rt_token');" },
    { n: 11, t: "    if", c: "#ff7b72", rest: " (token) {", s: "", w: "" },
    { n: 12, t: "      verifyToken", c: "#d2a8ff", rest: "(token).", s: "#d2a8ff", w: "then(setUser);" },
    { n: 13, t: "    }", c: "", rest: "", s: "", w: "" },
    { n: 14, t: "    setLoading", c: "#d2a8ff", rest: "(", s: "#79c0ff", w: "false);" },
    { n: 15, t: "  }, []);", c: "", rest: "", s: "", w: "" },
    { n: 16, t: "", c: "", rest: "", s: "", w: "" },
    { n: 17, t: "  return", c: "#ff7b72", rest: " { user, loading, signIn, signOut };", s: "", w: "" },
    { n: 18, t: "}", c: "", rest: "", s: "", w: "" },
  ];

  return (
    <div className="relative flex flex-1 overflow-hidden font-mono">
      {/* sidebar */}
      <div className="w-[220px] border-r border-[#21262d] bg-[#0d1117] px-0 py-3.5 text-[13px] text-[#8b949e]">
        <div className="px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c9d1d9]">EXPLORER</div>
        <div className="mt-2.5">
          {["📁 he4rt-talks", "  📁 src", "    📁 hooks", "      📄 useAuth.ts", "      📄 useChat.ts", "    📁 components", "    📁 pages", "  📄 package.json", "  📄 README.md"].map((f, i) => (
            <div key={i} className="px-4 py-[3px] text-[12.5px]"
              style={{ background: f.includes("useAuth") ? "#1f6feb33" : "transparent", color: f.includes("useAuth") ? "#fff" : "#8b949e" }}>
              {f}
            </div>
          ))}
        </div>
      </div>
      {/* code area */}
      <div className="flex-1 overflow-hidden py-3.5 text-sm leading-[22px]">
        {lines.map((l) => (
          <div key={l.n} className="flex px-4">
            <span className="mr-[18px] w-9 select-none text-right text-[#484f58]">{l.n}</span>
            <span className="text-[#c9d1d9]">
              <span style={{ color: l.c }}>{l.t}</span>
              <span>{l.rest}</span>
              <span style={{ color: l.s }}>{l.w}</span>
            </span>
          </div>
        ))}
        <div className="mt-5 border-t border-[#21262d] px-4 pt-3 text-[12.5px] text-[#8b949e]">
          <div className="text-[#7ee787]">$ npm run dev</div>
          <div>  ▲ Next.js 14.2.0</div>
          <div>  - Local:   http://localhost:3000</div>
          <div className="mt-1 text-[#7ee787]">✓ Ready in 1.2s</div>
          <div className="mt-1.5 flex items-center gap-1">
            <span style={{ color: accent }}>$</span>
            <span className="text-[#c9d1d9]">_</span>
            <span className="-ml-0.5 inline-block h-3.5 w-2 animate-[pulse_1s_steps(2)_infinite] bg-[#c9d1d9]" />
          </div>
        </div>
      </div>
    </div>
  );
}
