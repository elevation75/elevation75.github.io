# Primii pași spre Linux

Blog static despre Linux pentru începători. Construit cu
[Eleventy](https://www.11ty.dev/) — scrii articole în Markdown, el generează
un site rapid, fără baze de date, fără abonamente și fără JavaScript
inutil.

```bash
npm install      # o singură dată
npm run dev      # previzualizare pe http://localhost:8090
npm run build    # generează site-ul în dist/
npm run verify   # build + verificări (articole, linkuri, structură HTML)
```

---

## 1. De completat înainte de publicare

Deschide **`src/_data/site.json`** și completează:

| Câmp | Ce face | Exemplu |
|------|---------|---------|
| `url` | Adresa finală a blogului. Este folosită în RSS, sitemap și etichetele SEO. **Fără ea, linkurile din feed sunt greșite.** | `https://blogulmeu.ro` |
| `email` | Afișată pe pagina de contact. Dacă e goală, pagina arată varianta cu RSS. | `contact@exemplu.ro` |
| `social[*].url` | Linkurile de socializare. Cele goale **nu sunt afișate deloc**, deci nu rămân linkuri moarte. | `https://facebook.com/...` |
| `newsletter` | Formularul de abonare. Vezi mai jos. | |

Atâta timp cât `url` este `https://example.com`, build-ul afișează un avertisment
galben — e intenționat.

---

## 2. Cum publici un articol nou

Creezi un fișier `.md` în **`src/posts/`**. Numele fișierului *este* adresa:

```
src/posts/alegerea-unei-distributii.md   →   https://site.ro/blog/alegerea-unei-distributii/
```

Cel mai simplu: copiază șablonul din rădăcina proiectului (`SABLON-ARTICOL.md`)
și completează-l — are deja toate câmpurile explicate în comentarii:

```bash
cp SABLON-ARTICOL.md src/posts/alegerea-unei-distributii.md
```

Conținutul de baz:

```markdown
---
title: "Alegerea unei distribuții"
description: "Un rezumat de o frază. Apare pe carduri, în Google și în RSS."
date: 2026-10-05
updated: 2026-10-08          ← opțional
category: Inițiere           ← trebuie să existe în categories.js
cover:
  webp: /assets/img/cover-distributii.webp
  jpg: /assets/img/cover-distributii.jpg
  alt: "Descriere pentru ecranele cititoare"
  caption: "Text opțional sub imagine"   ← opțional
---

Textul articolului. Se scrie Markdown obișnuit.

## Un titlu de secțiune

Paragrafe, **bold**, *italics*, [linkuri](https://...), liste și `cod inline`.

```bash
sudo apt update
```

Următorul pas: [alt articol](/blog/alt-articol/)
```

Apoi `npm run dev` și vezi rezultatul imediat. **Cam atât — nu trebuie să
atingi altceva.**

### Verificarea articolelor

```bash
npm run articol     # fără build, doar articolele din src/posts/
npm run verify      # build complet + linkuri + HTML
```

`npm run articol` prinde greșelile care altfel se văd abia în browser:

- **barieră de cod ``` neînchisă** — textul de după ea dispare complet din articol;
- frontmatter fără `title` / `description` / `date` / `category`;
- dată în alt format decât `AAAA-LL-ZZ`;
- categorie care nu există în `categories.js`;
- copertă declarată în frontmatter, dar fișierul lipsă din `src/assets/img/`;
- `# titlu` în corpul textului (titlul se scrie doar în `title:`);
- sub 3 titluri `##` → nu apare „Cuprins”.

### Scurtături utile în articole

| Scrii | Iese |
|-------|------|
| `{% image "nume-imagine", "text alternativ", "legenda" %}` | imagine completă cu WebP + fallback JPG |
| `{% thumb "nume-imagine", "text alternativ" %}` | miniatură mică, plasată în dreapta (bună în liste) |
| ```` ```bash ```` | bloc de cod cu evidențiere de sintaxă |
| `<div class="callout callout--tip">…</div>` | cutie colorată — `note` (verde), `tip` (galben), `warn` (portocaliu) |

Titlurile `##` și `###` primesc automat link de tip ancoră și intră în
„Cuprins" (apare singur când articolul are mai mult de două secțiuni).

### Capturi preluate din documentația Ubuntu

Ghidul de instalare Ubuntu conține capturi de ecran luate din
[tutorialul oficial](https://ubuntu.com/desktop/docs/en/latest/tutorial/install-ubuntu-desktop/),
care este licențiat **CC BY-SA 4.0**. Le-optimizezi exact ca pe orice altă
imagine:

```bash
magick in.png -resize '1400x>' -strip -quality 84 src/assets/img/nume.jpg
magick in.png -resize '1400x>' -strip -quality 78 src/assets/img/nume.webp
```

Când mai folosești imagini sau texte din surse externe, ține regula:
**rescrii în stilul site-ului** (nu copia ca atare) și **pui atribuirea cu
licența la finalul articolului**, ca în ultima linie a ghidului Ubuntu.

### Imaginile

Pui fișierele în **`src/assets/img/`**, apoi le numești în frontmatter **fără
extensie în numele folosit de `image`/`thumb`**, dar **cu extensie în
frontmatter** (`cover.jpg` / `cover.webp`).

Pentru imagini din vechiul site Wix, rulezi:

```bash
npm run images   # descarcă originalele și le optimizează în WebP + JPG
```

### Coperți pentru articole noi

**Calea simplă — poza se rezolvă singură.** Pune fișierul în `src/assets/img/`
cu *numele pe care îl scrii în frontmatter* și atât:

```yaml
cover:
  webp: /assets/img/cover-primul-linux.webp
  jpg: /assets/img/cover-primul-linux.jpg
  alt: "Descriere pentru ecranele cititoare"
```

```bash
cp ~/Pictures/desktop.jpg src/assets/img/cover-primul-linux.jpg
npm run dev      # sau npm run build
```

`scripts/sync-covers.mjs` rulează **automat** la `dev` și la `build` (vezi
`predev`/`prebuild` în `package.json`) și:

- îți creează `.webp`-ul dacă ai doar `.jpg` (și invers) — ambele la **1600×1000**;
- redimensionează poza aruncată direct în folder, indiferent de mărimea ei;
- dacă **nu există niciun** fișier, îți spune exact ce să faci (fără să oprească build-ul).

Ai și două comenzi pentru celelalte cazuri:

```bash
# 1. ai o poză (screenshot, fotografie, desktop) → o face copertă 1600x1000
npm run cover -- ~/Pictures/desktop.jpg cover-primul-linux

# 2. nu ai imagine → copertă cu titlu, în stilul site-ului
npm run cover:titlu -- cover-primul-linux "Primul meu" "Linux"
```

Cele două coperți generate pentru articolele fără imagine de pe Wix se
regenerează cu `npm run covers`.

### Dacă nu ai nicio imagine

Lipsește doar blocul `cover:` din frontmatter — dar atunci cardul rămâne fără
imagine pe `/blog/`. Cel mai bine folosești una dintre comenzile de mai sus.

---

## 3. Categorii

Sunt definite în **`src/_data/categories.js`**:

- `Inițiere`
- `Instalare`
- `Ghid Distribuții` — ghiduri pas cu pas pentru distribuțiile cele mai cunoscute
- `Administrare`
- `Customizare`

Toate categoriile apar **peste tot** — în filtre, pe prima pagină, în footer și în
sitemap — inclusiv cele fără articole, cu numărul `0`. Categoria goală are și
ea pagină, cu o stare frumoasă („Prima postare este în lucru”), dar primește
`noindex` până la primul articol, ca să nu-ți umple motoarele de căutare cu
pagini fără conținut.

Adaugi articolul cu

```yaml
category: Ghid Distribuții
```

iar la următorul build numărul crește singur, împreună cu cardul de pe prima
pagină, rândul din sitemap și rezultatele din căutare.

Nu trebuie să nimerici diacriticele: `Ghid Distributii`, `ghid distribuții`
sau `GHID DISTRIBUȚII` se potrivesc toate — iar dacă greșești cu totul,
verificarea îți listează categoriile valide.

**Ca să adaugi o categorie nouă**, scrii un obiect în lista din
`categories.js`:

```js
{
  name: "Numele categoriei",   // cum apare pe site
  slug: "numele-categoriei",   // în URL: /categorii/numele-categoriei/
  description: "O frază scurtă, afișată pe pagina categoriei.",
  icon: "compass",             // seedling, download, sliders, palette,
                               // compass, book, layers, users, zap, terminal…
  accent: "blue",              // mint, amber, blue, coral, violet
}
```

---

## 4. Newsletter (opțional)

Formularul nu apare deloc dacă nu e configurat. Ca să-l activezi:

1. Îți faci cont gratuit pe [Buttondown](https://buttondown.com) sau un alt
   serviciu de email cu formular.
2. În `site.json` pui:

```json
"newsletter": {
  "enabled": true,
  "action": "https://buttondown.email/api/emails/embed-subscribe/UTILIZATORUL_TAU",
  "title": "Ține-mă la curent",
  "blurb": "Primești un email doar când apare o postare nouă.",
  "button": "Abonează-te"
}
```

---

## 5. Publicare (gazduire gratuită)

Site-ul rezultat este doar fișiere statice în **`dist/`**. Orice funcționează —
și **nu îți trebuie domeniu propriu**: primești o adresă gratuită.

> ⚠️ Site-ul folosește **căi absolute** (`/assets/...`, `/blog/...`), deci trebuie
> publicat **la rădăcină**. Un repo oarecare (`nume.github.io/proiect/`) ar da 404
> la toate imaginile și legăturile.

**GitHub Pages (recomandat — se publică singur la fiecare articol nou)**

1. Creează un repository **public** numit exact `<numele-tau-de-utilizator>.github.io`
   (ex: dacă utilizatorul tău e `ionel`, repo-ul e `ionel.github.io`).
2. În folderul proiectului, trimite codul (o singură dată):
   ```bash
   git remote add origin https://github.com/<numele-tau>/<numele-tau>.github.io.git
   git push -u origin main
   ```
3. Activează publicarea: *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
4. Din acel moment, fiecare `git push` pe `main` construiește și publică site-ul
   automat (workflow-ul `.github/workflows/deploy.yml` e deja în repo).
5. Adresa ta: `https://<numele-tau>.github.io`.

**Netlify (cel mai simplu, fără GitHub)**
1. Pe [netlify.com/drop](https://app.netlify.com/drop) tragi folderul `dist/`.
2. Gata: ai `https://<ceva>.netlify.app`. Dezavantaj: la articol nou reîncarci manual.

**Cloudflare Pages**
- *Create a project* → *Upload assets* → build `npm run build`, output `dist`.

Nu uita să pui `url` real în `site.json` înainte (ex: `https://<numele-tau>.github.io`) —
altfel RSS, sitemap-ul și canonical-ul vor arăta către `https://example.com`.

---

## 6. Structura proiectului

```
src/
├── _data/
│   ├── site.json          ← setările site-ului (url, email, social, newsletter)
│   ├── categories.js      ← categoriile
│   ├── search.js           ← indexul de căutare (se generează din posts/)
│   └── redirects.js       ← adresele vechi de pe Wix → cele noi
├── _includes/
│   ├── layouts/
│   │   ├── base.njk       ← scheletul oricărei pagini (head, header, footer)
│   │   └── post.njk       ← șablonul articolului
│   ├── partials/
│   │   ├── header.njk     ← meniul
│   │   ├── footer.njk
│   │   └── post-card.njk  ← cardul de articol, reutilizat peste tot
│   └── macros/icons.njk   ← pictogramele SVG
├── posts/                 ← aici scrii articolele (un fișier = un articol)
├── assets/
│   ├── css/main.css       ← toată stilarea
│   ├── css/fonts.css      ← fonturile auto-găzduite
│   ├── fonts/             ← fișierele .woff2
│   ├── img/               ← imaginile
│   ├── js/site.js          ← meniul mobil + scurtătura „/” (~2 KB)
│   └── js/search.js        ← motorul căutării, doar pe /cauta/ (~7 KB)
├── index.njk              ← pagina de start
├── blog.njk               ← /blog/ — toate postările
├── cauta.njk              ← /cauta/ — căutarea în articole
├── categorii.njk          ← /categorii/<slug>/ (o pagină per categorie)
├── despre.njk             ← /despre/
├── contact.njk            ← /contact/
├── 404.njk                ← /404.html
├── redirects.njk          ← paginile de redirecționare de pe Wix
├── feed.njk               ← /feed.xml (RSS)
├── sitemap.njk            ← /sitemap.xml
└── robots.njk             ← /robots.txt

eleventy.config.js         ← colecții, filtre, scurtături, Markdown
```

### Căutarea pe site

Pagina **`/cauta/`** caută în titluri, în secțiunile `##`/`###` și în textul
articolelor. Indexul se reconstruiește la fiecare build din fișierele `.md`,
deci **un articol nou apare automat în căutare** — nu ai nimic de întreținut.

- funcționează cu sau fără diacritice: `initiere` găsește „Inițiere”
- caută cuvinte parțiale: `distribu` găsește „distribuții”, `apt update` găsește comanda în text
- rezultatele au `?q=…` în URL, deci poți trimite cuiva o căutare gata făcută
- din orice pagină, apasă **`/`** ca să sari direct la căutare (sau dă click pe lupa din meniu)
- nimic extern: fără serviciu de căutare, fără cookie-uri, fără cereri în plus

Fișiere: `src/cauta.njk` (pagina), `src/_data/search.js` (indexul) și
`src/assets/js/search.js` (motorul: scorare, fragmente, evidențiere).

---

## 7. Despre mutarea de pe Wix

Toate adresele vechi sunt deja acoperite: fiecare `/post/…` de pe Wix are o
pagină de redirecționare care trimite instant către articolul nou
(`/post/un-ocean-de-distribuții/` → `/blog/un-ocean-de-distributii/`), plus
`/my-blog/` → `/blog/`, `/about/` → `/despre/` și `/about-5/` → `/contact/`.
Pentru adresele cu diacritice există și varianta ASCII
(`/post/putina-istorie/`).

Redirecționările stau în **`src/_data/redirects.js`** — un rând nou per
adresă veche, iar pagina o generează `src/redirects.njk` singură.

```js
["/post/numele-vechi/", "/blog/numele-nou/"],
```

Fiecare pagină de redirecționare are `meta refresh` + `<script>location.replace`
+ un link vizibil, așa că funcționează indiferent de gazdă (Netlify, GitHub
Pages, Cloudflare Pages). Nu ai nimic de făcut la migrare.

---

## 8. Comenzi

| Comandă | Ce face |
|---------|---------|
| `npm run dev` | server de dezvoltare cu reîncărcare automată |
| `npm run build` | generează `dist/` |
| `npm run check` | verifică articolele, linkurile interne și structura HTML |
| `npm run articol` | doar verificarea articolelor (fără build) |
| `npm run verify` | build + check |
| `npm run images` | descarcă și optimizează imaginile din Wix |
| `npm run cover -- <poză> <nume>` | face copertă 1600×1000 dintr-o poză |
| `npm run cover:titlu -- <nume> "r1" "r2"` | copertă cu titlu, în stilul site-ului |
| `scripts/sync-covers.mjs` (automat la dev/build) | completează `.jpg`/`.webp`-ul care lipsește |
| `npm run covers` | regenerează coperțile articolelor fără imagine |
| `npm run fonts` | re-descarcă fonturile auto-găzduite |
| `npm run clean` | șterge `dist/` |

---

## 9. Tehnologii

[Eleventy](https://www.11ty.dev/) · [markdown-it](https://markdown-it.github.io/)
cu ancore și note de subsol · [Prism](https://prismjs.com/) (evidențiere de
sintaxă generată la build, fără JS în browser) · fonturi
[Fraunces](https://fonts.google.com/specimen/Fraunces),
[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) și
[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), auto-găzduite.

Zero dependențe externe la randare: nu se încarcă niciun font, script sau
imagine de pe alte domenii.
