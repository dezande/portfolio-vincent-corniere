import type { ComponentType, SVGAttributes } from "react";
import {
  SiAngular, SiBootstrap, SiGitlab, SiGrafana, SiJira, SiJquery, SiKibana, SiMongodb,
  SiMysql, SiNginx, SiPaypal, SiPrometheus, SiRubyonrails, SiSass, SiSidekiq, SiXml,
} from "react-icons/si";
import { Cog, Coin, DecoCloud, OrnateKey, Scarab, ShopBag } from "../lib/magicIcons";

type AnyIcon = ComponentType<SVGAttributes<SVGElement>>;

/**
 * Nom de technologie → pictogramme. La comparaison se fait en minuscules sur le début
 * du libellé, pour que « Ruby on Rails 4 » ou « GitLab CE » trouvent leur logo.
 * Logos de marques : Simple Icons (via react-icons). Sans logo : dessins du thème.
 */
const RULES: [prefix: string, icon: AnyIcon][] = [
  ["ruby on rails", SiRubyonrails],
  ["mysql", SiMysql],
  ["mongodb", SiMongodb],
  ["jira", SiJira],
  ["kibana", SiKibana],
  ["grafana", SiGrafana],
  ["prometheus", SiPrometheus],
  ["angular", SiAngular],
  ["jquery", SiJquery],
  ["bootstrap", SiBootstrap],
  ["sass", SiSass],
  ["nginx", SiNginx],
  ["gitlab", SiGitlab],
  ["sidekiq", SiSidekiq],
  ["paypal", SiPaypal],
  ["xml", SiXml],
  // Sans logo de marque disponible
  ["aws", DecoCloud],
  ["bugsnag", Scarab],
  ["payvision", Coin],
  ["spree", ShopBag],
  ["sso", OrnateKey],
  ["saml", OrnateKey],
  ["cas", OrnateKey],
  ["oauth", OrnateKey],
  ["omniauth", OrnateKey],
  ["shibboleth", OrnateKey],
  ["api", Cog],
  ["ajax", Cog],
  ["unicorn", Cog],
  ["algorithm", Cog],
];

export function techIcon(name: string): AnyIcon | null {
  const n = name.trim().toLowerCase();
  return RULES.find(([prefix]) => n.startsWith(prefix))?.[1] ?? null;
}

/** Étiquette de technologie : pictogramme doré + libellé. */
export default function TechTag({ name }: { name: string }) {
  const Icon = techIcon(name);
  return (
    <span className="tech-tag">
      {Icon && <Icon className="tech-ico" aria-hidden="true" focusable="false" />}
      {name}
    </span>
  );
}
