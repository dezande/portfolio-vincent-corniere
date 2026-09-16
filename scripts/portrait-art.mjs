/**
 * Portrait de l'accueil : Vincent en magicien, affiche d'inspiration Art nouveau et Art déco.
 *  - Art nouveau : médaillon circulaire perlé derrière la tête, tiges en coup de fouet,
 *    feuilles et fleurs stylisées.
 *  - Art déco : visage au trait fin et symétrique, haut-de-forme géométrique à chevrons,
 *    revers et nœud papillon anguleux, étoile rayonnante au bout de la baguette.
 * Composition et dessin originaux. Traits de Vincent : longs cheveux blancs,
 * lunettes rectangulaires, léger sourire, marinière.
 * Usage : node scripts/portrait-art.mjs  → public/img/portrait.svg
 */
import { writeFileSync } from "node:fs";

const W = 800, H = 1100, CX = 400, HY = 470; // HY : centre du médaillon
const INK = "#1b1511", GOLD = "#c9a24a", GOLD_L = "#e9d18f", CREAM = "#f3e6cc", PAPER = "#efe0bf";
const RED = "#9b1c1c", RED_D = "#5e0f10", PEACOCK = "#1f5c57", PEACOCK_D = "#123a37";
const SKIN = "#f4e2c4", HAIR = "#f5f2ec", HAIR_S = "#d6cfc2", HAIR_D = "#a89f90", NAVY = "#1f2b45";

const f = (n) => n.toFixed(1);
const polar = (r, deg, cx = CX, cy = HY) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];

// --- Fond : rayons déco fins -------------------------------------------------------
let rays = "";
for (let i = 0; i < 72; i++) {
  const [x1, y1] = polar(280, i * 5), [x2, y2] = polar(i % 2 ? 900 : 1300, i * 5);
  rays += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${GOLD}" stroke-width="${i % 2 ? 1.5 : 3}" opacity="${i % 2 ? 0.14 : 0.22}"/>`;
}

// --- Médaillon Art nouveau : anneaux, perles, éventail intérieur -------------------
let beads = "";
for (let i = 0; i < 60; i++) {
  const [x, y] = polar(246, i * 6);
  beads += `<circle cx="${f(x)}" cy="${f(y)}" r="${i % 5 === 0 ? 6 : 3.5}" fill="${i % 5 === 0 ? RED : GOLD}"/>`;
}
let fan = "";
for (let i = 0; i < 48; i++) {
  const [x1, y1] = polar(120, i * 7.5), [x2, y2] = polar(224, i * 7.5);
  fan += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${GOLD}" stroke-width="2" opacity=".45"/>`;
}

// --- Tiges en coup de fouet, feuilles et fleurs (miroir gauche/droite) --------------
const leaf = (x, y, rot, s = 1) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C18 -30 58 -34 84 -8 C58 12 22 16 0 0 Z" fill="${PEACOCK}" stroke="${GOLD}" stroke-width="2"/><path d="M4 -1 C30 -10 56 -12 80 -8" fill="none" stroke="${GOLD_L}" stroke-width="1.5" opacity=".8"/></g>`;
const flower = (x, y, s = 1) => {
  let petals = "";
  for (let i = 0; i < 5; i++) {
    petals += `<path d="M0 0 C-16 -18 -14 -48 0 -58 C14 -48 16 -18 0 0 Z" fill="${RED}" stroke="${GOLD}" stroke-width="2" transform="rotate(${i * 72 - 90 + 90})"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${petals}<circle r="13" fill="${GOLD}" stroke="${INK}" stroke-width="2"/><circle r="5" fill="${INK}"/></g>`;
};
const tendrils = (mirror) => {
  const g = `
    <path d="M-10 1100 C60 980 20 880 110 800 C190 730 170 640 120 610 C90 592 70 620 92 640" fill="none" stroke="${PEACOCK_D}" stroke-width="16" stroke-linecap="round"/>
    <path d="M-10 1100 C60 980 20 880 110 800 C190 730 170 640 120 610 C90 592 70 620 92 640" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 1100 C110 1010 140 950 210 910 C260 882 250 840 222 836" fill="none" stroke="${PEACOCK_D}" stroke-width="10" stroke-linecap="round"/>
    <path d="M40 1100 C110 1010 140 950 210 910 C260 882 250 840 222 836" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round"/>
    ${leaf(70, 930, -60, 1)}${leaf(130, 780, -110, 0.9)}${leaf(150, 960, -20, 0.8)}
    ${flower(118, 606, 0.9)}${flower(222, 832, 0.55)}`;
  return mirror ? `<g transform="translate(${W} 0) scale(-1 1)">${g}</g>` : `<g>${g}</g>`;
};

// --- Marinière géométrique -------------------------------------------------------------
let stripes = "";
for (let y = 780; y < 1100; y += 28) stripes += `<rect x="300" y="${y}" width="200" height="14" fill="${NAVY}"/>`;

// --- Chevrons du bandeau du chapeau ---------------------------------------------------
let chevrons = "";
for (let x = 286; x < 516; x += 34) chevrons += `<path d="M${x} 316 L${x + 17} 300 L${x + 34} 316" fill="none" stroke="${GOLD}" stroke-width="3"/>`;

// --- Étoile déco de la baguette ---------------------------------------------------------
const decoStar = (x, y, r) => {
  let spikes = "";
  for (let i = 0; i < 16; i++) {
    const len = i % 2 ? r * 0.45 : r;
    const [x2, y2] = polar(len, i * 22.5, x, y);
    spikes += `<line x1="${x}" y1="${y}" x2="${f(x2)}" y2="${f(y2)}" stroke="${GOLD_L}" stroke-width="${i % 2 ? 2 : 3.5}" stroke-linecap="round"/>`;
  }
  return `${spikes}<path d="M${x} ${y - r * 0.5}L${x + r * 0.16} ${y - r * 0.16}L${x + r * 0.5} ${y}L${x + r * 0.16} ${y + r * 0.16}L${x} ${y + r * 0.5}L${x - r * 0.16} ${y + r * 0.16}L${x - r * 0.5} ${y}L${x - r * 0.16} ${y - r * 0.16}Z" fill="${GOLD_L}" stroke="${INK}" stroke-width="2"/>`;
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <radialGradient id="bg" cx=".5" cy=".42" r=".85"><stop offset="0" stop-color="${RED}"/><stop offset=".6" stop-color="${RED_D}"/><stop offset="1" stop-color="#1a0a08"/></radialGradient>
  <radialGradient id="halo" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${CREAM}"/><stop offset="1" stop-color="${PAPER}"/></radialGradient>
  <clipPath id="shirt"><path d="M332 772 L468 772 L400 1030 Z"/></clipPath>
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .9 0 0 0 0 .75 0 0 0 .1 0"/></filter>
</defs>

<rect width="${W}" height="${H}" fill="url(#bg)"/>
${rays}

<!-- Médaillon -->
<circle cx="${CX}" cy="${HY}" r="262" fill="none" stroke="${GOLD}" stroke-width="3"/>
<circle cx="${CX}" cy="${HY}" r="254" fill="url(#halo)" stroke="${INK}" stroke-width="3"/>
${beads}
<circle cx="${CX}" cy="${HY}" r="234" fill="none" stroke="${INK}" stroke-width="2"/>
<circle cx="${CX}" cy="${HY}" r="226" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
${fan}

${tendrils(false)}
${tendrils(true)}


<!-- Longue chevelure blanche : masse arrière, ondulations Art nouveau -->
<g>
  <path d="M312 372 C240 396 206 470 208 570 C210 670 188 760 132 868 C196 872 252 846 292 800 C322 764 330 714 320 660 C310 610 300 520 312 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M488 372 C560 396 594 470 592 570 C590 670 612 760 668 868 C604 872 548 846 508 800 C478 764 470 714 480 660 C490 610 500 520 488 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M262 420 C236 480 232 560 240 640 C248 720 222 790 180 850 M290 470 C270 540 272 620 282 700 C288 750 270 790 246 826" fill="none" stroke="${HAIR_S}" stroke-width="3" stroke-linecap="round"/>
  <path d="M538 420 C564 480 568 560 560 640 C552 720 578 790 620 850 M510 470 C530 540 528 620 518 700 C512 750 530 790 554 826" fill="none" stroke="${HAIR_S}" stroke-width="3" stroke-linecap="round"/>
</g>

<!-- Habit : épaules et revers anguleux -->
<path d="M110 1100 L150 900 C180 820 260 790 332 772 L400 830 L468 772 C540 790 620 820 650 900 L690 1100 Z" fill="${INK}"/>
<path d="M332 772 L468 772 L400 1030 Z" fill="${CREAM}"/>
<g clip-path="url(#shirt)">${stripes}</g>
<path d="M332 772 L400 1030 L346 1030 L262 812 Z" fill="#241c19" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M468 772 L400 1030 L454 1030 L538 812 Z" fill="#241c19" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M262 812 L300 880 M538 812 L500 880" stroke="${GOLD}" stroke-width="2"/>
<!-- Nœud papillon géométrique -->
<path d="M400 790 L336 760 L336 820 Z M400 790 L464 760 L464 820 Z" fill="${RED}" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M400 774 L416 790 L400 806 L384 790 Z" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>


<!-- Mèches qui retombent sur les épaules, devant l'habit -->
<path d="M244 700 C256 770 238 830 200 884 C190 898 186 914 196 920 C204 904 222 890 238 868 C264 830 280 780 274 720 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M556 700 C544 770 562 830 600 884 C610 898 614 914 604 920 C596 904 578 890 562 868 C536 830 520 780 526 720 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M256 740 C258 790 246 836 222 876 M544 740 C542 790 554 836 578 876" fill="none" stroke="${HAIR_S}" stroke-width="2.5" stroke-linecap="round"/>

<!-- Cou -->
<path d="M360 672 L440 672 L446 770 L400 790 L354 770 Z" fill="${SKIN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
<path d="M372 740 Q400 756 428 740" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>

<!-- Oreilles -->
<path d="M268 500 C244 494 238 552 262 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>
<path d="M532 500 C556 494 562 552 538 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>

<!-- Visage au trait -->
<path d="M400 356 C486 356 534 414 534 508 C534 606 482 700 400 700 C318 700 266 606 266 508 C266 414 314 356 400 356 Z" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>

<!-- Mèches blanches qui encadrent le visage -->
<path d="M318 372 C282 400 266 450 268 520 C272 470 292 430 330 404 C322 392 320 382 318 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M482 372 C518 400 534 450 532 520 C528 470 508 430 470 404 C478 392 480 382 482 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>

<!-- Sourcils -->
<path d="M306 462 C330 448 356 448 378 458" fill="none" stroke="${HAIR_D}" stroke-width="6.5" stroke-linecap="round"/>
<path d="M422 458 C444 448 470 448 494 462" fill="none" stroke="${HAIR_D}" stroke-width="6" stroke-linecap="round"/>

<!-- Yeux en amande -->
<path d="M316 506 C330 492 352 492 366 506 C352 516 330 516 316 506 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
<path d="M434 506 C448 492 470 492 484 506 C470 516 448 516 434 506 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
<circle cx="341" cy="505" r="7" fill="${INK}"/><circle cx="459" cy="505" r="7" fill="${INK}"/>
<circle cx="343.5" cy="502.5" r="2" fill="${CREAM}"/><circle cx="461.5" cy="502.5" r="2" fill="${CREAM}"/>

<!-- Lunettes rectangulaires fines -->
<rect x="296" y="478" width="94" height="60" rx="12" fill="none" stroke="${INK}" stroke-width="6"/>
<rect x="410" y="478" width="94" height="60" rx="12" fill="none" stroke="${INK}" stroke-width="6"/>
<rect x="301" y="483" width="84" height="50" rx="8" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".8"/>
<rect x="415" y="483" width="84" height="50" rx="8" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".8"/>
<path d="M390 500 Q400 492 410 500" fill="none" stroke="${INK}" stroke-width="5"/>
<path d="M296 494 L268 504 M504 494 L532 504" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>

<!-- Nez : une ligne -->
<path d="M404 528 C396 566 388 590 396 600 C404 606 414 604 420 598" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>

<!-- Léger sourire -->
<path d="M352 640 C378 662 422 662 448 640" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M376 668 C392 676 408 676 424 668" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>
<path d="M346 632 Q349 640 354 644 M454 632 Q451 640 446 644" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>

<!-- Haut-de-forme géométrique -->
<g transform="rotate(-4 400 368)">
  <path d="M288 120 L512 120 L524 360 L276 360 Z" fill="${INK}" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
  <path d="M310 136 L318 344 M490 136 L482 344" stroke="${GOLD}" stroke-width="1.5" opacity=".5"/>
  <rect x="279" y="292" width="242" height="34" fill="${RED}" stroke="${GOLD}" stroke-width="2.5"/>
  ${chevrons}
  <path d="M184 372 C240 350 560 350 616 372 C560 392 240 392 184 372 Z" fill="${INK}" stroke="${GOLD}" stroke-width="3"/>
</g>

<!-- Baguette et étoile déco -->
<path d="M560 1090 L690 880" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
<path d="M560 1090 L690 880" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
<path d="M674 906 L690 880" stroke="${CREAM}" stroke-width="16" stroke-linecap="round"/>
${decoStar(706, 852, 46)}

<rect width="${W}" height="${H}" filter="url(#n)"/>
</svg>`;

writeFileSync("public/img/portrait.svg", svg);
console.log("public/img/portrait.svg généré");
