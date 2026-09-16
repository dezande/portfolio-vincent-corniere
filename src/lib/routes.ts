import { companies } from "../data/cv";

/**
 * Adresses du site. Une page = une URL, partageable et compatible avec les boutons
 * Précédent / Suivant du navigateur. Le préfixe vient de Vite (sous-dossier sur GitHub Pages).
 * Toute modification des slugs doit rester alignée avec scripts/pages-routes.mjs.
 */

export const SCREENS = ["home", "about", "resume", "projects", "interests", "contact"] as const;
export type ScreenId = (typeof SCREENS)[number];

export const SLUGS: Record<ScreenId, string> = {
  home: "",
  about: "a-propos",
  resume: "parcours",
  projects: "projets",
  interests: "centres-d-interet",
  contact: "contact",
};

/** Anciennes adresses → adresse actuelle */
const LEGACY_SLUGS: Record<string, string> = { entreprises: "parcours" };

const TITLES: Record<ScreenId, string> = {
  home: "",
  about: "À propos",
  resume: "Parcours",
  projects: "Projets",
  interests: "Centres d'intérêt",
  contact: "Contact",
};

const BASE = import.meta.env.BASE_URL; // "/" en local, "/portfolio-vincent-corniere/" en ligne

/** « Prium Solutions » → « prium-solutions » */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Route = { screen: ScreenId; company: string | null };

export function pathFor({ screen, company }: Route) {
  const slug = SLUGS[screen];
  if (!slug) return BASE;
  const companyPart = screen === "projects" && company ? `${slugify(company)}/` : "";
  return `${BASE}${slug}/${companyPart}`;
}

export function parsePath(pathname: string): Route {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, "");
  const [first = "", second = ""] = rest.split("/").filter(Boolean);
  // Ancienne page Entreprises, fusionnée dans Parcours : ses liens restent valides.
  const slug = LEGACY_SLUGS[first] ?? first;
  const screen = (Object.keys(SLUGS) as ScreenId[]).find((id) => SLUGS[id] === slug) ?? "home";
  const company = screen === "projects" && second ? companies.find((c) => slugify(c.name) === second)?.name ?? null : null;
  return { screen, company };
}

export function titleFor({ screen, company }: Route, siteName: string) {
  const page = screen === "projects" && company ? `Projets chez ${company}` : TITLES[screen];
  return page ? `${page} — ${siteName}` : siteName;
}
