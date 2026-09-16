import { Fragment } from "react";
import { motion } from "framer-motion";
import CompanyCard from "../components/CompanyCard";
import PageHead from "../components/PageHead";
import { Divider, Star } from "../components/Ornament";
import { companies, education, partners, skillBars, skillGroups } from "../data/cv";

export default function Resume({ onOpenProjects }: { onOpenProjects: (company: string) => void }) {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Parcours" title="Expérience & formation" />

      {/* Expériences : une affiche par entreprise */}
      <section className="res-block" aria-labelledby="res-xp">
        <h3 className="h3" id="res-xp">
          Expériences professionnelles
        </h3>
        <div className="companies">
          {companies.map((c, i) => (
            <CompanyCard key={c.name} company={c} index={i} onOpenProjects={onOpenProjects} />
          ))}
        </div>
      </section>

      {/* Formation : trois cartes côte à côte */}
      <section className="res-block" aria-labelledby="res-edu">
        <h3 className="h3" id="res-edu">
          Formation
        </h3>
        <div className="edu-grid">
          {education.map((e) => (
            <article className="edu card-deco" key={e.org}>
              <span className="edu-year">{e.period}</span>
              <Divider width={120} />
              <h4>{e.role}</h4>
              <div className="edu-org">{e.org}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Compétences et environnement : deux colonnes aérées */}
      <section className="res-block res-duo">
        <div aria-labelledby="res-skills">
          <h3 className="h3" id="res-skills">
            Compétences clés
          </h3>
          {skillBars.map((s) => (
            <div className="skill" key={s.name}>
              <div className="top">
                <span>{s.name}</span>
                <span className="pct">{s.value}%</span>
              </div>
              <div
                className="track"
                role="meter"
                aria-label={s.name}
                aria-valuenow={s.value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        <div aria-labelledby="res-stack">
          <h3 className="h3" id="res-stack">
            Environnement technique
          </h3>
          <dl className="stack-list">
            {skillGroups.map((g) => (
              <div key={g.k}>
                <dt>{g.k}</dt>
                <dd>{g.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="res-block" aria-labelledby="res-partners">
        <h3 className="h3" id="res-partners">
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
      </section>
    </div>
  );
}
