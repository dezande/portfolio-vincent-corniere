import PageHead from "../components/PageHead";
import Pill from "../components/Pill";
import { Icon } from "../lib/icons";
import { profile, socials } from "../data/cv";

const cards = [
  { icon: "pin", k: "Ville", v: profile.location },
  { icon: "mail", k: "Email", v: profile.email, href: `mailto:${profile.email}` },
  { icon: "calendar", k: "Disponibilité", v: profile.availability },
];

export default function Contact() {
  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Contact" title="Travaillons ensemble" />

      <div className="contact-cards">
        {cards.map((c) => (
          <div className="contact-card card-deco" key={c.k}>
            <span className="ico" aria-hidden="true">
              <Icon name={c.icon} />
            </span>
            <div>
              <div className="k">{c.k}</div>
              <div className="v">{c.href ? <a href={c.href}>{c.v}</a> : c.v}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-actions">
        <Pill icon="send" href={`mailto:${profile.email}`}>
          M'écrire
        </Pill>
      </div>

      <h3 className="h3" style={{ marginTop: 48 }}>
        Retrouvez-moi
      </h3>
      <div className="chips">
        {socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener">
            <Icon name={s.icon} aria-hidden="true" />
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
