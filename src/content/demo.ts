/** "/demo" and "/essai" */

export const demoMeta = { title: "Réserver une démo — Amnay" };

export const demoPage = {
  label: "Démo",
  title: "Réserver une démo",
  highlight: ["démo"],
  pitch: "30 minutes avec notre équipe, sur un vrai appel d'offres de votre secteur.",
  pitchHighlight: ["vrai", "appel", "d'offres"],
  seeLabel: "Ce que vous verrez",
  bullets: [
    "Un appel d'offres de votre secteur, détecté et noté sur 100",
    "Le dossier lu en direct, avec l'éligibilité vérifiée et les sources",
    "Une section de mémoire technique rédigée dans votre style",
  ],
  formTitle: "Vos coordonnées",
  bookingTitle: "Choisissez un créneau",
  offerLabels: { fondateurs: "Offre Fondateurs" } as Record<string, string>,
  offerBanner: "Vous demandez une démo pour l'{offre}.",
};

export const trialPage = {
  title: "Ouverture de votre essai gratuit…",
  body: "Nous vous redirigeons vers l'application. Si rien ne se passe, utilisez le bouton ci-dessous.",
  button: "Ouvrir l'essai gratuit",
  back: "Revenir au site",
};

export const trialMeta = { title: "Essai gratuit — Amnay" };
