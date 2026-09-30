#!/usr/bin/env bash
# Transformă orice poză în copertă de articol (1600x1000, ratio 16/10 —
# exact cât au cardurile), WebP + JPG.
#
#   npm run cover -- cale/către/poza.jpg nume-copertă
#   npm run cover -- ~/Pictures/desktop.png cover-primul-meu-linux
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$(cd "$HERE/.." && pwd)/src/assets/img"

SRC="${1:-}"
NAME="${2:-}"

if [ -z "$SRC" ] || [ -z "$NAME" ]; then
  echo "Folosire: npm run cover -- <cale/imagine> <nume-copertă>"
  echo "Exemplu : npm run cover -- ~/Pictures/desktop.jpg cover-primul-linux"
  exit 1
fi
[ -f "$SRC" ] || { echo "Nu găsesc fișierul: $SRC"; exit 1; }
case "$NAME" in */*|*..*) echo "Numele trebuie să fie simplu, fără cale: $NAME"; exit 1;; esac

# Dacă poza e deja în src/assets/img cu numele de copertă, lucrăm pe o copie
# temporară — altfel am scrie peste fișierul din care citim.
# (comparație portabilă, fără `realpath -m` și `mktemp --suffix`, care nu
#  există pe macOS/BSD — vezi discuția despre lucrul pe Mac.)
SRC_ABS="$(cd "$(dirname "$SRC")" && pwd -P)/$(basename "$SRC")"
DST_ABS="$OUT/$NAME.jpg"
if [ "$SRC_ABS" = "$DST_ABS" ]; then
  TMP_DIR="$(mktemp -d)"
  TMP="$TMP_DIR/cover.${SRC##*.}"
  cp "$SRC" "$TMP"
  SRC="$TMP"
  trap 'rm -rf "$TMP_DIR"' EXIT
fi

magick "$SRC" \
  -auto-orient -strip \
  -resize "1600x1000^" -gravity center -extent 1600x1000 \
  -background '#FFFDF8' -alpha remove -alpha off \
  -quality 84 "$OUT/$NAME.jpg"

magick "$SRC" \
  -auto-orient -strip \
  -resize "1600x1000^" -gravity center -extent 1600x1000 \
  -background '#FFFDF8' -alpha remove -alpha off \
  -quality 84 "$OUT/$NAME.webp"

echo "→ $NAME.jpg + $NAME.webp (1600x1000)"
echo
echo "Bagă asta în frontmatter-ul articolului:"
cat <<EOF
cover:
  webp: /assets/img/$NAME.webp
  jpg: /assets/img/$NAME.jpg
  alt: "Descriere pentru ecranele cititoare"
EOF
