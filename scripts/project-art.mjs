/**
 * Génère les visuels des projets (public/img/work-*.svg) : une affichette par projet,
 * fond à la couleur de l'entreprise (comme les cartes de Parcours), objet dessiné au centre.
 * Dessins originaux — aucun logo de client.  Usage : node scripts/project-art.mjs
 */
import { writeFileSync } from "node:fs";

const W = 900, H = 1200, CX = 450, CY = 500;
const G = "#c9a24a", GL = "#e9d18f", C = "#f1e6cf", R = "#9b1c1c", I = "#0d0a09";

const GROUNDS = {
  jobteaser: ["#1f5c57", "#0f3230"],
  prium: ["#3a2a14", "#140d08"],
  cbm: ["#22304f", "#0b1120"],
};

const star = (x, y, r, fill = GL, op = 1) =>
  `<path d="M${x} ${y - r}Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y}Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r}Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y}Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z" fill="${fill}" opacity="${op}"/>`;

const rays = () => {
  let out = "";
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2, len = i % 2 ? 330 : 430;
    const x2 = CX + Math.cos(a) * len, y2 = CY + Math.sin(a) * len;
    const x1 = CX + Math.cos(a) * 210, y1 = CY + Math.sin(a) * 210;
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${G}" stroke-width="${i % 2 ? 2 : 3.5}" opacity="${i % 2 ? 0.16 : 0.26}"/>`;
  }
  return out + `<circle cx="${CX}" cy="${CY}" r="200" fill="none" stroke="${G}" stroke-width="2" opacity=".45"/><circle cx="${CX}" cy="${CY}" r="212" fill="none" stroke="${G}" stroke-width="1" opacity=".3"/>`;
};

/* ------------------------------ Objets ------------------------------ */

const OBJECTS = {
  // 1. Intégration SSO — clé ouvragée
  key: () => `
    <g transform="rotate(-35 ${CX} ${CY})">
      <circle cx="${CX - 120}" cy="${CY}" r="78" fill="none" stroke="${GL}" stroke-width="22"/>
      <circle cx="${CX - 120}" cy="${CY}" r="34" fill="none" stroke="${G}" stroke-width="8"/>
      ${star(CX - 120, CY, 22, GL)}
      <rect x="${CX - 48}" y="${CY - 14}" width="230" height="28" rx="6" fill="${GL}"/>
      <rect x="${CX - 40}" y="${CY - 26}" width="18" height="52" rx="4" fill="${G}"/>
      <rect x="${CX + 110}" y="${CY + 14}" width="26" height="48" fill="${GL}"/>
      <rect x="${CX + 150}" y="${CY + 14}" width="26" height="72" fill="${GL}"/>
      <rect x="${CX + 110}" y="${CY + 44}" width="66" height="18" fill="${GL}"/>
    </g>`,

  // 2. Paris en ligne — deux dés
  dice: () => {
    const pip = (x, y) => `<circle cx="${x}" cy="${y}" r="14" fill="${I}"/>`;
    const die = (x, y, rot, pips, fill) => `
      <g transform="rotate(${rot} ${x + 85} ${y + 85})">
        <rect x="${x}" y="${y}" width="170" height="170" rx="26" fill="${fill}" stroke="${G}" stroke-width="7"/>
        ${pips.map(([px, py]) => pip(x + px, y + py)).join("")}
      </g>`;
    return die(CX - 200, CY - 60, -14, [[42, 42], [85, 85], [128, 128]], C) +
      die(CX + 20, CY - 130, 12, [[42, 42], [128, 42], [42, 128], [128, 128], [42, 85], [128, 85]], GL);
  },

  // 3. E-learning VTC — volant et toque de diplômé
  wheel: () => `
    <circle cx="${CX}" cy="${CY + 40}" r="150" fill="none" stroke="${GL}" stroke-width="24"/>
    <circle cx="${CX}" cy="${CY + 40}" r="40" fill="${G}"/>
    <path d="M${CX} ${CY + 80}V${CY + 178}M${CX - 36} ${CY + 20}L${CX - 138} ${CY - 20}M${CX + 36} ${CY + 20}L${CX + 138} ${CY - 20}" stroke="${GL}" stroke-width="20" stroke-linecap="round"/>
    <path d="M${CX} ${CY - 250}L${CX + 150} ${CY - 195}L${CX} ${CY - 140}L${CX - 150} ${CY - 195}Z" fill="${I}" stroke="${GL}" stroke-width="7"/>
    <path d="M${CX - 85} ${CY - 170}V${CY - 118}Q${CX} ${CY - 88} ${CX + 85} ${CY - 118}V${CY - 170}" fill="${I}" stroke="${GL}" stroke-width="7"/>
    <path d="M${CX + 150} ${CY - 195}V${CY - 120}" stroke="${G}" stroke-width="6"/>
    <circle cx="${CX + 150}" cy="${CY - 112}" r="12" fill="${G}"/>`,

  // 4. Argus — voiture ancienne
  car: () => `
    <path d="M${CX - 230} ${CY + 80}L${CX - 205} ${CY + 10}Q${CX - 175} ${CY - 20} ${CX - 110} ${CY - 22}L${CX - 60} ${CY - 100}Q${CX - 40} ${CY - 122} ${CX} ${CY - 122}L${CX + 110} ${CY - 122}Q${CX + 145} ${CY - 122} ${CX + 165} ${CY - 95}L${CX + 205} ${CY - 22}Q${CX + 245} ${CY - 15} ${CX + 250} ${CY + 20}L${CX + 250} ${CY + 80}Z" fill="${C}" stroke="${G}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M${CX - 35} ${CY - 30}L${CX - 5} ${CY - 92}L${CX + 60} ${CY - 92}L${CX + 60} ${CY - 30}Z" fill="${I}" opacity=".85"/>
    <path d="M${CX + 82} ${CY - 30}L${CX + 82} ${CY - 92}L${CX + 125} ${CY - 92}L${CX + 170} ${CY - 30}Z" fill="${I}" opacity=".85"/>
    <path d="M${CX - 225} ${CY + 38}H${CX + 248}" stroke="${R}" stroke-width="12"/>
    <circle cx="${CX + 238}" cy="${CY + 2}" r="12" fill="${GL}"/>
    ${[CX - 130, CX + 150].map((x) => `<circle cx="${x}" cy="${CY + 82}" r="58" fill="${I}" stroke="${GL}" stroke-width="10"/><circle cx="${x}" cy="${CY + 82}" r="20" fill="${G}"/>`).join("")}`,

  // 5. Speed-meetings — montre à gousset
  watch: () => {
    let ticks = "";
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r1 = i % 3 ? 118 : 104, r2 = 132;
      ticks += `<line x1="${(CX + Math.sin(a) * r1).toFixed(1)}" y1="${(CY + 30 - Math.cos(a) * r1).toFixed(1)}" x2="${(CX + Math.sin(a) * r2).toFixed(1)}" y2="${(CY + 30 - Math.cos(a) * r2).toFixed(1)}" stroke="${I}" stroke-width="${i % 3 ? 5 : 10}"/>`;
    }
    return `
      <path d="M${CX - 250} ${CY - 250}Q${CX - 120} ${CY - 330} ${CX} ${CY - 205}" fill="none" stroke="${G}" stroke-width="7" stroke-dasharray="4 14" stroke-linecap="round"/>
      <rect x="${CX - 22}" y="${CY - 215}" width="44" height="42" rx="8" fill="${GL}"/>
      <circle cx="${CX}" cy="${CY - 232}" r="22" fill="none" stroke="${GL}" stroke-width="9"/>
      <circle cx="${CX}" cy="${CY + 30}" r="175" fill="${GL}"/>
      <circle cx="${CX}" cy="${CY + 30}" r="150" fill="${C}" stroke="${G}" stroke-width="6"/>
      ${ticks}
      <path d="M${CX} ${CY + 30}L${CX + 72} ${CY - 30}" stroke="${I}" stroke-width="12" stroke-linecap="round"/>
      <path d="M${CX} ${CY + 30}L${CX - 20} ${CY - 90}" stroke="${R}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="${CX}" cy="${CY + 30}" r="14" fill="${I}"/>`;
  },

  // 6. Collecte des déchets — camion de collecte, médaillon de recyclage sur la benne
  truck: () => {
    // Trois flèches courbes identiques, décalées de 120°, qui se suivent sur un cercle.
    const recycle = (cx, cy, r) => {
      let out = "";
      for (let k = 0; k < 3; k++) {
        const a0 = ((-80 + 120 * k) * Math.PI) / 180, a1 = a0 + (82 * Math.PI) / 180;
        const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
        const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const t = [-Math.sin(a1), Math.cos(a1)], n = [Math.cos(a1), Math.sin(a1)];
        const tip = [p1[0] + t[0] * 20, p1[1] + t[1] * 20];
        const b1 = [p1[0] + n[0] * 15, p1[1] + n[1] * 15], b2 = [p1[0] - n[0] * 15, p1[1] - n[1] * 15];
        const f = (q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
        out += `<path d="M${f(p0)}A${r} ${r} 0 0 1 ${f(p1)}" fill="none" stroke="${GL}" stroke-width="11" stroke-linecap="round"/>`;
        out += `<path d="M${f(tip)}L${f(b1)}L${f(b2)}Z" fill="${GL}"/>`;
      }
      return out;
    };
    const wheel = (x) => `<circle cx="${x}" cy="${CY + 95}" r="50" fill="${I}" stroke="${GL}" stroke-width="10"/><circle cx="${x}" cy="${CY + 95}" r="17" fill="${G}"/>`;
    return `
      <rect x="${CX - 255}" y="${CY - 150}" width="305" height="205" rx="14" fill="${C}" stroke="${G}" stroke-width="8"/>
      <path d="M${CX - 255} ${CY - 100}H${CX + 50}M${CX - 255} ${CY + 5}H${CX + 50}" stroke="${G}" stroke-width="3" opacity=".6"/>
      <circle cx="${CX - 102}" cy="${CY - 47}" r="74" fill="${R}"/>
      <circle cx="${CX - 102}" cy="${CY - 47}" r="63" fill="none" stroke="${GL}" stroke-width="3"/>
      ${recycle(CX - 102, CY - 47, 38)}
      <path d="M${CX + 62} ${CY + 55}V${CY - 80}H${CX + 158}Q${CX + 186} ${CY - 80} ${CX + 202} ${CY - 54}L${CX + 250} ${CY + 12}V${CY + 55}Z" fill="${GL}" stroke="${G}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M${CX + 86} ${CY - 56}H${CX + 152}L${CX + 196} ${CY + 2}H${CX + 86}Z" fill="${I}" opacity=".85"/>
      <circle cx="${CX + 238}" cy="${CY + 30}" r="10" fill="${C}"/>
      <rect x="${CX - 270}" y="${CY + 50}" width="530" height="24" rx="6" fill="${G}"/>
      ${wheel(CX - 175)}${wheel(CX - 45)}${wheel(CX + 175)}`;
  },

  // 7. Travel in Med — rose des vents
  compass: () => {
    const pt = (a, r) => [CX + Math.cos(a) * r, CY + 30 + Math.sin(a) * r];
    let diag = "", main = "";
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 4 + (i * Math.PI) / 2;
      const [tx, ty] = pt(a, 120), [lx, ly] = pt(a - 0.35, 34), [rx, ry] = pt(a + 0.35, 34);
      diag += `<path d="M${CX} ${CY + 30}L${lx.toFixed(1)} ${ly.toFixed(1)}L${tx.toFixed(1)} ${ty.toFixed(1)}L${rx.toFixed(1)} ${ry.toFixed(1)}Z" fill="${G}"/>`;
    }
    for (let i = 0; i < 4; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 2;
      const [tx, ty] = pt(a, 190), [lx, ly] = pt(a - 0.28, 42), [rx, ry] = pt(a + 0.28, 42);
      main += `<path d="M${CX} ${CY + 30}L${lx.toFixed(1)} ${ly.toFixed(1)}L${tx.toFixed(1)} ${ty.toFixed(1)}Z" fill="${C}"/><path d="M${CX} ${CY + 30}L${rx.toFixed(1)} ${ry.toFixed(1)}L${tx.toFixed(1)} ${ty.toFixed(1)}Z" fill="${i === 0 ? R : GL}"/>`;
    }
    return `<circle cx="${CX}" cy="${CY + 30}" r="160" fill="none" stroke="${GL}" stroke-width="6"/><circle cx="${CX}" cy="${CY + 30}" r="146" fill="none" stroke="${G}" stroke-width="2"/>${diag}${main}<circle cx="${CX}" cy="${CY + 30}" r="16" fill="${I}" stroke="${GL}" stroke-width="5"/>`;
  },

  // 8. Parfaite & Satisfaite — flacon de parfum
  perfume: () => `
    <path d="M${CX - 150} ${CY - 40}Q${CX - 150} ${CY - 70} ${CX - 120} ${CY - 70}H${CX + 120}Q${CX + 150} ${CY - 70} ${CX + 150} ${CY - 40}V${CY + 170}Q${CX + 150} ${CY + 200} ${CX + 120} ${CY + 200}H${CX - 120}Q${CX - 150} ${CY + 200} ${CX - 150} ${CY + 170}Z" fill="${C}" stroke="${G}" stroke-width="8"/>
    <path d="M${CX - 118} ${CY + 40}H${CX + 118}V${CY + 160}Q${CX + 118} ${CY + 170} ${CX + 108} ${CY + 170}H${CX - 108}Q${CX - 118} ${CY + 170} ${CX - 118} ${CY + 160}Z" fill="${R}" opacity=".9"/>
    <rect x="${CX - 42}" y="${CY - 120}" width="84" height="52" fill="${GL}" stroke="${G}" stroke-width="6"/>
    <path d="M${CX} ${CY - 290}L${CX + 80} ${CY - 205}L${CX} ${CY - 120}L${CX - 80} ${CY - 205}Z" fill="${GL}" stroke="${G}" stroke-width="6"/>
    <path d="M${CX} ${CY - 290}V${CY - 120}M${CX - 80} ${CY - 205}H${CX + 80}" stroke="${G}" stroke-width="3"/>
    ${star(CX, CY + 100, 34, GL)}`,

  // 9. Boutiques en ligne — sac de boutique
  bag: () => `
    <path d="M${CX - 80} ${CY - 90}V${CY - 150}A80 80 0 0 1 ${CX + 80} ${CY - 150}V${CY - 90}" fill="none" stroke="${GL}" stroke-width="18" stroke-linecap="round"/>
    <path d="M${CX - 170} ${CY - 100}H${CX + 170}L${CX + 195} ${CY + 210}H${CX - 195}Z" fill="${C}" stroke="${G}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M${CX - 176} ${CY - 40}H${CX + 176}" stroke="${G}" stroke-width="4"/>
    <circle cx="${CX}" cy="${CY + 70}" r="78" fill="${R}"/>
    <circle cx="${CX}" cy="${CY + 70}" r="64" fill="none" stroke="${GL}" stroke-width="4"/>
    ${star(CX, CY + 70, 42, GL)}`,
};

/* ------------------------------ Affiches ------------------------------ */

const WORKS = [
  { file: "work-1.svg", ground: "jobteaser", object: "key" },
  { file: "work-2.svg", ground: "prium", object: "dice" },
  { file: "work-3.svg", ground: "prium", object: "wheel" },
  { file: "work-4.svg", ground: "prium", object: "car" },
  { file: "work-5.svg", ground: "prium", object: "watch" },
  { file: "work-6.svg", ground: "prium", object: "truck" },
  { file: "work-7.svg", ground: "cbm", object: "compass" },
  { file: "work-8.svg", ground: "cbm", object: "perfume" },
  { file: "work-9.svg", ground: "cbm", object: "bag" },
];

for (const w of WORKS) {
  const [a, b] = GROUNDS[w.ground];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <radialGradient id="g" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".45"/></filter>
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .9 0 0 0 0 .75 0 0 0 .1 0"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
${rays()}
<g filter="url(#shadow)">${OBJECTS[w.object]()}</g>
${star(190, 250, 16, GL, 0.7)}${star(720, 300, 11, GL, 0.6)}${star(700, 760, 14, GL, 0.55)}
<rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="${G}" stroke-width="3"/>
<rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${G}" stroke-width="1.2" opacity=".6"/>
${star(40, 40, 16, G)}${star(W - 40, 40, 16, G)}${star(40, H - 40, 16, G)}${star(W - 40, H - 40, 16, G)}
<rect width="${W}" height="${H}" filter="url(#n)"/>
</svg>`;
  writeFileSync(`public/img/${w.file}`, svg);
}
console.log(`${WORKS.length} affichettes générées`);
