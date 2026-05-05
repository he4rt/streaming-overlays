import { createContext, useContext, useEffect, useRef, useState } from "react";
import OBSWebSocket, { EventSubscription } from "obs-websocket-js";

const OBS_URL = "ws://localhost:4455";
const OBS_PASSWORD = "123456"; // dev only — keep aligned with .mcp.json

export interface ObsAudioInput {
  name: string;
  kind: string;
  volumeDb: number;
  muted: boolean;
  level: number; // 0..1, instantaneous peak
}

export interface ObsState {
  connected: boolean;
  obsScene: string | null; // raw OBS scene name (e.g. "[HT] Pre-Show")
  scene: string | null; // internal mapped scene (e.g. "preshow")
  aspect: "16:9" | "16:10" | null; // extracted from scene name when applicable
  sceneList: string[];
  streaming: boolean;
  recording: boolean;
  audioInputs: ObsAudioInput[];
  setScene: (obsName: string) => Promise<void>;
  setVolume: (inputName: string, db: number) => Promise<void>;
  toggleMute: (inputName: string) => Promise<void>;
  triggerHotkey: (name: string) => Promise<void>;
}

const Ctx = createContext<ObsState>({
  connected: false,
  obsScene: null,
  scene: null,
  aspect: null,
  sceneList: [],
  streaming: false,
  recording: false,
  audioInputs: [],
  setScene: async () => {},
  setVolume: async () => {},
  toggleMute: async () => {},
  triggerHotkey: async () => {},
});

const AUDIO_KINDS = new Set([
  "wasapi_input_capture",
  "wasapi_output_capture",
  "wasapi_process_output_capture",
  "coreaudio_input_capture",
  "coreaudio_output_capture",
  "pulse_input_capture",
  "pulse_output_capture",
  "alsa_input_capture",
  "ffmpeg_source",
]);

/**
 * Maps OBS scene names like "[HT] Screen Share · 16:9" → { scene: "screen-share", aspect: "16:9" }
 */
export function obsToInternal(
  obsName: string,
): { scene: string; aspect?: "16:9" | "16:10" } | null {
  if (!obsName) return null;

  // strip [HT] prefix if present
  const stripped = obsName.replace(/^\[HT\]\s*/i, "").trim();

  // extract aspect "· 16:9"
  let aspect: "16:9" | "16:10" | undefined;
  let name = stripped
    .replace(/[·•]\s*(16:9|16:10)\s*$/, (_, a) => {
      aspect = a as "16:9" | "16:10";
      return "";
    })
    .trim();

  const map: Record<string, string> = {
    "Pre-Show": "preshow",
    Preshow: "preshow",
    "Two Cams": "two-cams",
    "Screen Share": "screen-share",
    Screenshare: "screen-share",
    "Lower Thirds": "lower-thirds",
    "Lower Thirds & Highlights": "lower-thirds",
    "Lower Thirds + Highlights": "lower-thirds",
    Starting: "starting",
    BRB: "brb",
    Question: "question",
    Pergunta: "question",
    Ending: "ending",
  };

  const scene = map[name] ?? name.toLowerCase().replace(/\s+/g, "-");
  return aspect ? { scene, aspect } : { scene };
}

export function ObsProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [obsScene, setObsScene] = useState<string | null>(null);
  const [sceneList, setSceneList] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioInputs, setAudioInputs] = useState<ObsAudioInput[]>([]);

  const wsRef = useRef<OBSWebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>();
  // levels chegam a ~60fps — usa ref pra throttle no setState
  const levelsRef = useRef<Map<string, number>>(new Map());
  const flushTimer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    let cancelled = false;
    const obs = new OBSWebSocket();
    wsRef.current = obs;

    const refreshAudioInputs = async () => {
      try {
        const { inputs } = await obs.call("GetInputList");
        const audio = (
          inputs as { inputName: string; inputKind: string }[]
        ).filter((i) => AUDIO_KINDS.has(i.inputKind));
        const enriched = await Promise.all(
          audio.map(async (i) => {
            const [v, m] = await Promise.all([
              obs.call("GetInputVolume", { inputName: i.inputName }),
              obs.call("GetInputMute", { inputName: i.inputName }),
            ]);
            return {
              name: i.inputName,
              kind: i.inputKind,
              volumeDb: v.inputVolumeDb,
              muted: m.inputMuted,
              level: 0,
            };
          }),
        );
        setAudioInputs(enriched);
      } catch {
        // ignore
      }
    };

    const tryConnect = async () => {
      if (cancelled) return;
      try {
        await obs.connect(OBS_URL, OBS_PASSWORD, {
          eventSubscriptions:
            EventSubscription.All | EventSubscription.InputVolumeMeters,
        });
        if (cancelled) return;
        setConnected(true);

        const [
          { currentProgramSceneName },
          { scenes },
          streamStatus,
          recordStatus,
        ] = await Promise.all([
          obs.call("GetCurrentProgramScene"),
          obs.call("GetSceneList"),
          obs.call("GetStreamStatus"),
          obs.call("GetRecordStatus"),
        ]);

        setObsScene(currentProgramSceneName ?? null);
        setSceneList(
          (scenes as { sceneName: string }[])
            .slice()
            .reverse()
            .map((s) => s.sceneName),
        );
        setStreaming(streamStatus.outputActive);
        setRecording(recordStatus.outputActive);

        await refreshAudioInputs();
      } catch {
        if (cancelled) return;
        setConnected(false);
        scheduleReconnect();
      }
    };

    const scheduleReconnect = () => {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = setTimeout(tryConnect, 2500);
    };

    obs.on("ConnectionClosed", () => {
      if (cancelled) return;
      setConnected(false);
      scheduleReconnect();
    });

    obs.on("CurrentProgramSceneChanged", ({ sceneName }) =>
      setObsScene(sceneName),
    );
    obs.on("SceneListChanged", ({ scenes }) =>
      setSceneList(
        (scenes as { sceneName: string }[])
          .slice()
          .reverse()
          .map((s) => s.sceneName),
      ),
    );
    obs.on("StreamStateChanged", ({ outputActive }) =>
      setStreaming(outputActive),
    );
    obs.on("RecordStateChanged", ({ outputActive }) =>
      setRecording(outputActive),
    );

    obs.on("InputCreated", () => refreshAudioInputs());
    obs.on("InputRemoved", () => refreshAudioInputs());
    obs.on("InputNameChanged", () => refreshAudioInputs());
    obs.on("InputVolumeChanged", ({ inputName, inputVolumeDb }) =>
      setAudioInputs((prev) =>
        prev.map((i) =>
          i.name === inputName ? { ...i, volumeDb: inputVolumeDb } : i,
        ),
      ),
    );
    obs.on("InputMuteStateChanged", ({ inputName, inputMuted }) =>
      setAudioInputs((prev) =>
        prev.map((i) =>
          i.name === inputName ? { ...i, muted: inputMuted } : i,
        ),
      ),
    );

    // InputVolumeMeters fires ~60fps com array por input. Cada input tem
    // channel-arrays [magnitude, peak, inputPeak]. Pega peak do canal mais alto.
    obs.on("InputVolumeMeters", ({ inputs }) => {
      for (const i of inputs as {
        inputName: string;
        inputLevelsMul: number[][];
      }[]) {
        const channels = i.inputLevelsMul ?? [];
        let peak = 0;
        for (const ch of channels) {
          const p = ch[1] ?? 0; // peak (0..1 mul)
          if (p > peak) peak = p;
        }
        levelsRef.current.set(i.inputName, peak);
      }
    });

    // Flush dos levels a 20fps pra não atropelar React
    flushTimer.current = setInterval(() => {
      if (levelsRef.current.size === 0) return;
      const snapshot = new Map(levelsRef.current);
      setAudioInputs((prev) =>
        prev.map((i) => ({
          ...i,
          level: snapshot.get(i.name) ?? i.level * 0.7,
        })),
      );
    }, 50);

    tryConnect();

    return () => {
      cancelled = true;
      clearTimeout(reconnectTimer.current);
      clearInterval(flushTimer.current);
      obs.disconnect().catch(() => {});
    };
  }, []);

  const safeCall = async <T,>(fn: () => Promise<T>): Promise<T | undefined> => {
    if (!wsRef.current || !connected) return;
    try {
      return await fn();
    } catch {
      return;
    }
  };

  const setScene = async (obsName: string) =>
    void (await safeCall(() =>
      wsRef.current!.call("SetCurrentProgramScene", { sceneName: obsName }),
    ));

  const setVolume = async (inputName: string, db: number) =>
    void (await safeCall(() =>
      wsRef.current!.call("SetInputVolume", { inputName, inputVolumeDb: db }),
    ));

  const toggleMute = async (inputName: string) =>
    void (await safeCall(() =>
      wsRef.current!.call("ToggleInputMute", { inputName }),
    ));

  const triggerHotkey = async (name: string) =>
    void (await safeCall(() =>
      wsRef.current!.call("TriggerHotkeyByName", { hotkeyName: name }),
    ));

  const mapped = obsScene ? obsToInternal(obsScene) : null;

  return (
    <Ctx.Provider
      value={{
        connected,
        obsScene,
        scene: mapped?.scene ?? null,
        aspect: mapped?.aspect ?? null,
        sceneList,
        streaming,
        recording,
        audioInputs,
        setScene,
        setVolume,
        toggleMute,
        triggerHotkey,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useObs() {
  return useContext(Ctx);
}
