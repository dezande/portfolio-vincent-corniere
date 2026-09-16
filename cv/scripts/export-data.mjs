/**
 * Extrait les données du CV depuis le site (src/data/cv.ts) vers cv/data.json,
 * pour que le CV imprimé reprenne exactement les mêmes informations que le site.
 *
 * Usage (depuis cv/) : node scripts/export-data.mjs [racine du projet, par défaut ..]
 */
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const portfolio = resolve(process.argv[2] ?? "..");
const source = join(portfolio, "src/data/cv.ts");
if (!existsSync(source)) {
  console.error(`Données du site introuvables : ${source}`);
  process.exit(1);
}

// cv.ts est du TypeScript pensé pour Vite : on neutralise import.meta.env, puis Node
// l'exécute directement (suppression native des types).
const code = readFileSync(source, "utf8").replace(/import\.meta\.env\.BASE_URL/g, '"/"');
const dir = mkdtempSync(join(tmpdir(), "cv-export-"));
const tmp = join(dir, "cv.mts");
writeFileSync(tmp, code);


/**
 * Icônes du site en SVG statique, pour que le CV utilise exactement les mêmes dessins.
 * src/lib/icons.tsx (table nom → composant) et src/lib/magicIcons.tsx sont transpilés
 * avec rolldown (déjà présent via Vite), puis rendus par React côté serveur.
 * Les fichiers temporaires restent dans le projet pour résoudre react et react-icons.
 */
async function exportIcons(root) {
  const { transformSync } = await import(pathToFileURL(join(root, "node_modules/rolldown/dist/experimental-index.mjs")).href)
    .catch(() => import("rolldown/experimental"));
  const work = join(root, "cv/.tmp-icons");
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  try {
    for (const name of ["magicIcons", "icons"]) {
      const src = readFileSync(join(root, `src/lib/${name}.tsx`), "utf8");
      const { code, errors } = transformSync(`${name}.tsx`, src, { jsx: { runtime: "automatic" } });
      if (errors?.length) throw new Error(`${name}.tsx : ${errors.map((e) => e.message).join("; ")}`);
      writeFileSync(join(work, `${name}.mjs`), code.replace(/from "\.\/magicIcons"/g, 'from "./magicIcons.mjs"'));
    }
    const { createRequire } = await import("node:module");
    const require = createRequire(join(root, "package.json"));
    const React = require("react");
    const { renderToStaticMarkup } = require("react-dom/server");
    const { icons } = await import(pathToFileURL(join(work, "icons.mjs")).href);
    const out = {};
    for (const [key, Cmp] of Object.entries(icons)) {
      out[key] = renderToStaticMarkup(React.createElement(Cmp))
        .replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')
        // Le « creux » des pictogrammes suit le fond du support : blanc sur le papier.
        .replace(/var\(--icon-bg, var\(--bg\)\)/g, "#ffffff");
    }
    return out;
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

try {
  const cv = await import(pathToFileURL(tmp).href);
  const data = {
    profile: cv.profile,
    socials: cv.socials.map(({ label, url }) => ({ label, url })),
    about: { lead: cv.about.lead, paragraphs: cv.about.paragraphs, counters: cv.about.counters },
    expertise: cv.expertise.map(({ title, icon, items }) => ({ title, icon, items })),
    companies: cv.companies,
    education: cv.education,
    skillBars: cv.skillBars,
    skillGroups: cv.skillGroups,
    projects: cv.projects.map(({ title, cat, client, year, desc, bullets, stack }) => ({ title, cat, client, year, desc, bullets, stack })),
    partners: cv.partners,
    interests: cv.interests.map(({ title, icon, text }) => ({ title, icon, text: text ?? null })),
    icons: await exportIcons(portfolio),
  };
  writeFileSync("data.json", JSON.stringify(data, null, 2) + "\n");
  console.log(`data.json mis à jour depuis ${source}`);
  console.log(`  ${data.companies.length} entreprises, ${data.projects.length} projets, ${data.education.length} formations, ${Object.keys(data.icons).length} icônes`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
