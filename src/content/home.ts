import { comparator, heroStats, plans, pricing, simulator } from "@/config/site";

/**
 * All landing-page copy lives here so a future Arabic RTL version can reuse it.
 * Type-safe re-exports of the config keep prices out of the copy file.
 */
export { comparator, heroStats, plans, pricing, simulator };

export const hero = {
  badge: "7 agents IA · Portail marocain des marchés publics",
  title: "Amnay lit les marchés publics pour vous.",
  subtitle:
    "Les autres vous envoient des titres. Amnay télécharge et lit le dossier, vous dit si vous pouvez gagner, et rédige votre mémoire technique avec vous.",
  primaryCta: "Commencer l'essai gratuit",
  secondaryCta: "Réserver une démo",
  microcopy: "14 jours · 150 crédits offerts · sans carte bancaire",
  demoDataLabel: "Données d'exemple",
  statusLines: [
    "Lecteur analyse le DCE… page 47/212",
    "Juge vérifie l'éligibilité… 12 critères",
    "Éclaireur compare votre profil… 3 AO",
    "Rédacteur prépare le mémoire… section 2",
  ],
  windowTitle: "app.amnay — Daily Brief",
  titleHighlight: ["marchés", "publics"],
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
} as const;

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

export const problem = {
  id: "probleme",
  index: "02",
  label: "Le problème",
  title: "Répondre à un marché public coûte trop cher aux PME",
  /** Big statement: `n` ticks up, `before`/`after` surround it. */
  statement: [
    { before: "Un dossier de", n: 212, after: "pages." },
    { before: "", n: 3, after: "jours pour répondre." },
    { before: "Personne pour le lire.", n: null, after: "" },
  ],
  receipt: {
    header: "REÇU · RÉPONSE AUX AO",
    subheader: "PME · MAROC · 2026",
    title: "Ce que ça coûte aujourd'hui",
    lead: "Sans compter les marchés manqués, impossibles à chiffrer. Et chaque dossier repart d'une page blanche.",
    lines: [
      { label: "Chargé d'AO", amount: "8 000–15 000", unit: "MAD/mois" },
      { label: "Consultant", amount: "5 000–25 000", unit: "MAD/dossier" },
      { label: "Marchés manqués", amount: "—", unit: "impossible à chiffrer" },
    ],
    /** Total and footer amounts are computed from config/site.ts. */
    totalLabel: "TOTAL · chargé d'AO sur 12 mois",
    footer: "Amnay Pro, en annuel",
  },
  cards: [
    {
      icon: "eye-off",
      title: "On ne voit pas les bons appels d'offres",
      body: "Le portail publie des dizaines d'avis par jour. Sans veille dédiée, les AO de votre secteur passent inaperçus jusqu'à ce qu'il soit trop tard.",
    },
    {
      icon: "file-stack",
      title: "On ne lit pas les dossiers",
      body: "50 à 300 pages par dossier, souvent scannées, parfois en arabe. Les lire à fond demande des heures que votre équipe n'a pas.",
    },
    {
      icon: "shield-alert",
      title: "On répond sans savoir si on est éligible",
      body: "Attestation expirée, qualification manquante, référence absente… le dossier est écarté avant même l'ouverture des plis.",
    },
    {
      icon: "repeat",
      title: "On recommence chaque mémoire de zéro",
      body: "Moyens humains, méthodologie, références : chaque réponse repart d'une page blanche, alors que votre savoir-faire ne change pas.",
    },
  ],
  costBox: {
    title: "Ce que ça coûte aujourd'hui",
    lines: [
      "Chargé d'AO : 8 000–15 000 MAD/mois",
      "Consultant : 5 000–25 000 MAD par dossier",
      "Des marchés manqués impossibles à chiffrer",
    ],
  },
} as const;

export const howItWorks = {
  id: "fonctionnement",
  index: "03",
  label: "Fonctionnement",
  title: "Comment ça marche",
  highlight: ["marche"],
  screens: {
    detect: {
      title: "app.amnay — Veille du jour",
      profile: "Profil · Topographie, SIG, VRD",
      counter: "1 240 avis lus aujourd'hui",
    },
    read: {
      title: "app.amnay — CPS.pdf",
      file: "CPS.pdf",
      facts: [
        { label: "Qualification exigée", value: "RME", cite: "CPS.pdf · p. 47" },
        { label: "Caution provisoire", value: "15 000 MAD", cite: "RC.pdf · p. 12" },
        { label: "Délai d'exécution", value: "6 mois", cite: "CPS.pdf · p. 9" },
      ],
    },
    decide: {
      title: "app.amnay — Go / No-Go",
      verdict: "GO",
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
  callout: "Amnay ne remplace ni la décision ni la signature : il les prépare.",
  steps: [
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
} as const;

export const proofs = {
  id: "preuves",
  index: "04",
  label: "Preuves",
  title: "Cinq preuves, pas des promesses",
  highlight: ["preuves,"],
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
  editorText:
    "Les levés seront réalisés en binôme, avec un contrôle qualité systématique à chaque phase du chantier.",
  priceFrom: "dès",
  priceBack: "14 jours d'essai · sans carte bancaire",
  cards: [
    {
      visual: "citation",
      title: "Chaque réponse cite le fichier et la page",
      body: "Une information sans source n'existe pas. Amnay renvoie systématiquement au document d'origine.",
      sample: {
        file: "DCE_81_2026_PDENE.pdf",
        page: "p. 47",
        quote: "« L'attributaire doit justifier d'une qualification RME… »",
      },
    },
    {
      visual: "scans",
      title: "Scans et arabe pris en charge",
      body: "Dossiers scannés, pièces en arabe, annexes manuscrites : la lecture reste complète.",
      sample: { file: "reglement_scan_023.pdf", pages: "212 pages", lang: "عربى + FR" },
    },
    {
      visual: "eligibility",
      title: "Éligibilité vérifiée avant de travailler",
      body: "Vous savez en une minute si vous pouvez gagner, avant d'investir une heure.",
      sample: null,
    },
    {
      visual: "editor",
      title: "Mémoire rédigé dans votre style",
      body: "Amnay apprend votre façon d'écrire et votre organisation, puis propose chaque section avec vous.",
      sample: null,
    },
    {
      visual: "price",
      title: "À partir de 490 MAD HT/mois",
      body: "Essai gratuit, sans carte bancaire. Comparez sur un vrai appel d'offres.",
      sample: null,
    },
  ],
} as const;

export const agents = {
  id: "agents",
  index: "05",
  label: "Agents",
  title: "Sept agents, un par étape",
  highlight: ["agents,"],
  logLabel: "Journal d'exemple",
  parallelLabel: "En continu, en parallèle",
  /** Order of the main pipeline; the others orbit. */
  pipeline: ["Éclaireur", "Lecteur", "Juge", "Rédacteur", "Greffier"],
  logs: {
    Éclaireur: "Éclaireur · 0,6 s · 1 240 avis comparés à votre profil",
    Lecteur: "Lecteur · 42 s · 212 pages lues, dont 3 scans",
    Juge: "Juge · 1,8 s · 14 critères vérifiés",
    Rédacteur: "Rédacteur · 38 s · section 2 rédigée",
    Greffier: "Greffier · 4,2 s · 9 pièces vérifiées",
    Analyste: "Analyste · 2,4 s · 37 attributions comparées",
    Vigie: "Vigie · en continu · 1 rectificatif détecté",
  } as Record<string, string>,
  note: "Un dossier public n'est lu qu'une fois pour tous : c'est ce qui rend le prix possible.",
  list: [
    {
      name: "Éclaireur",
      role: "Veille et pré-score",
      body: "Surveille le portail, compare à votre profil et note chaque AO sur 100.",
    },
    {
      name: "Lecteur",
      role: "Retrait et lecture du dossier",
      body: "Télécharge officiellement le dossier et le lit de bout en bout, scans inclus.",
    },
    {
      name: "Juge",
      role: "Score complet et éligibilité",
      body: "Critères, pondérations, pièces exigées, verdict Go / No-Go argumenté.",
    },
    {
      name: "Rédacteur",
      role: "Mémoire technique",
      body: "Rédige dans votre style, section par section, avec vos références.",
    },
    {
      name: "Greffier",
      role: "Dossier administratif",
      body: "Pré-remplit les bordereaux et vérifie chaque pièce exigée.",
    },
    {
      name: "Analyste",
      role: "Intelligence marché",
      body: "Acheteurs, concurrents, prix d'attribution : le contexte avant de répondre.",
    },
    {
      name: "Vigie",
      role: "Suivi et rappels",
      body: "Rectificatifs, échéances, pipeline : rien ne passe entre les mailles.",
    },
  ],
} as const;

export const comparatorCopy = {
  id: "comparateur",
  index: "06",
  label: "Comparateur",
  title: "Faites le calcul vous-même",
  highlight: ["calcul"],
  today: "Aujourd'hui",
  amnay: "Avec Amnay Pro",
  perMonth: "MAD / mois",
  modes: { charged: "Chargé d'AO", consultant: "Consultant" },
  dossiersLabel: "Dossiers par mois",
  savingsLabel: "MAD économisés par an",
  amnayNote: "Pro en annuel, mensualisé",
} as const;

export const pricingCopy = {
  id: "tarifs",
  index: "07",
  label: "Tarifs",
  title: "Un prix public, sans surprise",
  highlight: ["public,"],
  monthly: "Mensuel",
  yearly: "Annuel",
  perMonth: "/mois",
  perYear: "/an",
  yearlyEquivalent: "soit {n} MAD HT/mois",
  popular: "Le plus choisi",
  recommended: "Recommandé pour vous",
  cta: "Essayer gratuitement",
  hostedCta: "Nous contacter",
  simulator: {
    title: "simulateur — crédits / mois",
    intro: "Estimez votre usage mensuel",
    total: "crédits / mois",
    plan: "Plan recommandé",
    usage: "du quota mensuel",
    perUnit: "{n} crédit(s) / unité",
  },
} as const;

export const foundersCopy = {
  id: "fondateurs",
  index: "08",
  label: "Offre Fondateurs",
  title: "50 places pour construire Amnay avec nous",
  highlight: ["50", "places"],
  passLabel: "PASS FONDATEUR",
  serialPrefix: "FONDATEUR Nº",
  countdownLabel: "Fin de l'offre",
  units: { days: "jours", hours: "heures", minutes: "min" },
  placesLabel: "{n} places restantes sur {total}",
  cta: "Réserver ma place",
  planNote: "Sur le plan de votre choix",
} as const;

export const faq = {
  id: "faq",
  index: "09",
  label: "FAQ",
  title: "Les objections qu'on entend le plus",
  highlight: ["objections"],
  demoPrompt: "Une autre question ? Posez-la pendant la démo.",
  items: [
    {
      q: "On a déjà Maroc Business",
      a: "Gardez-le pour les statistiques. Amnay lit vos dossiers, vérifie votre éligibilité et rédige votre mémoire. Comparez les deux sur un vrai appel d'offres pendant l'essai gratuit.",
    },
    {
      q: "L'IA se trompe",
      a: "Chaque information affiche sa source : fichier et page. Ce qui n'est pas dans le dossier reste vide, et vous validez chaque section du mémoire avant l'envoi.",
    },
    {
      q: "Nos données sont sensibles",
      a: "Vos mémoires et pièces sont isolés et chiffrés. Les fournisseurs IA n'entraînent pas leurs modèles sur vos données. Et si vous exigez l'isolement complet, l'offre Entreprise auto-hébergé existe.",
    },
    {
      q: "C'est cher",
      a: "Un chargé d'AO coûte 8 000 à 15 000 MAD/mois. Pro, c'est 1 242 MAD/mois en annuel — et il travaille tous les jours, weekends compris.",
    },
    {
      q: "On préfère payer par virement",
      a: "C'est le mode par défaut : nous émettons une facture pro forma, l'abonnement est activé à réception des fonds.",
    },
    {
      q: "On veut nos propres clés IA",
      a: "C'est possible en Entreprise. Mais le mode connecté vous évite de gérer des clés, des factures fournisseurs et les changements de modèles — pour le même résultat.",
    },
  ],
} as const;

export const demo = {
  id: "demo",
  index: "10",
  label: "Démo",
  title: "Réserver une démo",
  highlight: ["démo"],
  pitch: "30 minutes avec notre équipe, sur un vrai appel d'offres de votre secteur",
  calendarTagline: "30 min, sur un vrai AO de votre secteur",
  calendarNote: "Créneaux indicatifs : nous confirmons par téléphone.",
  slots: ["09:30", "11:00", "14:30", "16:00"],
  weekdays: ["L", "M", "M", "J", "V", "S", "D"],
  errors: {
    name: "Indiquez votre nom",
    company: "Indiquez votre société",
    phone: "Numéro invalide (ex. 06 12 34 56 78)",
    sector: "Choisissez un secteur",
    size: "Choisissez une taille",
  },
  slotChosen: "Créneau souhaité : {slot}",
  calendarPlaceholder:
    "Emplacement réservé au module de réservation. En attendant, utilisez le formulaire : nous revenons vers vous sous 24 h ouvrées.",
  form: {
    name: "Nom",
    company: "Société",
    phone: "Téléphone",
    sector: "Secteur",
    size: "Taille",
    submit: "Demander ma démo",
    success: "Merci ! Votre demande est bien reçue. Notre équipe vous contacte sous 24 h ouvrées.",
    sectors: [
      "Bureau d'études / Laboratoire",
      "Société de services",
      "Fournisseur / Distributeur",
      "Travaux / BTP",
      "Autre",
    ],
    sizes: ["1-5", "6-20", "21-50", "51-100", "100+"],
  },
} as const;

export const finalCta = {
  title: "Votre première veille en 10 minutes",
  highlight: ["10", "minutes"],
  primary: "Commencer l'essai gratuit",
  secondary: "Réserver une démo",
} as const;

export const footer = {
  promise: "Amnay lit les marchés publics pour vous.",
  solutionLine: "Une solution IZEMX",
  copyright: "© 2026 IZEMX",
} as const;
