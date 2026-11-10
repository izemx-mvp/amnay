import { creditCosts, getPlan } from "@/config/site";
import { frAuto } from "@/lib/format";

/** "/fonctionnalites" */

export const featuresMeta = { title: "Fonctionnalités — Amnay" };

export const featuresHero = {
  label: "Fonctionnalités",
  title: "De la veille à la réponse, tout est lu pour vous",
  highlight: ["tout", "est", "lu"],
  lead: "Sept agents IA détectent les appels d'offres, retirent et lisent les dossiers, vérifient votre éligibilité et rédigent avec vous. Chaque information cite sa source.",
  chips: ["Veille quotidienne", "Lecture du DCE", "Score expliqué", "Mémoire IA", "Pipeline"],
};

export const storySection = {
  index: "01",
  label: "Le parcours",
  title: "Quatre étapes, un seul outil",
  highlight: ["seul", "outil"],
};

/** Table of contents for the deep dives (anchors). */
export const deepDiveNav = [
  { id: "inscription", label: "Inscription" },
  { id: "daily-brief", label: "Daily Brief" },
  { id: "veille", label: "Veille et scoring" },
  { id: "fiche-ao", label: "Fiche AO" },
  { id: "regle-analyse", label: "Règle d'analyse" },
  { id: "memoire", label: "Mémoire IA" },
  { id: "bibliotheque", label: "Bibliothèque" },
  { id: "pipeline", label: "Pipeline" },
  { id: "intelligence", label: "Intelligence marché" },
  { id: "agents", label: "7 agents" },
] as const;

export const onboarding = {
  id: "inscription",
  kicker: "Inscription",
  title: "Un wizard en 7 étapes, et votre première veille tourne",
  body: "En une dizaine de minutes, Amnay sait qui vous êtes, ce que vous cherchez et comment vous écrivez.",
  windowTitle: "app.amnay — Bienvenue",
  stepsLabel: "Étape {n} sur {total}",
  steps: [
    {
      title: "Votre entreprise",
      body: "Raison sociale, ICE, secteurs, régions d'intervention.",
      fields: ["Raison sociale", "ICE", "Secteurs", "Régions"],
    },
    {
      title: "Identité de retrait des dossiers",
      body: "L'identité utilisée pour retirer officiellement les DCE sur le portail.",
      fields: ["Nom du retirant", "E-mail", "Téléphone"],
    },
    {
      title: "Critères de veille",
      body: "Mots-clés, catégories, montants, acheteurs à suivre ou à exclure.",
      fields: ["Mots-clés", "Montant min.", "Acheteurs exclus"],
    },
    {
      title: "Ce que l'IA a appris",
      body: "Importez vos mémoires gagnés : Amnay en retire votre plan type, votre ton, vos références.",
      fields: ["Mémoire_2025_SIG.docx", "Mémoire_2024_VRD.pdf", "Style détecté"],
    },
    {
      title: "Coffre-fort de pièces",
      body: "Attestations, statuts, qualifications, chacune avec sa date d'expiration.",
      fields: ["Attestation fiscale · expire le 30/06", "CNSS · expire le 15/04", "RC"],
    },
    {
      title: "Équipe et canaux",
      body: "Invitez vos collègues, choisissez e-mail et Telegram pour les alertes.",
      fields: ["2 membres invités", "E-mail", "Telegram"],
    },
    {
      title: "Lancement de la première veille",
      body: "Amnay parcourt les avis ouverts et vous livre un premier tri.",
      fields: ["Veille lancée", "Premiers résultats"],
    },
  ],
  prev: "Étape précédente",
  next: "Étape suivante",
};

export const dailyBrief = {
  id: "daily-brief",
  kicker: "Daily Brief",
  title: "Chaque matin, l'essentiel en une page",
  body: "Les nouveaux AO, les priorités, les échéances et ce qui a changé depuis hier. Par e-mail, Telegram, ou dans l'application.",
  windowTitle: "Daily Brief · mardi",
  blocks: {
    newLabel: "Nouveaux AO",
    newValue: "12",
    priorityLabel: "Priorités · score ≥ 90",
    priorityValue: "3",
    deadlinesLabel: "Échéances",
    deadlines: [
      { tag: "J-10", title: "Étude géotechnique · centre de santé" },
      { tag: "J-3", title: "Levés topographiques et SIG" },
      { tag: "J-1", title: "Assistance technique informatique" },
    ],
    alertsLabel: "Alertes",
    alerts: [
      { tone: "warning", text: "Pièce expirée : attestation CNSS" },
      { tone: "primary", text: "Rectificatif reçu : 81/2026/PDENE, date limite reportée" },
    ],
    funnelLabel: "Entonnoir du mois",
    funnel: [
      { label: "Détectés", value: 148 },
      { label: "Étudiés", value: 31 },
      { label: "Déposés", value: 9 },
      { label: "Gagnés", value: 3 },
    ],
  },
  bullets: [
    "Nouveaux AO et priorités score ≥ 90",
    "Échéances J-10, J-3, J-1",
    "Pièce expirée, rectificatif reçu",
    "Entonnoir détecté → déposé → gagné",
  ],
};

export const scoring = {
  id: "veille",
  kicker: "Veille et scoring",
  title: "Un pré-score sur l'avis, un score complet après lecture",
  body: "Chaque avis reçoit un pré-score selon vos profils de veille. Une fois le dossier lu, le Juge calcule le score complet. Vos décisions affinent le tri.",
  windowTitle: "app.amnay — À trier",
  preLabel: "Pré-score",
  fullLabel: "Score complet",
  profilesLabel: "Profils de veille",
  profiles: ["Topographie · Nord", "SIG · national", "VRD · > 500 k MAD"],
  decisions: [
    { id: "study", label: "À étudier" },
    { id: "interested", label: "Intéressé" },
    { id: "refused", label: "Refusé" },
  ],
  reasonLabel: "Motif du refus",
  reasons: ["Hors zone", "Montant trop faible", "Délai trop court", "Qualification manquante"],
  learnNote: "Les refus affinent le tri : moins de bruit chaque semaine.",
  sample: { title: "Levés topographiques et SIG", pre: 86, full: 92 },
};

export const tenderSheet = {
  id: "fiche-ao",
  kicker: "Fiche AO",
  title: "Tout l'appel d'offres sur une fiche, en 8 onglets",
  body: "Du résumé au dossier de réponse, chaque onglet est rempli par un agent et chaque ligne renvoie à sa source.",
  windowTitle: "81/2026/PDENE · Levés topographiques et SIG",
  tabs: [
    {
      id: "resume",
      label: "Résumé",
      rows: [
        { k: "Acheteur", v: "Acheteur public — régional" },
        { k: "Objet", v: "Levés topographiques et intégration SIG" },
        { k: "Estimation", v: "1 240 000 MAD TTC" },
        { k: "Date limite", v: "J-24 · 10:00" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      rows: [
        { k: "CPS.pdf", v: "96 pages · lu" },
        { k: "RC.pdf", v: "18 pages · lu" },
        { k: "BPDE.xlsx", v: "46 lignes · lu" },
        { k: "Plans_scan.pdf", v: "52 pages scannées · lu" },
      ],
    },
    {
      id: "analyse",
      label: "Analyse",
      rows: [
        { k: "Qualification", v: "RME exigée · CPS p. 47" },
        { k: "Caution provisoire", v: "15 000 MAD · RC p. 12" },
        { k: "Délai d'exécution", v: "6 mois · CPS p. 9" },
        { k: "Visite des lieux", v: "Facultative · RC p. 4" },
      ],
    },
    {
      id: "eligibilite",
      label: "Éligibilité",
      rows: [
        { k: "Attestation fiscale", v: "✓ valide" },
        { k: "Attestation CNSS", v: "✓ valide" },
        { k: "Qualification RME", v: "✓ dans le coffre-fort" },
        { k: "Caution provisoire", v: "! à préparer" },
      ],
    },
    {
      id: "score",
      label: "Score expliqué",
      rows: [
        { k: "Références similaires", v: "95 / 100 · 3 marchés proches" },
        { k: "Moyens humains", v: "88 / 100 · 1 profil à renforcer" },
        { k: "Qualification", v: "100 / 100" },
        { k: "Délai de réponse", v: "72 / 100 · 24 jours" },
      ],
    },
    {
      id: "questions",
      label: "Questions et rectificatifs",
      rows: [
        { k: "Rectificatif nº 1", v: "Date limite reportée de 7 jours" },
        { k: "Question posée", v: "Format des plans attendu ?" },
        { k: "Réponse acheteur", v: "DWG et PDF · avis du 12/03" },
      ],
    },
    {
      id: "dossier",
      label: "Dossier de réponse",
      rows: [
        { k: "Mémoire technique", v: "5 sections · 3 validées" },
        { k: "Dossier administratif", v: "8 / 9 pièces" },
        { k: "Offre financière", v: "À compléter" },
      ],
    },
    {
      id: "activite",
      label: "Activité",
      rows: [
        { k: "09:12", v: "Lecteur · dossier lu (212 pages)" },
        { k: "09:14", v: "Juge · score 92, éligible" },
        { k: "10:02", v: "Vous · statut → Intéressé" },
        { k: "11:40", v: "Rédacteur · section 2 rédigée" },
      ],
    },
  ],
};

export const analysisRule = {
  id: "regle-analyse",
  kicker: "Règle « analyser les documents »",
  title: "Vous décidez ce qui consomme des crédits",
  body: `Lire un dossier complet coûte ${frAuto(creditCosts.analysis)} crédits. Choisissez : à la main, AO par AO, ou automatiquement au-dessus d'un seuil de pré-score.`,
  windowTitle: "Réglages · Analyse automatique",
  modes: [
    { id: "manual", label: "Manuel", body: "Vous lancez l'analyse AO par AO." },
    {
      id: "threshold",
      label: "Au-dessus d'un seuil",
      body: "Analyse automatique dès que le pré-score dépasse le seuil.",
    },
  ],
  thresholdLabel: "Seuil de pré-score",
  estimateLabel: "Estimation sur 30 jours",
  estimate: "{n} analyses ≈ {c} crédits",
  /** Fictional distribution used by the mockup: share of AO above each score. */
  distribution: [
    { min: 60, perMonth: 38 },
    { min: 70, perMonth: 24 },
    { min: 80, perMonth: 12 },
    { min: 90, perMonth: 5 },
  ],
  defaultThreshold: 80,
};

export const memo = {
  id: "memoire",
  kicker: "Mémoire technique IA",
  title: "Rédigé dans votre style, section par section, avec les sources",
  body: "Le plan suit les critères du CPS. Chaque section est proposée à partir de vos mémoires gagnés, puis vous reprenez la main.",
  windowTitle: "Mémoire technique · 81/2026/PDENE",
  bullets: [
    "Plan généré depuis les critères du CPS",
    "Rédaction section par section, dans votre style, avec sources",
    "Rédaction guidée et reformulations",
    "Contrôle de conformité avant export",
    "Versions et export Word / PDF",
  ],
  outlineLabel: "Plan · d'après le CPS",
  outline: [
    { title: "1. Compréhension de la mission", state: "done" },
    { title: "2. Méthodologie d'intervention", state: "active" },
    { title: "3. Moyens humains", state: "todo" },
    { title: "4. Moyens matériels", state: "todo" },
    { title: "5. Planning", state: "todo" },
  ],
  heading: "2. Méthodologie d'intervention",
  text: "Notre équipe réalisera les levés en trois phases : reconnaissance du site et implantation du canevas, levés de détail au GNSS et à la station totale, puis intégration dans le SIG de l'acheteur, avec un contrôle qualité à chaque étape.",
  sourcesLabel: "Sources",
  sources: ["Mémoire_2025_SIG.docx · §2", "CPS.pdf · art. 6, p. 14"],
  actions: ["Reformuler", "Plus concis", "Conformité"],
  compliance: "Conformité : 4 / 5 critères couverts",
  version: "v3 · Word · PDF",
};

export const library = {
  id: "bibliotheque",
  kicker: "Bibliothèque et coffre-fort",
  title: "Votre savoir-faire, rangé et retrouvable",
  body: "Mémoires, références, CV et pièces administratives au même endroit. Les expirations sont suivies, le dossier administratif se pré-remplit.",
  searchPlaceholder: "« références SIG de plus de 500 000 MAD depuis 2023 »",
  windowTitle: "Bibliothèque",
  results: [
    { kind: "Référence", title: "Levés et SIG · commune urbaine", meta: "2024 · 820 000 MAD" },
    { kind: "Mémoire", title: "Mémoire_2025_SIG.docx", meta: "Gagné · 34 pages" },
    { kind: "CV", title: "Ingénieur topographe principal", meta: "12 ans · SIG, GNSS" },
  ],
  vaultLabel: "Coffre-fort",
  vault: [
    { name: "Attestation fiscale", days: 74 },
    { name: "Attestation CNSS", days: 21 },
    { name: "Registre de commerce", days: 180 },
    { name: "Qualification RME", days: -2 },
  ],
  expiredLabel: "Expirée",
  reminderLabel: "Rappel J-30",
  validLabel: "{n} j",
  bullets: [
    "Mémoires, références, CV, pièces",
    "Expirations et rappels J-30",
    "Recherche en langage naturel",
    "Dossier administratif pré-rempli",
  ],
};

export const pipeline = {
  id: "pipeline",
  kicker: "Pipeline et calendrier",
  title: "Chaque AO a un statut, chaque échéance un rappel",
  body: "Un kanban pour l'équipe, un calendrier pour les dates limites, des notifications par e-mail et Telegram. WhatsApp arrive ensuite.",
  windowTitle: "Pipeline",
  columns: [
    {
      id: "study",
      label: "À étudier",
      cards: ["Contrôle des travaux de voirie", "Essais de laboratoire"],
    },
    { id: "prep", label: "En préparation", cards: ["Levés topographiques et SIG"] },
    { id: "sent", label: "Déposé", cards: ["Étude géotechnique · centre de santé"] },
    { id: "won", label: "Gagné", cards: ["Étude VRD · lotissement"] },
    { id: "lost", label: "Perdu / Infructueux", cards: ["Assistance technique"] },
  ],
  channels: [
    { label: "E-mail", available: true },
    { label: "Telegram", available: true },
    { label: "WhatsApp", available: false },
  ],
  soon: "bientôt",
};

export const intelligence = {
  id: "intelligence",
  kicker: "Intelligence marché",
  title: "Le contexte avant de chiffrer",
  body: "Qui achète quoi, qui gagne, à quel prix. Et après chaque résultat, un post-mortem pour mieux répondre la prochaine fois.",
  windowTitle: "Analyste · Acheteur public — régional",
  items: [
    {
      title: "Acheteurs",
      body: "Historique des consultations, montants, délais de paiement observés.",
    },
    { title: "Concurrents", body: "Qui répond, qui gagne, sur quels lots." },
    { title: "Simulateur de prix", body: "Votre prix comparé aux attributions passées." },
    { title: "Programmes prévisionnels", body: "Les achats annoncés avant leur publication." },
    { title: "Post-mortem", body: "Pourquoi un marché a été gagné ou perdu." },
  ],
  chartLabel: "Prix d'attribution · 8 derniers marchés similaires",
  yourPrice: "Votre prix",
  bars: [62, 74, 58, 81, 69, 77, 66, 72],
  yourBar: 70,
};

export const agentsFull = {
  id: "agents",
  index: "02",
  label: "Les 7 agents",
  title: "Un agent par étape, une seule équipe",
  highlight: ["seule", "équipe"],
};

export const differentiators = {
  index: "03",
  label: "Différences",
  title: "Ce qui change avec Amnay",
  highlight: ["change"],
  items: [
    {
      title: "Le dossier est lu",
      body: "Pas seulement l'avis : CPS, règlement, bordereaux, plans.",
    },
    { title: "Chaque information est sourcée", body: "Fichier et page, toujours." },
    { title: "Scans et arabe", body: "Lus comme le reste." },
    { title: "Éligibilité automatique", body: "Avant d'investir une heure." },
    { title: "Score expliqué", body: "Critère par critère, pas une boîte noire." },
    { title: "Mémoire dans votre style", body: "Appris sur vos mémoires gagnés." },
    { title: "Prix public, crédits transparents", body: "Coût affiché avant chaque opération." },
    { title: "Fait pour le Maroc", body: "Portail, pièces, virement, support WhatsApp." },
  ],
  punchline:
    "Les autres vous envoient des titres. Amnay lit le dossier, vous dit si vous pouvez gagner, et écrit avec vous.",
};

export const featuresCta = {
  title: "Testez-le sur un vrai appel d'offres",
  highlight: ["vrai"],
};

export const memoPlanNote = `Mémoire IA inclus dès ${getPlan("pro").name}.`;
