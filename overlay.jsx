/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakToggle, TweakColor, TweakText, TweakRadio, TweakSelect */

const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showChat": true,
  "showLowerThird": true,
  "showTopBar": true,
  "showCornerLogo": true,
  "showTicker": true,
  "showLiveBadge": true,
  "showHeartParticles": true,
  "scene": "brb",
  "startingVariant": "v1",
  "quoteVariant": "editorial",
  "quoteText": "A melhor tecnologia é aquela que some — você só percebe que ela existe quando para de funcionar.",
  "quoteAuthor": "Marina Costa",
  "quoteAuthorRole": "Senior Frontend Engineer",
  "quoteContext": "Sobre design de APIs",
  "questionAuthor": "jpcoder",
  "questionAuthorBadge": "SUB",
  "questionText": "Vale a pena começar com Rust em 2026 mesmo sem experiência com sistemas de baixo nível?",
  "questionFrom": "twitch.tv/he4rttalks",
  "questionQueue": 12,
  "pollQuestion": "O que você usaria pra começar um projeto novo em 2026?",
  "pollTotalVotes": 1847,
  "pollTimeLeft": "01:24",
  "brbDuration": 120,
  "brbTrack": "lo-fi beats to debug to · vol. 4",
  "screenContent": "code",
  "screenTitle": "live-coding · refactor da API de auth",
  "startCountdown": 180,
  "endMessage": "Valeu por hoje, galera!",
  "startingTitle": "A LIVE COMEÇA EM",
  "startingSubtitle": "Senta que o papo vai longe ☕",
  "startingCountdownSeconds": 300,
  "endingTitle": "VALEU GALERA!",
  "endingSubtitle": "Até o próximo Heart Talks 🍻",
  "primary": "#7C3AED",
  "primaryDeep": "#5B21B6",
  "accent": "#A855F7",
  "bgDeep": "#0B0418",
  "bgPanel": "#160A2A",
  "panelOpacity": 0.78,
  "guest1Name": "Marina Costa",
  "guest1Role": "Senior Frontend Engineer",
  "guest1Handle": "@marinacosta.dev",
  "guest2Name": "Lucas Pereira",
  "guest2Role": "Host · Heart Talks",
  "guest2Handle": "@lucas.he4rt",
  "episodeTitle": "Cervejinha e bate papo",
  "episodeNumber": "EP. 042",
  "topic": "Carreira, comunidade e o futuro do dev BR",
  "date": "12 DE DEZEMBRO",
  "time": "20H",
  "tickerText": "PRÓXIMO BLOCO · pergunte ao vivo em discord.app/he4rt   ●   Use #he4rttalks no X   ●   Inscreva-se no canal pra não perder",
  "chatTitle": "CHAT AO VIVO"
}/*EDITMODE-END*/;

// ─────────────────────────────────────────────
// Main overlay
// ─────────────────────────────────────────────
function Overlay() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const isFullSceneTakeover = ['starting', 'ending', 'brb', 'question', 'poll', 'quote'].includes(t.scene);

  // Background style
  const bgStyle = {
    background: `radial-gradient(ellipse at 15% 20%, ${t.primaryDeep}66 0%, transparent 50%),
                 radial-gradient(ellipse at 85% 80%, ${t.primary}55 0%, transparent 55%),
                 linear-gradient(135deg, ${t.bgDeep} 0%, #050110 100%)`,
  };

  // Camera layout — two cameras stacked vertically on left side
  // Reserve right ~450px for chat, top ~110 for bar, bottom ~150 for lower third + ticker
  const camAreaLeft = 30;
  const camAreaTop = 130;
  const camAreaRight = t.showChat ? 480 : 30;
  const camAreaBottom = 196; // lower third 110 + ticker 36 + gaps
  const camWidth = 1920 - camAreaLeft - camAreaRight;
  const camAreaH = 1080 - camAreaTop - camAreaBottom;

  // Two cameras side by side
  const gap = 24;
  const camW = (camWidth - gap) / 2;
  const camH = camAreaH;

  return (
    <div style={{ position: 'absolute', inset: 0, ...bgStyle, overflow: 'hidden' }}>
      <ParticleField enabled={t.showHeartParticles} color={t.accent} />

      {/* decorative diagonal accent lines */}
      <div style={{
        position: 'absolute', left: -100, top: -100,
        width: 400, height: 400,
        background: `linear-gradient(135deg, ${t.primary}33 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: -100, bottom: -100,
        width: 500, height: 500,
        background: `radial-gradient(circle, ${t.accent}33 0%, transparent 70%)`,
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* Top bar */}
      {t.showTopBar && !isFullSceneTakeover && <TopBar tweaks={t} />}

      {/* Scene content */}
      {t.scene === 'starting' && <StartingScene tweaks={t} />}
      {t.scene === 'ending' && <EndingScene tweaks={t} />}
      {t.scene === 'brb' && <BrbScene tweaks={t} />}
      {t.scene === 'question' && <QuestionScene tweaks={t} />}
      {t.scene === 'poll' && <PollScene tweaks={t} />}
      {t.scene === 'quote' && <QuoteScene tweaks={t} />}

      {t.scene === 'two-cams' && (
        <>
          <CameraFrame
            tweaks={t}
            x={camAreaLeft}
            y={camAreaTop}
            w={camW}
            h={camH}
            name={t.guest1Name}
            role={t.guest1Role}
            handle={t.guest1Handle}
            side="left"
          />
          <CameraFrame
            tweaks={t}
            x={camAreaLeft + camW + gap}
            y={camAreaTop}
            w={camW}
            h={camH}
            name={t.guest2Name}
            role={t.guest2Role}
            handle={t.guest2Handle}
            side="right"
          />
        </>
      )}

      {t.scene === 'screen-share' && (
        <>
          {/* Big screen-share area on the left */}
          <ScreenShare
            tweaks={t}
            x={camAreaLeft}
            y={camAreaTop}
            w={camWidth - 300}
            h={camAreaH}
          />
          {/* Two mini cams stacked on the right of the share, before the chat */}
          <div style={{
            position: 'absolute',
            left: camAreaLeft + camWidth - 280,
            top: camAreaTop,
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>
            <MiniCamera tweaks={t} name={t.guest1Name} role={t.guest1Role} side="left" />
            <MiniCamera tweaks={t} name={t.guest2Name} role={t.guest2Role} side="right" />
          </div>
        </>
      )}

      {/* Chat panel */}
      {t.showChat && !isFullSceneTakeover && <ChatPanel tweaks={t} />}

      {/* Lower third */}
      {t.showLowerThird && !isFullSceneTakeover && <LowerThird tweaks={t} />}

      {/* Ticker */}
      {t.showTicker && !isFullSceneTakeover && <TickerBar tweaks={t} />}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Layout">
          <TweakRadio label="Cena" value={t.scene} onChange={(v) => setTweak('scene', v)} options={[
            { value: 'starting', label: 'Starting' },
            { value: 'two-cams', label: '2 cams' },
            { value: 'screen-share', label: 'Screen' },
            { value: 'ending', label: 'Ending' },
          ]} />
          <TweakSelect label="Cenas extras" value={t.scene} onChange={(v) => setTweak('scene', v)} options={[
            { value: 'starting', label: '— (cena base)' },
            { value: 'brb', label: 'BRB · Pausa' },
            { value: 'question', label: 'Pergunta da audiência' },
            { value: 'poll', label: 'Enquete ao vivo' },
            { value: 'quote', label: 'Highlight / Quote' },
          ]} />
          {t.scene === 'starting' && (
            <TweakSelect label="Variação Starting" value={t.startingVariant} onChange={(v) => setTweak('startingVariant', v)} options={[
              { value: 'v1', label: 'V1 · Splash circular + chat discreto' },
              { value: 'v2', label: 'V2 · Neon grid + chat terminal' },
              { value: 'v3', label: 'V3 · Pôster + portraits + bubbles' },
              { value: 'v4', label: 'V4 · Tipografia + chat marquee' },
            ]} />
          )}
          <TweakSelect label="Conteúdo da tela" value={t.screenContent} onChange={(v) => setTweak('screenContent', v)} options={[
            { value: 'code', label: 'Código (VSCode)' },
            { value: 'browser', label: 'Browser' },
            { value: 'slides', label: 'Slides' },
          ]} />
          <TweakText label="Título da janela" value={t.screenTitle} onChange={(v) => setTweak('screenTitle', v)} />
          <TweakToggle label="Top bar" value={t.showTopBar} onChange={(v) => setTweak('showTopBar', v)} />
          <TweakToggle label="Chat lateral" value={t.showChat} onChange={(v) => setTweak('showChat', v)} />
          <TweakToggle label="Lower third" value={t.showLowerThird} onChange={(v) => setTweak('showLowerThird', v)} />
          <TweakToggle label="Ticker" value={t.showTicker} onChange={(v) => setTweak('showTicker', v)} />
          <TweakToggle label="Live badge" value={t.showLiveBadge} onChange={(v) => setTweak('showLiveBadge', v)} />
          <TweakToggle label="Partículas" value={t.showHeartParticles} onChange={(v) => setTweak('showHeartParticles', v)} />
        </TweakSection>
        <TweakSection title="Cores">
          <TweakColor label="Primary" value={t.primary} onChange={(v) => setTweak('primary', v)} />
          <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak('accent', v)} />
          <TweakColor label="Primary deep" value={t.primaryDeep} onChange={(v) => setTweak('primaryDeep', v)} />
          <TweakColor label="BG deep" value={t.bgDeep} onChange={(v) => setTweak('bgDeep', v)} />
          <TweakColor label="BG painel" value={t.bgPanel} onChange={(v) => setTweak('bgPanel', v)} />
          <TweakSlider label="Opacidade painel" value={t.panelOpacity} onChange={(v) => setTweak('panelOpacity', v)} min={0.3} max={1} step={0.05} />
        </TweakSection>
        <TweakSection title="Episódio">
          <TweakText label="Número" value={t.episodeNumber} onChange={(v) => setTweak('episodeNumber', v)} />
          <TweakText label="Título" value={t.episodeTitle} onChange={(v) => setTweak('episodeTitle', v)} />
          <TweakText label="Tópico" value={t.topic} onChange={(v) => setTweak('topic', v)} />
          <TweakText label="Data" value={t.date} onChange={(v) => setTweak('date', v)} />
          <TweakText label="Horário" value={t.time} onChange={(v) => setTweak('time', v)} />
          <TweakText label="Título Starting" value={t.startingTitle} onChange={(v) => setTweak('startingTitle', v)} />
          <TweakText label="Subtítulo Starting" value={t.startingSubtitle} onChange={(v) => setTweak('startingSubtitle', v)} />
          <TweakSlider label="Countdown (s)" value={t.startingCountdownSeconds} onChange={(v) => setTweak('startingCountdownSeconds', v)} min={10} max={1800} step={10} />
          <TweakText label="Título Ending" value={t.endingTitle} onChange={(v) => setTweak('endingTitle', v)} />
          <TweakText label="Subtítulo Ending" value={t.endingSubtitle} onChange={(v) => setTweak('endingSubtitle', v)} />
          <TweakText label="Ticker" value={t.tickerText} onChange={(v) => setTweak('tickerText', v)} />
        </TweakSection>
        <TweakSection title="Convidado 1 (esquerda)">
          <TweakText label="Nome" value={t.guest1Name} onChange={(v) => setTweak('guest1Name', v)} />
          <TweakText label="Profissão" value={t.guest1Role} onChange={(v) => setTweak('guest1Role', v)} />
          <TweakText label="Handle" value={t.guest1Handle} onChange={(v) => setTweak('guest1Handle', v)} />
        </TweakSection>
        <TweakSection title="Host (direita)">
          <TweakText label="Nome" value={t.guest2Name} onChange={(v) => setTweak('guest2Name', v)} />
          <TweakText label="Profissão" value={t.guest2Role} onChange={(v) => setTweak('guest2Role', v)} />
          <TweakText label="Handle" value={t.guest2Handle} onChange={(v) => setTweak('guest2Handle', v)} />
        </TweakSection>
        <TweakSection title="Chat">
          <TweakText label="Título" value={t.chatTitle} onChange={(v) => setTweak('chatTitle', v)} />
        </TweakSection>
        {t.scene === 'brb' && (
          <TweakSection title="BRB / Pausa">
            <TweakText label="Track tocando" value={t.brbTrack} onChange={(v) => setTweak('brbTrack', v)} />
          </TweakSection>
        )}
        {t.scene === 'question' && (
          <TweakSection title="Pergunta">
            <TweakText label="Autor" value={t.questionAuthor} onChange={(v) => setTweak('questionAuthor', v)} />
            <TweakText label="Badge (SUB/MOD/etc)" value={t.questionAuthorBadge} onChange={(v) => setTweak('questionAuthorBadge', v)} />
            <TweakText label="Texto" value={t.questionText} onChange={(v) => setTweak('questionText', v)} />
            <TweakText label="Origem" value={t.questionFrom} onChange={(v) => setTweak('questionFrom', v)} />
            <TweakSlider label="Fila de perguntas" value={t.questionQueue} onChange={(v) => setTweak('questionQueue', v)} min={0} max={99} step={1} />
          </TweakSection>
        )}
        {t.scene === 'poll' && (
          <TweakSection title="Enquete">
            <TweakText label="Pergunta" value={t.pollQuestion} onChange={(v) => setTweak('pollQuestion', v)} />
            <TweakSlider label="Total de votos" value={t.pollTotalVotes} onChange={(v) => setTweak('pollTotalVotes', v)} min={0} max={9999} step={1} />
            <TweakText label="Tempo restante" value={t.pollTimeLeft} onChange={(v) => setTweak('pollTimeLeft', v)} />
          </TweakSection>
        )}
        {t.scene === 'quote' && (
          <TweakSection title="Quote / Highlight">
            <TweakSelect label="Variação" value={t.quoteVariant} onChange={(v) => setTweak('quoteVariant', v)} options={[
              { value: 'editorial', label: 'Editorial · split + portrait' },
              { value: 'serif', label: 'Serif · centralizado clássico' },
              { value: 'minimal', label: 'Minimal · só tipografia' },
            ]} />
            <TweakText label="Frase" value={t.quoteText} onChange={(v) => setTweak('quoteText', v)} />
            <TweakText label="Autor" value={t.quoteAuthor} onChange={(v) => setTweak('quoteAuthor', v)} />
            <TweakText label="Função do autor" value={t.quoteAuthorRole} onChange={(v) => setTweak('quoteAuthorRole', v)} />
            <TweakText label="Contexto" value={t.quoteContext} onChange={(v) => setTweak('quoteContext', v)} />
          </TweakSection>
        )}
      </TweaksPanel>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stage — 1920x1080 scaled to viewport (letterboxed)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Stage — 1920x1080 scaled to viewport (letterboxed)
// ─────────────────────────────────────────────
function Stage() {
  const [scale, setScale] = useState(1);
  const wrapRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth || document.documentElement.clientWidth || 1920;
      const h = window.innerHeight || document.documentElement.clientHeight || 1080;
      const s = Math.min(w / 1920, h / 1080);
      if (!isFinite(s) || s <= 0) return;
      setScale(s);
    };
    update();
    window.addEventListener('resize', update);
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(document.documentElement);
    }
    const raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener('resize', update);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 1920, height: 1080, position: 'relative',
        transform: `scale(${scale})`, transformOrigin: 'center center',
        flexShrink: 0,
      }}>
        <Overlay />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Stage />);

ReactDOM.createRoot(document.getElementById('root')).render(<Stage />);
