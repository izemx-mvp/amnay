import { webinar } from "@/config/site";

/** "/webinaire" — date comes from config (webinar.nextSessionISO). */

export const webinarMeta = { title: "Webinaire — Amnay" };

export const webinarPage = {
  label: "Webinaire",
  title: "Un vrai appel d'offres, lu en direct",
  highlight: ["en", "direct"],
  lead: `${webinar.durationMin} minutes pour voir Amnay détecter, lire et noter un dossier marocain réel, puis rédiger une section de mémoire. Questions en direct.`,
  nextLabel: "Prochaine session",
  liveLabel: "Live",
  dateTbd: "Date à annoncer",
  dateTbdNote: "Inscrivez-vous : nous vous envoyons la date dès qu'elle est fixée.",
  durationLabel: `${webinar.durationMin} min · en ligne · gratuit`,
  agendaTitle: "Au programme",
  agenda: [
    {
      time: "00:00",
      title: "Le portail et ses pièges",
      body: "Pourquoi les bons appels d'offres passent inaperçus.",
    },
    {
      time: "00:10",
      title: "Un dossier lu en direct",
      body: "Retrait, lecture du CPS et du règlement, sources à la page.",
    },
    { time: "00:20", title: "Go / No-Go", body: "Score expliqué, éligibilité, pièces exigées." },
    {
      time: "00:30",
      title: "Le mémoire technique",
      body: "Une section rédigée dans le style d'un mémoire gagné.",
    },
    { time: "00:38", title: "Vos questions", body: "Réponses en direct de l'équipe." },
  ],
  speakerTitle: "Intervenant",
  speakerName: "Intervenant à confirmer",
  speakerRole: "Équipe Amnay · IZEMX",
  formTitle: "Je m'inscris",
  submit: "Réserver ma place",
  success: "Inscription confirmée. Vous recevrez le lien de connexion par e-mail.",
  successTitle: "C'est noté",
};
