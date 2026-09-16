import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import { education, experience, skillBars, skillGroups } from "../data/cv";

export default function Resume() {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Parcours" title="Expérience & formation" />

      <div className="resume">
        <div>
          <h3 className="h3">Expériences professionnelles</h3>
          <ul className="timeline">
            {experience.map((x) => (
              <li key={x.org}>
                <span className="period">{x.period}</span>
                <h4>{x.role}</h4>
                <div className="org">{x.org}</div>
                <p>{x.text}</p>
                <ul className="bullets stars">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="stack">
                  <b>Environnement :</b> {x.stack}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="h3">Formation</h3>
          <ul className="timeline" style={{ marginBottom: 48 }}>
            {education.map((e) => (
              <li key={e.org}>
                <span className="period">{e.period}</span>
                <h4>{e.role}</h4>
                <div className="org">{e.org}</div>
                <p style={{ marginBottom: 0 }}>{e.text}</p>
              </li>
            ))}
          </ul>

          <h3 className="h3">Compétences clés</h3>
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

          <h3 className="h3" style={{ marginTop: 40 }}>
            Environnement technique
          </h3>
          <ul className="stack-list">
            {skillGroups.map((g) => (
              <li key={g.k}>
                <span className="k">{g.k}</span>
                <span className="v">{g.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
