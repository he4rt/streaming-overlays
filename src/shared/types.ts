export interface TweakConfig {
  /** Cena ativa quando OBS estiver offline (fallback do orchestrator) */
  scene: string;

  /** Toggles globais */
  showChat: boolean;
  showCameraPlaceholders: boolean;

  /** Variantes / opções de cena */
  startingVariant: string;
  screenShareVariant: string;
  screenShareAspect: "16:9" | "16:10";
  preshowVariant: string;
  startingCountdownSeconds: number;
  startingSubtitle: string;

  /** Info do evento — herdado por todas as cenas */
  episodeTitle: string;
  episodeNumber: string;
  topic: string;
  date: string;
  time: string;

  /** Convidados (usados pelo nameplate da câmera no Screen Share) */
  guest1Name: string;
  guest1Role: string;
  guest1Handle: string;
  guest2Name: string;
  guest2Role: string;
  guest2Handle: string;

  /** Chat externo */
  useLiveChat: boolean;

  /** Tema Laravel */
  laravel: LaravelConfig;
}

export interface LaravelConfig {
  accent: string;
  tags: string[];
  chatTitle: string;
  chatSubtitle: string;
  chatLivePill: string;
  chatFooterLeft: string;
  chatFooterRight: string;
  bgImage: string;
  preshowBgImage: string;
}

export type ChatPart =
  | { type: "text"; value: string }
  | { type: "emote"; url: string; alt: string };

export interface ChatBadge {
  imageUrl: string;
  title: string;
}

export interface ChatMessage {
  user: string;
  color: string;
  msg: string;
  badge?: string;
  key?: number;
  provider?: "twitch" | "kick";
  parts?: ChatPart[];
  badges?: ChatBadge[];
}
