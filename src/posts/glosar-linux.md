---
title: "Glosar Linux: toți termenii tehnici, explicați pe înțelesul tău"
description: "Dicționarul complet al termenilor folosiți pe blog — ISO, UEFI, ESP, partiții, rolling release, AUR, drivere, DE vs WM sau Timeshift — fiecare explicat simplu, cu exemplu practic și link către articolul în care apare."
date: 2026-10-01
category: Inițiere
cover:
  webp: /assets/img/cover-glosar.webp
  jpg: /assets/img/cover-glosar.jpg
  alt: "Coperta articolului Glosar Linux"
---

Dacă ai citit măcar un ghid de-al nostru, ai dat probabil peste cuvinte ca **ISO**, **UEFI**, **partiție**, **rolling release** sau **tiling** — și poate te-ai oprit o clipă, întrebându-te exact ce înseamnă. Acest articol e făcut pentru momentele acelea.

Am extras **toți termenii tehnici** din articolele blogului și i-am adunat aici, grupați pe teme. Fiecare termen are:

- o **definiție** scurtă, scrisă pe limba unui începător (fără jargon peste jargon);
- un **exemplu practic** — de unde îl știi deja din articolele noastre;
- un **link** către articolul în care apare, dacă vrei să-l vezi la lucru.

Cum funcționează: alege un capitol de mai jos dacă vrei să răsfoiești pe teme, sau sari direct la **[indexul alfabetic](#index-alfabetic)** de la final dacă cauți un termen anume. Dacă ești la început de tot, începe cu [Hai să învățăm Linux](/blog/haideti-sa-invatam-linux/) și revino aici de fiecare dată când un cuvânt te oprește din citit.

## Instalare, imagine ISO și stickuri

Primul capitol acoperă tot ce ține de momentul „descarc, pun pe stick, pornesc" — cuvintele pe care le întâlnești înainte de orice instalare.

<a id="iso"></a>

**ISO (imagine de disc)** — copia perfectă a unui disc întreg, strânsă într-un singur fișier care se termină în `.iso`. Când scriem „descarcă imaginea ISO", e ca și cum ai descărca un CD întreg într-un singur fișier. Îl vezi în toate ghidurile: [Ubuntu](/blog/cum-instalezi-ubuntu/), [Fedora](/blog/ghid-instalare-fedora/), [Zorin OS](/blog/ghid-instalare-zorin/), [EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="stick-usb-bootabil"></a>

**Stick USB bootabil** — un stick de memorie pe care am scris imaginea ISO, astfel încât calculatorul să poată **porne din el** ca și cum ar fi un disc. Stickul obișnuit ține doar fișiere; cel bootabil conține un sistem de operare întreg care se încarcă fără să atingă Windows-ul. Vezi [ghidul de instalare Mint](/blog/ghid-instalare-linux-mint/).

<a id="mediu-live"></a>

**Mediu live (sesiune live, live USB)** — sistemul de operare care **rulează direct de pe stick**, fără să instalezi nimic pe disc. E ca o probă: testezi WiFi-ul, sunetul și ecranul, iar când închizi, calculatorul rămâne exact cum era. Cele mai multe ghiduri încep cu „stai puțin în live înainte să instalezi" — de exemplu [în ghidul Pop!_OS](/blog/ghid-instalare-popos/).

<a id="ventoy"></a>

**Ventoy** — un program care transformă un singur stick într-o cutie cu mai multe sisteme de operare: pui 5-10 imagini ISO pe el și alegi la fiecare pornire de care vrei să pornești. Nu trebuie rescris stickul de fiecare dată. Are propriul articol: [Utilizare Ventoy](/blog/utilizare-ventoy/).

<a id="multiboot"></a>

**Multiboot** — ideea din spatele lui Ventoy: **mai multe sisteme pe același stick** (Windows, Linux, unelte de rezervă). Termenul apare în [ghidul Ventoy](/blog/utilizare-ventoy/) și în [alegerea distribuției](/blog/alege-distributia/).

<a id="mod-dd"></a>

**Mod DD (scriere brută)** — modul în care un program copiază imaginea ISO **bucată cu bucată, pe disc**, fără să adauge nimic. Față de scrierea ca fișier, ISO-ul rămâne identic cu originalul, deci stickul pornește sigur. Rufus îți cere explicit alegerea asta ([ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="dd"></a>

**`dd`** — comanda clasică de terminal care face exact treaba de mai sus: scrie o imagine pe un disc. E puternică și, dacă greșești discul, șterge tot — motiv pentru care începătorii primesc mereu avertismentul „verifică de două ori înainte de Enter". Apare în [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="sincronizare"></a>

**Sincronizare („așteaptă 10 minute")** — după ce bara de progres ajunge la capăt, stickul primește **încă date în memorie** câteva minute. Dacă îl scoți prea devreme, imaginea rămâne incompletă și stickul nu va mai porni. De asta insistăm în ghiduri: [scoate stickul abia după ce se opresc luminile](/blog/ghid-instalare-zorin/).

<a id="verificarea-mediei"></a>

**Verificarea mediei** — testul pe care unele sisteme îl fac la prima pornire, comparând conținutul stickului cu originalul ISO. Durează un pic în plus, dar prinde exact stickurile stricate care ar pica instalarea pe la jumătate. E recomandată [în ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="unelte-de-stick"></a>

**Unelte de scris pe stick** — programul care pune ISO-ul pe stick: **Rufus** (Windows, cel mai folosit de noi), **Etcher / balenaEtcher** (grafic, pe orice sistem), **USBWriter**, **USBImager**, **EtchDroid**, **GNOME Disks** și **USB Image Writer** (Linux), **Popsicle** și **Suse Image Writer**. Unele programe sunt de evitat (UNetbootin, Universal USB Installer) — lista completă e în [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="distrowatch"></a>

**DistroWatch** — un site care listinghează și compară sute de distribuții, cu statistici de popularitate. Bun pentru curiozitate, însă popularitatea de acolo nu înseamnă automat „cea mai bună pentru tine" — vezi [Un ocean de distribuții](/blog/un-ocean-de-distributii/).

## Pornire, firmware și bootloader

Al doilea capitol e despre primele secunde după ce apeși butonul de pornire — acolo unde se decide dacă pornește Windows-ul sau stickul tău.

<a id="bios"></a>

**BIOS** — programul vechi, stocat în placa de bază, care pornește calculatorul și verifică ce dispozitive sunt. Interfața lui e textuală, de obicei albastră, și se intră în el cu tasta **Del** sau **F2**. E partea moștenită de la calculatoarele vechi — alternativele lui moderne sunt UEFI și EFI de mai jos.

<a id="uefi-efi"></a>

**UEFI / EFI** — „noul BIOS": programul de pornire al calculatoarelor moderne, cu meniu grafic, pornire rapidă și suport pentru discuri mari. Când un ghid îți spune să alegi stickul care scrie „EFI" sau „UEFI", el vrea să pornești în acest mod, nu în modul BIOS vechi. Toate ghidurile noastre îl menționează: [Ubuntu](/blog/cum-instalezi-ubuntu/), [Fedora](/blog/ghid-instalare-fedora/), [Ventoy](/blog/utilizare-ventoy/).

<a id="firmware"></a>

**Firmware** — denumirea generică a programelor mici care trăiesc în dispozitive (placa de bază, routerul, placa video) și le fac să funcționeze. BIOS-ul/UEFI-ul e firmware-ul plăcii de bază; unele periferice au și ele firmware propriu, care mai primește actualizări. Apare în [ghidurile de instalare](/blog/ghid-instalare-endeavouros/).

<a id="csm"></a>

**CSM / Legacy (modul vechi de pornire)** — comutatorul din UEFI care imită BIOS-ul vechi, ca să pornească și sisteme mai noi pe calculatoare mai bătrâne. Pe sistemele moderne **trebuie dezactivat**: instalatorul nu detectează corect modul mixt, iar stickul poate apărea greșit în meniu. Îl vezi menționat în [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/) și în [ghidul Zorin](/blog/ghid-instalare-zorin/).

<a id="secure-boot"></a>

**Secure Boot** — protecția din UEFI care lasă să pornească doar sisteme „semnate" de producător (în primul rând Windows). **Linux-ul de obicei nu e semnat**, deci trebuie să-l dezactivezi din BIOS înainte de instalare — motivul pentru care primele rânduri din cerințele ghidurilor noastre sunt „dezactivează Secure Boot". Vezi [Pop!_OS](/blog/ghid-instalare-popos/), [EndeavourOS](/blog/ghid-instalare-endeavouros/), [Zorin OS](/blog/ghid-instalare-zorin/).

<a id="fast-startup"></a>

**Fast Startup** — funcția Windows care „înghețe" parțial sistemul la închidere ca să pornească mai repede. Problema: partițiile rămân blocate, iar Linux-ul nu le mai vede corect — apar WiFi-ul și Bluetooth-ul disparute. Se dezactivează din Power Options. E obligatoriu [înainte de dual boot](/blog/ghid-instalare-linux-mint/).

<a id="meniu-de-boot"></a>

**Meniu de boot (Boot Menu)** — lista care apare la pornire și din care alegi **de pe ce dispozitiv pornești**: hard-discul, stickul USB sau DVD-ul. Se ajunge la el cu o tastă apăsată repetat: **F12** (calculatoare de birou), **F2**, **Del**, **Esc** (laptopuri), **⌥ Option** (Mac). Tabelele cu taste sunt în toate ghidurile, de exemplu [cel de Fedora](/blog/ghid-instalare-fedora/).

<a id="bootloader"></a>

**Bootloader** — programul care pornește **după** firmware și decide ce sistem de operare se încarcă. Pe Linux, asta înseamnă GRUB sau systemd-boot; el îți dă și meniul din care alegi între Windows și Linux. În ghiduri apare când alegi „unde se instalează" ([EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="grub"></a>

**GRUB** — cel mai cunoscut bootloader din lumea Linux: meniul lui e ecranul în care alegi între Windows, Linux sau o versiune mai veche a nucleului. Comanda `grub2-mkconfig` îl reconfigurează, iar pe sistemele cu mai multe sisteme instalate el ține ordinea. Apare în [ghidul Mint](/blog/ghid-instalare-linux-mint/) și [în cel Fedora](/blog/ghid-instalare-fedora/).

<a id="systemd-boot"></a>

**systemd-boot** — bootloaderul modern, simplu și rapid, implicit pe multe instalări EFI (EndeavourOS îl folosește ca variantă principală). Face mai puține lucruri decât GRUB, dar le face repede. Se distinge ușor în meniul de pornire [EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="isolinux"></a>

**isolinux** — bootloaderul simplu, de mod vechi, folosit de stickurile BIOS clasice: la [Linux Mint](/blog/ghid-instalare-linux-mint/) e el cel care arată meniul „Start Linux Mint" înainte de sesiunea live. Dacă vezi meniul lui, ai pornit în mod legacy, nu EFI.

<a id="dual-boot"></a>

**Dual boot** — instalarea Linux **alături de Windows**, pe același calculator, cu meniu de alegere la pornire. E calea recomandată în multe ghiduri („Install alongside"), pentru că păstrezi Windows-ul intact. Alternativele lui sunt „șterg tot" și „instalez alături" — le compari în [ghidul Ubuntu](/blog/cum-instalezi-ubuntu/).

<a id="nomodeset"></a>

**`nomodeset`** — parametrul care îi spune nucleului să **nu** se ocupe el de placa video la pornire, lăsând driverele să preia comanda mai târziu. E soluția clasică când ecranul rămâne negru după instalare: îl alegi din meniul de boot ([Mint](/blog/ghid-instalare-linux-mint/), [EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="fallback"></a>

**Fallback (varianta de rezervă)** — opțiunea „cu drivere deschise / nomodeset" din meniul de boot, care pornește pe aproape orice combinație de hardware. Alegi varianta principală; dacă ceva nu merge, revii la fallback. E varianta pe care o recomandăm [când ceva nu pornește](/blog/ghid-instalare-endeavouros/).

<a id="memtest"></a>

**memtest (test RAM)** — utilitarul din meniul de boot care verifică **memoria RAM** erori, ore în șir dacă e nevoie. Se folosește când calculatorul se blochează întâmplător sau instalările pică fără motiv aparent. Apare în meniul [EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="efi-shell"></a>

**EFI Shell** — un fel de „terminal" la nivelul firmware-ului, în care poți da comenzi de pornire direct în UEFI. E uneltea pentru avansați din meniul de boot EFI ([EndeavourOS](/blog/ghid-instalare-endeavouros/)); începătorii nu au de ce să intre acolo.

## Partiții, stocare și criptare

Al treilea capitol: ce se întâmplă pe disc în timpul instalării. Aici se tem lumea cel mai mult, așa că merită citit înainte de a apăsa „Erase".

<a id="partitie"></a>

**Partiție** — o împărțire logică a discului. Un disc de 500 GB poate avea o partiție de 100 GB pentru Windows și una de 400 GB pentru Linux; sistemul de operare le vede ca pe două „unități" separate. Instalatorul îți dă mereu de ales ce faci cu ele — vezi [ghidul Zorin](/blog/ghid-instalare-zorin/).

<a id="partitionare"></a>

**Partiționare** — împărțirea discului în asemenea partiții, înainte sau în timpul instalării. Poate fi automată („Erase", „Alongside") sau manuală, când vrei tu dimensiunile. Dacă instalatorul nu reușește să o facă, soluția e să tai partițiile mai întâi cu GParted — e explicat [în ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="formatare"></a>

**Formatare** — golirea unei partiții și pregătirea ei cu un sistem de fișiere, ca să poată primi date. E pasul care **șterge tot ce e pe partiția respectivă** — motivul pentru care recomandăm mereu o copie de siguranță înainte ([ghidul Mint](/blog/ghid-instalare-linux-mint/)).

<a id="esp"></a>

**ESP (EFI System Partition)** — partiția mică, de tip FAT32, în care bootloaderul își pune fișierele de pornire pe sistemele EFI. O recunoști pentru că e montată pe `/efi` sau `/boot/efi` și are nevoie de cel puțin 300 MB (2 GB la systemd-boot). Dacă ți se cere manual, cerințele sunt în [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="gpt"></a>

**GPT** — schema modernă de împărțire a discului, folosită împreună cu UEFI. Permite multe partiții și discuri de peste 2 TB, iar partea de rezervă a schemei protejează împotriva corupției. Alături de ESP, e standardul recomandat în [ghidurile noastre](/blog/ghid-instalare-fedora/).

<a id="mbr"></a>

**MBR** — schema veche de împărțire a discului, folosită cu BIOS-ul clasic. Merge pe orice, dar limitează discul la 2 TB și la 4 partiții principale. Dacă instalezi pe un calculator mai vechi, e cea pe care o întâlnești ([EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="puncte-de-montare"></a>

**Puncte de montare** — „adresele" la care sunt legate partițiile în Linux, în locul literelor ca `C:` sau `D:`. Partiția de sistem stă pe `/`, datele personale pe `/home`, partiția EFI pe `/efi` sau `/boot/efi`, iar folderele temporare pe `/tmp`. Ghidurile noastre folosesc căi ca `/home` și `/dev/sdX` când explică partiționarea manuală ([Ventoy](/blog/utilizare-ventoy/), [Fedora](/blog/ghid-instalare-fedora/)).

<a id="montare"></a>

**Montare (mount)** — legarea unei partiții sau a unui dispozitiv în arborele de fișiere, ca să poată fi folosit. Linux nu are litere de unități: totul e un singur copac, iar partițiile „urcă" în el la anumite ramuri. Termenul apare când explicăm unde montăm ESP-ul ([EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="swap"></a>

**Swap** — spațiul de pe disc folosit ca **memorie de schimb**: când RAM-ul se umfă, sistemul mută temporar date pe disc. Fără el, aplicațiile grele pot tăia procese; cu prea mult, calculatorul devine lent. Instalatorul îți propune o partiție swap sau un fișier echivalent ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Mint](/blog/ghid-instalare-linux-mint/)).

<a id="ext4"></a>

**ext4** — sistemul de fișiere standard, matur și fiabil, pe care se pun majoritatea distribuțiilor. Dacă nu alegi altceva, asta primești — și e alegerea bună pentru început. E varianta implicită în [ghidul Zorin](/blog/ghid-instalare-zorin/) și [Mint](/blog/ghid-instalare-linux-mint/).

<a id="btrfs"></a>

**BTRFS** — sistem de fișiere modern cu **snapshot-uri** (fotografii ale discului care pot fi restaurate), pe care unele distribuții îl oferă ca opțiune. E mai flexibil, dar are regulile lui — noi spunem clar: îl alegi doar dacă știi de ce ([EndeavourOS](/blog/ghid-instalare-endeavouros/), [Fedora](/blog/ghid-instalare-fedora/)).

<a id="moduri-instalator"></a>

**Modurile instalatorului (Alongside / Replace / Erase / Manual)** — cele patru feluri în care poți repartiționa la instalare: **Alongside** păstrează Windows și îl micșorează, **Replace** suprascrie o singură partiție, **Erase** șterge **tot** discul, **Manual** (aka „Something else", „Custom (Advanced)") îți dă control total. Tabelul complet cu ce face fiecare e în [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/) și [Zorin](/blog/ghid-instalare-zorin/).

<a id="gparted"></a>

**GParted / Disk Management / Blivet-GUI / KDE Partition Manager** — uneltele grafice de gestionat partiții: tai, redimensionezi, ștergi și formatezi discuri din interfață, nu din terminal. Dacă instalatorul refuză să creeze partițiile, folosești una dintre ele din mediu live ([Zorin](/blog/ghid-instalare-zorin/), [Pop!_OS](/blog/ghid-instalare-popos/)).

<a id="criptare"></a>

**Criptarea discului** — transformarea datelor de pe disc într-un amestec de caractere, care se descuie doar cu parola ta. Dacă îți fură laptopul, datele rămân ilizibile. Opțiunile pe care le vezi în instalator — „Encrypt my home folder", „Encrypt with a passphrase" sau dezactivarea BitLocker-ului la Windows — sunt toate despre asta ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Fedora](/blog/ghid-instalare-fedora/)).

<a id="ahci"></a>

**AHCI** — modul în care discul comunică cu sistemul, în locul modului vechi IDE. Multe ghiduri de depanare îți cer să intri în BIOS și să pui controlerul pe AHCI, fiindcă Linux-ul se așteaptă să îl găsească așa. E unul dintre primii pași când instalatorul nu vede niciun disc.

## Sistem de operare, kernel, istorie și licențe

Capitolul cu termenii care dau sensul de ansamblu: ce e Linux de fapt, cine l-a făcut și de ce se poate folosi liber.

<a id="distributie"></a>

**Distribuție (distro)** — un „sortiment" complet de Linux: nucleul plus programele, instalatorul și interfața, ambalate de o echipă. Ubuntu, Linux Mint, Fedora, Pop!_OS, Zorin OS și EndeavourOS din ghidurile noastre sunt tot atâtea distribuții. Cum alegi, vezi în [Alege distribuția](/blog/alege-distributia/) și [Un ocean de distribuții](/blog/un-ocean-de-distributii/).

<a id="kernel"></a>

**Kernel (nucleu, miez)** — inima sistemului de operare: partea care vorbește cu hardware-ul, împarte procesorul între programe și ține fișierele în siguranță. Interfața pe care o vezi stă deasupra lui. Dacă vrei să înțelegi de ce „Linux" e de fapt doar nucleul, citiți [Linux este miezul, kernel](/blog/linux-este-miezul-kernel/).

<a id="modul-kernel"></a>

**Modul de kernel** — o bucată de cod care se încarcă în nucleu **la nevoie** (placa video, rețeaua, criptarea), în loc să stea mereu în memorie. Când scriem „verifică dacă modulul s-a compilat corect", ne referim exact la bucățile astea opționale — mai ales la drivere ([Linux este miezul, kernel](/blog/linux-este-miezul-kernel/)).

<a id="unix"></a>

**Unix (UNIX)** — sistemul de operare din 1970, creat la AT&T, din care se trag aproape toate sistemele de azi — inclusiv macOS și Linux. Linux e „ca Unix", dar nu e Unix: împrumută ideile, nu codul. Povestea completă e în [Unix, Linus și Linux](/blog/unix-linus-linux/).

<a id="gnu"></a>

**GNU** — proiectul lui Richard Stallman (1984) care a construit uneltele din jurul Unix: editoare, compilatoare, shell. Sistemul lor se numea „GNU" și îi mai lipsea nucleul — pe care l-a adus Linux în 1991. De aceea oficial se zice „GNU/Linux" ([Unix, Linus și Linux](/blog/unix-linus-linux/)).

<a id="gpl"></a>

**GPL (GNU General Public License)** — licența care zice: poți folosi, copia și modifica programul, **dar** orice versiune modificată trebuie tot sub GPL, gratuit. Kernelul Linux e sub GPL — de asta există sute de distribuții gratuite. O întâlnești în notele de la finalul ghidurilor noastre ([Mint](/blog/ghid-instalare-linux-mint/), [EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="licenta"></a>

**Licență** — regulile sub care primești un software: ai voie să-l folosești? să-l modifici? să-l dai mai departe? Un program gratuit nu e neapărat „licență liberă" — contează ce ai voie să faci cu el. Notăm licențele surselor din care ne inspirăm la fiecare articol.

<a id="sursa-deschisa"></a>

**Sursă deschisă (open source)** — program al cărui cod sursă e **vizibil și editabil** de oricine. Poți citi ce face, îl poți corecta, îl poți repacka. Linux, Firefox și LibreOffice sunt așa; Windows și macOS nu ([Linux vs. Mac vs. Windows](/blog/linux-vs-mac-vs-windows/)).

<a id="libertate"></a>

**Libertate (software liber)** — cele patru libertăți pe care le apără FSF: să rulezi programul cum vrei, să-l studiezi, să-l redistribui și să-l modifici. Diferența față de „gratuit" e că gratuit e despre preț, libertate despre drepturi. Tema apare în [schimbarea sistemului](/blog/schimba-sistemul/) și [puțină istorie](/blog/putina-istorie/).

<a id="stallman"></a>

**Richard Stallman (FSF)** — omul care a pornit în 1983 proiectul GNU și Free Software Foundation, mișcarea din care se trage licența GPL. E vocea care a făcut din „licența software-ului" o problemă de libertate, nu de preț ([Unix, Linus și Linux](/blog/unix-linus-linux/)).

<a id="torvalds"></a>

**Linus Torvalds** — studentul finlandez care, în 1991, a scris nucleul Linux pe care îl folosim toți azi. Conduce și acum dezvoltarea nucleului, iar stilul lui direct e legendar. Portretul complet e în [Unix, Linus și Linux](/blog/unix-linus-linux/).

<a id="minix"></a>

**Minix** — sistemul de operare mic și didactic al profesorului Andrew Tanenbaum, scris special ca să studiezi cum funcționează un kernel. Pe el s-a antrenat Linus Torvalds înainte de Linux ([Unix, Linus și Linux](/blog/unix-linus-linux/)).

<a id="systemd"></a>

**systemd** — „organizatorul" de start al distribuțiilor moderne: pornește serviciile, ține jurnalele și gestionează comenzile `systemctl`. E și împărțit în comunitate (unii îl urăsc), dar practic toate distribuțiile din ghidurile noastre îl folosesc ([EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="x11-wayland"></a>

**X11 / Wayland** — protocoalele care fac posibilă fereastra, cursorul și tastatura pe ecran. **X11** e standardul moștenit din anii '80, **Wayland** e înlocuitorul mai modern, curat și securizat, pe care distribuțiile îl adoptează treptat. Diferența se discută în [DE sau WM?](/blog/de-sau-wm/).

<a id="sandbox"></a>

**Sandbox (cutie de nisip)** — izolarea unui program ca să nu poată atinge restul sistemului fără voie. Fedora Silverblue are sandbox „perfect pentru experimente", iar navigatoarele folosesc același principiu. Termenul apare în [Linux vs. Mac vs. Windows](/blog/linux-vs-mac-vs-windows/).

## Pachete, depozite și actualizări

Cum ajung programele pe sistem și cum le ții la zi — capitolul pe care îl vei folosi săptămânal, nu doar la instalare.

<a id="pachet"></a>

**Pachet** — programul ambalat pentru instalare, în formatul pe care îl înțelege distribuția ta, împreună cu dependențele lui. În loc să descarci un instalator `.exe`, alegi „pachetul" X și sistemul rezolvă restul. Exemplu concret: `sudo dnf install gnome-tweaks` din [ghidul Fedora](/blog/ghid-instalare-fedora/).

<a id="depozit"></a>

**Depozit (repozițiu, repo)** — biblioteca oficială de pachete de unde sistemul tău descarcă. Fiecare distribuție are depozitele ei, testate ca să meargă împreună — de aceea instalarea din depozit e mai sigură decât orice fișier de pe internet. Termenul apare în [ghidul Fedora](/blog/ghid-instalare-fedora/) și [Zorin](/blog/ghid-instalare-zorin/).

<a id="oglinda"></a>

**Oglindă (mirror)** — un server care copiază depozitele, ca accesul să nu vină de peste ocean. Dacă descarci lent, schimbi oglinda cu una mai apropiată — în [EndeavourOS](/blog/ghid-instalare-endeavouros/) există uneltea *Update Mirrors* care alege cele mai rapide 8-10 automat.

<a id="pacman"></a>

**pacman** — managerul de pachete al Arch Linux și al „copiilor" lui (EndeavourOS, Manjaro). Comanda de bază: `sudo pacman -Syu` actualizează **tot** sistemul. E primul cuvânt pe care îl înveți dacă intri în lumea Arch ([ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="apt"></a>

**apt** — managerul de pachete al familiei Debian (Ubuntu, Mint, Pop!_OS, Zorin). `apt update` ia lista de pachete noi, `apt upgrade` le instalează — primele două comenzi pe care le vei da în [ghidul Ubuntu](/blog/cum-instalezi-ubuntu/).

<a id="dnf"></a>

**dnf** — managerul de pachete al familiei Red Hat/Fedora, succesorul lui `yum`. `sudo dnf install gnome-tweaks` instalează ce vrei din depozitul Fedora ([ghidul Fedora](/blog/ghid-instalare-fedora/)).

<a id="flatpak"></a>

**Flatpak (Flathub)** — formatul de pachete universal: aceeași aplicație rulează pe **orice** distribuție Linux, izolată și mereu la zi. Magazinul lui se numește **Flathub**. Mint, Fedora și Zorin îl folosesc, iar în [Zorin OS](/blog/ghid-instalare-zorin/) e calea recomandată pentru aplicațiile noi.

<a id="snap"></a>

**Snap** — formatul de pachete al Canonical (compania din spatele Ubuntu): aplicații care se actualizează singure, automat, în fundal. E preinstalat pe Ubuntu, opțional în Fedora și adesea dezinstalat de cine vrea control total — vezi comparația în [schimbarea sistemului](/blog/schimba-sistemul/).

<a id="rpm-fusion"></a>

**RPM Fusion** — depozitul „neoficial" al Fedora pentru programe care nu pot fi distribuite de ei: codecuri, drivere și multimedia. Se adaugă o dată, iar apoi `dnf install` merge ca de obicei ([ghidul Fedora](/blog/ghid-instalare-fedora/)).

<a id="aur"></a>

**AUR (Arch User Repository)** — arhiva unde comunitatea Arch pune **orice** program, sub formă de rețete care se compilează la tine pe calculator. Acolo găsești și cele care lipsesc din depozitele oficiale. E marele motiv pentru care lumea alege EndeavourOS ([ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="yay"></a>

**yay** — helperul care face AUR-ul comod: `yay -S nume_pachet` caută și în depozite, și în AUR, și instalează fără să te întrebe de parole la fiecare pas. Vine instalat cu EndeavourOS ([ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="actualizare"></a>

**Actualizare (upgrade)** — procesul de a aduce pachetele instalate la cea mai nouă versiune. Pe Linux se face din meniu sau din terminal, des — o dată pe săptămână e ritmul sănătos. Fiecare ghid se încheie cu secțiunea „primele actualizări" ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Mint](/blog/ghid-instalare-linux-mint/)).

<a id="actualizari-complete"></a>

**Actualizări complete, nu parțiale** — regula de aur pe sistemele rolling: actualizezi **tot** dintr-o dată, nu doar o aplicație, ca să nu ajungi cu versiuni care nu se potrivesc. Se aplică prin `sudo pacman -Syu` și e explicată [în ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="rolling-release"></a>

**Rolling release** — modelul în care sistemul **se actualizează continuu**, fără să instalezi vreodată o „versiune nouă" peste cea veche. Ai mereu ce e mai nou, dar și responsabilitatea actualizărilor regulate. Opusul e stabilirea pe versiuni — despre asta și despre implicațiile lui găsești explicația cinstită din [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="lts"></a>

**LTS (Long Term Support — suport pe termen lung)** — versiunea „stabilită", care primește actualizări de securitate ani buni și nu se schimbă sub tine. E alegerea recomandată dacă vrei liniște: Ubuntu 26.04 LTS, Pop!_OS 24.04 LTS, Linux Mint (care se bazează pe un LTS) ([alege distribuția](/blog/alege-distributia/)).

<a id="editie"></a>

**Ediție / versiune / ramură** — variantele și momentele din viața unui sistem: **ediția** e cum se numește pachetul complet (Mint are edițiile Cinnamon, MATE, Xfce; Zorin are Core, Lite, Education), **versiunea** e numărul (22.3, 24.04), **ramura** e linia pe care o urmează (Fedora Workstation vs. Silverblue). Le compari în [Zorin OS](/blog/ghid-instalare-zorin/) și [Fedora](/blog/ghid-instalare-fedora/).

<a id="codecuri"></a>

**Codecuri (codecs)** — fișierele care traduc sunetul și video-ul din formate comprimate (MP4, MP3, H.264). Fără ele, YouTube-ul și DVD-urile nu redau corect. De asta ghidurile te întreabă „Bifeaz-o" la **Install Multimedia Codecs** ([Mint](/blog/ghid-instalare-linux-mint/), [Fedora](/blog/ghid-instalare-fedora/)).

## Mediul desktop: DE vs WM

Cel mai colorat capitol: interfața pe care o vezi zilnic, numele pe care le vezi în instalator și diferența dintre ele.

<a id="mediu-desktop"></a>

**Mediu desktop (Desktop Environment, DE)** — **pachetul complet** al interfeței: meniuri, panou, setări, manager de fișiere, totul într-un singur ansamblu. Alegi unul în instalator și primești un desktop gata de lucru. Diferențele dintre ele, pe scurt, sunt în [DE sau WM?](/blog/de-sau-wm/).

<a id="window-manager"></a>

**Window manager (WM)** — doar partea care **plasează și decoră ferestrele**: unde se așază, cum se redimensionează, ce taste le controlează. Fără meniuri sau unelte incluse — motivul pentru care cine alege un WM își construiește desktopul piesă cu piesă. Explicația completă: [DE sau WM?](/blog/de-sau-wm/).

<a id="tiling"></a>

**Tiling (WM în mozaic)** — ferestrele se **așază singure**, ca dale, fără să se suprapună niciodată: jumătate stânga, jumătate dreapta, un sfert sus. E stilul preferat de cei care lucrează mult pe tastatură. Exemplele din articolele noastre: **i3**, **Sway**, **bspwm**, **Hyprland** ([DE sau WM?](/blog/de-sau-wm/)).

<a id="stacking-compositing"></a>

**Stacking / Compositing** — extremele opuse tilingului: **stacking** așază ferestrele ca Windows-ul (una peste alta, cu colțuri de prins), iar **compositing** adaugă efecte: umbre, transparențe, animații. **Openbox** și **Fluxbox** sunt stacking clasice, **Compiz** e celebrul care făcea ferestrele să se rotească ([DE sau WM?](/blog/de-sau-wm/)).

<a id="gnome"></a>

**GNOME** — interfața minimalistă și curată, cu bara de activități din stânga și căutare peste tot. E desktopul implicit al Ubuntu-ului și Fedora Workstation, ales pentru simplitate ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Fedora](/blog/ghid-instalare-fedora/)).

<a id="kde-plasma"></a>

**KDE Plasma** — interfața complet configurabilă, arătătoare ca Windows-ul: meniu de start, bară de sarcini, setări pentru fiecare colțișor. E desktopul pe care îl primești implicit în instalarea offline a [EndeavourOS](/blog/ghid-instalare-endeavouros/) și alegerea multora care vor „totul la îndemână".

<a id="xfce"></a>

**Xfce** — desktopul ușor și sobru: puține efecte, consum mic de RAM, dar tot cu meniu, panou și toate cele nevoie. Alegerea clasică pentru calculatoare mai vechi sau pentru cine vrea viteză ([Mint Xfce](/blog/ghid-instalare-linux-mint/)).

<a id="cinnamon"></a>

**Cinnamon** — desktopul **Linux Mint**, făcut să pară familiar cu Windows: meniu de start jos-stânga, bară de sarcini, sertare de programe. Dacă vrei „Linux-ul care se apropie cel mai mult de ce știi deja", el e ([ghidul Mint](/blog/ghid-instalare-linux-mint/)).

<a id="mate"></a>

**MATE** — continuarea clasicului GNOME 2, în variantă tradițională și configurabilă, cu consum redus. E a doua aromă a [Linux Mint](/blog/ghid-instalare-linux-mint/) și apare în instalatoarele multor distribuții.

<a id="cosmic"></a>

**COSMIC** — desktopul **nou scris de la zero** de echipa Pop!_OS, în Rust, cu tiling construit direct în el. E încă tânăr — de asta avertizăm onest în [ghidul Pop!_OS](/blog/ghid-instalare-popos/) că se mai schimbă.

<a id="budgie"></a>

**Budgie** — desktopul elegant și ușor al Proiectului Solus, tot mai popular pe alte distribuții. Atât: în ediția EndeavourOS Titan Nova e temporar scos din motive tehnice ([ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="alte-medii"></a>

**Pantheon (elementary OS), Deepin, LXDE, LXQt, MATE Desktop** — restul familiei de medii desktop din [DE sau WM?](/blog/de-sau-wm/): Pantheon arată ca macOS, Deepin pune accentul pe design și efecte, iar LXDE/LXQt sunt variantele ultra-ușoare pentru calculatoare foarte vechi.

<a id="hyprland-i3"></a>

**Hyprland, i3, Sway, bspwm, AwesomeWM** — window managerele în mozaic menționate în articolele noastre: **i3** e stabil și clasic, **Sway** e i3 pentru Wayland, **bspwm** e minimalist și configurabil dintr-un fișier, **AwesomeWM** îți dă meniu propriu, iar **Hyprland** e cel nou, cu animații și configurare modernă ([DE sau WM?](/blog/de-sau-wm/), [schimbarea sistemului](/blog/schimba-sistemul/)).

<a id="interfata"></a>

**Panou / taskbar / bară de activități / dock / meniu de start** — piesele interfeței: **panoul** (taskbar-ul) ține programele deschise și ceasul, **bară de activități** e varianta GNOME din stânga, **dock** e rândul de iconițe ca pe macOS, iar **meniu de start** e lista tuturor programelor. Le regăsești în [ghidul Pop!_OS](/blog/ghid-instalare-popos/) și [Zorin](/blog/ghid-instalare-zorin/).

<a id="widgeti"></a>

**Widget** — micile module de pe desktop sau pe ecranele de blocare: ceasul, vremea, contorul de baterie. Fiecare mediu desktop are biblioteca lui de widgeturi ([DE sau WM?](/blog/de-sau-wm/)).

<a id="manager-fisiere"></a>

**Manager de fișiere** — fereastra care arată folderele și fișierele, cu copiere, lipire și permisiuni — echivalentul Explorer-ului din Windows. Se găsește în fiecare desktop (Nautilus la GNOME, Dolphin la KDE, Thunar la Xfce) și apare în [DE sau WM?](/blog/de-sau-wm/).

<a id="zorin-appearance"></a>

**Zorin Appearance** — uneltea proprie a Zorin OS care schimbă aspectul desktopului cu o bifă: aranjament ca Windows, ca macOS sau ca GNOME, plus teme și culori. E prima oprire după instalare [în ghidul Zorin](/blog/ghid-instalare-zorin/).

## Hardware și drivere

Capitolul cu piesele din calculator și cu cuvântul care sperie pe toată lumea: „driver".

<a id="procesor"></a>

**Procesor (CPU)** — creierul care execută instrucțiunile. Toate ghidurile cer un „dual-core Intel sau AMD" pentru că Linux-ul însuși e ușor, dar interfața modernă vrea doi nuclei minim. Specificațiile sunt în fiecare ghid, de exemplu [cel de Fedora](/blog/ghid-instalare-fedora/).

<a id="ram"></a>

**Memorie RAM** — memoria volatilă în care trăiesc programele deschise: se golește la repornire. Linux cere 4 GB ca minim recomandat — destul ca sistemul să respire, nu și ca să ții 30 de taburi ([toate ghidurile](/blog/ghid-instalare-endeavouros/)).

<a id="gpu"></a>

**Placă video (GPU)** — cipul care desenează ecranul. **GPU integrat** (Intel/AMD) merge „din fabrică" fără efort; **GPU separat NVIDIA** are nevoie de drivere proprii — de unde întreaga discuție despre drivere din [ghidul Pop!_OS](/blog/ghid-instalare-popos/).

<a id="placa-retea"></a>

**Placă de rețea (Wi-Fi)** — dispozitivul care te conectează la internet. E cel mai des întâlnit problemă la instalări: în live testezi dacă o recunoaște, iar dacă nu, alegi altă distribuție sau versiuni cu nucleu mai nou ([ghidul Ubuntu](/blog/cum-instalezi-ubuntu/)).

<a id="bluetooth"></a>

**Bluetooth** — conexiunea scurtă pentru căști, mouse și telefoane. Dacă dispare după instalare, de vină e de obicei Fast Startup-ul Windows care a lăsat dispozitivul blocat ([ghidul Mint](/blog/ghid-instalare-linux-mint/)).

<a id="driver"></a>

**Driver (suport de hardware)** — programul care învață sistemul de operare să vorbească cu o piesă anume: placa video, sunetul, WiFi-ul. Varianta **open source** vine cu kernelul (funcționează, dar poate fi mai lentă), cea **proprietară** vine de la producător (mai rapidă, dar mai rigidă). Nu-l mai căuta pe net: în [Pop!_OS](/blog/ghid-instalare-popos/) și [EndeavourOS](/blog/ghid-instalare-endeavouros/) există unelte care îl instalează singure.

<a id="nvidia"></a>

**NVIDIA / nouveau / nvidia-open** — trei straturi ale aceleiași povești: **nouveau** e driverul deschis pentru plăcile NVIDIA (merge, dar e mai lent), **nvidia-open** e versiunea modernă, cu cod deschis, pentru plăcile GTX 16xx și mai noi, iar driverele **NVIDIA** propriu-zise sunt cele proprietare de la producător. Alegerea corectă o face uneltea din [EndeavourOS](/blog/ghid-instalare-endeavouros/), iar Pop!_OS are ISO separat [cu drivere NVIDIA](/blog/ghid-instalare-popos/).

<a id="arhitecturi"></a>

**Arhitecturi (Intel/AMD, ARM/ARM64, Apple Silicon, 64 biți)** — „limbajul" procesorului. x86_64 (Intel/AMD) e cel al calculatoarelor clasice, **ARM** al telefoanelor și al Mac-urilor cu **Apple Silicon**, iar o imagine „amd64" sau „arm64" e făcută pentru una dintre ele — nu se potrivesc oricum ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Zorin](/blog/ghid-instalare-zorin/)).

<a id="unelte-hardware"></a>

**`lspci`, `dxdiag`, `inxi`** — unelte care îți spun **ce ai în calculator**, fără să deschizi capacul: `lspci` listează plăcile (folosit cu `grep -i vga` pentru placa video), `dxdiag` e echivalentul din Windows, iar `inxi` dă raportul complet pentru forumuri ([Pop!_OS](/blog/ghid-instalare-popos/), [EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="grafica-hibrida"></a>

**Grafică hibridă** — laptopurile cu **două plăci video**: una integrată (economă) și una NVIDIA (puternică), comutabile. Linux-ul are unelte pentru comutare, iar unele distribuții (Pop!_OS cu configurația „hybrid") o fac din start ([ghidul Pop!_OS](/blog/ghid-instalare-popos/)).

## Siguranță, backup și recuperare

Termenii care îți dau liniște: ce faci înainte să riști și cum te întorci dacă ceva merge prost.

<a id="backup"></a>

**Backup (copie de siguranță)** — copia datelor importante într-un loc separat, făcută **înainte** de orice operațiune care șterge (partiționare, instalare, upgrade). Regula noastră: dacă datele tale nu sunt în două locuri, nu există decât într-unul — de asta insistăm în toate ghidurile cu „Erase" ([Ubuntu](/blog/cum-instalezi-ubuntu/), [Mint](/blog/ghid-instalare-linux-mint/)).

<a id="snapshot"></a>

**Snapshot (instantaneu)** — fotografia stării întregului sistem la un moment dat, pe care o poți reface în 5 minute. Diferența față de backup e că snapshot-ul ține sistemul, backup-ul ține datele tale. Se pot face cu BTRFS sau cu Timeshift ([Fedora](/blog/ghid-instalare-fedora/)).

<a id="timeshift"></a>

**Timeshift** — programul care face snapshot-uri **automat**, înainte de fiecare actualizare mare. La noi e „plasa de siguranță": `yay -S timeshift` plus activarea lui o dată, și apoi dormi liniștit ([Mint](/blog/ghid-instalare-linux-mint/), [EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="rsync"></a>

**RSYNC** — metoda de copiere pe care o folosește Timeshift: compară fișierele și copiază **doar ce s-a schimbat**, deci instantaneele nu-ți mănâncă tot discul. E alegerea corectă pentru cei care nu folosesc BTRFS ([ghidul Mint](/blog/ghid-instalare-linux-mint/)).

<a id="firewall"></a>

**Firewall (FirewallD)** — filtrul care decide ce conexiuni exterioare sunt lăsate să intre în calculator. E activ din fabrică pe multe distribuții ([EndeavourOS](/blog/ghid-instalare-endeavouros/)) — adică sistemul e protejat chiar înainte să te gândești la asta.

<a id="recuperare"></a>

**Recuperare / SystemRescue** — uneltele și stickurile care salvează un sistem care nu mai pornește: repari GRUB-ul, intri pe disc dintr-un mediu live, îți salvezi datele. Un stick de rezervă cu SystemRescue e trusca de prim ajutor din [ghidul Ventoy](/blog/utilizare-ventoy/).

<a id="jurnal"></a>

**Jurnal (log)** — lista evenimentelor din sistem, cu oră și mesaj: ce s-a instalat, ce a eșuat, de ce. Când instalarea pică, primul pas e să scoți jurnalul (cu `inxi`), nu să repornești — e exact ce cere [ghidul EndeavourOS](/blog/ghid-instalare-endeavouros/).

<a id="telemetrie"></a>

**Telemetrie** — datele trimise în fundal despre cum folosești programul. Dacă un program plătește „gratis" cu datele tale, asta se numește telemetrie; motivul pentru care evităm uneltele care trimit prea mult ([viitorul Linux](/blog/viitor-linux/)).

<a id="confidentialitate"></a>

**Confidențialitate** — controlul asupra a ce părăsește calculatorul tău. Linux-ul îți dă instrumentul (setările de localizare, serviciile de raportare care se pot închide), tu decizi ([ghidul Ubuntu](/blog/cum-instalezi-ubuntu/), [EndeavourOS](/blog/ghid-instalare-endeavouros/)).

<a id="malware"></a>

**Malware** — termenul-umbrelă pentru tot ce e rău intenționat: viruși, troieni, spyware. Pe Linux riscul e mai mic, dar nu zero — nicio distribuție nu-ți promite imunitate ([alege distribuția](/blog/alege-distributia/)).

## Terminal și comenzi

Capitolul care desființează „frica de terminal": sunt doar cuvinte pe care le scrii și un program care execută.

<a id="terminal"></a>

**Terminal (consolă, emulator de terminal)** — fereastra în care scrii comenzi și primești răspuns text. Se deschide cu **Ctrl + Alt + T** pe majoritatea distribuțiilor. Nu e obligatoriu, dar îți dă control direct — și e colacul de salvare când interfața nu mai răspunde ([ghidul Ubuntu](/blog/cum-instalezi-ubuntu/)).

<a id="comanda"></a>

**Comandă** — instrucțiunea pe care o scrii în terminal, de obicei „verbul + ce": `apt update` (actualizează lista), `sudo pacman -Syu` (actualizează tot). Fiecare ghid are secțiunea lui de comenzi, executate pas cu pas.

<a id="sudo"></a>

**`sudo`** — prefixul care face comanda să meargă **ca administrator** (superuser). Când ți se cere parola în terminal, o scrii o dată și comanda rulează cu drepturi depline. Avertismentul clasic: cu `sudo` poți face orice — inclusiv să ștergi ce nu trebuie ([toate ghidurile](/blog/ghid-instalare-fedora/)).

<a id="administrator"></a>

**Administrator (superuser, root)** — contul care poate modifica orice în sistem. În ziua de azi nu te conectezi ca root, ci ridici temporar drepturile cu `sudo`. Diferența e explicată în [ghidurile de instalare](/blog/cum-instalezi-ubuntu/), unde îți creezi propriul cont cu drepturi de administrator.

<a id="cale"></a>

**Cale (path, calea către un fișier)** — adresa unui fișier în sistem: `/home/nume/Documente/photo.jpg`. Linux nu are litere de unități, totul pornește din `/`, iar `/home` e folderul tău personal. În ghiduri apar caile scurte ca `/home` sau `/dev/sdX` ([Ventoy](/blog/utilizare-ventoy/)).

<a id="comenzi-sistem"></a>

**Comenzi de sistem (`systemctl`, `lsblk`, `grub2-mkconfig`)** — uneltele de administrare din terminal: `systemctl enable --now cronie.service` pornește un serviciu, `lsblk` arată discurile și partițiile, `grub2-mkconfig` reconstruiește meniul de pornire. Toate apar cu copy-paste în ghiduri ([EndeavourOS](/blog/ghid-instalare-endeavouros/), [Fedora](/blog/ghid-instalare-fedora/)).

## Virtualizare

Trei termeni pentru „calculator în calculatorul tău".

<a id="masina-virtuala"></a>

**Mașină virtuală (VM)** — un calculator fals, creat într-o fereastră pe sistemul tău real, cu procesor, RAM și disc virtual. Îl pornești, instalezi ce vrei în el și, dacă strici ceva, îl ștergi fără urmă — mediul ideal de experimentat Linux fără riscuri ([Linux vs. Mac vs. Windows](/blog/linux-vs-mac-vs-windows/)).

<a id="virtualbox"></a>

**VirtualBox** — programul gratuit de la Oracle care creează mașini virtuale, cel mai des folosit pentru teste. Ilustrative pentru ideea că poți rula orice sistem de operare într-o fereastră ([puțină istorie](/blog/putina-istorie/), [Ubuntu](/blog/cum-instalezi-ubuntu/)).

<a id="qemu"></a>

**QEMU** — motorul de emulare/virtualizare „de laborator", stufos dar puternic, pe care se bazează multe unelte mai prietenoase. Îl întâlnești când cineva testează ceva în fundal, fără interfață grafică ([Ubuntu](/blog/cum-instalezi-ubuntu/)).

## Tehnologii și web

Ultimul capitol, cu termeni pe care îi prinzi din zbor în discuțiile despre „unde se duce Linux-ul".

<a id="cloud"></a>

**Cloud (calcul în cloud)** — programele și fișierele care stau pe serverele altuia și le accesezi din browser sau din aplicație: Gmail, Google Drive, photo-urile de pe telefon. Alternativa e totul local, pe discul tău — discuția o găsiți în [ce e benefic să înveți](/blog/de-ce-este-benefic-sa-invati-linux/).

<a id="container"></a>

**Container (containerizare)** — programul ambalat împreună cu toate dependențele lui, ca să meargă identic pe orice mașină. E standardul în dezvoltarea modernă, iar Linux-ul e mediul lui natural ([Linux vs. Mac vs. Windows](/blog/linux-vs-mac-vs-windows/)).

<a id="browser"></a>

**Browser (navigator web)** — programul cu care intri pe internet: Firefox, Chrome, Chromium, Brave. Pe Linux vine deja instalat unul, iar schimbarea lui e primul lucru pe care îl fac mulți ([Ubuntu](/blog/cum-instalezi-ubuntu/)).

<a id="html"></a>

**HTML** — limbajul în care e scrisă fiecare pagină web: titluri, paragrafe, linkuri, imagini. Dacă știi puțin HTML, înțelegi cum funcționează și site-urile — și îți dă curaj să te uiți sub capotă ([ce e benefic să înveți](/blog/de-ce-este-benefic-sa-invati-linux/)).

<a id="github"></a>

**GitHub / GitLab** — depozitele unde proiectele își țin codul și știrile. Când [EndeavourOS](/blog/ghid-instalare-endeavouros/) are anunțuri importante, ele apar acolo, în *Important-news* — prima verificare înaintea unei actualizări mari.

## Cum folosești acest glosar

Reveni aici de fiecare dată când un cuvânt te oprește din citit: deschizi **[indexul alfabetic](#index-alfabetic)** de mai jos, dai clic pe termen și ajungi direct la explicație. Iar dacă vrei să mergi mai departe de la cuvinte la fapte, traseul firesc e:

1. [Hai să învățăm Linux](/blog/haideti-sa-invatam-linux/) — de unde începi;
2. [Alege distribuția](/blog/alege-distributia/) — ce alegi pentru calculatorul tău;
3. [Ghidul de instalare](/blog/ghid-instalare-linux-mint/) al distribuției alese — primul boot;
4. [DE sau WM?](/blog/de-sau-wm/) — cum arată și cum se personalizează.

<em>Articolul e o sinteză a termenilor folosiți în articolele acestui blog, rescrisă integral pentru începători; nu preia text din surse externe. Linkurile duc spre ghidurile unde termenii apar în context real.</em>

## Index alfabetic

Toți cei 125 de termeni, în ordine alfabetică. Dai clic pe un termen și ajungi direct la explicația lui.

**A** — [Actualizare (upgrade)](#actualizare) · [Actualizări complete, nu parțiale](#actualizari-complete) · [Administrator (superuser, root)](#administrator) · [AHCI](#ahci) · [apt](#apt) · [Arhitecturi (Intel/AMD, ARM/ARM64, Apple Silicon, 64 biți)](#arhitecturi) · [AUR (Arch User Repository)](#aur)

**B** — [Backup (copie de siguranță)](#backup) · [BIOS](#bios) · [Bluetooth](#bluetooth) · [Bootloader](#bootloader) · [Browser (navigator web)](#browser) · [BTRFS](#btrfs) · [Budgie](#budgie)

**C** — [Cale (path, calea către un fișier)](#cale) · [Cinnamon](#cinnamon) · [Cloud (calcul în cloud)](#cloud) · [Codecuri (codecs)](#codecuri) · [Comandă](#comanda) · [Comenzi de sistem (`systemctl`, `lsblk`, `grub2-mkconfig`)](#comenzi-sistem) · [Confidențialitate](#confidentialitate) · [Container (containerizare)](#container) · [COSMIC](#cosmic) · [Criptarea discului](#criptare) · [CSM / Legacy (modul vechi de pornire)](#csm)

**D** — [`dd`](#dd) · [Depozit (repozițiu, repo)](#depozit) · [Distribuție (distro)](#distributie) · [DistroWatch](#distrowatch) · [dnf](#dnf) · [Driver (suport de hardware)](#driver) · [Dual boot](#dual-boot)

**E** — [Ediție / versiune / ramură](#editie) · [EFI Shell](#efi-shell) · [ESP (EFI System Partition)](#esp) · [ext4](#ext4)

**F** — [Fallback (varianta de rezervă)](#fallback) · [Fast Startup](#fast-startup) · [Firewall (FirewallD)](#firewall) · [Firmware](#firmware) · [Flatpak (Flathub)](#flatpak) · [Formatare](#formatare)

**G** — [GitHub / GitLab](#github) · [GNOME](#gnome) · [GNU](#gnu) · [GParted / Disk Management / Blivet-GUI / KDE Partition Manager](#gparted) · [GPL (GNU General Public License)](#gpl) · [GPT](#gpt) · [Grafică hibridă](#grafica-hibrida) · [GRUB](#grub)

**H** — [HTML](#html) · [Hyprland, i3, Sway, bspwm, AwesomeWM](#hyprland-i3)

**I** — [ISO (imagine de disc)](#iso) · [isolinux](#isolinux)

**J** — [Jurnal (log)](#jurnal)

**K** — [KDE Plasma](#kde-plasma) · [Kernel (nucleu, miez)](#kernel)

**L** — [Libertate (software liber)](#libertate) · [Licență](#licenta) · [Linus Torvalds](#torvalds) · [`lspci`, `dxdiag`, `inxi`](#unelte-hardware) · [LTS (Long Term Support — suport pe termen lung)](#lts)

**M** — [Malware](#malware) · [Manager de fișiere](#manager-fisiere) · [Mașină virtuală (VM)](#masina-virtuala) · [MATE](#mate) · [MBR](#mbr) · [Mediu desktop (Desktop Environment, DE)](#mediu-desktop) · [Mediu live (sesiune live, live USB)](#mediu-live) · [Memorie RAM](#ram) · [memtest (test RAM)](#memtest) · [Meniu de boot (Boot Menu)](#meniu-de-boot) · [Minix](#minix) · [Mod DD (scriere brută)](#mod-dd) · [Modul de kernel](#modul-kernel) · [Modurile instalatorului (Alongside / Replace / Erase / Manual)](#moduri-instalator) · [Montare (mount)](#montare) · [Multiboot](#multiboot)

**N** — [`nomodeset`](#nomodeset) · [NVIDIA / nouveau / nvidia-open](#nvidia)

**O** — [Oglindă (mirror)](#oglinda)

**P** — [Pachet](#pachet) · [pacman](#pacman) · [Panou / taskbar / bară de activități / dock / meniu de start](#interfata) · [Pantheon (elementary OS), Deepin, LXDE, LXQt, MATE Desktop](#alte-medii) · [Partiție](#partitie) · [Partiționare](#partitionare) · [Placă de rețea (Wi-Fi)](#placa-retea) · [Placă video (GPU)](#gpu) · [Procesor (CPU)](#procesor) · [Puncte de montare](#puncte-de-montare)

**Q** — [QEMU](#qemu)

**R** — [Recuperare / SystemRescue](#recuperare) · [Richard Stallman (FSF)](#stallman) · [Rolling release](#rolling-release) · [RPM Fusion](#rpm-fusion) · [RSYNC](#rsync)

**S** — [Sandbox (cutie de nisip)](#sandbox) · [Secure Boot](#secure-boot) · [Sincronizare („așteaptă 10 minute")](#sincronizare) · [Snap](#snap) · [Snapshot (instantaneu)](#snapshot) · [Stacking / Compositing](#stacking-compositing) · [Stick USB bootabil](#stick-usb-bootabil) · [`sudo`](#sudo) · [Sursă deschisă (open source)](#sursa-deschisa) · [Swap](#swap) · [systemd](#systemd) · [systemd-boot](#systemd-boot)

**T** — [Telemetrie](#telemetrie) · [Terminal (consolă, emulator de terminal)](#terminal) · [Tiling (WM în mozaic)](#tiling) · [Timeshift](#timeshift)

**U** — [UEFI / EFI](#uefi-efi) · [Unelte de scris pe stick](#unelte-de-stick) · [Unix (UNIX)](#unix)

**V** — [Ventoy](#ventoy) · [Verificarea mediei](#verificarea-mediei) · [VirtualBox](#virtualbox)

**W** — [Widget](#widgeti) · [Window manager (WM)](#window-manager)

**X** — [X11 / Wayland](#x11-wayland) · [Xfce](#xfce)

**Y** — [yay](#yay)

**Z** — [Zorin Appearance](#zorin-appearance)
