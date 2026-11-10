import { founders } from "@/config/site";
import { frDate } from "@/lib/format";
import { routes } from "./navigation";

/** "/offre-fondateurs" */

const pct = `${Math.round(founders.discount * 100)} %`;
const deadline = frDate(founders.deadlineISO);

export const foundersMeta = { title: "Offre Fondateurs — Amnay" };

export const foundersHero = {
  label: "Offre Fondateurs",
  title: `${founders.placesTotal} places pour construire Amnay avec nous`,
  highlight: [`${founders.placesTotal}`, "places"],
  lead: `Les ${founders.placesTotal} premières entreprises paient ${pct} de moins sur l'annuel, prix bloqué ${founders.priceLockYears} ans. En échange, elles nous aident à faire le meilleur outil d'appels d'offres du Maroc.`,
};

export const foundersConditions = {
  index: "01",
  label: "Conditions",
  title: "Ce que vous obtenez, ce que vous donnez",
  highlight: ["obtenez,", "donnez"],
  get: [
    {
      title: `-${pct} sur l'abonnement annuel`,
      body: "Sur la formule de votre choix : Starter, Pro ou Business.",
    },
    {
      title: `Prix garanti ${founders.priceLockYears} ans`,
      body: "Votre tarif ne bouge pas, même si la grille publique évolue.",
    },
    {
      title: "Accès direct à l'équipe",
      body: "Vos retours orientent les prochaines fonctionnalités.",
    },
  ],
  giveLabel: "En échange",
  give: [
    { title: "Un témoignage", body: "Quelques lignes, publiées avec votre accord." },
    { title: "Un cas client", body: "Un appel d'offres traité avec Amnay, raconté ensemble." },
  ],
  deadlineLabel: "Jusqu'au",
  deadline,
  placesNote: "ou jusqu'à épuisement des places",
};

export const foundersPrices = {
  index: "02",
  label: "Prix Fondateurs",
  title: "Vos prix, calculés",
  highlight: ["calculés"],
  publicLabel: "Prix public annuel",
  founderLabel: "Prix Fondateur annuel",
  perMonthLabel: "soit {n} MAD HT/mois",
  savingLabel: "Économie : {n} MAD HT/an",
  lockedLabel: "bloqué {n} ans",
};

export const foundersSteps = {
  index: "03",
  label: "Comment ça se passe",
  title: "Trois étapes, aucune surprise",
  highlight: ["aucune", "surprise"],
  steps: [
    {
      title: "Démo",
      body: "30 minutes sur un vrai appel d'offres de votre secteur. Vous choisissez votre formule.",
    },
    {
      title: "Virement",
      body: "Nous émettons la facture pro forma au prix Fondateur. Vous réglez par virement.",
    },
    {
      title: "Activation",
      body: "Votre compte est activé à réception des fonds, votre place est réservée.",
    },
  ],
};

export const foundersFaq = {
  index: "04",
  label: "FAQ",
  title: "Questions sur l'offre",
  highlight: ["l'offre"],
  items: [
    {
      id: "f-plan",
      q: "La remise s'applique-t-elle à toutes les formules ?",
      a: `Oui, à l'abonnement annuel Starter, Pro ou Business. -${pct}, sur la formule de votre choix.`,
    },
    {
      id: "f-lock",
      q: "Que se passe-t-il après la période garantie ?",
      a: `Votre prix est bloqué ${founders.priceLockYears} ans. Ensuite, nous vous proposons le tarif en vigueur, avec un préavis.`,
    },
    {
      id: "f-temoignage",
      q: "Le témoignage est-il obligatoire ?",
      a: "C'est la contrepartie de la remise. Vous relisez et validez tout ce qui est publié.",
    },
    {
      id: "f-mensuel",
      q: "Et en mensuel ?",
      a: "L'offre Fondateurs porte uniquement sur l'abonnement annuel.",
    },
    {
      id: "f-trial",
      q: "Puis-je d'abord essayer ?",
      a: "Oui. Commencez l'essai gratuit ; la place Fondateur est réservée au moment du virement.",
    },
  ],
};

export const foundersCta = {
  title: "Réservez votre place Fondateur",
  highlight: ["Fondateur"],
  cta: "Réserver ma démo Fondateur",
  href: `${routes.demo}?offre=fondateurs`,
};
