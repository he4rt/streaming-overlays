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
