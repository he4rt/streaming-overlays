import type { TweakConfig } from "@/shared/types";

export const DEFAULTS: TweakConfig = {
  scene: "preshow",

  showChat: true,
  showCameraPlaceholders: true,

  startingVariant: "v5",
  screenShareVariant: "v2",
  screenShareAspect: "16:9",
  preshowVariant: "v2",
  startingCountdownSeconds: 300,
  startingSubtitle: "Senta que o papo vai longe",

  episodeTitle: "Laravel Day",
  episodeNumber: "EP. 001",
  topic: "Carreira, comunidade e o futuro do dev BR",
  date: "12 DE DEZEMBRO",
  time: "20H",

  guest1Name: "Marina Costa",
  guest1Role: "Senior Frontend Engineer",
  guest1Handle: "@marinacosta.dev",
  guest2Name: "Lucas Pereira",
  guest2Role: "Host",
  guest2Handle: "@lucasdev",

  useLiveChat: false,

  laravel: {
    accent: "#ff2d20",
    tags: ["Laravel", "3Pontos", "PHPSP", "FIAP + Alura"],
    chatTitle: "CHAT",
    chatSubtitle: "Manda um oi aí",
    chatLivePill: "AO VIVO",
    chatFooterLeft: "#LARAVELDAYSP",
    chatFooterRight: "twitch.tv/laraveldaysp",
    bgImage: "/laravel-bg.png",
    preshowBgImage: "/preshow-bg.png",
  },
};
