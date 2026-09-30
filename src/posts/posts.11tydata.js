import categories from "../_data/categories.js";

/** „Ghid Distributii", „ghid distribuții", „GHID DISTRIBUȚII” → aceeași categorie. */
const norm = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Data cascade for every file in src/posts/.
 *
 * The URL of a post is taken from the file name:
 *   src/posts/alegerea-distributiei.md  ->  /blog/alegerea-distributiei/
 *
 * Nothing else needs to be configured per post beyond the frontmatter.
 */
export default {
  layout: "layouts/post.njk",
  isPost: true,
  ogType: "article",

  eleventyComputed: {
    permalink: (data) => `/blog/${data.page.fileSlug}/`,

    // Looks up „Inițiere” (sau „initiere”) -> { slug, description, accent, … }
    categoryMeta: (data) =>
      categories.find((cat) => norm(cat.name) === norm(data.category)) ?? null,
  },
};
