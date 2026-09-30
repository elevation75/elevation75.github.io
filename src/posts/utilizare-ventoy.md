---
title: "Cum creezi un stick USB multiboot cu Ventoy: Linux și Windows pe un singur stick"
description: "Ghid pas cu pas Ventoy: instalezi utilitarul o singură dată, copiezi imaginile ISO direct pe stick și le alegi din meniul de pornire — Linux și Windows pe același stick USB."
date: 2026-09-29
category: Instalare
cover:
  webp: /assets/img/cover-ventoy.webp
  jpg: /assets/img/cover-ventoy.jpg
  alt: "Un stick USB conectat la un laptop cu meniul Ventoy afișat pe ecran"
---

Dacă ai încercat vreodată să instalezi un sistem de operare de pe un stick USB, probabil cunoști scenariul clasic: descarci imaginea ISO, o scrii pe stick cu un utilitar precum Rufus sau balenaEtcher, aștepți 10–15 minute, iar pentru următoarea distribuție o iei de la capăt — și tot ce aveai pe stick dispare.

Aici intervine **Ventoy**, un instrument open source care schimbă complet regulile jocului. Cu Ventoy instalezi utilitarul pe stick **o singură dată**, iar apoi e suficient să **copiezi fișierele ISO direct pe stick (drag-and-drop)**, ca pe un stick obișnuit de date.

## De ce este Ventoy cea mai bună soluție?

Spre deosebire de metodele tradiționale, care extrag fișierele ISO pe partiție în timpul scrierii, Ventoy păstrează imaginile întregi și creează un meniu inteligent la pornirea calculatorului.

- **Multiboot real:** poți păstra simultan imagini Windows 10/11, Ubuntu, Linux Mint, Fedora, Arch Linux sau chiar utilitare de rezervă (cum ar fi SystemRescue).
- **Nu mai rescrii stick-ul:** vrei o distribuție nouă? Descarci fișierul `.iso` și îl copiezi pe stick. Vrei să scapi de una veche? Îl ștergi, ca pe orice fișier.
- **Spațiu rămas utilizabil:** stick-ul își păstrează funcția obișnuită — Ventoy folosește doar zona de boot, iar partiția de date rămâne a ta. Poți stoca în continuare poze, documente și alte fișiere alături de ISO-uri.
- **UEFI și Legacy BIOS:** funcționează pe calculatoare vechi și noi, cu ambele stiluri de partiție (MBR și GPT) și cu suport pentru Secure Boot. Nici ISO-urile mai mari de 4 GB nu mai sunt o problemă.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">De ce spațiu ai nevoie?</p>
    <p>Un stick USB de 32 GB sau 64 GB este ideal. Îți permite să ții pe el un ISO de Windows 11 (~5–6 GB), 2–3 distribuții Linux (câte 2–4 GB fiecare) și îți rămâne destul spațiu și pentru date personale.</p>
  </div>
</div>

## Pasul 1: Descărcarea și instalarea Ventoy pe stick

1. Introdu stick-ul USB în calculator și salvează eventualele fișiere importante de pe el — **prima instalare formatează stick-ul**.
2. Descarcă cea mai recentă versiune **Ventoy** de pe [site-ul oficial](https://www.ventoy.net/en/download.html) (`ventoy-x.xx.x-windows.zip`, sau arhiva echivalentă pentru Linux).
3. Dezarhivează fișierul și deschide aplicația `Ventoy2Disk.exe`.
4. Selectează stick-ul tău USB din lista derulantă — verifică de două ori că e dispozitivul corect.
5. Apasă butonul **Install** și confirmă cele două avertismente legate de formatare.

În Linux poți face același lucru din terminal:

```bash
# înlocuiește /dev/sdX cu dispozitivul stick-ului (lsblk te ajută să-l găsești)
sudo ./Ventoy2Disk.sh -i /dev/sdX
```

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Ai grijă ce dispozitiv alegi</p>
    <p>La linia de comandă, <code>/dev/sdX</code> trebuie să fie stick-ul, <strong>nu discul principal</strong> al calculatorului — un asemenea gest aici înseamnă date șterse pe loc. Rulează <code>lsblk</code> înainte și compară mărimea dispozitivului cu cea a stick-ului.</p>
  </div>
</div>

## Pasul 2: Adăugarea imaginilor ISO (Linux și Windows)

După finalizarea instalării, stick-ul tău își va schimba numele în *Ventoy*. Din acest moment, magia începe:

1. Descarcă imaginile ISO pe care vrei să le ai la îndemână (de exemplu `ubuntu-26.04-desktop-amd64.iso`, `Win11.iso`, `linuxmint-cinnamon.iso`).
2. Deschide stick-ul USB în File Explorer (Windows) sau în File Manager (Linux).
3. Copiază (sau mută) fișierele ISO direct pe stick.

Poți chiar să creezi dosare pentru a le organiza (de exemplu un folder `/Linux` și un folder `/Windows`), iar Ventoy le va detecta și le va afișa structurat în meniu. Imaginile rămân întregi — nu trebuie extrase nicăieri.

## Pasul 3: Pornirea de pe stick și selectarea sistemului

Când vrei să instalezi un sistem sau să testezi o distribuție în mod live:

1. Introdu stick-ul în calculatorul țintă și repornește-l.
2. Apasă tasta pentru **Boot Menu** (F12, F11, F8 sau Esc, în funcție de placa de bază — uită-te după mesajul care apare o fracțiune de secundă la pornire).
3. Selectează stick-ul USB, alegând varianta **UEFI** dacă ți se propune.
4. Se afișează meniul Ventoy, cu toate imaginile ISO copiate pe stick.
5. Alege distribuția dorită folosind săgețile și apăsând **Enter**.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Instalezi sau doar încerci?</p>
    <p>Majoritatea distribuțiilor pornesc direct în varianta <strong>live</strong> („încearcă fără instalare"), de unde poți deschide apoi instalatorul — exact cum procedează și [ghidul de instalare Ubuntu](/blog/cum-instalezi-ubuntu/). Așa vezi dacă îți merge hardware-ul înainte să atingi vreun disc.</p>
  </div>
</div>

## Concluzie

Ventoy este un instrument indispensabil pentru orice pasionat de tehnologie, administrator de sistem sau utilizator care vrea să exploreze lumea Linux fără bătăi de cap. Cu un singur stick USB de capacitate medie, ai la tine o întreagă trusă de scule digitale, pregătită pentru orice situație — de la testarea unei distribuții noi până la recuperarea datelor sau reinstalarea Windows-ului.

Dacă vrei în schimb un ghid pas cu pas pentru instalarea unui singur sistem, începe de la [Ghidul de instalare Ubuntu](/blog/cum-instalezi-ubuntu/), iar pentru alegerea distribuției potrivite, [Ghidul complet de instalare Linux](/blog/alege-distributia/).

---

<em>Funcțiile Ventoy din acest articol sunt preluate din <a href="https://www.ventoy.net/">documentația oficială Ventoy</a> (proiect open source).</em>
