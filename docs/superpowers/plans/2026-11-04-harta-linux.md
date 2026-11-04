# Articol „Harta Linux" + completare Glosar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Un articol nou în categoria Inițiere („Harta Linux" — straturile sistemului de la hardware la desktop, fără servere/Android) plus cei 12 termeni noi în Glosarul Linux, cu indexul actualizat.

**Architecture:** Articolul e un fișier Markdown nou în `src/posts/` cu frontmatter și copertă generată; Glosarul existent (`src/posts/glosar-linux.md`) primește 12 intrări `**Termen** — ...` cu ancoră `<a id>` în capitolele lor plus rânduri în indexul alfabetic. Verificarea se face cu uneltele existente: `npm run articol` (lint articole) și `npm run verify` (build + linkuri + HTML).

**Tech Stack:** Markdown + frontmatter YAML, Eleventy, ImageMagick (prin `scripts/generate-covers.sh`), Node scripts de verificare.

**Spec:** `docs/superpowers/specs/2026-11-04-harta-linux-design.md`

## Global Constraints

- Limba articolelor: **română cu diacritice**, tonul blogului (vezi `SABLON-ARTICOL.md`); NU se copiază mot-a-mot transcriptul video-ului.
- **Exclus din articol:** servere, cloud, containere/Docker/Kubernetes, Android (decizia partenerului).
- Categorie: `Inițiere` (exact așa, există în `src/_data/categories.js`).
- Data articolului: `2026-11-04`. Slug/fișier: `src/posts/harta-linux.md` → `/blog/harta-linux/`.
- Copertă: `cover-harta-linux.webp` + `.jpg`, generate cu `npm run cover:titlu`, declarate în frontmatter cu `alt`.
- Titluri `##` în articol: **minim 4** (Cuprinsul apare de la 3; 4 e marjă sigură). **Fără `# ` în corp** (titlul e doar în `title:`).
- Callout-uri: se folosește exact HTML-ul existent din blog (`callout--tip` / `callout--note` / `callout--warn`), copiat dintr-un articol existent.
- Linkuri interne doar spre pagini care există în `/blog/` (verificat de `check-site.mjs`).
- Glosar: termenii **noi** primesc `<a id="...">` + `**Termen** — definiție` + rând în index; termenii deja existenți se leagă prin link, nu se repetă. Numărul din index (`136`) devine `148`.
- Frequent commits: un commit per task.

## Review Focus

1. **Coperta declarată dar inexistentă** → eroare de lint care oprește verify. Test: `ls src/assets/img/cover-harta-linux.*` în Task 1, înainte de lint.
2. **Linkuri interne moarte** (ex. `/blog/structura-sistemului-linux/` scris greșit) → `check-site.mjs` raportează `-> /blog/...`. Test: pasul `npm run verify` din Task 3, așteptat `Broken internal links: none`.
3. **Ancore lipsă sau greșite în indexul Glosarului** (link `#vfs` fără `<a id="vfs">`) → NU e prins de niciun script (check-site verifică doar fișiere, nu ancore). Test: comanda `grep` din Task 2 care cere ca cele 12 id-uri noi să existe în corp.
4. **Numărul vechi de termeni rămas în textul indexului** („cei 136") → test explicit `grep -n "136" ...` fără rezultate + `grep -c '<a id='` = 148, în Task 2.
5. **Barieră ``` nepereche** în articol → înghite tot textul de după. Test: `npm run articol` (lint-posts) raportează eroarea explicit; pasul din Task 1 cere `0 erori`.

---

### Task 1: Articolul nou „Harta Linux"

**Files:**
- Create: `src/posts/harta-linux.md`
- Create (generat): `src/assets/img/cover-harta-linux.webp`, `src/assets/img/cover-harta-linux.jpg`

**Interfaces:**
- Consumă: frontmatter-ul standard descris în `SABLON-ARTICOL.md`; categoria `Inițiere` din `src/_data/categories.js`.
- Produce: fișierul `/blog/harta-linux/` — folosit doar de build; nu e consumat de alte task-uri.

**Conținut (decizii fixate):**
- `title`: `Harta Linux, strat cu strat: de la butonul de power până la primul program`
- `description`: `Cum pornește un calculator Linux și ce se ascunde sub fiecare strat: firmware, GRUB, kernel, systemd, shell, fișiere, distribuții și desktop — harta completă pentru începători.`
- `date`: `2026-11-04`
- `category`: `Inițiere`
- Structura `##` (fixă): `## Straturile hărții` (intro) → `## Primul strat: hardware-ul și firmware-ul` → `## GRUB și initramfs: urcătorul spre nucleu` → `## Kernelul: inima care stăpânește hardware-ul` → `## systemd: primul program care pornește` → `## Uneltele GNU și libc: cutia de scule` → `## Shell și terminal: cum vorbești cu sistemul` → `## Unde stau fișierele: harta de sub liniuță` → `## Distribuția: echipa care asamblează totul` → `## Fereastra ta: X11/Wayland, compozitorul și desktop-ul` → `## Aplicațiile: Flatpak, Snap și AppImage` → `## Recapitularea hărții`
- Fiecare capitol se încheie cu 1–2 linkuri interne spre articolele existente (ex. `/blog/linux-este-miezul-kernel/`, `/blog/structura-sistemului-linux/`, `/blog/un-ocean-de-distributii/`, `/blog/glosar-linux/`, `/blog/terminalul-fara-frica/`, `/blog/de-sau-wm/`, `/blog/instalare-programe-fara-magazin/`, `/blog/unix-linus-linux/`).
- Minim 2 callout-uri (un `tip`, un `note`), HTML copiat din `src/posts/alege-distributia.md`.
- Termeni **noi** folosiți în articol (vor fi adăugați în Glosar la Task 2): `initramfs`, `vmlinuz`, `apel de sistem`, `VFS`, `programator (scheduler)`, `memorie virtuală`, `PID 1`, `libc (glibc, musl)`, `Shell (Bash/Zsh/Fish)`, `coreutils`, `compositor`, `XWayland`.
- Final: pas concret + linia de atribuire:
  `<em>Articol inspirat de video-ul „I Wish Someone Explained Linux to Me Like This" al canalului Bit Byte Talks (YouTube); conținutul a fost rescris integral pentru acest blog.</em>`
- Lungime țintă: 1800–2200 cuvinte.

- [ ] **Step 1: Generează coperta**

Run: `npm run cover:titlu -- cover-harta-linux "Harta" "Linux"`
Expected: `→ cover-harta-linux (webp + jpg)`

- [ ] **Step 2: Verifică că ambele fișiere există**

Run: `ls -la src/assets/img/cover-harta-linux.webp src/assets/img/cover-harta-linux.jpg`
Expected: două fișiere listate, fiecare ~zeci de KB (nu 0)

- [ ] **Step 3: Scrie articolul `src/posts/harta-linux.md`**

Frontmatter exact conform deciziilor de mai sus (cu `cover.webp`, `cover.jpg`, `cover.alt: "Coperta articolului Harta Linux"`), corpul de 1800–2200 cuvinte în română, structura `##` fixată, linkuri interne, callout-uri, atribuirea la final. Transcriptul sursă: `/tmp/opencode/transcript.txt` (referință, nu se copiază).

- [ ] **Step 4: Rulează lint-ul articolelor**

Run: `npm run articol`
Expected: `Articole verificate: 26`, **0 erori** (`--- Erori în articole ---` absent); avertismentul eventual despre `<3 titluri ##` NU trebuie să apară

- [ ] **Step 5: Commit**

```bash
git add src/posts/harta-linux.md src/assets/img/cover-harta-linux.webp src/assets/img/cover-harta-linux.jpg
git commit -m "Articol nou: Harta Linux, strat cu strat (Inițiere)"
```

---

### Task 2: Cei 12 termeni noi în Glosar + indexul alfabetic

**Files:**
- Modify: `src/posts/glosar-linux.md` (capitolele indicate mai jos + indexul de la rândul ~623)

**Interfaces:**
- Consumă: articolul din Task 1 (linkurile din definiții duc spre `/blog/harta-linux/`).
- Produce: 12 id-uri de ancoră noi — verificate explicit în Step 3.

**Plasament (fixat):**

| # | id | Termen (bold) | Plasare |
|---|----|---------------|---------|
| 1 | `initramfs` | `initramfs` | după intrarea **GRUB**, cap. „Pornire, firmware și bootloader" |
| 2 | `vmlinuz` | `vmlinuz` | imediat după `initramfs` |
| 3 | `apel-sistem` | `Apel de sistem (system call)` | după **Kernel (nucleu, miez)**, cap. „Sistem de operare, kernel..." |
| 4 | `programator` | `Programator (scheduler)` | după `apel-sistem` |
| 5 | `memorie-virtuala` | `Memorie virtuală` | după `programator` |
| 6 | `vfs` | `VFS (sistem de fișiere virtual)` | după `memorie-virtuala` |
| 7 | `pid-1` | `PID 1 (procesul inițial, init)` | după intrarea **systemd** |
| 8 | `libc` | `libc (glibc, musl)` | după `pid-1` |
| 9 | `compositor` | `Compositor` | după intrarea **X11 / Wayland** |
| 10 | `xwayland` | `XWayland` | după `compositor` |
| 11 | `shell` | `Shell (Bash, Zsh, Fish)` | după intrarea **Terminal**, cap. „Terminal și comenzi" |
| 12 | `coreutils` | `coreutils (ls, cp, mv, cat)` | după `shell` |

Formatul fiecărei intrări (identic cu restul glosarului):

```markdown
<a id="initramfs"></a>

**initramfs** — sistemul de fișiere temporar încărcat de GRUB împreună cu kernelul: conține doar driverele necesare ca să găsească și să monteze discul real, apoi dispare. Explicat pe larg în [Harta Linux, strat cu strat](/blog/harta-linux/).
```

Definițiile: 1–3 fraze pe înțelesul începătorului + link spre `/blog/harta-linux/`; termenul se leagă și din articolul nou (Task 1) — invers nu e obligatoriu.

**Indexul alfabetic:** se adaugă în rândurile de literă existente, în ordine alfabetică:
`A` — Apel de sistem (system call) · `C` — Compositor, coreutils (ls, cp, mv, cat) · `I` — initramfs · `L` — libc (glibc, musl) · `M` — Memorie virtuală · `P` — PID 1 (procesul inițial, init), Programator (scheduler) · `S` — Shell (Bash, Zsh, Fish) · `V` — VFS (sistem de fișiere virtual), vmlinuz · `X` — XWayland.
Iar textul „Toți cei **136** de termeni" → „Toți cei **148** de termeni".

- [ ] **Step 1: Adaugă cele 12 intrări în capitole**

Conform tabelului de plasament, cu formatul dat, fiecare cu `<a id>` + `**Termen** — definiție` + link `/blog/harta-linux/`.

- [ ] **Step 2: Actualizează indexul alfabetic (12 rânduri + numărul 148)**

- [ ] **Step 3: Verifică ancorele și numărul**

Run: `grep -o '<a id="[a-z0-9-]*"' src/posts/glosar-linux.md | sort | uniq -d`
Expected: **fără ieșire** (fără ancore duplicate)

Run: `for id in initramfs vmlinuz apel-sistem programator memorie-virtuala vfs pid-1 libc compositor xwayland shell coreutils; do grep -q "<a id=\"$id\"" src/posts/glosar-linux.md || echo "LIPSEȘTE $id"; done`
Expected: **fără ieșire** (toate cele 12 există)

Run: `grep -c '<a id=' src/posts/glosar-linux.md` → `148`; `grep -n "cei 136" src/posts/glosar-linux.md` → **fără ieșire**

Run: `grep -o '](#[a-z0-9-]*)' src/posts/glosar-linux.md | sed 's/](#//;s/)//' | sort -u | while read a; do grep -q "<a id=\"$a\"" src/posts/glosar-linux.md || echo "ancoră moartă: $a"; done`
Expected: **fără ieșire** (fiecare link de index are ancoră)

- [ ] **Step 4: Rulează lint-ul**

Run: `npm run articol`
Expected: 0 erori

- [ ] **Step 5: Commit**

```bash
git add src/posts/glosar-linux.md
git commit -m "Glosar: 12 termeni noi din articolul Harta Linux (148 în total)"
```

---

### Task 3: Verificare completă a site-ului

**Files:**
- Modify: doar dacă verificarea raportează probleme (repară în fișierele din Task 1/2)

**Interfaces:**
- Consumă: Task 1 + Task 2.

- [ ] **Step 1: Build + verificări complete**

Run: `npm run verify`
Expected: `Files scanned: ...`, `Broken internal links/assets → none`, `Content markers → none`, `Articole verificate: 26`, fără ieșire de eroare HTML (check-html), exit 0

- [ ] **Step 2: Verifică articolul în build (opțional vizual)**

Run: `ls dist/blog/harta-linux/index.html && grep -c "post-toc" dist/blog/harta-linux/index.html`
Expected: fișier existent; `post-toc` apare de mai multe ori (titlul TOC-ului e „În acest articol", din `src/_includes/layouts/post.njk` — se afișează de la 3 titluri `##`)

Run: `grep -c "harta-linux" dist/blog/index.html`
Expected: ≥ 1 (articolul apare pe pagina blogului)

- [ ] **Step 3: Commit (doar dacă au fost reparații)**

```bash
git add -A
git commit -m "corecturi după verify"
```
Dacă verify a trecut din prima, acest pas se marchează fără commit.
