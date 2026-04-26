# Heart Talks Overlay — Vite + TSX Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Heart Talks streaming overlay from a CDN-loaded React+Babel setup to a proper Vite + TypeScript + Tailwind CSS app with feature-driven architecture, where each OBS scene is a separate route.

**Architecture:** Feature-driven structure under `src/features/` — one feature per OBS scene (starting, ending, brb, question, poll, quote, two-cams, screen-share). Shared UI primitives (HeartLogo, HeartMark, CameraFrame, ParticleField, chat components, etc.) live in `src/shared/`. React Router provides routes so each scene has its own URL for OBS Browser Sources. A WebSocket hook wraps the Restream chat listener for real-time chat data. The TweaksPanel is dropped — OBS controls scenes via URL routes; per-scene config comes from a centralized defaults file.

**Tech Stack:** Vite, React 18, TypeScript (TSX), Tailwind CSS v4, React Router v7

---

## File Structure

```
src/
├── main.tsx                          # entry point — mounts <App/>
├── App.tsx                           # <BrowserRouter> with all scene routes
├── index.css                         # Tailwind directives + global keyframes
├── vite-env.d.ts                     # Vite client types
│
├── config/
│   ├── defaults.ts                   # TWEAK_DEFAULTS object (typed)
│   └── theme.ts                      # Tailwind color tokens as TS constants
│
├── hooks/
│   ├── useCountdown.ts               # countdown timer (used by starting, brb)
│   ├── useStageScale.ts              # 1920×1080 letterbox scaling
│   └── useRestreamChat.ts            # WebSocket connection to Restream
│
├── shared/
│   ├── components/
│   │   ├── HeartLogo.tsx             # SVG logo "HE4RT TALKS"
│   │   ├── HeartMark.tsx             # SVG "H" mark
│   │   ├── Clock.tsx                 # small clock SVG icon
│   │   ├── SocialIcon.tsx            # ig/in/gh/x/yt icons
│   │   ├── ParticleField.tsx         # canvas particle animation
│   │   ├── CameraFrame.tsx           # full camera frame + nameplate
│   │   ├── MiniCamera.tsx            # PiP camera
│   │   ├── CornerBrackets.tsx        # reusable corner bracket overlays
│   │   ├── LiveBadge.tsx             # "LIVE" / "PAUSA" / "EM BREVE" pill
│   │   ├── SocialBar.tsx             # row of social icons+handles
│   │   ├── EpisodeCard.tsx           # episode number + title + topic card
│   │   └── GradientBackground.tsx    # reusable radial/linear bg wrapper
│   │
│   ├── chat/
│   │   ├── ChatPanel.tsx             # full sidebar chat (messages + input bar)
│   │   ├── ChatRow.tsx               # single chat message row
│   │   ├── DiscreteChatPanel.tsx     # minimal floating chat
│   │   ├── TerminalChat.tsx          # terminal-styled chat feed
│   │   ├── BubbleChatStrip.tsx       # vertical bubble chat
│   │   ├── MarqueeChat.tsx           # horizontal scrolling chat
│   │   ├── BigChatFeed.tsx           # large chat feed (used by BRB)
│   │   └── sample-messages.ts        # SAMPLE_CHAT data constant
│   │
│   └── types.ts                      # TweakConfig type, ChatMessage type, etc.
│
├── features/
│   ├── stage/
│   │   └── Stage.tsx                 # 1920×1080 letterbox wrapper (uses useStageScale)
│   │
│   ├── overlay/
│   │   ├── Overlay.tsx               # "live" composite: top bar + cams + chat + lower third
│   │   ├── TopBar.tsx                # episode title, live badge, viewers
│   │   ├── LowerThird.tsx            # logo, date/time, socials
│   │   └── TickerBar.tsx             # bottom scrolling ticker
│   │
│   ├── two-cams/
│   │   └── TwoCamsScene.tsx          # two side-by-side cameras (wraps Overlay)
│   │
│   ├── screen-share/
│   │   ├── ScreenShareScene.tsx      # screen share + mini cams (wraps Overlay)
│   │   ├── ScreenShare.tsx           # screen share frame
│   │   ├── CodeMock.tsx              # code editor mock
│   │   ├── BrowserMock.tsx           # browser mock
│   │   └── SlidesMock.tsx            # slides mock
│   │
│   ├── starting/
│   │   ├── StartingScene.tsx         # router for v1–v4
│   │   ├── StartingV1.tsx            # splash + ring + discrete chat
│   │   ├── StartingV2.tsx            # neon grid + terminal chat
│   │   ├── StartingV3.tsx            # split poster + portraits + bubbles
│   │   └── StartingV4.tsx            # typography + marquee chat
│   │
│   ├── ending/
│   │   └── EndingScene.tsx           # goodbye screen with CTA + socials
│   │
│   ├── brb/
│   │   └── BrbScene.tsx              # "Já voltamos!" with timer + chat
│   │
│   ├── question/
│   │   └── QuestionScene.tsx         # audience question highlight
│   │
│   ├── poll/
│   │   ├── PollScene.tsx             # live poll with animated bars
│   │   └── PollIcon.tsx              # bar chart SVG icon
│   │
│   └── quote/
│       ├── QuoteScene.tsx            # router for editorial/serif/minimal
│       ├── QuoteEditorial.tsx        # split layout + portrait
│       ├── QuoteSerif.tsx            # classical centered
│       └── QuoteMinimal.tsx          # stripped typography
│
index.html                            # Vite HTML entry (minimal)
tailwind.config.ts                    # Tailwind config with HE4RT theme tokens
vite.config.ts                        # Vite config
tsconfig.json                         # TypeScript config
tsconfig.app.json                     # App-specific TS config
package.json                          # dependencies + scripts
.gitignore                            # Node + Vite ignores
```

---

### Task 1: Create .gitignore and clean up repository

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

```gitignore
# dependencies
node_modules/

# build output
dist/

# env files
.env
.env.local
.env.*.local

# editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Vite
*.local

# uploads (user-generated, not tracked)
uploads/

# screenshots (development artifacts)
screenshots/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore for Vite + Node project"
```

---

### Task 2: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json` (overwrite)
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `index.html` (overwrite)
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "he4rt-talks-overlay",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.4.1",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/vite": "^4.1.0",
    "typescript": "~5.7.2",
    "vite": "^6.3.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }]
}
```

- [ ] **Step 4: Create tsconfig.app.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Heart Talks · Overlay</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Russo+One&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/vite-env.d.ts**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 7: Create src/main.tsx (minimal bootstrap)**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Create src/index.css (Tailwind + global keyframes)**

```css
@import "tailwindcss";

@theme {
  --color-primary: #7C3AED;
  --color-primary-deep: #5B21B6;
  --color-accent: #A855F7;
  --color-bg-deep: #0B0418;
  --color-bg-panel: #160A2A;

  --font-heading: "Russo One", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
  font-family: var(--font-body);
}

#root {
  width: 100%;
  height: 100%;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes tickerScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marqueeChat {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes gridDrift {
  from {
    background-position: 0 0, 0 0;
  }
  to {
    background-position: 80px 80px, 80px 80px;
  }
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes startingPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes glow {
  0%,
  100% {
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.7));
  }
}
```

- [ ] **Step 9: Create src/App.tsx (placeholder with routing skeleton)**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-bg-deep text-white font-heading text-4xl">
      {name}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder name="Heart Talks Overlay" />} />
        <Route path="/starting" element={<Placeholder name="Starting" />} />
        <Route path="/two-cams" element={<Placeholder name="Two Cams" />} />
        <Route path="/screen-share" element={<Placeholder name="Screen Share" />} />
        <Route path="/brb" element={<Placeholder name="BRB" />} />
        <Route path="/question" element={<Placeholder name="Question" />} />
        <Route path="/poll" element={<Placeholder name="Poll" />} />
        <Route path="/quote" element={<Placeholder name="Quote" />} />
        <Route path="/ending" element={<Placeholder name="Ending" />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 10: Install dependencies and verify dev server starts**

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Expected: Vite dev server starts on `http://localhost:5173`, each route shows its placeholder name.

- [ ] **Step 11: Commit**

```bash
git add .gitignore index.html package.json vite.config.ts tsconfig.json tsconfig.app.json src/
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project with route skeleton"
```

---

### Task 3: Create shared types and config defaults

**Files:**
- Create: `src/shared/types.ts`
- Create: `src/config/defaults.ts`
- Create: `src/config/theme.ts`

- [ ] **Step 1: Create src/shared/types.ts**

```ts
export interface TweakConfig {
  showChat: boolean;
  showLowerThird: boolean;
  showTopBar: boolean;
  showCornerLogo: boolean;
  showTicker: boolean;
  showLiveBadge: boolean;
  showHeartParticles: boolean;
  scene: string;
  startingVariant: string;
  quoteVariant: string;
  quoteText: string;
  quoteAuthor: string;
  quoteAuthorRole: string;
  quoteContext: string;
  questionAuthor: string;
  questionAuthorBadge: string;
  questionText: string;
  questionFrom: string;
  questionQueue: number;
  pollQuestion: string;
  pollTotalVotes: number;
  pollTimeLeft: string;
  pollOptions?: PollOption[];
  brbDuration: number;
  brbTrack: string;
  screenContent: "code" | "browser" | "slides";
  screenTitle: string;
  startCountdown: number;
  endMessage: string;
  startingTitle: string;
  startingSubtitle: string;
  startingCountdownSeconds: number;
  endingTitle: string;
  endingSubtitle: string;
  primary: string;
  primaryDeep: string;
  accent: string;
  bgDeep: string;
  bgPanel: string;
  panelOpacity: number;
  guest1Name: string;
  guest1Role: string;
  guest1Handle: string;
  guest2Name: string;
  guest2Role: string;
  guest2Handle: string;
  episodeTitle: string;
  episodeNumber: string;
  topic: string;
  date: string;
  time: string;
  tickerText: string;
  chatTitle: string;
}

export interface PollOption {
  label: string;
  votes: number;
  color: string;
}

export interface ChatMessage {
  user: string;
  color: string;
  msg: string;
  badge?: string;
  key?: number;
}
```

- [ ] **Step 2: Create src/config/defaults.ts**

```ts
import type { TweakConfig } from "@/shared/types";

export const DEFAULTS: TweakConfig = {
  showChat: true,
  showLowerThird: true,
  showTopBar: true,
  showCornerLogo: true,
  showTicker: true,
  showLiveBadge: true,
  showHeartParticles: true,
  scene: "two-cams",
  startingVariant: "v1",
  quoteVariant: "editorial",
  quoteText:
    "A melhor tecnologia é aquela que some — você só percebe que ela existe quando para de funcionar.",
  quoteAuthor: "Marina Costa",
  quoteAuthorRole: "Senior Frontend Engineer",
  quoteContext: "Sobre design de APIs",
  questionAuthor: "jpcoder",
  questionAuthorBadge: "SUB",
  questionText:
    "Vale a pena começar com Rust em 2026 mesmo sem experiência com sistemas de baixo nível?",
  questionFrom: "twitch.tv/he4rttalks",
  questionQueue: 12,
  pollQuestion: "O que você usaria pra começar um projeto novo em 2026?",
  pollTotalVotes: 1847,
  pollTimeLeft: "01:24",
  brbDuration: 120,
  brbTrack: "lo-fi beats to debug to · vol. 4",
  screenContent: "code",
  screenTitle: "live-coding · refactor da API de auth",
  startCountdown: 180,
  endMessage: "Valeu por hoje, galera!",
  startingTitle: "A LIVE COMEÇA EM",
  startingSubtitle: "Senta que o papo vai longe ☕",
  startingCountdownSeconds: 300,
  endingTitle: "VALEU GALERA!",
  endingSubtitle: "Até o próximo Heart Talks 🍻",
  primary: "#7C3AED",
  primaryDeep: "#5B21B6",
  accent: "#A855F7",
  bgDeep: "#0B0418",
  bgPanel: "#160A2A",
  panelOpacity: 0.78,
  guest1Name: "Marina Costa",
  guest1Role: "Senior Frontend Engineer",
  guest1Handle: "@marinacosta.dev",
  guest2Name: "Lucas Pereira",
  guest2Role: "Host · Heart Talks",
  guest2Handle: "@lucas.he4rt",
  episodeTitle: "Cervejinha e bate papo",
  episodeNumber: "EP. 042",
  topic: "Carreira, comunidade e o futuro do dev BR",
  date: "12 DE DEZEMBRO",
  time: "20H",
  tickerText:
    "PRÓXIMO BLOCO · pergunte ao vivo em discord.app/he4rt   ●   Use #he4rttalks no X   ●   Inscreva-se no canal pra não perder",
  chatTitle: "CHAT AO VIVO",
};
```

- [ ] **Step 3: Create src/config/theme.ts**

```ts
export const THEME = {
  colors: {
    primary: "#7C3AED",
    primaryDeep: "#5B21B6",
    accent: "#A855F7",
    bgDeep: "#0B0418",
    bgPanel: "#160A2A",
    live: "#EF4444",
    success: "#22C55E",
  },
  fonts: {
    heading: "'Russo One', sans-serif",
    body: "'Inter', sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
} as const;
```

- [ ] **Step 4: Commit**

```bash
git add src/shared/types.ts src/config/
git commit -m "feat: add shared types and config defaults"
```

---

### Task 4: Create shared hooks

**Files:**
- Create: `src/hooks/useStageScale.ts`
- Create: `src/hooks/useCountdown.ts`
- Create: `src/hooks/useRestreamChat.ts`

- [ ] **Step 1: Create src/hooks/useStageScale.ts**

```ts
import { useState, useEffect } from "react";

export function useStageScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(w / 1920, h / 1080);
      if (isFinite(s) && s > 0) setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return scale;
}
```

- [ ] **Step 2: Create src/hooks/useCountdown.ts**

```ts
import { useState, useEffect } from "react";

export function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [totalSeconds]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return { remaining, mm, ss };
}
```

- [ ] **Step 3: Create src/hooks/useRestreamChat.ts**

```ts
import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage } from "@/shared/types";

const WS_URL =
  "wss://backend.chat.restream.io/ws/embed?token=54eceb28-9f1a-4117-bcfd-a84876a526d5";

export function useRestreamChat(maxMessages = 12) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout>>();

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.action === "event" && parsed.payload?.eventPayload) {
          const ep = parsed.payload.eventPayload;
          const msg: ChatMessage = {
            user: ep.author?.displayName ?? "anon",
            color: "#A855F7",
            msg: ep.text ?? "",
            key: Date.now(),
          };
          setMessages((prev) => [...prev.slice(-(maxMessages - 1)), msg]);
        }
      } catch {
        // ignore non-JSON frames
      }
    };

    ws.onclose = () => {
      reconnectTimeout.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, [maxMessages]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return messages;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useStageScale, useCountdown, and useRestreamChat hooks"
```

---

### Task 5: Create shared brand components

**Files:**
- Create: `src/shared/components/HeartLogo.tsx`
- Create: `src/shared/components/HeartMark.tsx`
- Create: `src/shared/components/Clock.tsx`
- Create: `src/shared/components/SocialIcon.tsx`
- Create: `src/shared/components/LiveBadge.tsx`
- Create: `src/shared/components/SocialBar.tsx`
- Create: `src/shared/components/CornerBrackets.tsx`
- Create: `src/shared/components/EpisodeCard.tsx`
- Create: `src/shared/components/ParticleField.tsx`
- Create: `src/shared/components/GradientBackground.tsx`

- [ ] **Step 1: Create HeartLogo.tsx**

```tsx
interface HeartLogoProps {
  size?: number;
  white?: string;
  purple?: string;
}

export function HeartLogo({
  size = 1,
  white = "#FFFFFF",
  purple = "#A855F7",
}: HeartLogoProps) {
  return (
    <svg viewBox="0 0 420 90" style={{ height: 70 * size }} className="block">
      <text
        x="0"
        y="68"
        stroke={white}
        fill="none"
        className="font-heading text-[76px] font-black"
        style={{
          strokeWidth: 3,
          paintOrder: "stroke",
          letterSpacing: "1px",
        }}
      >
        HE4RT
      </text>
      <text
        x="222"
        y="68"
        stroke={purple}
        fill="none"
        className="font-heading text-[76px] font-black"
        style={{
          strokeWidth: 3,
          paintOrder: "stroke",
          letterSpacing: "1px",
        }}
      >
        TALKS
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Create HeartMark.tsx**

```tsx
interface HeartMarkProps {
  size?: number;
  color?: string;
}

export function HeartMark({ size = 36, color = "#FFFFFF" }: HeartMarkProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="block">
      <path
        d="M5 6 L11 6 L16 14 L21 6 L27 6 L18 20 L18 26 L14 26 L14 20 Z"
        fill={color}
      />
    </svg>
  );
}
```

- [ ] **Step 3: Create Clock.tsx**

```tsx
export function Clock() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-accent"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 4: Create SocialIcon.tsx**

```tsx
interface SocialIconProps {
  kind: "ig" | "in" | "gh" | "x" | "yt";
  color: string;
}

export function SocialIcon({ kind, color }: SocialIconProps) {
  const props = { width: 18, height: 18, fill: color, viewBox: "0 0 24 24" };
  switch (kind) {
    case "ig":
      return (
        <svg {...props}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.7-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 7.9a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zm5-8.1a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
        </svg>
      );
    case "in":
      return (
        <svg {...props}>
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.6 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.46h-4.55v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V22H7.82V8z" />
        </svg>
      );
    case "gh":
      return (
        <svg {...props}>
          <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4C17.5 4.4 18.5 4.7 18.5 4.7c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.4L.9 2h7.2l5 6.6L18.9 2zm-2.5 18h2L7.7 4H5.6l10.8 16z" />
        </svg>
      );
    case "yt":
      return (
        <svg {...props}>
          <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
        </svg>
      );
  }
}
```

- [ ] **Step 5: Create LiveBadge.tsx**

```tsx
interface LiveBadgeProps {
  label?: string;
  color?: string;
}

export function LiveBadge({
  label = "LIVE",
  color = "#EF4444",
}: LiveBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-body text-xs font-extrabold tracking-[0.15em] text-white"
      style={{ background: color }}
    >
      <span className="h-2 w-2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-white" />
      {label}
    </div>
  );
}
```

- [ ] **Step 6: Create SocialBar.tsx**

```tsx
import { SocialIcon } from "./SocialIcon";

const SOCIALS = [
  { icon: "ig" as const, label: "@he4rtdevs" },
  { icon: "in" as const, label: "/he4rt" },
  { icon: "gh" as const, label: "/he4rt-developers" },
  { icon: "x" as const, label: "@he4rtdevs" },
  { icon: "yt" as const, label: "/@he4rtdevs" },
];

interface SocialBarProps {
  accent: string;
}

export function SocialBar({ accent }: SocialBarProps) {
  return (
    <div className="flex gap-3.5">
      {SOCIALS.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-[10px] border border-accent/25 bg-bg-deep/[0.78] px-3.5 py-2.5 font-body text-[13px] font-semibold text-white backdrop-blur-[10px]"
        >
          <SocialIcon kind={s.icon} color={accent} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Create CornerBrackets.tsx**

```tsx
interface CornerBracketsProps {
  color?: string;
  size?: number;
  inset?: number;
  strokeWidth?: number;
}

export function CornerBrackets({
  color = "#A855F7",
  size = 22,
  inset = 14,
  strokeWidth = 2,
}: CornerBracketsProps) {
  const border = `${strokeWidth}px solid ${color}`;
  const corners = [
    { top: inset, left: inset, borderTop: border, borderLeft: border },
    { top: inset, right: inset, borderTop: border, borderRight: border },
    { bottom: inset, left: inset, borderBottom: border, borderLeft: border },
    { bottom: inset, right: inset, borderBottom: border, borderRight: border },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <div
          key={i}
          className="absolute"
          style={{ width: size, height: size, ...style }}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 8: Create EpisodeCard.tsx**

```tsx
import { Clock } from "./Clock";

interface EpisodeCardProps {
  episodeNumber: string;
  episodeTitle: string;
  topic: string;
  date: string;
  time: string;
  primary: string;
  accent: string;
}

export function EpisodeCard({
  episodeNumber,
  episodeTitle,
  topic,
  date,
  time,
  primary,
  accent,
}: EpisodeCardProps) {
  return (
    <div className="flex items-center gap-4.5 rounded-2xl border border-accent/25 bg-bg-deep/70 px-7 py-4.5 backdrop-blur-[14px]">
      <div
        className="rounded-lg px-4 py-2 font-heading text-lg tracking-[0.06em] text-white"
        style={{
          background: `linear-gradient(135deg, ${primary}, ${accent})`,
          boxShadow: `0 8px 24px ${primary}55`,
        }}
      >
        {episodeNumber}
      </div>
      <div className="text-left">
        <div className="font-heading text-[30px] leading-[1.1] text-white">
          {episodeTitle}
        </div>
        <div
          className="mt-1.5 font-body text-sm font-semibold uppercase tracking-[0.12em]"
          style={{ color: accent }}
        >
          {topic}
        </div>
      </div>
      <div className="mx-2 h-12.5 w-px" style={{ background: `${accent}33` }} />
      <div className="flex flex-col gap-1 font-body text-sm text-white">
        <div className="flex items-center gap-2">
          <Clock /> {date}
        </div>
        <div className="flex items-center gap-2">
          <Clock /> {time}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Create ParticleField.tsx**

Port the canvas particle animation. This uses a `<canvas>` ref and requestAnimationFrame — keeps inline style for canvas positioning since it's absolute overlay.

```tsx
import { useRef, useEffect } from "react";

interface ParticleFieldProps {
  enabled?: boolean;
  color?: string;
}

export function ParticleField({
  enabled = true,
  color = "#A855F7",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 1920;
    canvas.height = 1080;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.fillStyle = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1920;
        if (p.x > 1920) p.x = 0;
        if (p.y < 0) p.y = 1080;
        if (p.y > 1080) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.18;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [enabled, color]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
    />
  );
}
```

- [ ] **Step 10: Create GradientBackground.tsx**

```tsx
import { type ReactNode } from "react";

interface GradientBackgroundProps {
  primary: string;
  primaryDeep: string;
  accent: string;
  bgDeep: string;
  children: ReactNode;
}

export function GradientBackground({
  primary,
  primaryDeep,
  accent,
  bgDeep,
  children,
}: GradientBackgroundProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 15% 20%, ${primaryDeep}66 0%, transparent 50%),
                     radial-gradient(ellipse at 85% 80%, ${primary}55 0%, transparent 55%),
                     linear-gradient(135deg, ${bgDeep} 0%, #050110 100%)`,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 11: Commit**

```bash
git add src/shared/components/
git commit -m "feat: add shared brand and UI components"
```

---

### Task 6: Create shared chat components

**Files:**
- Create: `src/shared/chat/sample-messages.ts`
- Create: `src/shared/chat/ChatRow.tsx`
- Create: `src/shared/chat/ChatPanel.tsx`
- Create: `src/shared/chat/DiscreteChatPanel.tsx`
- Create: `src/shared/chat/TerminalChat.tsx`
- Create: `src/shared/chat/BubbleChatStrip.tsx`
- Create: `src/shared/chat/MarqueeChat.tsx`
- Create: `src/shared/chat/BigChatFeed.tsx`

This task ports all 7 chat components from `components/chat.jsx` and `components/scenes/scene-brb.jsx` (BigChatFeed). Each component receives its data via props — the parent scene decides whether to use `SAMPLE_CHAT` or real `useRestreamChat` data.

The components are large but mechanical ports: convert `React.useState` → `import { useState }`, add TypeScript interfaces, replace inline styles with Tailwind classes where clean (layout, spacing, typography), keep dynamic `style={}` for theme-color-driven gradients/shadows.

- [ ] **Step 1: Create src/shared/chat/sample-messages.ts**

```ts
import type { ChatMessage } from "@/shared/types";

export const SAMPLE_CHAT: ChatMessage[] = [
  { user: "devbruno", color: "#A855F7", msg: "opaaa galera, cheguei!", badge: "sub" },
  { user: "mariana_dev", color: "#EC4899", msg: "que papo bom 🔥" },
  { user: "jpcoder", color: "#22D3EE", msg: "pergunta: vale a pena começar com Rust em 2026?" },
  { user: "he4rt_bot", color: "#FACC15", msg: "novo seguidor: @rafa.dev", badge: "mod" },
  { user: "sara.tech", color: "#A855F7", msg: "cervejinha gelada aqui também 🍻" },
  { user: "igorzinho", color: "#34D399", msg: "concordo total, comunidade é tudo" },
  { user: "paula_qa", color: "#F97316", msg: "manda salve pra Recife!" },
  { user: "tio_dev", color: "#A855F7", msg: "esse setup tá muito limpo" },
  { user: "nina.codes", color: "#EC4899", msg: "queria mais episódios sobre carreira" },
  { user: "lucasv", color: "#22D3EE", msg: "first time aqui, viciado já" },
  { user: "he4rt_bot", color: "#FACC15", msg: "enquete aberta: próximo convidado?", badge: "mod" },
  { user: "gabi.dev", color: "#A855F7", msg: "salve salve da Bahia 🌴" },
];
```

- [ ] **Step 2–8: Port each chat component**

Each is a direct 1:1 port from the existing JSX. Convert `Object.assign(window, ...)` exports to named ES module exports. Add TypeScript props interfaces. Replace layout-only inline styles with Tailwind utility classes. Keep `style={}` for dynamic color-based values (`background: linear-gradient(...)` using `accent`/`primary` props).

Follow the same pattern for all 7 components — they are structurally identical ports.

- [ ] **Step 9: Commit**

```bash
git add src/shared/chat/
git commit -m "feat: add all shared chat components"
```

---

### Task 7: Create Stage wrapper and Overlay chrome (TopBar, LowerThird, TickerBar)

**Files:**
- Create: `src/features/stage/Stage.tsx`
- Create: `src/features/overlay/Overlay.tsx`
- Create: `src/features/overlay/TopBar.tsx`
- Create: `src/features/overlay/LowerThird.tsx`
- Create: `src/features/overlay/TickerBar.tsx`

- [ ] **Step 1: Create Stage.tsx** — 1920×1080 letterbox wrapper using `useStageScale`

```tsx
import { type ReactNode } from "react";
import { useStageScale } from "@/hooks/useStageScale";

interface StageProps {
  children: ReactNode;
}

export function Stage({ children }: StageProps) {
  const scale = useStageScale();
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      <div
        className="relative shrink-0"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2–4: Port TopBar.tsx, LowerThird.tsx, TickerBar.tsx** from `components/chrome.jsx`. Direct 1:1 ports with TypeScript interfaces using `TweakConfig` properties as props.

- [ ] **Step 5: Create Overlay.tsx** — composite layout that wraps TopBar + content slot + ChatPanel + LowerThird + TickerBar. Used by `two-cams` and `screen-share` routes.

```tsx
import { type ReactNode } from "react";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { GradientBackground } from "@/shared/components/GradientBackground";
import { TopBar } from "./TopBar";
import { LowerThird } from "./LowerThird";
import { TickerBar } from "./TickerBar";
import { ChatPanel } from "@/shared/chat/ChatPanel";

interface OverlayProps {
  children: ReactNode;
}

export function Overlay({ children }: OverlayProps) {
  const t = DEFAULTS;
  return (
    <GradientBackground
      primary={t.primary}
      primaryDeep={t.primaryDeep}
      accent={t.accent}
      bgDeep={t.bgDeep}
    >
      <ParticleField enabled={t.showHeartParticles} color={t.accent} />
      {t.showTopBar && <TopBar config={t} />}
      {children}
      {t.showChat && <ChatPanel config={t} />}
      {t.showLowerThird && <LowerThird config={t} />}
      {t.showTicker && <TickerBar config={t} />}
    </GradientBackground>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/features/stage/ src/features/overlay/
git commit -m "feat: add Stage wrapper and Overlay chrome components"
```

---

### Task 8: Create camera components and two-cams / screen-share scenes

**Files:**
- Create: `src/shared/components/CameraFrame.tsx`
- Create: `src/shared/components/MiniCamera.tsx`
- Create: `src/features/two-cams/TwoCamsScene.tsx`
- Create: `src/features/screen-share/ScreenShareScene.tsx`
- Create: `src/features/screen-share/ScreenShare.tsx`
- Create: `src/features/screen-share/CodeMock.tsx`
- Create: `src/features/screen-share/BrowserMock.tsx`
- Create: `src/features/screen-share/SlidesMock.tsx`

- [ ] **Steps 1–8: Port each component** from `components/cameras.jsx` and `components/screen-share.jsx`. Direct 1:1 TypeScript ports wrapping content inside `<Stage>` + `<Overlay>`.

- [ ] **Step 9: Commit**

```bash
git add src/shared/components/CameraFrame.tsx src/shared/components/MiniCamera.tsx src/features/two-cams/ src/features/screen-share/
git commit -m "feat: add two-cams and screen-share scenes"
```

---

### Task 9: Create starting scene (4 variants)

**Files:**
- Create: `src/features/starting/StartingScene.tsx`
- Create: `src/features/starting/StartingV1.tsx`
- Create: `src/features/starting/StartingV2.tsx`
- Create: `src/features/starting/StartingV3.tsx`
- Create: `src/features/starting/StartingV4.tsx`

- [ ] **Steps 1–5: Port each starting variant** from `components/scenes.jsx`. Each variant becomes its own file. `StartingScene.tsx` reads a `?variant=v1|v2|v3|v4` query param to select the variant, defaulting to `v1`. All wrapped in `<Stage>`.

`StartingScene.tsx` example:

```tsx
import { useSearchParams } from "react-router-dom";
import { Stage } from "@/features/stage/Stage";
import { DEFAULTS } from "@/config/defaults";
import { ParticleField } from "@/shared/components/ParticleField";
import { StartingV1 } from "./StartingV1";
import { StartingV2 } from "./StartingV2";
import { StartingV3 } from "./StartingV3";
import { StartingV4 } from "./StartingV4";

export function StartingScene() {
  const [params] = useSearchParams();
  const variant = params.get("variant") ?? "v1";
  const t = DEFAULTS;

  const Scene =
    variant === "v2"
      ? StartingV2
      : variant === "v3"
        ? StartingV3
        : variant === "v4"
          ? StartingV4
          : StartingV1;

  return (
    <Stage>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ background: t.bgDeep }}
      >
        <ParticleField enabled={t.showHeartParticles} color={t.accent} />
        <Scene config={t} />
      </div>
    </Stage>
  );
}
```

OBS URLs: `/starting`, `/starting?variant=v2`, etc.

- [ ] **Step 6: Commit**

```bash
git add src/features/starting/
git commit -m "feat: add starting scene with 4 variants"
```

---

### Task 10: Create remaining full-screen scenes (ending, brb, question, poll, quote)

**Files:**
- Create: `src/features/ending/EndingScene.tsx`
- Create: `src/features/brb/BrbScene.tsx`
- Create: `src/features/question/QuestionScene.tsx`
- Create: `src/features/poll/PollScene.tsx`
- Create: `src/features/poll/PollIcon.tsx`
- Create: `src/features/quote/QuoteScene.tsx`
- Create: `src/features/quote/QuoteEditorial.tsx`
- Create: `src/features/quote/QuoteSerif.tsx`
- Create: `src/features/quote/QuoteMinimal.tsx`

- [ ] **Steps 1–9: Port each scene** as a direct 1:1 conversion from the existing JSX files. Each scene file wraps its content in `<Stage>`. Quote scene uses `?variant=editorial|serif|minimal` query param.

- [ ] **Step 10: Commit**

```bash
git add src/features/ending/ src/features/brb/ src/features/question/ src/features/poll/ src/features/quote/
git commit -m "feat: add ending, brb, question, poll, and quote scenes"
```

---

### Task 11: Wire up App.tsx with final routing

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update App.tsx with real scene imports**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Stage } from "@/features/stage/Stage";
import { Overlay } from "@/features/overlay/Overlay";
import { TwoCamsScene } from "@/features/two-cams/TwoCamsScene";
import { ScreenShareScene } from "@/features/screen-share/ScreenShareScene";
import { StartingScene } from "@/features/starting/StartingScene";
import { EndingScene } from "@/features/ending/EndingScene";
import { BrbScene } from "@/features/brb/BrbScene";
import { QuestionScene } from "@/features/question/QuestionScene";
import { PollScene } from "@/features/poll/PollScene";
import { QuoteScene } from "@/features/quote/QuoteScene";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TwoCamsScene />} />
        <Route path="/two-cams" element={<TwoCamsScene />} />
        <Route path="/screen-share" element={<ScreenShareScene />} />
        <Route path="/starting" element={<StartingScene />} />
        <Route path="/ending" element={<EndingScene />} />
        <Route path="/brb" element={<BrbScene />} />
        <Route path="/question" element={<QuestionScene />} />
        <Route path="/poll" element={<PollScene />} />
        <Route path="/quote" element={<QuoteScene />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Verify all routes render correctly**

```bash
npm run dev
```

Open each URL in browser and verify it renders:
- `http://localhost:5173/` → two-cams with overlay chrome
- `http://localhost:5173/starting` → starting V1
- `http://localhost:5173/starting?variant=v2` → starting V2
- `http://localhost:5173/brb` → BRB scene
- `http://localhost:5173/question` → question scene
- `http://localhost:5173/poll` → poll scene
- `http://localhost:5173/quote` → editorial quote
- `http://localhost:5173/quote?variant=serif` → serif quote
- `http://localhost:5173/ending` → ending scene
- `http://localhost:5173/screen-share` → screen share

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up all scene routes in App.tsx"
```

---

### Task 12: Clean up legacy files

**Files:**
- Remove: `Heart Talks Overlay.html`
- Remove: `overlay.jsx`
- Remove: `tweaks-panel.jsx`
- Remove: `restream-listener.js`
- Remove: `components/` (entire directory)
- Keep: `screens/` and `screenshots/` (gitignored but not deleted locally)

- [ ] **Step 1: Remove legacy files**

```bash
git rm "Heart Talks Overlay.html" overlay.jsx tweaks-panel.jsx restream-listener.js
git rm -r components/
```

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: clean build with no errors.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove legacy CDN-based overlay files"
```

---

### Task 13: Final verification — all routes in browser

- [ ] **Step 1: Start dev server and verify every route renders visually**

```bash
npm run dev
```

Visit all 10 routes listed in Task 11 Step 2. Verify:
- Colors match the purple HE4RT theme
- Fonts load (Russo One for headings, Inter for body)
- Animations play (particles, pulse, slideIn, ticker scroll)
- Chat messages rotate in components that use SAMPLE_CHAT
- Countdown timers count down
- 1920×1080 letterbox scaling works at different window sizes

- [ ] **Step 2: Commit any final fixes**

```bash
git add -A
git commit -m "fix: final adjustments from visual verification"
```
