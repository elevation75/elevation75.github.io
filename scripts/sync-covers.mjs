/**
 * Asigură că FIECARE copertă declarată într-un articol există în ambele
 * formate (.jpg + .webp), la 1600×1000.
 *
 * Reguli:
 *   - ambele fișiere există identice → nu face nimic (rulează rapid)
 *   - lipsește unul dintre ele        → îl recreează din celălalt
 *   - unul e mai nou (poză aruncată peste cel vechi) → reface ambele
 *   - lipsește tot (nici măcar poza)  → îți spune exact ce să faci
 *
 * Rulează automat la `npm run dev` și la `npm run build` (vezi package.json),
 * deci poți pur și simplu să pui poza în src/assets/img/ și să scrii numele
 * ei în frontmatter — restul se rezolvă singur.
 */
import {
  readdirSync,
  readFileSync,
  existsSync,
  statSync,
  copyFileSync,
  mkdtempSync,
  rmSync,
} from "node:fs";
import { join, extname, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const postsDir = fileURLToPath(new URL("../src/posts/", import.meta.url));
const imgDir = fileURLToPath(new URL("../src/assets/img/", import.meta.url));

const SIZE = ["1600x1000^", "-gravity", "center", "-extent", "1600x1000"];
const quality = ["-quality", "84"];

const made = [];
const missing = [];

const frontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : "";
};
const field = (head, key) => {
  const m = head.match(new RegExp(`^\\s*${key}:[ \\t]*(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["'](.*)["']$/, "$1") : "";
};

/** Reface Perechea .jpg + .webp (1600×1000) din singurul fișier existent. */
const regenerate = (src, jpg, webp, base, postFile) => {
  try {
    // Copie temporară: scriem peste ${base}.jpg chiar din el, deci să nu-l
    // citim și scriem în același timp.
    const tmpDir = mkdtempSync(join(tmpdir(), "cover-"));
    const tmp = join(tmpDir, `src${extname(src) || ".jpg"}`);
    copyFileSync(src, tmp);
    for (const out of [jpg, webp]) {
      execFileSync("magick", [
        tmp,
        "-auto-orient",
        "-strip",
        "-resize",
        ...SIZE,
        "-background",
        "#FFFDF8",
        "-alpha",
        "remove",
        "-alpha",
        "off",
        ...quality,
        out,
      ]);
    }
    rmSync(tmpDir, { recursive: true, force: true });
    made.push(basename(base));
    return true;
  } catch (err) {
    missing.push(`  ! ${postFile} → nu pot crea coperta „${base}”: ${err.message.split("\n")[0]}`);
    return false;
  }
};

for (const name of readdirSync(postsDir).filter((f) => f.endsWith(".md")).sort()) {
  const head = frontmatter(readFileSync(join(postsDir, name), "utf8"));
  if (!head) continue;

  const declared = [field(head, "webp"), field(head, "jpg")].filter(Boolean);
  if (declared.length === 0) continue; // articol fără copertă — îl semnalează lint-ul

  const base = declared[0].split("/").pop().replace(/\.(webp|jpg|jpeg|png)$/i, "");
  const jpg = join(imgDir, `${base}.jpg`);
  const webp = join(imgDir, `${base}.webp`);

  const hasJpg = existsSync(jpg);
  const hasWebp = existsSync(webp);

  if (hasJpg && hasWebp) {
    // Ambele există, dar unul e mai NOU (ex: ai pus peste el o poză nouă):
    // refacem perechea, ca cele două formate să nu difere.
    const dj = statSync(jpg).mtimeMs;
    const dw = statSync(webp).mtimeMs;
    if (Math.abs(dj - dw) > 1000) {
      regenerate(dj > dw ? jpg : webp, jpg, webp, base, name);
    }
    continue;
  }

  if (!hasJpg && !hasWebp) {
    missing.push(
      `  ! ${name} → nu găsesc nicio imagine pentru „${base}” în src/assets/img/\n` +
        `      Pune poza acolo ca ${base}.jpg  sau  rulează:  npm run cover -- <cale/poză> ${base}`,
    );
    continue;
  }

  regenerate(hasJpg ? jpg : webp, jpg, webp, base, name);
}

if (made.length) {
  console.log(`Coperte completate (1600×1000): ${made.join(", ")}`);
}
if (missing.length) {
  console.log("Coperți lipsă:");
  for (const m of missing) console.log(m);
}
