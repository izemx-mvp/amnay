import { site, trial } from "@/config/site";

/** Copy shared by the layout and by several pages. */

export const cta = {
  trial: "Essai gratuit",
  trialLong: "Commencer l'essai gratuit",
  demo: "Réserver une démo",
  demoShort: "Démo",
  contact: "Nous contacter",
  login: "Connexion",
} as const;

export const trialMicrocopy = `${trial.days} jours · ${trial.credits} crédits offerts · sans carte bancaire`;

export const sampleDataLabel = "Données d'exemple";

export const header = {
  homeLabel: `${site.name} by ${site.company} — accueil`,
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  mainNavLabel: "Navigation principale",
  mobileNavLabel: "Menu mobile",
} as const;

export const footer = {
  promise: site.tagline,
  solutionLine: `Une solution ${site.company}`,
  officesTitle: "Bureaux",
  contactTitle: "Contact",
  copyright: `© ${site.copyrightYear} ${site.company}`,
} as const;

export const cookieBanner = {
  label: "Gestion des cookies",
  text: "Nous utilisons des cookies pour mesurer l'audience et améliorer le site, conformément à la loi 09-08 (CNDP).",
  analytics: "Mesure d'audience",
  marketing: "Marketing",
  accept: "Accepter",
  refuse: "Refuser",
  customize: "Personnaliser",
  save: "Enregistrer",
  more: "En savoir plus",
} as const;

export const marqueeLabel = "Secteurs couverts";

export const notFound = {
  code: "404",
  title: "Ce dossier n'existe pas.",
  body: "La page demandée a été déplacée ou n'a jamais été publiée. Même Amnay ne peut pas lire une page vide.",
  home: "Retour à l'accueil",
  links: "Ou continuez par ici",
  /** Caption under the lost mascot. */
  mascot: "Même notre agent ne trouve pas cette page.",
} as const;

export const errorPage = {
  title: "Cette page n'a pas pu se charger",
  body: "Une erreur est survenue de notre côté. Réessayez ou revenez à l'accueil.",
  retry: "Réessayer",
  home: "Retour à l'accueil",
} as const;

export const forms = {
  required: "Champ obligatoire",
  name: "Nom",
  company: "Société",
  role: "Fonction",
  email: "E-mail",
  phone: "Téléphone",
  phonePrefix: "+212",
  sector: "Secteur",
  size: "Taille de l'entreprise",
  users: "Nombre d'utilisateurs",
  message: "Message",
  sending: "Envoi…",
  consent: "Vos informations servent uniquement à vous recontacter (loi 09-08).",
  errors: {
    name: "Indiquez votre nom",
    company: "Indiquez votre société",
    role: "Indiquez votre fonction",
    email: "Adresse e-mail invalide",
    phone: "Numéro invalide (ex. 06 12 34 56 78)",
    sector: "Choisissez un secteur",
    size: "Choisissez une taille",
    users: "Choisissez une tranche",
  },
  sectors: [
    "Bureau d'études / Laboratoire",
    "Société de services",
    "Fournisseur / Distributeur",
    "Travaux / BTP",
    "Autre",
  ],
  sizes: ["1-5", "6-20", "21-50", "51-100", "100+"],
  userRanges: ["1-10", "11-25", "26-50", "51-100", "100+"],
} as const;
