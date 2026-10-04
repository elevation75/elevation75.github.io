---
title: "Cum instalezi programe fără magazin: apt, dnf, pacman și Flatpak"
description: "Căutare, instalare și ștergere din terminal cu apt (Ubuntu, Debian, Mint), dnf (Fedora), pacman (Arch, EndeavourOS) și Flatpak — cu exemple și cu ce alegi când programul nu e în magazin."
date: 2026-10-04
category: Utilizare
cover:
  webp: /assets/img/cover-programe.webp
  jpg: /assets/img/cover-programe.jpg
  alt: "Coperta articolului: „Instalare aplicații fără magazin”, cu ferestre de terminal care arată comenzi pentru apt, pacman, yay și Flatpak"
---

Magazinele grafice ale distribuțiilor sunt comode: cauți, apeși butonul, se instalează. Dar apar momentele în care **programul nu e deloc acolo**, sau e acolo cu o versiune veche, sau vrei să-l instalezi pe cinci calculatoare deodată fără să dai clic de cinci ori. Atunci se deschide terminalul — și, surpriză, e mai simplu decât crezi, fiindcă peste tot se repetă aceleași patru mișcări: *caută, instalează, șterge, actualizează*.

În articolul [Terminalul fără frică](/blog/terminalul-fara-frica/) ai învățat cum se dă o comandă, iar în [articolul despre permisiuni](/blog/permisiuni-linux/) ai văzut de ce unele comenzi cer drepturi de administrator. Aici le punem la treabă. Dacă vreun cuvânt ți-e străin, e în [Glosarul Linux](/blog/glosar-linux/).

## De ce merită instalat din terminal

Fiecare distribuție ține o listă cu programe **verificate de ea**, pe servere ale ei — se numește *repositoriu*. Din momentul în care instalezi prin terminal, primești patru lucruri pe care o descărcare obișnuită nu ți le dă:

- **Verificare** — pachetul a fost pregătit și testat de distribuție, nu de un site necunoscut.
- **Dependențe rezolvate automat** — programul are nevoie de alte librării? ți le aduce el, fără să cauți manual.
- **Actualizări dintr-un singur loc** — programul intră la locul lui în actualizările de sistem.
- **Dezinstalare curată** — la ștergere, sistemul știe exact ce fișiere adusese și le ia înapoi.

Iar unde ajung fișierele după instalare ți-am arătat în [Structura unui sistem Linux](/blog/structura-sistemului-linux/): în `/usr`, cu programele din surse externe în `/opt`.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Despre <code>sudo</code> și parola care „nu se vede”</p>
    <p>Când un program se instalează în sistem, terminalul îți cere parola de administrator. Ai scris-o greșit? Nu se întâmplă nimic rău — mai încearcă o dată. Și ține minte: <strong>parola nu se afișează nici măcar cu steluțe</strong>, cursorul stă cuminte în loc. Detaliile despre permisiuni sunt în <a href="/blog/permisiuni-linux/">articolul precedent</a>.</p>
  </div>
</div>

## Aceleași patru operațiuni, trei comenzi

Fiecare distribuție are propria ei unealtă, dar gândirea e identică. Diagrama de mai jos e tot ce trebuie să reții:

{% image "prog-comenzi", "Diagramă comparativă cu patru operațiuni — instalează, caută, șterge, actualizează — și comenzile echivalente pentru apt, dnf și pacman", "Aceleași patru operațiuni în cele trei unelte. Partea colorată e verbul: restul rămâne la fel, iar la final pui numele programului." %}

Schema unei comenzi e mereu aceeași: **cine face treaba** (`sudo`, când e nevoie de drepturi de administrator), **unealta** (`apt`, `dnf` sau `pacman`), **verbul** (`install`, `remove`, `-S`, `-R`…) și **numele programului**.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">Numele programului nu e mereu numele lui cunoscut</p>
    <p>Firefox e <code>firefox</code>, GIMP e <code>gimp</code>, dar sunt și excepții — de exemplu Google Chrome pe Fedora se cheamă <code>google-chrome-stable</code>. Dacă nu-l găsești, încearcă variante mai scurte ale numelui sau caută programul pe <a href="https://flathub.org">flathub.org</a>, ca să vezi cum se cheamă exact.</p>
  </div>
</div>

## apt: Debian, Ubuntu, Linux Mint, Pop!_OS, Zorin

Pe această familie de distribuții uneltă se numește **apt**. Comanda de mai jos e singura de care ai nevoie ca să pornești:

```bash
sudo apt update        # lista de programe, actualizată
sudo apt install htop  # instalează programul
apt search htop        # caută
sudo apt remove htop   # șterge
sudo apt autoremove    # curăță resturile
```

`apt update` nu actualizează **programele**, ci *lista* cu ce există în repositoriu — de aceea e bine să-l rulezi înainte de o instalare, ca sistemul să știe de versiunile cele mai noi. (În Magazine, butonul de actualizare face exact asta, pe sub capotă.)

## dnf: Fedora

Pe Fedora, unealta se numește **dnf** și vorbește cam la fel:

```bash
sudo dnf install htop  # instalează programul
dnf search htop        # caută
sudo dnf remove htop   # șterge
sudo dnf info htop     # detalii despre program
sudo dnf upgrade       # actualizează tot sistemul
```

Diferența de la sfârșit e importantă: la `dnf` cuvântul `upgrade` fără nume de program înseamnă **„actualizează tot"**, nu doar „fă ceva". Cu `upgrade nume-program` actualizezi doar pe acela.

## pacman: Arch Linux și EndeavourOS

Arch și derivatele lui (EndeavourOS, Manjaro) folosesc **pacman**, cu verbe scurte — de asta arată altfel în diagramă:

```bash
sudo pacman -S htop    # instalează programul
pacman -Ss htop        # caută
sudo pacman -R htop    # șterge
sudo pacman -Syu       # actualizează tot sistemul
```

Iată cum arată o căutare și o fișă de informații, pe un terminal adevărat:

{% image "pkg-pacman", "Terminal în care rulează pacman -Ss htop urmat de pacman -Si htop, cu rezultatele căutării și fișa cu versiunea, descrierea și licența programului", "pacman -Ss găsește programe care au htop în nume sau descriere, iar -Si îți deschide fișa lui: versiune, descriere, licență, dependențe." %}

Prima coloană din căutare e repositoriul de unde vine programul (`extra` e unul dintre repo-urile oficiale), iar liniile de sub nume sunt descrierile.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Pe Arch, actualizează <strong>tot</strong>, sau deloc</p>
    <p>Arch nu acceptă actualizări pe jumătate: dacă reîmprospătezi lista cu <code>-Sy</code> și instalezi doar un program, poți ajunge cu versiuni noi de librării și programe vechi care se strică. De aceea regula comunității e simplă — <strong>folosește <code>-Syu</code></strong> (listă nouă + toate programele deodată). E și mai rapid decât să te stresezi cu ce ai uitat.</p>
  </div>
</div>

## Flatpak: programul care merge pe orice distribuție

Aici se schimbă puțin povestea. **Flatpak** nu e unealta unei distribuții, ci un sistem de ambalare a programelor care funcționează **la fel pe orice distribuție Linux** — Ubuntu, Fedora, Arch, Mint, oricare. Programul vine cu librăriile lui cu tot și rulează într-o **cutie izolată** (*sandbox*): nu se atinge de fișierele tale decât dacă îi dai voie, exact cum am descris în [articolul despre permisiuni](/blog/permisiuni-linux/).

Magazinul de unde se iau programe se numește **Flathub**. Comenzi de bază:

```bash
flatpak search --columns=name vlc  # caută
flatpak install flathub org.videolan.VLC
flatpak update                     # actualizează tot
flatpak uninstall org.videolan.VLC # șterge
flatpak list                       # ce ai instalat
```

{% image "pkg-flatpak", "Terminal în care rulează două căutări flatpak: prima arată numele programelor găsite, a doua arată identificatorul fiecăruia, precum org.videolan.VLC", "Prima căutare îți dă numele, ca să recunoști programul. A doua îți dă identificatorul (ID-ul) — exact ce pui după install, fiindcă Flatpak se pricepe la nume tehnice, nu la denumiri comerciale." %}

Ai observat poate că unele ID-uri sunt lungi și au puncte (`org.videolan.VLC.Plugin.bdj`): sunt fișiere auxiliare ale programului, nu programul însuși. Caută rândul care conține pur și simplu numele lui — de exemplu `org.videolan.VLC`.

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">Actualizările Flatpak, separat de sistem</p>
    <p>Programele instalate cu Flatpak <strong>nu se actualizează odată cu sistemul</strong>: au un comandă a lor, <code>flatpak update</code>. Motiv pentru care merită să știi că ele există în două locuri deodată — la actualizările de sistem și la alea Flatpak. Despre actualizări, pas cu pas, e vorba în articolul următor din serie.</p>
  </div>
</div>

## De unde vine programul, de fapt

Cu tot ce am spus, harta arată așa:

{% image "prog-origine", "Diagramă cu trei feluri din care poate veni un program: repositoriul distribuției, Flatpak cu Flathub și fișierul descărcat, fiecare cu avantajele și cu gradul de siguranță", "Trei surse, trei atitudini: repositoriul distribuției e cel mai sigur, Flatpak e foarte bun și mai nou, iar fișierul descărcat de pe internet depinde complet de cine l-a pus acolo." %}

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Fișierele <code>.deb</code>, <code>.rpm</code> și AppImage</p>
    <p>Dacă ți-a dat cineva un fișier de genul ăsta — sau l-ai luat de pe site-ul oficial al programului — instalează-l doar dacă <strong>știi de unde vine</strong>. Un <code>.deb</code> instalat prost poate lăsa în urmă fișiere pe care nimeni nu le mai șterge, iar actualizarea îi rămâne pe capul tău. În rest, sursele de mai sus sunt de ajuns pentru orice program obișnuit.</p>
  </div>
</div>

## Ce alegi în zece secunde

{% image "prog-alege", "Diagramă în trei pași: cauți în magazinul distribuției, dacă nu e acolo cauți pe Flatpak, iar fișierele descărcate se instalează doar din surse cunoscute", "Trei pași în ordine: mai întâi la tine, în magazinul distribuției; apoi pe Flathub; iar fișierele descărcate, doar dacă știi de unde vin." %}

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Și Snap, despre care sigur ai auzit pe Ubuntu</p>
    <p><strong>Snap</strong> e varianta Canonical (compania din spatele Ubuntu) pentru același lucru ca Flatpak: program ambalat separat, care merge pe orice distribuție. Se instalează cu <code>sudo snap install nume</code> și există doar implicit pe Ubuntu. Pe blog recomandăm <strong>Flatpak</strong>: e mai larg acceptat, are Flathub ca magazin central și nu depinde de o singură companie.</p>
  </div>
</div>

## Ce ai reținut

Patru mișcări și trei unelte: **caută, instalează, șterge, actualizează** — cu `apt` pe Ubuntu/Debian/Mint, cu `dnf` pe Fedora, cu `pacman` pe Arch, și cu `flatpak` peste tot, când programul nu e în magazinul distribuției sau vrei versiunea mai nouă. Restul e practică: cu cât scrii comanda de câteva ori, cu atât îți vine mai ușor să o scrii din nou.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Exercițiu de un minut</p>
    <p>1) Caută un program pe care-l știi deja, dar nu-l ai instalat, cu comanda de căutare a distribuției tale. 2) Aceeași căutare, dar pe Flatpak: care ID ți se pare mai limpede? 3) Scrie, fără să rulezi, comanda prin care ai șterge acel program — apoi compar-o cu diagrama.</p>
  </div>
</div>

În categoria [Utilizare](/categorii/utilizare/) continuă seria: [Terminalul fără frică](/blog/terminalul-fara-frica/), [Structura unui sistem Linux](/blog/structura-sistemului-linux/), [Permisii în Linux](/blog/permisiuni-linux/), iar în articolul următor vorbim despre **actualizări** — cum se fac, cât de des, și cum îți păstrezi sistemul în siguranță cu Timeshift.

<em>Surse: paginile man <a href="https://manpages.debian.org/bookworm/apt/apt.8.en.html">apt(8)</a> din manualul oficial al proiectului APT (licențiat GPL-2+), pagina <a href="https://docs.fedoraproject.org/en-US/quick-docs/dnf/">Using the DNF software package manager</a> din documentația oficială Fedora (CC BY-SA 4.0), pagina <a href="https://wiki.archlinux.org/title/Pacman">Pacman</a> din ArchWiki (GFDL 1.3+) și <a href="https://docs.flatpak.org/en/latest/">documentația oficială Flatpak</a> (CC BY 4.0). Textul de față este o adaptare și traducere în limba română a acelor surse; capturile de ecran și diagramele sunt realizate pentru blog.</em>
