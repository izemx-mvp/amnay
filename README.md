# Screenshot Perfect (47)

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e9c0d05-d2ac-4ea9-9ccc-c1f6bb254ec1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Modifier le contenu du site (Amnay)

Tout le texte est en français dans `src/content/*` ; les chiffres viennent d'un seul fichier.

### Prix, formules, Offre Fondateurs, dates — `src/config/site.ts`

- **Formules** : tableau `plans` (prix mensuel/annuel, crédits, membres, options). Le tableau des tarifs, le simulateur, le comparateur et les prix Fondateurs se recalculent automatiquement.
- **Crédits et packs** : `creditCosts`, `packs`, `trial` (durée et crédits de l'essai).
- **Offre Fondateurs** : `founders` — `placesTotal`, `placesLeft` (à mettre à jour à chaque vente), `discount` (0.3 = -30 %), `priceLockYears`, `deadlineISO` (date limite).
- **Auto-hébergé** : `selfHosted`.
- **Webinaire** : `webinar.nextSessionISO` (laisser vide = « prochaine session à annoncer »).
- **Contacts, bureaux, liens** : `contacts`, `offices`, `urls` (`trialUrl`, `demoBookingUrl` — URL Calendly/Cal.com pour remplacer le calendrier factice, `appLoginUrl`).

Ne jamais écrire un prix en dur dans une page : toujours passer par `site.ts`.

### Ajouter un segment (landing `/[slug]`) — `src/content/segments.ts`

1. Copier un objet existant du tableau `segments` (ex. `bureaux-etudes`) et changer le `slug` et les textes.
2. La page est disponible immédiatement sur `/<slug>` (aucune route à créer).
3. Pour l'afficher dans le menu « Solutions » et le pied de page : ajouter l'entrée dans `src/content/navigation.ts`.

### Ajouter un article de blog — `src/content/blog.ts`

1. Ajouter un objet au tableau `posts` (`slug`, `title`, `date` au format `AAAA-MM-JJ`, `sector`, `excerpt`, `intro`, `brief` = fiche AO, `conclusion`).
2. `featured: true` le met en avant sur `/blog` ; `sample: true` affiche le bandeau « exemple ». Retirer l'article d'exemple avant la mise en ligne.
3. L'article est servi sur `/blog/<slug>`.

### Formulaires

`submitLead()` dans `src/lib/leads.ts` se contente d'un `console.log` : c'est l'unique point à brancher sur un CRM ou un webhook.
