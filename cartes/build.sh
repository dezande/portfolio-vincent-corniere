#!/usr/bin/env bash
# Génère cartes-de-visite.pdf : 5 rectos marqués alternés avec un verso blanc.
# Les données viennent du site (../src/data/cv.ts), via l'export du CV.
set -euo pipefail
cd "$(dirname "$0")"
command -v typst >/dev/null || { echo "Typst est requis : brew install typst"; exit 1; }
(cd ../cv && node scripts/export-data.mjs .. && ./scripts/fetch-fonts.sh)
typst compile --root .. --font-path ../cv/fonts cartes.typ cartes-de-visite.pdf
echo "✦ cartes-de-visite.pdf"
