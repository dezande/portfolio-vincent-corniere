import { Icon } from "../lib/icons";

export const NAV = [
  { id: "home", label: "Accueil", icon: "home" },
  { id: "about", label: "À propos", icon: "user" },
  { id: "resume", label: "Parcours", icon: "briefcase" },
  { id: "companies", label: "Entreprises", icon: "building" },
  { id: "projects", label: "Projets", icon: "grid" },
  { id: "contact", label: "Contact", icon: "mail" },
] as const;

export type ScreenId = (typeof NAV)[number]["id"];

type Props = { active: ScreenId; onChange: (id: ScreenId) => void };

export default function NavRail({ active, onChange }: Props) {
  return (
    <nav className="rail" aria-label="Navigation principale">
      {NAV.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => onChange(n.id)}
          aria-current={active === n.id}
          aria-label={n.label}
        >
          <Icon name={n.icon} aria-hidden="true" />
          <span className="tip" aria-hidden="true">
            {n.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
