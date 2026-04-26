/* eslint-disable */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────
// Chat panel
// ─────────────────────────────────────────────
const SAMPLE_CHAT = [
  { user: 'devbruno', color: '#A855F7', msg: 'opaaa galera, cheguei!', badge: 'sub' },
  { user: 'mariana_dev', color: '#EC4899', msg: 'que papo bom 🔥' },
  { user: 'jpcoder',     color: '#22D3EE', msg: 'pergunta: vale a pena começar com Rust em 2026?' },
  { user: 'he4rt_bot',   color: '#FACC15', msg: 'novo seguidor: @rafa.dev', badge: 'mod' },
  { user: 'sara.tech',   color: '#A855F7', msg: 'cervejinha gelada aqui também 🍻' },
  { user: 'igorzinho',   color: '#34D399', msg: 'concordo total, comunidade é tudo' },
  { user: 'paula_qa',    color: '#F97316', msg: 'manda salve pra Recife!' },
  { user: 'tio_dev',     color: '#A855F7', msg: 'esse setup tá muito limpo' },
  { user: 'nina.codes',  color: '#EC4899', msg: 'queria mais episódios sobre carreira' },
  { user: 'lucasv',      color: '#22D3EE', msg: 'first time aqui, viciado já' },
  { user: 'he4rt_bot',   color: '#FACC15', msg: 'enquete aberta: próximo convidado?', badge: 'mod' },
  { user: 'gabi.dev',    color: '#A855F7', msg: 'salve salve da Bahia 🌴' },
];

function ChatPanel({ tweaks }) {
  const { primary, accent, bgPanel, panelOpacity, chatTitle } = tweaks;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 8));
  const listRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[(prev.length) % SAMPLE_CHAT.length];
        const newList = [...prev.slice(-9), { ...next, key: Date.now() }];
        return newList;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{
      position: 'absolute',
      right: 30, top: 30,
      width: 420, height: 760,
      background: `linear-gradient(180deg, ${bgPanel}E6 0%, ${bgPanel}${Math.floor(panelOpacity * 255).toString(16).padStart(2, '0')} 100%)`,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: `1px solid rgba(168,85,247,0.35)`,
      borderRadius: 20,
      boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.15) inset, 0 0 60px rgba(124,58,237,0.15)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* corner accent */}
      <div style={{
        position: 'absolute', top: -1, right: -1, width: 70, height: 70,
        background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
        borderTopRightRadius: 20,
        clipPath: 'polygon(40% 0, 100% 0, 100% 60%, 100% 100%, 60% 100%, 100% 60%, 40% 0)',
        opacity: 0.95,
      }}>
        <div style={{
          position: 'absolute', top: 12, right: 12, color: '#fff',
        }}>
          <HeartMark size={26} color="#fff" />
        </div>
      </div>

      {/* header */}
      <div style={{
        padding: '24px 26px 18px', borderBottom: `1px solid rgba(168,85,247,0.22)`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: primary, padding: '6px 14px', borderRadius: 99,
          fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
          color: '#fff', letterSpacing: '0.1em',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#fff',
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          AO VIVO
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: "'Russo One', sans-serif",
          fontSize: 28, color: '#fff', letterSpacing: '0.02em',
          lineHeight: 1.05,
        }}>
          {chatTitle}
        </div>
        <div style={{
          marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em',
        }}>
          discord.app/he4rt · #live-chat
        </div>
      </div>

      {/* messages */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '18px 22px',
        display: 'flex', flexDirection: 'column', gap: 14,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
      }}>
        {messages.map((m, i) => (
          <ChatRow key={(m.key || 0) + '-' + i} msg={m} accent={accent} primary={primary} entering={i === messages.length - 1} />
        ))}
      </div>

      {/* input bar */}
      <div style={{
        padding: '14px 18px',
        borderTop: `1px solid rgba(168,85,247,0.22)`,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: 10, padding: '10px 14px',
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
        }}>
          envie sua mensagem…
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${primary}, ${accent})`,
          width: 40, height: 40, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChatRow({ msg, accent, primary, entering }) {
  return (
    <div style={{
      display: 'flex', gap: 11, alignItems: 'flex-start',
      animation: entering ? 'slideIn 0.4s ease-out' : 'none',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: `linear-gradient(135deg, ${msg.color}, ${msg.color}99)`,
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
        color: '#fff', textTransform: 'uppercase',
        boxShadow: `0 2px 8px ${msg.color}55`,
      }}>
        {msg.user[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {msg.badge && (
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 800,
              color: '#fff', background: msg.badge === 'mod' ? '#22C55E' : primary,
              padding: '2px 6px', borderRadius: 4, letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>{msg.badge}</span>
          )}
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 700,
            color: msg.color,
          }}>{msg.user}</span>
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          color: 'rgba(255,255,255,0.92)', lineHeight: 1.4,
          marginTop: 2, wordBreak: 'break-word',
        }}>
          {msg.msg}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Top bar — episode title, live badge, viewers
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Discrete chat — minimal floating panel for starting/ending scenes
// ─────────────────────────────────────────────
function DiscreteChatPanel({ tweaks }) {
  const { primary, accent } = tweaks;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 6));
  const listRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[(prev.length) % SAMPLE_CHAT.length];
        return [...prev.slice(-6), { ...next, key: Date.now() }];
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={{
      position: 'absolute',
      right: 40, bottom: 40,
      width: 360, height: 380,
      background: 'rgba(11,4,24,0.55)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${accent}33`,
      borderRadius: 16,
      boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* header */}
      <div style={{
        padding: '12px 18px',
        borderBottom: `1px solid ${accent}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
          color: 'rgba(255,255,255,0.85)', letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: accent,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          chat ao vivo
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
        }}>discord.app/he4rt</div>
      </div>

      {/* messages */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '14px 18px',
        display: 'flex', flexDirection: 'column', gap: 10,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
      }}>
        {messages.map((m, i) => (
          <div key={(m.key || 0) + '-' + i} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            animation: i === messages.length - 1 ? 'slideIn 0.4s ease-out' : 'none',
            opacity: 0.92,
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              color: m.color, flexShrink: 0,
            }}>{m.user}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12.5,
              color: 'rgba(255,255,255,0.78)', lineHeight: 1.4,
              wordBreak: 'break-word',
            }}>{m.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


Object.assign(window, { SAMPLE_CHAT, ChatPanel, ChatRow, DiscreteChatPanel, TerminalChat, BubbleChatStrip, MarqueeChat });

// ─────────────────────────────────────────────
// TerminalChat — chat as a fake terminal feed (left side, monospace)
// ─────────────────────────────────────────────
function TerminalChat({ tweaks, x = 60, y = null, w = 460, h = 540 }) {
  const { accent, primary } = tweaks;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 8));
  const listRef = useRef(null);
  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[(prev.length) % SAMPLE_CHAT.length];
        return [...prev.slice(-9), { ...next, key: Date.now() }];
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  const positionStyle = y == null
    ? { left: x, bottom: 60 }
    : { left: x, top: y };

  return (
    <div style={{
      position: 'absolute', ...positionStyle,
      width: w, height: h,
      background: 'rgba(8,2,18,0.78)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${accent}44`,
      borderRadius: 12,
      boxShadow: `0 30px 80px rgba(0,0,0,0.5)`,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    }}>
      {/* terminal header */}
      <div style={{
        height: 32, background: 'rgba(0,0,0,0.4)',
        borderBottom: `1px solid ${accent}33`,
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{
          flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.55)',
          fontSize: 12, letterSpacing: '0.04em',
        }}>he4rt@talks ~ /live-chat</span>
        <span style={{
          fontSize: 10, color: accent, fontWeight: 700, letterSpacing: '0.15em',
        }}>● TAIL -F</span>
      </div>
      {/* feed */}
      <div ref={listRef} style={{
        flex: 1, overflow: 'hidden', padding: '14px 16px',
        display: 'flex', flexDirection: 'column', gap: 6,
        fontSize: 13.5, lineHeight: 1.55,
        maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 100%)',
      }}>
        {messages.map((m, i) => {
          const ts = new Date(m.key || Date.now()).toLocaleTimeString('pt-BR', { hour12: false });
          return (
            <div key={(m.key || 0) + '-' + i} style={{
              display: 'flex', gap: 8,
              animation: i === messages.length - 1 ? 'slideIn 0.3s ease-out' : 'none',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>[{ts}]</span>
              <span style={{ color: m.color, fontWeight: 700, flexShrink: 0 }}>{m.user}</span>
              <span style={{ color: accent }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.88)', flex: 1, wordBreak: 'break-word' }}>{m.msg}</span>
            </div>
          );
        })}
      </div>
      {/* prompt */}
      <div style={{
        padding: '10px 16px', borderTop: `1px solid ${accent}22`,
        background: 'rgba(0,0,0,0.3)',
        fontSize: 13, color: 'rgba(255,255,255,0.6)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: '#7ee787' }}>he4rt@talks</span>
        <span style={{ color: accent }}>$</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>aguardando você...</span>
        <span style={{
          display: 'inline-block', width: 8, height: 14, marginLeft: 'auto',
          background: accent, animation: 'pulse 1s steps(2) infinite',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BubbleChatStrip — large, friendly bubbles stacked vertically (one column)
// ─────────────────────────────────────────────
function BubbleChatStrip({ tweaks, side = 'right' }) {
  const { accent, primary } = tweaks;
  const [messages, setMessages] = useState(SAMPLE_CHAT.slice(0, 4));
  useEffect(() => {
    const id = setInterval(() => {
      setMessages((prev) => {
        const next = SAMPLE_CHAT[(prev.length) % SAMPLE_CHAT.length];
        return [...prev.slice(-3), { ...next, key: Date.now() }];
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      [side]: 60, top: 100, bottom: 100,
      width: 360,
      display: 'flex', flexDirection: 'column-reverse', gap: 16,
      pointerEvents: 'none',
    }}>
      {messages.slice().reverse().map((m, i) => (
        <div key={(m.key || 0) + '-' + i} style={{
          background: i === 0 ? `linear-gradient(135deg, ${primary}DD, ${accent}DD)` : 'rgba(11,4,24,0.72)',
          backdropFilter: 'blur(14px)',
          border: i === 0 ? 'none' : `1px solid ${accent}33`,
          borderRadius: 18,
          borderBottomRightRadius: side === 'right' ? 4 : 18,
          borderBottomLeftRadius: side === 'left' ? 4 : 18,
          padding: '14px 18px',
          opacity: Math.max(0.35, 1 - i * 0.18),
          transform: i === 0 ? 'scale(1)' : `scale(${1 - i * 0.04})`,
          transformOrigin: side === 'right' ? 'right bottom' : 'left bottom',
          animation: i === 0 ? 'slideIn 0.4s ease-out' : 'none',
          boxShadow: i === 0 ? `0 12px 32px ${primary}55` : '0 6px 20px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: i === 0 ? 'rgba(255,255,255,0.25)' : `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 800,
              color: '#fff', textTransform: 'uppercase',
            }}>{m.user[0]}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              color: i === 0 ? '#fff' : m.color, letterSpacing: '0.02em',
            }}>{m.user}</div>
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15,
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.88)',
            lineHeight: 1.4,
          }}>{m.msg}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MarqueeChat — horizontal scrolling chat strip (single line, bottom)
// ─────────────────────────────────────────────
function MarqueeChat({ tweaks }) {
  const { accent, primary } = tweaks;
  const items = SAMPLE_CHAT.concat(SAMPLE_CHAT);
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 80,
      height: 56, overflow: 'hidden',
      background: 'linear-gradient(90deg, rgba(11,4,24,0) 0%, rgba(11,4,24,0.85) 8%, rgba(11,4,24,0.85) 92%, rgba(11,4,24,0) 100%)',
      borderTop: `1px solid ${accent}22`,
      borderBottom: `1px solid ${accent}22`,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 40,
        animation: 'marqueeChat 80s linear infinite',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        {items.map((m, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            paddingLeft: i === 0 ? 60 : 0,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 800,
              color: '#fff', textTransform: 'uppercase', flexShrink: 0,
            }}>{m.user[0]}</div>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
              color: m.color,
            }}>{m.user}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
            }}>{m.msg}</span>
            <span style={{ color: `${accent}66`, fontSize: 18, marginLeft: 4 }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
