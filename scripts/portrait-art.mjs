/**
 * Portrait de l'accueil : Vincent en magicien, illustration vectorielle originale dans le style
 * des affiches du site (fond rouge sang, soleil rayonnant, or). Traits repris de sa photo :
 * cheveux courts châtain clair, lunettes rectangulaires foncées, sourire. Chemise blanche sous l'habit.
 * Usage : node scripts/portrait-art.mjs  → public/img/portrait.svg
 */
import { writeFileSync } from "node:fs";

const W = 800, H = 1100, CX = 400;
const GOLD = "#c9a24a", GOLD_L = "#e9d18f", RED = "#9b1c1c", RED_D = "#5e0f10", INK = "#0d0a09";
const SKIN = "#efc6a4", SKIN_S = "#d9a684", HAIR = "#a37f58", HAIR_D = "#7d5f3f";
const NAVY = "#1f2b45", CREAM = "#f1e6cf", COAT = "#161212";

const spark = (x, y, r, fill = GOLD_L, op = 1) =>
  `<path d="M${x} ${y - r}Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y}Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r}Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y}Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z" fill="${fill}" opacity="${op}"/>`;

let rays = "";
for (let i = 0; i < 40; i++) {
  const a = (i / 40) * Math.PI * 2, a2 = ((i + 0.5) / 40) * Math.PI * 2;
  if (i % 2) continue;
  const cx = CX, cy = 470, r = 1100;
  rays += `<path d="M${cx} ${cy}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}L${(cx + Math.cos(a2) * r).toFixed(1)} ${(cy + Math.sin(a2) * r).toFixed(1)}Z" fill="${GOLD_L}" opacity=".08"/>`;
}


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <radialGradient id="bg" cx=".5" cy=".38" r=".85"><stop offset="0" stop-color="${RED}"/><stop offset=".55" stop-color="${RED_D}"/><stop offset="1" stop-color="${INK}"/></radialGradient>
  <radialGradient id="spot" cx=".5" cy=".4" r=".5"><stop offset="0" stop-color="${GOLD_L}" stop-opacity=".32"/><stop offset="1" stop-color="${GOLD_L}" stop-opacity="0"/></radialGradient>
  <radialGradient id="face" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="${SKIN}"/><stop offset="1" stop-color="${SKIN_S}"/></radialGradient>
  <clipPath id="shirt"><path d="M325 740 L475 740 L400 1010 Z"/></clipPath>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000" flood-opacity=".45"/></filter>
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .9 0 0 0 0 .75 0 0 0 .1 0"/></filter>
</defs>

<rect width="${W}" height="${H}" fill="url(#bg)"/>
${rays}
<ellipse cx="${CX}" cy="470" rx="360" ry="440" fill="url(#spot)"/>

<g filter="url(#shadow)">
  <!-- Habit de magicien -->
  <path d="M90 1100 C110 900 190 790 320 750 L400 800 L480 750 C610 790 690 900 710 1100 Z" fill="${COAT}"/>
  <!-- Chemise blanche : plastron plissé et boutons dorés -->
  <path d="M325 740 L475 740 L400 1010 Z" fill="#fbf7ee"/>
  <g clip-path="url(#shirt)">
    <path d="M372 780 L388 1010 M428 780 L412 1010" stroke="#d8cfc0" stroke-width="2.5"/>
    <circle cx="400" cy="830" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="400" cy="885" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="400" cy="940" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
  </g>
  <!-- Revers à liseré doré -->
  <path d="M320 750 L400 1010 L352 1010 L262 790 Z" fill="#221a18" stroke="${GOLD}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M480 750 L400 1010 L448 1010 L538 790 Z" fill="#221a18" stroke="${GOLD}" stroke-width="3" stroke-linejoin="round"/>
  <!-- Nœud papillon -->
  <path d="M400 760 L340 732 L340 796 Z M400 760 L460 732 L460 796 Z" fill="${RED}" stroke="${GOLD}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="400" cy="762" r="14" fill="${GOLD}"/>

  <!-- Cou -->
  <path d="M352 650 L448 650 L452 742 Q400 770 348 742 Z" fill="${SKIN_S}"/>

  <!-- Oreilles -->
  <ellipse cx="253" cy="548" rx="24" ry="42" fill="${SKIN_S}"/>
  <ellipse cx="547" cy="548" rx="24" ry="42" fill="${SKIN_S}"/>

  <!-- Visage -->
  <path d="M400 350 C505 350 555 420 555 525 C555 640 490 712 400 712 C310 712 245 640 245 525 C245 420 295 350 400 350 Z" fill="url(#face)"/>

  <!-- Cheveux courts aux tempes, sous le chapeau -->
  <path d="M252 452 C250 400 280 372 318 362 L300 420 C286 440 270 470 262 510 Z" fill="${HAIR}"/>
  <path d="M548 452 C550 400 520 372 482 362 L500 420 C514 440 530 470 538 510 Z" fill="${HAIR}"/>

  <!-- Sourcils -->
  <path d="M296 466 Q336 446 378 462" fill="none" stroke="${HAIR_D}" stroke-width="9" stroke-linecap="round"/>
  <path d="M422 462 Q464 446 504 466" fill="none" stroke="${HAIR_D}" stroke-width="9" stroke-linecap="round"/>

  <!-- Yeux souriants -->
  <path d="M320 520 Q338 506 356 520" fill="none" stroke="#3a2a20" stroke-width="7" stroke-linecap="round"/>
  <path d="M444 520 Q462 506 480 520" fill="none" stroke="#3a2a20" stroke-width="7" stroke-linecap="round"/>

  <!-- Lunettes rectangulaires foncées -->
  <rect x="284" y="482" width="104" height="66" rx="14" fill="${GOLD_L}" fill-opacity=".08" stroke="#2a2522" stroke-width="10"/>
  <rect x="412" y="482" width="104" height="66" rx="14" fill="${GOLD_L}" fill-opacity=".08" stroke="#2a2522" stroke-width="10"/>
  <path d="M388 506 Q400 496 412 506" fill="none" stroke="#2a2522" stroke-width="8"/>
  <path d="M284 500 L252 512 M516 500 L548 512" stroke="#2a2522" stroke-width="8" stroke-linecap="round"/>

  <!-- Nez -->
  <path d="M402 548 Q386 598 392 608 Q404 616 418 606" fill="none" stroke="${SKIN_S}" stroke-width="7" stroke-linecap="round"/>

  <!-- Sourire -->
  <path d="M338 636 Q400 692 462 636 Q400 660 338 636 Z" fill="#6b2323"/>
  <path d="M348 640 Q400 664 452 640 Q400 652 348 640 Z" fill="#fbf4ea"/>
  <path d="M336 634 Q400 700 464 634" fill="none" stroke="#b77c62" stroke-width="4" stroke-linecap="round"/>

  <!-- Joues -->
  <ellipse cx="300" cy="600" rx="30" ry="18" fill="#e79a86" opacity=".35"/>
  <ellipse cx="500" cy="600" rx="30" ry="18" fill="#e79a86" opacity=".35"/>

  <!-- Haut-de-forme légèrement incliné -->
  <g transform="rotate(-6 400 370)">
    <rect x="272" y="120" width="256" height="238" rx="14" fill="${COAT}" stroke="${GOLD}" stroke-width="3"/>
    <rect x="272" y="300" width="256" height="40" fill="${RED}"/>
    <path d="M272 300 H528 M272 340 H528" stroke="${GOLD}" stroke-width="3"/>
    <ellipse cx="400" cy="368" rx="212" ry="36" fill="${COAT}" stroke="${GOLD}" stroke-width="3"/>
  </g>

</g>

${spark(150, 260, 22, GOLD_L, 0.75)}${spark(660, 190, 14, GOLD_L, 0.6)}${spark(120, 520, 10, GOLD_L, 0.5)}

<rect width="${W}" height="${H}" filter="url(#n)"/>
</svg>`;

writeFileSync("public/img/portrait.svg", svg);
console.log("public/img/portrait.svg généré");
