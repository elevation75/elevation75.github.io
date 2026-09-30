import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;

const VOID = new Set([
  "area","base","br","col","embed","hr","img","input","link","meta","param",
  "source","track","wbr","path","rect","circle","use","stop","polygon","line",
  "ellipse","polyline",
]);

const files = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) files.push(p);
  }
})(root);

let bad = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const rel = f.slice(root.length);
  const issues = [];

  // --- tag balance ---
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [full, name, selfClose] = m;
    const tag = name.toLowerCase();
    if (full.startsWith("</")) {
      if (!stack.length) { issues.push(`stray </${tag}>`); break; }
      if (stack[stack.length - 1] !== tag) {
        issues.push(`mismatch: </${tag}> closes <${stack[stack.length - 1]}>`);
        break;
      }
      stack.pop();
    } else if (!VOID.has(tag) && !selfClose) {
      stack.push(tag);
    }
  }
  if (stack.length) issues.push(`unclosed: ${stack.join(" > ")}`);

  // --- one h1 ---
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) issues.push(`h1 count = ${h1}`);

  // --- images need alt ---
  for (const im of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(im[0])) issues.push(`img without alt: ${im[0].slice(0, 90)}`);
  }

  // --- title/description ---
  if (!/<title>[^<]+<\/title>/.test(html)) issues.push("missing <title>");
  if (!/<meta name="description" content="[^"]+"/.test(html)) issues.push("missing description");

  if (issues.length) { bad++; console.log(`\n${rel}`); issues.forEach((i) => console.log("  • " + i)); }
}
console.log(bad ? `\n${bad} file(s) with issues.` : "\nAll HTML files structurally OK.");
