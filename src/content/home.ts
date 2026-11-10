import { billing, comparator, founders, getPlan } from "@/config/site";
import { frNumber } from "@/lib/format";
import { cta, trialMicrocopy } from "./common";
import { routes } from "./navigation";
import { tenderRows } from "./product";

/** "/" — the hub page. Section order lives in routes/_site/index.tsx. */

export const homeMeta = { title: "Amnay — Amnay lit les marchés publics pour vous" };

export const hero = {
  badge: "7 agents IA · Portail marocain des marchés publics",
  title: "Amnay lit les marchés publics pour vous.",
  titleHighlight: ["marchés", "publics"],
  subtitle:
    "Les autres vous envoient des titres. Amnay télécharge et lit le dossier, vous dit si vous pouvez gagner, et rédige votre mémoire technique avec vous.",
  primaryCta: cta.trialLong,
  secondaryCta: cta.demo,
  microcopy: trialMicrocopy,
  windowTitle: "app.amnay — Daily Brief",
  rows: tenderRows,
  statusLines: [
    "Lecteur analyse le DCE… page 47/212",
    "Juge vérifie l'éligibilité… 12 critères",
    "Éclaireur compare votre profil… 3 AO",
    "Rédacteur prépare le mémoire… section 2",
  ],
  sequence: {
    reader: "Lecteur",
    readerFile: "DCE_81_2026_PDENE.pdf",
    readerPages: 212,
    readerStopPage: 47,
    score: 92,
    scoreLabel: "Score",
    eligible: "Éligible",
    facts: ["Qualification RME", "Caution 15 000 MAD", "J-24"],
  },
  ariaLabel:
    "Démonstration : Amnay détecte un appel d'offres, lit le dossier et le déclare éligible avec un score de 92.",
};

export type HeroContent = typeof hero;

const proYearly = getPlan("pro").yearly;

export const problem = {
  index: "02",
  label: "Le problème",
  statement: [
    { before: "Un dossier de", n: 212, after: "pages." },
    { before: "", n: 3, after: "jours pour répondre." },
    { before: "Personne pour le lire.", n: null, after: "" },
  ],
  lead: "Répondre à un marché public coûte trop cher aux PME.",
  pains: [
    {
      title: "On ne voit pas les bons appels d'offres",
      body: "Des dizaines d'avis par jour. Sans veille dédiée, ceux de votre secteur passent inaperçus.",
    },
    {
      title: "On ne lit pas les dossiers",
      body: "50 à 300 pages, souvent scannées, parfois en arabe. Personne n'a ces heures.",
    },
    {
      title: "On répond sans savoir si on est éligible",
      body: "Attestation expirée, qualification manquante : écarté avant l'ouverture des plis.",
    },
    {
      title: "On recommence chaque mémoire de zéro",
      body: "Votre savoir-faire ne change pas, mais chaque réponse repart d'une page blanche.",
    },
  ],
  receipt: {
    header: "REÇU · RÉPONSE AUX AO",
    subheader: "PME · MAROC · 2026",
    lines: [
      {
        label: "Chargé d'AO",
        amount: `${frNumber(comparator.charged.min)}–${frNumber(comparator.charged.max)}`,
        unit: "MAD/mois",
      },
      {
        label: "Consultant",
        amount: `${frNumber(comparator.consultant.min)}–${frNumber(comparator.consultant.max)}`,
        unit: "MAD/dossier",
      },
      { label: "Marchés manqués", amount: "—", unit: "impossible à chiffrer" },
    ],
    totalLabel: "TOTAL · chargé d'AO sur 12 mois",
    total: `${frNumber(comparator.charged.min * 12)}–${frNumber(comparator.charged.max * 12)} MAD`,
    footer: "Amnay Pro, en annuel",
    footerAmount: `${frNumber(proYearly)} ${billing.currencyLabel}`,
  },
};

/** "After" contrast shown at the top of the steps teaser, right after the problem. */
export const afterContrast = {
  line: "Avec Amnay, votre agent lit les dossiers à votre place.",
};

export const stepsTeaser = {
  index: "03",
  label: "Fonctionnement",
  title: "De la veille à la réponse, en quatre temps",
  highlight: ["quatre", "temps"],
  link: { label: "Voir toutes les fonctionnalités", href: routes.features },
};

export const proofsSection = {
  index: "04",
  label: "Preuves",
  title: "Cinq preuves, pas des promesses",
  highlight: ["preuves,"],
};

export const agentsTeaser = {
  index: "05",
  label: "Agents",
  title: "Sept agents, un par étape",
  highlight: ["agents,"],
  link: { label: "Découvrir les 7 agents", href: routes.agents },
};

export const segmentTiles = {
  index: "06",
  label: "Pour qui",
  title: "Pensé pour deux métiers qui répondent souvent",
  highlight: ["deux", "métiers"],
  linkLabel: "Voir la page dédiée",
};

export const comparatorSection = {
  index: "07",
  label: "Comparateur",
  title: "Faites le calcul vous-même",
  highlight: ["calcul"],
};

export const pricingSummary = {
  index: "08",
  label: "Tarifs",
  title: "Un prix public, sans surprise",
  highlight: ["public,"],
  perMonth: "/mois",
  fromYearly: "ou {n} MAD HT/mois en annuel",
  credits: "{n} crédits / mois",
  link: { label: "Comparer les formules en détail", href: routes.pricing },
};

export const foundersTeaser = {
  index: "09",
  label: "Offre Fondateurs",
  title: `${founders.placesTotal} places pour construire Amnay avec nous`,
  highlight: [`${founders.placesTotal}`, "places"],
  link: { label: "Voir l'offre Fondateurs", href: routes.founders },
};

export const faqTeaser = {
  index: "10",
  label: "FAQ",
  title: "Les objections qu'on entend le plus",
  highlight: ["objections"],
  ids: ["maroc-business", "ia-trompe", "donnees-sensibles", "cher"],
  link: { label: "Toutes les questions", href: routes.faq },
};

export const finalCta = {
  title: "Votre première veille en 10 minutes",
  highlight: ["10", "minutes"],
};
