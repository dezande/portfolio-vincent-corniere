/**
 * Extrait les données du CV depuis le site (src/data/cv.ts) vers cv/data.json,
 * pour que le CV imprimé reprenne exactement les mêmes informations que le site.
 *
 * Usage (depuis cv/) : node scripts/export-data.mjs [racine du projet, par défaut ..]
 */
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
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

try {
  const cv = await import(pathToFileURL(tmp).href);
  const data = {
    profile: cv.profile,
    socials: cv.socials.map(({ label, url }) => ({ label, url })),
    about: { lead: cv.about.lead, paragraphs: cv.about.paragraphs, counters: cv.about.counters },
    expertise: cv.expertise.map(({ title, items }) => ({ title, items })),
    companies: cv.companies,
    education: cv.education,
    skillBars: cv.skillBars,
    skillGroups: cv.skillGroups,
    projects: cv.projects.map(({ title, cat, client, year, desc, bullets, stack }) => ({ title, cat, client, year, desc, bullets, stack })),
    partners: cv.partners,
    interests: cv.interests.map(({ title, text }) => ({ title, text: text ?? null })),
  };
  writeFileSync("data.json", JSON.stringify(data, null, 2) + "\n");
  console.log(`data.json mis à jour depuis ${source}`);
  console.log(`  ${data.companies.length} entreprises, ${data.projects.length} projets, ${data.education.length} formations`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
