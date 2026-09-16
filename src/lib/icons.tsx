import type { ReactNode, SVGAttributes } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  Cards, CrystalBall, DecoClose, DecoSun, Eiffel, Envelope, Grimoire, Hourglass,
  Mask, Quill, Scroll, StarMoon, Theatre, TopHat, Trunk, Wand,
} from "./magicIcons";

type AnyIcon = (props: SVGAttributes<SVGElement>) => ReactNode;

/** Table nom → pictogramme. Les logos de marques restent ceux de react-icons. */
export const icons: Record<string, AnyIcon> = {
  // Navigation
  home: TopHat,
  user: Mask,
  briefcase: Scroll,
  building: Theatre,
  grid: Cards,
  mail: Envelope,
  // Boutons
  right: Wand,
  send: Quill,
  close: DecoClose,
  sun: DecoSun,
  moon: StarMoon,
  // Domaines d'intervention
  target: CrystalBall,
  code: Wand,
  server: Trunk,
  book: Grimoire,
  // Contact
  pin: Eiffel,
  calendar: Hourglass,
  // Marques
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

/** Rend une icône par son nom ; ne rend rien si le nom est inconnu. */
export function Icon({ name, ...rest }: { name: string } & SVGAttributes<SVGElement>) {
  const Cmp = icons[name];
  return Cmp ? <Cmp {...rest} /> : null;
}
