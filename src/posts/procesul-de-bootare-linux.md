---
title: "Procesul de bootare Linux: de la butonul de power până la desktop"
description: "Ce se întâmplă în cele 10–30 de secunde când pornești un calculator Linux: POST, GRUB, kernelul, initramfs, systemd, țintele, display manager-ul și sesiunea ta — pas cu pas."
date: 2026-11-04
category: Inițiere
cover:
  webp: /assets/img/cover-procesul-bootare.webp
  jpg: /assets/img/cover-procesul-bootare.jpg
  alt: "Diagramă cu etapele procesului de bootare Linux"
---

Apesi butonul de power, ecranul clipocesc puțin, trec niște texte pe care nu apuci să le citești — și desktop-ul e acolo. În cele 10–30 de secunde s-a întâmplat unul dintre cele mai bine orchestrat lucruri din calculatorul tău: un pas a predat altuia, fără greșeală, iar tu nu ai văzut nimic.

[Articolul Harta Linux](/blog/harta-linux/) ți-a arătat **ce** e fiecare strat. Aici vedem **în ce ordine** se trezesc și **ce predă fiecare pas** celui următor — plus detaliile pe care harta le lăsa deoparte: verificarea POST, țintele systemd, serviciile care pornesc în paralel, ecranul de login și sesiunea ta.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Cum se citește articolul</p>
    <p>Fiecare capitol e un pas din lanț, în ordinea în care se întâmplă. Unde un pas a fost deja descris pe îndelete în „Harta Linux", scrie doar un link — nu repetăm, mergem mai departe la partea nouă.</p>
  </div>
</div>

## De ce contează cele 10–30 de secunde

Bootarea e singurul moment în care vezi sistemul de operare **construindu-se de la zero**. Nu pornește „gata făcut": pornește o piesă, care pornește următoarea, care pornește următoarea. Dacă una pică, primești un ecran de eroare — și exact atunci devine util să știi unde te afli în lanț.

În plus, tot ce se întâmplă aici e **transparent și schimbabil**: poți schimba bootloader-ul, poți schimba sistemul de init, poți alege alt desktop. Asta e filozofia Linux — deschis, de înțeles, de modificat.

## Butonul de power: CPU-ul se trezește

Momentul zero: curentul trece prin placa de bază și **CPU-ul se trezește**. Dar CPU-ul nu știe încă nimic: nu știe de Linux, nu știe că ai un SSD, nu știe ce să facă. Știe un singur lucru — să meargă la o **adresă anume din memorie**, unde sunt stocate primele instrucțiuni.

Acele instrucțiuni vin de pe un cip special de pe placa de bază: **BIOS** pe calculatoarele vechi, **UEFI** pe aproape orice PC modern. Ce sunt și cu ce se deosebesc, ai deja descris în [Harta Linux, secțiunea despre firmware](/blog/harta-linux/#primul-strat-hardware-ul-si-firmware-ul).

## POST: verificarea de sănătate

Primul lucru serios pe care îl face firmware-ul se numește **POST** — *Power-On Self-Test*, verificarea de la pornire. Gândește-te la un paznic care ajunge primul dimineață și bate în fiecare ușă:

- memoria RAM e în regulă?
- procesorul răspunde?
- tastatura e conectată?
- monitorul dă semnal?

Dacă totul trece, firmware-ul dă „ok" și trece la pasul următor. Dacă **nu** trece, auzi **beep codes** — niște bipuri codificate — sau vezi un mesaj de eroare pe ecran. E singurul moment în care calculatorul îți spune direct „aici e problema", înainte ca măcar un sistem de operare să ruleze.

Pe sistemele vechi, POST-ul e treaba BIOS-ului clasic. Pe cele noi, UEFI face același lucru, dar în plus oferă interfață grafică, discurs rapid, suport pentru discuri mari și funcția **Secure Boot**, care verifică semnătura bootloader-ului înainte să-l ruleze. Detaliile despre cele două sunt în [Glosar: BIOS și UEFI](/blog/glosar-linux/#uefi-efi).

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Ai auzit de beep codes?</p>
    <p>Un bip scurt și repetat de obicei înseamnă „totul e în regulă", în timp ce bipuri lungi sau grupate indică probleme cu memoria sau placa video. Dacă PC-ul „vorbește" la pornire, el chiar îți dă un cod de eroare — îl cauți în manualul plăcii de bază.</p>
  </div>
</div>

## De unde pornește: MBR sau partiția EFI

Trecut de verificare, firmware-ul are o singură întrebare: **de unde pornesc un sistem de operare?** Se uită pe disc, dar unde anume depinde de generație:

- pe **BIOS**, citește primii **512 de bytes** ai discului — zona numită **MBR** (*Master Boot Record*). E ca indexul din fața unei cărți: conține doar destul cât să spună „lucrurile serioase sunt mai departe, în locul ăsta".
- pe **UEFI**, caută o **partiție specială EFI** (ESP), unde stau fișierele de pornire.

Ambele au același scop: **găsi bootloader-ul**. Ce e MBR, ce e GPT și ce e partiția EFI ai în [Glosarul de termeni](/blog/glosar-linux/#mbr).

## GRUB: predarea

Aici lucrurile devin interesante: **bootloader-ul**. Pe majoritatea sistemelor Linux se numește **GRUB** — e celebrul meniu în care alegi între Windows, Linux sau „advanced options".

Sarcina lui e scurtă, dar absolut critică: **găsește kernelul pe disc, îl încarcă în memorie și predă controlul**. Atât. GRUB nu „joacă", el doar aduce steaua pe scenă. Întregul mecanism — inclusiv ajutorul numit **initramfs** — e descris în [Harta Linux, secțiunea GRUB](/blog/harta-linux/#grub-si-initramfs-podul-spre-nucleu). Aici mergem mai departe, la ce face kernelul imediat ce primește comanda.

## Kernelul se trezește

Kernelul primește comanda și **pune magazinul în funcțiune**. Primul lucru, poate surprinzător: **se decompresă singur**. Kernelul e stocat comprimat ca să ocupe mai puțin spațiu pe disc — e ca un fișier `.zip` care se desface automat la deschidere.

Apoi, în ordine: inițializează procesorul, **detectează hardware-ul** și pune la punct managementul memoriei. E noul manager care intră în birou și își ia instant inventarul tuturor resurselor.

Ce face kernelul în rest — apelurile de sistem, driverele, programatorul, memoria virtuală, VFS — ai în [Harta Linux, secțiunea Kernelul](/blog/harta-linux/#kernelul-inima-care-stapaneste-hardware-ul). Rămâne o problemă specifică primei porniri, pe care o rezolvă capitolul următor.

## initramfs: oul și găina

Kernelul are o problemă de început: **are nevoie de disc ca să citească de pe disc**. Driverele care vorbesc cu SSD-ul s-ar putea să... fie pe SSD. Oul și găina.

Linux o rezolvă elegant cu **initramfs** — un sistem de fișiere **temporar, mic, care trăiește în RAM**. Kernelul îl încarcă întâi, folosește driverele din el ca să găsească și să monteze discul real, și abia apoi continuă.

Analogia simplă: **cheia de rezervă din portofel**, care deschide ușa unde stau cheile adevărate. Ce e initramfs pas cu pas e în [Harta Linux](/blog/harta-linux/#grub-si-initramfs-podul-spre-nucleu) — și în [Glosar](/blog/glosar-linux/#initramfs).

## Montarea rădăcinii

Cu driverele în regulă, kernelul face ultimul pas material: **montează partiția rădăcină**, cea marcată `/`. Adică atașează stocarea și o face accesibilă — de acum, Linux are la dispoziție toate fișierele lui de sistem: programele, bibliotecile, configurările.

E momentul în care „discul" devine „acasă". Cum arată acel arbore de foldere — `/home`, `/etc`, `/var`, `/proc` — e harta completă în [Structura unui sistem Linux](/blog/structura-sistemului-linux/).

## systemd, PID 1 și fișierele de unități

Ultimul lucru pe care îl face kernelul înainte să predea: **pornește un singur program**, care primește numărul de proces **PID 1**. Pe distribuțiile moderne, acel program e **systemd** — și e părintele tuturor celorlalte procese din sistem. Rolul lui de „primul program" e descris în [Harta Linux, secțiunea systemd](/blog/harta-linux/#systemd-primul-program-care-pornește).

Ce aduce nou aici: **cum știe systemd ce să pornească?** Din **fișiere de unități** — mici instrucțiuni text care descriu fiecare piesă a sistemului: servicii, montări de discuri, socket-uri, ținte. Sunt fișiere obișnuite, pe care le poți citi în `/usr/lib/systemd/system/` — și care fac din systemd ceva configurabil, nu ceva ascuns.

## Țintele: basic → multi-user → graphical

systemd nu pornește totul deodată, ci **țintește etape**, ca niște checkpoint-uri într-o cursă:

1. **`basic.target`** — nucleul sistemului funcționează: serviciile de bază pornite.
2. **`multi-user.target`** — toate serviciile sunt sus, sistemul e gata pentru **mai mulți utilizatori, prin linia de comandă**. Dacă rulezi un server, aici te oprești de obicei.
3. **`graphical.target`** — dacă vrei desktop, se pornește și **serverul de display**.

Asta explică de ce un sistem de operare poate fi „gata" fără să aibă vreodată fereastre pe ecran: `multi-user.target` e deja un sistem complet funcțional.

## Serviciile care pornesc în paralel

Un detaliu care face Linux-ul modern rapid: **serviciile nu pornesc pe rând, ci în paralel**. systemd verifică dependențele (nimic nu pornește înaintea a ce are nevoie) și le lansează pe toate simultan. Trei dintre cele mai importante:

- **udev** — managerul de dispozitive. Detectează tot ce bagi în calculator (stick USB, placă video, tastatură) și încarcă driverul potrivit.
- **NetworkManager** — găsește adresa IP, se conectează la Wi-Fi sau la cablu.
- **journald** — caseta neagră a sistemului: înregistrează tot ce se întâmplă, cu oră și mesaj.

Dacă unul pică, celelalte merg mai departe — și tocmai de asta există [jurnalele](/blog/glosar-linux/#jurnal) din care afli după aceea ce s-a întâmplat.

## Serverul de display

Cu serviciile pornite, pentru desktop mai lipsește un singur lucru: cine **desenează** imaginile pe ecran. Ăsta e treaba **serverului de display** — clasicul X11 sau noul Wayland, cu compozitorul lui.

Nu reiau explicația: o ai deja în [Harta Linux, secțiunea despre fereastră](/blog/harta-linux/#fereastra-ta-x11-wayland-compozitorul-si-desktop-ul). Cu ecranul „desenabil", urmează partea în care intri tu în poveste.

## Display manager: ușa de la intrare

Serverul de display poate desena ferestre, dar **nu știe cine ești**. Pentru asta există **display manager-ul** (numit și *login manager*): **ecranul de login grafic** pe care îl vezi înainte de desktop.

- pe **Ubuntu** ai **GDM** (GNOME Display Manager)
- alte distribuții folosesc **LightDM** sau **SDDM**

Rolul lui e simplu și important: **să te autentifice**. Îți ia numele de utilizator și parola, le verifică în baza de date a utilizatorilor sistemului — și dacă treci, **lansează sesiunea ta de desktop**. E paznicul de la ușa clădirii tale: tastezi parola, apeși Enter, și se deschide.

## Sesiunea ta și D-Bus

Ai trecut de ușă, iar Linux pune pe tine **hainele tale**. În acest moment se încarcă:

- fișierele tale de profil, ca `.bashrc` și `.profile`
- **aplicațiile de start** pe care le-ai setat să pornească singure (chat, clipboard, monitor de sistem)
- **wallpaper-ul**, scurtăturile de tastatură, tema, setările tale

Adică: sistemul nu mai servește „pe oricine", ci **exact pe tine**.

În spate, în timp ce desktop-ul se încarcă, circulă liniștit **D-Bus** — **magistrala de mesaje**. Fără el, componentele n-ar putea să-și vorbească. Bagi un stick USB? **udev** îl detectează, trimite un mesaj prin D-Bus, iar managerul de fișiere se deschide întrebând ce vrei să faci. Dai volumul mai tare? Sistemul audio trimite un mesaje prin D-Bus către interfață. E **sistemul nervos** al desktop-ului tău: o linie liniștită care leagă totul.

## Recapitularea lanțului

Mergem o dată peste tot, în ordinea reală:

**butonul de power** → CPU-ul caută prima instrucțiune → **POST** verifică hardware-ul → se găsește **MBR** sau **partiția EFI** → **GRUB** încarcă **kernelul** → kernelul **se decompresă** și detectează hardware-ul → **initramfs** rezolvă oul și găina → se montează **rădăcina** `/` → pornește **PID 1 (systemd)** → fișierele de unități pornesc **serviciile în paralel** (udev, NetworkManager, journald) → se atinge **`graphical.target`** → **serverul de display** → **display manager-ul** te autentifică → **sesiunea ta** se încarcă, cu **D-Bus** în spate.

Fiecare pas predă altuia, ca într-o ștafetă perfectă. Întregul lanț durează, în mod normal, **între 10 și 30 de secunde** pe hardware modern.

## Încearcă acum

Cel mai bun mod de a înțelege bootarea e să **măsori cum pornește calculatorul tău.**. Deschide un terminal și scrie:

```bash
systemd-analyze
```

Îți arată exact cât a durat fiecare fază: firmware-ul, bootloader-ul, kernelul și spațiul de utilizator. Apoi:

```bash
systemd-analyze blame
```

Primești un **clasament al tuturor serviciilor**, ordonat după cât a durat startarea lor. E exact cum își găsesc pasionații de Linux secundele în plus: găsesc serviciile lente și dezactivează pe cele de care nu au nevoie.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Un raport de performanță pentru pornire</p>
    <p>Dacă ai impresia că „Linux-ul pornește greu", aceste două comenzi îți arată exact unde se duc secundele — în loc să ghicești. Rezultatele se citesc ușor, iar explicațiile sunt în <a href="/blog/terminalul-fara-frica/">Terminalul fără frică</a>.</p>
  </div>
</div>

## Concluzie

Data viitoare când apeși butonul de power, știi ce se întâmplă în acele secunde magice: un paznic verifică totul, un index arată unde stau lucrurile, un ștafet predă kernelul, iar un manager de servicii construiește desktop-ul bucățică cu bucățică — până când apare ecranul tău.

Următorul pas logic: [Harta Linux, strat cu strat](/blog/harta-linux/) — dacă nu ai citit-o încă, acolo e fiecare strat explicat pe îndelete; sau [Glosarul de termeni](/blog/glosar-linux/), dacă vrei să revezi vreun cuvânt din acest articol.
