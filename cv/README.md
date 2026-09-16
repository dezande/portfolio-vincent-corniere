# CV imprimable

CV en [Typst](https://typst.app), généré à partir des mêmes données que le site
(`../src/data/cv.ts`). Structure du CV d'origine (une colonne, sections soulignées, projets
détaillés par entreprise), direction artistique du site, pensé pour l'impression : fond blanc,
aucun aplat, filets fins, lisible en noir et blanc.

```bash
npm run cv          # depuis la racine du projet
# ou
cd cv && ./build.sh [couleur|nb|tous]
```

| Fichier généré | Usage |
| --- | --- |
| `cv/cv-vincent-corniere.pdf` | impression couleur économe (or sombre, rouge profond) |
| `cv/cv-vincent-corniere-nb.pdf` | impression noir et blanc, niveaux de gris purs |

Prérequis : `typst` (`brew install typst`) et Node.js. Les polices (licence SIL OFL) sont
téléchargées dans `cv/fonts/` au premier lancement.

**Pour modifier le contenu, modifiez `src/data/cv.ts`** puis relancez `npm run cv`.
La mise en page est dans `cv/cv.typ`.
