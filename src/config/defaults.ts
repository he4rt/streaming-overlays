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

  guests: [
    {
      id: "nuno",
      name: "Nuno Maduro",
      talk: "Strict AI Engineering",
      githubHandle: "nunomaduro",
    },
    {
      id: "mateus",
      name: "Mateus Guimarães",
      talk: "Defensive Laravel",
      githubHandle: "mateusguimaraes",
    },
  ],
  activeSpeakerId: "nuno",

  schedule: [
    {
      id: "abertura",
      time: "19h00",
      title: "Abertura e Boas-vindas",
      details:
        "Abertura oficial do evento + apresentação institucional da 3 Pontos + agradecimentos à Laravel, He4rt Developers e PHPSP",
    },
    {
      id: "talk-1",
      time: "19h10",
      title: "1ª Palestra",
      details: 'Mateus Guimarães — "Defensive Laravel"',
    },
    {
      id: "intervalo",
      time: "19h40",
      title: "Intervalo",
      details:
        "Networking, interação com participantes e preparação para próxima palestra",
    },
    {
      id: "talk-2",
      time: "20h00",
      title: "2ª Palestra",
      details: 'Nuno Maduro — "Strict AI Engineering"',
    },
    {
      id: "painel",
      time: "20h40",
      title: "Painel de Conversa",
      details: "Painel com Mateus Guimarães, Nuno Maduro e convidados especiais",
    },
    {
      id: "happy-hour",
      time: "21h00",
      title: "Happy Hour",
      details:
        "Networking, conexões e interação entre comunidade, palestrantes e convidados",
    },
    {
      id: "encerramento",
      time: "22h00",
      title: "Encerramento Oficial",
      details:
        "Agradecimentos finais + divulgação das comunidades e próximos encontros",
    },
  ],

  useLiveChat: false,
  lowerThird: null,

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
