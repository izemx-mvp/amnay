import { billing, selfHosted } from "@/config/site";
import { frNumber } from "@/lib/format";

/** "/entreprise" — self-hosted offer. No trial CTA on this page. */

const mad = billing.currencyLabel;

export const enterpriseMeta = { title: "Entreprise auto-hébergé — Amnay" };

export const enterpriseHero = {
  label: "Entreprise / auto-hébergé",
  title: "Amnay sur vos serveurs, vos données chez vous",
  highlight: ["vos", "serveurs,"],
  lead: "Pour les groupes et organismes qui exigent que les dossiers, mémoires et pièces ne quittent jamais leur infrastructure. Même produit, même agents, installé chez vous.",
  cta: "Parler à un responsable Entreprise",
  ctaHref: "#contact",
  serverLabel: "srv-amnay-01 · votre datacenter",
  serverLines: [
    "amnay-app · en ligne",
    "amnay-agents · 7 / 7",
    "stockage · chiffré",
    "sauvegarde · 02:00",
  ],
};

export const comparison = {
  index: "01",
  label: "SaaS ou auto-hébergé",
  title: "Deux façons d'utiliser Amnay",
  highlight: ["Deux", "façons"],
  saas: "SaaS (Starter · Pro · Business)",
  self: "Entreprise auto-hébergé",
  saasShort: "SaaS",
  selfShort: "Auto-hébergé",
  rows: [
    {
      label: "Où tourne l'application",
      saas: "Cloud Amnay",
      self: "Vos serveurs ou votre cloud privé",
    },
    {
      label: "Où sont les données",
      saas: "Cloud Amnay, isolées et chiffrées",
      self: "Chez vous, exclusivement",
    },
    {
      label: "Collecte et lecture des AO",
      saas: "Mutualisées : un dossier lu une fois pour tous",
      self: "Mutualisées en mode Connecté, locales en Souverain",
    },
    { label: "Mises à jour", saas: "Automatiques", self: "Livrées par nous, appliquées chez vous" },
    {
      label: "Qui gère l'IA",
      saas: "Amnay",
      self: "Amnay (Connecté) ou vous (Clés propres, Souverain)",
    },
    {
      label: "Prix",
      saas: "Abonnement mensuel ou annuel + crédits",
      self: `${frNumber(selfHosted.yearly)} ${mad}/an + ${frNumber(selfHosted.setup)} ${mad} de mise en place`,
    },
    { label: "Membres et stockage", saas: "Selon la formule", self: "Selon votre infrastructure" },
    {
      label: "Support",
      saas: "E-mail, WhatsApp, prioritaire",
      self: "Support dédié et accompagnement d'installation",
    },
  ],
};

export const modes = {
  index: "02",
  label: "Modes",
  title: "Trois niveaux d'isolement",
  highlight: ["isolement"],
  items: [
    {
      id: "connecte",
      name: "Connecté",
      tag: "Recommandé",
      body: "L'application et vos données restent chez vous ; Amnay fournit l'IA et la lecture mutualisée des dossiers publics. Aucune clé à gérer.",
      level: 1,
    },
    {
      id: "cles",
      name: "Clés propres",
      tag: "Option",
      body: "Vous branchez vos propres comptes chez les fournisseurs IA. Vous gérez les clés, les factures et les changements de modèles.",
      level: 2,
    },
    {
      id: "souverain",
      name: "Souverain",
      tag: "Sur devis",
      body: "Modèles hébergés chez vous, aucun appel extérieur. Projet d'infrastructure à cadrer ensemble.",
      level: 3,
    },
  ],
  levelLabel: "Isolement",
};

export const enterprisePricing = {
  index: "03",
  label: "Prix",
  title: "Un prix clair, deux façons de le régler",
  highlight: ["clair,"],
  optionA: {
    label: "Option 1 · annuel",
    amount: frNumber(selfHosted.yearly),
    unit: `${mad} / an`,
    extra: `+ ${frNumber(selfHosted.setup)} ${mad} de mise en place, une fois`,
  },
  optionB: {
    label: `Option 2 · ${selfHosted.months} mensualités`,
    amount: frNumber(selfHosted.monthly),
    unit: `${mad} / mois`,
    extra: `sur ${selfHosted.months} mois, mise en place incluse`,
  },
  or: "ou",
};

export const whyPrice = {
  index: "04",
  label: "Pourquoi ce prix",
  title: `Pourquoi ${frNumber(selfHosted.yearly)} MAD`,
  highlight: [`${frNumber(selfHosted.yearly)}`, "MAD"],
  body: "Comparez à ce que coûte une personne dédiée aux appels d'offres, charges comprises, qui ne lit qu'une partie des dossiers et ne travaille ni la nuit ni le weekend.",
  benchmarkLabel: "Un chargé d'AO, chargé",
  benchmark: selfHosted.benchmarkYearly,
  amnayLabel: "Amnay Entreprise",
  amnay: selfHosted.yearly,
  unit: `${mad} / an`,
  approx: "≈",
};

export const contactSection = {
  id: "contact",
  index: "05",
  label: "Contact",
  title: "Parlons de votre infrastructure",
  highlight: ["infrastructure"],
  body: "Un responsable Entreprise vous rappelle pour cadrer l'hébergement, les modes et le calendrier d'installation.",
  points: ["Réponse sous 48 h ouvrées", "Cadrage technique avec votre DSI", "Devis écrit"],
};
