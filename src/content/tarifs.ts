import { billing, creditCosts, payment, referral, trial } from "@/config/site";
import { frAuto } from "@/lib/format";

/** "/tarifs" */

export const pricingMeta = { title: "Tarifs — Amnay" };

const unit = (n: number) => `${frAuto(n)} crédit${n >= 2 ? "s" : ""}`;

export const pricingHero = {
  label: "Tarifs",
  title: "Un prix public, sans surprise",
  highlight: ["public,"],
  lead: `Trois formules, une offre auto-hébergée, et une seule unité pour toute l'IA : le crédit. Prix en ${billing.currencyLabel}.`,
};

export const plansSection = {
  index: "01",
  label: "Formules",
  title: "Choisissez votre rythme",
  highlight: ["rythme"],
};

export const creditsSection = {
  index: "02",
  label: "Crédits",
  title: "Le crédit, une seule unité pour toute l'IA",
  highlight: ["seule", "unité"],
  equation: { left: "1 crédit", right: `${creditCosts.madPerCredit} ${billing.currencyLabel}` },
  tableTitle: "Ce que coûte chaque opération",
  operationLabel: "Opération",
  costLabel: "Coût",
  included: "Inclus",
  operations: [
    { label: "Veille, pré-score, alertes et Daily Brief", cost: "Inclus", note: "" },
    {
      label: "Analyse complète d'un dossier",
      cost: unit(creditCosts.analysis),
      note: `+ ${frAuto(creditCosts.analysisPerScannedPage)} par page scannée`,
    },
    {
      label: "Dossier déjà lu par un autre client",
      cost: unit(creditCosts.sharedRead),
      note: "Un dossier public n'est lu qu'une fois",
    },
    { label: "Question à l'assistant", cost: unit(creditCosts.question), note: "" },
    {
      label: "Section de mémoire technique",
      cost: unit(creditCosts.memoSection),
      note: `≈ ${frAuto(creditCosts.memoApprox)} par mémoire`,
    },
    {
      label: "Reformulation, conformité, post-mortem",
      cost: `${frAuto(creditCosts.editMin)} à ${unit(creditCosts.editMax)}`,
      note: "",
    },
    { label: "Import d'un mémoire gagné", cost: unit(creditCosts.importWonMemo), note: "" },
  ],
  rulesTitle: "Les règles",
  rules: [
    "Le coût est affiché avant chaque opération.",
    "Votre solde est toujours visible.",
    "Les crédits achetés n'expirent jamais.",
    "Une opération lancée n'est jamais interrompue.",
  ],
  orderTitle: "Ordre de consommation",
  order: ["Crédits offerts", "Crédits inclus", "Crédits achetés"],
};

export const simulatorSection = {
  index: "03",
  label: "Simulateur",
  title: "Combien de crédits il vous faut",
  highlight: ["crédits"],
};

export const comparatorSection = {
  index: "04",
  label: "Comparateur",
  title: "Et face à un chargé d'AO ?",
  highlight: ["chargé", "d'AO"],
};

export const packsSection = {
  index: "05",
  label: "Packs",
  title: "Des crédits en plus, quand il en faut",
  highlight: ["en", "plus,"],
  lead: "Achetés une fois, valables pour toujours. Ils s'ajoutent à votre abonnement.",
  creditsLabel: "crédits",
  perCredit: "{p} MAD / crédit",
  bonus: "+{n} % de crédits",
  neverExpire: "Sans expiration",
};

export const trialSection = {
  index: "06",
  label: "Essai",
  title: `${trial.days} jours pour juger sur pièces`,
  highlight: [`${trial.days}`, "jours"],
  terms: [
    { value: `${trial.days}`, label: "jours" },
    { value: `${trial.credits}`, label: "crédits offerts" },
    { value: `${trial.profiles}`, label: "profil de veille" },
    { value: `${trial.members}`, label: "membres" },
  ],
  notes: ["Sans carte bancaire", "Tout est conservé à l'abonnement"],
};

export const paymentSection = {
  index: "07",
  label: "Paiement",
  title: "Payer comme vous en avez l'habitude",
  highlight: ["habitude"],
  methods: payment.methods,
  soon: "Bientôt",
  default: "Par défaut",
  invoices: "Factures disponibles dans l'application.",
  noCut: "Jamais de coupure brutale.",
  changesTitle: "Changer de formule",
  changes: [
    { label: "Vers le haut", body: "Immédiat, au prorata." },
    { label: "Vers le bas", body: "À la fin de la période." },
    {
      label: "Résiliation",
      body: `À la fin de la période, données conservées ${payment.retentionDays} jours.`,
    },
  ],
  referralTitle: "Parrainage",
  referral: `${referral.credits} crédits pour vous, ${referral.credits} pour l'entreprise que vous parrainez.`,
};

export const pricingFounders = {
  index: "08",
  label: "Offre Fondateurs",
};

export const pricingFaq = {
  index: "09",
  label: "FAQ paiement",
  title: "Questions sur le paiement",
  highlight: ["paiement"],
  ids: ["virement", "carte", "changer-formule", "expiration", "coupure", "parrainage"],
};

export const pricingCta = {
  title: "Comparez sur un vrai appel d'offres",
  highlight: ["vrai"],
};
