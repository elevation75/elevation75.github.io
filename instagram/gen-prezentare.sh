#!/usr/bin/env bash
# Postarea de prezentare a contului (doar Instagram, nu se publică pe blog).
# 1080×1350, fără fotografie: logo + titlu + pe scurt ce găsești aici.
#
# Rulare:  ./instagram/gen-prezentare.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IG="$ROOT/instagram"
LOGO="$ROOT/src/assets/img/logo.png"
OUT="$IG/00-prezentare/post.jpg"
WORK="$(mktemp -d /tmp/ig-prez.XXXXXX)"
trap 'rm -rf "$WORK"' EXIT

# --- paleta blogului (src/assets/css/main.css) -------------------------------
PAPER="#fffdf8"; PAPER2="#fdf5e9"; INK="#241b14"; INK2="#4b4139"
INK3="#786d63"; CORAL="#e1552b"

. "$IG/lib-fonturi.sh"
fonturi
mkdir -p "$IG/00-prezentare"

# Subtitlul, cu rânduri rupte automat (840px, centrat)
printf '%s' "Pentru cei care vor să învețe Linux și să intre în lumea lui — gratuit, în română, de la zero." > "$WORK/sub.txt"

magick -size 1080x1350 xc:"$PAPER" \
  -fill "$CORAL" -draw "rectangle 0,0 1079,10" \
  -fill "$CORAL" -draw "rectangle 460,596 619,601" \
  -fill "$CORAL" -draw "rectangle 0,1194 1079,1199" \
  -fill "$PAPER2" -draw "rectangle 0,1200 1079,1349" \
  \( "$LOGO" -resize 340x \) -geometry +370+150 -composite \
  -font "$FR" -pointsize 66 -fill "$INK" \
  -gravity North -annotate +0+470 "Haideți să învățăm Linux!" \
  -font "$SS" -pointsize 30 -fill "$INK3" \
  -gravity North -annotate +0+845 "Ghiduri pas cu pas, ecran cu ecran" \
  -gravity North -annotate +0+915 "Explicații fără jargon, fără grabă" \
  -gravity North -annotate +0+985 "De la primul pas la sistemul tău" \
  -pointsize 32 -kerning 2 -fill "$INK" \
  -gravity North -annotate +0+1244 "elevation75.github.io" \
  -pointsize 24 -kerning 0 -fill "$INK3" \
  -gravity North -annotate +0+1296 "Blog gratuit, în română, pentru începători" \
  "$WORK/baza.png"

magick "$WORK/baza.png" \
  \( -background none -size 840x -font "$SS" -pointsize 32 \
     -gravity Center -fill "$INK2" "caption:@$WORK/sub.txt" \) \
  -gravity NorthWest -geometry +120+650 -composite \
  -strip -quality 92 "$OUT"

printf 'Gata: %s\n' "$OUT"
