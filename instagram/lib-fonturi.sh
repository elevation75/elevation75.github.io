# Fonturile exacte ale blogului, descărcate o singură dată și „fixate” la
# greutatea dorită (Fraunces 700 pentru titluri, Source Sans 3 600 pentru etichete).
# Se folosește prin:  . "$IG/lib-fonturi.sh"

FONTDIR="/tmp/ig-fonts"
FR="$FONTDIR/Fraunces-Bold.ttf"          # titluri (Fraunces wght 700)
SS="$FONTDIR/SourceSans3-SemiBold.ttf"   # etichete (Source Sans 3 wght 600)

fonturi() {
  [ -f "$FR" ] && [ -f "$SS" ] && return 0
  mkdir -p "$FONTDIR"
  echo "Descarc fonturile blogului (o singură dată)…"
  curl -sfL -o "$FONTDIR/Fraunces-var.ttf" \
    "https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf"
  curl -sfL -o "$FONTDIR/SourceSans3-var.ttf" \
    "https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf"
  python3 -m fontTools.varLib.instancer "$FONTDIR/Fraunces-var.ttf" \
    wght=700 opsz=72 SOFT=0 WONK=1 -o "$FR" >/dev/null
  python3 -m fontTools.varLib.instancer "$FONTDIR/SourceSans3-var.ttf" \
    wght=600 -o "$SS" >/dev/null
}
