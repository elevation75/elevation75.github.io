# Postări pentru Instagram

Aici ținem materialele pentru Instagram: imaginile 4:5 (1080×1350) cu titlul articolului și
descrierile gata de copiat.

## Ce găsești

| Fișier / folder | Ce e |
|---|---|
| `descrieri.md` | Cele 15 descrieri + setul de hashtag-uri |
| `01-…/post.jpg` … `15-…/post.jpg` | Câte o imagine 4:5 pentru fiecare articol |
| `articole.tsv` | Lista articolelor (număr, folder, copertă, titlu) |
| `gen-postere.sh` | Scriptul care generează imaginile |

Folderele sunt numerotate **în ordinea creării articolelor**, ca să le postezi în ordine.

## Cum postezi

1. Deschizi `descrieri.md` și copiezi descrierea articolului ales.
2. Iei `post.jpg` din folderul cu același număr.
3. Lipești descrierea, pui linkul articolului și hashtag-urile de la final (cele de bază + cele
   specific articolului).
4. Publici.

## Cum regenerezi imaginile

Dacă schimbi o copertă sau adaugi un articol:

```bash
./instagram/gen-postere.sh          # toate cele 15
./instagram/gen-postere.sh 07       # doar postările care încep cu 07
```

Pentru un articol nou: adaugi un rând nou în `articole.tsv` (număr, slug, copertă, titlu), rulezi
scriptul și-i adaugi descrierea în `descrieri.md`.

Scriptul are nevoie de `imagemagick`, `curl` și `python3` cu `fonttools`. Fonturile blogului
(Fraunces + Source Sans 3) se descarcă o singură dată în `/tmp/ig-fonts`.

## Cum arată postarea

- **Zona de sus** (1080×990): coperta articolului, decupată centrat, fără deformare.
- **Banda de jos** (1080×360): hârtia caldă a blogului, cu linie coral sus, eticheta
  „PRIMII PAȘI SPRE LINUX”, titlul articolului (Fraunces) și adresa site-ului.
- Titlul se redimensionează singur (56 → 38 px) ca să încapă în maximum 3 rânduri.
