import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import { Divider } from "../components/Ornament";
import TechTag from "../components/TechTag";
import { education, experience, skillBars, skillGroups } from "../data/cv";

const numerals = ["I", "II", "III", "IV", "V"];

export default function Resume() {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Parcours" title="Expérience & formation" />

      {/* Expériences : une par rangée, date et entreprise à gauche, détail à droite */}
      <section className="res-block" aria-labelledby="res-xp">
        <h3 className="h3" id="res-xp">
          Expériences professionnelles
        </h3>

        <ol className="xp-list">
          {experience.map((x, i) => (
            <motion.li
              key={x.org}
              className="xp"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="xp-when">
                <span className="xp-num">Acte {numerals[i]}</span>
                <span className="xp-org">{x.org}</span>
                <span className="xp-period">{x.period}</span>
              </div>

              <div className="xp-body">
                <h4>{x.role}</h4>
                <p className="xp-text">{x.text}</p>
                <ul className="xp-bullets stars">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tickets muted xp-stack" aria-label="Environnement technique">
                  {x.stack.split(", ").map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
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
    </div>
  );
}
