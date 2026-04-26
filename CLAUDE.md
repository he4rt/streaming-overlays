# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 5173 (`host: true` for network access)
- `npm run build` — TypeScript check + Vite production build
- `npm run preview` — Serve production build locally
- `npm run restream` — Node WebSocket listener for Restream chat (requires `.env` with `RESTREAM_CHAT_TOKEN`)

## Architecture

Heart Talks is a streaming overlay system for OBS. Each OBS scene is a separate route rendered as a 1920×1080 browser source.

**Scene routes** (defined in `src/App.tsx`):
`/two-cams` (default), `/screen-share`, `/starting`, `/ending`, `/brb`, `/question`, `/poll`, `/quote`

**Key architectural patterns:**

- **Stage → Overlay → Scene**: `Stage` provides a fixed 1920×1080 viewport with responsive scaling (`useStageScale`). `Overlay` composes chrome elements (TopBar, LowerThird, TickerBar, ChatPanel). Each scene route renders inside this shell.
- **Config-driven rendering**: `useOverlayConfig` polls `localStorage` key `he4rt-overlay-config` every 200ms, merging partial overrides with `src/config/defaults.ts`. All scene visibility, colors, text, and variant selection flow from `TweakConfig`.
- **Scene variants**: StartingScene has 4 variants (`v1`–`v4`), QuoteScene has 3 (`editorial`, `serif`, `minimal`), selectable via config.
- **Chat integration**: `useRestreamChat` hook connects via WebSocket to Restream, maintains last 12 messages, auto-reconnects on disconnect. Multiple chat display components exist (ChatPanel, MarqueeChat, TerminalChat, BubbleChatStrip, etc.).

**Directory layout:**
- `src/features/` — one directory per scene/feature, each self-contained
- `src/shared/components/` — reusable UI primitives (CameraFrame, HeartLogo, ParticleField, etc.)
- `src/shared/chat/` — chat display components and sample messages
- `src/hooks/` — custom hooks (useStageScale, useOverlayConfig, useRestreamChat, useCountdown)
- `src/config/` — centralized defaults and theme (colors, fonts)

## Tech Stack

Vite 6, React 18, TypeScript (strict), Tailwind CSS v4, React Router v7

**Path alias**: `@/*` maps to `src/*` (configured in both tsconfig and vite.config).

## Style

- Tailwind v4 with custom theme in `src/index.css` (CSS variables for colors, Russo One + Inter fonts)
- Custom keyframe animations defined in index.css: `pulse`, `slideIn`, `tickerScroll`, `marqueeChat`, `gridDrift`, `floatY`, `startingPulse`, `glow`
- All overlays render on transparent backgrounds (OBS composites them over video)

## Legacy Code

Root-level `.jsx` files and `components/` directory contain the original CDN-loaded React+Babel overlay. These are the migration source — the canonical implementation is under `src/`.
