#!/usr/bin/env bash
# Generează coperți pentru articolele care nu au imagine proprie pe Wix.
# Folosește tipografia și paleta site-ului, deci arată ca restul coperților.
#
#   bash scripts/generate-covers.sh
#
# Rezultat: src/assets/img/<nume>.webp + .jpg (1600x1000, ratio 16/10)
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$(cd "$HERE/.." && pwd)/src/assets/img"
F_BOLD="$HERE/fonts/Fraunces-Bold.ttf"
F_REG="$HERE/fonts/Fraunces-Regular.ttf"

CREAM='#FFFDF8'
INK='#1A1614'
CORAL='#E1552B'
GOLD='#E9A13B'
MINT='#DCEFE6'

[ -f "$F_BOLD" ] || { echo "Lipsește $F_BOLD"; exit 1; }

make_cover() {
  local name="$1" blob="$2" line1="$3" line2="$4"

  magick -size 1600x1000 xc:"$CREAM" \
    -fill "${blob}8C" \
    -draw "circle 1410,170 1410,-90" \
    -fill "${GOLD}BF" \
    -draw "circle 1520,470 1520,330" \
    -fill "${CORAL}E6" \
    -draw "roundrectangle 1230,760 1560,900 70,70" \
    -fill "$INK" \
    -font "$F_REG" -pointsize 34 -kerning 7 \
    -gravity NorthWest -annotate +112+120 "PRIMII PAȘI SPRE LINUX" \
    -font "$F_BOLD" -pointsize 140 -kerning -1 \
    -annotate +108+300 "$line1" \
    -annotate +108+470 "$line2" \
    -stroke "$CORAL" -strokewidth 8 \
    -draw "stroke-linecap round; line 112,720 560,720" \
    -stroke none \
    -fill "${INK}8C" -font "$F_REG" -pointsize 30 -kerning 3 \
    -annotate +112+790 "Ghid pentru începători" \
    "$OUT/$name.png"

  magick "$OUT/$name.png" -quality 84 "$OUT/$name.jpg"
  magick "$OUT/$name.png" -quality 84 "$OUT/$name.webp"
  rm -f "$OUT/$name.png"
  echo "→ $name (webp + jpg)"
}

# Două moduri:
#   npm run covers
#       → regenerează coperțile implicite (cele două articole fără imagine)
#   npm run cover:titlu -- nume-copertă "Rândul unu" "Rândul doi"
#       → copertă nouă, în același stil, pentru articolul tău
if [ "$#" -ge 3 ]; then
  make_cover "$1" "$MINT" "$2" "$3"
else
  make_cover "cover-unix-linus" "$MINT"  "Unix + Linus" "= Linux"
  make_cover "cover-benefic"    "$MINT"  "De ce este benefic" "să învățați Linux?"
fi
