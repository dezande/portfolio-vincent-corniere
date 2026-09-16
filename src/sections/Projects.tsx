import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHead from "../components/PageHead";
import ProjectModal from "../components/ProjectModal";
import { companies, projects, type Project } from "../data/cv";

const ALL_COMPANIES = "Toutes";

type Props = {
  /** Entreprise sélectionnée ; pilotée par App (adresse /projets/<entreprise>/, cartes de Parcours). */
  company: string | null;
  onCompanyChange: (company: string | null) => void;
};

export default function Projects({ company, onCompanyChange }: Props) {
  const [open, setOpen] = useState<Project | null>(null);

  const shown = company ? projects.filter((p) => p.client === company) : projects;

  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Réalisations" title="Mes projets" />

      <div className="filters" role="group" aria-label="Filtrer les projets par entreprise">
        <span className="filters-label">Entreprise</span>
        <button type="button" onClick={() => onCompanyChange(null)} aria-pressed={company === null}>
          {ALL_COMPANIES}
        </button>
        {companies.filter((c) => projects.some((p) => p.client === c.name)).map((c) => (
          <button key={c.name} type="button" onClick={() => onCompanyChange(c.name)} aria-pressed={company === c.name}>
            {c.name}
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
              {/* Carte intérieure : Framer Motion pilote le transform du bouton, le survol anime celle-ci */}
              <span className="work-card">
                <img src={p.img} alt="" loading="lazy" />
                <span className="work-shine" aria-hidden="true" />
                <span className="overlay">
                  <span className="cat">{p.client}</span>
                  <span className="work-title">{p.title}</span>
                  <span className="work-more" aria-hidden="true">
                    Voir le détail
                  </span>
                </span>
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
