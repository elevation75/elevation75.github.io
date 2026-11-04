# Design: articol „Procesul de bootare Linux" (Inițiere) + completare Glosar

Data: 2026-11-04

## Intent

Video-ul „Linux boot process Explained - Animated" (Bit Byte Talks) descrie
procesul de pornire cronologic, de la butonul de power până la desktop.
Blogul are „Harta Linux", care prezintă straturile **static** (ce e fiecare),
dar nu **cronologic** (în ce ordine se întâmplă, ce predă fiecare pas altuia)
și nu are detaliile noi: POST, țintele systemd, serviciile, display
manager-ul, sesiunea, `systemd-analyze`.

Sursă: https://www.youtube.com/watch?v=lLg0dp9Pic8 (transcript obținut).

## Decizia de structură (aleasă de partener)

Articolul **presupune că ai citit „Harta Linux"**: la fiecare pas care a mai
fost descris acolo se pune un **link** spre articolul potrivit, iar textul
nou **aprofundează doar ce lipsește**. Harta rămâne „ce e stratul", acesta
devine „în ce ordine pornește și ce predă fiecare pas".

## Scope

**Intră:**
- Articol nou `src/posts/procesul-de-bootare-linux.md`, `category: Inițiere`,
  `date: 2026-11-04`, slug `/blog/procesul-de-bootare-linux/`
- Structură cronologică, ~1800–2200 cuvinte, ≥4 titluri `##`:
  1. Butonul de power și trezirea CPU-ului
  2. POST: verificarea de sănătate (BIOS) + ce aduce UEFI în plus
  3. De unde pornește: MBR (512 bytes) vs partiția EFI
  4. GRUB: predarea către kernel (link → Harta)
  5. Kernelul se trezește: decompresia, hardware-ul, memoria (link → Harta)
  6. initramfs: problema „oul și găina" (link → Harta)
  7. Montarea rădăcinii: `/` devine acasă (link → Structura sistemului)
  8. systemd, PID 1 și **fișierele de unități** (link → Harta)
  9. **Țintele**: `basic.target` → `multi-user.target` → `graphical.target`
  10. **Serviciile care pornesc în paralel**: udev, NetworkManager, journald
  11. **Serverul de display** (link → Harta)
  12. **Display manager**: GDM / LightDM / SDDM te autentifică
  13. **Sesiunea ta**: `.bashrc`, aplicații de start, temă + **D-Bus**
  14. Recapitulația lanțului (10–30 secunde)
  15. **Încearcă acum**: `systemd-analyze` + `systemd-analyze blame`
- Callout-uri din cele 3 variante existente, linkuri interne spre articolele
  din proiect (Harta, Structura sistemului, Terminalul fără frică, Glosarul,
  Glosar termeni, DE sau WM)
- **Fără** copertă proprie deocamdată → `npm run cover:titlu` (ca la Harta);
  dacă partenerul trimite o imagine, se înlocuiește ca la articolele trecute
- Glosar: termenii **noi** ai articolului + indexul alfabetic actualizat

**Intră exclusiv** (decizia partenerului): articolul **nu** reia strat cu
strat ca Harta — doar linkuri spre ea.

## Termeni noi pentru Glosar (verificați azi: 0 apariții)

| Termen | id | Capitol glosar |
|---|---|---|
| POST (Power-On Self-Test) | `post` | Pornire, firmware și bootloader |
| udev (managerul de dispozitive) | `udev` | Hardware și drivere |
| journald (jurnalul sistemului) | `journald` | Siguranță, backup și recuperare |
| D-Bus (magistrala de mesaje) | `dbus` | Tehnologii și web |
| Display manager (GDM, LightDM, SDDM) | `display-manager` | Mediul desktop |
| Țintă systemd (target) | `tinta-systemd` | Sistem de operare, kernel... |
| Fișier de unitate systemd (unit file) | `unit-file` | Sistem de operare, kernel... |
| Sesiune de utilizator | `sesiune` | Mediul desktop |
| `systemd-analyze` | `systemd-analyze` | Terminal și comenzi |

Termenii deja în glosar (BIOS, UEFI, MBR, ESP, GRUB, Bootloader, systemd,
PID 1, initramfs, X11/Wayland, swap...) se referă prin link, nu se repetă.

## Non-goals

- Nu se reiau straturile descrise deja în „Harta Linux" (link în loc de text).
- Nu se traduce mot-a-mot transcriptul; se rescrie pe înțelesul blogului.
- Nu se ating articolele existente (doar Glosarul primește termeni noi).
- Nu se adaugă categorii noi.

## Verificare

`npm run verify` (build + articole + linkuri + HTML) trebuie să trecească,
apoi verificare live pe GitHub Pages după push.
