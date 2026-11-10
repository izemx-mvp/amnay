import { billing, getPlan, trial } from "@/config/site";
import { frNumber } from "@/lib/format";

/**
 * Product copy reused across pages (home, fonctionnalités, segment pages):
 * the 4 steps and their screens, the 7 agents, the proofs, sample tenders.
 */

/** Infinite marquee under the hero. */
export const categories = [
  "Topographie",
  "Géotechnique",
  "Nettoyage",
  "Gardiennage",
  "Informatique",
  "Formation",
  "Restauration",
  "Études VRD",
  "Laboratoire",
  "Fournitures de bureau",
  "Contrôle technique",
  "Maintenance",
  "Assistance technique",
  "Communication",
] as const;

export type TenderRow = {
  score: number;
  ref: string;
  title: string;
  buyer: string;
  deadlineDays: number;
};

/** Sample tenders (fictional, labelled "Données d'exemple" wherever shown). */
export const tenderRows: TenderRow[] = [
  {
    score: 92,
    ref: "81/2026/PDENE",
    title: "Levés topographiques et SIG",
    buyer: "Acheteur public — régional",
    deadlineDays: 24,
  },
  {
    score: 88,
    ref: "03/2026/CS",
    title: "Étude géotechnique d'un centre de santé",
    buyer: "Établissement public",
    deadlineDays: 17,
  },
  {
    score: 81,
    ref: "22/2026/NET",
    title: "Prestations de nettoyage des locaux administratifs",
    buyer: "Collectivité territoriale",
    deadlineDays: 12,
  },
  {
    score: 76,
    ref: "09/2026/IT",
    title: "Assistance technique informatique",
    buyer: "Acheteur public — national",
    deadlineDays: 9,
  },
  {
    score: 64,
    ref: "14/2026/VRD",
    title: "Contrôle des travaux de voirie",
    buyer: "Direction régionale",
    deadlineDays: 6,
  },
];

/* ───────────────────────────── 4 steps ───────────────────────────── */

export const steps = {
  callout: "Amnay ne remplace ni la décision ni la signature : il les prépare.",
  items: [
    {
      n: "01",
      name: "Détecter",
      body: "Chaque jour, tous les AO collectés, comparés à votre profil, notés sur 100.",
    },
    {
      n: "02",
      name: "Lire",
      body: "Retrait officiel du dossier, lecture du CPS, du règlement, des bordereaux — même scannés, même en arabe.",
    },
    {
      n: "03",
      name: "Décider",
      body: "Score complet, critères et pondérations, pièces exigées, éligibilité automatique.",
    },
    {
      n: "04",
      name: "Répondre et suivre",
      body: "Mémoire technique dans votre style, dossier administratif pré-rempli, pipeline, rappels, résultats.",
    },
  ],
  screens: {
    detect: {
      title: "app.amnay — Veille du jour",
      profile: "Profil · Topographie, SIG, VRD",
      counter: "1 240 avis lus aujourd'hui",
    },
    read: {
      title: "app.amnay — CPS.pdf",
      file: "CPS.pdf",
      page: "p. 47",
      facts: [
        { label: "Qualification exigée", value: "RME", cite: "CPS.pdf · p. 47" },
        { label: "Caution provisoire", value: "15 000 MAD", cite: "RC.pdf · p. 12" },
        { label: "Délai d'exécution", value: "6 mois", cite: "CPS.pdf · p. 9" },
      ],
    },
    decide: {
      title: "app.amnay — Go / No-Go",
      verdict: "GO",
      score: 92,
      verdictNote: "Éligible · 14 critères vérifiés",
      criteria: [
        { label: "Références similaires", value: 95 },
        { label: "Moyens humains", value: 88 },
        { label: "Qualification RME", value: 100 },
        { label: "Délai de réponse", value: 72 },
      ],
      pieces: ["Attestation fiscale", "Attestation CNSS", "Caution provisoire"],
    },
    respond: {
      title: "app.amnay — Mémoire technique",
      outline: [
        "1. Compréhension",
        "2. Méthodologie",
        "3. Moyens humains",
        "4. Planning",
        "5. Références",
      ],
      activeOutline: 1,
      heading: "2. Méthodologie d'intervention",
      text: "Notre équipe réalisera les levés topographiques en trois phases : reconnaissance du site et implantation du canevas, levés de détail au GNSS et à la station totale, puis intégration des données dans le SIG de l'acheteur, avec un contrôle qualité à chaque étape.",
      style: "Votre style · 3 mémoires appris",
    },
  },
} as const;

/* ───────────────────────────── 7 agents ───────────────────────────── */

export const agents = {
  logLabel: "Journal d'exemple",
  parallelLabel: "En continu, en parallèle",
  outputLabel: "Ce qu'il produit",
  note: "Un dossier public n'est lu qu'une fois pour tous : c'est ce qui rend le prix possible.",
  /** Order of the main pipeline; the others orbit. */
  pipeline: ["Éclaireur", "Lecteur", "Juge", "Rédacteur", "Greffier"],
  list: [
    {
      name: "Éclaireur",
      role: "Veille et pré-score",
      body: "Surveille le portail, compare à votre profil et note chaque AO sur 100.",
      output: "Liste du jour triée par pré-score, alertes et Daily Brief.",
      log: "Éclaireur · 0,6 s · 1 240 avis comparés à votre profil",
    },
    {
      name: "Lecteur",
      role: "Retrait et lecture du dossier",
      body: "Télécharge officiellement le dossier et le lit de bout en bout, scans et arabe inclus.",
      output: "Synthèse sourcée : chaque information renvoie au fichier et à la page.",
      log: "Lecteur · 42 s · 212 pages lues, dont 3 scans",
    },
    {
      name: "Juge",
      role: "Score complet et éligibilité",
      body: "Critères, pondérations, pièces exigées, verdict Go / No-Go argumenté.",
      output: "Score expliqué sur 100, éligibilité, liste des pièces à fournir.",
      log: "Juge · 1,8 s · 14 critères vérifiés",
    },
    {
      name: "Rédacteur",
      role: "Mémoire technique",
      body: "Rédige dans votre style, section par section, avec vos références.",
      output: "Plan conforme au CPS, sections sourcées, export Word / PDF.",
      log: "Rédacteur · 38 s · section 2 rédigée",
    },
    {
      name: "Greffier",
      role: "Dossier administratif",
      body: "Pré-remplit les bordereaux et vérifie chaque pièce exigée.",
      output: "Dossier administratif pré-rempli, pièces expirées signalées.",
      log: "Greffier · 4,2 s · 9 pièces vérifiées",
    },
    {
      name: "Analyste",
      role: "Intelligence marché",
      body: "Acheteurs, concurrents, prix d'attribution : le contexte avant de répondre.",
      output: "Fiches acheteurs et concurrents, simulateur de prix, post-mortem.",
      log: "Analyste · 2,4 s · 37 attributions comparées",
    },
    {
      name: "Vigie",
      role: "Suivi et rappels",
      body: "Rectificatifs, échéances, pipeline : rien ne passe entre les mailles.",
      output: "Rappels J-10 / J-3 / J-1, rectificatifs, notifications e-mail et Telegram.",
      log: "Vigie · en continu · 1 rectificatif détecté",
    },
  ],
} as const;

export type Agent = (typeof agents.list)[number];

/* ───────────────────────────── proofs ───────────────────────────── */

const starter = getPlan("starter");

export const proofs = {
  scanArabic: "يتعين على المتنافس الإدلاء بشهادة التأهيل والتصنيف",
  scanFrench:
    "Le soumissionnaire doit produire le certificat de qualification et de classification.",
  checklist: [
    { label: "Attestation fiscale", ok: true },
    { label: "Attestation CNSS", ok: true },
    { label: "Qualification RME", ok: true },
    { label: "Références similaires", ok: true },
    { label: "Caution provisoire", ok: false },
  ],
  checklistTodo: "à préparer",
  editorSource: "Extrait de vos mémoires",
  editorSourceText: "Nos équipes interviennent en binôme, avec un contrôle qualité à chaque étape.",
  editorAgent: "Rédacteur",
  editorText:
    "Les levés seront réalisés en binôme, avec un contrôle qualité systématique à chaque phase du chantier.",
  priceFrom: "dès",
  priceValue: frNumber(starter.monthly),
  priceUnit: `${billing.currencyLabel}/mois`,
  priceBack: `${trial.days} jours d'essai · sans carte bancaire`,
  citation: {
    title: "Chaque réponse cite le fichier et la page",
    body: "Une information sans source n'existe pas. Amnay renvoie systématiquement au document d'origine.",
    file: "DCE_81_2026_PDENE.pdf",
    page: "p. 47",
    quote: "« L'attributaire doit justifier d'une qualification RME… »",
  },
  scans: {
    title: "Scans et arabe pris en charge",
    body: "Dossiers scannés, pièces en arabe, annexes manuscrites : la lecture reste complète.",
    file: "reglement_scan_023.pdf",
    pages: "212 pages",
    lang: "عربى + FR",
  },
  eligibility: {
    title: "Éligibilité vérifiée avant de travailler",
    body: "Vous savez en une minute si vous pouvez gagner, avant d'investir une heure.",
  },
  editor: {
    title: "Mémoire rédigé dans votre style",
    body: "Amnay apprend votre façon d'écrire et votre organisation, puis propose chaque section avec vous.",
  },
  price: {
    title: `À partir de ${frNumber(starter.monthly)} ${billing.currencyLabel}/mois`,
    body: "Essai gratuit, sans carte bancaire. Comparez sur un vrai appel d'offres.",
  },
} as const;
