---
title: "Ghid de instalare Pop!_OS: pas cu pas (cu desktop COSMIC)"
description: "Instalezi Pop!_OS 24.04 LTS de la zero: ce imagine alegi (generic sau NVIDIA), verificarea checksum-ului, Secure Boot, stick-ul cu Etcher, fiecare ecran al instalatorului, criptarea discului și primii pași — plus un avertisment cinstit despre tânărul desktop COSMIC."
date: 2026-10-01
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-popos.webp
  jpg: /assets/img/cover-popos.jpg
  alt: "Ilustrație cu titlul ghidului de instalare Pop!_OS"
---

Pop!_OS este distribuția creată de **System76**, producătorul american de laptopuri și calculatoare care vine direct cu Linux instalat. Este bazată pe Ubuntu, nu are reclame, nu are Snap, vine cu drivere NVIDIA integrate și este foarte apreciată pentru plăcile video **hibride** (intel + NVIDIA), pentru gaming și pentru șasiile System76.

Versiunea curentă este **Pop!_OS 24.04 LTS**, lansată pe 11 decembrie 2025. Este prima care folosește **COSMIC** — mediul desktop scris de System76 în Rust, în locul GNOME-ului folosit până acum.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">CITEȘTE ÎNAINTE: desktopul COSMIC este încă tânăr</p>
    <p><strong>Sistemul</strong> este solid: bază Ubuntu 24.04 LTS, kernel 7.0.9, actualizări de securitate până în 2029. <strong>Interfața</strong> este însă la început de drum — prima versiune stabilă (COSMIC Epoch 1) a ieșit în decembrie 2025, deci la data scrierii are mai puțin de un an. System76 recunoaște oficial în notele de lansare că lipsuri există: touch-ul nu e optimizat, anumite taste de comutare a afișajului încă nu merg, iar aplicațiile COSMIC nu au toate funcțiunile omoloage din GNOME. Se actualizează continuu și evoluează vizibil de la o lună la alta, dar <strong>nu se compară încă la maturitate cu Cinnamon sau GNOME</strong>. Dacă vrei ceva complet copt astăzi, uită-te întâi la [Ghidul de instalare Linux Mint](/blog/ghid-instalare-linux-mint/) sau la [cel de Ubuntu](/blog/cum-instalezi-ubuntu/). Dacă Pop!_OS îți place pentru NVIDIA, tiling și sistemul în sine, ghidul de mai jos e pentru tine — doar ține minte că desktopul se va schimba în bine, prin actualizări.</p>
  </div>
</div>

Dacă încă nu ești sigur că Pop!_OS e alegerea ta, [Ghidul complet de instalare Linux](/blog/alege-distributia/) te ajută să compari distribuțiile, iar [Un ocean de distribuții](/blog/un-ocean-de-distributii/) îți arată cu ce se deosebește Pop!_OS de restul.

## Cerințe minime

- **Procesor:** pe 64 de biți (x86). Există imagini și pentru **ARM64** — Raspberry Pi 4, Thelio Astra sau dispozitive cu Tow-Boot.
- **Memorie RAM:** 4 GB minimum (8 GB recomandați)
- **Spațiu pe disc:** minimum 20 GB
- **Stick USB:** 8 GB, care va fi șters complet
- **Secure Boot: dezactivat** — obligatoriu, vezi Pasul 4

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Secure Bootul blochează instalarea</p>
    <p>Pagina de download scrie negru pe alb: <strong>„Disable Secure Boot in your BIOS to install Pop!_OS”</strong>. Se dezactivează din BIOS (vezi Pasul 4) și, spre deosebire de Ubuntu sau Mint, aici nu există scurtătură.</p>
  </div>
</div>

## Pasul 1: Alege imaginea ISO potrivită

Intră pe **system76.com/pop/download/**. Sunt patru imagini, dar pentru un calculator obișnuit te interesează două:

| Imagine | Pentru ce calculatoare |
|---|---|
| **Pop!_OS 24.04 LTS** (generic) | plăci video Intel sau AMD, **sau NVIDIA seria 10 și mai veche** (ex. GTX 1060 și anterioare) |
| **Pop!_OS 24.04 LTS with NVIDIA** | plăci **NVIDIA seria 16 și mai nouă** (GTX 16xx până la RTX 6xxx) |

Celelalte două sunt pentru **ARM** (Raspberry Pi 4, Thelio Astra) — nu pentru calculatoare obișnuite.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Ce placă video ai?</p>
    <p>Pe Windows: <code>Win + R</code> → <code>dxdiag</code> → tabul <em>Display</em>. Pe Linux: <code>lspci | grep -i vga</code>. Dacă ai un laptop cu două plăci (Intel/AMD + NVIDIA), ia ISO-ul potrivit plăcii tale: <strong>seria 16 sau mai nouă → ISO-ul NVIDIA</strong>, <strong>seria 10 sau mai veche → ISO-ul generic</strong>.</p>
  </div>
</div>

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Ai nevoie de GNOME, nu de COSMIC?</p>
    <p>În secțiunea <strong>Previous Releases</strong> de pe aceeași pagină mai găsești <strong>Pop!_OS 22.04 LTS</strong>, cu interfața GNOME clasică, matură. E o variantă mai veche (bază Ubuntu 22.04, suport mai scurt), dar funcțională dacă vrei Pop!_OS fără surprize de interfață.</p>
  </div>
</div>

## Pasul 2: Verifică checksum-ul

Pe pagina de download, sub fiecare imagine, găsești **SHA256 Sum**. Deschide un terminal în dosarul cu ISO și compară:

**Linux:**

```bash
sha256sum Downloads/pop-os_*.iso
```

**macOS:**

```bash
shasum -a 256 ~/Downloads/pop-os_*.iso
```

**Windows (Command Prompt):**

```cmd
CertUtil -hashfile Downloads\pop-os_*.iso SHA256
```

{% image "pop-checksum", "Ieșirea în terminal a comenzii sha256sum pentru imaginea Pop!_OS", "Blocul de litere și cifre de sub numele fișierului trebuie să corespundă exact cu cel de pe pagina de download." %}

Dacă sumele nu se potriveșc, fișierul s-a stricat pe drum — **descarcă-l din nou** înainte de a merge mai departe.

## Pasul 3: Creează stick-ul bootabil

### Pe Windows sau macOS: Etcher

1. Descarcă **Etcher** de pe `etcher.balena.io` și deschide-l.
2. **Flash from file** → alege fișierul `.iso`.
3. **Select target** → stick-ul tău USB.

{% image "pop-etcher", "Interfața Etcher cu butonul Select target apasat", "Alegi fișierul ISO, apoi ținta pe care scrii imaginea." %}

4. **Flash!** și așteaptă să termine.

{% image "pop-etcher-drive", "Etcher cu stick-ul USB bifat ca țintă", "Se arată implicit doar dispozitivele detașabile — verifică bine că e stickul tău." %}

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Etcher trimite statistici de utilizare</p>
    <p>După cum scriu chiar dezvoltatorii, Etcher colectează implicit statistici. Se oprește din <strong>Settings</strong> → <em>Enable anonymized usage data</em>.</p>
  </div>
</div>

### Pe Linux: aplicația Diskuri

Apasă tasta Super, scrie **diskuri** și deschide aplicația. Selectează stick-ul din lista din stânga, dă clic pe cele trei puncte (**⋮**) din dreapta sus → **Restore Disk Image…** → alege ISO-ul → **Start Restoring…**.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Stickul va fi șters</p>
    <p>Toate datele de pe stick dispar. Dacă vrei mai multe sisteme pe același stick, în loc de Etcher folosește <a href="/blog/utilizare-ventoy/">Ventoy</a> — copiezi ISO-urile ca pe niște fișiere simple.</p>
  </div>
</div>

## Pasul 4: Dezactivează Secure Boot și pornește de pe stick

1. Introdu stick-ul și repornește calculatorul.
2. Intră în BIOS/UEFI ca să **dezactivezi Secure Boot**. De obicei ții apăsat **F2** sau **Del** la pornire; meniul diferă după producător, dar opțiunea se află aproape întotdeauna la *Boot* sau *Security*.
3. Ieși cu **F10** (Save & Exit) și, la următoarea pornire, deschide **meniul de dispozitive de boot**.

| Sistem | Tasta BIOS | Tasta meniu de boot |
|---|---|---|
| Laptop System76 (firmware deschis) | Esc | Esc |
| Laptop System76 (firmware standard) | F2 | F7 |
| Laptopuri mai vechi | diferă | F1 |
| Calculatoare de birou (obisnuit) | F2 / Del | F12 / F8 / F10 |

{% image "pop-boot-menu", "Meniul de alegere a dispozitivului de boot", "Cu săgețile selectezi stick-ul USB și apeși Enter." %}

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pe Windows: dezactivează și Fast Startup</p>
    <p>Dacă vrei dual boot cu Windows, dezactivează <strong>Fast Startup</strong> din Control Panel → Power Options. În plus, nu uita să faci o copie de siguranță a datelor înainte de orice modificare a discului.</p>
  </div>
</div>

## Pasul 5: Sesiunea live — testează înainte să instalezi

Pop!_OS pornește direct într-un mediu live complet, de unde poți deschide instalatorul. Testează **Wi-Fi-ul, sunetul, ecranul, tastatura și touchpad-ul** — dacă ceva nu merge aici, nu va merge nici după instalare.

{% image "pop-live", "Desktopul Pop!_OS în sesiunea live, cu instalatorul deschis", "Mediul live: același desktop pe care îl vei avea după instalare." %}

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Vrei doar să încerci?</p>
    <p>În primul ecran al instalatorului există opțiunea <strong>Try Demo Mode</strong>: rămâi în mediul live fără să atingi vreun disc. Nimic nu se salvează la repornire.</p>
  </div>
</div>

## Pasul 6: Limba, localizarea și tastatura

Instalatorul te întreabă patru lucruri, în ordine:

1. **Limba** interfeței.

{% image "pop-lang", "Primul ecran al instalatorului Pop!_OS, alegerea limbii", "Alegi limba în care va fi instalatorul." %}

2. **Localizarea** — regiunea și fusul orar (alege **Romania**, dacă ești în țară).

{% image "pop-locale", "Ecranul de selecție a localizării din instalatorul Pop!_OS", "Localizarea setează fusul orar și formatele de dată și monedă." %}

3. **Limba de intrare a tastaturii.**
4. **Layout-ul tastaturii.**

{% image "pop-keyboard", "Ecranul de selecție a layout-ului tastaturii", "Poți testa tastele în caseta de test înainte de a continua." %}

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Tastatură românească?</p>
    <p>Pentru literele cu diacritice alege layout-ul <strong>Romanian</strong> sau <strong>English (US) with Romanian symbols</strong>, în funcție de ce preferi. Poți schimba oricând mai târziu din Setări.</p>
  </div>
</div>

## Pasul 7: Tipul de instalare

{% image "pop-clean-install", "Ecranul Clean Install din instalatorul Pop!_OS", "Clean Install pentru instalare curată, Try Demo Mode pentru testat, Custom (Advanced) pentru avansați." %}

Ai trei opțiuni:

- **Clean Install** — instalează pe discul ales, **ștergând tot ce e pe el**. Este varianta corectă pentru majoritatea, inclusiv dacă ești la prima instalare.
- **Try Demo Mode** — te întoarce în mediul live, fără instalare.
- **Custom (Advanced)** — deschide **GParted**, unde configurezi partițiile manual: dual boot cu Windows, partiție separată `/home`, `/tmp` pe alt disc șamd.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Dual boot-ul se face din Custom</p>
    <p>Instalatorul Pop!_OS nu oferă o opțiune „instalează alături de Windows” ca la Ubuntu. Pentru dual boot intri în <strong>Custom (Advanced)</strong> și lași spațiu liber pe care îl folosești pentru Pop!_OS — sau, mai simplu, dezactivezi Fast Startup din Windows, reduci partiția din Disk Management și aloci spațiul nealocat.</p>
  </div>
</div>

## Pasul 8: Erase and Install

După ce ai ales unitatea, apeși **Erase and Install**. De aici, Pop!_OS face totul singur: creează partițiile, copiază sistemul și instalează bootloader-ul.

{% image "pop-erase", "Ecranul Erase and Install din instalatorul Pop!_OS", "Alege discul corect — conținutul lui va fi șters complet." %}

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Verifică discul înainte de Erase</p>
    <p>Dacă ai mai multe discuri în calculator, asigură-te că ai selectat unitatea corectă. Datele de pe unitatea aleasă nu mai pot fi recuperate după această etapă.</p>
  </div>
</div>

## Pasul 9: Contul de utilizator

Instalatorul îți cere numele complet și numele de utilizator, apoi parola.

{% image "pop-username", "Ecranul de completare a numelui de utilizator", "Numele complet poate conține orice; numele de utilizator trebuie să fie cu litere mici." %}

- **Full name** — poate fi orice, cu majuscule sau fără. Apare doar pe ecranul de autentificare.
- **Username** — **obligatoriu cu litere mici**, fără spații și fără diacritice. Cu acesta te loghezi.

{% image "pop-password", "Ecranul de setare a parolei în instalatorul Pop!_OS", "O parolă puternică, ținută minte — o vei folosi la fiecare autentificare." %}

## Pasul 10: Criptarea discului (opțională)

Pop!_OS îți oferă criptare completă a discului din instalator — singura distribuție care ți-o pune la îndemână fără pași suplimentari:

{% image "pop-encrypt", "Opțiunea de criptare a discului din instalatorul Pop!_OS", "Aceeași parolă cu a contului, o parolă separată, sau fără criptare." %}

- **Encryption password is the same as user account password** — cea mai comodă: o singură parolă.
- **Set Password** — parolă separată, cerută la **fiecare pornire** a calculatorului.
- **Don't Encrypt** — nu criptezi nimic.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Criptarea nu e obligatorie</p>
    <p>Ea protejează datele doar în situația în care cineva îți fură calculatorul. Dacă alegi criptare, ține minte parola: <strong>fără ea, datele sunt irecuperabile</strong>. Pe un laptop care pleacă cu tine în ghiozdan, merită.</p>
  </div>
</div>

## Pasul 11: Instalarea și prima repornire

{% image "pop-progress", "Bara de progres a instalării Pop!_OS", "Instalarea durează de obicei între 5 și 15 minute." %}

Când se termină, apeși **Restart**. Momentul important:

{% image "pop-complete", "Mesajul de instalare reușită din instalatorul Pop!_OS", "Scoate stick-ul USB înainte de a porni din nou." %}

1. **Oprește complet** calculatorul (nu doar repornește) și **scoate stick-ul**.
2. Dacă ai schimbat ordinea de boot pentru stick, intră din nou în BIOS și pune **discul cu Pop!_OS** pe primul loc.
3. La dual boot, selectează unitatea din meniul de boot atunci când ți se cere.

## Prima pornire: configurarea inițială COSMIC

Dacă ai criptat discul, întâi se cere **parola de decriptare**, apoi apare **COSMIC Greeter**, ecranul de autentificare.

{% image "pop-greeter", "Ecranul de autentificare COSMIC Greeter al Pop!_OS", "Sub dată ai scurtături pentru accesibilitate, tastatură, sesiune, repornire și oprire." %}

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">La prima autentificare, cititorul de ecran e pornit</p>
    <p>Asta e intenționat, ca accesibilitate — dar poate fi alarmant dacă telefonul calculatorului. <strong>Opriți-l din comutatorul din dreapta</strong> (sau apasă tastele de dezactivare), înainte de a apăsa <em>Next</em>. Poți seta și dimensiunea interfeței, lupa, contrastul ridicat sau culorile inversate în aceeași pagină.</p>
  </div>
</div>

{% image "pop-setup-access", "Prima pagină a configurării inițiale: cititor de ecran, dimensiune interfață, lupă", "Comutatorul Screen reader din dreapta dezactivează vocea — fă asta întâi." %}

Urmează câțiva pași simpli:

1. **Personalizează** — alege tema (COSMIC Dark, COSMIC Light, Comet Light, Cream Light, Mocha Dark, Nebula Dark). Se poate schimba oricând din Setări.

{% image "pop-setup-appearance", "Fereastra de personalizare a aspectului din configurarea inițială", "Șase teme prestabilite; accentele și culorile se ajustează ulterior." %}

2. **Alege aranjamentul** — *Top Panel & Bottom Dock* (ca mai sus) sau *Bottom Panel*; le poți muta pe orice margine după aceea.

{% image "pop-setup-layout", "Alegerea aranjamentului panoului și a dock-ului", "Poți schimba oricând poziția și dimensiunea din Setări." %}

3. **Paginile informative** — despre spațiile de lucru, comenzile rapide (de ex. `Shift + Super + săgeți` pentru ferestre) și Launcher-ul (tasta **Super**). Apasă **Next** la fiecare, sau **Skip setup and close** dacă vrei direct desktopul.

{% image "pop-desktop", "Desktopul Pop!_OS după finalizarea configurării inițiale", "Gata: ai ajuns pe desktopul COSMIC al lui Pop!_OS." %}

## Ce faci după instalare

### 1. Actualizează sistemul

Din terminal:

```bash
sudo apt update
sudo apt upgrade
```

sau din **COSMIC Store** (aplicația de magazine care a înlocuit Pop!_Shop) — acolo găsești și aplicațiile din **Flathub**.

### 2. Driverele NVIDIA, dacă ai instalat de pe ISO-ul generic

Dacă ai folosit imaginea **Intel/AMD** pe un calculator cu placă NVIDIA (sau ai adăugat una mai târziu), instalează driverul oficial System76:

```bash
sudo apt install system76-driver-nvidia
```

Repornește după instalare. Dacă ai luat ISO-ul NVIDIA de la început, nimic de făcut aici.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Setări, personalizare, tiling</p>
    <p>Din iconița de setări din dock deschizi <strong>COSMIC Settings</strong>: aspect, panou, dock, gestionarea ferestrelor și spațiile de lucru. Tiling-ul automat se comută din aplicația de pe panou, iar la prima utilizare e bine să-l încerci o zi — dacă nu-ți place, se dezactivează dintr-un clic.</p>
  </div>
</div>

## COSMIC: dacă te lovești de lipsuri

Desktopul e tânăr, dar nu e abandonat — dimpotrivă. Ce e de făcut:

- **Actualizează des.** COSMIC primește funcții noi prin actualizări continue, nu doar la versiuni mari.
- **Urmărește planul de dezvoltare:** System76 ține un panou public cu funcțiile COSMIC în lucru (secțiunea *project board* din notele de lansare).
- **Ai nevoie de ceva matur acum?** Ia Pop!_OS **22.04 LTS** (secțiunea *Previous Releases*) cu GNOME, sau alege [Linux Mint](/blog/ghid-instalare-linux-mint/) ori [Ubuntu](/blog/cum-instalezi-ubuntu/) — ghiduri pentru ele ai deja pe blog.
- **Nu judeca distribuția după desktop.** Sistemul de bază (Ubuntu LTS + kernel 7.0.9 + drivere NVIDIA 585) e la fel de solid ca la orice altă distribuție.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">De ce merită să stai cu el</p>
    <p>Pop!_OS rămâne una dintre puținele distribuții care rezolvă elegant grafica hibridă NVIDIA, are tiling nativ fără extensii și vine de la un producător care își finanțează dezvoltarea din hardware. Dacă acestea contează pentru tine, diferența de maturitate a interfeței se estompează de la o actualizare la alta.</p>
  </div>
</div>

## Probleme frecvente

- **Instalatorul nu pornește sau apare un mesaj despre Secure Boot:** intră în BIOS și **dezactivează Secure Boot** — e obligatoriu la Pop!_OS.
- **Stick-ul nu apare în meniul de boot:** alt port USB (ideal cele din spate), dezactivează Fast Startup din Windows, verifică ordinea de boot în BIOS.
- **Checksum-ul nu se potrivește:** imaginea s-a stricat; descarc-o din nou.
- **Placa video NVIDIA nu funcționează bine:** confirmă că ai luat **ISO-ul NVIDIA** pentru seria 16 și mai nouă, sau instalează `system76-driver-nvidia` după instalare.
- **Se aude voce la prima logare:** e cititorul de ecran pornit implicit — oprește-l din comutatorul din dreapta al ecranului de configurare.
- **Windows nu mai apare în meniul de pornire:** la dual boot, intră în BIOS și asigură-te că ambele unități sunt vizibile; Pop!_OS folosește un meniu de pornire propriu, nu GRUB.

## Concluzie

Pop!_OS se instalează în circa 15 minute: alegi imaginea, verifici checksum-ul, dezactivezi Secure Boot, scrii stick-ul și urmezi unsprezece pași simpli. Sistemul e rapid, curat și gata de gaming sau de muncă — iar desktopul COSMIC, deși tânăr, se maturizează vizibil de la o actualizare la alta.

Ca să mergi mai departe: [Ghidul de instalare Linux Mint](/blog/ghid-instalare-linux-mint/) dacă vrei ceva mai copt azi, [Ghidul de instalare Fedora](/blog/ghid-instalare-fedora/) pentru software foarte recent, [DE-uri sau WM-uri](/blog/de-sau-wm/) dacă vrei să înțelegi mai bine mediile desktop, iar [stick-ul multiboot cu Ventoy](/blog/utilizare-ventoy/) ca să ții mai multe distribuții pe același stick.

<em>Ghid adaptat (tradus și rescris) după documentația oficială de suport System76 — <a href="https://system76.com/support/install-pop/">Installing Pop!_OS</a> și <a href="https://system76.com/support/live-disk/">Live Disk Creation</a> — licențiată sub <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Capturile de ecran din acest articol provin din aceeași documentație și sunt preluate sub aceeași licență. Pop!_OS și COSMIC sunt mărci ale System76.</em>
