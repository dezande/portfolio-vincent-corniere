#!/usr/bin/env bash
# Génère le CV en PDF : version couleur (encre réduite) et version noir et blanc.
#
#   ./build.sh            → les deux PDF
#   ./build.sh couleur    → cv-vincent-corniere.pdf
#   ./build.sh nb         → cv-vincent-corniere-nb.pdf
#
# Les données viennent du site (../src/data/cv.ts) : data.json est régénéré à chaque build.
set -euo pipefail
cd "$(dirname "$0")"

command -v typst >/dev/null || { echo "Typst est requis : brew install typst"; exit 1; }

command -v node >/dev/null || { echo "Node.js est requis pour lire les données du site"; exit 1; }
node scripts/export-data.mjs ..

./scripts/fetch-fonts.sh

build() {
  local mode="$1" out="$2"
  typst compile --font-path fonts --input "mode=$mode" cv.typ "$out"
  echo "✦ $out"
}

publish() {
  # Copie dans public/cv/ : le site propose le téléchargement, Vite l'inclut au build.
  mkdir -p ../public/cv
  cp cv-vincent-corniere*.pdf ../public/cv/
  echo "✦ copiés dans public/cv/"
}

case "${1:-tous}" in
  couleur) build couleur cv-vincent-corniere.pdf ;;
  nb)      build nb cv-vincent-corniere-nb.pdf ;;
  tous)    build couleur cv-vincent-corniere.pdf; build nb cv-vincent-corniere-nb.pdf ;;
  *) echo "Usage : ./build.sh [couleur|nb|tous]"; exit 1 ;;
esac
publish
