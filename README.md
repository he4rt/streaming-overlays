# Heart Talks - Streaming Overlay System

Sistema de overlays para OBS usado nas lives do Heart Talks (He4rt Developers). Cada cena da live é uma rota React renderizada como Browser Source no OBS a 1920x1080.

## Quick Start

```bash
npm install
npm run dev
```

O dev server sobe em `http://localhost:5173`. Abra `/admin` no browser pra gerenciar tudo.

## Cenas

| Rota            | Cena OBS     | Descricao                                                                               |
| --------------- | ------------ | --------------------------------------------------------------------------------------- |
| `/preshow`      | Pre-Show     | Host solo antes do convidado entrar                                                     |
| `/two-cams`     | Two Cams     | Duas cameras lado a lado (layout principal)                                             |
| `/screen-share` | Screen Share | Tela compartilhada + 2 mini cameras                                                     |
| `/starting`     | Starting     | Countdown antes da live (4 variantes)                                                   |
| `/ending`       | Ending       | Mural da comunidade com stats                                                           |
| `/brb`          | BRB          | Intervalo com timer                                                                     |
| `/question`     | Question     | Pergunta da audiencia em destaque                                                       |
| `/poll`         | Poll         | Enquete ao vivo com votos                                                               |
| `/quote`        | Quote        | Citacao marcante (3 variantes)                                                          |
| `/admin`        | -            | Painel de controle (nao vai pro OBS)                                                    |
| `/dev`          | -            | Mostra tela que está indo pro obs, com botões de navegação entre cenas(nao vai pro OBS) |
| `/`             | -            | Mostra o que está indo para o OBS com base no que está selecionado em /admin ou /dev    |

## Admin Panel

Acesse `http://localhost:5173/admin` no browser. Funciona como um stream manager estilo Twitch:

- **Scene switcher** com botao "Abrir Scene" pra preview em janela 1920x1080
- **Toggles** pra ligar/desligar: chat, top bar, lower third, ticker, particulas, camera placeholders
- **Config em tempo real** de todos os textos, cores, convidados, episodio
- **Chat toggle** LIVE/TESTE - alterna entre Restream WebSocket e mensagens de teste

Todas as alteracoes sao sincronizadas via HTTP API (`/api/config`) — funciona tanto no browser quanto nas Browser Sources do OBS.

## OBS Setup

### Importar Scene Collection

1. Copie `obs/he4rt-talks.json` para a pasta de scene collections do OBS:
   - **Linux (Flatpak):** `~/.var/app/com.obsproject.Studio/config/obs-studio/basic/scenes/`
   - **Linux (nativo):** `~/.config/obs-studio/basic/scenes/`
   - **macOS:** `~/Library/Application Support/obs-studio/basic/scenes/`
   - **Windows:** `%APPDATA%/obs-studio/basic/scenes/`
2. Reinicie o OBS e selecione "He4rt Talks" em Scene Collection

### Setup Manual

Pra cada cena, crie uma Browser Source com:

- **URL:** `http://localhost:5173/{rota}`
- **Width:** 1920
- **Height:** 1080
- **CSS:** `body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }`

### Chroma Key (Camera Placeholders)

Desative "Camera Placeholders" no admin. As areas de camera ficam verde (`#00FF00`). Adicione um filtro **Chroma Key** na Browser Source e posicione sua webcam como source abaixo da overlay.

## Arquitetura

```
src/
  features/          # uma pasta por cena/feature
    admin/           # painel de controle (Tailwind CSS)
    preshow/         # host solo
    two-cams/        # duas cameras
    screen-share/    # compartilhamento de tela
    starting/        # countdown (v1-v4)
    ending/          # mural + stats
    brb/             # intervalo
    question/        # pergunta da audiencia
    poll/            # enquete
    quote/           # citacao (editorial/serif/minimal)
    overlay/         # chrome compartilhado (TopBar, LowerThird, Ticker)
    stage/           # viewport 1920x1080 com scaling
  shared/
    components/      # CameraFrame, MiniCamera, HeartLogo, ParticleField...
    chat/            # ChatPanel, BubbleChatStrip, TerminalChat, MarqueeChat...
  hooks/
    useOverlayConfig # polling HTTP /api/config (200ms)
    useRestreamChat  # WebSocket Restream (Twitch + Kick)
    ChatProvider     # Context de chat com fallback HTTP pra OBS
    useCountdown     # timer regressivo
    useStageScale    # scaling responsivo do viewport
  config/
    defaults.ts      # valores padrao de todos os campos
```

### Sync Admin -> OBS

O Vite dev server inclui um plugin com dois endpoints in-memory:

- `GET/POST /api/config` — configuracao da overlay
- `GET/POST /api/chat` — mensagens de chat

O admin (Chrome) faz POST quando algo muda. As overlays (OBS Browser Sources) fazem GET polling. Isso resolve o problema do browser do OBS ser isolado e nao compartilhar localStorage nem WebSocket com o Chrome.

### Chat (Restream)

O chat integra com Restream via WebSocket, recebendo mensagens de Twitch e Kick com deduplicacao por `eventIdentifier`. Configurar o token em `src/hooks/useRestreamChat.ts`.

No OBS, o WebSocket pode nao funcionar no browser embarcado. O ChatProvider faz fallback automatico: se o WebSocket nao produz mensagens, ele faz polling de `/api/chat` (alimentado pelo Chrome onde o WebSocket funciona).

## Tech Stack

- **Vite 6** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS v4** (apenas no admin panel)
- **Inline styles** nas overlays (pixel-perfect pra OBS)
- **React Router v7** (uma rota por cena)
- **Russo One** + **Inter** (Google Fonts)

## Scripts

```bash
npm run dev       # dev server na porta 5173
npm run build     # build de producao
npm run preview   # servir build local
npm run restream  # listener WebSocket do Restream (requer .env com RESTREAM_CHAT_TOKEN)
```
