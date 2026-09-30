---
title: "DE-uri sau WM-uri"
description: "Ce sunt un Desktop Environment și un Window Manager, care e diferența dintre ele și pe care să-l alegi — plus cele mai cunoscute medii desktop din Linux."
date: 2024-09-25
updated: 2024-09-26
category: Customizare
cover:
  webp: /assets/img/cover-de-wm.webp
  jpg: /assets/img/cover-de-wm.jpg
  alt: "Medii desktop și window managere din Linux"
---

Dacă ești nou în lumea Linux, probabil ai auzit termeni precum **Desktop Environment** și **Window Manager**, și te întrebi ce sunt și de ce contează. Nu-ți face griji, este un subiect care poate părea complex la început, dar este ușor de înțeles odată ce ai o imagine clară. În acest articol, îți voi explica pe înțelesul tuturor ce reprezintă fiecare termen și care este diferența dintre ele.

## Ce este un Desktop Environment (DE)?

Un **Desktop Environment** (sau **mediu desktop**) este interfața completă pe care o folosești atunci când navighezi pe un sistem de operare Linux. Este partea vizuală care face legătura între tine și computerul tău, similar cu ceea ce vezi atunci când folosești Windows sau macOS. Un mediu desktop include tot ceea ce ai nevoie pentru a interacționa cu sistemul:

- **Ferestrele** pe care le deschizi.
- **Bara de activități** sau dock-ul (locul unde vezi aplicațiile deschise).
- **Meniurile**, unde cauți și deschizi programe.
- Aplicații de bază, cum ar fi **managerul de fișiere**, **setările sistemului**, **ceasul** etc.

## Ce este un Window Manager (WM)?

Un **Window Manager** este un program care controlează modul în care **ferestrele** aplicațiilor sunt afișate și gestionate pe ecranul tău. Practic, este responsabil pentru ceea ce se întâmplă atunci când deschizi, închizi, redimensionezi sau muți o fereastră.

Window Manager-ul funcționează sub capotă în multe medii desktop, dar poate fi folosit și singur, fără un mediu desktop complet. Un Window Manager nu include toate elementele pe care le are un Desktop Environment — de exemplu, nu vine cu un manager de fișiere sau cu setări complexe ale sistemului. În schimb, se ocupă doar de **plasarea ferestrelor** și cum interacționezi cu ele.

### Tipuri de Window Managers

- **Tiling Window Managers** (ex: **i3**, **AwesomeWM**, **Hyprland**): organizează ferestrele fără să le suprapună. Toate ferestrele sunt afișate ca „plăci” care ocupă ecranul în mod eficient.
- **Stacking Window Managers** (ex: **Openbox**, **Fluxbox**): funcționează mai asemănător cu ferestrele din Windows sau macOS, unde le poți suprapune și muta oriunde pe ecran.
- **Compositing Window Managers** (ex: **Compiz**): permit efecte vizuale avansate, cum ar fi transparența ferestrelor sau animații fluide.

## Diferențele majore între DE și WM

1. **Complexitate și funcționalitate**
   - Un **Desktop Environment** oferă o experiență completă, cu tot ce ai nevoie pentru a folosi un computer — aplicații preinstalate, setări, ferestre și bară de activități.
   - Un **Window Manager** este mai simplu și se concentrează doar pe gestionarea ferestrelor. Poți adăuga componente separate dacă ai nevoie (ex: un manager de fișiere).

2. **Personalizare**
   - **Window Managers** sunt mult mai flexibili și personalizabili. Utilizatorii avansați pot configura totul după cum doresc, de la comenzi rapide de tastatură la plasarea automată a ferestrelor.
   - **Desktop Environments** sunt mai ușor de folosit și vin preconfigurate, dar oferă mai puțină libertate pentru personalizare extremă.

3. **Resurse**
   - Un **Desktop Environment** consumă mai multe resurse (memorie RAM, putere de procesare) deoarece oferă o experiență completă și complexă.
   - Un **Window Manager** este foarte ușor și folosește puține resurse, făcându-l ideal pentru calculatoarele mai vechi sau pentru utilizatorii care doresc performanțe maxime.

## Când să folosești fiecare

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Desktop Environment</p>
    <p>Dacă ești un utilizator nou de Linux sau pur și simplu vrei ca totul să funcționeze din prima, fără configurări avansate, un mediu desktop complet este cea mai bună alegere. Vei avea totul la îndemână și nu va trebui să instalezi manual aplicații esențiale.</p>
  </div>
</div>

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Window Manager</p>
    <p>Dacă îți place să personalizezi fiecare detaliu și să controlezi exact cum funcționează sistemul tău, sau dacă ai un computer mai vechi și vrei o experiență rapidă și eficientă, atunci un Window Manager ar putea fi pentru tine.</p>
  </div>
</div>

## Ce conține de fapt un mediu desktop

Un mediu desktop reunește o varietate de componente pentru a oferi elemente comune de interfață grafică cu utilizatorul, cum ar fi pictograme, bare de instrumente, imagini de fundal și widget-uri pentru desktop. În plus, majoritatea mediilor desktop includ un set de aplicații și utilitare integrate.

Cel mai important, mediile desktop oferă propriul [manager de ferestre (Window Manager)](https://wiki.archlinux.org/title/Window_manager), care poate fi însă înlocuit de obicei cu altul compatibil.

Utilizatorul este liber să își configureze mediul GUI în orice număr de moduri. Mediile desktop oferă pur și simplu un mijloc complet și convenabil de a îndeplini această sarcină. Rețineți că utilizatorii sunt liberi să combine aplicații din mai multe medii desktop.

## Cele mai cunoscute medii desktop

Mai jos, câteva dintre cele mai cunoscute și folosite medii desktop (DE):

- {% thumb "de-kde", "KDE Plasma" %}**KDE Plasma** este un mediu desktop cuprinzător și flexibil care oferă mai multe stiluri de meniuri pentru a accesa aplicații. Dispune de managerul de ferestre KWin. KDE Plasma are, de asemenea, o interfață intuitivă care vă permite să descărcați și să instalați cu ușurință noi teme, widget-uri și multe altele de pe web.

- {% thumb "de-gnome", "GNOME" %}**GNOME** este un mediu desktop ușor de utilizat, cu o interfață tactilă pentru accesarea aplicațiilor. Deși este ușor de învățat, poate avea opțiuni limitate de personalizare și poate fi dificil de configurat.

- {% thumb "de-xfce", "XFCE" %}**XFCE** este un mediu desktop ușor și flexibil, cu un meniu tradițional drop-down/pop-up pentru accesarea aplicațiilor și este compatibil cu Compiz. Personalizarea poate necesita unele eforturi pentru a se potrivi cu preferințele personale.

- {% thumb "de-budgie", "Budgie" %}**Budgie** este un mediu desktop simplu și elegant, construit folosind setul de instrumente GTK. Este conceput pentru a oferi o interfață modernă și atractivă care este ușor de utilizat, fiind în același timp extrem de configurabilă.

- {% thumb "de-cinnamon", "Cinnamon" %}**Cinnamon** este un mediu desktop pentru Linux care echilibrează funcțiile avansate cu o experiență tradițională de utilizator.

- {% thumb "de-cosmic", "Cosmic" %}**Cosmic** este un mediu desktop modern, orientat spre performanță, construit cu Rust și Smithay. Proiectat pentru productivitate și utilizatori cu putere, oferă funcții avansate și o interfață curată și intuitivă. Suportul pentru redare software nu este disponibil. *(În prezent în alfa.)*

- {% thumb "de-hyprland", "Hyprland" %}**Hyprland** este un compozitor Wayland plăcut din punct de vedere vizual, care folosește tiling dinamic. Vine cu fișiere de puncte preconfigurate. ***Momentan instabil.***

- {% thumb "de-lxde", "LXDE" %}**LXDE** (Lightweight X11 Desktop Environment) este un mediu desktop rapid și care economisește energie, conceput pentru a fi utilizat pe computere mai vechi și sisteme cu resurse limitate. Folosește Openbox ca manager de ferestre implicit și se concentrează pe furnizarea unei interfețe simple, curate și ușor de utilizat.

- {% thumb "de-lxqt", "LXQt" %}**LXQt** este un mediu desktop ușor format din fuziunea proiectelor LXDE și Razor-qt și construit cu Qt.

- {% thumb "de-mate", "MATE" %}**MATE Desktop** este un mediu desktop tradițional derivat din GNOME 2. Se caracterizează prin aspectul și senzația sa clasică, cu o interfață de utilizator simplă și intuitivă. MATE oferă o experiență desktop ușor de utilizat și extrem de personalizabilă pentru utilizatorii care preferă un aspect și o senzație mai clasică.

- {% thumb "de-pantheon", "Pantheon" %}**Pantheon** este un mediu desktop minimalist și elegant, dezvoltat pentru **elementary OS**, cu o interfață simplă, inspirată din macOS. Este optimizat pentru performanță și resurse, oferind un set de aplicații proprii, precum **Plank** (dock), **Gala** (manager de ferestre) și **Slingshot** (lansator de aplicații). Deși are opțiuni limitate de personalizare, Pantheon se concentrează pe o experiență curată, intuitivă și sigură, ideală pentru utilizatorii care apreciază simplitatea.

- {% thumb "de-deepin", "Deepin" %}**Deepin** este un mediu desktop elegant și modern, creat pentru **Deepin OS**, cu un design atrăgător și personalizabil. Oferă o interfață intuitivă, cu elemente vizuale rafinate și o tranziție fluidă între modurile de utilizare clasic și eficient. Include aplicații proprii, cum ar fi **Deepin File Manager**, **Deepin Terminal** și **Deepin Control Center**, și pune accent pe estetică, experiență plăcută și ușurință în utilizare. Deepin este ideal pentru utilizatorii care doresc un mediu desktop vizual atractiv și personalizabil, cu performanțe bune.

## Concluzie

Fie că preferi minimalismul, flexibilitatea extremă sau performanța pe hardware modest, Linux îți permite să-ți personalizezi complet mediul de lucru, făcându-l atractiv pentru o gamă largă de utilizatori, de la începători la avansați.

Dacă încă nu ai ales distribuția din care va veni mediul ăsta de desktop, începe cu [Un ocean de ... distribuții](/blog/un-ocean-de-distributii/).
