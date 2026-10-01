---
title: "Ghid de instalare Zorin OS: pas cu pas (cel mai prietenos cu Windows)"
description: "Instalezi Zorin OS 18.1 de la zero: ce ediție alegi (Core, Lite, Education, Pro), stick-ul cu Etcher, meniul de boot cu opțiunea NVIDIA, fiecare ecran al instalatorului, dual boot cu Windows și primii pași — plus răspunsul cinstit la întrebarea „nu e doar Ubuntu?”."
date: 2026-10-01
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-zorin.webp
  jpg: /assets/img/cover-zorin.jpg
  alt: "Captură oficială cu desktopul Zorin OS"
---

Zorin OS este distribuția făcută în **Irlanda** de Zorin Technology Group, gândită de la început pentru omul care vine de pe Windows: interfața imită Windows, iar cu unealta **Zorin Appearance** schimbi layoutul desktopului în câteva secunde — arată ca Windows 11, ca Windows-ul clasic, ca macOS sau ca ChromeOS.

Versiunea curentă este **Zorin OS 18.1**, lansată pe 15 aprilie 2026. Are la bază **Ubuntu 24.04 LTS**, kernel 6.17 și primește actualizări de securitate **până la 1 iunie 2029**.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">„Păi nu e doar Ubuntu?” — da, și nu prea</p>
    <p><strong>Da, baza e Ubuntu.</strong> La fel ca Linux Mint, ca Pop!_OS sau ca elementary — din aceeași familie Debian. Asta înseamnă aceleași depozite de programe, aceleași soluții la probleme și același instalator de pachete <code>.deb</code>.</p>
    <p><strong>Ce e al lui Zorin:</strong> propriul desktop (Zorin Desktop, o ramură a GNOME), <strong>Zorin Appearance</strong> cu 4 layouturi în ediția Core (12 în Pro), magazin de aplicații propriu care merge pe <strong>Flatpak/Flathub</strong>, <strong>Zorin Connect</strong> (telefon legat de calculator), <strong>fără pachete Snap preinstalate</strong>, edițiile Lite și Education, opțiunea <em>„modern NVIDIA drivers”</em> chiar în meniul de boot și documentație proprie.</p>
    <p><strong>Ce e de reținut:</strong> baza e mai veche decât ce scoate Ubuntu acum (Zorin 19 abia spre finalul lui 2027), deci programele foarte noi întârzie; comunitatea e mai mică decât a lui Mint; ediția Pro e plătită. E, practic, <strong>Ubuntu pus în formă pentru omul care vine de pe Windows</strong> — și tocmai asta e rolul lui.</p>
  </div>
</div>

Dacă încă nu ești sigur că Zorin e alegerea ta, [Ghidul complet de instalare Linux](/blog/alege-distributia/) compară distribuțiile, iar [Un ocean de distribuții](/blog/un-ocean-de-distributii/) îți arată de unde vine Zorin și cu ce se deosebește de Ubuntu.

## Ce ediție alegi?

| Ediție | Preț | Pentru cine |
|---|---|---|
| **Core** | gratuit | **recomandată pentru tine** — desktopul complet, 4 layouturi, 15 GB spațiu |
| **Lite** | gratuit | calculatoare vechi sau slabe (interfață ușoară, se descarcă separat) |
| **Education** | gratuit | școli și elevi — programe educaționale, 35 GB spațiu |
| **Pro** | plătic | 12 layouturi, suite creative, suport tehnic, 45 GB spațiu |

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Vrei să încerci Pro înainte să-l cumperi?</p>
    <p>Există <strong>trial gratuit</strong> al ediției Pro (pagina „Free Trial of Zorin OS Pro” din ajutorul oficial). Dar pentru ghidul de mai jos îți trebuie doar <strong>Core</strong> — e completă și gratuită.</p>
  </div>
</div>

## Cerințe minime

- **Procesor:** 1 GHz dual-core, pe 64 de biți (Intel/AMD)
- **Memorie RAM:** 2 GB minimum (cu 4 GB e mult mai comod)
- **Spațiu pe disc:** 15 GB pentru Core (35 GB Education, 45 GB Pro)
- **Ecran:** 800 × 600 sau mai bun
- **Stick USB:** 4 GB pentru Core/Lite, 16 GB pentru Pro/Education
- **Backup:** un disc extern sau spațiu în cloud pentru fișierele tale

Compatibilitate, pe scurt, din documentația oficială: **Mac cu procesor Intel** — da (cele cu cip T2 cer pași în plus); **Mac pe Apple silicon** — nu nativ (merge în mașină virtuală, cu UTM); **Surface cu ARM** (Snapdragon) — nu; **Chromebook** — parțial, în funcție de model; **Raspberry Pi** — nu există încă o versiune.

## Pasul 1: Descarcă imaginea ISO

Intră pe **zorin.com/os/download**. Ferestrele care apar sunt pentru newsletter — le poți închide cu *Skip to download*. Alege **Zorin OS Core** (butonul *Download*), iar fișierul `.iso` rămâne în dosarul *Downloads*.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Ai un calculator vechi?</p>
    <p>Ia în calcul ediția <strong>Lite</strong> — se descarcă dintr-un loc separat („Getting Zorin OS Lite” din ajutorul oficial) și e făcută special pentru hardware modest.</p>
  </div>
</div>

## Pasul 2: Creează stick-ul bootabil

Cel mai simplu este cu **Etcher** (`etcher.balena.io`), disponibil pe Windows, macOS și Linux:

1. Instalează și deschide Etcher.
2. Apasă **Flash from file** și alege fișierul `.iso` Zorin.

{% image "zorin-etcher", "Etcher cu butonul Flash from file", "Alegi mai întâi fișierul ISO descărcat." %}

3. Apasă **Select target** și bifează stick-ul tău USB.

{% image "zorin-etcher-target", "Etcher cu lista de dispozitive țintă", "Verifică bine că ai bifat stick-ul, nu alt disc." %}

4. Apasă **Flash!** și așteaptă câteva minute până se termină.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Tot conținutul stickului va fi șters</p>
    <p>Folosește un stick gol sau copiază-ți de pe el ce ai nevoie. Dacă vrei mai multe sisteme pe același stick, în loc de Etcher folosește <a href="/blog/utilizare-ventoy/">Ventoy</a> — copiezi ISO-urile ca pe niște fișiere simple.</p>
  </div>
</div>

În loc de Etcher mai poți folosi **Rufus** (Windows), **USBImager**, **Popsicle** (Linux) sau **EtchDroid** (Android) — sunt alternativele recomandate chiar de Zorin.

## Pasul 3: Pornește de pe stick

1. **Oprire completă** a calculatorului (nu repornire, nu somn).
2. Introdu stick-ul și pornește calculatorul. Imediat apasă **repetat** tasta de meniu de boot:

| Sistem | Tasta |
|---|---|
| Calculatoare de birou (obisnuit) | **F12**, uneori **F8** sau **F10** |
| Laptopuri | **Esc**, **F2** sau **F12** (diferă după producător) |
| Intrare în BIOS/UEFI | **Del** sau **F2** |
| Mac | ține apăsat **⌥ Option** la pornire |

3. Din meniul dispozitivelor de boot, alege unitatea pe care scrie „USB”, „EFI” sau numele stick-ului și apasă Enter.

Apoi apare meniul Zorin OS:

{% image "zorin-boot-menu", "Meniul de boot Zorin OS cu opțiunea Try or Install", "Prima opțiune instalează sau pornește în modul live; a doua aduce driverele NVIDIA moderne." %}

4. Alege **„Try or Install Zorin OS”** cu Enter.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Ai placă video NVIDIA mai nouă (după 2013)?</p>
    <p>Alege varianta <strong>„Try or Install Zorin OS (modern NVIDIA drivers)”</strong> — pornește cu driverele proprietare instalate. Pentru ca driverele NVIDIA să meargă deplin, va trebui să <strong>dezactivezi Secure Boot</strong> din BIOS, exact ca la Pop!_OS.</p>
  </div>
</div>

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Prima oară, lasă verificarea să ruleze</p>
    <p>La prima utilizare a stickului, Zorin verifică automat dacă are defecte. Recomandarea oficială e să <strong>n-o sarezi</strong>: previne exact acele instalări care pică pe la jumătate din cauza unui stick stricat.</p>
  </div>
</div>

## Pasul 4: Încearcă înainte să instalezi

Zorin pornește într-un mediu live complet, în care poți testa **Wi-Fi-ul, sunetul, ecranul, touchpad-ul și tastatura**, fără să atingi vreun disc. Din instalator poți alege și **„Try Zorin OS”** ca să te plimbi prin interfață înainte de a te decide — doar ține minte că de pe stick rulează mai încet decât instalat.

## Pasul 5: Instalarea, ecran cu ecran

1. Urmează instrucțiunile din fereastră. Dacă butoanele *Continue*/*Back* nu se văd (ecran mic), ține apăsată tasta **Super** și trage fereastra în sus.

{% image "zorin-installer", "Fereastra de instalare Zorin OS", "Instalatorul te ghidează pașnic; poți testa sistemul cu Try Zorin OS." %}

2. Când te întreabă, <strong>conectează-te la internet</strong> — așa descarcă Zorin toate actualizările în timpul instalării.
3. Ajungi la **„Installation type”**. Sunt trei variante:

{% image "zorin-installation-type", "Ecranul Installation type din instalatorul Zorin OS", "Alongside = dual boot, Erase = curăță tot, Something else = partiționare manuală." %}

- **Install Zorin OS alongside…** — păstrezi Windows și faci **dual boot**; următorul ecran îți dă să alegi cât spațiu aloci Zorin.
- **Erase disk and install Zorin OS** — șterge tot discul și instalează Zorin. Pentru începători, e varianta corectă. Din butonul **Advanced features…** poți activa **criptarea discului** și LVM.
- **Something else** — partiționare manuală, pentru configurații ciudate (mai multe discuri).

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Verifică discul înainte de Erase</p>
    <p>Dacă ai mai multe discuri, asigură-te că ai ales unitatea corectă — conținutul ei va fi șters. Fă-ți <strong>backup</strong> înainte și, dacă ai Windows pe același calculator, dezactivează <strong>Fast Startup</strong> din Control Panel → Power Options.</p>
  </div>
</div>

La **partiționarea manuală** (varianta *Something else*), procedura oficială e simplă: selectezi spațiul liber, creezi partiția pentru Zorin și lași instalatorul să scrie modificările:

{% image "zorin-partition", "Selecția spațiului liber în partiționarea manuală", "Spațiul liber rămas de pe disc devine partiția lui Zorin OS." %}

{% image "zorin-write-changes", "Ecranul Write changes to disks din instalator", "Ultima confirmare înainte ca discul să fie modificat." %}

4. Urmează restul pașilor (fus orar, tastatură, contul tău de utilizator) și așteaptă instalarea.
5. La final, **repornește** și **scoate stick-ul** înainte ca calculatorul să pornească din nou. Dacă ai schimbat ordinea de boot, pune discul cu Zorin pe primul loc în BIOS.

## Prima privire: ce faci după instalare

### 1. Alege layoutul care îți e familiar

Deschide **Zorin Appearance** și treci pe layoutul **Windows 11** (sau Windows clasic, macOS, ChromeOS — 4 în Core, 12 în Pro). Bara de activitate, meniul Start și taskbar-ul se mută instant. Pentru un începător, asta e secunda în care Linux „se simte ca acasă”.

### 2. Actualizează sistemul

Din magazinul **Software** (butonul de actualizări), sau din terminal:

```bash
sudo apt update
sudo apt upgrade
```

Magazinul oferă aplicații din **Flatpak (Flathub)** și pachete `.deb` — și, spre deosebire de Ubuntu, **Zorin nu are Snap preinstalat**.

### 3. Leagă telefonul de calculator

**Zorin Connect** face legătura cu telefonul: notificări pe desktop, trimitere de fișiere, clipboard comun. E inclus în edițiile Core și Pro.

### 4. Placa video NVIDIA

Dacă ai instalat fără opțiunea *modern NVIDIA drivers*, documentația oficială are un ghid pentru activarea driverului NVIDIA (secțiunea *Activate NVIDIA Graphics Card*) — acolo găsești și pașii de dezactivare a Secure Boot.

## Probleme frecvente

- **Stick-ul nu apare în meniul de boot:** alt port USB (ideal cele din spate), dezactivează Fast Startup din Windows, încearcă tastele din tabelul de mai sus.
- **„No Bootable Device” după instalare:** există articol oficial dedicat — de obicei e ordinea de boot sau modul UEFI/Legacy din BIOS.
- **Eroare la instalare:** ai pagina *Error While Installing Zorin OS* cu cauzele cele mai frecvente.
- **Driverele NVIDIA nu merg:** alege la boot varianta *modern NVIDIA drivers* și dezactivează Secure Boot.
- **Ecran prea mic, nu vezi butoanele:** ține apăsat **Super** și trage fereastra în sus — e trucul oficial pentru ecrane sub 768 px.
- **Vrei o versiune mai nouă de programe:** ține minte că baza e Ubuntu 24.04; pentru programe foarte noi, Flatpak-ul din magazin rezolvă de obicei.

## Concluzie

Zorin OS se instalează în circa 15 minute și e probabil cea mai blândă aterizare pentru cine vine de pe Windows: recunoști interfața din prima secundă, iar Zorin Appearance ți-o așază exact cum o știai. Baza e Ubuntu LTS, deci ai stabilitatea și soluțiile cunoscute — cu prețul unei baze ceva mai vechi.

Ca să mergi mai departe: [Linux Mint](/blog/ghid-instalare-linux-mint/) dacă vrei ceva și mai popular în rândul începătorilor, [Ubuntu](/blog/cum-instalezi-ubuntu/) pentru cea mai mare comunitate, [Pop!_OS](/blog/ghid-instalare-popos/) dacă ai plăci video NVIDIA și vrei tiling, iar [stick-ul multiboot cu Ventoy](/blog/utilizare-ventoy/) ca să ții mai multe sisteme pe același stick.

<em>Ghid adaptat (tradus și rescris) după documentația oficială de ajutor Zorin — <a href="https://help.zorin.com/docs/getting-started/install-zorin-os/">Install Zorin OS</a>, <a href="https://help.zorin.com/docs/getting-started/manually-partition-the-drive-to-install-zorin-os/">Manually Partition the Drive</a> și <a href="https://help.zorin.com/docs/getting-started/system-requirements/">System Requirements</a> — licențiată sub <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Capturile de ecran din acest articol provin din aceeași documentație și sunt preluate sub aceeași licență. „ZORIN”, „ZORIN OS” și logoul sunt mărci înregistrate ale Zorin Technology Group Ltd.; folosirea lor aici e editorială și nu implică afiliere, aprobare sau sponsorizare.</em>
