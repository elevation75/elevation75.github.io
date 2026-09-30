---
title: "Ghid de instalare Fedora Workstation: pas cu pas"
description: "Instalezi Fedora Workstation de la zero, cu Anaconda, și o pregătești pentru folosirea zilnică: RPM Fusion, codecuri, Flathub și drivere."
date: 2026-09-29
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-fedora.webp
  jpg: /assets/img/cover-fedora.jpg
  alt: "Ecranul de întâmpinare al instalatorului Fedora Workstation"
---

Fedora este una dintre cele mai apreciate distribuții Linux pentru desktop: software recent, GNOME aproape de forma sa originală, suport bun pentru hardware modern și o versiune nouă la aproximativ șase luni. Este sponsorizată de Red Hat și servește drept teren de testare pentru tehnologii care ajung ulterior în RHEL. La finalul acestui ghid vei avea Fedora Workstation instalată de la zero și pregătită pentru folosirea zilnică.

## Cerințe minime

- **Procesor:** 2 GHz, dual-core sau mai bun, pe 64 de biți
- **Memorie RAM:** 4 GB (recomandat 8 GB sau mai mult)
- **Spațiu pe disc:** minimum 20 GB (recomandat 50 GB sau mai mult)
- **Stick USB:** minimum 4 GB, care va fi șters complet
- **Conexiune la internet:** recomandată, pentru actualizări și codecuri

## Pasul 1: Descarcă Fedora

Intră pe site-ul oficial, **fedoraproject.org**, și descarcă **Fedora Workstation**. Ai două opțiuni:

- **Fedora Media Writer:** aplicația oficială, disponibilă pentru Windows, macOS și Linux. Descarcă imaginea și creează stick-ul bootabil într-un singur pas.
- **Imaginea ISO:** o descarci manual și o scrii apoi pe stick cu un alt instrument.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Cea mai simplă variantă</p>
    <p>Fedora Media Writer face totul într-un singur pas. Dacă descarci ISO-ul manual, verifică suma de control (checksum) publicată pe site, ca să te asiguri că fișierul nu este corupt sau modificat.</p>
  </div>
</div>

## Pasul 2: Creează stick-ul USB bootabil

Cu Fedora Media Writer:

1. Instalează și deschide aplicația.
2. Alege **Fedora Workstation**.
3. Selectează stick-ul USB din listă.
4. Apasă **Download & Write** și așteaptă finalizarea.

Dacă ai deja ISO-ul, poți folosi **balenaEtcher** sau **Rufus** (pe Windows, în modul DD Image dacă ți se cere).

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Stick-ul va fi șters</p>
    <p>Toate datele de pe stick vor fi șterse. Salvează în altă parte ce ai nevoie.</p>
  </div>
</div>

## Pasul 3: Fă o copie de siguranță

Înainte de orice modificare a partițiilor, salvează documentele, pozele și fișierele importante pe un disc extern sau în cloud. Riscul este mic, dar o eroare la partiționare poate duce la pierderea datelor.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Dacă vrei dual boot cu Windows</p>
    <p>Dezactivează <strong>Fast Startup</strong> din Windows și suspendă criptarea <strong>BitLocker</strong> (dacă este activă). Altfel, Fedora poate întâmpina probleme la redimensionarea partițiilor.</p>
  </div>
</div>

## Pasul 4: Pornește de pe USB

1. Introdu stick-ul și repornește calculatorul.
2. Apasă tasta pentru meniul de boot în timpul pornirii. Depinde de producător: de obicei **F12**, **F10**, **F9**, **Esc** sau **F2**.
3. Selectează stick-ul USB.
4. În meniul Fedora alege **Start Fedora-Workstation-Live**.

Fedora pornește în mod Live, adică o poți încerca fără să modifici nimic pe disc. Verifică dacă merg Wi-Fi-ul, sunetul, touchpad-ul și ecranul. Dacă totul este în regulă, continuă cu instalarea.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Secure Boot</p>
    <p>Fedora suportă <strong>Secure Boot</strong>, deci în majoritatea cazurilor nu trebuie să îl dezactivezi.</p>
  </div>
</div>

## Pasul 5: Lansează instalatorul

După ce apare ecranul de întâmpinare, alege **Install to Hard Drive**. Se deschide instalatorul **Anaconda**.

1. **Limba:** selectează limba sistemului (există și Română) și apasă **Continue**.
2. **Rezumatul instalării:** aici configurezi tastatura, ora și data, precum și destinația instalării.

Verifică tastatura și fusul orar (**Europe/Bucharest**), apoi treci la partiționare.

## Pasul 6: Partiționarea discului

Ecranul **Installation Destination** este cel mai important. Alege una dintre variantele de mai jos.

### Varianta A: Disc întreg (recomandată pentru începători)

Selectează discul și lasă opțiunea **Automatic**. Fedora șterge tot conținutul și creează automat structura necesară. Sistemul de fișiere implicit este **Btrfs**, cu suport pentru snapshot-uri și compresie.

### Varianta B: Dual boot cu Windows

Ai nevoie de spațiu liber pe disc. Cel mai sigur este să reduci partiția Windows din **Disk Management** (înainte de instalare) și să lași spațiul nealocat. Apoi, în Anaconda, alege **Custom** sau **Advanced Custom (Blivet-GUI)** și creează partițiile în spațiul liber:

- `/boot/efi`: partiția EFI existentă (folosește-o, **nu o formata**)
- `/boot`: 1 GB, ext4
- `/`: restul spațiului, Btrfs sau ext4
- `/home` (opțional): pentru datele personale, separat de sistem

Ai grijă să nu formatezi partițiile Windows.

### Criptarea discului

Poți bifa **Encrypt my data** pentru a proteja discul cu LUKS. Este recomandată pe laptopuri.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Nu uita parola</p>
    <p>Fără parola de criptare nu mai poți recupera datele de pe disc. Ține-o într-un loc sigur.</p>
  </div>
</div>

## Pasul 7: Începe instalarea

Apasă **Begin Installation**. Procesul durează de obicei între 5 și 15 minute, în funcție de viteza discului. La final apasă **Finish Installation**, apoi oprește sistemul, scoate stick-ul USB și repornește.

## Pasul 8: Configurarea inițială

La prima pornire, asistentul de configurare te ghidează prin:

- activarea sau dezactivarea serviciilor de locație
- conectarea la conturi online (opțional)
- crearea utilizatorului și a parolei
- setarea numelui contului

Contul creat aici primește automat drepturi de administrator (`sudo`).

## Pasul 9: Actualizează sistemul

Primul lucru după instalare este să aduci sistemul la zi. Deschide **Terminal** și rulează:

```bash
sudo dnf upgrade --refresh
```

Repornește apoi calculatorul, mai ales dacă s-a actualizat kernelul. Poți actualiza și din aplicația grafică **Software**.

## Pasul 10: Configurări recomandate după instalare

### Activează RPM Fusion

Fedora include implicit doar software open-source. Pentru drivere proprietare și codecuri multimedia ai nevoie de depozitul **RPM Fusion**:

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

### Instalează codecurile multimedia

```bash
sudo dnf swap ffmpeg-free ffmpeg --allowerasing
sudo dnf update @multimedia --setopt="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin
```

### Activează Flathub

Flathub oferă mii de aplicații (Spotify, Discord, Steam, OBS și altele):

```bash
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

După aceasta, aplicațiile din Flathub apar și în **Software**.

### Drivere NVIDIA (dacă ai placă NVIDIA)

După activarea RPM Fusion:

```bash
sudo dnf install akmod-nvidia
```

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Așteaptă înainte de repornire</p>
    <p>După instalare, așteaptă câteva minute ca modulul kernel să se compileze, apoi repornește. Dacă ai Secure Boot activ, va trebui să înregistrezi cheia (MOK); documentația RPM Fusion explică procedura.</p>
  </div>
</div>

### Actualizări de firmware

```bash
sudo fwupdmgr refresh
sudo fwupdmgr update
```

### Instrumente utile

- **GNOME Tweaks:** `sudo dnf install gnome-tweaks`, pentru personalizarea interfeței
- **Extension Manager:** pentru extensii GNOME (de la Flathub)
- **Timeshift** sau snapshot-uri Btrfs: pentru copii de siguranță ale sistemului

## Probleme frecvente

- **Stick-ul nu apare în meniul de boot:** verifică dacă BIOS/UEFI este în modul UEFI și încearcă alt port USB sau reface stick-ul.
- **Wi-Fi-ul nu funcționează:** unele plăci au nevoie de firmware suplimentar; conectează temporar un cablu Ethernet și actualizează sistemul.
- **Windows nu apare în meniul GRUB:** rulează `sudo grub2-mkconfig -o /boot/grub2/grub.cfg` (sau varianta pentru EFI, conform documentației).
- **Ecran negru după instalarea driverului NVIDIA:** verifică dacă modulul a fost compilat complet înainte de repornire.

## Concluzie

Instalarea Fedora este simplă, iar instalatorul Anaconda face procesul accesibil chiar și pentru începători. După configurarea RPM Fusion, a codecurilor și a Flathub, ai un sistem modern, stabil și gata de lucru, de joacă sau de programare.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Ține cont de ciclul de viață</p>
    <p>Fedora se actualizează rapid, iar fiecare versiune este suportată aproximativ 13 luni. Va trebui să faci upgrade la versiunea următoare cel puțin o dată pe an. Pentru detalii actualizate, consultă documentația oficială la <strong>docs.fedoraproject.org</strong>.</p>
  </div>
</div>

Nu te-ai hotărât încă dacă Fedora e alegerea potrivită? Aruncă o privire peste [Un ocean de distribuții](/blog/un-ocean-de-distributii/) și compară cu celelalte variante.
