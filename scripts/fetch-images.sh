#!/usr/bin/env bash
# Downloads original images from the Wix site and optimises them locally.
set -euo pipefail

BASE="https://static.wixstatic.com/media"
RAW="/tmp/opencode/raw-img"
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/assets/img"
mkdir -p "$RAW" "$OUT"

# name|wix-id
ITEMS=(
  "logo|abe310_c1daa9546c034d609b3d98978355bce8~mv2.png"
  "hero|abe310_12aab42be69348609469cb124d8d82a3~mv2.png"
  "author|abe310_d739b0755b3b41e08575d126ed71d9e5~mv2.jpg"
  "cover-de-wm|abe310_fcb0d07b76da44de99749e19b8331094~mv2.jpeg"
  "cover-distributii|abe310_23ee638331314474b79b77c97c1c86db~mv2.png"
  "cover-comparatie|abe310_ee6ab49cb6914c1db2c14d53f97772c9~mv2.jpg"
  "cover-kernel|abe310_a067265bfeb549b692309cee0193bde8~mv2.png"
  "de-kde|abe310_3a2ce618776f4d45ae2a38a8f867ed78~mv2.png"
  "de-gnome|abe310_fcb0d07b76da44de99749e19b8331094~mv2.jpeg"
  "de-xfce|abe310_59671e3f11ac4d97bf5642547a8d986f~mv2.png"
  "de-budgie|abe310_4dd09391abdd4b99952ad0c678a79793~mv2.png"
  "de-cinnamon|abe310_5fb8776cdbaa4bc3bef2d4c033b9c9fd~mv2.jpg"
  "de-cosmic|abe310_7dd11a71f58442b6a2227b4f36e4a6af~mv2.webp"
  "de-hyprland|abe310_2fe080560fdc4214b027f4614d0e58cf~mv2.webp"
  "de-lxde|abe310_34692249cbe44cbaaad5744676dae572~mv2.png"
  "de-lxqt|abe310_b24ac34858cb4bdd90fe1bb1b1c86ada~mv2.png"
  "de-mate|abe310_bf6cdea441e440e488ba1ec5c46d374b~mv2.png"
  "de-pantheon|abe310_a54e9baeed5f4e5fb051a41c0b884b6d~mv2.webp"
  "de-deepin|abe310_27d9f94033f3440daf5cbd616dcc1bf5~mv2.png"
  "kernel-engine|abe310_f36f12d9ac7c404c991f29eab23ab249~mv2.png"
  "distributii-immutable|abe310_4429ac33cd3c4cb2b849a34cdf9d95c4~mv2.png"
  # --- articole noi (migrate din Wix) ---
  "cover-haideti|abe310_96d5375b3c1442058ce6c3a5d7b8af5e~mv2.jpg"
  "cover-istorie|abe310_77e772567f954ffbbb93780936969160~mv2.jpg"
  "istorie-a|abe310_17fe7c606e1b4cbbb77161758b39ebcf~mv2.jpg"
  "istorie-b|abe310_4356a951e8584b0384dbd5775e3350e5~mv2.png"
  "istorie-c|abe310_8070538411ec42d695af24e39d09022c~mv2.jpg"
  "unix-makefile|abe310_ad09e2f7f1d24359b220252edd95e0b5~mv2.png"
  "mascota-banner|abe310_28256bfa9fb64dc8b5d87a9af27b330a~mv2.png"
  "mascota-tux|abe310_5ce55ee5863449f79ea712b81e68555f~mv2.jpg"
)

for entry in "${ITEMS[@]}"; do
  name="${entry%%|*}"
  file="${entry##*|}"
  src="$RAW/$name"
  if [ ! -s "$src" ]; then
    echo "→ $name"
    curl -sSfL --max-time 60 "$BASE/$file" -o "$src" || { echo "  ! failed"; continue; }
  fi
done

echo "--- optimising ---"
# Cover images: 1200x630-ish card art -> webp + jpg fallback
for n in cover-de-wm cover-distributii cover-comparatie cover-kernel cover-haideti cover-istorie; do
  [ -s "$RAW/$n" ] || continue
  magick "$RAW/$n" -auto-orient -resize "1000x1000>" -quality 82 "$OUT/$n.webp"
  magick "$RAW/$n" -auto-orient -resize "1000x1000>" -quality 82 "$OUT/$n.jpg"
done

# Wide hero
if [ -s "$RAW/hero" ]; then
  magick "$RAW/hero" -resize "1800x>" -quality 84 "$OUT/hero.webp"
  magick "$RAW/hero" -resize "1800x>" -quality 84 "$OUT/hero.jpg"
fi

# Logo keeps transparency
[ -s "$RAW/logo" ] && magick "$RAW/logo" -resize "480x>" -strip "$OUT/logo.png"

# Author portrait
[ -s "$RAW/author" ] && magick "$RAW/author" -auto-orient -resize "700x700>" -quality 85 "$OUT/author.jpg"

# Inline post images: keep readable, webp + jpg
for n in de-kde de-gnome de-xfce de-budgie de-cinnamon de-cosmic de-hyprland \
         de-lxde de-lxqt de-mate de-pantheon de-deepin kernel-engine distributii-immutable \
         istorie-a istorie-b istorie-c unix-makefile mascota-banner mascota-tux; do
  [ -s "$RAW/$n" ] || continue
  magick "$RAW/$n" -auto-orient -resize "900x>" -quality 84 "$OUT/$n.webp"
  magick "$RAW/$n" -auto-orient -resize "900x>" -quality 84 "$OUT/$n.jpg"
done

echo "--- results ---"
ls -la "$OUT" | awk '{print $5, $9}'
