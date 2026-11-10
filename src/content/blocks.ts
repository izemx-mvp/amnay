import { billing, founders } from "@/config/site";

/** UI labels of the reusable blocks (section titles are passed by each page). */

export const pricingTableCopy = {
  monthly: "Mensuel",
  yearly: "Annuel",
  freeMonths: `${billing.freeMonths} mois offerts`,
  perMonth: "/mois",
  perYear: "/an",
  yearlyEquivalent: "soit {n} MAD HT/mois",
  popular: "Le plus choisi",
  recommended: "Recommandé pour vous",
  cta: "Essayer gratuitement",
  selfHostedName: "Entreprise",
  selfHostedTarget: "Auto-hébergé, vos données chez vous",
  selfHostedPrice: "Sur vos serveurs",
  selfHostedCta: "Nous contacter",
  selfHostedSetup: "+ {n} mise en place",
  billingLabel: "Facturation",
  rowsLabel: "Inclus",
  switcherLabel: "Choisir une formule",
  included: "Inclus",
  notIncluded: "Non inclus",
  unlimited: "Illimités",
  rows: {
    credits: "Crédits IA / mois",
    analyses: "Analyses complètes ≈",
    members: "Membres",
    profiles: "Profils de veille",
    storage: "Stockage",
    watch: "Veille, pré-score, Daily Brief",
    memo: "Mémoire technique IA",
    market: "Intelligence marché",
    api: "API / MCP",
    support: "Support",
    hosting: "Hébergement",
  },
  hostingCloud: "Cloud Amnay",
  hostingSelf: "Vos serveurs",
  selfHostedValues: {
    credits: "Selon vos modèles",
    members: "Sur mesure",
    profiles: "Illimités",
    storage: "Vos disques",
    support: "Support dédié",
  },
} as const;

export const simulatorCopy = {
  title: "simulateur — crédits / mois",
  intro: "Estimez votre usage mensuel",
  total: "crédits / mois",
  plan: "Formule recommandée",
  usage: "du quota mensuel",
  perUnit: "{n} crédit(s) / unité",
  items: {
    analyses: { label: "Analyses complètes", hint: "Score, éligibilité, critères, pièces exigées" },
    lectures: {
      label: "Dossiers déjà lus",
      hint: "Dossier lu une fois pour tous, synthèse pour vous",
    },
    memos: { label: "Mémoires techniques", hint: "Rédaction assistée dans votre style" },
    questions: { label: "Questions à l'assistant", hint: "Interrogations sur les dossiers lus" },
  },
  minus: "Moins de",
  plus: "Plus de",
} as const;

export const comparatorCopy = {
  today: "Aujourd'hui",
  amnay: "Avec Amnay Pro",
  perMonth: "MAD / mois",
  modes: { charged: "Chargé d'AO", consultant: "Consultant" },
  chargedLabel: "Salaire mensuel brut",
  consultantLabel: "Coût par dossier",
  dossiersLabel: "Dossiers par mois",
  savingsLabel: "MAD économisés par an",
  amnayNote: "Pro en annuel, mensualisé",
} as const;

export const foundersPassCopy = {
  passLabel: "PASS FONDATEUR",
  serialPrefix: "FONDATEUR Nº",
  discount: `-${Math.round(founders.discount * 100)} % sur l'abonnement annuel`,
  conditions: [
    `Prix garanti ${founders.priceLockYears} ans`,
    "En échange d'un témoignage et d'un cas client",
    "Sur la formule de votre choix",
  ],
  countdownLabel: "Fin de l'offre",
  units: { days: "jours", hours: "heures", minutes: "min" },
  placesLabel: "{n} places restantes sur {total}",
  cta: "Réserver ma place",
  more: "Voir l'offre",
} as const;

export const bookingCopy = {
  tagline: "30 min, sur un vrai AO de votre secteur",
  note: "Créneaux indicatifs : nous confirmons par téléphone.",
  slots: ["09:30", "11:00", "14:30", "16:00"],
  weekdays: ["L", "M", "M", "J", "V", "S", "D"],
  slotChosen: "Créneau souhaité : {slot}",
  daysLabel: "Jours disponibles (indicatif)",
  iframeTitle: "Réserver un créneau",
} as const;

export const demoFormCopy = {
  submit: "Demander ma démo",
  success: "Merci ! Votre demande est bien reçue. Notre équipe vous contacte sous 24 h ouvrées.",
  successTitle: "Demande reçue",
  offerTag: "Offre : {offre}",
  segmentTag: "Secteur : {segment}",
} as const;

export const contactFormCopy = {
  submit: "Être recontacté",
  success: "Merci. Un responsable Entreprise vous recontacte sous 48 h ouvrées.",
  successTitle: "Message reçu",
  messagePlaceholder: "Contexte, contraintes d'hébergement, calendrier…",
} as const;

export const ctaBandDefaults = {
  title: "Votre première veille en 10 minutes",
  highlight: ["10", "minutes"],
} as const;
