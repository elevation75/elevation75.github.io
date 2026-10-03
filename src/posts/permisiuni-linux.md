---
title: "Permisii în Linux: cine are voie să facă ce"
description: "Ce înseamnă rw-r--r--, cine sunt user, group și other, cum se calculează cifrele 644 și 755 și cum schimbi permisiunile cu chmod — explicat simplu."
date: 2026-10-03
category: Utilizare
cover:
  webp: /assets/img/cover-permisii.webp
  jpg: /assets/img/cover-permisii.jpg
  alt: "Desen cu titlul Permisii în Linux, cine ce poate"
---

În articolul [Terminalul fără frică](/blog/terminalul-fara-frica/) ai dat peste un rând ciudat, de genul `-rw-r--r--`, și am zis că lăsăm coloanele pe mai târziu. Acum e mai târziu.

**Permisiunile sunt regulile care decid cine poate face ce** cu un fișier sau cu un folder: cine îl poate citi, cine îl poate modifica, cine îl poate porni. Nu e nimic ascuns acolo — sunt trei litere, trei categorii de oameni și, dacă vrei cifre, o simplă adunare. La final știi să citești orice rând din `ls -l` și să schimbi permisiunile unui fișier fără să te temi. (Cuvintele noi le găsești explicate în [Glosarul Linux](/blog/glosar-linux/).)

## Privește permisiunile: `ls -l`

Facem un mic teren de joacă. Deschide terminalul și urmează pașii — nimic de aici nu strică ceva în sistem, totul stă într-un folder de probă:

```bash
mkdir PermisiuniDemo      # folder de test
cd PermisiuniDemo
touch pisica.txt caine.txt   # două fișiere goale
mkdir Animale             # un folder
ls -l                     # vezi totul, cu detalii
```

{% image "perm-demo", "Terminal în care se creează folderul PermisiuniDemo, fișierele pisica.txt și caine.txt, folderul Animale, urmat de ls -l cu ieșirea completă", "Am creat două fișiere și un folder, apoi am cerut ls -l. Fiecare rând spune totul despre un fișier: permisiunile, câte legături are, cine îl deține, mărimea, data și numele." %}

`touch` creează un fișier gol (nu-l deschide, nu-l umple), `mkdir` creează un folder, iar `ls -l` e comanda care ne interesează acum: **l** de la *long*, „pe lung". Dacă vrei să vezi toate opțiunile lui, scrie [`man ls`](/blog/glosar-linux/#man) — manualul îți deschide lista întreagă.

## Cine are voie? user, group, other

Ia orice rând din ieșirea de mai sus și uită-te întâi la partea din mijloc: două nume unul lângă altul.

{% image "perm-cine", "Aceeași ieșire ls -l, cu o casetă colorată în jurul coloanelor cu numele proprietarului și al grupului", "Casetă marchează cele două coloane care spun cine e implicat: mai întâi proprietarul fișierului, apoi grupul lui. La mine în ambele cazuri e utilizatorul, fiindcă eu le-am creat." %}

Prima coloană e **proprietarul** (*user*), adică omul care a creat fișierul. A doua e **grupul** — o mulțime de utilizatori cărora li se pot aplica aceleași reguli deodată. Iar după ele vine categoria implicită: **ceilalți**.

{% image "perm-tipuri", "Diagramă cu trei casete: user proprietarul, group grupul, other ceilalți, și o notă despre all", "Trei categorii și atât: user (proprietarul), group (grupul) și other (toți ceilalți). Iar când scriem all, avem în vedere user plus group plus other — adică absolut toată lumea." %}

Nu există o a patra categorie de om, ci doar un mod de a le spune pe toate deodată: **all** = user + group + other.

Cine sunt acești oameni, concret? Utilatorii sunt trecuți în `/etc/passwd`, iar grupurile în `/etc/group` — două fișiere text obișnuite, pe care le poți citi liniștit:

```text
utilizator:x:1000:1000::/home/utilizator:/bin/bash
grup:x:100:utilizator
users:x:100:
```

<div class="callout callout--note">
  <span class="callout-icon" aria-hidden="true">ℹ️</span>
  <div>
    <p class="callout-title">Există și cineva peste toate acestea</p>
    <p>Contul de <strong>administrator</strong> (root) poate face orice, în orice folder, indiferent de permisiuni — de aceea nici nu te conectezi ca el zi de zi, ci ridici drepturi doar când e nevoie, cu <code>sudo</code>. Detaliile sunt în <a href="/blog/glosar-linux/#administrator">glosar</a>. Pentru tot ce urmează în articol, ești însă un utilizator obișnuit, exact ca în capturi.</p>
  </div>
</div>

## Ce permisiuni sunt: rândul, bucată cu bucată

Acum partea cu adevărat utilă: primele zece caractere de pe rând.

{% image "perm-ce", "Ieșirea ls -l cu o casetă colorată în jurul primelor zece caractere, permisiunile fișierelor", "Casetă marchează acum coloana din stânga: permisiunile. Sub fiecare nume de fișier stă propria lui listă de reguli." %}

{% image "perm-rand", "Diagramă cu șirul -rw-r--r-- împărțit în patru părți colorate: tip, proprietar, grup și ceilalți", "Primul caracter spune ce e (fișier sau folder), iar următoarele trei grupuri spun ce poate fiecare categorie: proprietarul, grupul, ceilalți." %}

Fiecare rând se citește din cinci părți:

1. **Primul caracter** — ce e: `-` = fișier obișnuit, `d` = folder.
2. **Următoarele trei** — permisiunile **proprietarului**.
3. **Următoarele trei** — permisiunile **grupului**.
4. **Ultimele trei** — permisiunile **ceilalți**.
5. **Câteodată un caracter în plus la final** — `.` sau `+`, care anunță permisiuni suplimentare, pe liste de acces (ACL). Când lipsește, nu ai nimic special acolo.

## `r`, `w`, `x` — și cifrele 4, 2, 1

În fiecare grup de trei apar mereu aceleași litere, sau lipsesc:

{% image "perm-litere", "Diagramă cu trei fișe: r egal cu 4 citire, w egal cu 2 scriere, x egal cu 1 executare, și o notă despre liniuță", "Trei permisiuni, trei litere, trei cifre: r (read) = 4, w (write) = 2, x (execute) = 1. Iar liniuța în loc de literă înseamnă că permisiunea lipsește — în cifre, asta e 0." %}

- **`r`** (read, 4) — vezi ce e în fișier sau în folder.
- **`w`** (write, 2) — adaugi, modifici, ștergi.
- **`x`** (execute, 1) — rulezi programul, sau **intri în folder**.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">La foldere, <code>x</code> nu înseamnă „rulezi folderul”</p>
    <p>Un folder fără <code>x</code> e un dulap cu ușa încuiată: vezi etichetele (cu <code>r</code>), dar nu poți intra. De aceea folderele au de obicei <strong>rwx</strong>, iar fișierele obișnuite — doar <strong>rw-</strong>. Dacă încerci <code>cd</code> într-un folder fără <code>x</code>, ți se răspunde sec: <em>Permission denied</em>.</p>
  </div>
</div>

## Cum se calculează cifrele

Când vezi în tutoriale cifre precum `644` sau `755`, ele sunt doar suma pe fiecare grup: proprietarul, grupul, ceilalți.

{% image "perm-cifre", "Diagramă cu două exemple: -rw-r--r-- care dă 644 și drwxr-xr-x care dă 755, cu adunările afișate", "Primul exemplu: proprietarul are rw- adică 4 plus 2 face 6, grupul r-- adică 4, ceilalți r-- adică 4 → 644. Al doilea, un folder, dă 755." %}

Iată câteva combinații pe care le vei întâlni des:

| Cifra | Ce înseamnă | Unde o vezi |
| --- | --- | --- |
| `644` | proprietarul citește și scrie, restul doar citesc | documente, poze, articole |
| `755` | toți pot intra, doar proprietarul poate scrie | foldere |
| `600` | numai proprietarul, nimeni altcineva | fișiere sensibile (chei, parole) |
| `640` | proprietarul și grupul lui, restul nimic | fișiere împărțite în echipă |
| `777` | toți pot face orice | rar, și de obicei e o greșeală |

<div class="callout callout--warn">
  <span class="callout-icon" aria-hidden="true">⚠️</span>
  <div>
    <p class="callout-title"><code>777</code> nu e „mai multă siguranță”</p>
    <p>Dă permisiunea de a scrie <strong>tuturor</strong>, inclusiv oricărui program care rulează pe calculator. Regula simplă: <strong>dă cât mai puțin cu putință</strong>. La fel, evită <code>chmod -R</code> pe foldere întregi („-R” înseamnă recursiv, până la ultimul fișier) — e ușor să dai peste cap permisiunile întregului sistem dintr-o greșeală.</p>
  </div>
</div>

## Schimbă permisiunile: `chmod`

Citirea e una, schimbarea e alta — și se face cu o singură comandă, **chmod** (*change mode*). Mai întâi uită-te, apoi atinge:

```bash
cd PermisiuniDemo
chmod 600 caine.txt       # doar proprietarul
chmod +x pisica.txt       # toți pot intra/rula
ls -l                     # vezi rezultatul
```

{% image "perm-chmod", "Terminal cu chmod 600 caine.txt și chmod +x pisica.txt, urmate de ls -l care arată permisiunile schimbate", "După chmod 600, caine.txt arată -rw------- (doar eu). După chmod +x, pisica.txt arată -rwxr-xr-x (toți pot intra). Folderul Animale a rămas neatins." %}

Se poate scrie și pe litere, când vrei să schimbi doar o parte: `chmod u+r nume` (proprietarul primește citirea), `chmod g-w nume` (grupul pierde scrierea), `chmod o+x nume` (ceilalți primesc execuția) — `u`, `g`, `o` sunt user, group, other, iar `a` le însumează pe toate.

Cine **deține** fișierul (prima coloană, cu numele) se schimbă altfel, cu `chown`, și de regulă doar administratorul poate face asta — dar nu ai de ce să atingi asta acum.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Testează-te în 30 de secunde</p>
    <p>1. Ce înseamnă <code>-rwxr-x--x</code>? Scrie cifra. 2. Un folder trebuie să aibă neapărat ce literă ca să poți intra în el? 3. Ce comandă dă accesului de scriere doar ție, la un fișier de care nu vrei să se atingă nimeni?</p>
    <p>Răspunsuri: 1) <code>751</code> — 7, 5, 1. 2) <code>x</code>. 3) <code>chmod 600 nume-fișier</code>.</p>
  </div>
</div>

## Ce ai reținut

Trei litere, trei oameni, o adunare: `r`=4, `w`=2, `x`=1, iar liniuța e 0. Restul e experiență — cu cât te uiți mai des la `ls -l`, cu atât îți devine mai firesc. Iar dacă vreodată ți se pare că „nu ai voie” la ceva, acum știi unde să te uiți ca să afli de ce.

În categoria [Utilizare](/categorii/utilizare/) urmează restul lucrurilor de zi cu zi — instalarea de programe din terminal și actualizările — și, bineînțeles, restul seriei: [Structura unui sistem Linux](/blog/structura-sistemului-linux/) și [Terminalul fără frică](/blog/terminalul-fara-frica/). Dacă vreun cuvânt ți-a sărit în ochi, [Glosarul Linux](/blog/glosar-linux/) îți dă definiția lui.

<em>Articol adaptat (tradus și rescris) după <a href="https://opensource.com/article/19/6/understanding-linux-permissions">„A beginner's guide to Linux permissions”</a> de Bryant Son, publicat pe Opensource.com, licențiat sub <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Structura și exemplele provin din materialul original; textul, diagramele și capturile de ecran de aici sunt realizate pentru blog.</em>
