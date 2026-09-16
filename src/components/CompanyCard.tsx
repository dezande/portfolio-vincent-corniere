import { motion } from "framer-motion";
import Pill from "./Pill";
import TechTag from "./TechTag";
import { Divider } from "./Ornament";
import { projects, type Company } from "../data/cv";

const numerals = ["I", "II", "III", "IV", "V", "VI"];

type Props = {
  company: Company;
  index: number;
  onOpenProjects: (company: string) => void;
};

/** Affiche d'entreprise : acte, nom et période à gauche ; poste, réalisations, clients et technologies à droite. */
export default function CompanyCard({ company: c, index: i, onOpenProjects }: Props) {
  const count = projects.filter((p) => p.client === c.name).length;
  const label = count > 1 ? `Voir les ${count} projets` : "Voir le projet";

  return (
    <motion.article
      className="company card-deco"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="bill"
        onClick={() => onOpenProjects(c.name)}
        aria-label={`${label} réalisés chez ${c.name}`}
      >
        <span className="num">Acte {numerals[i]}</span>
        <h3>{c.name}</h3>
        <Divider width={140} />
        <span className="period">{c.period}</span>
        <span className="bill-cta" aria-hidden="true">
          {label} →
        </span>
      </button>

      <div className="body">
        <h4 className="role">{c.role}</h4>
        <div className="kind">{c.kind}</div>
        <p className="desc">{c.desc}</p>

        <div className="label">Réalisations</div>
        <ul className="company-bullets stars">
          {c.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="label">{i === 0 ? "Fédérations d'identité" : "Clients & projets"}</div>
        <div className="tickets">
          {c.clients.map((cl) => (
            <span key={cl}>{cl}</span>
          ))}
        </div>

        <div className="label">Environnement</div>
        <div className="tickets muted">
          {c.stack.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>

        {count > 0 && (
          <Pill icon="grid" onClick={() => onOpenProjects(c.name)}>
            {label}
          </Pill>
        )}
      </div>
    </motion.article>
  );
}
