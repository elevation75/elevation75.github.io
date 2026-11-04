---
title: "Xorg vs Wayland: diferențele dintre serverele grafice, explicate pe înțelesul tău"
description: "Cine desenează ferestrele în Linux și de ce se schimbă de la Xorg la Wayland: securitate, performanță, XWayland, cine implementează ce — plus noul Xlibre."
date: 2026-11-04
category: Inițiere
cover:
  webp: /assets/img/cover-xorg-wayland.webp
  jpg: /assets/img/cover-xorg-wayland.jpg
  alt: "Diagramă comparativă Xorg (vechi, clasic) și Wayland (nou, modern), cu diferențele cheie"
---

Miști mouse-ul și fereastra se mișcă. Dar **cine** a desenat-o acolo, de fapt? Nu tu, nu browserul, nu Windows-ul din interiorul Linux-ului. E un program special, în spatele tuturor, pe care nu-l vezi niciodată — și povestea lui e una dintre cele mai interesante din lumea Linux: trecerea de la **Xorg** la **Wayland**.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Cum se citește articolul</p>
    <p>E o poveste în ordine: de unde vine X11, de ce a îmbătrânit, ce aduce Wayland în locul lui și unde suntem azi. Nu trebuie să ai citit nimic altceva — dacă vrei totuși context mai larg, <a href="/blog/harta-linux/">Harta Linux</a> îți arată unde se așază aceste piese în ansamblu.</p>
  </div>
</div>

## Cine desenează ferestrele tale?

Într-un sistem Linux există o piesă al cărei singur rol e să **pună pixeli pe ecran** și să **citească ce apesezi**: se numește **server de display**. El ține ferestrele, cursorul, tastatura, mișcarea lor — tot ce ține de „a vedea și a atinge".

Până de curând, acel rol l-a avut un singur proiect, **X11** și implementarea lui de pe Linux, **Xorg**. Azi îl preia treptat altul: **Wayland**. Restul articolului e despre diferența dintre ele — și despre un al treilea nume care a apărut recent: **Xlibre**.

## X11: nașterea feștreelor (1984)

În **1984**, o echipă de la **MIT** a construit **X Window System** (prescurtat **X11**). A fost primul strat care a permis calculatoarelor Unix să aibă ferestre, meniuri și cursor — până atunci era doar text pe fundal negru.

Și a fost o idee genială, foarte specifică epocii sale: **X11 a fost conceput să funcționeze pe rețea**. puteai rula o aplicație pe calculatorul din camera alăturată și să o vezi pe al tău. Pentru 1984, asta era uluitor — și a rămas o caracteristică valabilă mult timp după aceea.

Exact de aici vine și arhitectura lui complicată: ca să meargă peste rețea, X11 a construit un **server central** care făcea tot desenul, vorbea cu hardware-ul, cu aplicațiile și cu tot ce era între ele. Aplicația ta nu desena butonul direct — **trimitea o cerere serverului X**, iar serverul se ocupa el. Gândește-te la un polițist de trafic din mijlocul intersecției: toate mașinile trec prin el, indiferent unde merg.

## Xorg: X11-ul care a ajuns standard

**Xorg** e implementarea **open source** a lui X11, cea care a devenit standardul pe desktopurile Linux. Dacă ai rulat Ubuntu, Fedora sau Debian cu ani în urmă, Xorg era cel care îți ținea ecranul. Practic, „Xorg" = „X11" în viața de zi cu zi.

Doar că Xorg **a moștenit toată complexitatea designului din 1984**: cod pe care nu-l mai înțelegea complet nimeni, găuri de securitate și blocaje de performanță greu de reparat fără să strice tot restul. Cu anii, desktopurile au devenit tot mai pretențioase — efecte, animații, accelerare pe GPU — iar arhitectura veche a început să scârțâie sub presiune.

## Problema: securitatea din 1984

Un exemplu concret spune mai mult decât orice teorie.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Problema din 1984</p>
    <p>În Xorg, <strong>orice aplicație poate asculta ce tastezi în orice altă aplicație</strong> — managerul de parole, terminalul tău. Un program rău intenționat putea spy-ui tastele din tot sistemul. De ce? Pentru că în designul X11, fiecare fereastră poate asculta evenimentele de input ale tuturor celorlalte. În 1984 se presupunea încredere; azi e o problemă serioasă de securitate.</p>
  </div>
</div>

## Compozitorul: stratul care crea bătăi de cap

Pe desktopurile moderne există un **compozitor** — piesa care adaugă efectele vizuale: animații netede, transparențe, umbre de ferestre. În Xorg, compozitorul era **un strat separat, pus peste serverul X**. Deci calea pixelului arăta așa:

**aplicație → server X → compozitor → înapoi în server X → ecran**

Destul de multe drumuri. Asta producea **tearing** (ferestre rupte la derulare), **lag** și complexitate inutilă — serverul X făcea o muncă pe care compozitorul urma să o refacă oricum. Cu anii, reparațiile peste reparații au adunat un cod pe care nimeni nu mai îndrăznea să-l atingă serios: dacă schimbai ceva într-un loc, se strica altceva în altul.

## Wayland: o luăm de la capăt (2008)

În **2008**, un dezvoltator pe nume **Kristian Høgsberg** — care lucra chiar la Xorg — s-a întrebat: *ce-ar fi dacă am lua-o de la capăt, pentru hardware-ul, securitatea și performanța de azi?* Așa s-a născut **Wayland**.

Și aici e cheia întregii povești: **Wayland e un protocol, nu un produs**. Nu e un program pe care îl instalezi, ci **o modalitate nouă prin care aplicațiile și sistemul grafic vorbesc între ele**. Analogia clasică: **HTTP e protocolul, iar Apache sau Nginx sunt serverele care îl implementează**.

Ce elimină Wayland? **middleman-ul**. Nu mai există server X separat în mijloc: **compositorul Wayland e serverul de display**. Vorbesc direct cu GPU-ul, direct cu intrările, direct cu aplicațiile. Aplicația trimite un cadru, compozitorul îl pune pe ecran. Curat, simplu, rapid.

## Securitatea și performanța

**Securitatea** e acolo unde Wayland strălucește. În Xorg, orice aplicație putea asculta tastatura alteia; în Wayland, **fiecare aplicație e izolată**. Managerul tău de parole vede doar evenimentele care i se cuvin — nicio altă aplicație nu-ți poate intercepta tastele, nu poate face screenshot-uri peste alte programe și nu poate injecta input fals. Izolarea e **însuși protocolul**, nu un plasture pus peste el.

La **performanță**, compozitorul controlează direct GPU-ul, intrările și întregul lanț de randare. Un detaliu inteligent: **damage tracking** — se redesenează **doar partea de ecran care chiar s-a schimbat**. GPU-ul muncește mai puțin, bateria ține mai mult, animațiile sunt fluide. Fără tearing la derularea unei pagini, fără clipire la apariția unei ferestre.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pe scurt: de ce contează</p>
    <p>Xorg dădea <strong>flexibilitate și compatibilitate</strong>, dar la prețul securității și al unui drum lung al pixelului. Wayland dă <strong>izolare și randare curată</strong>, dar cere ca fiecare desktop să-și scrie propria implementare.</p>
  </div>
</div>

## Cine implementează Wayland?

Pentru că Wayland e doar protocol, **cine îl construiește?** Depinde de mediul desktop:

- **Mutter** — compozitorul Wayland al GNOME (deci al Ubuntu, Fedora)
- **KWin** — cel al KDE Plasma
- **Sway** — un compozitor standalone, popular pentru tiling
- **Weston** — **implementarea de referință**, cea „din manual": minimală, folosită pentru teste. Dacă dezvoltatorii vor să verifice dacă aplicația lor merge pe Wayland, pornesc de la Weston.

Fiecare echipă de desktop a trebuit să-și **recrie sau adapteze** compozitorul — și a durat ani. De aia tranziția nu s-a făcut peste noapte, deși Wayland există din 2008: nu era suficient ca protocolul să fie gata, trebuiau să fie gata și programele care îl implementează.

Asta înseamnă și că **alegerea ta de desktop decide ce compozitor rulezi**. Dacă folosești GNOME, rulezi Mutter; dacă KDE Plasma, KWin. Nu ai de ales direct „Xorg sau Wayland" dintr-un meniu de setări — alegi mediul desktop, iar el vine cu implementarea lui.

## XWayland: puntea pentru aplicațiile vechi

Există **milioane de aplicații X11**: jocuri, unelte de productivitate, programe creative. Toate știu să vorbească cu un server X și **n-au auzit niciodată de Wayland**.

Răspunsul e **XWayland** — practic un **mini server X care rulează în interiorul Wayland** și **traduce** cererile X11 în comenzi Wayland. Aplicațiile vechi merg, doar că trec printr-un strat de traducere. Detalii despre el ai în [Glosarul de termeni](/blog/glosar-linux/#xwayland).

## Unde suntem azi

Distribuțiile mari au făcut comutarea: **Fedora** a trecut pe Wayland implicit de prin **2016**, **Ubuntu** în **22.04**, iar GNOME pe Wayland e considerat stabil și complet. Chiar și **Nvidia**, care s-a împotrivit ani de zile din cauza complexității driverelor, are azi suport Wayland solid. S-a întors decisiv barca.

Practic, dacă instalezi azi o distribuție modernă, **intri pe Wayland fără să faci nimic** — e varianta implicită, iar Xorg rămâne acolo, disponibil la ecranul de login, pentru cazurile în care ai nevoie de el.

Dar Wayland nu e perfect:

- **partajarea de ecran** în aplicațiile vechi de videoconferință poate fi complicată fără portalul potrivit
- unele **unelte pentru jocuri** și **metode de introducere a textului** au încă cazuri-limită
- **remote desktop** peste Wayland e încă în maturizare

Nu sunt motive de blocare pentru majoritatea, dar unii utilizatori avansați preferă încă Xorg acolo unde compatibilitatea contează mai mult decât modernitatea.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">📝</span>
  <div>
    <p class="callout-title">Ce sunt portalurile?</p>
    <p>Când o aplicație vrea să partajeze ecranul pe Wayland, nu poate pur și simplu să citească display-ul — trebuie să ceară voie printr-un mecanism numit <strong>portal (XDG Desktop Portal)</strong>. E prețul izolării: dacă nimeni nu poate privi în ferestrele altuia, fiecare dorință trece printr-o cerere formală.</p>
  </div>
</div>

## Cum vezi ce rulezi

Cel mai simplu test: deschide un terminal și scrie:

```bash
echo $XDG_SESSION_TYPE
```

Îți va răspunde **`wayland`** sau **`x11`**. Pe sistemele moderne vezi `wayland`; dacă vezi `x11`, ești pe Xorg.

Poți alege și la **ecranul de login**: majoritatea distribuțiilor îți permit să selectezi sesiunea Wayland sau Xorg chiar înainte să te autentifici (de obicei prin pictograma din colțul ecranului de login).

## Xlibre: al treilea actor

Povestea nu se termină doar cu „Xorg vs Wayland". În **iunie 2025** a apărut **Xlibre** — un **fork al serverului X.Org**, pornit de dezvoltatorul **Enrico Weigelt**.

Ideea din spate: Xorg-ul clasic stătea de mult pe loc, cu cod îmbătrânit și contribuții care așteptau la ușă. Xlibre a venit cu o **curățare masivă de cod** plus funcții noi, printre care **repornirea suportului pentru driverele Nvidia mai vechi** (340, 390, 470), care fuseseră abandonate. Se compilează pe **BSD, Linux, macOS și Windows**.

Au urmat versiunile **25.0** (iunie 2025) și **25.1** (2026, cu peste **1500 de commit-uri** și corecturi de securitate). Ca adoptare: **OpenMandriva** și **Artix Linux** îl folosesc ca server X implicit, există pachete pentru **Arch** și un repo pentru **Fedora**.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Ce înseamnă asta pentru tine</p>
    <p>Xlibre nu înlocuiește Wayland — rămâne în lumea X11. E varianta modernizată a <strong>vechiului</strong> server, pentru cei care au nevoie de compatibilitatea lui. Deci harta are acum trei drumuri: <strong>Xorg</strong> (moștenirea), <strong>Xlibre</strong> (moștenirea reînnoită) și <strong>Wayland</strong> (prezentul).</p>
  </div>
</div>

## Recapitularea: veteranul și arhitectul

Mergem o dată peste tot:

**X11** (1984, MIT) → conceput pentru rețea, cu un server central → **Xorg**, implementarea lui standard pe Linux → **probleme**: orice aplicație asculta tastatura oricăreia, compozitorul separat creștea tearing-ul și lag-ul → **Wayland** (2008) → **protocol, nu produs**, fără middleman → compozitorul e serverul → **izolare în protocol** + **damage tracking** → implementări: **Mutter, KWin, Sway, Weston** → **XWayland** ține aplicațiile vechi în viață → azi, Fedora și Ubuntu merg pe Wayland implicit → și **Xlibre**, din 2025, reînnoiește partea veche.

**Xorg e veteranul** — 40 de ani de compatibilitate, milioane de aplicații, fiabilitate în cazurile particulare. **Wayland e arhitectul** — proiectat pentru securitatea, performanța și hardware-ul de azi. **Nu sunt dușmani: coexistă**, iar Wayland chiar rulează aplicațiile Xorg prin XWayland.

Data viitoare când fereastra ta se mișcă lin pe ecran, sau când parola rămâne în siguranță de programele rău intenționate — ai șanse mari ca Wayland să lucreze în liniște în spate. E una dintre cele mai importante modernizări din istoria desktopului Linux, și se întâmplă chiar acum, pe mașina ta.

Următorul pas logic: [DE sau WM?](/blog/de-sau-wm/) — dacă vrei să înțelegi stratul de deasupra, mediile desktop — sau [Glosarul de termeni](/blog/glosar-linux/), dacă vrei să revezi vreun cuvânt din acest articol.
