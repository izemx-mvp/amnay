/**
 * Every illustration of the Amnay mascots, with intrinsic sizes (no layout shift)
 * and French alt text. Swap a file here and every page follows.
 *
 * Story: the man is the user (SME owner answering tenders); the cube robot is
 * his Amnay agent doing the work. All files have a dark navy background —
 * never place them on a light surface.
 */

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const DIR = "/images";

export const heroImages = {
  desktop: {
    src: `${DIR}/hero/hero-duo-desk.webp`,
    width: 2400,
    height: 1340,
    alt: "Dirigeant détendu pendant que l'agent Amnay analyse les appels d'offres",
  },
  mobile: {
    src: `${DIR}/hero/hero-duo-desk-mobile.webp`,
    width: 900,
    height: 1000,
    alt: "Dirigeant détendu pendant que l'agent Amnay analyse les appels d'offres",
  },
} as const satisfies Record<string, ImageAsset>;

export const sceneImages = {
  probleme: {
    src: `${DIR}/scenes/scene-probleme-dossiers.webp`,
    width: 1800,
    height: 1005,
    alt: "Dirigeant submergé par les dossiers d'appels d'offres",
  },
  fondateurs: {
    src: `${DIR}/scenes/scene-fondateurs-pass.webp`,
    width: 1600,
    height: 1195,
    alt: "Dirigeant tenant son pass Fondateurs doré, l'agent Amnay souriant à ses côtés",
  },
} as const satisfies Record<string, ImageAsset>;

export type BotPose = "salut" | "pouce" | "perdu" | "dort" | "cookie";

const BOT_ALTS: Record<BotPose, string> = {
  salut: "L'agent Amnay fait un signe de la main",
  pouce: "L'agent Amnay lève le pouce",
  perdu: "L'agent Amnay, perdu, cherche son chemin",
  dort: "L'agent Amnay fait une petite sieste",
  cookie: "L'agent Amnay tient un cookie",
};

export const botImages = Object.fromEntries(
  (Object.keys(BOT_ALTS) as BotPose[]).map((pose) => [
    pose,
    { src: `${DIR}/bot/bot-${pose}.webp`, width: 800, height: 800, alt: BOT_ALTS[pose] },
  ]),
) as Record<BotPose, ImageAsset>;

export type AgentKey =
  "eclaireur" | "lecteur" | "juge" | "redacteur" | "greffier" | "analyste" | "vigie";

const AGENT_ALTS: Record<AgentKey, string> = {
  eclaireur: "Agent Éclaireur d'Amnay avec une antenne parabolique qui scanne le portail",
  lecteur: "Agent Lecteur d'Amnay avec des lunettes, lisant un dossier",
  juge: "Agent Juge d'Amnay avec un marteau et une coche verte",
  redacteur: "Agent Rédacteur d'Amnay écrivant avec un stylo lumineux",
  greffier: "Agent Greffier d'Amnay avec un dossier scellé et un tampon « approved »",
  analyste: "Agent Analyste d'Amnay avec une loupe, entouré de graphiques",
  vigie: "Agent Vigie d'Amnay avec un phare et une cloche d'alerte",
};

/** "Éclaireur" → "eclaireur": agent names map to keys by stripping accents. */
export function agentKey(name: string): AgentKey | undefined {
  const key = name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  return key in AGENT_ALTS ? (key as AgentKey) : undefined;
}

/** Image of an agent, resolved from its key (or its display name). */
export function agentImage(keyOrName: string): ImageAsset | undefined {
  const key = agentKey(keyOrName);
  if (!key) return undefined;
  return { src: `${DIR}/agents/agent-${key}.webp`, width: 900, height: 900, alt: AGENT_ALTS[key] };
}
