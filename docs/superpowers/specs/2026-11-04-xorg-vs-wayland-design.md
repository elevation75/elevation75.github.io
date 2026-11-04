# Design: articol „Xorg vs Wayland" (Inițiere) + completare Glosar

Data: 2026-11-04

## Intent

Video-ul „Xorg vs Wayland difference explained for beginners" (Bit Byte Talks)
povestește diferența dintre serverul grafic clasic și cel modern. Blogul are
doar un paragraf scurt despre X11/Wayland în „Harta Linux" (care linkuiește la
„DE sau WM?") și o mențiune în „Procesul de bootare" — dar **nu** are articolul
de comparație. Ăsta e golul.

Sursă: https://www.youtube.com/watch?v=NvME0NGQ8RU (transcript obținut, 1499 cuvinte).

## Decizia de structură (aleasă de partener)

Articol **self-contained**, scris pentru un novice care n-a citit nimic altceva.
Linkuri spre „Harta Linux" și „DE sau WM?" doar pentru aprofundare, nu ca
precondiție. Categoria: **Inițiere**.

## Scope

**Intră:**
- Articol nou `src/posts/xorg-vs-wayland.md`, `category: Inițiere`,
  `date: 2026-11-04`, slug `/blog/xorg-vs-wayland/`
- Copertă: imaginea primită `xorg_wayland.jpg` (1376×768) convertită la
  1600×1000 **prin completare** (ca la celelalte — conținutul ajunge la margini)
- Structură, ~1800–2200 cuvinte, ≥6 titluri `##`:
  1. `## Cine desenează ferestrele tale?` (intro + callout)
  2. `## X11: nașterea ferestrelor (1984)` — MIT, ideea de a rula aplicații pe alt calculator, de unde arhitectura complexă
  3. `## Xorg: X11-ul care a ajuns standard` — implementarea open source de pe Linux
  4. `## Problema: securitatea din 1984` — orice aplicație putea asculta tastatura alteia
  5. `## Compozitorul: stratul care crea bătăi de cap` — calea app → X server → compozitor → X server → ecran, tearing, lag
  6. `## Wayland: o luăm de la capăt (2008)` — Kristian Høgsberg, **protocol, nu produs**, fără middleman
  7. `## Securitatea și performanța` — izolare în protocol, damage tracking
  8. `## Cine implementează Wayland?` — analogia HTTP/Apache: Mutter (GNOME), KWin (KDE), Sway, Weston (referință)
  9. `## XWayland: puntea pentru aplicațiile vechi`
  10. `## Unde suntem azi` — Fedora, Ubuntu 22.04, Nvidia; ce mai scârțâie (partajare de ecran, jocuri, remote desktop)
  11. `## Cum vezi ce rulezi` — `echo $XDG_SESSION_TYPE` + alegerea la ecranul de login (callout, bloc de cod)
  12. `## Xlibre: al treilea actor` — **fraze noi, din cercetarea proprie, nu din video**
  13. `## Recapitularea: veteranul și arhitectul` + concluzie cu linkuri
- Callout-uri din cele 3 variante existente; **în callout-uri se scrie HTML direct**
  (`<a href>`, `<code>`, `<strong>`), NU Markdown — vezi bug-ul reparat ieri
- Linkuri spre: `/blog/harta-linux/`, `/blog/de-sau-wm/`, `/blog/procesul-de-bootare-linux/`, `/blog/glosar-linux/`
- **Glosar**: termenii noi + indexul actualizat

**Secțiunea Xlibre (frazele cerute de partener):** câteva rânduri, neutru și
factual, verificat din surse — fork al serverului X.Org pornit în iunie 2025 de
Enrico Weigelt; curățare masivă de cod + funcții noi; repornirea suportului
pentru driverele Nvidia vechi (340/390/470); build pe BSD/Linux/macOS/Windows;
versiuni 25.0 (iunie 2025) și 25.1 (2026, peste 1500 commit-uri + corecturi de
securitate); adoptat ca implicit de OpenMandriva și Artix Linux, pachete pentru
Arch, repo pentru Fedora. **Fără** controversele politice din jurul proiectului.

## Termeni noi pentru Glosar (verificați azi: 0 apariții)

| Termen | id | Capitol glosar |
|---|---|---|
| Server de display | `server-display` | Mediul desktop |
| Compozitor (Wayland) — extins | `compositor` (existent, se completează) | Sistem de operare... (existent) |
| XWayland — extins | `xwayland` (existent, se completează) | Sistem de operare... (existent) |
| Protocol (X11 / Wayland) | `protocol` | Sistem de operare, kernel... |
| Mutter, KWin, Weston | `compozitori-wayland` | Mediul desktop |
| Tearing (ruptură de imagine) | `tearing` | Mediul desktop |
| Damage tracking | `damage-tracking` | Mediul desktop |
| Portal (XDG Desktop Portal) | `portal-xdg` | Tehnologii și web |
| Xlibre | `xlibre` | Sistem de operare, kernel... |

**5 intrări noi** (`protocol`, `compozitori-wayland`, `tearing`, `damage-tracking`,
`portal-xdg`, `xlibre`, `server-display` = 7 de fapt) + **2 completări** la
`compositor` și `xwayland`, care există dar nu explică rolul lor în comparație.
Indexul: 157 → **164**.

## Non-goals

- Nu se reiau paragrafele din „Harta Linux" sau „DE sau WM?" — link în loc de text.
- Nu se traduce mot-a-mot transcriptul.
- Nu se ating articolele existente (doar Glosarul primește termeni/completări).
- Nu se intră în controversele politice din jurul Xlibre.

## Verificare

`npm run verify` (build + articole + linkuri + HTML) trebuie să trecească,
apoi verificare live pe GitHub Pages după push.
