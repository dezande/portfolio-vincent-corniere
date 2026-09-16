import { useState, type FormEvent } from "react";
import PageHead from "../components/PageHead";
import Pill from "../components/Pill";
import { Icon } from "../lib/icons";
import { interests, profile, socials } from "../data/cv";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const cards = [
  { icon: "pin", k: "Ville", v: profile.location },
  { icon: "mail", k: "Email", v: profile.email, href: `mailto:${profile.email}` },
  { icon: "calendar", k: "Disponibilité", v: profile.availability },
];

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Adresse email invalide.";
    if (message.length < 10) next.message = "Le message doit faire au moins 10 caractères.";

    setErrors(next);
    if (Object.keys(next).length) {
      setSent(false);
      return;
    }

    // Démo : aucun service d'envoi n'est branché. Remplacez ce bloc par votre
    // appel API (Formspree, EmailJS, route /api/contact…).
    setSent(true);
    form.reset();
  }

  return (
    <div className="page scroll-area">
      <PageHead eyebrow="Contact" title="Travaillons ensemble" />

      <div className="contact">
        <div>
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

          <h3 className="h3" style={{ marginTop: 36 }}>
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

          <h3 className="h3" style={{ marginTop: 36 }}>
            Centres d'intérêt
          </h3>
          <div className="chips">
            {interests.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
              />
              {errors.name && (
                <span className="err" id="name-err" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
              />
              {errors.email && (
                <span className="err" id="email-err" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="subject">Sujet</label>
            <input id="subject" name="subject" type="text" />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-err" : undefined}
            />
            {errors.message && (
              <span className="err" id="message-err" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <Pill icon="send" type="submit">Envoyer le message</Pill>

          {sent && (
            <p className="form-note" role="status">
              Message validé. Branchez un service d'envoi pour le recevoir réellement.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
