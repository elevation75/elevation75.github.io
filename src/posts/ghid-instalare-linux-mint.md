---
title: "Ghid de instalare Linux Mint: pas cu pas (Cinnamon, MATE și Xfce)"
description: "Instalezi Linux Mint de la zero: cele trei arome explicite, stick-ul bootabil, fiecare ecran al instalatorului și primii pași de după instalare."
date: 2026-09-30
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-linux-mint.webp
  jpg: /assets/img/cover-linux-mint.jpg
  alt: "Ilustrație cu titlul ghidului de instalare Linux Mint"
---

Linux Mint este distribuția pe care ți-o recomandă cel mai des cineva care vrea Linux fără surprize: pornește dintr-un singur fișier ISO, arată familiar din prima secundă și rezistă ani buni fără să ceară reinstalare. Se bazează pe Ubuntu LTS, deci primește actualizări de securitate până în 2029, iar versiunea curentă în momentul scrierii acestui ghid este **Linux Mint 22.3 „Zena”**.

Instalarea durează circa 20 de minute și nu cere cunoștințe tehnice: instalatorul te întreabă doar câteva lucruri, iar **opțiunea implicită este, ca de obicei, alegerea bună**. Mai jos, fiecare pas ecran cu ecran.

Dacă încă nu ești sigur că Mint e alegerea ta, [Ghidul complet de instalare Linux](/blog/alege-distributia/) te ajută să compari distribuțiile, iar [Un ocean de distribuții](/blog/un-ocean-de-distributii/) îți arată cu ce se deosebește Mint de celelalte. Dacă până la urmă alegi altceva, aceleași explicații pas cu pas le găsești la [Ubuntu](/blog/cum-instalezi-ubuntu/) și la [Fedora](/blog/ghid-instalare-fedora/).

## Cele trei arome: Cinnamon, MATE sau Xfce

Linux Mint vine în **trei arome** (flavours). Toate trei sunt același Linux Mint — același sistem, aceleași programe, aceeași menținere — dar cu o **interfață diferită**, numită mediu desktop:

| Aromă | Cum e descrisă oficial | Potrivită pentru |
|---|---|---|
| **Cinnamon** | cea mai modernă, inovatoare și completă | calculatoare obișnuite; dacă vrei „experiența Mint” |
| **MATE** | mai tradițională și mai rapidă | PC-uri mai vechi; dacă vrei ceva familiar |
| **Xfce** | cea mai ușoară | hardware modest; dacă vrei viteză și consum mic |

**Cinnamon** este ediția implicită și cea mai populară. Este dezvoltată chiar de echipa Linux Mint, arată curat și vine cu toate funcțiile. Este și varianta pe care ți-o recomand dacă ești la prima instalare.

{% image "mint-cinnamon", "Desktop-ul Linux Mint cu mediul Cinnamon", "Cinnamon: interfața implicită a Linux Mint, dezvoltată chiar de proiect." %}

**MATE** este continuarea vechiului GNOME 2, pe care Mint l-a folosit între 2006 și 2011. Puține funcțiuni în plus față de Cinnamon, dar mai puține resurse consumate și o viteză simțită pe calculatoare mai slabe.

{% image "mint-mate", "Desktop-ul Linux Mint cu mediul MATE", "MATE: interfața clasică, rapidă, pentru calculatoare mai vechi." %}

**Xfce** este varianta cea mai ușoară: nu are toate funcțiunile lui Cinnamon sau MATE, dar este extrem de stabilă și consumă foarte puțină memorie.

{% image "mint-xfce", "Desktop-ul Linux Mint cu mediul Xfce", "Xfce: cea mai ușoară aromă, ideală pentru hardware modest." %}

Toate trei sunt alegeri excelente — alegerea corectă este cea în care te simți bine. Dacă nu ești sigur, **ia Cinnamon**, apoi încearcă și celelalte când ai timp.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pașii sunt identici la toate cele trei</p>
    <p>Instalatorul, partiționarea și configurarea sunt aceleași indiferent ce aromă alegi. Singura diferență este cum arată desktopul după instalare, deci poți urmări ghidul fără griji cu oricare dintre cele trei.</p>
  </div>
</div>

## 64-bit sau 32-bit?

Din Linux Mint 20 încoace există **doar varianta pe 64 de biți** — procesoarele pe 32 de biți sunt aproape dispărute. Dacă calculatorul tău a fost fabricat **după 2007**, are sigur procesor pe 64 de biți.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Calculator foarte nou și nu pornește?</p>
    <p>Dacă hardware-ul e prea recent și nu e corect detectat, descarcă de pe pagina de download imaginea <strong>Edge</strong> a aceleiași versiuni. Conține un kernel mai nou, care recunoaște componentele apărute după lansarea versiunii standard.</p>
  </div>
</div>

## Cerințe minime

- **Memorie RAM:** 2 GB minimum (4 GB recomandați pentru utilizare comodă)
- **Spațiu pe disc:** 20 GB minimum (100 GB recomandați)
- **Rezoluție:** minim 1024×768
- **Procesor:** pe 64 de biți
- **Stick USB:** 8 GB, care va fi șters complet
- **Conexiune la internet:** pentru descărcare, codecuri și drivere

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Mai mult spațiu înseamnă mai puține griji</p>
    <p>Sistemul ocupă circa 15 GB, dar se umple pe măsură ce instalezi programe, descarcări și poze. Dacă îți permite discul, dă-i 100 GB din start — nu va trebui să redimensionezi partițiile mai târziu.</p>
  </div>
</div>

## Pasul 1: Descarcă imaginea ISO

Intră pe **linuxmint.com/download.php** și alege aroma dorită — primești un fișier `.iso` de aproximativ 3 GB.

## Pasul 2: Creează stick-ul bootabil

Cel mai simplu este cu **Etcher**, disponibil pe Windows, macOS și Linux:

1. Instalează și deschide Etcher.
2. **Select image** → fișierul `.iso` descărcat.
3. **Select drive** → stick-ul tău USB.
4. Apasă **Flash!** și așteaptă să termine.

{% image "mint-etcher", "Interfața balenaEtcher cu imaginea ISO și stick-ul selectate", "Etcher face toți pașii: alegi imaginea, alegi stick-ul și apeși Flash." %}

Alternative bune:

- **Rufus** pe Windows (alege modul implicit de scriere).
- **USB Image Writer**, direct în Linux Mint: click dreapta pe fișierul ISO → *Make Bootable USB Stick*.
- **Ventoy**, dacă vrei mai multe sisteme pe același stick — vezi [Cum creezi un stick USB multiboot cu Ventoy](/blog/utilizare-ventoy/).

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Tot ce e pe stick va fi șters</p>
    <p>Salvează în altă parte ce ai pe el. În plus, nu scrie fișierul <code>.iso</code> pe un DVD așa cum este — scrie <strong>conținutul</strong> lui, altfel discul rămâne inutilizabil (iar DVD-urile sunt lente și predispuse la erori).</p>
  </div>
</div>

## Pasul 3: Backup și pregătirea Windows-ului

Înainte să atingi partițiile, salvează documentele, pozele și fișierele importante pe un disc extern sau în cloud.

Dacă instalezi **alături de Windows**, pregătește-l din Windows:

- dezactivează **Fast Startup** (Control Panel → Power Options → „Choose what the power buttons do”);
- suspendă criptarea **BitLocker**, dacă este activă (Settings → Privacy & Security → Device Encryption).

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Fast Startup-ul blochează partițiile</p>
    <p>Cât timp Fast Startup e pornit, Windows ține discul „blocat” și instalatorul nu poate redimensiona partiția. Dezactivarea lui rezolvă majoritatea problemelor de dual boot.</p>
  </div>
</div>

## Pasul 4: Pornește de pe stick

1. Introdu stick-ul și repornește calculatorul.
2. În timpul pornirii apasă tasta pentru alegerea dispozitivului de boot. Apare scurt pe ecran și diferă după producător: **F12**, **F11**, **F10**, **F2**, **Esc** sau **Delete**. Pe Mac, ține apăsat **Option** (Alt) imediat ce auzi sunetul de start.
3. Selectează stick-ul USB.

Imaginea ISO pornește atât în mod EFI, cât și în mod BIOS. În mod EFI vezi meniul **GRUB**, în mod BIOS pe cel **isolinux** — în ambele situații selectează **Start Linux Mint** și apasă Enter:

{% image "mint-grub", "Meniul GRUB de pornire a Linux Mint în mod EFI", "Meniul de pornire: evidențiază Start Linux Mint și apasă Enter." %}

Linux Mint pornește în **sesiunea live**: un desktop complet, care rulează direct de pe stick. Este ocazia perfectă să testezi înainte de a modifica ceva — verifică Wi-Fi-ul, sunetul, ecranul, touchpad-ul și tastele.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Utilizatorul din sesiunea live</p>
    <p>Numele de utilizator este <code>mint</code>, iar parola este goală — apasă doar Enter dacă ți se cere. Modificările făcute aici nu se păstrează nicăieri: sesiunea live se șterge la repornire.</p>
  </div>
</div>

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Ecran negru sau grafică ciudată?</p>
    <p>Repornește și alege <strong>compatibility mode</strong> din meniul de boot. Dacă nici așa nu merge, vezi secțiunea „Probleme frecvente” de la final — opțiunea <code>nomodeset</code> rezolvă de obicei cazul.</p>
  </div>
</div>

## Pasul 5: Limba, conexiunea și codecurile

Pe desktopul live dă dublu-clic pe **Install Linux Mint**. Instalatorul te întreabă în ordine:

1. **Limba sistemului** — alege **Română**, dacă o preferi.

{% image "mint-language", "Primul ecran al instalatorului Linux Mint, alegerea limbii", "Alegi limba interfeței — poți selecta Română din prima." %}

2. **Conexiunea la internet** — te conectează la rețea. Poți continua și fără internet, dar vei rămâne fără actualizări și drivere descărcate în timpul instalării.

{% image "mint-internet", "Ecranul de configurare a rețelei din instalatorul Linux Mint", "Conectarea la internet este opțională, dar utilă." %}

3. **Codecurile multimedia** — dacă ești conectat la internet, apare opțiunea de a instala codecurile (necesare pentru multe fișiere audio/video). **Bifeaz-o.**

{% image "mint-codecs", "Opțiunea de instalare a codecurilor multimedia din instalator", "Cu codecurile bifate, filmele și muzica merg din prima zi." %}

## Pasul 6: Tipul instalării și partiționarea

Ecranul **Installation Type** este singurul în care o decizie greșită poate șterge date. Alege una dintre variante:

{% image "mint-install", "Ecranul Installation Type din instalatorul Linux Mint", "Erase disc pentru instalare curată, alongside pentru dual boot, Something else pentru avansați." %}

### Varianta A: Disc întreg (recomandată pentru începători)

Alege **Erase disk and install Linux Mint**. Instalatorul șterge tot conținutul discului și creează singur structura de partiții. Dacă Linux Mint e singurul sistem pe care îl vrei pe calculator, aceasta este varianta ta.

### Varianta B: Dual boot cu Windows

Dacă mai e un sistem pe disc, instalatorul îți propune **Install Linux Mint alongside**: redimensionează automat partiția Windows, face loc și instalează Mint alături. La fiecare pornire primești un meniu din care alegi ce sistem pornești.

### Varianta C: Partiționare manuală

Alege **Something else** dacă vrei control total. Linux Mint are nevoie de o partiție montată pe `/`:

{% image "mint-partitions", "Lista de partiții din opțiunea Something else", "Partiția de sistem se montează pe / și se formatează cu ext4." %}

- **`/`** — partiția de sistem: **ext4** (recomandat, cel mai popular sistem de fișiere Linux), minimum 15 GB, ideal 100 GB
- **`swap`** — spațiu tampon pentru hibernare și pentru momentele în care memoria RAM se termină; dă-i cam cât are calculatorul tău RAM
- **`/home`** (opțional) — separat, ca să poți reinstala sistemul fără să atingi datele personale

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Criptarea completă a discului, mai târziu</p>
    <p>Opțiunea <strong>Encrypt the new Linux Mint installation</strong> criptează tot discul. În acest moment al instalării tastatura nu e încă setată, deci parola se tastează pe layout <strong>en_US</strong> — ușor de greșit. Sunt și probleme cunoscute cu driverele NVIDIA. Dacă ești la prima instalare, alege criptarea <strong>folderului de acasă</strong> (o găsești la pasul următor, la utilizator).</p>
  </div>
</div>

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Partiție separată pentru /home?</p>
    <p>Separa datele de sistem și îți permite să reinstalezi fără să le pierzi, dar nu este recomandată începătorilor: o mișcare greșită la instalare poate șterge tot. Prima dată, ține totul pe o singură partiție.</p>
  </div>
</div>

## Pasul 7: Fus orar, tastatură și utilizatorul

4. **Fusul orar** — alege **Bucharest** (sau orașul tău).

{% image "mint-timezone", "Ecranul de selecție a fusului orar din instalator", "Fusul orar corect înseamnă ceas și dată corecte din prima." %}

5. **Tastatura** — layout-ul implicit este engleza americană. Dacă ai tastatură cu litere românești, selectează-o din listă și testează în caseta de mai jos.

{% image "mint-keyboard", "Ecranul de configurare a tastaturii din instalator", "Testează tastele în căsuța de test înainte de a continua." %}

6. **Contul tău** — nume complet, nume de utilizator, numele calculatorului și parola.

{% image "mint-user", "Ecranul de creare a utilizatorului din instalatorul Linux Mint", "Numele, utilizatorul, numele calculatorului și parola — plus criptarea folderului de acasă." %}

- **Name** — poate fi numele tău real; apare doar pe ecranul de autentificare.
- **Username** — cu asta te autentifici. Folosește **doar litere mici, fără diacritice și fără punctuație**.
- **Parolă** — pune una puternică. Poți bifa login automat, dacă nu împarți calculatorul cu altcineva.
- **Encrypt my home folder** — opțiunea recomandată dacă vrei criptare, dar la îndemână: protejează fișierele tale, fără complicațiile criptării întregului disc.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Numele de utilizator rămâne definitiv</p>
    <p>Diacriticele, majusculele și punctuația în numele de utilizator provoacă bâlbe în programele mai vechi. Numele calculatorului (hostname) la fel: scurt, cu litere mici și fără spații.</p>
  </div>
</div>

## Pasul 8: Instalarea și prima repornire

Apasă **Install**. Rulează o prezentare cu ecrane în timp ce sistemul se copiază pe disc — durează de obicei între 5 și 20 de minute, în funcție de viteza discului.

{% image "mint-finished", "Mesajul de instalare finalizată din instalatorul Linux Mint", "Când instalarea se termină, apeși Restart Now." %}

La final:

1. Apasă **Restart Now**.
2. Scoate stick-ul USB atunci când ți se cere.
3. Apasă Enter — calculatorul pornește în noul tău Linux Mint.

## Primele lucruri după instalare

### 1. Actualizează sistemul

Deschide **Menu → Administration → Update Manager** și aplică toate actualizările. Din terminal, același lucru:

```bash
sudo apt update
sudo apt upgrade
```

### 2. Instalează driverele hardware

**Menu → Administration → Driver Manager** îți arată driverele proprietare disponibile (plăci video NVIDIA, plase de rețea Wi-Fi anumite):

{% image "mint-drivers", "Aplicația Driver Manager din Linux Mint", "Alegi driverul, apeși Apply Changes și repornești calculatorul." %}

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Fără internet la prima verificare?</p>
    <p>Driver Manager cere legătura. Dacă nu ești conectat, introduce stick-ul cu imaginea ISO, lasă-l să fie montat și apasă OK — instalează driverele direct de pe stick.</p>
  </div>
</div>

### 3. Codecurile, dacă nu le-ai bifat la instalare

**Menu → Sound & Video → Install Multimedia Codecs** → **Install** → introdu parola.

### 4. Treci interfața în română

**Menu → Preferences → Languages** → **Install / Remove Language** → selectează **Română** → **Install language packs**. Când termină, aplică limba la tot sistemul și la ecranul de autentificare.

### 5. Pune Timeshift pe picioare

Timeshift face **snapshot-uri** (copii de siguranță ale sistemului) cu care revii în timp dacă strici ceva. **Menu → Administration → Timeshift**:

1. Alege **RSYNC** → Next.
2. Alege discul unde salvezi snapshot-urile → Next (nu se formatează nimic; se creează un dosar `timeshift`).
3. Alege cât de des să facă snapshot-uri (zilnic/ săptămânal) → Finish.

Primele snapshot-uri ocupă mai mult, apoi se salvează doar fișierele modificate.

### 6. Instalează programele de care ai nevoie

**Menu → Administration → Software Manager** îți dă mii de aplicații, inclusiv din **Flatpak** (Discord, Steam, OBS, Spotify). Caută, apeși Install, gata.

## Probleme frecvente

- **Ecran negru sau grafică nu pornește:** la boot alege *compatibility mode*. Dacă merge, repetă cu `nomodeset` — în meniul EFI evidențiază *Start Linux Mint*, apasă **e**, înlocuiește `quiet splash` cu `nomodeset` și apasă **F10**; în mod BIOS apasă **Tab**, fă aceeași înlocuire și **Enter**.
- **Placa video se comportă ciudat:** încearcă `nouveau.noaccel=1` în loc de `nomodeset`, iar după instalare pune driverele din Driver Manager.
- **Calculatorul e foarte nou și Mint nu-l recunoaște:** descarcă imaginea **Edge** a aceleiași versiuni (kernel mai recent).
- **Wi-Fi-ul lipsește:** conectează temporar un cablu Ethernet și deschide Driver Manager, sau folosește stick-ul ISO ca sursă de drivere (vezi mai sus).
- **Nu apare tasta/nu poți alege stick-ul:** dezactivează Fast Startup din Windows, încearcă alt port USB (ideal cele din spatele calculatorului) și verifică din BIOS dacă modul este UEFI sau Legacy.
- **Instalarea se oprește la partiții:** folosește **Erase disk** — în loc de partiționare manuală, mai ales la prima instalare.

## Concluzie

Linux Mint este una dintre cele mai prietenoase uși de intrare în lumea Linux: alegi aroma care ți se potrivește, urmezi opt pași și ai un sistem rapid, stabil, care nu cere atenție lună de lună. Cinnamon pentru experiența completă, MATE pentru calculatoare mai vechi, Xfce pentru viteză maximă — pașii sunt aceiași, așa că poți încerca oricare.

Ca să mergi mai departe: [De ce este benefic să învățați Linux](/blog/de-ce-este-benefic-sa-invati-linux/) dacă vrei argumentele, [Linux vs Mac vs Windows](/blog/linux-vs-mac-vs-windows/) pentru o comparație onestă, iar [DE-uri sau WM-uri](/blog/de-sau-wm/) dacă vrei să schimbi interfața mai târziu.

<em>Ghid adaptat (tradus și rescris) după <a href="https://linuxmint-installation-guide.readthedocs.io/">Linux Mint Installation Guide</a> din documentația oficială Linux Mint, licențiat sub <a href="https://www.gnu.org/licenses/gpl-3.0.html">GPLv3</a>. Capturile de ecran din acest articol provin din aceeași documentație și sunt preluate sub aceeași licență. Linux Mint este marcă a proiectului Linux Mint.</em>
