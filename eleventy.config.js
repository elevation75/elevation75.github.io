import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join as joinPath } from "node:path";
import { fileURLToPath } from "node:url";
import categories from "./src/_data/categories.js";

const IMG_DIR = fileURLToPath(new URL("./src/assets/img/", import.meta.url));

/** „Ghid Distributii” = „Ghid Distribuții” — diacriticele și majusculele nu contează. */
const normCategory = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/* ------------------------------------------------------------------ *
 * Helpers                                                             *
 * ------------------------------------------------------------------ */

/** Romanian-aware slug: strips diacritics, then ASCII-fies the rest. */
export function slugify(input = "") {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ă â î ș ț ș ț
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

const ROMANIAN_MONTHS = [
  "ian.", "feb.", "mar.", "apr.", "mai", "iun.",
  "iul.", "aug.", "sept.", "oct.", "nov.", "dec.",
];

function formatRoDate(value, { withDay = true } = {}) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // Frontmatter dates are date-only (midnight UTC); format them in UTC so a
  // reader in UTC-5 does not see the day shift backwards by one.
  const day = withDay ? `${d.getUTCDate()} ` : "";
  return `${day}${ROMANIAN_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Plain-text word count used for the reading-time estimate. */
function stripHtml(html = "") {
  return String(html)
    .replace(/<pre[\s\S]*?<\/pre>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Builds a table of contents from the rendered <h2>/<h3> elements. */
function extractToc(html = "") {
  const out = [];
  const re = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    // Drop the "¶/#" permalink anchor so it never shows up in the TOC.
    const inner = m[3].replace(
      /<a[^>]*class="[^"]*heading-anchor[^"]*"[\s\S]*?<\/a>/gi,
      ""
    );
    out.push({
      level: Number(m[1]),
      id: m[2],
      text: stripHtml(inner),
    });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Markdown                                                            *
 * ------------------------------------------------------------------ */

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // Romanian quotation marks: „...” and ‘...’
  quotes: "„”‘’",
});

md.use(markdownItAnchor, {
  level: [1, 2, 3, 4],
  slugify,
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    symbol: "#",
    placement: "after",
    class: "heading-anchor",
    ariaLabel: "Link către acest paragraf",
  }),
});

md.use(markdownItFootnote);

/* ------------------------------------------------------------------ *
 * Site                                                                *
 * ------------------------------------------------------------------ */

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/css/");

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt_separator: "<!-- excerpt -->",
  });

  /* ---------- filters ---------- */

  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addFilter("date", (value, opts = {}) =>
    formatRoDate(value, typeof opts === "object" ? opts : {})
  );

  /* Dată RFC 822 pentru feed, validă și stabilă: mereu în UTC, indiferent de
   * fusul orar al mașinii pe care se face build-ul. Filtrul implicit din
   * eleventy-plugin-rss formatrează în ora locală și, pe GitHub Actions,
   * producea ora invalidă „24:00:00 GMT” (cititoarele de feed-uri ar putea
   * derula data la ziua următoare). */
  eleventyConfig.addFilter("rfc822", (value) => {
    const d = new Date(value);
    return isNaN(d.getTime()) ? "" : d.toUTCString();
  });

  eleventyConfig.addFilter("readingTime", (html = "") => {
    const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("toc", (html = "") => extractToc(html));

  eleventyConfig.addFilter("excerpt", (html = "", words = 40) => {
    const text = stripHtml(html);
    const parts = text.split(/\s+/);
    if (parts.length <= words) return text;
    return parts.slice(0, words).join(" ").trim() + "…";
  });

  eleventyConfig.addFilter("stripHtml", stripHtml);

  eleventyConfig.addFilter("absoluteUrl", (path = "", base = "") => {
    if (!base) return path;
    if (/^[a-z]+:\/\//i.test(path)) return path;
    return `${base.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;
  });

  /* Cache-busting: „/assets/css/main.css?v=x1a2b3” — versiunea derivă din
   * data ultimei modificări a fișierului, deci browserul ia fișierul nou
   * imediat ce îl schimbi (la dezvoltare și după fiecare publicare). */
  eleventyConfig.addFilter("assetv", (url = "") => {
    if (!url.startsWith("/assets/") || url.includes("?")) return url;
    const file = joinPath(IMG_DIR, "..", "..", url.replace(/^\//, ""));
    try {
      return `${url}?v=${statSync(file).mtimeMs.toString(36)}`;
    } catch {
      return url;
    }
  });

  eleventyConfig.addFilter("head", (arr = [], n = 3) => arr.slice(0, n));

  eleventyConfig.addFilter("where", (arr = [], key, value) =>
    arr.filter((item) => (value === undefined ? item[key] : item[key] === value))
  );

  eleventyConfig.addFilter("readingMinutesLabel", (html = "") => {
    const mins = Math.max(1, Math.round(stripHtml(html).split(/\s+/).length / 200));
    return mins === 1 ? "1 minut" : `${mins} minute`;
  });

  eleventyConfig.addFilter("isoDate", (value) => {
    const d =
      value === "now" || value === undefined || value === null || value === ""
        ? new Date()
        : value instanceof Date
          ? value
          : new Date(value);
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  });

  eleventyConfig.addFilter("monthYear", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return `${ROMANIAN_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // {{ "now" | year }} -> current year, or the year of any given date.
  eleventyConfig.addFilter("year", (value) => {
    const d =
      value === "now" || value === undefined || value === null
        ? new Date()
        : value instanceof Date
          ? value
          : new Date(value);
    return Number.isNaN(d.getTime())
      ? new Date().getFullYear()
      : d.getUTCFullYear();
  });

  eleventyConfig.addFilter("numberRO", (n = 0) =>
    new Intl.NumberFormat("ro-RO").format(n)
  );

  eleventyConfig.addFilter("json", (obj) => JSON.stringify(obj));

  /** Posts immediately before/after the given one in the newest-first list. */
  eleventyConfig.addFilter("surrounding", (posts = [], url) => {
    const i = posts.findIndex((p) => p.url === url);
    if (i === -1) return { newer: null, older: null };
    return {
      newer: i > 0 ? posts[i - 1] : null,
      older: i < posts.length - 1 ? posts[i + 1] : null,
    };
  });

  /** Finds a post whose URL matches exactly. */
  eleventyConfig.addFilter("findByUrl", (posts = [], url) =>
    posts.find((p) => p.url === url) ?? null
  );

  /** Up to `limit` further reads: same category first, then the rest. */
  eleventyConfig.addFilter("related", (posts = [], currentUrl, category, limit = 3) => {
    const same = posts.filter(
      (p) =>
        p.url !== currentUrl &&
        normCategory(p.data.category) === normCategory(category)
    );
    const others = posts.filter(
      (p) =>
        p.url !== currentUrl &&
        normCategory(p.data.category) !== normCategory(category)
    );
    return [...same, ...others].slice(0, limit);
  });

  eleventyConfig.addFilter("default", (value, fallback) =>
    value === undefined || value === null || value === "" ? fallback : value
  );

  /* ---------- shortcodes ---------- */

  /** Build a <picture> with webp + jpeg fallbacks from a base file name. */
  function picture(base, alt, attrs = "") {
    const webp = existsSync(`${IMG_DIR}${base}.webp`);
    const jpg = existsSync(`${IMG_DIR}${base}.jpg`);
    const src = webp ? `/assets/img/${base}.webp` : `/assets/img/${base}.png`;
    const fallback = jpg ? `/assets/img/${base}.jpg` : src;
    return (
      `<picture${attrs ? ` class="${attrs}"` : ""}>` +
      (webp ? `<source srcset="${src}" type="image/webp">` : "") +
      `<img src="${fallback}" alt="${String(alt).replace(/"/g, "&quot;")}" loading="lazy" decoding="async">` +
      `</picture>`
    );
  }

  // {% image "cover-kernel", "Descriere", "Textul de sub imagine" %}
  eleventyConfig.addShortcode("image", function (base, alt = "", caption = "") {
    const fig = `<figure class="post-figure">${picture(base, alt)}</figure>`;
    if (!caption) return fig;
    return `<figure class="post-figure has-caption">${picture(base, alt)}` +
      `<figcaption>${caption}</figcaption></figure>`;
  });

  // {% thumb "de-kde", "Logo KDE" %} — small floated image inside a list item.
  eleventyConfig.addShortcode("thumb", function (base, alt = "") {
    return `<span class="inline-thumb">${picture(base, alt)}</span>`;
  });

  // {% prompt "$", "ls -la" %} — a single terminal line.
  eleventyConfig.addShortcode("prompt", function (symbol = "$", command = "") {
    return (
      `<pre class="terminal"><code>` +
      `<span class="t-sym">${symbol}</span> ${String(command).replace(/</g, "&lt;")}` +
      `</code></pre>`
    );
  });

  /* ---------- collections ---------- */

  /**
   * Word count straight from the Markdown source. Reading `templateContent`
   * inside a collection is forbidden by Eleventy 3 (it is "too early"), and
   * the source is just as accurate for estimating reading time.
   */
  function wordsFromMarkdown(filePath) {
    let raw;
    try {
      raw = readFileSync(filePath, "utf8");
    } catch {
      return 0;
    }
    return stripHtml(
      raw
        .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "") // frontmatter
        .replace(/\{%[\s\S]*?%\}/g, " ") // nunjucks tags
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`\n]*`/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
    )
      .split(/\s+/)
      .filter(Boolean).length;
  }

  // All posts, newest first, with a pre-computed reading time.
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((post) => {
        const words = wordsFromMarkdown(post.inputPath);
        post.data.readingMinutes = Math.max(1, Math.round(words / 200));
        post.data.wordCount = words;
        return post;
      })
  );

  // Categoriile, împreună cu articolele lor. Cele goale SE păstrează: au o
  // pagină cu stare „în lucru” și apar cu numărul 0 în filtre — dar fără
  // `noindex` în capul paginii până la primul articol (vezi categorii.11tydata.js).
  eleventyConfig.addCollection("categories", (api) => {
    const posts = api.getFilteredByGlob("src/posts/*.md");
    return categories.map((cat) => ({
      ...cat,
      posts: posts
        .filter((p) => normCategory(p.data.category) === normCategory(cat.name))
        .sort((a, b) => b.date.getTime() - a.date.getTime()),
    }));
  });

  /* ---------- global data ---------- */

  eleventyConfig.on("eleventy.before", async () => {
    const { readFile } = await import("node:fs/promises");
    const { fileURLToPath } = await import("node:url");
    const path = fileURLToPath(new URL("./src/_data/site.json", import.meta.url));

    let site;
    try {
      site = JSON.parse(await readFile(path, "utf8"));
    } catch {
      return;
    }

    const checks = [
      ["url", site.url, "Adresa finală a blogului (ex: https://blogulmeu.ro)"],
      ["email", site.email, "Adresa ta de email pentru pagina de contact"],
    ];
    const missing = checks
      .filter(
        ([, value]) =>
          !value ||
          value === "https://example.com" ||
          /your-domain|change-me/i.test(String(value))
      )
      .map(([key, , hint]) => `  • ${key}: ${hint}`);

    if (missing.length) {
      console.log(
        "\n\x1b[33m⚠ De completat în src/_data/site.json:\x1b[0m\n" +
          missing.join("\n") +
          "\n"
      );
    }
  });

  /* ---------- return config ---------- */

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
