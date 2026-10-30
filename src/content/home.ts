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
} as const;

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
  title: "Répondre à un marché public coûte trop cher aux PME",
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
  title: "Comment ça marche",
  callout:
    "Amnay ne remplace ni la décision ni la signature : il les prépare.",
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
  title: "Les 5 preuves",
  cards: [
    {
      visual: "citation",
      title: "Chaque réponse cite le fichier et la page",
      body: "Une information sans source n'existe pas. Amnay renvoie systématiquement au document d'origine.",
      sample: { file: "DCE_81_2026_PDENE.pdf", page: "p. 47", quote: "« L'attributaire doit justifier d'une qualification RME… »" },
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
  title: "Sept agents, un par étape",
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

export const faq = {
  id: "faq",
  title: "Questions fréquentes",
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
  title: "Réserver une démo",
  pitch: "30 minutes avec notre équipe, sur un vrai appel d'offres de votre secteur",
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
  primary: "Commencer l'essai gratuit",
  secondary: "Réserver une démo",
} as const;

export const footer = {
  promise: "Amnay lit les marchés publics pour vous.",
  solutionLine: "Une solution IZEMX",
  copyright: "© 2026 IZEMX",
} as const;

export const problem = undefined as never; // placeholder guard (replaced above)
