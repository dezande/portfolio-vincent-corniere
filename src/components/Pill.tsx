import { Icon } from "../lib/icons";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  icon?: string;
  href?: string;
  download?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

/** Bouton « billet » : coins coupés, double filet doré, losange à gauche. */
export default function Pill({ children, icon = "right", href, download, type = "button", onClick }: Props) {
  const inner = (
    <>
      <span className="dot" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span className="txt">{children}</span>
    </>
  );

  if (href) {
    return (
      <a className="pill" href={href} download={download} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button className="pill" type={type} onClick={onClick}>
      {inner}
    </button>
  );
}
