import { routes } from "./navigation";

/**
 * Blog posts. Add an object to `posts` to publish a new article at /blog/{slug}.
 * Posts of kind "decryptage" use the "L'appel d'offres de la semaine décrypté" template.
 */

export type TenderBrief = {
  buyer: string;
  object: string;
  estimate: string;
  deadline: string;
  criteria: { label: string; weight: string }[];
  pieces: string[];
  watchouts: string[];
  verdict: "go" | "nogo";
  verdictReason: string;
};

export type Post = {
  slug: string;
  kind: "decryptage";
  title: string;
  excerpt: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  sector: string;
  /** Shows the "ARTICLE EXEMPLE À REMPLACER" banner. */
  sample?: boolean;
  featured?: boolean;
  intro: string[];
  brief: TenderBrief;
  conclusion: string[];
};

export const blogPage = {
  label: "Blog",
  title: "L'appel d'offres de la semaine, décrypté",
  highlight: ["décrypté"],
  lead: "Chaque semaine, un vrai appel d'offres marocain lu de bout en bout : ce qu'il demande, ce qui piège, et notre verdict.",
  featuredLabel: "À la une",
  allLabel: "Tous les articles",
  readLabel: "Lire l'article",
  minutes: "{n} min de lecture",
  empty: "Les prochains décryptages arrivent bientôt.",
};

export const articleCopy = {
  back: "Tous les articles",
  sampleBanner: "ARTICLE EXEMPLE À REMPLACER",
  sampleNote:
    "Contenu fictif servant de gabarit : remplacez-le par un appel d'offres réel avant publication.",
  briefTitle: "Fiche AO",
  rows: {
    buyer: "Acheteur",
    object: "Objet",
    estimate: "Montant estimatif",
    deadline: "Date limite",
  },
  criteriaTitle: "Critères d'évaluation",
  piecesTitle: "Pièces exigées",
  watchoutsTitle: "Points de vigilance",
  verdictTitle: "Verdict",
  verdicts: { go: "GO", nogo: "NO-GO" },
  ctaTitle: "Analysez vos propres AO",
  ctaBody:
    "Amnay lit vos dossiers comme celui-ci, chaque jour, avec la page source de chaque information.",
  ctaDemo: "Voir une démo",
  ctaDemoHref: routes.demo,
};

export const posts: Post[] = [
  {
    slug: "exemple-leves-topographiques-sig",
    kind: "decryptage",
    title: "Levés topographiques et SIG : ce que cache le CPS",
    excerpt:
      "Un appel d'offres de levés et d'intégration SIG lu de bout en bout : qualification exigée, critères pondérés, et la caution qu'on oublie.",
    date: "2026-11-02",
    readingMinutes: 6,
    sector: "Topographie · SIG",
    sample: true,
    featured: true,
    intro: [
      "Cette semaine, un appel d'offres de levés topographiques avec intégration des données dans le SIG de l'acheteur. Un dossier de 212 pages, dont une partie scannée.",
      "Voici ce qu'il faut en retenir avant de décider d'y répondre.",
    ],
    brief: {
      buyer: "Acheteur public — régional (exemple)",
      object: "Levés topographiques et intégration SIG",
      estimate: "1 240 000 MAD TTC (exemple)",
      deadline: "J-24, 10:00",
      criteria: [
        { label: "Méthodologie", weight: "40 %" },
        { label: "Moyens humains", weight: "30 %" },
        { label: "Références similaires", weight: "20 %" },
        { label: "Planning", weight: "10 %" },
      ],
      pieces: [
        "Attestation fiscale",
        "Attestation CNSS",
        "Certificat de qualification",
        "Caution provisoire",
        "CV de l'équipe proposée",
      ],
      watchouts: [
        "La qualification exigée figure page 47 du CPS, pas dans l'avis.",
        "La caution provisoire doit être déposée avant la date limite.",
        "Les plans annexés sont scannés : vérifiez les échelles.",
      ],
      verdict: "go",
      verdictReason:
        "GO pour un bureau d'études qualifié avec deux références SIG récentes. NO-GO sans la qualification exigée.",
    },
    conclusion: [
      "Le dossier est abordable pour un cabinet structuré, à condition de préparer la caution tôt et de soigner la méthodologie, qui pèse 40 % de la note.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
