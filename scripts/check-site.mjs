import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;

const files = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml|txt)$/.test(e.name)) files.push(p);
  }
})(root);

const problems = [];
const markers = [];

for (const f of files) {
  const html = readFileSync(f, "utf8");
  const rel = f.slice(root.length);
  if (/\[object Promise\]/.test(html)) markers.push(`${rel}: [object Promise]`);
  if (/="undefined"|>undefined</.test(html)) markers.push(`${rel}: literal "undefined"`);
  // În feed, HTML-ul articolului e corect escapat (nu e marker de eroare).
  if (f.endsWith(".html") && /&lt;(svg|picture|nav|div|figure)/.test(html)) markers.push(`${rel}: escaped markup`);
  if (/NaN/.test(html)) markers.push(`${rel}: NaN`);

  for (const m of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    for (const part of m[1].split(",").map((s) => s.trim())) {
      const url = part.split(/\s+/)[0];
      if (!url || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("data:")) continue;
      if (/^[a-z]+:\/\//i.test(url)) continue;
      const clean = url.split("#")[0].split("?")[0];
      if (!clean) continue;
      let target = clean.startsWith("/") ? join(root, clean) : resolve(dirname(f), clean);
      if (clean.endsWith("/")) target = join(target, "index.html");
      if (!existsSync(target)) problems.push(`${rel}  ->  ${url}`);
    }
  }
}

console.log("Files scanned:", files.length);
console.log("\n--- Broken internal links/assets ---");
console.log(problems.length ? [...new Set(problems)].join("\n") : "  none");
console.log("\n--- Content markers ---");
console.log(markers.length ? markers.join("\n") : "  none");
