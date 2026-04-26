import { useState, useEffect } from "react";
import type { TweakConfig } from "@/shared/types";
import { DEFAULTS } from "@/config/defaults";

const POLL_INTERVAL = 200;
const API_URL = "/api/config";

export function useOverlayConfig(): TweakConfig {
  const [config, setConfig] = useState<TweakConfig>(DEFAULTS);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (!active) return;
        if (Object.keys(data).length === 0) return;
        setConfig((prev) => {
          const next = { ...DEFAULTS, ...data };
          if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
          return next;
        });
      } catch {
        // server not ready yet
      }
    }

    poll();
    const id = setInterval(poll, POLL_INTERVAL);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return config;
}

export async function saveOverlayConfig(config: TweakConfig): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
}
