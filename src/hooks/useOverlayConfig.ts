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
