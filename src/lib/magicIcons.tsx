import type { ReactNode, SVGAttributes } from "react";

/**
 * Pictogrammes originaux dans l'esprit des affiches de magiciens :
 * trait fin doré, quelques aplats, étoiles scintillantes.
 * Grille 24 × 24, couleur héritée via currentColor.
 */

export type MagicIconProps = SVGAttributes<SVGElement>;

function Base({ children, ...rest }: MagicIconProps & { children: ReactNode }) {
  return (
    <svg
      className="mi"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Étoile à quatre branches pleine, centrée en (x, y). */
const spark = (x: number, y: number, r: number) =>
  `M${x} ${y - r}Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y}Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r}Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y}Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r}Z`;

/** Accueil — haut-de-forme */
export const TopHat = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M7.5 5.5h9v10h-9z" />
    <path d="M7.5 12.5h9v3h-9z" fill="currentColor" fillOpacity={0.35} />
    <path d="M2.5 17.8c0-1.3 4.3-2.3 9.5-2.3s9.5 1 9.5 2.3-4.3 2.4-9.5 2.4-9.5-1.1-9.5-2.4z" />
    <path d={spark(19.5, 4.5, 2.2)} fill="currentColor" stroke="none" />
  </Base>
);

/** À propos — loup de bal masqué */
export const Mask = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M2.5 9c2.8-2 6.2-2.1 9.5-.3 3.3-1.8 6.7-1.7 9.5.3-.3 3.9-2.3 6.4-5.1 6.4-1.9 0-3.2-1-4.4-2.5-1.2 1.5-2.5 2.5-4.4 2.5-2.8 0-4.8-2.5-5.1-6.4z" />
    <path d="M5.4 11.3c.9-1 2.6-1.1 3.6 0-.9 1-2.7 1-3.6 0zM15 11.3c1-1.1 2.7-1 3.6 0-.9 1-2.7 1.1-3.6 0z" fill="currentColor" />
    <path d="M2.5 9 1 12.8M21.5 9l1.5 3.8" />
  </Base>
);

/** Parcours — parchemin déroulé */
export const Scroll = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M8 3.5h11a2 2 0 0 1 0 4h-1.5V18a2.5 2.5 0 0 1-2.5 2.5H5a2 2 0 0 1 0-4h1.5V6A2.5 2.5 0 0 1 9 3.5" />
    <path d="M6.5 16.5H13a2 2 0 0 1 2 2 2 2 0 0 0 2-2" />
    <path d="M9.5 9h5M9.5 11.5h5M9.5 14h3" />
  </Base>
);

/** Entreprises — façade de théâtre à fronton */
export const Theatre = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M3 9.5 12 4l9 5.5z" />
    <path d="M4.5 9.5v11M19.5 9.5v11M7.8 12v6.5M16.2 12v6.5M2.5 20.5h19" />
    <path d="M10 20.5v-4.3a2 2 0 0 1 4 0v4.3" />
    <path d={spark(12, 7.3, 1.4)} fill="currentColor" stroke="none" />
  </Base>
);

/** Projets — éventail de cartes à jouer */
export const Cards = (p: MagicIconProps) => (
  <Base {...p}>
    <rect x="3.6" y="5.6" width="8.4" height="12.4" rx="1.2" transform="rotate(-20 7.8 11.8)" />
    <rect x="12" y="5.6" width="8.4" height="12.4" rx="1.2" transform="rotate(20 16.2 11.8)" />
    <rect x="7.8" y="4" width="8.4" height="13" rx="1.2" fill="var(--icon-bg, var(--bg))" />
    <path d="M12 7.6 14.2 10.5 12 13.4 9.8 10.5z" fill="currentColor" />
  </Base>
);

/** Contact — enveloppe scellée à la cire */
export const Envelope = (p: MagicIconProps) => (
  <Base {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="1" />
    <path d="m3 6 9 6.5L21 6" />
    <circle cx="12" cy="13.2" r="2.5" fill="currentColor" />
    <path d="M10.5 15.3 9.6 18M13.5 15.3l.9 2.7" />
  </Base>
);

/** Baguette magique et étincelles — bouton « Entrez en scène » */
export const Wand = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="m3.5 20.5 11-11" strokeWidth={2} />
    <path d="m13 11 1.5-1.5" stroke="var(--icon-bg, var(--bg))" strokeWidth={2} />
    <path d={spark(18, 6, 3.4)} fill="currentColor" stroke="none" />
    <path d={spark(21, 11.5, 1.5)} fill="currentColor" stroke="none" />
    <path d={spark(12.5, 3, 1.3)} fill="currentColor" stroke="none" />
  </Base>
);

/** Envoyer — plume d'écriture */
export const Quill = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M20.5 3.5C13 4.5 8.5 9.5 7 17l-1.5 3.5" />
    <path d="M20.5 3.5c-.8 6-4.8 10.6-11.8 12.3" />
    <path d="M9.8 12.2h4.4M12.3 8.8h3.9" />
  </Base>
);

/** Conception — boule de cristal */
export const CrystalBall = (p: MagicIconProps) => (
  <Base {...p}>
    <circle cx="12" cy="10" r="6.8" />
    <path d="M8.2 7.6a4.4 4.4 0 0 1 3-2.4" />
    <path d="M7.3 16.8h9.4l1.8 3.7H5.5z" fill="currentColor" fillOpacity={0.35} />
    <path d={spark(13.5, 11, 1.8)} fill="currentColor" stroke="none" />
  </Base>
);

/** Infrastructure — malle d'évasion cadenassée */
export const Trunk = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M3.5 10.5v-1C3.5 6.8 7.3 5 12 5s8.5 1.8 8.5 4.5v1" />
    <rect x="3.5" y="10.5" width="17" height="9.5" rx="1" />
    <path d="M8 5.6V20M16 5.6V20" />
    <rect x="10.4" y="12.5" width="3.2" height="3.4" rx=".5" fill="currentColor" />
    <path d="M10.9 12.5v-1a1.1 1.1 0 0 1 2.2 0v1" />
  </Base>
);

/** Documentation — grimoire étoilé */
export const Grimoire = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M4.5 19V5A1.5 1.5 0 0 1 6 3.5h13.5v14H6A1.5 1.5 0 0 0 4.5 19a1.5 1.5 0 0 0 1.5 1.5h13.5v-3" />
    <path d={spark(12, 10.5, 3.6)} fill="currentColor" stroke="none" />
  </Base>
);

/** Ville — tour Eiffel */
export const Eiffel = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M12 2v3M10.6 5h2.8" />
    <path d="M10.6 5 8.8 12.5h6.4L13.4 5" />
    <path d="M8.8 12.5 6 21M15.2 12.5 18 21M7.9 16h8.2" />
    <path d="M9.5 21a2.5 2.5 0 0 1 5 0" />
  </Base>
);

/** Disponibilité — sablier */
export const Hourglass = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M6 3h12M6 21h12" />
    <path d="M7.3 3c0 5.2 4.7 6 4.7 9s-4.7 3.8-4.7 9M16.7 3c0 5.2-4.7 6-4.7 9s4.7 3.8 4.7 9" />
    <path d="M9.3 20.3c.6-2 2.7-2.6 2.7-3.8 0 1.2 2.1 1.8 2.7 3.8z" fill="currentColor" stroke="none" />
  </Base>
);

/** Thème clair — soleil Art déco */
export const DecoSun = (p: MagicIconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.6" />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6;
      const r1 = 5.6;
      const r2 = i % 2 === 0 ? 10 : 8;
      return (
        <path
          key={i}
          d={`M${(12 + Math.cos(a) * r1).toFixed(2)} ${(12 + Math.sin(a) * r1).toFixed(2)}L${(12 + Math.cos(a) * r2).toFixed(2)} ${(12 + Math.sin(a) * r2).toFixed(2)}`}
        />
      );
    })}
  </Base>
);

/** Thème sombre — croissant de lune étoilé */
export const StarMoon = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="M15.5 20A8.5 8.5 0 0 1 10 4.1a7 7 0 1 0 9.9 9.9 8.5 8.5 0 0 1-4.4 6z" />
    <path d={spark(17, 6.5, 2.4)} fill="currentColor" stroke="none" />
  </Base>
);

/** Fermer — croix fine et losange */
export const DecoClose = (p: MagicIconProps) => (
  <Base {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
    <path d="M12 9.6 14.4 12 12 14.4 9.6 12z" fill="currentColor" />
  </Base>
);
