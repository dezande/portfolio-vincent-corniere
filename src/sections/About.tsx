import PageHead from "../components/PageHead";
import { Icon } from "../lib/icons";
import { about, expertise } from "../data/cv";
import { useCountUp } from "../hooks/useCountUp";

function Counter({ num, suffix, lbl }: { num: number; suffix: string; lbl: string }) {
  const { ref, value } = useCountUp(num);
  return (
    <div className="counter card-deco">
      <span className="num" ref={ref}>
        {value}
        {suffix}
      </span>
      <span className="lbl">{lbl}</span>
    </div>
  );
}

export default function About() {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="À propos" title="Qui suis-je" />

      <div className="about">
        <div>
          <p className="lead">{about.lead}</p>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div>
          <ul className="facts">
            {about.facts.map((f) => (
              <li key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </li>
            ))}
          </ul>

          <div className="counters">
            {about.counters.map((c) => (
              <Counter key={c.lbl} {...c} />
            ))}
          </div>
        </div>
      </div>

      <h3 className="h3" style={{ marginTop: 56 }}>
        Domaines d'intervention
      </h3>
      <div className="expertise">
        {expertise.map((e) => (
          <article className="exp-card card-deco" key={e.title}>
            <span className="ico" aria-hidden="true">
              <Icon name={e.icon} />
            </span>
            <h4>{e.title}</h4>
            <ul className="stars">
              {e.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
