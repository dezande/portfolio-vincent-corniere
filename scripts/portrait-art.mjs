/**
 * Portrait de l'accueil — version neutre : silhouette de magicien sous projecteur,
 * dans le ton des affiches du site (fond rouge sang, soleil rayonnant, or).
 * Point de départ des futures variantes du portrait.
 * Usage : node scripts/portrait-art.mjs  → public/img/portrait.svg
 */
import { writeFileSync } from "node:fs";

const GOLD = "#c9a24a", GOLD_L = "#e9d18f", RED = "#9b1c1c", RED_D = "#5e0f10", INK = "#0d0a09", CREAM = "#f1e6cf";

const sunburst = (cx, cy, r, n, op) => {
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, a2 = ((i + 0.5) / n) * Math.PI * 2;
    if (i % 2) continue;
    out += `<path d="M${cx} ${cy} L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} L${(cx + Math.cos(a2) * r).toFixed(1)} ${(cy + Math.sin(a2) * r).toFixed(1)} Z" fill="${GOLD}" opacity="${op}"/>`;
  }
  return out;
};

const star = (cx, cy, r, fill, op = 1) =>
  `<path d="M${cx} ${cy - r} C${cx + r * 0.08} ${cy - r * 0.33} ${cx + r * 0.33} ${cy - r * 0.08} ${cx + r} ${cy} C${cx + r * 0.33} ${cy + r * 0.08} ${cx + r * 0.08} ${cy + r * 0.33} ${cx} ${cy + r} C${cx - r * 0.08} ${cy + r * 0.33} ${cx - r * 0.33} ${cy + r * 0.08} ${cx - r} ${cy} C${cx - r * 0.33} ${cy - r * 0.08} ${cx - r * 0.08} ${cy - r * 0.33} ${cx} ${cy - r} Z" fill="${fill}" opacity="${op}"/>`;

const grain = `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .9 0 0 0 0 .75 0 0 0 .12 0"/></filter>`;

const PW = 800, PH = 1100;
writeFileSync("public/img/portrait.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" width="${PW}" height="${PH}">
<defs>
  <radialGradient id="bg" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="${RED}"/><stop offset=".55" stop-color="${RED_D}"/><stop offset="1" stop-color="${INK}"/></radialGradient>
  <radialGradient id="spot" cx=".5" cy=".3" r=".5"><stop offset="0" stop-color="${GOLD_L}" stop-opacity=".35"/><stop offset="1" stop-color="${GOLD_L}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1210"/><stop offset="1" stop-color="${INK}"/></linearGradient>
  ${grain}
</defs>
<rect width="${PW}" height="${PH}" fill="url(#bg)"/>
${sunburst(PW / 2, PH * 0.36, 1100, 40, 0.1)}
<ellipse cx="${PW / 2}" cy="${PH * 0.36}" rx="340" ry="420" fill="url(#spot)"/>
<!-- Haut-de-forme -->
<rect x="${PW / 2 - 105}" y="${PH * 0.12}" width="210" height="170" rx="10" fill="url(#fig)" stroke="${GOLD}" stroke-width="2" stroke-opacity=".5"/>
<rect x="${PW / 2 - 105}" y="${PH * 0.12 + 118}" width="210" height="26" fill="${RED}"/>
<ellipse cx="${PW / 2}" cy="${PH * 0.12 + 172}" rx="175" ry="26" fill="url(#fig)" stroke="${GOLD}" stroke-width="2" stroke-opacity=".5"/>
<!-- Tête et épaules -->
<ellipse cx="${PW / 2}" cy="${PH * 0.43}" rx="118" ry="140" fill="url(#fig)"/>
<path d="M${PW / 2} ${PH * 0.56} C${PW / 2 - 290} ${PH * 0.56} ${PW / 2 - 330} ${PH * 0.78} ${PW / 2 - 330} ${PH} H${PW / 2 + 330} C${PW / 2 + 330} ${PH * 0.78} ${PW / 2 + 290} ${PH * 0.56} ${PW / 2} ${PH * 0.56} Z" fill="url(#fig)"/>
<!-- Col et nœud papillon -->
<path d="M${PW / 2 - 70} ${PH * 0.6} L${PW / 2} ${PH * 0.7} L${PW / 2 + 70} ${PH * 0.6} L${PW / 2 + 40} ${PH} H${PW / 2 - 40} Z" fill="${CREAM}" opacity=".9"/>
<path d="M${PW / 2} ${PH * 0.66} l-58 -26 v52 z M${PW / 2} ${PH * 0.66} l58 -26 v52 z" fill="${GOLD}"/>
<circle cx="${PW / 2}" cy="${PH * 0.66}" r="11" fill="${GOLD_L}"/>
${star(PW * 0.2, PH * 0.2, 22, GOLD_L, 0.8)}${star(PW * 0.82, PH * 0.3, 15, GOLD_L, 0.7)}${star(PW * 0.16, PH * 0.5, 11, GOLD_L, 0.6)}
<rect width="${PW}" height="${PH}" filter="url(#n)"/>
</svg>`);
console.log("public/img/portrait.svg généré (portrait neutre)");
