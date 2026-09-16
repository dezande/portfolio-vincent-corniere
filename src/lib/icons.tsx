import type { IconType } from "react-icons";
import {
  FiHome, FiUser, FiBriefcase, FiGrid, FiMail, FiPhone, FiMapPin,
  FiDownload, FiArrowLeft, FiArrowRight, FiX, FiSun, FiMoon, FiCode,
  FiServer, FiBookOpen, FiTarget, FiSend, FiCalendar, FiHeart,
} from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaRegBuilding } from "react-icons/fa6";

export const icons: Record<string, IconType> = {
  home: FiHome,
  user: FiUser,
  briefcase: FiBriefcase,
  grid: FiGrid,
  mail: FiMail,
  phone: FiPhone,
  pin: FiMapPin,
  download: FiDownload,
  left: FiArrowLeft,
  right: FiArrowRight,
  close: FiX,
  sun: FiSun,
  moon: FiMoon,
  code: FiCode,
  server: FiServer,
  book: FiBookOpen,
  target: FiTarget,
  send: FiSend,
  calendar: FiCalendar,
  heart: FiHeart,
  building: FaRegBuilding,
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

/** Rend une icône par son nom ; ne rend rien si le nom est inconnu. */
export function Icon({ name, ...rest }: { name: string } & Record<string, unknown>) {
  const Cmp = icons[name];
  return Cmp ? <Cmp {...rest} /> : null;
}
