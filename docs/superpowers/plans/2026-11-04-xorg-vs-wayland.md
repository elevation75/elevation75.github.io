# Articol „Xorg vs Wayland" + completare Glosar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Articol nou în Inițiere care compară serverul grafic clasic (Xorg/X11) cu cel modern (Wayland) pentru un novice, plus secțiunea Xlibre, plus 7 termeni noi și 2 completări în Glosar (index 157 → 164).

**Architecture:** Un fișier Markdown nou în `src/posts/` cu coperta primită de la partener convertită la 1600×1000; Glosarul primește 7 intrări noi cu `<a id>` + 2 definiții completate, plus rânduri în indexul alfabetic. Verificare cu uneltele existente: `npm run articol` (lint) și `npm run verify` (build + linkuri + HTML).

**Tech Stack:** Markdown + frontmatter YAML, Eleventy, ImageMagick, Node scripts de verificare.

**Spec:** `docs/superpowers/specs/2026-11-04-xorg-vs-wayland-design.md`

## Global Constraints

- Limba: **română cu diacritice**, tonul blogului; NU se copiază mot-a-mot transcriptul.
- Categoria: `Inițiere` (exact așa). `date: 2026-11-04`; fișier `src/posts/xorg-vs-wayland.md` → `/blog/xorg-vs-wayland/`.
- Articol **self-contained**: linkuri spre `/blog/harta-linux/`, `/blog/de-sau-wm/`, `/blog/procesul-de-bootare-linux/`, `/blog/glosar-linux/` doar pentru aprofundare, nu ca precondiție.
- **În callout-uri se scrie HTML direct** (`<a href="...">`, `<code>`, `<strong>`), NU Markdown — markdown-it nu convertește Markdown în blocurile `<div>` (bug reparat la commit `858ae73`).
- Copertă: `cover-xorg-wayland.webp` + `.jpg` din `xorg_wayland.jpg` (1376×768) **prin completare** (53 + 893 + 54 = 1000), NU prin decupare — conținutul ajunge la margini. Timestamp-urile celor două fișiere trebuie **egale**, altfel `sync-covers` le re-decupează la build.
- Titluri `##`: **minim 6** (structura de 13 din spec). **Fără `# ` în corp.** Bariere de cod ``` închise.
- Secțiunea Xlibre: **doar fapte verificate** (iunie 2025, Enrico Weigelt, curățare cod, drivere Nvidia 340/390/470, build BSD/Linux/macOS/Windows, 25.0 iun. 2025, 25.1 în 2026 cu 1500+ commit-uri, OpenMandriva + Artix implicit, pachete Arch, repo Fedora). **Fără** controverse politice.
- Glosar: 7 termeni noi + 2 completări; indexul devine **164**.
- Frequent commits: un commit per task.

## Review Focus

1. **Coperta re-decuperată de `sync-covers`** dacă timestamp-urile diferă → test: `stat -c '%Y'` pe ambele fișiere, așteptat identic, după ce coperta e generată ȘI după `npm run verify`.
2. **Markdown neconvertit în callout-uri** (bug-ul cunoscut) → test: comanda `grep` din Task 1 care cere `<a href=` și interzice `](` în callout-uri.
3. **Linkuri interne moarte** → `check-site.mjs`. Test: pasul `npm run verify` din Task 3, așteptat `Broken internal links/assets: none`.
4. **Ancore lipsă/moarte în indexul Glosarului** (neprins de scripturi) → test: comenzi `grep` din Task 2 (9 id-uri noi + zero ancore moarte + `grep -c '<a id='` = 164 + zero „cei 157").
5. **Xlibre: fapte neverificate** (cifre greșite, controverse) → test de revizuire în Task 1, Step 5: fiecare afirmație din secțiune trebuie să corespundă listei de fapte din Global Constraints.

---

### Task 1: Articolul „Xorg vs Wayland"

**Files:**
- Create: `src/posts/xorg-vs-wayland.md`
- Create (generat): `src/assets/img/cover-xorg-wayland.webp`, `src/assets/img/cover-xorg-wayland.jpg`

**Interfaces:**
- Consumă: frontmatter-ul din `SABLON-ARTICOL.md`; categoria `Inițiere`; existența paginilor `/blog/harta-linux/`, `/blog/de-sau-wm/`, `/blog/procesul-de-bootare-linux/`, `/blog/glosar-linux/`.
- Produce: pagina `/blog/xorg-vs-wayland/` — Task 2 o referă din definițiile de glosar.

**Conținut (decizii fixate):**
- `title`: `Xorg vs Wayland: diferențele dintre serverele grafice, explicate pe înțelesul tău`
- `description`: `Cine desenează ferestrele în Linux și de ce se schimbă de la Xorg la Wayland: securitate, performanță, XWayland, cine implementează ce — plus noul Xlibre.`
- `date`: `2026-11-04`; `category`: `Inițiere`
- `cover.webp: /assets/img/cover-xorg-wayland.webp`, `cover.jpg: /assets/img/cover-xorg-wayland.jpg`, `cover.alt: "Diagramă comparativă Xorg (vechi, clasic) și Wayland (nou, modern), cu diferențele cheie"`
- Structura `##` (fixă, în ordine):
  1. `## Cine desenează ferestrele tale?`
  2. `## X11: nașterea ferestrelor (1984)` — MIT, ideea de a rula aplicații pe alt calculator (de unde arhitectura)
  3. `## Xorg: X11-ul care a ajuns standard`
  4. `## Problema: securitatea din 1984` — orice aplicație putea asculta tastatura alteia
  5. `## Compozitorul: stratul care crea bătăi de cap` — calea app → X server → compozitor → X server → ecran; tearing, lag
  6. `## Wayland: o luăm de la capăt (2008)` — Kristian Høgsberg; **protocol, nu produs**; fără middleman
  7. `## Securitatea și performanța` — izolare în protocol, damage tracking
  8. `## Cine implementează Wayland?` — analogia HTTP/Apache; Mutter (GNOME), KWin (KDE), Sway, Weston (referință)
  9. `## XWayland: puntea pentru aplicațiile vechi`
  10. `## Unde suntem azi` — Fedora, Ubuntu 22.04, Nvidia; ce mai scârțâie: partajare de ecran, jocuri, remote desktop
  11. `## Cum vezi ce rulezi` — `echo $XDG_SESSION_TYPE` în bloc ```bash``` + alegerea la ecranul de login
  12. `## Xlibre: al treilea actor` — **din cercetarea proprie, nu din video** (faptele din Global Constraints)
  13. `## Recapitularea: veteranul și arhitectul` — concluzie + linkuri
- Minim 3 callout-uri (un `tip`, un `note`, un `warn`), HTML **direct** în callout-uri
- Termeni **noi** folosiți (pentru Task 2): `server de display`, `protocol`, `compozitori Wayland (Mutter, KWin, Weston)`, `tearing`, `damage tracking`, `portal (XDG Desktop Portal)`, `Xlibre`
- Lungime țintă: 1800–2200 cuvinte

- [ ] **Step 1: Generează coperta din imaginea primită**

```bash
magick xorg_wayland.jpg -resize 1600x /tmp/opencode/base-xw.png
magick /tmp/opencode/base-xw.png -crop 1600x1+0+0 +repage -resize 1600x53! /tmp/opencode/top-xw.png
magick /tmp/opencode/base-xw.png -crop 1600x1+0+892 +repage -resize 1600x54! /tmp/opencode/bot-xw.png
magick /tmp/opencode/top-xw.png /tmp/opencode/base-xw.png /tmp/opencode/bot-xw.png -append -quality 84 src/assets/img/cover-xorg-wayland.jpg
magick src/assets/img/cover-xorg-wayland.jpg -quality 84 src/assets/img/cover-xorg-wayland.webp
```
Expected: `magick identify` → ambele `1600x1000`

- [ ] **Step 2: Verifică dimensiunea și timestamp-urile egale**

Run: `magick identify src/assets/img/cover-xorg-wayland.jpg src/assets/img/cover-xorg-wayland.webp && stat -c '%Y' src/assets/img/cover-xorg-wayland.jpg src/assets/img/cover-xorg-wayland.webp`
Expected: ambele `1600x1000`; **aceeași** valoare de timestamp (altfel `sync-covers` re-decupează)

- [ ] **Step 3: Scrie articolul `src/posts/xorg-vs-wayland.md`**

Frontmatter exact conform deciziilor de mai sus, corp 1800–2200 cuvinte, structura `##` fixată, linkuri interne, callout-uri **cu HTML direct**, bloc de cod ```bash``` închis pentru `echo $XDG_SESSION_TYPE`. Transcriptul: `/tmp/opencode/transcript-xorg.txt` (referință).

- [ ] **Step 4: Verifică regula callout-urilor (bug-ul cunoscut)**

Run: `python3 -c "import re;t=open('src/posts/xorg-vs-wayland.md').read();[print('MD NECONVERTIT:',m.group(0)[:60]) for b in re.findall(r'<div class=\"callout.*?</div>\s*</div>',t,re.S) for m in re.finditer(r'\[[^\]]+\]\([^)]+\)|(?<![\`])\`[^\`\n]+\`|\*\*[^*]+\*\*',b)]"`
Expected: **fără ieșire** (zero Markdown în callout-uri)

- [ ] **Step 5: Verifică secțiunea Xlibre (fapte din spec)**

Run: `sed -n '/## Xlibre/,/^## /p' src/posts/xorg-vs-wayland.md | grep -ci "2025\|25.0\|25.1\|OpenMandriva\|Artix\|Nvidia"`
Expected: `≥ 4` (cifrele și numele din Global Constraints sunt prezente)

- [ ] **Step 6: Verificări de structură + lint**

Run: `grep -c "^## " src/posts/xorg-vs-wayland.md` → `≥ 13`; `grep -c "/blog/de-sau-wm/" src/posts/xorg-vs-wayland.md` → `≥ 1`

Run: `npm run articol`
Expected: `Articole verificate: 27`, **0 erori**; fără avertisment „doar N titluri ##" pentru noul articol

- [ ] **Step 7: Commit**

```bash
git add src/posts/xorg-vs-wayland.md src/assets/img/cover-xorg-wayland.webp src/assets/img/cover-xorg-wayland.jpg
git commit -m "Articol nou: Xorg vs Wayland (Initiere)"
```

---

### Task 2: 7 termeni noi + 2 completări în Glosar + indexul

**Files:**
- Modify: `src/posts/glosar-linux.md` (capitolele indicate + indexul de la rândul ~705)

**Interfaces:**
- Consumă: articolul din Task 1 (linkurile din definiții duc spre `/blog/xorg-vs-wayland/`).
- Produce: 7 id-uri noi + 2 definiții completate — verificate explicit în Step 3.

**Plasament — intrări noi (fixat):**

| # | id | Termen (bold) | Plasare |
|---|----|---------------|---------|
| 1 | `server-display` | `Server de display` | cap. „Sistem de operare...", **imediat înainte de `x11-wayland`** (rândul 306) |
| 2 | `protocol` | `Protocol (X11, Wayland)` | cap. „Sistem de operare...", **după `server-display`** |
| 3 | `xlibre` | `Xlibre` | cap. „Sistem de operare...", **după `xwayland`** (rândul 314) |
| 4 | `compozitori-wayland` | `Compozitori Wayland (Mutter, KWin, Weston)` | cap. „Mediul desktop", **după `stacking-compositing`** (rândul 434) |
| 5 | `tearing` | `Tearing (ruptură de imagine)` | cap. „Mediul desktop", **după `compozitori-wayland`** |
| 6 | `damage-tracking` | `Damage tracking` | cap. „Mediul desktop", **după `tearing`** |
| 7 | `portal-xdg` | `Portal (XDG Desktop Portal)` | cap. „Tehnologii și web", **după `dbus`** (rândul 678) |

**Completări (definiții existente se extind, NU se mută):**
- `compositor` (rândul 310): se adaugă rolul în comparație — pe Wayland compozitorul e **și** serverul de display într-un singur program (fără middleman), iar implementările sunt Mutter/KWin/Sway/Weston → link spre `compozitori-wayland` și spre articol.
- `xwayland` (rândul 314): se adaugă că e un **mini server X care rulează înăuntru** și **traduce** cererile X11 în comenzi Wayland → link spre articol.

Formatul fiecărei intrări noi (identic cu restul glosarului):

```markdown
<a id="server-display"></a>

**Server de display** — programul care desenează ferestrele, cursorul și tastatura pe ecran și traduce ce apăsă tu în ce văd programele. Pe Linux au fost două mari: X11 (clasicul) și Wayland (cel nou) — comparația completă e în [Xorg vs Wayland](/blog/xorg-vs-wayland/).
```

**Indexul alfabetic** — rânduri noi, în ordine case-insensitivă:
`C` — Compozitori Wayland (Mutter, KWin, Weston) · după **Compositor**, înainte de Conductă
`D` — Damage tracking · înainte de `dd`
`P` — Portal (XDG Desktop Portal) · între **Placă video (GPU)** și **POST**
`P` — Protocol (X11, Wayland) · între **Programator** și **Prompt**
`S` — Server de display · între **Secure Boot** și **Sesiune de utilizator**
`T` — Tearing (ruptură de imagine) · înainte de **Telemetrie**
`X` — Xlibre · între **Xfce** și **XWayland**
Iar textul „Toți cei **157** de termeni" → „Toți cei **164** de termeni".

- [ ] **Step 1: Adaugă cele 7 intrări noi în capitole**

Conform tabelului, cu formatul dat, fiecare cu `<a id>` + `**Termen** — definiție` + link `/blog/xorg-vs-wayland/`.

- [ ] **Step 2: Completăzi definițiile `compositor` și `xwayland` + actualizează indexul (7 rânduri + numărul 164)**

- [ ] **Step 3: Verifică ancorele și numărul**

Run: `grep -o '<a id="[a-z0-9-]*"' src/posts/glosar-linux.md | sort | uniq -d`
Expected: **fără ieșire**

Run: `for id in server-display protocol xlibre compozitori-wayland tearing damage-tracking portal-xdg; do grep -q "<a id=\"$id\"" src/posts/glosar-linux.md || echo "LIPSEȘTE $id"; done`
Expected: **fără ieșire**

Run: `grep -c '<a id=' src/posts/glosar-linux.md` → `164`; `grep -n "cei 157" src/posts/glosar-linux.md` → **fără ieșire**

Run: `grep -o '](#[a-z0-9-]*)' src/posts/glosar-linux.md | sed 's/](#//;s/)//' | sort -u | while read a; do grep -q "<a id=\"$a\"" src/posts/glosar-linux.md || echo "ancoră moartă: $a"; done`
Expected: **fără ieșire** (excepția cunoscută `#index-alfabetic`, generată de `markdown-it-anchor`, se ignoră dacă apare)

- [ ] **Step 4: Rulează lint-ul**

Run: `npm run articol`
Expected: 0 erori

- [ ] **Step 5: Commit**

```bash
git add src/posts/glosar-linux.md
git commit -m "Glosar: 7 termeni + 2 completari din Xorg vs Wayland (164 in total)"
```

---

### Task 3: Verificare completă + publicare

**Files:**
- Modify: doar dacă verificarea raportează probleme (repară în fișierele Task 1/2)

**Interfaces:**
- Consumă: Task 1 + Task 2.

- [ ] **Step 1: Build + verificări complete**

Run: `npm run verify`
Expected: `Articole verificate: 27`, `Broken internal links/assets → none`, `Content markers → none`, HTML structurat OK, exit 0

- [ ] **Step 2: Verifică articolul în build și integritatea copertelor**

Run: `ls dist/blog/xorg-vs-wayland/index.html && grep -c "post-toc" dist/blog/xorg-vs-wayland/index.html && grep -c "xorg-vs-wayland" dist/blog/index.html && magick identify src/assets/img/cover-xorg-wayland.jpg src/assets/img/cover-xorg-wayland.webp`
Expected: fișier existent; `post-toc` ≥ 3; articolul pe pagina blogului ≥ 1; **ambele încă 1600x1000** (nu le-a re-decuperat `sync-covers`)

- [ ] **Step 3: Commit + push + verificare live**

```bash
git add -A
git commit -m "corecturi dupa verify"   # doar dacă au fost reparații; altfel se sare
git push origin main
```

Apoi `sleep 80` și:
Run: `curl -s -o /dev/null -w "%{http_code}" https://elevation75.github.io/blog/xorg-vs-wayland/`
Expected: `200`
