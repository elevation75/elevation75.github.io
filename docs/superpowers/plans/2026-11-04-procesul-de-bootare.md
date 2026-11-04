# Articol „Procesul de bootare Linux" + completare Glosar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Articol nou în categoria Inițiere care descrie procesul de pornire cronologic (buton → desktop), aprofundând **doar** ce nu acoperă „Harta Linux", plus 9 termeni noi în Glosarul Linux cu indexul actualizat la 157.

**Architecture:** Un fișier Markdown nou în `src/posts/` cu frontmatter și copertă generată; Glosarul existent primește 9 intrări `**Termen** — ...` cu ancoră `<a id>` în capitolele lor + rânduri în indexul alfabetic. Verificarea se face cu uneltele existente: `npm run articol` (lint) și `npm run verify` (build + linkuri + HTML).

**Tech Stack:** Markdown + frontmatter YAML, Eleventy, ImageMagick (`scripts/generate-covers.sh`), Node scripts de verificare.

**Spec:** `docs/superpowers/specs/2026-11-04-procesul-de-bootare-design.md`

## Global Constraints

- Limba: **română cu diacritice**, tonul blogului (vezi `SABLON-ARTICOL.md`); NU se copiază mot-a-mot transcriptul.
- **Regula de suprapunere (decizia partenerului):** pasul deja descris în „Harta Linux" primește **link** spre articolul potrivit, NU text nou. Aprofundarea e **doar** pentru: POST, MBR vs partiție EFI, decompresia kernelului, țintele systemd, serviciile (udev/NetworkManager/journald), display manager, sesiunea + D-Bus, `systemd-analyze`.
- Categorie: `Inițiere` (exact așa, există în `src/_data/categories.js`).
- `date: 2026-11-04`; fișier `src/posts/procesul-de-bootare-linux.md` → `/blog/procesul-de-bootare-linux/`.
- Copertă: `cover-procesul-bootare.webp` + `.jpg`, generate cu `npm run cover:titlu`, declarate în frontmatter cu `alt`.
- Titluri `##`: **minim 4** (structura de 15 secțiuni din spec). **Fără `# ` în corp.**
- Callout-uri: doar HTML-ul existent din blog (`callout--tip` / `callout--note` / `callout--warn`), copiat dintr-un articol existent.
- Linkuri interne doar spre pagini care există (verificat de `check-site.mjs`).
- Glosar: cei 9 termeni **noi** primesc `<a id>` + `**Termen** — definiție` + rând în index; termenii existenți (BIOS, UEFI, MBR, ESP, GRUB, systemd, PID 1, initramfs, X11/Wayland...) se leagă prin link. Indexul devine **157**.
- Frequent commits: un commit per task.

## Review Focus

1. **Coperta declarată dar inexistentă** → eroare de lint care oprește verify. Test: `ls src/assets/img/cover-procesul-bootare.*` în Task 1, înainte de lint.
2. **Linkuri interne moarte** (ex. `/blog/harta-linux/` scris greșit) → `check-site.mjs` raportează `-> /blog/...`. Test: pasul `npm run verify` din Task 3, așteptat `Broken internal links/assets: none`.
3. **Repetarea conținutului din Harta Linux** (exact ce a cerut partenerul să NU se întâmple) → test manual explicit în Task 1: comandă `grep` care cere ca secțiunile preluate din Harta să conțină link, nu text nou.
4. **Ancore lipsă sau moarte în indexul Glosarului** → NU e prins de niciun script. Test: comanda `grep` din Task 2 cere cele 9 id-uri noi + zero ancore moarte.
5. **Numărul vechi de termeni rămas în text** („cei 148") → test explicit: `grep -n "cei 148"` fără rezultate + `grep -c '<a id='` = 157, în Task 2.

---

### Task 1: Articolul „Procesul de bootare Linux"

**Files:**
- Create: `src/posts/procesul-de-bootare-linux.md`
- Create (generat): `src/assets/img/cover-procesul-bootare.webp`, `src/assets/img/cover-procesul-bootare.jpg`

**Interfaces:**
- Consumă: frontmatter-ul standard din `SABLON-ARTICOL.md`; categoria `Inițiere`; existența paginilor `/blog/harta-linux/`, `/blog/structura-sistemului-linux/`, `/blog/terminalul-fara-frica/`, `/blog/de-sau-wm/`, `/blog/glosar-linux/`.
- Produce: pagina `/blog/procesul-de-bootare-linux/` — nu e consumată de alte task-uri; Task 2 o referă din definițiile de glosar.

**Conținut (decizii fixate):**
- `title`: `Procesul de bootare Linux: de la butonul de power până la desktop`
- `description`: `Ce se întâmplă în cele 10-30 de secunde când pornești un calculator Linux: POST, GRUB, kernelul, initramfs, systemd, țintele, display manager-ul și sesiunea ta — pas cu pas.`
- `date`: `2026-11-04`
- `category`: `Inițiere`
- Structura `##` (fixă, în ordine):
  1. `## De ce contează cele 10–30 de secunde`
  2. `## Butonul de power: CPU-ul se trezește`
  3. `## POST: verificarea de sănătate` — POST nou + BIOS/UEFI cu link spre Harta
  4. `## De unde pornește: MBR sau partiția EFI` — MBR 512 bytes / ESP, cu link la Glosar
  5. `## GRUB: predarea` — **doar link** spre Harta (secțiunea „podul spre nucleu")
  6. `## Kernelul se trezește` — decompresia kernelului e nou; restul cu link spre Harta
  7. `## initramfs: oul și găina` — analogia „cheia de rezervă", link spre Harta
  8. `## Montarea rădăcinii` — `/` devine acasă, link spre Structura sistemului
  9. `## systemd, PID 1 și fișierele de unități` — unit files noi, restul link spre Harta
  10. `## Țintele: basic → multi-user → graphical` — **total nou**
  11. `## Serviciile care pornesc în paralel` — udev, NetworkManager, journald — **total nou**
  12. `## Serverul de display` — **doar link** spre Harta
  13. `## Display manager: ușa de la intrare` — GDM/LightDM/SDDM — **total nou**
  14. `## Sesiunea ta și D-Bus` — `.bashrc`, aplicații de start, temă, D-Bus — **total nou**
  15. `## Recapitularea lanțului` + `## Încearcă acum` (ultimul capitol cu comenzi)
- Fiecare capitol cu link intern spre: `/blog/harta-linux/`, `/blog/structura-sistemului-linux/`, `/blog/glosar-linux/#...`, `/blog/de-sau-wm/`, `/blog/terminalul-fara-frica/`
- Minim 2 callout-uri (un `tip`, un `note`), HTML copiat din `src/posts/alege-distributia.md`
- Capitolul practic: `systemd-analyze` și `systemd-analyze blame` în bloc ```bash``` (barierele trebuie închise!)
- Termeni **noi** folosiți (pentru Task 2): `POST`, `udev`, `journald`, `D-Bus`, `display manager (GDM/LightDM/SDDM)`, `țintă systemd`, `fișier de unitate`, `sesiune de utilizator`, `systemd-analyze`
- Lungime țintă: 1800–2200 cuvinte

- [ ] **Step 1: Generează coperta**

Run: `npm run cover:titlu -- cover-procesul-bootare "Procesul" "de bootare"`
Expected: `→ cover-procesul-bootare (webp + jpg)`

- [ ] **Step 2: Verifică că ambele fișiere există**

Run: `ls -la src/assets/img/cover-procesul-bootare.webp src/assets/img/cover-procesul-bootare.jpg`
Expected: două fișiere listate, fiecare ~zeci de KB (nu 0)

- [ ] **Step 3: Scrie articolul `src/posts/procesul-de-bootare-linux.md`**

Frontmatter exact conform deciziilor de mai sus (cu `cover.webp`, `cover.jpg`, `cover.alt: "Diagramă cu etapele procesului de bootare Linux"`), corpul de 1800–2200 cuvinte, structura `##` fixată, linkuri interne, callout-uri, bariere de cod închise. Transcriptul sursă: `/tmp/opencode/transcript-boot.txt` (referință, nu se copiază).

- [ ] **Step 4: Verifică regula de suprapunere cu Harta Linux**

Run: `grep -c "^## " src/posts/procesul-de-bootare-linux.md`
Expected: `≥ 14`

Run: `grep -c "/blog/harta-linux/" src/posts/procesul-de-bootare-linux.md`
Expected: `≥ 5` (secțiunile 5, 6, 7, 9, 12 trimit la Hartă, nu o reiau)

- [ ] **Step 5: Rulează lint-ul articolelor**

Run: `npm run articol`
Expected: `Articole verificate: 27`, **0 erori**; avertismentul „doar N titluri ##" NU trebuie să apară pentru noul articol

- [ ] **Step 6: Commit**

```bash
git add src/posts/procesul-de-bootare-linux.md src/assets/img/cover-procesul-bootare.webp src/assets/img/cover-procesul-bootare.jpg
git commit -m "Articol nou: Procesul de bootare Linux (Initiere)"
```

---

### Task 2: Cei 9 termeni noi în Glosar + indexul alfabetic

**Files:**
- Modify: `src/posts/glosar-linux.md` (capitolele indicate + indexul de la rândul ~669)

**Interfaces:**
- Consumă: articolul din Task 1 (linkurile din definiții duc spre `/blog/procesul-de-bootare-linux/`).
- Produce: 9 id-uri de ancoră noi — verificate explicit în Step 3.

**Plasament (fixat):**

| # | id | Termen (bold) | Plasare |
|---|----|---------------|---------|
| 1 | `post` | `POST (Power-On Self-Test)` | după **firmware**, cap. „Pornire, firmware și bootloader" |
| 2 | `tinta-systemd` | `Țintă systemd (target)` | după **systemd**, cap. „Sistem de operare, kernel..." |
| 3 | `unit-file` | `Fișier de unitate systemd (unit file)` | după `tinta-systemd` |
| 4 | `display-manager` | `Display manager (GDM, LightDM, SDDM)` | după **Mediu desktop**, cap. „Mediul desktop" |
| 5 | `sesiune` | `Sesiune de utilizator` | după `display-manager` |
| 6 | `udev` | `udev (managerul de dispozitive)` | după **Driver**, cap. „Hardware și drivere" |
| 7 | `journald` | `journald (jurnalul sistemului)` | după **Jurnal (log)**, cap. „Siguranță, backup și recuperare" |
| 8 | `systemd-analyze` | `systemd-analyze` | după **Comenzi de sistem**, cap. „Terminal și comenzi" |
| 9 | `dbus` | `D-Bus (magistrala de mesaje)` | după **Container**, cap. „Tehnologii și web" |

Formatul fiecărei intrări (identic cu restul glosarului):

```markdown
<a id="post"></a>

**POST (Power-On Self-Test)** — verificarea pe care o face firmware-ul imediat ce apesi butonul: memoria, procesorul, tastatura, monitorul. Dacă trece, caută de unde să pornească; dacă nu, auzi beep codes sau vezi mesaje de eroare. Explicat pe larg în [Procesul de bootare Linux](/blog/procesul-de-bootare-linux/).
```

Definițiile: 1–3 fraze pe înțelesul începătorului + link spre `/blog/procesul-de-bootare-linux/`; unde există termen înrudid în glosar, se leagă și spre el (ex. `systemd`, `driver`, `jurnal`).

**Indexul alfabetic** — se adaugă în rândurile de literă existente, în ordine alfabetică (case-insensitive):
`D` — D-Bus (magistrala de mesaje), Display manager (GDM, LightDM, SDDM) · `F` — Fișier de unitate systemd (unit file) · `J` — journald (jurnalul sistemului) · `P` — POST (Power-On Self-Test) · `S` — Sesiune de utilizator, systemd-analyze · `T` — Țintă systemd (target) · `U` — udev (managerul de dispozitive).
Iar textul „Toți cei **148** de termeni" → „Toți cei **157** de termeni".

- [ ] **Step 1: Adaugă cele 9 intrări în capitole**

Conform tabelului de plasament, cu formatul dat, fiecare cu `<a id>` + `**Termen** — definiție` + link `/blog/procesul-de-bootare-linux/`.

- [ ] **Step 2: Actualizează indexul alfabetic (9 rânduri + numărul 157)**

- [ ] **Step 3: Verifică ancorele și numărul**

Run: `grep -o '<a id="[a-z0-9-]*"' src/posts/glosar-linux.md | sort | uniq -d`
Expected: **fără ieșire** (fără ancore duplicate)

Run: `for id in post tinta-systemd unit-file display-manager sesiune udev journald systemd-analyze dbus; do grep -q "<a id=\"$id\"" src/posts/glosar-linux.md || echo "LIPSEȘTE $id"; done`
Expected: **fără ieșire** (toate cele 9 există)

Run: `grep -c '<a id=' src/posts/glosar-linux.md` → `157`; `grep -n "cei 148" src/posts/glosar-linux.md` → **fără ieșire**

Run: `grep -o '](#[a-z0-9-]*)' src/posts/glosar-linux.md | sed 's/](#//;s/)//' | sort -u | while read a; do grep -q "<a id=\"$a\"" src/posts/glosar-linux.md || echo "ancoră moartă: $a"; done`
Expected: **fără ieșire** (fiecare link de index are ancoră; titlurile generate automat de `markdown-it-anchor` — ex. `#index-alfabetic` — se exclud manual dacă apar)

- [ ] **Step 4: Rulează lint-ul**

Run: `npm run articol`
Expected: 0 erori

- [ ] **Step 5: Commit**

```bash
git add src/posts/glosar-linux.md
git commit -m "Glosar: 9 termeni noi din Procesul de bootare (157 in total)"
```

---

### Task 3: Verificare completă + publicare

**Files:**
- Modify: doar dacă verificarea raportează probleme (repară în fișierele din Task 1/2)

**Interfaces:**
- Consumă: Task 1 + Task 2.

- [ ] **Step 1: Build + verificări complete**

Run: `npm run verify`
Expected: `Broken internal links/assets → none`, `Content markers → none`, `Articole verificate: 27`, HTML structurat OK, exit 0

- [ ] **Step 2: Verifică articolul în build**

Run: `ls dist/blog/procesul-de-bootare-linux/index.html && grep -c "post-toc" dist/blog/procesul-de-bootare-linux/index.html && grep -c "procesul-de-bootare" dist/blog/index.html`
Expected: fișier existent; `post-toc` ≥ 3 (cuprinsul se afișează de la 3 titluri `##`); articolul apare pe pagina blogului (≥ 1)

- [ ] **Step 3: Commit + push + verificare live**

```bash
git add -A
git commit -m "corecturi dupa verify"   # doar dacă au fost reparații; altfel se sare
git push origin main
```

Apoi: `sleep 80` și `curl -s -o /dev/null -w "%{http_code}" https://elevation75.github.io/blog/procesul-de-bootare-linux/`
Expected: `200`
