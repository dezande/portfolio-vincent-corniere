import { Icon } from "../lib/icons";
import { pathFor, type ScreenId } from "../lib/routes";

export type { ScreenId };

export const NAV: { id: ScreenId; label: string; icon: string }[] = [
  { id: "home", label: "Accueil", icon: "home" },
  { id: "about", label: "À propos", icon: "user" },
  { id: "resume", label: "Parcours", icon: "briefcase" },
  { id: "projects", label: "Projets", icon: "grid" },
  { id: "interests", label: "Centres d'intérêt", icon: "heart" },
  { id: "contact", label: "Contact", icon: "mail" },
];

type Props = { active: ScreenId; onChange: (id: ScreenId) => void };

export default function NavRail({ active, onChange }: Props) {
  return (
    <nav className="rail" aria-label="Navigation principale">
      {NAV.map((n) => (
        <a
          key={n.id}
          className="rail-link"
          href={pathFor({ screen: n.id, company: null })}
          onClick={(e) => {
            // Clic simple : navigation interne. Ctrl/Cmd-clic ou clic molette : nouvel onglet.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onChange(n.id);
          }}
          aria-current={active === n.id ? "page" : undefined}
          aria-label={n.label}
        >
          <Icon name={n.icon} aria-hidden="true" />
          <span className="tip" aria-hidden="true">
            {n.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
