#!/usr/bin/env bash
# Postări Instagram 4:5 (1080×1350) din coperțile blogului, cu titlul articolului.
# Stil: fotografia sus (1080×990) + bandă de hârtie jos (1080×360) cu titlul.
#
# Folosește fonturile exacte ale blogului (Fraunces + Source Sans 3), pe care le
# descarcă o singură dată din Google Fonts și le „fixează” la greutatea dorită.
#
# Rulare:  ./instagram/gen-postere.sh          (toate)
#          ./instagram/gen-postere.sh 03       (doar postările care încep cu 03)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IG="$ROOT/instagram"
IMG="$ROOT/src/assets/img"
MANIFEST="$IG/articole.tsv"
WORK="$(mktemp -d /tmp/ig-postere.XXXXXX)"
trap 'rm -rf "$WORK"' EXIT

# --- paleta și fonturile blogului (src/assets/css/main.css) -------------------
PAPER="#fffdf8"; INK="#241b14"; INK3="#786d63"; CORAL="#e1552b"
FONTDIR="/tmp/ig-fonts"
. "$IG/lib-fonturi.sh"

# --- cât de mare să fie titlul ------------------------------------------------
# Încearcă de la 56px în jos, până încapă în maximum 3 rânduri (≤196px).
pointsize_pentru() {  # $1 = fișierul cu titlul
  local ps h
  for ps in 56 50 44 38; do
    h=$(magick -background none -size 936x -font "$FR" -pointsize "$ps" \
        -fill "$INK" "caption:@$1" -trim -format "%h" info: 2>/dev/null || echo 999)
    case "$h" in (*[!0-9]*|"") h=999;; esac
    [ "$h" -le 184 ] && { echo "$ps"; return 0; }
  done
  echo 38
}

genereaza() {  # $1=nr  $2=slug  $3=copertă  $4=titlu
  local nr="$1" slug="$2" coperta="$3" titlu="$4"
  local dir="$IG/$nr-$slug" ps
  mkdir -p "$dir"
  printf '%s' "$titlu" > "$WORK/titlu.txt"
  ps=$(pointsize_pentru "$WORK/titlu.txt")

  # 1) fotografia: umple 1080×990, decupare centrată (fără deformare)
  magick "$IMG/$coperta" -auto-orient -resize 1080x990^ \
         -gravity center -extent 1080x990 "$WORK/foto.png"

  # 2) banda de titlu: eticheta și footerul se așază direct cu -annotate
  #    (poziționare exactă), titlul se compune separat, decupat la bbox-ul lui.
  magick -size 1080x360 xc:"$PAPER" \
    -fill "$CORAL" -draw "rectangle 0,0 1079,5" \
    -font "$SS" -pointsize 26 -kerning 6 -fill "$CORAL" \
    -gravity NorthWest -annotate +72+46 "PRIMII PAȘI SPRE LINUX" \
    -pointsize 22 -kerning 1 -fill "$INK3" \
    -gravity SouthEast -annotate +72+36 "elevation75.github.io" \
    "$WORK/banda.png"

  magick "$WORK/banda.png" \
    \( -background none -size 936x -font "$FR" -pointsize "$ps" \
       -fill "$INK" "caption:@$WORK/titlu.txt" -trim -set page +0+0 \) \
    -geometry +72+106 -composite "$WORK/banda2.png"
  mv "$WORK/banda2.png" "$WORK/banda.png"

  # 3) postarea finală 1080×1350
  magick "$WORK/foto.png" "$WORK/banda.png" -append -strip -quality 92 \
    "$dir/post.jpg"
  printf '  %-2s %-42s %spx\n' "$nr" "$slug" "$ps"
}

fonturi
echo "Postări Instagram 4:5 (1080×1350):"

filtro="${1:-}"
while IFS=$'\t' read -r nr slug coperta titlu; do
  case "$nr" in \#*|"") continue;; esac
  [ -n "$filtro" ] && [[ "$nr" != "$filtro"* ]] && continue
  [ -f "$IMG/$coperta" ] || { echo "  !! lipsește coperta $coperta"; continue; }
  genereaza "$nr" "$slug" "$coperta" "$titlu"
done < "$MANIFEST"

echo "Gata. Postările sunt în $IG/<nr>-<slug>/post.jpg"
