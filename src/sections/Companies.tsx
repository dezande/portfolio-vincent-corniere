import { Fragment } from "react";
import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import Pill from "../components/Pill";
import TechTag from "../components/TechTag";
import { Divider, Star } from "../components/Ornament";
import { companies, partners, projects } from "../data/cv";

const numerals = ["I", "II", "III", "IV", "V"];

export default function Companies({ onOpenProjects }: { onOpenProjects: (company: string) => void }) {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Les grandes maisons" title="Entreprises & clients" />

      <div className="companies">
        {companies.map((c, i) => {
          const count = projects.filter((p) => p.client === c.name).length;
          const label = `Voir ${count > 1 ? `les ${count} projets` : "le projet"}`;
          return (
          <motion.article
            key={c.name}
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

              <Pill icon="grid" onClick={() => onOpenProjects(c.name)}>
                {label}
              </Pill>
            </div>
          </motion.article>
          );
        })}
      </div>

      <h3 className="h3" style={{ marginTop: 56 }}>
        Partenaires & services intégrés
      </h3>
      <div className="marquee-wall card-deco">
        {partners.map((p, i) => (
          <Fragment key={p}>
            <span>
              {i > 0 && <Star size={9} />}
              {p}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
