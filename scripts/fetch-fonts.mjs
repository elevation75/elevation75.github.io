// Downloads Google Fonts and rewrites the CSS to point at local files.
// Run once:  node scripts/fetch-fonts.mjs
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FONT_DIR = join(ROOT, "src/assets/fonts");
const CSS_OUT = join(ROOT, "src/assets/css/fonts.css");

// Romanian needs latin-ext (ă â î ș ț) — it is requested explicitly below.
const FAMILIES = [
  "family=Fraunces:opsz,wght@9..144,400..800",
  "family=Source+Sans+3:ital,wght@0,300..700;1,400..600",
  "family=JetBrains+Mono:ital,wght@0,400..600;1,400",
];

const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const url = `https://fonts.googleapis.com/css2?${FAMILIES.join("&")}&display=swap`;

const css = await (await fetch(url, { headers: { "User-Agent": CHROME_UA } })).text();

if (!css.includes("@font-face")) {
  console.error("Google Fonts returned no @font-face rules. URL was:\n" + url);
  process.exit(1);
}

await mkdir(FONT_DIR, { recursive: true });
await mkdir(dirname(CSS_OUT), { recursive: true });

const files = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].map((m) => m[1]))];
console.log(`Downloading ${files.length} font files…`);

let rewritten = css;
for (const src of files) {
  const base = decodeURIComponent(src.split("/").pop().split("?")[0]);
  const file = base.replace(/[^a-zA-Z0-9._-]/g, "_");
  const dest = join(FONT_DIR, file);
  try {
    await access(dest);
  } catch {
    const res = await fetch(src, { headers: { "User-Agent": CHROME_UA } });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  }
  // Absolute URL -> relative path from assets/css/fonts.css
  rewritten = rewritten.split(src).join(`../fonts/${file}`);
}

// Prepend a short header comment so nobody thinks this CSS was hand-written.
const header = `/* Self-hosted Google Fonts — regenerate with: node scripts/fetch-fonts.mjs */\n`;
await writeFile(CSS_OUT, header + rewritten, "utf8");

const bytes = (await readFile(CSS_OUT)).length;
console.log(`Wrote ${CSS_OUT} (${bytes} bytes)`);
