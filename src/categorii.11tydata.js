/**
 * Paginile categoriilor fără articole se generează (cu stare „în lucru”),
 * dar NU se indexează în motoarele de căutare — pagină subțire, fără conținut.
 *
 * După primul articol din categorie, `noindex` devine false și pagina intră
 * singură în index. Nimic de întreținut manual.
 */
export default {
  eleventyComputed: {
    noindex: (data) => !data.category || data.category.posts.length === 0,
  },
};
