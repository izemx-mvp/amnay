/**
 * Single source of truth for every configurable value on the AMNAY site.
 * No price, URL, contact or quota may be hard-coded anywhere else.
 */

export const site = {
  name: "Amnay",
  company: "IZEMX",
  tagline: "Amnay lit les marchés publics pour vous.",
  contactEmail: "contact@izemx.com",
  /** Signup / trial app — every trial CTA links here with stored UTMs. */
  trialUrl: "https://app.amnay.ma/inscription",
  /** Booking embed URL (Cal.com / Calendly …). Empty = placeholder card. */
  demoBookingUrl: "",
  /** Cookie consent storage keys. */
  consentKey: "amnay_cookie_consent",
} as const;

export const anchors = [
  { id: "fonctionnement", label: "Fonctionnement" },
  { id: "agents", label: "Agents" },
  { id: "tarifs", label: "Tarifs" },
  { id: "fondateurs", label: "Offre Fondateurs" },
  { id: "faq", label: "FAQ" },
] as const;

/** Legal routes (placeholder pages for the MVP). */
export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/conditions-generales", label: "Conditions générales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
] as const;

export type Plan = {
  id: "starter" | "pro" | "business";
  name: string;
  monthly: number; // MAD HT / month
  yearly: number; // MAD HT / year
  creditsPerMonth: number;
  approxAnalyses: string;
  members: string;
  profiles: string;
  storage: string;
  features: string[];
  support: string;
  tagline: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 490,
    yearly: 4900,
    creditsPerMonth: 150,
    approxAnalyses: "≈10 analyses",
    members: "2 membres",
    profiles: "1 profil",
    storage: "2 Go",
    support: "Support e-mail",
    features: ["150 crédits/mois", "2 membres", "1 profil", "2 Go", "Support e-mail"],
    tagline: "TPE, 1 à 3 réponses/mois",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 1490,
    yearly: 14900,
    creditsPerMonth: 600,
    approxAnalyses: "≈40 analyses",
    members: "5 membres",
    profiles: "3 profils",
    storage: "10 Go",
    support: "WhatsApp + e-mail",
    features: [
      "600 crédits/mois",
      "5 membres",
      "3 profils",
      "10 Go",
      "Mémoire IA inclus",
      "Intelligence marché",
      "WhatsApp + e-mail",
    ],
    tagline: "PME qui répond chaque semaine",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: 3490,
    yearly: 34900,
    creditsPerMonth: 1800,
    approxAnalyses: "≈120 analyses",
    members: "15 membres",
    profiles: "Profils illimités",
    storage: "50 Go",
    support: "Support prioritaire + BA dédié",
    features: [
      "1 800 crédits/mois",
      "15 membres",
      "Profils illimités",
      "50 Go",
      "API / MCP",
      "Support prioritaire + BA dédié",
    ],
    tagline: "Équipe AO structurée",
  },
];

export const pricing = {
  currencyLabel: "MAD HT",
  yearlyNote: "2 mois offerts",
  proMonthlyEquivalent: 1242, // Pro yearly => per month, used in FAQ & comparator
  hosted: {
    label: "Entreprise auto-hébergé",
    detail: "Vos données sur vos serveurs",
    yearly: 90000,
  },
  creditLine:
    "1 crédit = 1 MAD HT · packs dès 220 MAD, sans expiration · paiement par virement accepté",
} as const;

export const founders = {
  discountLabel: "-30 % sur l'abonnement annuel",
  /** -30 % on the annual subscription, plan of the client's choice. */
  placesTotal: 50,
  placesRemaining: 50,
  /** Countdown target (Morocco time). */
  deadlineISO: "2027-03-31T23:59:59+01:00",
  priceGuarantee: "Prix garanti 2 ans",
  exchange: "En échange d'un témoignage et d'un cas client",
} as const;

export const comparator = {
  charged: {
    label: "Chargé d'appels d'offres",
    unitLabel: "Salaire mensuel brut",
    min: 8000,
    max: 15000,
    step: 500,
    default: 12000,
  },
  consultant: {
    label: "Consultant",
    unitLabel: "Coût par dossier",
    min: 5000,
    max: 25000,
    step: 500,
    default: 12000,
    dossiersMin: 1,
    dossiersMax: 6,
    dossiersDefault: 2,
  },
  amnayMonthly: pricing.proMonthlyEquivalent,
} as const;

export type SimulatorItem = {
  key: "analyses" | "lectures" | "memos" | "questions";
  label: string;
  weight: number; // credits per unit
  hint: string;
  default: number;
};

export const simulator: {
  items: SimulatorItem[];
  /** Monthly credit thresholds that pick a plan. */
  recommend: (credits: number) => Plan;
} = {
  items: [
    {
      key: "analyses",
      label: "Analyses complètes",
      weight: 15,
      hint: "Score, éligibilité, critères, pièces exigées",
      default: 5,
    },
    {
      key: "lectures",
      label: "Lectures partagées",
      weight: 5,
      hint: "Synthèse du dossier pour votre équipe",
      default: 10,
    },
    {
      key: "memos",
      label: "Mémoires techniques",
      weight: 90,
      hint: "Rédaction assistée dans votre style",
      default: 1,
    },
    {
      key: "questions",
      label: "Questions à Amnay",
      weight: 0.5,
      hint: "Interrogations sur les dossiers lus",
      default: 60,
    },
  ],
  recommend: (credits: number): Plan => {
    const [starter, pro, business] = plans;
    if (!starter || !pro || !business) throw new Error("Plans misconfigured");
    if (credits <= starter.creditsPerMonth) return starter;
    if (credits <= pro.creditsPerMonth) return pro;
    return business;
  },
};

export const offices = [
  {
    city: "Paris",
    address: "78 av. Champs-Élysées, Bureau 326, 75008",
  },
  {
    city: "Casablanca",
    address: "96 Bd Anfa, Rés. Printemps d'Anfa",
  },
  {
    city: "Dubai",
    address: "IFZA Business Park, DDP Dubai Silicon Oasis",
  },
] as const;

export const heroStats = [
  {
    value: 50000,
    prefix: "+",
    suffix: "",
    label: "appels d'offres publiés par an",
  },
  {
    value: 380,
    prefix: "",
    suffix: " Mds MAD",
    label: "d'investissement public en 2026",
  },
  {
    value: 54681,
    prefix: "",
    suffix: "",
    label: "entreprises inscrites sur le portail",
  },
] as const;

/** Routes for placeholder legal pages. */
export const legalRoutes = {
  mentionsLegales: "/mentions-legales",
  conditionsGenerales: "/conditions-generales",
  politiqueConfidentialite: "/politique-confidentialite",
} as const;
