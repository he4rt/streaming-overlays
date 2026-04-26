# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an admin panel at `/admin` that controls all overlay scenes in real-time via localStorage polling — one set of inputs broadcasts to every open overlay tab.

**Architecture:** Admin writes the full `TweakConfig` to `localStorage` on every input change. A new `useOverlayConfig()` hook polls localStorage every 200ms, falling back to `DEFAULTS` when empty. All scene components switch from `const t = DEFAULTS` to `const t = useOverlayConfig()`. Variant selection (starting v1-v4, quote editorial/serif/minimal) moves from URL query params to the config object, controlled from the admin panel.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, localStorage API

---

## File Structure

```
src/
├── hooks/
│   └── useOverlayConfig.ts          # NEW — polls localStorage, returns TweakConfig
│
├── features/
│   ├── admin/
│   │   ├── AdminPanel.tsx            # NEW — main admin page layout
│   │   ├── SectionEpisode.tsx        # NEW — episode info inputs
│   │   ├── SectionGuests.tsx         # NEW — guest 1 + host inputs
│   │   ├── SectionScene.tsx          # NEW — scene + variant selectors
│   │   ├── SectionColors.tsx         # NEW — color pickers
│   │   ├── SectionToggles.tsx        # NEW — show/hide toggles
│   │   ├── SectionChat.tsx           # NEW — chat title input
│   │   ├── SectionBrb.tsx            # NEW — BRB track input
│   │   ├── SectionQuestion.tsx       # NEW — question scene inputs
│   │   ├── SectionPoll.tsx           # NEW — poll scene inputs
│   │   └── SectionQuote.tsx          # NEW — quote scene inputs
│   │
│   ├── overlay/Overlay.tsx           # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── two-cams/TwoCamsScene.tsx      # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── screen-share/ScreenShareScene.tsx # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── starting/StartingScene.tsx     # MODIFY — DEFAULTS → useOverlayConfig(), variant from config
│   ├── ending/EndingScene.tsx         # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── brb/BrbScene.tsx               # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── question/QuestionScene.tsx     # MODIFY — DEFAULTS → useOverlayConfig()
│   ├── poll/PollScene.tsx             # MODIFY — DEFAULTS → useOverlayConfig()
│   └── quote/QuoteScene.tsx           # MODIFY — DEFAULTS → useOverlayConfig(), variant from config
│
├── App.tsx                            # MODIFY — add /admin route
```

---

### Task 1: Create useOverlayConfig hook

**Files:**
- Create: `src/hooks/useOverlayConfig.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";

const STORAGE_KEY = "he4rt-overlay-config";
const POLL_INTERVAL = 200;

export function useOverlayConfig(): TweakConfig {
  const [config, setConfig] = useState<TweakConfig>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...DEFAULTS, ...JSON.parse(stored) };
      } catch {
        return DEFAULTS;
      }
    }
    return DEFAULTS;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Partial<TweakConfig>;
          setConfig((prev) => {
            const next = { ...DEFAULTS, ...parsed };
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
          });
        } catch {
          // ignore malformed JSON
        }
      }
    }, POLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return config;
}

export function saveOverlayConfig(config: TweakConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useOverlayConfig.ts
git commit -m "feat: add useOverlayConfig hook with localStorage polling"
```

---

### Task 2: Update all scenes to use useOverlayConfig

**Files:**
- Modify: `src/features/overlay/Overlay.tsx`
- Modify: `src/features/two-cams/TwoCamsScene.tsx`
- Modify: `src/features/screen-share/ScreenShareScene.tsx`
- Modify: `src/features/starting/StartingScene.tsx`
- Modify: `src/features/ending/EndingScene.tsx`
- Modify: `src/features/brb/BrbScene.tsx`
- Modify: `src/features/question/QuestionScene.tsx`
- Modify: `src/features/poll/PollScene.tsx`
- Modify: `src/features/quote/QuoteScene.tsx`

In every file listed above, apply the same mechanical change:

1. Replace `import { DEFAULTS } from "@/config/defaults"` with `import { useOverlayConfig } from "@/hooks/useOverlayConfig"`
2. Replace `const t = DEFAULTS` with `const t = useOverlayConfig()`

**Special cases:**

For `StartingScene.tsx` — remove the `useSearchParams` variant reading. Variant now comes from config:
```tsx
import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { StartingV1 } from "./StartingV1";
import { StartingV2 } from "./StartingV2";
import { StartingV3 } from "./StartingV3";
import { StartingV4 } from "./StartingV4";

export function StartingScene() {
  const t = useOverlayConfig();
  const variant = t.startingVariant;

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
      <div className="absolute inset-0 overflow-hidden" style={{ background: t.bgDeep }}>
        <ParticleField enabled={t.showHeartParticles} color={t.accent} />
        <Scene config={t} />
      </div>
    </Stage>
  );
}
```

For `QuoteScene.tsx` — same: variant from config instead of URL:
```tsx
import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ParticleField } from "@/shared/components/ParticleField";
import { QuoteEditorial } from "./QuoteEditorial";
import { QuoteSerif } from "./QuoteSerif";
import { QuoteMinimal } from "./QuoteMinimal";

export function QuoteScene() {
  const t = useOverlayConfig();
  const variant = t.quoteVariant;

  const Variant =
    variant === "serif"
      ? QuoteSerif
      : variant === "minimal"
        ? QuoteMinimal
        : QuoteEditorial;

  return (
    <Stage>
      <div className="absolute inset-0 overflow-hidden" style={{ background: t.bgDeep }}>
        <ParticleField enabled={t.showHeartParticles} color={t.accent} />
        <Variant config={t} />
      </div>
    </Stage>
  );
}
```

For `Overlay.tsx`:
```tsx
import { type ReactNode } from "react";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
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
  const t = useOverlayConfig();
  return (
    <GradientBackground primary={t.primary} primaryDeep={t.primaryDeep} accent={t.accent} bgDeep={t.bgDeep}>
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

- [ ] **Step 1: Apply changes to all 9 files**

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/features/
git commit -m "feat: switch all scenes from DEFAULTS to useOverlayConfig localStorage polling"
```

---

### Task 3: Create admin panel — layout shell + episode section

**Files:**
- Create: `src/features/admin/AdminPanel.tsx`
- Create: `src/features/admin/SectionEpisode.tsx`

- [ ] **Step 1: Create SectionEpisode.tsx**

Collapsible section with inputs for: episodeNumber, episodeTitle, topic, date, time, tickerText.

```tsx
import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionEpisode({ config, update }: SectionProps) {
  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-2 font-heading text-sm tracking-wider text-accent">Episodio</legend>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Numero
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            value={config.episodeNumber} onChange={(e) => update("episodeNumber", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Titulo
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            value={config.episodeTitle} onChange={(e) => update("episodeTitle", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Topico
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            value={config.topic} onChange={(e) => update("topic", e.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Data
            <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
              value={config.date} onChange={(e) => update("date", e.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Horario
            <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
              value={config.time} onChange={(e) => update("time", e.target.value)} />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-xs text-white/60">
          Ticker
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            value={config.tickerText} onChange={(e) => update("tickerText", e.target.value)} />
        </label>
      </div>
    </fieldset>
  );
}
```

- [ ] **Step 2: Create AdminPanel.tsx — shell with state management**

```tsx
import { useState, useEffect, useCallback } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";
import { saveOverlayConfig } from "@/hooks/useOverlayConfig";
import { HeartLogo } from "@/shared/components/HeartLogo";
import { SectionEpisode } from "./SectionEpisode";

export function AdminPanel() {
  const [config, setConfig] = useState<TweakConfig>(() => {
    const stored = localStorage.getItem("he4rt-overlay-config");
    if (stored) {
      try { return { ...DEFAULTS, ...JSON.parse(stored) }; } catch { /* ignore */ }
    }
    return DEFAULTS;
  });

  const update = useCallback((key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value };
      saveOverlayConfig(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setConfig(DEFAULTS);
    saveOverlayConfig(DEFAULTS);
  }, []);

  useEffect(() => {
    saveOverlayConfig(config);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep p-6 text-white">
      <div className="mx-auto max-w-2xl">
        {/* header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HeartLogo size={0.6} />
            <span className="font-body text-sm tracking-widest text-white/50">ADMIN PANEL</span>
          </div>
          <button onClick={reset}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-body text-xs font-bold tracking-wider text-red-400 transition hover:bg-red-500/20">
            RESET DEFAULTS
          </button>
        </div>

        {/* sections */}
        <div className="flex flex-col gap-4">
          <SectionEpisode config={config} update={update} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/features/admin/
git commit -m "feat: add admin panel shell with episode section"
```

---

### Task 4: Create remaining admin sections

**Files:**
- Create: `src/features/admin/SectionGuests.tsx`
- Create: `src/features/admin/SectionScene.tsx`
- Create: `src/features/admin/SectionColors.tsx`
- Create: `src/features/admin/SectionToggles.tsx`
- Create: `src/features/admin/SectionChat.tsx`
- Create: `src/features/admin/SectionBrb.tsx`
- Create: `src/features/admin/SectionQuestion.tsx`
- Create: `src/features/admin/SectionPoll.tsx`
- Create: `src/features/admin/SectionQuote.tsx`

All sections follow the same pattern as `SectionEpisode`: receive `{ config, update }` props. Each uses the same Tailwind input styling.

- [ ] **Step 1: Create SectionGuests.tsx**

Inputs: guest1Name, guest1Role, guest1Handle, guest2Name, guest2Role, guest2Handle. Split into two fieldsets: "Convidado 1" and "Host".

- [ ] **Step 2: Create SectionScene.tsx**

Radio buttons or select for scene variant selection:
- Starting variant: v1, v2, v3, v4
- Quote variant: editorial, serif, minimal
- Screen content: code, browser, slides
- Screen title text input
- Starting title, subtitle, countdown seconds (number input)
- Ending title, subtitle

- [ ] **Step 3: Create SectionColors.tsx**

Color inputs (`<input type="color">`) for: primary, primaryDeep, accent, bgDeep, bgPanel. Plus a range slider for panelOpacity.

- [ ] **Step 4: Create SectionToggles.tsx**

Checkbox toggles for: showChat, showTopBar, showLowerThird, showTicker, showLiveBadge, showHeartParticles.

- [ ] **Step 5: Create SectionChat.tsx**

Single input: chatTitle.

- [ ] **Step 6: Create SectionBrb.tsx**

Input: brbTrack.

- [ ] **Step 7: Create SectionQuestion.tsx**

Inputs: questionAuthor, questionAuthorBadge, questionText, questionFrom, questionQueue (number).

- [ ] **Step 8: Create SectionPoll.tsx**

Inputs: pollQuestion, pollTotalVotes (number), pollTimeLeft.

- [ ] **Step 9: Create SectionQuote.tsx**

Inputs: quoteText, quoteAuthor, quoteAuthorRole, quoteContext.

- [ ] **Step 10: Update AdminPanel.tsx to include all sections**

Import and render all 9 sections inside the `<div className="flex flex-col gap-4">` container.

```tsx
import { SectionEpisode } from "./SectionEpisode";
import { SectionGuests } from "./SectionGuests";
import { SectionScene } from "./SectionScene";
import { SectionColors } from "./SectionColors";
import { SectionToggles } from "./SectionToggles";
import { SectionChat } from "./SectionChat";
import { SectionBrb } from "./SectionBrb";
import { SectionQuestion } from "./SectionQuestion";
import { SectionPoll } from "./SectionPoll";
import { SectionQuote } from "./SectionQuote";

// In the render, inside the gap-4 div:
<SectionScene config={config} update={update} />
<SectionEpisode config={config} update={update} />
<SectionGuests config={config} update={update} />
<SectionColors config={config} update={update} />
<SectionToggles config={config} update={update} />
<SectionChat config={config} update={update} />
<SectionBrb config={config} update={update} />
<SectionQuestion config={config} update={update} />
<SectionPoll config={config} update={update} />
<SectionQuote config={config} update={update} />
```

- [ ] **Step 11: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 12: Commit**

```bash
git add src/features/admin/
git commit -m "feat: add all admin panel input sections"
```

---

### Task 5: Add /admin route to App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add admin route**

Add the import and route:

```tsx
import { AdminPanel } from "@/features/admin/AdminPanel";

// Add inside <Routes>:
<Route path="/admin" element={<AdminPanel />} />
```

- [ ] **Step 2: Verify TypeScript compiles and dev server runs**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:5173/admin` — should show admin panel with all sections.
Open `http://localhost:5173/starting` in another tab — changing values in admin should update the starting scene in real-time.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /admin route for overlay control panel"
```
