# Portfolio — Vincent Cornière

Portfolio de Vincent Cornière, développeur web back-end Ruby on Rails.

L'univers visuel reprend les affiches de magiciens des années 1900-1930 : noir d'encre, or
et rouge sang, cadres ornés, capitales gravées et soleil rayonnant. La structure (application
plein écran, menu à gauche, portrait à droite) s'inspire de la mise en page du template
Tunis (ib-themes). Le code et les ornements sont entièrement originaux.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173.

Autres commandes : `npm run build` (production, sortie dans `dist/`), `npm run preview`.

## Personnaliser

| Ce que vous voulez changer | Où |
| --- | --- |
| Textes, expériences, entreprises, projets | `src/data/cv.ts` |
| Couleurs, typographie, espacements | `src/styles/global.css` (bloc `:root`) |
| Ornements (filets, fleurons, soleil) | `src/components/Ornament.tsx` |
| Photo de profil | remplacer `public/img/portrait.svg` |
| Visuels des projets | `public/img/work-*.svg` |
| Titre de l'onglet et description SEO | `index.html` |

Polices (Google Fonts) : Cinzel Decorative pour les grands titres, Cinzel pour les
sous-titres, Poiret One pour les mentions, EB Garamond pour le texte courant.

Un thème « papier » clair est disponible via le bouton en losange, en haut à droite.

## Écrans

Accueil · À propos · Parcours · Entreprises · Projets · Contact

## À faire avant la mise en ligne

- **Remplacer le portrait** : `public/img/portrait.svg` est un visuel de substitution.
- **Remplacer les visuels de projets** : les `work-*.svg` sont des affichettes générées.
- **Brancher le formulaire de contact** : il valide les champs mais n'envoie rien.
  Le point de branchement est commenté dans `src/sections/Contact.tsx`.
- **Compléter les liens sociaux** : `socials` dans `src/data/cv.ts`.

## CV imprimable

Le dossier `cv/` génère un CV PDF en Typst à partir des mêmes données (`src/data/cv.ts`) :

```bash
npm run cv
```

Voir [cv/README.md](cv/README.md).

## Pile technique

React 19, TypeScript, Vite, Framer Motion, react-icons. Pas de framework CSS : une feuille
de style unique pilotée par variables CSS.
