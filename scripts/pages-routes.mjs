/**
 * GitHub Pages ne sert que des fichiers. Pour que chaque adresse du site réponde
 * directement (lien partagé, rechargement), on copie dist/index.html dans un dossier
 * par page, plus un 404.html de secours. Slugs alignés avec src/lib/routes.ts.
 */
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const slugify = (t) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const pages = ["a-propos", "parcours", "entreprises", "projets", "contact"];

// Noms des entreprises, lus dans les données pour ne pas les dupliquer à la main.
const cv = readFileSync("src/data/cv.ts", "utf8");
const block = cv.slice(cv.indexOf("export const companies"), cv.indexOf("export const partners"));
const companyNames = [...block.matchAll(/^\s{4}name: "([^"]+)"/gm)].map((m) => m[1]);
if (companyNames.length === 0) throw new Error("Aucune entreprise trouvée dans src/data/cv.ts");

const routes = [...pages, ...companyNames.map((n) => `projets/${slugify(n)}`)];
const index = join(DIST, "index.html");

for (const route of routes) {
  mkdirSync(join(DIST, route), { recursive: true });
  copyFileSync(index, join(DIST, route, "index.html"));
}
copyFileSync(index, join(DIST, "404.html"));

console.log(`Pages générées : ${routes.length} (+ 404.html)\n  ${routes.join("\n  ")}`);
