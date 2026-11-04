---
title: "Harta Linux, strat cu strat: de la butonul de power până la primul program"
description: "Cum pornește un calculator Linux și ce se ascunde sub fiecare strat: firmware, GRUB, kernel, systemd, shell, fișiere, distribuții și desktop — harta completă pentru începători."
date: 2026-11-04
category: Inițiere
cover:
  webp: /assets/img/cover-harta-linux.webp
  jpg: /assets/img/cover-harta-linux.jpg
  alt: "Coperta articolului Harta Linux"
---

Dacă ai încercat vreodată să înveți Linux, ai dat peste un munte de cuvinte: Ubuntu, GRUB, systemd, Wayland, Flatpak, kernel. Fiecare tutorial îți predă o bucată, așa că ajungi cu o cutie plină de piese de puzzle și fără imaginea de pe cutie.

Acest articol e imaginea de pe cutie. Construim **o singură hartă**, strat cu strat, pornind de la metalul din calculator și urcând până la fereastra în care deschizi un program. Când vei termina, când cineva va zice „Wayland" sau „libc", vei ști exact unde locuiește și de ce există.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Cum se citește harta</p>
    <p>Fiecare capitol e un strat deasupra celui de dinainte. Poți citi liniștit în ordine — sau poți sări direct la stratul care te interesează și să revii mai târziu. Nivelul de detaliu e cel al unui începător curios, nu al unui manual.</p>
  </div>
</div>

## Straturile hărții

În ordinea în care se așează, straturile arată așa:

1. **Hardware-ul** — procesor, memorie, disc, placa video și cea de rețea.
2. **Firmware-ul** (BIOS sau UEFI) — primul program care se trezește la apăsarea butonului.
3. **Bootloader-ul (GRUB)** — găsește kernelul și îl încarcă în memorie.
4. **Kernelul** — inima Linux, partea care stăpânește hardware-ul.
5. **systemd** — primul program pornește restul sistemului.
6. **Uneltele GNU și libc** — cutia de scule și biblioteca pe care se sprijină aproape tot.
7. **Shell-ul** — programul care înțelege comenziile tale.
8. **Sistemul de fișiere** — un singur arbore care începe cu `/`.
9. **Distribuția** — echipa care asamblează toate straturile de mai sus.
10. **Interfața grafică** — X11 sau Wayland, compozitorul, desktop-ul.
11. **Aplicațiile** — programele tale, ambalate în Flatpak, Snap sau AppImage.

Fără hardware, restul e nisip scump. Fără kernel, hardware-ul e o piesă de mobilier. Hai să urcăm.

## Primul strat: hardware-ul și firmware-ul

La bază stă hardware-ul: CPU-ul care face calculele, memoria RAM care ține ce se lucrează acum, SSD-ul care păstrează tot, plus placa video și cea de rețea. Singur, hardware-ul e doar „nisip scump" — are nevoie de cineva care să-l trezească.

Acel cineva e **firmware-ul**. Pe calculatoarele mai vechi se chema BIOS, pe aproape orice PC modern se numește [UEFI](/blog/glosar-linux/#uefi-efi). Gândește-te la el ca la un paznic care ajunge primul dimineață: aprinde luminile, verifică rapid memoria și dispozitivele și pune o singură întrebare — *cine se ocupă de pornirea sistemului de operare?*

Răspunsul stă într-o partiție mică de pe disc, numită [ESP](/blog/glosar-linux/#esp) (EFI System Partition). UEFI se uită acolo, alege un bootloader și predă controlul. Pe sistemele Linux, acel bootloader e aproape mereu [GRUB](/blog/glosar-linux/#grub) — meniul pe care l-ai văzut probabil dacă ai încercat vreodată dual boot.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">De ce contează pentru tine</p>
    <p>De-aici vin „meniul de boot" și opțiunea de a alege Windows sau Linux la pornire. Dacă ai fost vreodată blocat pe un ecran albastru cu texte la pornire, te aflai în stratul acesta — vezi [Glosarul: meniu de boot](/blog/glosar-linux/#meniu-de-boot).</p>
  </div>
</div>

## GRUB și initramfs: podul spre nucleu

GRUB (Grand Unified Bootloader) are o sarcină surprinzător de mică, dar absolut critică: găsește fișierul cu kernelul de pe disc — de obicei un fișier numit **vmlinuz** — îl încarcă în memorie și, împreună cu el, un ajutor mic numit **initramfs**.

Initramfs-ul e un sistem de fișiere temporar, încărcat cu exact atâtea drivere cât trebuie ca să găsească discul real și să-l monteze. Pe scurt: GRUB e regizorul de scenă. Nu joacă el, doar aduce steaua pe scenă. Iar steaua e următorul strat.

## Kernelul: inima care stăpânește hardware-ul

Aici vine prima mare surpriză pentru mulți: **tehnic, Linux e doar acest strat**. Linux e kernelul — restul hărții e construit în jurul lui de alte proiecte. Linus Torvalds l-a început în 1991 ca proiect personal; azi e unul dintre cele mai mari proiecte colaborative de software din lume. Povestea completă e în [Linux este miezul (kernel)](/blog/linux-este-miezul-kernel/).

Ce face kernelul? Imaginează-ți un restaurant: hardware-ul e bucătăria, aplicațiile sunt clienții, iar clienții nu intră în bucătărie să apuce cuțite. Kernelul e personalul din bucătărie — stăpânește hardware-ul, iar toate celelalte trebuie să **cere politicos**. Cererea politicoasă se numește **apel de sistem** (system call). Când un program vrea să citească un fișier, nu atinge discul direct: face un apel de sistem, iar kernelul face treaba și dă înapoi rezultatul.

Sub această relație se ascund patru mecanisme:

- **Driverele** — traducătorii care lasă kernelul să vorbească cu placa Wi-Fi, cu GPU-ul, cu stickul USB. Multe sunt [module de kernel](/blog/glosar-linux/#modul-kernel), încărate la nevoie, fără repornire.
- **Programatorul (schedulerul)** — ai câteva nuclee de procesor, dar sute de procese care vor timp. El decide cine rulează în următoarea milisecundă, atât de repede încât totul pare simultan.
- **Memoria virtuală** — fiecare proces crede că are memorie proprie, iar kernelul o mapează pe RAM-ul real în bucăți numite pagini. Dacă memoria chiar se termină, un „evocator de ultimă oră" închide un proces ca să salveze sistemul.
- **VFS (virtual file system)** — fișierele tale pot sta pe ext4, pe btrfs, pe un stick sau pe o rețea; VFS le tuturor o singură interfață comună. E vorba aceea veche de Unix: *totul e un fișier*.

Kernelul e bătăile inimii hărții — dar o inimă fără corp. Ce pornește primul?

## systemd: primul program care pornește

După ce kernelul s-a trezut și a montat discul real cu ajutorul initramfs-ului, pornește **un singur program**. Primește numărul de proces **PID 1** și se numește sistemul init. Toate celelalte procese din calculator sunt urmașii lui.

Pe distribuțiile moderne, PID 1 e [systemd](/blog/glosar-linux/#systemd): pornește rețeaua, montează discurile, lansează ecranul de login, rulează servicii și le repornește dacă pică. El organizează totul în *unități* — servicii, montări, temporizatoare — iar grupurile de unități formează *ținte*, etape precum „rețeaua e sus" sau „masa de lucru grafică". Îl controlezi cu `systemctl` și citești jurnalele cu `journalctl`.

Nu toată lumea îl folosește — Alpine folosește OpenRC, Void folosește runit — dar rolul în hartă rămâne același.

## Uneltele GNU și libc: cutia de scule

A doua mare surpriză: un kernel singur nu e ceva cu chiar poți lucra. Ai nevoie de unelte de bază ca să listezi, copiezi, cauți și comprimi fișiere. Multe vin de la proiectul GNU, pornit de Richard Stallman în 1983. Până la începutul anilor '90, GNU avea compilator, shell și o grămadă de unelte, dar îi lipsea kernelul. A venit Linux, împreună au făcut un sistem complet — de aceea unii spun „GNU/Linux". Detaliile sunt în [Unix + Linus = Linux](/blog/unix-linus-linux/).

Unelte ca `ls`, `cp`, `mv` și `cat` vin din pachetul **coreutils**, iar `grep` și `tar` sunt pachete GNU separate.

Și, tăcut, între fiecare program și kernel, stă **libc** — biblioteca C. Ține minte apelurile de sistem? Majoritatea programelor nu le fac de mână, ci apelează funcții prietenoase din libc, iar biblioteca face apelurile pentru ele. Pe majoritatea distribuțiilor asta e **glibc** (GNU C Library); pe sisteme mai ușoare, ca Alpine, **musl**. N-o vei vedea niciodată, dar aproape fiecare program se sprijină pe ea.

## Shell și terminal: cum vorbești cu sistemul

Acum avem nevoie de o cale de a vorbi cu uneltele. Aici se confundă mereu două lucruri:

- **Terminalul** e fereastra care desenează textul și îți transmite tastatura apăsărilor.
- **Shell-ul** e programul care rulează în interiorul ferestrei și chiar **înțelege** comenzile.

Terminalul e telefonul. Shell-ul e omul din celălalt capăt al firului. Cel mai cunoscut shell e **Bash** (Bourne Again Shell), tot proiect GNU; mulți preferă **ZSH** (implicit pe macOS azi) sau **Fish**, față pentru că e prietenos din cutie. Dacă vrei detalii și practică, ai [Terminalul fără frică](/blog/terminalul-fara-frica/).

Leagă comenzi cu o conductă (pipe) — `cat jurnal.txt | grep eroare` — și ieșirea unei comenzi intră în intrarea celeilalte. Unelte mici lipite între ele: asta e filozofia Unix. Apropo, uneltele din această hartă au și un capitol propriu în [Glosar](/blog/glosar-linux/#terminal).

## Unde stau fișierele: harta de sub liniuță

Scrii `ls /var` și vei vedea un set ciudat de foldere. Acest aranjament urmează standardul **FHS** — și nu există nicio literă de unitate aici. Totul atârnă de un singur rădăcină, doar barra înainte: `/`.

- `/home` — fișierele tale personale
- `/etc` — configurația sistemului
- `/bin` și `/usr/bin` — programele
- `/var` — ce se schimbă: jurnale, cozi
- `/tmp` — spațiu de lucru temporar
- `/boot` — kernelul și fișierele de pornire, cele din straturile de mai jos

Și apoi sunt folderele magice. Ține minte ideea „totul e un fișier"? **`/dev`** conține fișiere de dispozitiv, deci discul tău chiar apare ca un fișier. **`/proc`** și **`/sys`** nu sunt fișiere reale de pe disc deloc — sunt ferestre pe care kernelul le deschide ca să te uiți în el. Citești un fișier în `/proc` și kernelul generează răspunsul pe loc. Tocmai am bifat încă o dată VFS-ul, direct din filozofia Unix.

Harta completă a acestui arbore, cu tot ce înseamnă fiecare folder, e în [Structura unui sistem Linux](/blog/structura-sistemului-linux/).

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Nu umbla prin /etc fără să știi ce faci</p>
    <p>Configurația stă toată în `/etc`, iar o virgulă scoasă din loc poate strica pornirea. Regula simplă: schimbările se fac cu comenzile din documentația distribuției, nu cu editarea la ghicire. Vezi și [permisiunile](/blog/permisiuni-linux/).</p>
  </div>
</div>

## Distribuția: echipa care asamblează totul

Oprește-te și privește harta. Imaginează-ți că ai descărca, compila și potrivi singur toate piesele de mai sus, plus mii de programe, și să le ții actualizate. Un coșmar. Exact asta rezolvă o **distribuție**: o echipă care alege piesele, le configurează să meargă împreună și le livrează ca un sistem instalabil.

Unealta cu care instalezi și actualizezi programe e **managerul de pachete** — un magazin de aplicații pentru linia de comandă, care se ocupă și de dependențe. Iar distribuțiile vin în familii:

- **Familia Debian** — pachete `.deb`, unealta `apt`. Debian e faimos pentru stabilitate, iar Ubuntu, construit peste el, a făcut Linux prietenos pentru milioane de utilizatori. Mint și Pop!_OS au crescut din Ubuntu.
- **Familia Red Hat** — pachete `.rpm`, unealta `DNF`. Fedora e distribuția comunității care merge înainte, RHEL e versiunea plătită, cu suport lung, pentru companii.
- **Arch** — `pacman`, *rolling release*: fără mari actualizări de versiune, actualizezi continuu. Minimal, îl asamblezi tu, cu AUR-ul comunității peste.
- **Alpine** — `APK`, minuscul, construit pe musl și BusyBox — atât de popular încât îl vezi des în lumea containerelor.

Practic, „ce Linux să folosesc?" înseamnă „ce familie, ce manager de pachete, ce stil de actualizare". Dedesubt, același kernel. Detaliile: [Un ocean de distribuții](/blog/un-ocean-de-distributii/) și [Ghidul de alegere](/blog/alege-distributia/).

## Fereastra ta: X11/Wayland, compozitorul și desktop-ul

Tot ce am parcurs până aici funcționează **fără un singur pixel de grafică** — exact așa rulează majoritatea serverelor. Dar un desktop are nevoie de ferestre și cursor desenate pe ecran: asta e treaba **serverului de display**.

Timp de decenii, răspunsul a fost **X11** (X Window System, din 1987). E flexibil, dar vine cu bagaje din altă epocă — de exemplu, orice aplicație putea asculta ce tastezi în alta. Înlocuitorul modern e **Wayland** (din 2008), unde serverul de display și managerul de ferestre se unesc într-un singur program numit **compositor**, iar aplicațiile sunt izolate între ele. Distribuțiile mari — Fedora, Ubuntu — folosesc azi Wayland implicit, iar un strat de compatibilitate numit **XWayland** ține vechile aplicații în viață. Comparația se poartă mai departe în [DE sau WM?](/blog/de-sau-wm/).

Serverul de display poate desena ferestre, dar nu-ți dă bara de activități, un manager de fișiere sau un wallpaper. Astea sunt treaba **mediului desktop** — și aici devine Linux distractiv, pentru că ți-l alegi tu:

- **GNOME** — curat și minimalist, implicit pe Ubuntu și Fedora
- **KDE Plasma** — regele personalizării: dacă vrei să ajustezi ceva, există o setare pentru asta
- **Xfce** — ușor, ideal pentru hardware vechi
- **Cinnamon** — familiar dacă vii de pe Windows

Sau mai gras, cu un window manager în mozaic: i3 pe X11, Hyprland și Sway pe Wayland. **Idee-cheie:** pe Windows sau macOS, desktop-ul e sudat de sistemul de operare. Pe Linux e doar încă un strat, pe care-l poți schimba.

## Aplicațiile: Flatpak, Snap și AppImage

În vârf, în sfârșit, sunt aplicațiile tale: navigatoare, editoare, jocuri. Dar dacă fiecare distribuție ambalează aplicațiile altfel, dezvoltatorii ar trebui să le construiască de multe ori. Așa au apărut formatele universale:

- **Flatpak** — ambalează aplicația cu ce-i trebuie și o rulează într-o sandbox; **Flathub** e magazinul de referință.
- **Snap** — făcut de Canonical (compania din spatele Ubuntu), integrat în Ubuntu.
- **AppImage** — un singur fișier: îl descarci, îl faci executabil, îl rulezi. O aplicație, orice distribuție.

Detalii practice în [Cum instalezi programe fără magazin](/blog/instalare-programe-fara-magazin/).

## Recapitularea hărții

Mergem o dată peste tot, de jos în sus:

**hardware** → trezit de **firmware** (BIOS/UEFI) → predă lui **GRUB**, care încarcă **kernelul** și **initramfs** → kernelul e Linux: apeluri de sistem, drivere, programator, memorie virtuală, VFS → pornește **PID 1**, de obicei **systemd** → deasupra stau **uneltele GNU** și **libc** → vorbești cu ele prin **shell**, într-un **terminal**, iar totul e organizat într-un singur arbore de fișiere de la `/` → **distribuția** le împachetează cu un **manager de pachete** (apt, dnf, pacman, apk) → pentru grafică, **X11 sau Wayland**, apoi un **desktop** ca GNOME sau KDE, și în sfârșit **aplicațiile tale**, uneori în Flatpak sau Snap.

Ține minte grămadă de cuvinte de la început? Fiecare are acum o casă.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pasul tău următor</p>
    <p>Deschide un terminal și scrie <code>ls /</code> — vei vedea chiar stratul 8 al hărții. Apoi intră în <a href="/blog/glosar-linux/">Glosar</a> și caută orice termen din acest articol: fiecare are definiția lui, pe scurt.</p>
  </div>
</div>

Următorul pas logic: [Linux este miezul (kernel)](/blog/linux-este-miezul-kernel/) — stratul din mijloc, explicat pe îndelete.
