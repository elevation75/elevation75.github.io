/**
 * Redirecționări din vechiul site Wix către noile adrese.
 *
 * Fiecare intrare produce o pagină HTML la `from` cu meta-refresh spre `to`,
 * plus un link vizibil pentru cazurile în care refresh-ul e blocat (de ex.
 * căutări care previzualizează pagina).
 *
 * Adresele vechi conțin diacritice (`/post/puțină-istorie/`); adăugăm și
 * varianta ASCII, fiindcă unii clienți trimit URL-uri fără diacritice.
 */

const posts = [
  ["/post/linux-este-miezul-kernel/", "/blog/linux-este-miezul-kernel/"],
  ["/post/haideti-sa-invatam-linux/", "/blog/haideti-sa-invatam-linux/"],
  ["/post/puțină-istorie/", "/blog/putina-istorie/"],
  [
    "/post/de-ce-este-benefic-să-învățați-linux/",
    "/blog/de-ce-este-benefic-sa-invati-linux/",
  ],
  ["/post/unix-linus-linux/", "/blog/unix-linus-linux/"],
  ["/post/avem-și-mascotă/", "/blog/avem-si-mascota/"],
  ["/post/linux-vs-mac-vs-windows/", "/blog/linux-vs-mac-vs-windows/"],
  ["/post/un-ocean-de-distribuții/", "/blog/un-ocean-de-distributii/"],
  ["/post/des-sau-desktop-la-discretie/", "/blog/de-sau-wm/"],
];

const pages = [
  ["/my-blog/", "/blog/"],
  ["/about/", "/despre/"],
  ["/about-5/", "/contact/"],
];

/** Variante ASCII pentru adresele vechi cu diacritice. */
const ascii = (path) =>
  path.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const all = [...posts, ...pages];

/** Un singur lucru: lista { from, to }, fără duplicate. */
export default [
  ...all.map(([from, to]) => ({ from, to })),
  ...all
    .filter(([from]) => ascii(from) !== from)
    .map(([from, to]) => ({ from: ascii(from), to })),
];
