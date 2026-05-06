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

  /** Convidados — lista mestra de speakers do evento */
  guests: Guest[];

  /** Id do guest atualmente na câmera (alimenta o nameplate do Screen Share) */
  activeSpeakerId: string | null;

  /** Cronograma do evento — cada item pode ser disparado como lower-third */
  schedule: ScheduleItem[];

  /** Fila de perguntas da audiência — cada uma pode ser disparada como lower-third */
  questions: Question[];

  /** Chat externo */
  useLiveChat: boolean;

  /**
   * Lower-third único — só uma coisa pode estar destacada por vez.
   * `kind: "chat"` mostra mensagem destacada; `kind: "guest"` mostra cartão
   * de speaker. `null` = nada na tela.
   */
  lowerThird: LowerThird;

  /** Tema Laravel */
  laravel: LaravelConfig;
}

export interface Guest {
  id: string;
  name: string;
  talk: string;
  githubHandle: string;
}

export function guestAvatarUrl(handle: string): string {
  return `https://github.com/${handle}.png`;
}

export interface ScheduleItem {
  id: string;
  time: string;     // "19h10"
  title: string;    // "1ª Palestra"
  details: string;  // "Mateus Guimarães — Defensive Laravel"
}

export interface Question {
  id: string;
  user: string;          // nome de exibição (do chat ou manual)
  color: string;         // cor do chat — usada no avatar (inicial)
  text: string;          // pergunta
  badges?: ChatBadge[];  // badges do chat (sub, etc), opcional
  askedAt?: string;      // hora "HH:MM" no momento do disparo
}

/** Duração (ms) que a lower-third de pergunta fica no ar antes de auto-limpar. */
export const QUESTION_LT_DURATION_MS = 30_000;

export type LowerThird =
  | { kind: "chat"; message: ChatMessage }
  | { kind: "guest"; guestId: string }
  | { kind: "schedule"; scheduleId: string }
  | { kind: "question"; questionId: string; triggeredAt: number }
  | null;

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
