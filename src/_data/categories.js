/**
 * Categoriile blogului. Adaugi o postare nouă punând numele exact al
 * categoriei în frontmatter-ul fișierului .md:
 *
 *   category: "Instalare"
 *
 * Toate categoriile apar în filtre, pe prima pagină și în footer — inclusiv
 * cele fără articole, cu numărul 0. Categoria goală are pagină cu stare
 * „în lucru”, dar e marcată `noindex` până la primul articol
 * (vezi src/categorii.11tydata.js).
 */
const categories = [
  {
    name: "Inițiere",
    slug: "initiere",
    description:
      "Fundațiile: ce este Linux, cum e structurat, cu ce se mănâncă și de unde începi fără să te pierzi.",
    icon: "seedling",
    accent: "mint",
  },
  {
    name: "Instalare",
    slug: "instalare",
    description:
      "De la imaginea ISO până la primul login: cum instalezi Linux sigur, pe lângă Windows sau singur.",
    icon: "download",
    accent: "amber",
  },
  {
    name: "Ghid Distribuții",
    slug: "ghid-distributii",
    description:
      "Ghiduri pas cu pas pentru distribuțiile cele mai cunoscute: de la imaginarea stick-ului USB până la primul login, fiecare pas explicat pe înțelesul începătorilor.",
    icon: "compass",
    accent: "blue",
  },
  {
    name: "Utilizare",
    slug: "utilizare",
    description:
      "Zi de zi cu Linux: primele comenzi de terminal, programe, fișiere și gesturi care fac utilizarea comodă, fără să cauți prin meniuri.",
    icon: "zap",
    accent: "teal",
  },
  {
    name: "Administrare",
    slug: "administrare",
    description:
      "Pachete, utilizatori, permisiuni și actualizări — lucrurile de bază ca să ții sistemul sănătos.",
    icon: "sliders",
    accent: "coral",
  },
  {
    name: "Customizare",
    slug: "customizare",
    description:
      "Medii desktop, window managere, teme și trickuri ca să faci Linux să arate și să se comporte exact cum vrei tu.",
    icon: "palette",
    accent: "violet",
  },
];

export default categories;
