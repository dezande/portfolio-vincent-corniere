import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHead from "../components/PageHead";
import ProjectModal from "../components/ProjectModal";
import { projects, type Project } from "../data/cv";

export default function Projects() {
  const [filter, setFilter] = useState("Tous");
  const [open, setOpen] = useState<Project | null>(null);

  const categories = useMemo(() => ["Tous", ...new Set(projects.map((p) => p.cat))], []);
  const shown = filter === "Tous" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Réalisations" title="Mes projets" />

      <div className="filters" role="group" aria-label="Filtrer les projets par catégorie">
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)} aria-pressed={filter === c}>
            {c}
          </button>
        ))}
      </div>

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
