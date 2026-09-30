---
title: "Unix + Linus = Linux"
description: "Povestea numelui: cum a cumpărat Linus Torvalds un PC cu procesor 386, cum a apărut „Freax” și de ce s-a numit, până la urmă, Linux."
date: 2023-02-18
updated: 2024-09-24
category: Inițiere
cover:
  webp: /assets/img/cover-unix-linus.webp
  jpg: /assets/img/cover-unix-linus.jpg
  alt: "Copertă generată pentru articolul Unix + Linus = Linux"
---

Numele „Linux” a fost dat de creatorul său, Linus Torvalds, în 1991, când a început să dezvolte acest sistem de operare open-source.

## Primul computer al lui Linus

În ianuarie 1991, Linus și-a cumpărat primul computer de la un magazin local care asambla computere din piese. PC-ul avea un procesor 386, care era relativ elegant la acea vreme, deoarece Linus dorea să exploreze multitasking-ul. De asemenea, din moment ce venea de la un Sinclair QL cu un procesor Motorola 68008 pe 32 de biți, a vrut un procesor pe 32 de biți și nu a vrut să renunțe la unul pe 16 biți, așa că un 286 nu era o opțiune. Primul PC al lui Linus avea 4 megaocteți de memorie RAM și un hard disk. A primit o copie a jocului Prince of Persia, care i-a ocupat cea mai mare parte din timpul liber pentru următoarele două luni. Mai târziu a cumpărat și o copie a MINIX, pentru că după ce a folosit Unix la universitate, și-a dorit așa ceva și acasă.

## Cum s-a născut numele

În august 1991, Linus a menționat noul său nucleu în [public pentru prima dată](https://en.wikipedia.org/wiki/History_of_Linux#The_creation_of_Linux), în grupul de știri comp.os.minix. Aceasta a inclus expresia „Eu fac un sistem de operare (gratuit) (doar un hobby, nu va fi mare și profesionist ca GNU)”. Atâta smerenie.

Sistemul a fost inițial numit Freax. Câteva săptămâni mai târziu, Linus i-a cerut lui Ari Lemmke, unul dintre administratorii [ftp.funet.fi](http://ftp.funet.fi), să facă o încărcare a primei arhive tar. Ari a ales numele Linux. Linus a decis să-i schimbe numele în Linux, care a fost o alegere mai simplă și mai ușor de reținut pentru utilizatori.

Versiunea inițială conține încă numele original încorporat într-unul dintre [fișierele sursă](https://elixir.bootlin.com/linux/0.01/source/kernel/Makefile) (vezi imaginea de mai jos).

{% image "unix-makefile", "Fragment din fișierul Makefile al primei versiuni de Linux", "În fișierele sursă ale versiunii 0.01 se mai vede urma lui „Freax”." %}

## Licența: de la interzis la GNU GPL

Primele versiuni de Linux au folosit o licență care interzicea utilizarea comercială. Unii dintre primii contribuitori au sugerat o modificare a unei licențe pentru software gratuit. În toamna anului 1991, Richard Stallman a vizitat Finlanda și l-a dus pe Linus la o conferință susținută de Stallman. Aceasta, presiunea contribuitorilor și sâcâiala mea l-au convins în cele din urmă pe Linus să aleagă în schimb licența GNU GPL, la începutul anului 1992.

## Memoria virtuală și dezbaterea cu Tanenbaum

În vacanța de Crăciun, Linus a implementat memoria virtuală în Linux. Acest lucru a făcut din Linux un sistem de operare mult mai practic pe mașini ieftine, cu puțină memorie.

Anul 1992 a început cu celebra [dezbatere cu Andrew Tanenbaum](https://en.wikipedia.org/wiki/Tanenbaum%E2%80%93Torvalds_debate), care este profesor universitar și autorul cărții MINIX. Avea câteva păreri despre Linux și arhitectura lui. Linus avea păreri despre MINIX. Dezbaterea a fost descrisă ca un război cu flăcări, dar a fost de fapt destul de civilă în retrospectivă.

Mai important pentru succesul viitor al Linux a fost că sistemul X11 a fost portat la acesta, făcând din 1992 anul desktop-ului Linux.

## Primele distribuții

Prima distribuție Linux a fost începută tot în 1992: [Softlanding Linux System](https://en.wikipedia.org/wiki/Softlanding_Linux_System) sau SLS. În anul următor, SLS s-a transformat în Slackware, ceea ce l-a inspirat pe Ian Murdock să înceapă Debian în 1993, pentru a explora o structură de dezvoltare mai bazată pe comunitate. Au urmat câteva alte distribuții în anii următori.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pe scurt</p>
    <p>Din două fire care scriau litere A și B pe ecran a ieșit un sistem care rulează pe fiecare continent, în orbită și pe Marte. Numele l-a ales un administrator de FTP, nu Linus.</p>
  </div>
</div>

## Astăzi

În 1991, Linus a scris că Linux „nu va fi mare și profesionist ca GNU”. În 2024, Linux rulează pe fiecare continent, pe miliarde de dispozitive, pe orbită și chiar și pe Marte. Nu e rău pentru ceea ce a început ca două fire care scriau fluxurile A și B pe ecran.

Linux a devenit unul dintre cele mai populare și influente sisteme de operare din lume, fiind utilizat pe o varietate largă de dispozitive și echipamente, de la telefoane mobile și routere până la servere și supercomputere.

Citește mai departe: [Puțină istorie](/blog/putina-istorie/) — ce s-a întâmplat cu Linux-ul din 1991 până astăzi, pe ani.
