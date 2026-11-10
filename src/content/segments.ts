import type { PlanId } from "@/config/site";
import type { TenderRow } from "./product";

/**
 * Segment landing pages (ad traffic). Adding an entry here creates a new page
 * at /{slug}, rendered by <SegmentPage />, with a minimal header and one CTA.
 */

export type Segment = {
  slug: string;
  /** Menu / tile name. */
  name: string;
  /** One-line description for the home tiles. */
  tagline: string;
  /** Professions listed in the marquee. */
  trades: string[];
  hero: {
    badge: string;
    title: string;
    titleHighlight: string[];
    subtitle: string;
    windowTitle: string;
    rows: TenderRow[];
    statusLines: string[];
    sequence: {
      readerFile: string;
      readerPages: number;
      readerStopPage: number;
      score: number;
      facts: string[];
    };
  };
  pains: { title: string; body: string }[];
  /** How Amnay answers each pain, in the segment's words. */
  answers: { step: string; title: string; body: string }[];
  /** Sample mémoire paragraph shown in the editor mockup. */
  memo: { section: string; text: string };
  recommendedPlans: PlanId[];
  planReason: string;
  faqIds: string[];
  closing: { title: string; highlight: string[] };
};

export const segments: Segment[] = [
  {
    slug: "bureaux-etudes",
    name: "Bureaux d'études",
    tagline: "Cabinets techniques, laboratoires, topographie, SIG, géotechnique, ingénierie.",
    trades: [
      "Topographie",
      "SIG",
      "Géotechnique",
      "Ingénierie",
      "Environnement",
      "Architecture",
      "Laboratoires",
      "Études VRD",
      "Contrôle technique",
    ],
    hero: {
      badge: "Bureaux d'études · cabinets techniques · laboratoires",
      title: "Vos mémoires techniques, sans repartir de zéro.",
      titleHighlight: ["mémoires", "techniques,"],
      subtitle:
        "Amnay repère les études de votre spécialité, lit le CPS et le règlement, vérifie vos qualifications et rédige le mémoire dans votre style, à partir de vos mémoires gagnés.",
      windowTitle: "app.amnay — Veille · Études",
      rows: [
        {
          score: 94,
          ref: "81/2026/PDENE",
          title: "Levés topographiques et SIG",
          buyer: "Acheteur public — régional",
          deadlineDays: 24,
        },
        {
          score: 89,
          ref: "03/2026/CS",
          title: "Étude géotechnique d'un centre de santé",
          buyer: "Établissement public",
          deadlineDays: 17,
        },
        {
          score: 83,
          ref: "27/2026/ENV",
          title: "Étude d'impact environnemental",
          buyer: "Agence régionale",
          deadlineDays: 13,
        },
        {
          score: 77,
          ref: "11/2026/LAB",
          title: "Essais de laboratoire sur matériaux",
          buyer: "Direction provinciale",
          deadlineDays: 10,
        },
        {
          score: 66,
          ref: "14/2026/VRD",
          title: "Contrôle des travaux de voirie",
          buyer: "Direction régionale",
          deadlineDays: 6,
        },
      ],
      statusLines: [
        "Lecteur lit le CPS… article 12, moyens humains",
        "Juge vérifie la qualification… agrément requis",
        "Rédacteur s'inspire de 3 mémoires gagnés…",
        "Greffier prépare les CV de l'équipe…",
      ],
      sequence: {
        readerFile: "CPS_81_2026_PDENE.pdf",
        readerPages: 148,
        readerStopPage: 32,
        score: 94,
        facts: ["Agrément requis", "Ingénieur topographe", "J-24"],
      },
    },
    pains: [
      {
        title: "Des réponses fréquentes",
        body: "Plusieurs consultations par mois, chacune avec son CPS, ses critères et ses délais.",
      },
      {
        title: "Des mémoires lourds",
        body: "Méthodologie, moyens humains, planning, références : des dizaines de pages à chaque fois.",
      },
      {
        title: "De petites équipes",
        body: "Les ingénieurs qui rédigent sont aussi ceux qui produisent. Chaque heure de rédaction coûte.",
      },
    ],
    answers: [
      {
        step: "Détecter",
        title: "Seulement les études de votre spécialité",
        body: "Vos profils de veille par discipline, région et montant. Le pré-score écarte le bruit.",
      },
      {
        step: "Lire",
        title: "Le CPS lu à votre place",
        body: "Qualifications, agréments, profils exigés, critères techniques et pondérations, avec la page source.",
      },
      {
        step: "Décider",
        title: "Éligible ou pas, en une minute",
        body: "Vos qualifications, références et CV comparés aux exigences. Les manques sont listés.",
      },
      {
        step: "Répondre",
        title: "Un mémoire qui vous ressemble",
        body: "Plan tiré des critères du CPS, sections rédigées à partir de vos mémoires gagnés, CV et références insérés.",
      },
    ],
    memo: {
      section: "3. Moyens humains affectés",
      text: "L'équipe proposée est conduite par un ingénieur topographe principal, appuyé par deux techniciens géomètres et un opérateur SIG, mobilisés à plein temps pendant la phase de levés.",
    },
    recommendedPlans: ["pro"],
    planReason:
      "Pro inclut la mémoire technique IA, 5 membres et 3 profils de veille : assez pour une équipe qui répond chaque semaine.",
    faqIds: ["ia-trompe", "donnees-sensibles", "arabe-scans", "cher"],
    closing: { title: "Votre prochain mémoire, déjà commencé", highlight: ["déjà", "commencé"] },
  },
  {
    slug: "societes-de-services",
    name: "Sociétés de services",
    tagline:
      "Informatique, nettoyage, gardiennage, formation, restauration, impression, événementiel.",
    trades: [
      "Informatique",
      "Nettoyage",
      "Gardiennage",
      "Formation",
      "Restauration",
      "Impression",
      "Événementiel",
      "Maintenance",
    ],
    hero: {
      badge: "Sociétés de services · gros volumes d'appels d'offres",
      title: "Répondez à plus d'appels d'offres, sans y passer vos nuits.",
      titleHighlight: ["plus", "d'appels"],
      subtitle:
        "Amnay trie chaque jour les AO de vos prestations, vérifie votre éligibilité, lit les bordereaux de prix et prépare le dossier administratif. Vous ne travaillez que ceux que vous pouvez gagner.",
      windowTitle: "app.amnay — Veille · Services",
      rows: [
        {
          score: 93,
          ref: "22/2026/NET",
          title: "Nettoyage des locaux administratifs",
          buyer: "Collectivité territoriale",
          deadlineDays: 12,
        },
        {
          score: 87,
          ref: "09/2026/IT",
          title: "Assistance technique informatique",
          buyer: "Acheteur public — national",
          deadlineDays: 9,
        },
        {
          score: 84,
          ref: "31/2026/GAR",
          title: "Gardiennage et surveillance de sites",
          buyer: "Établissement public",
          deadlineDays: 15,
        },
        {
          score: 72,
          ref: "05/2026/FOR",
          title: "Formation du personnel administratif",
          buyer: "Direction régionale",
          deadlineDays: 8,
        },
        {
          score: 61,
          ref: "18/2026/RES",
          title: "Restauration collective",
          buyer: "Acheteur public — provincial",
          deadlineDays: 5,
        },
      ],
      statusLines: [
        "Éclaireur trie 1 240 avis… 9 retenus",
        "Lecteur lit le bordereau des prix… 46 lignes",
        "Juge vérifie l'éligibilité… attestation CNSS",
        "Greffier pré-remplit la déclaration sur l'honneur…",
      ],
      sequence: {
        readerFile: "BPDE_22_2026_NET.pdf",
        readerPages: 64,
        readerStopPage: 18,
        score: 93,
        facts: ["CNSS à jour", "Caution 8 000 MAD", "J-12"],
      },
    },
    pains: [
      {
        title: "De gros volumes d'AO",
        body: "Des dizaines d'avis par semaine sur vos prestations. Impossible de tout ouvrir.",
      },
      {
        title: "Le prix décide",
        body: "Bordereaux, quantités, prix d'attribution passés : sans contexte, on chiffre à l'aveugle.",
      },
      {
        title: "Éligibilité et délais",
        body: "Une attestation expirée ou un délai manqué, et le dossier est écarté.",
      },
    ],
    answers: [
      {
        step: "Détecter",
        title: "Le tri fait pour vous",
        body: "Chaque avis noté sur 100 selon vos prestations, vos zones et vos montants. Les refus affinent le tri.",
      },
      {
        step: "Lire",
        title: "Bordereaux et règlement lus",
        body: "Quantités, lots, pièces exigées, caution, délais : l'essentiel en une fiche, avec la page source.",
      },
      {
        step: "Décider",
        title: "Le prix en contexte",
        body: "Acheteurs, concurrents et prix d'attribution passés pour chiffrer juste.",
      },
      {
        step: "Répondre",
        title: "Le dossier administratif prêt",
        body: "Pièces du coffre-fort vérifiées, expirations rappelées à J-30, déclarations pré-remplies.",
      },
    ],
    memo: {
      section: "2. Organisation de la prestation",
      text: "La prestation est assurée par une équipe de six agents encadrés par un chef d'équipe, selon un planning quotidien validé avec l'administration et un contrôle qualité hebdomadaire.",
    },
    recommendedPlans: ["pro", "business"],
    planReason:
      "Pro pour une équipe qui répond chaque semaine ; Business au-delà, avec 15 membres et des profils de veille illimités.",
    faqIds: ["virement", "cher", "credit", "maroc-business"],
    closing: {
      title: "Ne travaillez que les AO que vous pouvez gagner",
      highlight: ["pouvez", "gagner"],
    },
  },
];

export const segmentPageCopy = {
  painsLabel: "Ce qui vous coûte",
  painsTitle: "On connaît votre quotidien",
  painsHighlight: ["quotidien"],
  answersLabel: "Ce que fait Amnay",
  answersTitle: "Le même produit, avec vos mots",
  answersHighlight: ["vos", "mots"],
  proofsLabel: "Preuves",
  proofsTitle: "Cinq preuves, pas des promesses",
  proofsHighlight: ["preuves,"],
  memoLabel: "Mémoire technique",
  memoTitle: "Rédigé avec vous, dans votre style",
  memoHighlight: ["votre", "style"],
  memoBody:
    "Importez vos mémoires gagnés : Amnay apprend votre organisation et votre ton, puis propose chaque section avec ses sources.",
  memoSource: "Inspiré de : Mémoire gagné · 2025",
  memoAgent: "Rédacteur",
  comparatorLabel: "Comparateur",
  comparatorTitle: "Faites le calcul vous-même",
  comparatorHighlight: ["calcul"],
  planLabel: "Formule conseillée",
  planTitle: "La formule qui vous correspond",
  planHighlight: ["vous", "correspond"],
  planPerMonth: "/mois en annuel",
  faqLabel: "Questions",
  faqTitle: "Vos questions",
  faqHighlight: ["questions"],
  marqueeLabel: "Métiers couverts",
};

export function getSegment(slug: string) {
  return segments.find((s) => s.slug === slug);
}
