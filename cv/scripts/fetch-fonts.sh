#!/usr/bin/env bash
# Télécharge les polices du site (licence SIL OFL) depuis le dépôt Google Fonts,
# uniquement si elles manquent dans fonts/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p fonts
BASE="https://raw.githubusercontent.com/google/fonts/main/ofl"
FILES=(
  "cinzel/Cinzel%5Bwght%5D.ttf"
  "cinzeldecorative/CinzelDecorative-Regular.ttf"
  "cinzeldecorative/CinzelDecorative-Bold.ttf"
  "cinzeldecorative/CinzelDecorative-Black.ttf"
  "ebgaramond/EBGaramond%5Bwght%5D.ttf"
  "ebgaramond/EBGaramond-Italic%5Bwght%5D.ttf"
  "poiretone/PoiretOne-Regular.ttf"
)
for f in "${FILES[@]}"; do
  name="$(basename "$f" | sed 's/%5B/[/; s/%5D/]/')"
  if [ ! -s "fonts/$name" ]; then
    echo "  téléchargement de $name"
    curl -fsSL -o "fonts/$name" "$BASE/$f"
  fi
done
