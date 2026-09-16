import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Icon } from "../lib/icons";
import type { Project } from "../data/cv";
import { Divider } from "./Ornament";
import TechTag from "./TechTag";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    // Signale la fiche ouverte : le bouton de thème s'efface pour libérer le coin.
    document.documentElement.classList.add("modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !boxRef.current) return;
      // Piège de focus : la tabulation reste dans la fenêtre.
      const f = boxRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("modal-open");
    };
  }, [onClose]);

  // Rendue dans <body> : hors du conteneur d'écran animé (dont le filtre de transition
  // enfermerait la fenêtre sous le bouton de thème).
  return createPortal(
    <motion.div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="box scroll-area"
        ref={boxRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="close" onClick={onClose} aria-label="Fermer" ref={closeRef}>
          <Icon name="close" aria-hidden="true" />
        </button>

        <img src={project.img} alt="" />

        <div className="meta">
          <span className="cat">
            {project.cat} · {project.client} · {project.year}
          </span>
          <h3 id="modal-title">{project.title}</h3>
          <Divider />
          <p>{project.desc}</p>

          <ul className="bullets stars">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div className="tags">
            {project.stack.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
