/**
 * Verifică fișierele articolelor ÎNAINTE de build — prinde greșelile care
 * altfel se văd abia în browser (text dispărut, copertă inexistentă, titlu gol).
 *
 *   node scripts/lint-posts.mjs      (rulează și prin `npm run verify`)
 *
 * Erori (opresc verify):
 *   - frontmatter lipsă sau incomplet (title, description, date, category)
 *   - dată în alt format decât AAAA-LL-ZZ
 *   - categorie care nu există în categories.js
 *   - bariere de cod ``` neperechi  ← înghite tot textul care urmează
 *   - copertă declarată în frontmatter, dar fișierul lipsește
 *
 * Avertismente (nu opresc):
 *   - articol fără copertă
 *   - `# titlu` în corp (titlul se scrie doar în `title:`)
 *   - mai puțin de 3 titluri `##` (nu apare „Cuprins”)
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import categories from "../src/_data/categories.js";

const postsDir = fileURLToPath(new URL("../src/posts/", import.meta.url));
const imgDir = fileURLToPath(new URL("../src/assets/img/", import.meta.url));

/** Categoriile se potrivesc indiferent de diacritice și majuscule. */
const norm = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const errors = [];
const warnings = [];
const summary = [];

const names = readdirSync(postsDir).filter((f) => f.endsWith(".md")).sort();

for (const name of names) {
  const raw = readFileSync(join(postsDir, name), "utf8");
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!fm) {
    errors.push(`${name}  →  lipsește frontmatter-ul (fișierul trebuie să înceapă cu ---)`);
    continue;
  }

  const head = fm[1];
  const body = raw.slice(fm[0].length);
  const get = (key) => {
    const m = head.match(new RegExp(`^\\s*${key}:[ \\t]*(.*)$`, "m"));
    if (!m) return "";
    return m[1].trim().replace(/^["'](.*)["']$/, "$1");
  };

  const title = get("title");
  const description = get("description");
  const date = get("date");
  const category = get("category");

  if (!title) errors.push(`${name}  →  lipsește \`title:\``);
  if (!description) errors.push(`${name}  →  lipsește \`description:\``);
  if (!date) errors.push(`${name}  →  lipsește \`date:\``);
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push(`${name}  →  \`date: ${date}\` nu e în format AAAA-LL-ZZ`);
  if (!category) errors.push(`${name}  →  lipsește \`category:\``);
  else if (!categories.some((c) => norm(c.name) === norm(category)))
    errors.push(
      `${name}  →  categoria „${category}” nu există. Valabile: ` +
        categories.map((c) => c.name).join(", "),
    );

  // Parcurgem rândurile o singură dată, ținând cont de barierele de cod:
  // în interiorul lor, `# ` e comentariu, nu titlu.
  let inFence = false;
  let openFenceLine = 0;
  let fences = 0;
  const strayH1 = [];
  body.split(/\r?\n/).forEach((line, i) => {
    if (/^```/.test(line)) {
      fences += 1;
      if (inFence) inFence = false;
      else {
        inFence = true;
        openFenceLine = i + 1;
      }
      return;
    }
    if (!inFence && /^# /.test(line)) strayH1.push(line.replace(/^# /, ""));
  });

  // O barieră neînchisă înghite tot textul care urmează în bloc de cod.
  if (inFence)
    errors.push(
      `${name}  →  bariera \`\`\` de la rândul ${openFenceLine} nu e închisă: tot textul de după ea dispare din articol`,
    );

  // Coperta: declarată ≠ existentă.
  const webp = get("webp");
  const jpg = get("jpg");
  if (webp || jpg) {
    for (const [label, value] of [["webp", webp], ["jpg", jpg]]) {
      if (!value) {
        errors.push(`${name}  →  cover: are ${label} lipsă`);
        continue;
      }
      const file = join(imgDir, value.replace(/^\/?assets\/img\//, ""));
      if (!existsSync(file))
        errors.push(
          `${name}  →  coperta nu există: ${value} (rulează \`npm run cover\`)`,
        );
    }
  } else {
    warnings.push(`${name}  →  fără copertă (cardul rămâne fără imagine)`);
  }

  for (const h1 of strayH1)
    warnings.push(`${name}  →  ai \`# ${h1}\` în text; titlul se scrie doar în \`title:\``);

  const h2 = (body.match(/^## /gm) || []).length;
  if (h2 < 3) warnings.push(`${name}  →  doar ${h2} titluri \`##\`; „Cuprins” apare de la 3`);

  summary.push(`${name}  (${title.slice(0, 40)}${title.length > 40 ? "…" : ""})`);
}

console.log("Articole verificate:", names.length);
for (const s of summary) console.log("  ·", s);

if (warnings.length) {
  console.log("\n--- Avertismente ---");
  for (const w of warnings) console.log("  !", w);
}

if (errors.length) {
  console.log("\n--- Erori în articole ---");
  for (const e of errors) console.log("  ✗", e);
  console.log("\nRepară frontmatter-ul/textul din src/posts/, apoi rulează din nou.");
  process.exit(1);
}

console.log("\nToate articolele sunt în regulă.");
