import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHead from "../components/PageHead";
import ProjectModal from "../components/ProjectModal";
import { companies, projects, type Project } from "../data/cv";

const ALL = "Tous";
const ALL_COMPANIES = "Toutes";

type Props = {
  /** Entreprise sélectionnée ; pilotée par App pour pouvoir arriver depuis l'écran Entreprises. */
  company: string | null;
  onCompanyChange: (company: string | null) => void;
};

export default function Projects({ company, onCompanyChange }: Props) {
  const [category, setCategory] = useState(ALL);
  const [open, setOpen] = useState<Project | null>(null);

  const byCompany = useMemo(
    () => (company ? projects.filter((p) => p.client === company) : projects),
    [company],
  );

  // Les catégories proposées dépendent de l'entreprise : pas de filtre qui mène à une grille vide.
  const categories = useMemo(() => [ALL, ...new Set(byCompany.map((p) => p.cat))], [byCompany]);
  const activeCategory = categories.includes(category) ? category : ALL;
  const shown = activeCategory === ALL ? byCompany : byCompany.filter((p) => p.cat === activeCategory);

  function pickCompany(name: string | null) {
    setCategory(ALL);
    onCompanyChange(name);
  }

  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Réalisations" title="Mes projets" />

      <div className="filters" role="group" aria-label="Filtrer les projets par entreprise">
        <span className="filters-label">Entreprise</span>
        <button type="button" onClick={() => pickCompany(null)} aria-pressed={company === null}>
          {ALL_COMPANIES}
        </button>
        {companies.filter((c) => projects.some((p) => p.client === c.name)).map((c) => (
          <button key={c.name} type="button" onClick={() => pickCompany(c.name)} aria-pressed={company === c.name}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="filters" role="group" aria-label="Filtrer les projets par catégorie">
        <span className="filters-label">Catégorie</span>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={activeCategory === c}>
            {c}
          </button>
        ))}
      </div>

      <p className="filters-count" aria-live="polite">
        {shown.length} projet{shown.length > 1 ? "s" : ""}
        {company ? ` réalisé${shown.length > 1 ? "s" : ""} chez ${company}` : ""}
      </p>

      <motion.div className="work-grid" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              className="work"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(p)}
              aria-label={`Voir le projet ${p.title}`}
            >
              <img src={p.img} alt="" loading="lazy" />
              <span className="overlay">
                <span className="cat">{p.client}</span>
                <h4>{p.title}</h4>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
