import { webinar } from "@/config/site";

/** Site map, header mega-menus and footer columns. */

export const routes = {
  home: "/",
  features: "/fonctionnalites",
  agents: "/fonctionnalites#agents",
  enterprise: "/entreprise",
  pricing: "/tarifs",
  founders: "/offre-fondateurs",
  demo: "/demo",
  trial: "/essai",
  faq: "/faq",
  blog: "/blog",
  webinar: "/webinaire",
  studies: "/bureaux-etudes",
  services: "/societes-de-services",
  legalNotice: "/mentions-legales",
  terms: "/conditions-generales",
  privacy: "/politique-de-confidentialite",
  cookies: "/cookies",
} as const;

/** Mini visual drawn in each mega-menu entry. */
export type MenuVisual =
  "features" | "agents" | "server" | "studies" | "services" | "blog" | "webinar" | "faq";

export type MenuEntry = {
  label: string;
  href: string;
  description: string;
  visual: MenuVisual;
};

export type NavItem =
  | { kind: "menu"; label: string; intro: string; entries: MenuEntry[] }
  | { kind: "link"; label: string; href: string };

export const mainNav: NavItem[] = [
  {
    kind: "menu",
    label: "Produit",
    intro: "De la veille à la réponse, tout est lu pour vous.",
    entries: [
      {
        label: "Fonctionnalités",
        href: routes.features,
        description: "Veille, lecture du dossier, score, mémoire technique, pipeline.",
        visual: "features",
      },
      {
        label: "Les 7 agents",
        href: routes.agents,
        description: "Un agent IA par étape, de l'Éclaireur à la Vigie.",
        visual: "agents",
      },
      {
        label: "Entreprise / auto-hébergé",
        href: routes.enterprise,
        description: "Amnay sur vos serveurs, vos données chez vous.",
        visual: "server",
      },
    ],
  },
  {
    kind: "menu",
    label: "Solutions",
    intro: "Le même produit, le vocabulaire de votre métier.",
    entries: [
      {
        label: "Bureaux d'études",
        href: routes.studies,
        description: "Cabinets techniques, laboratoires, ingénierie, topographie, SIG.",
        visual: "studies",
      },
      {
        label: "Sociétés de services",
        href: routes.services,
        description: "Informatique, nettoyage, gardiennage, formation, restauration…",
        visual: "services",
      },
    ],
  },
  { kind: "link", label: "Tarifs", href: routes.pricing },
  {
    kind: "menu",
    label: "Ressources",
    intro: "Comprendre les marchés publics, et Amnay.",
    entries: [
      {
        label: "Blog",
        href: routes.blog,
        description: "L'appel d'offres de la semaine décrypté.",
        visual: "blog",
      },
      {
        label: "Webinaire",
        href: routes.webinar,
        description: `${webinar.durationMin} minutes en direct sur un vrai dossier.`,
        visual: "webinar",
      },
      {
        label: "FAQ",
        href: routes.faq,
        description: "Données, crédits, paiement, auto-hébergé.",
        visual: "faq",
      },
    ],
  },
];

export const footerColumns = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: routes.features },
      { label: "Les 7 agents", href: routes.agents },
      { label: "Tarifs", href: routes.pricing },
      { label: "Offre Fondateurs", href: routes.founders },
      { label: "Entreprise / auto-hébergé", href: routes.enterprise },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Bureaux d'études", href: routes.studies },
      { label: "Sociétés de services", href: routes.services },
      { label: "Réserver une démo", href: routes.demo },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: routes.blog },
      { label: "Webinaire", href: routes.webinar },
      { label: "FAQ", href: routes.faq },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: routes.legalNotice },
      { label: "Conditions générales", href: routes.terms },
      { label: "Politique de confidentialité", href: routes.privacy },
      { label: "Cookies", href: routes.cookies },
    ],
  },
] as const;
