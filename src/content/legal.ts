import { contacts, offices, payment, site } from "@/config/site";
import { routes } from "./navigation";

/**
 * Legal pages — placeholder structure pending legal review.
 * Every "[à compléter]" must be filled by the legal team before going live.
 */

export type LegalSection = { id: string; title: string; paragraphs: string[]; list?: string[] };
export type LegalPage = { path: string; title: string; updated: string; sections: LegalSection[] };

export const legalCopy = {
  label: "Légal",
  banner: "Contenu en cours de validation juridique",
  bannerNote:
    "Structure provisoire : les mentions entre crochets restent à compléter avant mise en ligne.",
  tocTitle: "Sommaire",
  updatedLabel: "Dernière mise à jour :",
  contactTitle: "Une question ?",
};

const officeList = offices.map((o) => `${o.city} — ${o.address}`);
const TODO = "[à compléter]";

export const legalPages: Record<"notice" | "terms" | "privacy" | "cookies", LegalPage> = {
  notice: {
    path: routes.legalNotice,
    title: "Mentions légales",
    updated: TODO,
    sections: [
      {
        id: "editeur",
        title: "Éditeur du site",
        paragraphs: [
          `Le site ${site.name} est édité par ${site.company}.`,
          `Forme juridique, capital, numéro d'immatriculation et identifiant fiscal : ${TODO}.`,
          `Directeur de la publication : ${TODO}.`,
        ],
        list: officeList,
      },
      {
        id: "hebergement",
        title: "Hébergement",
        paragraphs: [`Hébergeur, adresse et contact : ${TODO}.`],
      },
      {
        id: "propriete",
        title: "Propriété intellectuelle",
        paragraphs: [
          `Les marques, logos, textes et visuels du site sont la propriété de ${site.company}. Toute reproduction sans autorisation est interdite.`,
        ],
      },
      {
        id: "donnees",
        title: "Données personnelles",
        paragraphs: [
          "Le traitement des données personnelles est décrit dans la politique de confidentialité, conformément à la loi 09-08 et aux exigences de la CNDP.",
          `Numéro de déclaration ou d'autorisation CNDP : ${TODO}.`,
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [`Pour toute question : ${contacts.email}.`],
      },
    ],
  },
  terms: {
    path: routes.terms,
    title: "Conditions générales",
    updated: TODO,
    sections: [
      {
        id: "objet",
        title: "Objet",
        paragraphs: [
          `Les présentes conditions encadrent l'utilisation du service ${site.name} édité par ${site.company}. ${TODO}`,
        ],
      },
      {
        id: "acces",
        title: "Accès au service et essai",
        paragraphs: [`Conditions d'inscription, essai gratuit et activation : ${TODO}.`],
      },
      {
        id: "formules",
        title: "Formules, crédits et prix",
        paragraphs: [
          `Formules, crédits, packs et prix publics affichés sur la page Tarifs. ${TODO}`,
        ],
      },
      {
        id: "paiement",
        title: "Paiement et facturation",
        paragraphs: [
          "Virement sur facture pro forma (mode par défaut), carte bancaire pour les clients facturés en euros.",
          `Modalités de retard de paiement : ${TODO}.`,
        ],
      },
      {
        id: "resiliation",
        title: "Changement de formule et résiliation",
        paragraphs: [
          `Résiliation effective en fin de période ; données conservées ${payment.retentionDays} jours puis supprimées. ${TODO}`,
        ],
      },
      {
        id: "responsabilite",
        title: "Responsabilité",
        paragraphs: [
          `Le client reste seul responsable de la validation, de la signature et du dépôt de ses offres. ${TODO}`,
        ],
      },
      {
        id: "droit",
        title: "Droit applicable",
        paragraphs: [`Droit applicable et juridiction compétente : ${TODO}.`],
      },
    ],
  },
  privacy: {
    path: routes.privacy,
    title: "Politique de confidentialité",
    updated: TODO,
    sections: [
      {
        id: "responsable",
        title: "Responsable du traitement",
        paragraphs: [`${site.company}, joignable à ${contacts.email}.`],
        list: officeList,
      },
      {
        id: "donnees",
        title: "Données collectées",
        paragraphs: [
          "Formulaires de démo, de contact et de webinaire : nom, société, fonction, téléphone, e-mail, secteur, taille, message.",
          `Données du service : ${TODO}.`,
        ],
      },
      {
        id: "finalites",
        title: "Finalités",
        paragraphs: [
          "Vous recontacter, organiser la démo ou le webinaire, fournir le service souscrit.",
          TODO,
        ],
      },
      {
        id: "loi-0908",
        title: "Loi 09-08 et CNDP",
        paragraphs: [
          "Les traitements sont réalisés conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
          `Déclaration / autorisation CNDP : ${TODO}.`,
        ],
      },
      {
        id: "ia",
        title: "Fournisseurs d'IA",
        paragraphs: [
          "Les fournisseurs d'IA n'entraînent pas leurs modèles sur vos données.",
          `Liste des sous-traitants et localisation : ${TODO}.`,
        ],
      },
      {
        id: "conservation",
        title: "Durée de conservation",
        paragraphs: [
          `Données clients : ${payment.retentionDays} jours après résiliation. Prospects : ${TODO}.`,
        ],
      },
      {
        id: "droits",
        title: "Vos droits",
        paragraphs: [
          `Droits d'accès, de rectification et d'opposition : écrivez à ${contacts.email}.`,
        ],
      },
    ],
  },
  cookies: {
    path: routes.cookies,
    title: "Cookies",
    updated: TODO,
    sections: [
      {
        id: "definition",
        title: "Qu'est-ce qu'un cookie ?",
        paragraphs: ["Un petit fichier déposé sur votre appareil lors de la visite d'un site."],
      },
      {
        id: "types",
        title: "Cookies utilisés",
        paragraphs: ["Aucun cookie de mesure ou marketing n'est déposé sans votre accord."],
        list: [
          "Nécessaires : mémorisation de votre choix de consentement.",
          `Mesure d'audience : ${TODO}.`,
          `Marketing : ${TODO}.`,
        ],
      },
      {
        id: "choix",
        title: "Gérer vos choix",
        paragraphs: [
          "Vous pouvez accepter, refuser ou personnaliser via le bandeau. Pour revenir sur votre choix, effacez les données du site dans votre navigateur.",
        ],
      },
      {
        id: "duree",
        title: "Durée",
        paragraphs: [`Durée de conservation du consentement : ${TODO}.`],
      },
    ],
  },
};
