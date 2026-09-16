#!/usr/bin/env bash
# Génère le CV en PDF (cv-vincent-corniere.pdf) et le copie dans public/cv/ pour le site.
#
# Les données viennent du site (../src/data/cv.ts) : data.json est régénéré à chaque build.
set -euo pipefail
cd "$(dirname "$0")"

command -v typst >/dev/null || { echo "Typst est requis : brew install typst"; exit 1; }
command -v node >/dev/null || { echo "Node.js est requis pour lire les données du site"; exit 1; }

node scripts/export-data.mjs ..
./scripts/fetch-fonts.sh

typst compile --font-path fonts cv.typ cv-vincent-corniere.pdf
echo "✦ cv-vincent-corniere.pdf"

# Copie dans public/cv/ : le site propose le téléchargement, Vite l'inclut au build.
mkdir -p ../public/cv
rm -f ../public/cv/*.pdf
cp cv-vincent-corniere.pdf ../public/cv/
echo "✦ copié dans public/cv/"
