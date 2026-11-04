# Design: articol „Harta Linux" (Inițiere) + completare Glosar

Data: 2026-11-04

## Intent

Video-ul „I Wish Someone Explained Linux to Me Like This" (Bit Byte Talks) explică
ecosistemul Linux ca o hartă de straturi. Blogul nu are un articol care să lege
toate straturile într-un text — categoria Inițiere are piese individuale (kernel,
distribuții, istorie), dar nu harta. O scriem în română, pe tonul blogului.

Sursă: https://www.youtube.com/watch?v=4ZRPWvjnA3Y (transcript deja obținut).

## Scope

**Intră:**
- Articol nou în `src/posts/`, `category: Inițiere`, structura A (strat cu strat):
  hardware → firmware (BIOS/UEFI) → GRUB + initramfs → kernel (apeluri de sistem,
  drivere, programator, memorie virtuală, VFS) → systemd (PID 1) → unelte GNU + libc
  → shell vs terminal → ierarhia de fișiere → distribuții + familii de pachete →
  X11/Wayland + compozitor → medii desktop → aplicații (Flatpak/Snap/AppImage) →
  recapitulație-tip-hartă.
- ~1800–2200 cuvinte, 3+ titluri `##` (apare Cuprinsul), callout-uri din cele 3
  variante (note/tip/warn), linkuri interne spre articolele existente.
- Copertă 1600×1000 generată cu `npm run cover:titlu`.
- Credit la final: link către video ca sursă de inspirație.
- Glosar: termenii **noi** din articol, adăugați în capitolele potrivite +
  indexul alfabetic actualizat (numărul de termeni din textul de la index).

**Intră exclusiv** (decizia partenerului): fără servere, cloud, containere, Android.

## Termeni noi pentru Glosar (verificat: 0 apariții azi)

| Termen | Capitol glosar |
|---|---|
| initramfs | Pornire, firmware și bootloader |
| vmlinuz | Pornire, firmware și bootloader |
| Apel de sistem (system call) | Sistem de operare, kernel... |
| VFS (sistem de fișiere virtual) | Sistem de operare, kernel... |
| Programator (scheduler) | Sistem de operare, kernel... |
| Memorie virtuală | Sistem de operare, kernel... |
| PID 1 / proces inițial (init) | Sistem de operare, kernel... (sau cap. systemd) |
| libc (glibc, musl) | Sistem de operare, kernel... |
| Shell (Bash, Zsh, Fish) | Terminal și comenzi |
| coreutils (ls, cp, mv, cat) | Terminal și comenzi |
| Compositor | Mediul desktop |
| XWayland | Mediul desktop (sau cap. X11/Wayland) |

Termenii deja în glosar se referă prin link, nu se repetă.

## Abordări luate în considerare

- **A (aleasă): hartă strat cu strat** — urmează firul video-ului; fiecare capitol
  leagă cu linkuri interne spre articolele existente.
- B: povestea pornirii — mai antrenant, dar straturile adânci se strecoară greu.
- C: întrebări-răspuns — ușor de citit, dar pierde ideea de hartă unitară.

## Non-goals

- Nu se traduce mot-a-mot transcriptul; se rescrie pe înțelesul blogului.
- Nu se ating articolele existente (doar Glosarul primește termeni noi).
- Nu se adaugă categorii noi.

## Verificare

`npm run verify` (build + verificări articole, linkuri, HTML) trebuie să treacă,
apoi `npm run dev` pentru verificare vizuală.
