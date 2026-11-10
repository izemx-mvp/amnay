/**
 * Single source of truth for every configurable value on the AMNAY site.
 * No price, URL, contact, quota or date may be hard-coded anywhere else:
 * content files and components read (and compute from) this file.
 */

export const site = {
  name: "Amnay",
  company: "IZEMX",
  tagline: "Amnay lit les marchés publics pour vous.",
  /** Public origin of this site — used for absolute og:image / twitter:image URLs. */
  url: "https://amnay-demo.izemx.com",
  /** Social preview (1200×630), served from public/. */
  ogImage: "/og-image.jpg",
  /** Cookie consent storage key. */
  consentKey: "amnay_cookie_consent",
  copyrightYear: 2026,
} as const;

/* ───────────────────────────── URLs & contacts ───────────────────────────── */

export const urls = {
  /** Signup / trial app — every trial CTA links here with stored UTMs. */
  trialUrl: "https://app.amnay.ma/inscription",
  /** Booking embed URL (Cal.com / Calendly …). Empty = styled calendar placeholder. */
  demoBookingUrl: "",
  /** Customer login (à confirmer). */
  appLoginUrl: "https://app.amnay.ma/connexion",
} as const;

export const contacts: { email: string; phone: string; whatsapp: string } = {
  email: "contact@izemx.com",
  /** Leave empty to hide. Format: "+212 …". */
  phone: "",
  whatsapp: "",
};

export const offices = [
  { city: "Paris", address: "78 av. Champs-Élysées, Bureau 326, 75008" },
  { city: "Casablanca", address: "96 Bd Anfa, Rés. Printemps d'Anfa" },
  { city: "Dubai", address: "IFZA Business Park, DDP Dubai Silicon Oasis" },
] as const;

/* ───────────────────────────────── Plans ───────────────────────────────── */

export type PlanId = "starter" | "pro" | "business";

export type Plan = {
  id: PlanId;
  name: string;
  /** MAD HT / month, monthly billing. */
  monthly: number;
  /** MAD HT / year, annual billing (2 months free). */
  yearly: number;
  /** Credits included every month. */
  credits: number;
  members: number;
  /** null = unlimited. */
  profiles: number | null;
  storageGb: number;
  support: string;
  /** Who it's for. */
  target: string;
  /** Feature flags used by the comparison table. */
  memo: boolean;
  market: boolean;
  api: boolean;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 490,
    yearly: 4900,
    credits: 150,
    members: 2,
    profiles: 1,
    storageGb: 2,
    support: "Support e-mail",
    target: "TPE, 1 à 3 réponses par mois",
    memo: false,
    market: false,
    api: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 1490,
    yearly: 14900,
    credits: 600,
    members: 5,
    profiles: 3,
    storageGb: 10,
    support: "WhatsApp + e-mail",
    target: "PME qui répond chaque semaine",
    memo: true,
    market: true,
    api: false,
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: 3490,
    yearly: 34900,
    credits: 1800,
    members: 15,
    profiles: null,
    storageGb: 50,
    support: "Support prioritaire + BA dédié",
    target: "Équipe AO structurée",
    memo: true,
    market: true,
    api: true,
  },
];

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan ${id}`);
  return plan;
}

export const billing = {
  currencyLabel: "MAD HT",
  /** Annual = 10 × monthly. */
  freeMonths: 2,
} as const;

/* ──────────────────────────────── Credits ──────────────────────────────── */

/** 1 crédit = 1 MAD HT. Costs in credits per operation. */
export const creditCosts = {
  madPerCredit: 1,
  /** Veille, pré-score, alertes, Daily Brief. */
  watch: 0,
  analysis: 15,
  analysisPerScannedPage: 0.1,
  /** Dossier already read for another client. */
  sharedRead: 5,
  question: 0.5,
  memoSection: 6,
  /** Typical full mémoire technique. */
  memoApprox: 90,
  editMin: 2,
  editMax: 5,
  importWonMemo: 3,
} as const;

export const packs = [
  { id: "decouverte", name: "Découverte", credits: 200, price: 220 },
  { id: "standard", name: "Standard", credits: 500, price: 500 },
  { id: "equipe", name: "Équipe", credits: 1500, price: 1350 },
  { id: "volume", name: "Volume", credits: 5000, price: 4000 },
] as const;

export const trial = {
  days: 14,
  credits: 150,
  profiles: 1,
  members: 2,
  cardRequired: false,
} as const;

export const referral = { credits: 100 } as const;

/** Monthly simulator: units × credit cost, recommended plan by threshold. */
export const simulator = {
  items: [
    { key: "analyses", weight: creditCosts.analysis, default: 5 },
    { key: "lectures", weight: creditCosts.sharedRead, default: 10 },
    { key: "memos", weight: creditCosts.memoApprox, default: 1 },
    { key: "questions", weight: creditCosts.question, default: 60 },
  ],
  recommend(credits: number): Plan {
    return plans.find((p) => credits <= p.credits) ?? getPlan("business");
  },
} as const;

/* ─────────────────────────────── Founders ─────────────────────────────── */

export const founders = {
  placesTotal: 50,
  placesLeft: 50,
  /** -30 % on the annual subscription, plan of the client's choice. */
  discount: 0.3,
  priceLockYears: 2,
  /** Offer end (Morocco time). */
  deadlineISO: "2027-03-31T23:59:59+01:00",
} as const;

export const founderPrice = (plan: Plan) => Math.round(plan.yearly * (1 - founders.discount));

/* ────────────────────────────── Self-hosted ────────────────────────────── */

export const selfHosted = {
  yearly: 90000,
  setup: 45000,
  /** Alternative: monthly instalments over a fixed commitment. */
  monthly: 9000,
  months: 12,
  /** Fully-loaded yearly cost of an in-house tender officer, for comparison. */
  benchmarkYearly: 150000,
} as const;

/* ─────────────────────────────── Payment ─────────────────────────────── */

export const payment = {
  methods: [
    {
      id: "virement",
      label: "Virement bancaire",
      detail: "Facture pro forma, activation à réception des fonds. Mode par défaut au Maroc.",
      available: true,
    },
    {
      id: "stripe",
      label: "Carte bancaire (Stripe)",
      detail: "Pour les clients facturés en euros.",
      available: true,
    },
    {
      id: "cmi",
      label: "CMI / Payzone",
      detail: "Paiement par carte marocaine.",
      available: false,
    },
  ],
  /** Days data is kept after cancellation. */
  retentionDays: 90,
} as const;

/* ─────────────────────────────── Comparator ─────────────────────────────── */

export const comparator = {
  charged: { min: 8000, max: 15000, step: 500, default: 12000 },
  consultant: {
    min: 5000,
    max: 25000,
    step: 500,
    default: 12000,
    dossiersMin: 1,
    dossiersMax: 6,
    dossiersDefault: 2,
  },
  /** Pro on annual billing, per month. */
  amnayMonthly: Math.round(getPlan("pro").yearly / 12),
} as const;

/* ─────────────────────────────── Webinar ─────────────────────────────── */

export const webinar = {
  /** ISO date of the next session; empty = "date à annoncer". */
  nextSessionISO: "",
  durationMin: 45,
} as const;

/* ─────────────────────────────── Misc ─────────────────────────────── */

export const heroStats = [
  { value: 50000, prefix: "+", suffix: "", label: "appels d'offres publiés par an" },
  { value: 380, prefix: "", suffix: " Mds MAD", label: "d'investissement public en 2026" },
  { value: 54681, prefix: "", suffix: "", label: "entreprises inscrites sur le portail" },
] as const;
