---
title: "Structura unui sistem Linux: ce e în fiecare folder"
description: "Ghid practic prin sistemul de fișiere Linux: ce rol au folderele /home, /etc, /usr, /var și /tmp, ce e la rădăcină și cum te plimbi printre ele din terminal."
date: 2026-10-01
category: Utilizare
cover:
  webp: /assets/img/cover-structura.webp
  jpg: /assets/img/cover-structura.jpg
  alt: "Desen cu titlul Structura unui sistem Linux, ce e în fiecare folder"
---

În articolul [Terminalul fără frică](/blog/terminalul-fara-frica/) ai învățat să te miști: `pwd`, `ls`, `cd`. Urmează firesc întrebarea care îl precede pe toate: **dar unde anume te plimbi?** Dacă faci `ls /` și vezi douăzeci de nume scurte — `etc`, `usr`, `var`, `opt` — pare un cod fără cheie. Nu e.

Hai să coborâm în **adâncurile unui sistem Linux** și să vedem ce stă în fiecare folder de acolo. La final știi unde îți sunt fișierele, unde stau programele, unde caută sistemul atunci când ceva nu merge — și, mai ales, ce ai voie să atingi și ce nu. (Termenii tehnici îi găsiți explicați în [Glosarul Linux](/blog/glosar-linux/).)

## Fără litere de unități: totul pornește dintr-un singur loc

Pe Windows, fișierele stau pe „unități": `C:\Windows`, `D:\Poze`. Fiecare disc e un univers separat, iar tu alegi de unde începi. Pe Linux nu există așa ceva: există **un singur arbore** care începe dintr-un singur loc, numit **rădăcină** și scris `/`.

Discurile și partițiile tale **nu au adrese proprii**, ci se „leagă" în acest arbore într-un punct oarecare — de aceea același disc poate apărea ca `/home` sau ca `/mnt/date` ([puncte de montare](/blog/glosar-linux/#puncte-de-montare)). Pornim, deci, din rădăcină:

```text
/
├── home/     ← oamenii și fișierele lor
├── etc/      ← configurările sistemului
├── usr/      ← programele instalate
├── var/      ← jurnale și date ce se schimbă
├── tmp/      ← fișiere temporare
└── ...       ← restul, povestit imediat
```

Rezultatul practic: **unde te-ai afla, adresa unui fișier începe mereu cu `/`** și nu se schimbă în funcție de disc.

Un lucru care te va scuti de surprize: folderele de la rădăcină sunt **aproape identice pe orice distribuție**. Există o convenție numită **FHS** (*Filesystem Hierarchy Standard*) la care se aliniază Ubuntu, Mint, Fedora, Zorin, Pop!_OS, EndeavourOS — așa că înveți structura o dată și o știi peste tot.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">„Rădăcină” nu înseamnă „administrator”</p>
    <p><code>/</code> e pur și simplu începutul arborelui de fișiere — îl poți parcurge liniștit, orice ai fi ca utilizator. Contul de <strong>administrator</strong> (numit și <em>root</em>) e altceva, ține de drepturi, nu de foldere; îl găsești explicat în <a href="/blog/glosar-linux/#administrator">glosar</a>. Confuzia asta îi sperie pe mulți la început, deci merită lămurită din start.</p>
  </div>
</div>

## Harta completă a rădăcinii

Deschide terminalul și dă singur comanda:

```bash
ls /
```

La prima vedere, cam așa arată rădăcina unui sistem proaspăt instalat:

```text
bin    boot   dev    etc    home   lib    lib64   media
mnt    opt    proc   root   run    sbin   srv     sys
tmp    usr    var
```

Ordinea difere, unele foldere mai lipsesc sau mai apar (pe unele sisteme `bin`, `lib` și `sbin` sunt doar săgeți către `/usr` — o curățenie făcută pentru a nu duplica aceleași fișiere), dar **grupurile mari rămân aceleași**. Iată pe scurt ce e fiecare:

| Folder | Ce găsești acolo |
| --- | --- |
| `/home` | fișierele și setările utilizatorilor — adică ale tale |
| `/etc` | toate configurările sistemului, în fișiere text |
| `/usr` | programele instalate: executabile, biblioteci, date |
| `/var` | ce se schimbă mereu: jurnale, coșuri, date ale programelor |
| `/tmp` | fișiere temporare, care dispar la repornire |
| `/opt` | programe „pe stilou”, instalate într-un singur folder |
| `/root` | casa administratorului (nu a ta) |
| `/bin`, `/sbin` | comenzi de bază și comenzi de administrare |
| `/lib` | bibliotecile comune folosite de programe |
| `/dev` | fișierele care „reprezintă” discurile, tastatura, ecranele |
| `/proc`, `/sys` | informații despre sistem, generate în timp real |
| `/boot` | fișierele de care are nevoie calculatorul la pornire |
| `/media`, `/mnt` | locuri unde apar stickurile și discurile montate |
| `/run`, `/srv` | date de funcționare și conținut servit de programe |

Nu trebuie să le înveți pe de rost acum. Trei dintre ele merită o vizită în articolul ăsta: **casa ta**, **configurările** și **programele** — plus una pe care o vei folosi des, **jurnalele**.

## Casa ta: `/home`

Aici locuiești tu. Fiecare utilizator al calculatorului are folderul lui, cu numele lui:

{% image "fs-home", "Terminal cu ls -F /home care arată folderul utilizator, urmat de cd /home/utilizator și ls cu conținutul casei", "ls -F /home arată câți utilizatori sunt (la mine, unul singur). Să intrăm în al nostru și să ne uităm înăuntru: Documente, Imagini, Muzică — folderele clasice, create la prima autentificare." %}

Comanda a început cu `ls -F`: marchează folderele cu `/` (și legăturile, adică scurtăturile, cu `@`), ca să le deosebești din priviri de fișierele obișnuite.

Trei lucruri de reținut de aici:

- **`/home/numele-tău` e singurul loc unde ai libertate totală.** Aici îți ții pozele, documentele, proiectele — și aici poți șterge, muta și organiza cum vrei tu.
- **`~` e prescurtarea pentru casa ta.** Oriunde ai fi în sistem, `cd ~` te aduce acasă, iar promptul îți arată mereu cât de departe ești de casă.
- **Folderele au numele în limba ta.** `Documente`, `Descărcări`, `Imagini` — pentru că la instalare ți s-a ales o limbă. Pe un sistem în engleză ar fi `Documents`, `Downloads`, iar conținutul ar fi exact același.

Mai e un detaliu pe care îl vei întâlni: **fișierele care încep cu punct** (`.bashrc`, `.config`) sunt ascunse la `ls` obișnuit — sunt setările tale personale, ale programelor pe care le folosești. Le vezi cu `ls -a`, dar deocamdată e bine doar să știi că sunt acolo.

## Configurările: `/etc`

Folderul `/etc` e creierul configurat al sistemului: zeci de fișiere text care spun sistemului cum să se poarte — ce discuri se montează la pornire, cum se numește calculatorul în rețea, ce utilizatori există.

{% image "fs-etc", "Terminal cu comanda ls /etc | head -18, arătând primele rânduri din folderul de configurări", "O bucată din /etc: fișiere și foldere de configurare pentru tot ce rulează pe sistem. Lista e lungă (de regulă câteva sute de intrări) și diferă de la o distribuție la alta." %}

Câteva intrări pe care le vei folosi mai târziu:

- **`/etc/fstab`** — harta montării: ce partiții se leagă la pornire și unde. Se atinge rar, dar e primul loc unde te uiți când un disc nu apare cum te aștepți.
- **`/etc/hostname`** — numele calculatorului tău, într-un singur rând.
- **`/etc/skel`** — „modelul" folderului de home: de aici copiază sistemul toate fișierele când creezi un utilizator nou.
- **`/etc/hosts`** — traducerea numelor din rețea în adrese.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Mini-lecție: semnul <code>|</code></p>
    <p>În captura de mai sus ai văzut <code>ls /etc | head -18</code>. Semnul <code>|</code> (se citește „conductă”) ia ieșirea comenzii din stânga și o trimite mai departe celei din dreapta, care o „ține” pe primele 18 de rânduri. E exact ce ai nevoie când o listă e prea lungă pentru ecran — și o vei folosi des, inclusiv mai jos, la exercițiu.</p>
  </div>
</div>

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Privește, dar nu atinge (deocamdată)</p>
    <p>Citirea din <code>/etc</code> e complet sigură: <code>ls</code> și <code>cat</code> nu strică nimic. Editarea unui fișier de acolo, în schimb, poate opri sistemul din pornire sau din rețea. Regula noastră pentru început: <strong>în <code>/etc</code> ești turist cu aparatul de fotografiat</strong> — scrii ce ți se pare interesant și întrebi înainte să modifici.</p>
  </div>
</div>

## Programele: `/usr`, `/opt` și de unde vin comenzile

Folderul `/usr` conține, cu o excepție de nume, cam toate programele din sistem:

{% image "fs-usr", "Terminal cu ls -1F /usr care arată toate subfolderele lui, urmat de cd /usr/bin și ls care arată comenzile ls, pwd, cat și mkdir", "Sus: toate subfolderele din /usr, câte unul pe rând — bin cu executabilele, lib cu bibliotecile, man cu manualele, share cu datele comune, cum ar fi pictogramele și traducerile. Jos: am intrat în /usr/bin și am cerut tocmai comenzile din articolul precedent — uite unde își au casa." %}

- **`/usr/bin`** — aici stau comenzile pe care le scrii tu: `ls`, `pwd`, `mkdir`, `firefox`. Dacă o comandă „nu e găsită”, înseamnă că programul ei nu e instalat aici (încă).
- **`/usr/lib`** — bibliotecile: codul folosit de mai multe programe odată, ca să nu se repete fiecare.
- **`/usr/share`** — date care nu sunt cod: pictograme, traduceri, fișiere de ajutor.
- **`/usr/man`** (sau `/usr/share/man`) — unde stau manualele pe care ți le deschide comanda [`man`](/blog/glosar-linux/#man) despre care am vorbit în articolul precedent.
- **`/usr/sbin`** — comenzi de administrare, folosite de sistem, nu de tine zi de zi.

Denumirea e o amintire istorică: `usr` înseamnă **Unix System Resources**, nu „user” — folderul nu are nicio treabă cu utilizatorii, deși așa pare la prima citire. Folderul de utilizator e tot în `/home`, separat, cum ai văzut mai sus.

Ce e în afara lui: **`/opt`** pentru programe care vin ca atare, într-un singur folder (fără să se împrăștie prin sistem), și **`/usr/local`** pentru cele instalate manual de tine.

## Jurnalele: `/var`

`/var` e folderul care **se schimbă tot timpul** — de aici și numele (de la *vary*, „a varia”). Aici trăiesc, între altele, jurnalele sistemului:

{% image "fs-log", "Terminal cu ls -1 /var/log urmat de head -18, arătând primele fișiere de jurnal: Xorg.0.log, archinstall, boot.log", "Jurnalele: câte un fișier pentru fiecare parte a sistemului. Când ceva nu merge, de aici începe căutarea (am scurtat lista la primele rânduri; restul diferea de la distribuție la distribuție)." %}

- **`/var/log`** — „ce s-a întâmplat”: porniri, erori, programe care au pornit sau au picat. Când Linuxul tău se poartă ciudat, primul sfat e adesea „uită-te în log-uri” — și, din fericire, te poți uita acolo fără niciun drept special.
- **`/var/cache`** — descărcări păstrate temporar, ca să nu se mai ia o dată.
- **`/var/lib`** — datele pe care și le țin programele instalate (baze de date, cozi de tipărire, listele magazinelor de pachete).

## Foldere care nu stau pe disc: `/proc`, `/sys`, `/dev`, `/run`, `/tmp`

Câteva intrări de la rădăcină nu sunt deloc fișiere pe disc, deși arată ca niște foldere:

- **`/proc`** și **`/sys`** — instantanee despre ce se întâmplă *acum*: procesele care rulează, procesoarele, memoria. Sistemul le „desenează” în timp real; dacă repornești, se rescriu.
- **`/dev`** — dispozitivele sub formă de fișiere: discul tău apare aici ca `/dev/sda` sau `/dev/nvme0n1`, ecranul, tastatura, stickul USB.
- **`/run`** — date de funcționare ale programelor care merg în acest moment (nu contează prea mult la început).
- **`/tmp`** — cutia cu nisip: tot ce pui aici e temporar și **dispare la repornire**. Perfect pentru teste, fără să murdărești nimic.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">Cititul e mereu sigur</p>
    <p>Poți parcurge orice folder de mai sus cu <code>ls</code> și <code>cd</code> fără niciun risc — nici măcar în <code>/proc</code> sau <code>/sys</code> nu „strici” ceva privind. Ce poate lăsa urme e scrisul: ștergeri, mutări, editări. Iar acelea, în afara <code>/home</code>, se fac doar când știi exact de ce.</p>
  </div>
</div>

## Ce ai voie să atingi și ce nu

Pe scurt, în ordinea cât se poate de practică:

1. **`/home`** — al tău, în întregime. Lucrezi aici cât vrei.
2. **`/tmp`** — al tău și temporar. Testezi aici fără grijă.
3. **`/media`, `/mnt`** — apar stickurilor și discurilor montate.
4. **`/etc`, `/usr`, `/bin`, `/lib`, `/var`** — ale sistemului. Le citești oricând; le modifici doar cu un motiv bun, cu `sudo`, și (mai devreme sau mai târziu) știind ce faci.
5. **`/root`** — casa administratorului. Nici nu poți intra acolo fără `sudo`, iar dacă nu ai un motiv întemeiat, n-ai de ce.

Plimbarea în sine e însă mereu gratuită: `cd` și `ls` nu deschid, nu șterg și nu mută nimic. Frica de terminal se vindecă exact așa — intrând în foldere și uitându-te înăuntru.

## Exercițiu de cinci minute

Deschide terminalul și fă drumul ăsta, în ordine. La fiecare pas, întreabă-te ce te aștepți să vezi — apoi dă Enter și vezi dacă ai avut dreptate:

1. `ls /` — confirmă harta de la începutul articolului.
2. `cd /etc` apoi `ls | head -18` — o bucată din configurări, ținută în frâu de conducta învățată mai devreme.
3. `cd ~` — te întorci acasă, dintr-o mișcare.
4. `ls -a` — uite-te la fișierele cu punct, setările tale.
5. `ls /home` — vezi ceilalți utilizatori (la tine, poate, doar pe tine).
6. `ls /usr` — recunoaște folderele din poză: `bin`, `lib`, `man`, `share`.
7. `ls /var/log` — aruncă un ochi la jurnale; dacă vreodată ceva nu merge, știi de unde pleci.
8. `cd ~` — închei mereu de acasă, ca un obicei bun.

Dacă toate cele opt au mers, știi deja mai mult decât credeai despre mașinăria pe care o folosești: unde îți sunt fișierele, unde stau programele, unde se configurează totul și unde se notează ce se strică.

## Ce urmează

Structura e acum a ta. În categoria [Utilizare](/categorii/utilizare/) adăugăm pe rând restul lucrurilor de zi cu zi — instalarea de programe din terminal, actualizările, fișierele și permisiunile — iar dacă vreun cuvânt din articol te-a oprit din citit, [Glosarul Linux](/blog/glosar-linux/) are definiția lui.

Dacă încă nu ai un sistem pe care să exersezi, începe de la [alegerea distribuției](/blog/alege-distributia/), apoi [ghidul de instalare Linux Mint](/blog/ghid-instalare-linux-mint/) sau [cel de Ubuntu](/blog/cum-instalezi-ubuntu/) — iar pentru comenzi, înapoi la [Terminalul fără frică](/blog/terminalul-fara-frica/).
