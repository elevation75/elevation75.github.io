/**
 * Indexul de căutare al blogului.
 *
 * Se reconstruiește din fișierele .md din src/posts/ la FIECARE build, deci
 * nu trebuie întreținut: ai articol nou, apare automat în căutare.
 *
 * Folosit de pagina /cauta/ (src/cauta.njk) și de src/assets/js/search.js.
 * Câmpurile:
 *   url, title, description, date, category, catSlug, accent, minutes
 *   headings – titlurile ## și ### (se caută cu prioritate)
 *   text     – tot articolul ca text simplu, pentru căutarea în conținut
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import categories from "./categories.js";

const postsDir = fileURLToPath(new URL("../posts/", import.meta.url));

/** Frontmatter simplu: `cheie: valoare` (+ varianta cu ghilimele). */
const frontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    out[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, "$1");
  }
  return out;
};

/** Categoriile se potrivesc indiferent de diacritice și majuscule. */
const norm = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Din Markdown în text simplu, păstrând cât mai mult cuvânt folosibil. */
const toPlainText = (md) =>
  md
    // scurtături {% ... %} / {{ ... }} → textul dintre ghilimele (alt-urile)
    .replace(/\{[%{][\s\S]*?[%}]\}/g, (m) =>
      (m.match(/"([^"]*)"/g) || []).map((s) => s.slice(1, -1)).join(" "),
    )
    .replace(/^\s*```[a-z]*\s*$/gim, " ") // bariere de cod (rămâne codul)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // imagini → textul alternativ
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // linkuri → eticheta
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // titluri
    .replace(/^\s*>\s?/gm, "") // citate
    .replace(/^\s*[-*+]\s+/gm, "") // liste
    .replace(/^\s*\d+\.\s+/gm, "") // liste numerotate
    .replace(/^\|.*\|\s*$/gm, " ") // rânduri de tabel
    .replace(/<[^>]+>/g, " ") // taguri HTML (cutiuțele callout)
    .replace(/[*_`~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const headingsOf = (md) =>
  md
    .split(/\r?\n/)
    .filter((l) => /^#{2,3}\s+/.test(l))
    .map((l) => l.replace(/^#{2,3}\s+/, "").replace(/\s*#+\s*$/, "").trim())
    .filter(Boolean);

const index = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .sort()
  .map((file) => {
    const raw = readFileSync(join(postsDir, file), "utf8");
    const fm = frontmatter(raw);
    if (!fm.title) return null; // fără frontmatter nu e articol publicabil

    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
    const text = toPlainText(body);
    const cat =
      categories.find((c) => norm(c.name) === norm(fm.category)) || categories[0];
    const minutes = Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

    return {
      url: `/blog/${file.replace(/\.md$/, "")}/`,
      title: fm.title,
      description: fm.description || "",
      date: fm.date || "",
      category: cat.name, // numele afișat, chiar dacă în frontmatter ai scris fără diacritice
      catSlug: cat.slug,
      accent: cat.accent,
      minutes,
      headings: headingsOf(body),
      text,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export default index;
