---
title: "Ghid pas cu pas: Cum să instalezi Ubuntu Linux pe calculatorul tău"
description: "Instalarea Ubuntu explicată pas cu pas, ecran cu ecran: compatibilitatea hardware, backup-ul, stick-ul bootabil cu Rufus, fiecare opțiune a instalatorului (disc, criptare, BitLocker, cont, fus orar) și primii pași de după instalare."
date: 2026-09-29
category: Ghid Distribuții
cover:
  webp: /assets/img/cover-cum-instalezi-ubuntu.webp
  jpg: /assets/img/cover-cum-instalezi-ubuntu.jpg
  alt: "Ilustrație cu titlul ghidului de instalare Ubuntu"
---

Ubuntu este una dintre cele mai populare, stabile și prietenoase distribuții de Linux din lume. Fie că vrei să renunți la Windows, fie că vrei să încerci ceva nou într-un sistem dual-boot, acest ghid te trece prin tot procesul, de la pregătire până la prima pornire — ecran cu ecran, exact cum îl vezi în instalator.

Dacă încă nu ești sigur că Ubuntu e alegerea potrivită, [Ghidul complet de instalare Linux](/blog/alege-distributia/) te ajută să compari distribuțiile, iar [Cum treci de la Windows la Linux](/blog/schimba-sistemul/) îți arată cum să pregătești tranziția fără bătăi de cap.

Instalatorul Ubuntu te întreabă doar câteva lucruri, iar dacă nu ești sigur ce să alegi, **opțiunea implicită este întotdeauna o alegere bună** — nu ai nevoie de cunoștințe tehnice avansate.

## 1. Cerințe de sistem și pregătiri

Înainte de a începe, asigură-te că ai la îndemână:

- **Un stick USB de cel puțin 8 GB** — datele de pe el vor fi șterse.
- **Un PC sau laptop cu minim 4 GB RAM**, procesor dual-core de 2 GHz și 25 GB spațiu liber pe disc.
- **O conexiune la internet**, pentru descărcarea imaginii ISO și a actualizărilor. (În instalator, rețeaua e opțională: fără ea instalarea funcționează, dar nu se descarcă actualizări și drivere în timpul instalării.)

### Funcționează Ubuntu pe calculatorul tău?

Ubuntu merge pe o gamă foarte largă de calculatoare. Cea mai sigură cale este să verifici lista de [hardware certificat Ubuntu](https://ubuntu.com/certified) — acele dispozitive sunt testate explicit.

Dacă modelul tău nu apare acolo, nu te descuraja: rulează Ubuntu de pe stick (vezi [„Try Ubuntu"](https://ubuntu.com/desktop/docs/en/latest/tutorial/try-ubuntu-desktop/)) și verifică dacă merg Wi-Fi-ul, sunetul, ecranul și touchpad-ul. Dacă da, instalarea va merge și ea.

Câteva excepții de știut:

- **Mac-urile cu Apple Silicon** (M1, M2 și următoarele) nu folosesc Ubuntu-ul oficial, ci proiectul comunitar [Ubuntu Asahi](https://ubuntuasahi.org/) — suportul depinde de model.
- **Raspberry Pi** și alte plăci ARM/RISC-V au imagini proprii, documentate în [hardware support](https://ubuntu.com/hardware/docs/).
- Vrei doar să încerci, fără să atingi nimic? Poți rula Ubuntu într-o mașină virtuală cu [Multipass](https://documentation.ubuntu.com/multipass/).

### Backup: ce salvezi înainte de orice

Dacă instalezi pe un calculator pe care l-ai folosit până acum, fă backup înainte să înghiți niciun „Next":

- **Fișierele** — documente, fotografie, filme — pe un disc extern sau în cloud.
- **Browserul** — conectează browserul la un cont online (Firefox sau Google). După instalare, te loghezi și datele (semne de carte, parole, istoric) se sincronizează singure. Atenție: **Safari nu există pe Ubuntu**.
- **Stick-ul USB** — oricum va fi șters.

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Backup înainte de orice</p>
    <p>Partiționarea discului este singurul pas în care se pot pierde fișiere. Un backup pe un disc extern te scapă de orice emoție — fă-l acum, durează zece minute.</p>
  </div>
</div>

## 2. Descărcarea imaginii ISO și pregătirea stick-ului

### Descarcă ISO-ul oficial

Mergi pe [Download Ubuntu Desktop](https://ubuntu.com/download/desktop) și descarcă cea mai recentă versiune **LTS** (*Long Term Support* — recomandată pentru stabilitate, cu actualizări susținute cinci ani). Fișierul se numește ceva de genul `ubuntu-26.04-desktop-amd64.iso`.

### Creează stick-ul bootabil cu Rufus (Windows)

Scrierea imaginii pe stick **nu** este aceeași lucru cu copierea fișierului — ai nevoie de un program special. Pe Windows, cel mai popular este [Rufus](https://rufus.ie):

1. Descarcă cea mai recentă versiune de Rufus de pe site-ul oficial. (Dacă mai ai Windows 7, folosește versiunea 3.22.)
2. Rulează programul și permite-i actualizările online, dacă te întreabă.
3. Introdu stick-ul USB — apare automat în câmpul **Device**. Dacă arată alt dispozitiv, alege-l pe cel corect din meniu.
4. Apasă **SELECT** de lângă *Boot selection* și alege fișierul `.iso` descărcat. (Dacă butonul zice **DOWNLOAD**, întâi deschide săgeata și schimbă-l pe **SELECT**.)

{% image "ubuntu-rufus-iso", "Fereastra Rufus cu imaginea Ubuntu selectată", "În Device apare stick-ul tău, iar în Boot selection fișierul .iso descărcat." %}

5. Lasă celelalte opțiuni pe valorile implicite — sunt bune așa cum sunt.
6. Apasă **START** ca să înceapă scrierea.
7. Rufus îți spune că imaginea este *ISOHybrid* (aceeași imagine merge și pe stick, și pe DVD) — confirmă **Write in ISO Image mode**.

{% image "ubuntu-rufus-isohybrid", "Dialogul ISOHybrid din Rufus", "Confirmă Write in ISO Image mode și apoi Yes, dacă îți cere fișiere suplimentare." %}

8. Dacă Rufus vrea să descarce fișiere suplimentare, alege **Yes**.
9. Rufus avertizează că toate datele de pe stick vor fi șterse — verifică încă o dată dispozitivul și confirmă cu **OK**.

Scrierea durează aproximativ 10 minute. Când bara de status arată **READY**, apasă **CLOSE** — stick-ul e gata.

{% image "ubuntu-rufus-ready", "Rufus a terminat de scris imaginea pe stick", "Când bara de status din josul ferestrei arată READY, apasă CLOSE." %}

### Alternative: balenaEtcher și Ventoy

Dacă Rufus îți dă bătăi de cap, [balenaEtcher](https://etcher.balena.io/) face același lucru în trei pași: **Flash from file** (alegi ISO-ul) → **Select target** (alegi stick-ul) → **Flash!**.

Dacă vrei **mai multe sisteme pe același stick**, există [Ventoy](https://www.ventoy.net/): îl instalezi o singură dată pe stick (acel pas șterge tot ce era pe el), iar apoi doar copiezi fișierele `.iso` pe el, câte vrei. La pornire apare un meniu din care alegi ce sistem pornești — fără să rescrii stick-ul de fiecare dată. Este varianta potrivită când testezi mai multe distribuții sau când vrei să ai la îndemână, pe același stick, și un ISO de Windows.

Cum se folosește Ventoy pas cu pas — instalarea pe stick, copierea imaginilor, meniul de boot și setările utile — am detaliat în ghidul [Cum creezi un stick USB multiboot cu Ventoy](/blog/utilizare-ventoy/), din categoria **Instalare**.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Stick-ul nu pornește?</p>
    <p>Pe calculatoarele mai noi, deschide din nou Rufus și schimbă <strong>Partitioning scheme</strong> în <strong>GPT</strong>, cu <strong>Target system</strong> pe <strong>UEFI (non CSM)</strong>. Majoritatea sistemelor moderne au dezactivat compatibilitatea moștenită (Legacy/CSM), iar setarea asta rezolvă cazul.</p>
  </div>
</div>

## 3. Bootarea de pe stick-ul USB

1. Introdu stick-ul în calculatorul pe care vrei să instalezi.
2. Repornește calculatorul. În cele mai multe cazuri, mediu de instalare pornește automat.
3. Dacă pornește iar Windows, repornește din nou și **ține apăsată o tastă** de la pornire:
   - **PC / laptop Windows:** **F12** este cea mai comună tastă pentru meniul de boot; alternative frecvente sunt **Esc**, **F2** și **F10**. Uită-te după un mesaj care apare o fracțiune de secundă la pornire — de obicei scrie ce tastă deschide meniul. Alternativ, caută tasta în manualul laptopului.
   - **Mac cu hardware Apple:** pornește cu stick-ul introdus ținând apăsat **Option / Alt (⌥)** — apare Startup Manager, iar stick-ul e afișat ca **EFI Boot**.
4. În meniul de boot, selectează stick-ul USB — alege varianta **UEFI**, dacă ți se propune.

## 4. Procesul de instalare

Instalatorul Ubuntu se deschide singur. Parcurge pașii de mai jos în ordinea în care apar pe ecran.

### Ecranele de început: limbă, accesibilitate, tastatură, rețea

- **Limba:** alege româna sau engleza.
- **Accesibilitate:** dacă ai nevoie de cititor de ecran, contrast mărit sau mărire de ecran, le activezi de aici.
- **Layout-ul tastaturii:** *English (US)* sau *Romanian*, în funcție de ce taste ai.
- **Conexiunea la rețea:** conectează-te la Wi-Fi ca să descarce actualizările și driverele terță (de exemplu NVIDIA) în timpul instalării. **Rețeaua e opțională** — dacă nu te poți conecta, instalarea merge mai departe.

### Try Ubuntu sau Install Ubuntu

- **Try Ubuntu** pornește sistemul fără să atingă nimic pe disc — perfect ca să verifici dacă îți merge hardware-ul (Wi-Fi, sunet, grafică). Din desktop poți deschide oricând instalatorul cu scurtătura *Install Ubuntu*.
- **Install Ubuntu** trece direct la instalare.

{% image "ubuntu-try-install", "Ecranul Try or Install Ubuntu din instalator", "Poți încerca Ubuntu fără să atingi nimic pe disc sau poți instala direct." %}

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Alertă: Intel RST (Rapid Storage Technology)</p>
    <p>Unele calculatoare Windows folosesc Intel RST, pe care Ubuntu nu îl acceptă — instalatorul se oprește și nu poți continua. Soluția e să intri în BIOS și să comuți controllerul de disc pe modul <strong>AHCI</strong>, apoi reiei instalarea. Dacă nu știi cum, caută „dezactivează Intel RST / AHCI” împreună cu modelul calculatorului tău.</p>
  </div>
</div>

### Tipul de instalare: interactiv sau automatizat

Instalatorul îți dă de ales între **interactive** (calea standard, recomandată — te întreabă totul pas cu pas) și **automated** (pentru instalări repetate, cu fișier de configurare; nu ai nevoie de ea acasă). Alegem varianta interactivă.

{% image "ubuntu-type-install", "Ecranul Type of installation cu opțiunile interactive și automatizate", "Varianta interactive este cea potrivită pentru o instalare obișnuită." %}

### Ce aplicații instalezi

- **Default selection** — doar esențialele, pe care le completezi după din App Center. Recomandat pentru prima instalare.
- **Extended selection** — adaugă și un birou de lucru complet (suite de office și utilitare).

{% image "ubuntu-apps", "Ecranul de selecție a aplicațiilor: Default sau Extended", "Pentru prima instalare, selecția implicită este de ajuns — le adaugi pe restul ulterior." %}

Indiferent de alegere, **bifează software-ul terț** (grafică, Wi-Fi, formate media): îmbunătățește compatibilitatea hardware — de exemplu driverele NVIDIA — și adaugă suportul pentru formate video/audio populare.

{% image "ubuntu-third-party", "Opțiunea de software terț din instalator", "Bifează driverele și formatele media suplimentare: scutești bătăi de cap mai târziu." %}

### Configurarea discului

Aici alegi cum ocupă Ubuntu discul. Ai trei variante:

- **Erase disk and install Ubuntu** — șterge tot și instalează Ubuntu singur pe disc. Cea mai simplă opțiune și, de regulă, cea pe care o vrei.
  - Dacă ai **mai multe discuri**, poți alege pe care îl folosești (Ubuntu poate sta pe un disc, cu Windows pe altul). Verifică de două ori că ai ales discul corect!
- **Install Ubuntu alongside another operating system** — instalează Ubuntu **pe lângă** Windows, păstrând toate fișierele. Alegi spațiul pe care vrei să-l dea Ubuntu, din partiția existentă.
- **Manual installation** — pentru utilizatori avansați: vezi toate discurile și partițiile și le configurezi tu (`/`, `/home`, `swap`). Dacă interfața nu îti spune nimic, întoarce-te la una dintre variantele automate.

{% image "ubuntu-disk-setup", "Ecranul Disk setup din instalatorul Ubuntu", "Erase disk pentru instalare curată, Install alongside pentru dual-boot, Manual pentru avansați." %}

### Criptarea datelor

Imediat după *Erase disk* ai opțiunea de a cripta discul. Recomandarea Ubuntu este **Encrypt with a passphrase** (vei scrie o frază de acces la fiecare pornire). Există și criptare pe hardware, dar funcționează doar pe PC-uri recente.

{% image "ubuntu-encrypt", "Opțiunile de criptare a discului din instalator", "Encrypt with a passphrase este varianta recomandată pentru majoritatea utilizatorilor." %}

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title">Nu pierde fraza de acces!</p>
    <p><strong>Fără ea nu îți mai poți recupera datele niciodată</strong> — nimeni nu le poate debloca. Scrie-o pe hârtie și păstreaz-o într-un loc sigur, în afara calculatorului.</p>
  </div>
</div>

### Atenție la BitLocker (vine din Windows)

Dacă în Windows ai activată criptarea **BitLocker**, instalatorul nu poate vedea partițiile Windows, deci nu poate instala Ubuntu alături de el. Ai două variante: **dezactivezi BitLocker** în Windows (Panou de control → criptare unitate) și continui cu dual-boot, sau **ștergi Windows** și pui Ubuntu singur pe disc. Poți instala Ubuntu și pe un al doilea disc, necriptat.

{% image "ubuntu-bitlocker", "Avertismentul BitLocker din instalatorul Ubuntu", "Instalatorul îți spune explicit dacă BitLocker blochează instalarea alături de Windows." %}

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">Ce alegi la partiționare?</p>
    <p>Pentru prima dată, mergi pe <strong>Erase disk</strong> dacă vrei Linux singur pe calculator, sau pe <strong>Install alongside</strong> dacă vrei dual-boot. La fiecare pornire, un meniu îți va întreba ce sistem să pornească — Ubuntu sau Windows — și poți schimba alegerea implicită oricând.</p>
  </div>
</div>

### Contul de utilizator

Introdu numele tău, numele calculatorului (cum apare în rețea), numele de utilizator și o parolă puternică. Poți alege **login automat** sau **parolă la fiecare pornire** — dacă iei laptopul cu tine prin oraș, ține parolă activată. Ține minte parola: o vei folosi la fiecare instalare de programe.

{% image "ubuntu-account", "Ecranul Create your account din instalator", "Numele, numele calculatorului, utilizatorul și parola — plus alegerea dintre login automat și parolă." %}

### Fusul orar și rezumatul

Harta îți alege fusul orar (Ubuntu îl detectează singur dacă ești online). Apoi ți se arată un **rezumat** al tuturor alegerilor — verifică-l, pentru că e ultima șansă să te răzgândești înainte de **Install**.

{% image "ubuntu-ready", "Ecranul-rezumat Ready to install", "Ultima verificare a alegerilor tale, înainte ca instalarea să înceapă." %}

## 5. Finalizarea și prima pornire

Instalarea rulează în fundal, cu o prezentare pe ecran. Dacă vrei să vezi exact ce se întâmplă, apasă pictograma din colțul din dreapta jos a ferestrei — acolo apar mesajele tehnice.

{% image "ubuntu-done", "Ecranul Installation complete", "Când instalarea se termină, îți propune să repornești calculatorul." %}

Când totul e gata:

1. Apasă **Restart now**.
2. Scoate stick-ul USB când ți se solicită pe ecran și apasă **Enter**.

{% image "ubuntu-remove-usb", "Mesajul care îți cere să scoți stick-ul USB", "Scoate stick-ul, apoi apasă Enter — altfel ai putea reporni din nou în instalator." %}

3. Dacă ai activat criptarea, scrii mai întâi fraza de acces a discului.
4. Autentifică-te cu parola creată.

{% image "ubuntu-login", "Ecranul de autentificare al Ubuntu", "Prima autentificare: numele de utilizator și parola alese la instalare." %}

### Asistentul de configurare inițială

La prima pornire, o aplicație îți cere câteva decizii rapide:

- **Serviciile de localizare** — le activezi sau nu, după preferință.
- **Trimiterea de informații către Canonical** — pentru îmbunătățirea Ubuntu. **Implicit, Canonical nu colectează nimic**; dacă nu vrei, nu bifa.
- **Schema de culori** — alegi între luminoasă și întunecată.
- **Descărcarea aplicațiilor** din App Center.

## 6. Ce urmează după instalare?

### Actualizează sistemul

Chiar după o instalare nouă, e un obicei bun să pui sistemul la zi. Cea mai simplă cale e aplicația **Software Updater**: o cauți în meniul de aplicații (iconița Ubuntu, colțul din stânga jos), verifică singură actualizările și le aplică.

{% image "ubuntu-updater", "Aplicația Software Updater cu actualizări disponibile", "Software Updater îți arată ce e de actualizat și le aplică dintr-un clic." %}

Preferi terminalul? Deschide-l cu `Ctrl + Alt + T` și rulează:

```bash
sudo apt update && sudo apt upgrade -y
```

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Ce fac cele două comenzi?</p>
    <p><code>apt update</code> îți spune ce pachete noi au apărut, iar <code>apt upgrade</code> le instalează pe toate. Dacă rulezi comenzile separat, scrii <strong>Y</strong> și Enter ca să confirmi. Rulează-le o dată pe săptămână și sistemul rămâne sănătos.</p>
  </div>
</div>

### Mută-ți datele înapoi

Ai făcut backup la început? Acum e momentul să copiezi fișierele înapoi pe disc. Conectează și contul browserului (Firefox sau Google) ca să se sincronizeze semnele de carte, parolele și istoricul.

### Dacă ceva nu merge

Ubuntu are o comunitate uriașă și găsești răspuns la aproape orice:

- [Ask Ubuntu](https://askubuntu.com/) — întrebări și răspunsuri, în engleză.
- [Ubuntu Discourse](https://discourse.ubuntu.com/) — forumul oficial.
- Dacă vrei să ții Windows-ul aproape, poți rula Ubuntu în interiorul Windows prin [WSL](https://documentation.ubuntu.com/wsl/stable/).

Felicitări! Ai instalat cu succes Ubuntu pe calculatorul tău. Dacă vrei să vezi ce alte sisteme există și cum se deosebesc, intră în [Oceanul de distribuții](/blog/un-ocean-de-distributii/) — sau deschide [Ghidul complet de instalare Linux](/blog/alege-distributia/) ca să alegi următoarea distribuție pe care să o încerci.

---

<em>Ghid adaptat (tradus și rescris) după tutorialul oficial <a href="https://ubuntu.com/desktop/docs/en/latest/tutorial/install-ubuntu-desktop/">Install Ubuntu Desktop</a> din documentația Ubuntu Desktop, licențiată sub <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Capturile de ecran din acest articol provin din același document și sunt preluate sub aceeași licență. Ubuntu este marcă înregistrată a Canonical Ltd.</em>
