import {
  billing,
  comparator,
  creditCosts,
  payment,
  referral,
  selfHosted,
  trial,
} from "@/config/site";
import { frNumber } from "@/lib/format";

/** /faq — every question lives here; other pages pick items by id. */

export type FaqItem = { id: string; q: string; a: string };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

const mad = billing.currencyLabel;

export const faqPage = {
  title: "Questions fréquentes",
  label: "FAQ",
  lead: "Produit, données, crédits, paiement, auto-hébergé : les réponses courtes, sans jargon.",
  searchLabel: "Rechercher une question",
  searchPlaceholder: "Ex. virement, données, crédits…",
  allLabel: "Toutes",
  empty: "Aucune question ne correspond. Posez-la pendant la démo.",
  moreTitle: "Une autre question ?",
  moreBody: "Posez-la pendant la démo : 30 minutes, sur un vrai appel d'offres de votre secteur.",
  objectionTag: "Objection fréquente",
};

export const faqCategories: FaqCategory[] = [
  {
    id: "produit",
    label: "Produit",
    items: [
      {
        id: "maroc-business",
        q: "On a déjà Maroc Business",
        a: "Gardez-le pour les statistiques. Amnay lit vos dossiers, vérifie votre éligibilité et rédige votre mémoire. Comparez les deux sur un vrai appel d'offres pendant l'essai gratuit.",
      },
      {
        id: "ia-trompe",
        q: "L'IA se trompe",
        a: "Chaque information affiche sa source : fichier et page. Ce qui n'est pas dans le dossier reste vide, et vous validez chaque section du mémoire avant l'envoi.",
      },
      {
        id: "portails",
        q: "Quels appels d'offres Amnay surveille-t-il ?",
        a: "Les avis publiés sur le portail marocain des marchés publics. Vos profils de veille (secteurs, régions, montants, mots-clés) filtrent ce qui vous concerne.",
      },
      {
        id: "arabe-scans",
        q: "Les dossiers scannés ou en arabe sont-ils lus ?",
        a: "Oui. Les pages scannées passent par la reconnaissance de texte, l'arabe est lu et restitué en français, toujours avec la page source.",
      },
      {
        id: "signature",
        q: "Amnay dépose-t-il la réponse à ma place ?",
        a: "Non. Amnay prépare la décision et le dossier ; la validation, la signature et le dépôt restent entre vos mains.",
      },
    ],
  },
  {
    id: "donnees",
    label: "Données et sécurité",
    items: [
      {
        id: "donnees-sensibles",
        q: "Nos données sont sensibles",
        a: "Vos mémoires et pièces sont isolés et chiffrés. Les fournisseurs IA n'entraînent pas leurs modèles sur vos données. Et si vous exigez l'isolement complet, l'offre Entreprise auto-hébergé existe.",
      },
      {
        id: "loi-0908",
        q: "Êtes-vous conformes à la loi 09-08 ?",
        a: "Le traitement des données personnelles suit la loi 09-08 et les exigences de la CNDP. Le détail figure dans la politique de confidentialité.",
      },
      {
        id: "dossier-partage",
        q: "Que partage-t-on avec les autres clients ?",
        a: "Uniquement la lecture des dossiers publics, identiques pour tous. Vos profils, scores, décisions, mémoires et pièces ne sont jamais partagés.",
      },
      {
        id: "export",
        q: "Puis-je récupérer mes données ?",
        a: `Oui, à tout moment. Après résiliation, elles sont conservées ${payment.retentionDays} jours puis supprimées.`,
      },
    ],
  },
  {
    id: "credits",
    label: "Crédits et tarifs",
    items: [
      {
        id: "cher",
        q: "C'est cher",
        a: `Un chargé d'AO coûte ${frNumber(comparator.charged.min)} à ${frNumber(comparator.charged.max)} MAD/mois. Pro, c'est ${frNumber(comparator.amnayMonthly)} ${mad}/mois en annuel — et il travaille tous les jours, weekends compris.`,
      },
      {
        id: "credit",
        q: "C'est quoi, un crédit ?",
        a: `L'unité unique pour toute l'IA : 1 crédit = ${creditCosts.madPerCredit} ${mad}. Une analyse complète coûte ${creditCosts.analysis} crédits, une section de mémoire ${creditCosts.memoSection}. La veille et le Daily Brief sont inclus.`,
      },
      {
        id: "expiration",
        q: "Les crédits expirent-ils ?",
        a: "Les crédits achetés en pack n'expirent jamais. Les crédits inclus dans l'abonnement se renouvellent chaque mois.",
      },
      {
        id: "plus-de-credits",
        q: "Que se passe-t-il si je n'ai plus de crédits ?",
        a: "Le coût est affiché avant chaque opération, et une opération lancée n'est jamais interrompue. Vous rechargez avec un pack ou passez à la formule supérieure.",
      },
      {
        id: "essai",
        q: "Que comprend l'essai gratuit ?",
        a: `${trial.days} jours, ${trial.credits} crédits, ${trial.profiles} profil de veille, ${trial.members} membres, sans carte bancaire. Tout est conservé si vous vous abonnez.`,
      },
    ],
  },
  {
    id: "paiement",
    label: "Paiement",
    items: [
      {
        id: "virement",
        q: "On préfère payer par virement",
        a: "C'est le mode par défaut : nous émettons une facture pro forma, l'abonnement est activé à réception des fonds.",
      },
      {
        id: "carte",
        q: "Peut-on payer par carte ?",
        a: "Oui, par Stripe pour les clients facturés en euros. Le paiement par carte marocaine (CMI / Payzone) arrive bientôt.",
      },
      {
        id: "factures",
        q: "Où sont les factures ?",
        a: "Dans l'application, rubrique Facturation, téléchargeables à tout moment.",
      },
      {
        id: "changer-formule",
        q: "Puis-je changer de formule ?",
        a: `Vers le haut : immédiat, au prorata. Vers le bas : à la fin de la période. Résiliation : fin de période, données conservées ${payment.retentionDays} jours.`,
      },
      {
        id: "coupure",
        q: "Mon accès peut-il être coupé du jour au lendemain ?",
        a: "Jamais de coupure brutale : en cas de retard de paiement, nous vous prévenons et laissons le temps de régulariser.",
      },
      {
        id: "parrainage",
        q: "Y a-t-il un parrainage ?",
        a: `Oui : ${referral.credits} crédits pour vous et ${referral.credits} pour l'entreprise parrainée, dès son abonnement.`,
      },
    ],
  },
  {
    id: "auto-heberge",
    label: "Auto-hébergé",
    items: [
      {
        id: "cles-ia",
        q: "On veut nos propres clés IA",
        a: "C'est possible en Entreprise. Mais le mode connecté vous évite de gérer des clés, des factures fournisseurs et les changements de modèles — pour le même résultat.",
      },
      {
        id: "prix-auto",
        q: "Combien coûte l'offre auto-hébergée ?",
        a: `${frNumber(selfHosted.yearly)} ${mad}/an, plus ${frNumber(selfHosted.setup)} ${mad} de mise en place. Ou ${frNumber(selfHosted.monthly)} ${mad}/mois sur ${selfHosted.months} mois.`,
      },
      {
        id: "maj-auto",
        q: "Qui fait les mises à jour ?",
        a: "Nous livrons les mises à jour ; votre équipe (ou la nôtre, sur accès) les applique. Le support reste inclus.",
      },
      {
        id: "souverain",
        q: "Peut-on fonctionner sans aucun appel extérieur ?",
        a: "Oui, en mode Souverain, avec des modèles hébergés chez vous. C'est un projet sur devis.",
      },
    ],
  },
];

const allItems = faqCategories.flatMap((c) => c.items);

/** The 6 objections heard most, flagged in the FAQ. */
export const objectionIds = [
  "maroc-business",
  "ia-trompe",
  "donnees-sensibles",
  "cher",
  "virement",
  "cles-ia",
] as const;

export function pickFaq(ids: readonly string[]): FaqItem[] {
  return ids.map((id) => allItems.find((i) => i.id === id)).filter((i) => i !== undefined);
}
