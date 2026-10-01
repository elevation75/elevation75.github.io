---
title: "Ghid de instalare EndeavourOS: pas cu pas (Arch cu instalator grafic)"
description: "Instalezi EndeavourOS Titan Nova de la zero: de ce Online e varianta corectă (Offline e doar fallback), stick-ul fără greșeli, meniul de boot EFI cu opțiunile de drivere, fiecare pas al instalatorului, actualizări rolling cu pacman, AUR cu yay și Timeshift ca plasă de siguranță."
date: 2026-10-01
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-endeavouros.webp
  jpg: /assets/img/cover-endeavouros.jpg
  alt: "Captură de ecran cu desktopul EndeavourOS Titan 2026"
---

**EndeavourOS** este distribuția care îți dă **Arch Linux fără instalare manuală**: un instalator grafic, un mediu live plin de unelte și o comunitate care îți răspunde pe forum. Proiectul a apărut în 2019, când Antergos s-a oprit, iar azi e unul dintre cele mai apreciate „poduri” spre Arch.

ISO-ul curent este **EndeavourOS Titan Nova 2026.08.15** (3,63 GiB), anunțat pe 28 august 2026, cu **Linux 7.1.8**, drivere GPU detectate automat la instalare și `eos-hwtool` pentru pus drivere cu o singură comandă.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Cinstit înainte de toate: nu e primul sistem pentru oricine</p>
    <p>EndeavourOS e <strong>rolling release</strong> pe bază de <strong>Arch</strong>: actualizările vin continuu (uneori zile cu multe pachete), se instalează din <strong>terminal</strong> (<code>pacman</code>, <code>yay</code>) și sistemul e orientat spre cine vrea să înțeleagă ce se întâmplă. <strong>Secure Boot nu e suportat</strong> (trebuie dezactivat) și nu ai „versiuni” ca la Mint — actualizezi, nu reinstalezi.</p>
    <p>Dacă vrei un sistem care „merge și atât”, rămâi la <a href="/blog/ghid-instalare-linux-mint/">Linux Mint</a> sau <a href="/blog/ghid-instalare-zorin/">Zorin OS</a>. Dacă vrei viteza și controlul lui Arch cu instalator grafic — citește mai departe.</p>
  </div>
</div>

## Online sau Offline? (decizia care contează)

Instalatorul îți oferă două metode, iar alegerea schimbă rezultatul instalării:

| | **Online** (recomandat) | **Offline** (doar fallback) |
|---|---|---|
| Ce instalează | sistem construit acum, din oglinzile curente | pachetele așa cum erau la data ISO-ului |
| Desktop ales | orice (KDE, GNOME, Xfce, Cinnamon, MATE, i3, Sway, bspwm) | **doar KDE Plasma** |
| Extra-opțiuni | poți adăuga nucleu LTS, suport tipărire/scanner, poți deselecta pachete | fără opțiuni |
| La final | sistem actualizat | sistem **vechi**, prima actualizare poate cere intervenții manuale |

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Regula lor, simplificată</p>
    <p><strong>Folosește Online.</strong> Offline e rezerva pentru când ai internet slab sau placa de rețea nu e recunoscută. Dacă instalezi totuși Offline, verifică <em>Important-news</em> înainte de prima actualizare — ei bifează acolo problemele cunoscute.</p>
  </div>
</div>

## Cerințe minime și pregătiri

- **Procesor:** dual-core Intel/AMD, pe 64 de biți (doar 64 biți!)
- **Memorie RAM:** 4 GB
- **Spațiu pe disc:** 15 GB
- **Stick USB:** 8 GB sau mai mare (ISO-ul are 3,63 GiB)
- **Sistem EFI modern** — funcționează și pe BIOS vechi, dar EFI e varianta lor recomandată

Înainte de a începe, trei setări de făcut pe calculator:

1. **Dezactivează Secure Boot** din BIOS/UEFI — EndeavourOS nu îl suportă.
2. **Dezactivează Fast Startup în Windows** (Control Panel → Power Options) — altfel Bluetooth-ul și WiFi-ul pot dispărea după instalare.
3. **Dezactivează CSM / Legacy** pe sistemele EFI — instalatorul nu detectează mereu corect modul mixt, iar stickul trebuie pornit în mod EFI.

## Pasul 1: Descarcă imaginea ISO

Intră pe **endeavouros.com/download** și descarcă `EndeavourOS_Titan-Nova-2026.08.15.iso` fie prin **magnet/torrent** (se descarcă repede de la mai mulți colegi), fie de pe una dintre cele **26 de oglinzi** din listă — pentru România, alege una din Europa (Germania, Belgia, Elveția, Suedia).

## Pasul 2: Creează stick-ul bootabil (fără greșeli)

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Unele programe strică stickul pentru EndeavourOS</p>
    <p>Ei spun clar: <strong>nu folosi UNetbootin, Linux Live USB Creator, Universal USB Installer sau Live USB Creator</strong> — acestea rescriu etichetele partițiilor din ISO, iar stickul nu va mai porni. <strong>Etcher nu mai e recomandat</strong> de echipa EndeavourOS (probleme de confidențialitate și stickuri care nu mai funcționează cu ISO-uri noi).</p>
  </div>
</div>

**Pe Windows:**
1. Descarcă **Rufus** sau **USBWriter**.
2. Alege fișierul `.iso` și stickul.
3. La Rufus, păstrează setările ca atare și apasă **Start** — când te întreabă, alege **modul DD** (scriere brută, fără modificări).

**Pe Linux:**
- **GNOME Disks** („Diskuri”): click dreapta pe fișierul `.iso` → *Open With Disk Image Writer* → alege stickul → *Start Restoring*.
- Sau **Popsicle**, **Suse Image Writer**, sau clasicul `dd` dacă te simți comod în terminal.

**Ventoy** rămâne excelent pentru multiboot (mai multe ISO-uri pe același stick) — dar folosește versiunea **cea mai nouă** și, dacă ISO-ul nu pornește, alege modul **grub2** pentru el. Vezi și [ghidul nostru despre Ventoy](/blog/utilizare-ventoy/).

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Așteaptă sincronizarea</p>
    <p>Cea mai frecventă greșeală e să scoți stickul prea devreme. Datele se pot sincroniza și <strong>10 minute</strong> după ce bara a ajuns la capăt — lasă sistemul să termine în pace.</p>
  </div>
</div>

## Pasul 3: Pornește de pe stick

Oprire completă a calculatorului, stickul introdus, apoi tastează **repetat** tasta de meniu:

| Sistem | Tasta |
|---|---|
| Calculatoare de birou | **F12** (uneori **F8**/**F10**) |
| Laptopuri | **Esc**, **F2** sau **F12** |
| Intrare în BIOS/UEFI | **Del** sau **F2** |
| Mac | ține apăsat **⌥ Option** |

Alege stickul (scrie „EFI” sau „UEFI” pe el) și intri în meniul de boot. Pe sistemele moderne arată așa:

{% image "eos-boot-efi", "Meniul de boot EFI al EndeavourOS", "Variantele de pornire: drivere open source (default), drivere NVIDIA sau modul fallback nomodeset." %}

- **„with open source drivers: All GPUs”** — varianta implicită, merge pe orice placă video.
- **„with NVIDIA drivers: Only RTX GPUs, Turing, or later”** — doar pentru GTX 16xx / RTX 20xx și mai noi.
- **„fallback nomodeset”** — dacă ecranul rămâne negru cu variantele de mai sus.
- *Test RAM with memtest86+*, *EFI Shell* și *Reboot Into Firmware Interface* sunt unelte de diagnosticare.

Pe sistemele BIOS/legacy vechi, meniul arată altfel (aceleași variante, în formatul clasic):

{% image "eos-boot-legacy", "Meniul de boot EndeavourOS în modul BIOS/legacy", "Meniul clasic, cu aceleași opțiuni de drivere plus informații despre hardware." %}

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Prima oară, lasă verificarea stickului</p>
    <p>Dacă apare verificarea automată a mediei la prima rulare, nu o sări — previne exact instalările care pică pe la jumătate din cauza unui stick corupt.</p>
  </div>
</div>

## Pasul 4: Încearcă înainte (sesiunea live)

EndeavourOS pornește într-un mediu live complet, de unde poți testa **WiFi-ul, sunetul, ecranul, touchpad-ul și tastatura**:

{% image "eos-live", "Sesiunea live EndeavourOS cu aplicația Welcome deschisă", "Desktopul live: testezi tot ce te interesează fără să atingi vreun disc." %}

Aplicația **Welcome** din colț îți dă acces la instalator, la uneltele de asistență și la știrile proiectului. Când totul e în regulă, apasă **Install EndeavourOS**.

## Pasul 5: Instalarea, pas cu pas

Instalatorul (Calamares) trece prin pași și îți arată mereu unde te afli:

{% image "eos-installer", "Instalatorul EndeavourOS în timpul instalării", "Pașii din bara laterală: Welcome, Location, Keyboard, Partitions, Desktop, Users, Summary, Install, Finish." %}

1. **Metoda de instalare** — alege **Online** (vezi tabelul de la început).
2. **Limbă, localizare, tastatură** — ca la orice instalator.
3. **Partiții** — patru variante:

| Variantă | Ce face |
|---|---|
| **Alongside** | păstrează Windows și micșorează partiția lui automat (dual boot) |
| **Replace** | suprascrie o singură partiție, restul rămâne intact |
| **Erase** | șterge **tot** discul ales și instalează curat |
| **Manual** | partiționare pentru configurații deosebite (avansați) |

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Verifică discul înainte de Erase</p>
    <p>Dacă ai mai multe discuri, asigură-te că ai ales unitatea corectă — conținutul ei va fi șters. Fă-ți <strong>backup</strong> înainte. Dacă instalatorul nu poate crea partițiile, șterge-le mai întâi cu <strong>KDE Partition Manager</strong> sau <strong>GParted</strong> (ambele sunt în mediu live) și încearcă din nou.</p>
  </div>
</div>

La **partiționare manuală** pe sisteme EFI, reține cerințele lor: partiție **GPT**, o partiție **ESP** FAT32 marcată *boot* (montată `/efi`, minim **2 GB** la bootloaderul implicit systemd-boot, sau `/boot/efi`, minim 300 MB, la GRUB) și partiția de sistem `ext4` sau `BTRFS` montată pe `/`. BTRFS-ul îl alegi doar dacă știi de ce — are subvolume și reguli ale lui.

4. **Desktop** — alegi mediul dorit: KDE Plasma, GNOME, Xfce, Cinnamon, MATE sau un window manager (i3, Sway, bspwm). *Notă: în ediția Titan Nova, Budgie e scos temporar.*
5. **Packages** — poți deselecta ce nu-ți trebuie sau adăuga extra (nucleu LTS, tipărire, scanner). Aici se dezactivează și „EndeavourOS Desktop Fixes” dacă vrei un sistem cât mai curat.
6. **Users** — nume, parolă, numele calculatorului; opțional, autologare.
7. **Summary → Install** — verifici ce se întâmplă și lași instalatorul să lucreze.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Dacă instalarea eșuează</p>
    <p><strong>Nu reporni și nu închide sesiunea live.</strong> Folosește uneltea de jurnale din panou (cu <code>inxi</code>), urcă log-ul pe pastebin și pune-l pe forum — ei chiar au nevoie de el ca să repare bugurile.</p>
  </div>
</div>

La final, repornești, scoți stickul și intri în sistem (bootloaderul implicit pe EFI e **systemd-boot**, iar pe sistemele mai vechi **GRUB**).

## Pasul 6: Primele minute după instalare

1. **Aplicația Welcome → tabul „After Install”** îți dă lista de sarcini: actualizează oglinzile, actualizează sistemul, curăță pachetele, alege wallpaperul:

{% image "eos-welcome", "Aplicația Welcome, tabul After Install", "Sarcinile recomandate imediat după instalare: Update Mirrors, Update System, Package cleanup." %}

2. **Actualizează sistemul** (de oriunde din terminal):

```bash
sudo pacman -Syu
```

Ei recomandă **actualizări complete, nu parțiale**, și să nu le amâni prea mult (o dată pe săptămână e ritmul sănătos) — dar nici să nu faci update cu 30 de minute înainte de o prezentare importantă. La Rolling Release, actualizarea *e* upgrade-ul de sistem.

3. **Programe și AUR** — din terminal, `pacman -S nume_pachet` pentru pachetele oficiale Arch, iar pentru AUR (repoitoriul comunității) folosești helperul **yay**, deja instalat: `yay -S nume_pachet`. Multe aplicații populare se găsesc exact acolo.

{% image "eos-apps", "Meniul de aplicații EndeavourOS", "Aplicațiile preinstalate: browser, birou, unelte de sistem, plus cele din AUR." %}

4. **Drivere video NVIDIA** — cu `eos-hwtool --install-recommended` pui driverele potrivite într-o singură comandă (merge și fără, dacă ai doar Intel/AMD). Cardurile GTX 16xx și mai noi folosesc pachetul `nvidia-open`; cele mai vechi au ramuri legacy.

5. **Plasa de siguranță: Timeshift** — instalare cu `yay -S timeshift` (varianta **RSYNC**), apoi `systemctl enable --now cronie.service` ca să ruleze automat. La un update care strică ceva, revii la un instantaneu vechi.

6. **FirewallD** e activ din fabrică, așa că sistemul e protejat de la bun început.

## Probleme frecvente

- **Stickul nu apare în meniul de boot:** verifică că e în mod **EFI** (CSM dezactivat), alt port USB, altă tastă din tabel.
- **Secure Boot refuză să pornească:** dezactivează-l — nu e suportat.
- **Instalatorul nu vede partițiile:** șterge-le înainte cu KDE Partition Manager/GParted.
- **WiFi slab sau oglinzi lente:** din Welcome, toolul *Update Mirrors* — lasă minim 8 oglinzi active.
- **Ventoy nu pornește ISO-ul:** versiune nouă + mod **grub2**.
- **Prima actualizare după o instalare Offline:** citești mai întâi *Important-news* (pe GitHub sau GitLab) ca să vezi dacă e ceva de evitat.
- **După update, ecran negru sau desktop blocat:** repornești într-o versiune veche a nucleului sau restaurezi instantaneul Timeshift.

## Concluzie

EndeavourOS e cea mai scurtă cale spre Arch: instalezi în 15 minute cu instalator grafic, iar apoi ai un sistem rapid, modern, care se actualizează continuu — cu prețul de a te obișnui cu `pacman` și cu ritmul rolling. Dacă vrei să înveți Linux fără să-l construiești de la zero, e alegerea potrivită.

Ca să compari: [Linux Mint](/blog/ghid-instalare-linux-mint/) pentru stabilitate și liniște, [Zorin OS](/blog/ghid-instalare-zorin/) pentru familiaritatea Windows-ului, [Pop!_OS](/blog/ghid-instalare-popos/) pentru NVIDIA și tiling, [Ubuntu](/blog/cum-instalezi-ubuntu/) pentru comunitate, iar [Ventoy](/blog/utilizare-ventoy/) ca să ții mai multe sisteme pe același stick.

<em>Informațiile tehnice provin din <a href="https://discovery.endeavouros.com/">wiki-ul oficial Discovery</a> (paginile „Live ISO Installation Info Tricks &amp; Tips”, „Create install media”, „Pacman basic commands”, „Nvidia intro” și „Update troubles? Meet Timeshift”) și de pe <a href="https://endeavouros.com/">site-ul oficial</a>, rescrise integral în română. Capturile de ecran provin din <a href="https://github.com/endeavouros-team/screenshots">repo-ul oficial de screenshot-uri EndeavourOS</a>, licențiat sub <a href="https://www.gnu.org/licenses/gpl-3.0.html">GPL-3.0</a>. Coperta: „EndeavourOS Titan 2026.03.06” de Bryan Poerwoatmodjo și Fernando Omiechuk F, de pe <a href="https://commons.wikimedia.org/wiki/File:EndeavourOS_Titan_2026.03.06.png">Wikimedia Commons</a>, sub licență GPL. „EndeavourOS” și logoul sunt mărci ale echipei EndeavourOS; folosirea lor aici e editorială și nu implică afiliere, aprobare sau sponsorizare.</em>
