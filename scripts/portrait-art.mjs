/**
 * Portrait de l'accueil : Vincent en magicien, affiche d'inspiration Art nouveau et Art déco.
 *  - Art nouveau : médaillon circulaire perlé derrière la tête, tiges en coup de fouet,
 *    feuilles et fleurs stylisées.
 *  - Art déco : visage au trait fin et symétrique, revers et nœud papillon anguleux,
 *    étoile rayonnante au bout de la baguette.
 * Composition et dessin originaux. Traits de Vincent : cheveux gris-blanc attachés en arrière, lunettes rondes fines, visage rasé, anneau à
 * l'oreille, expression calme. Chemise blanche de soirée.
 * Usage : node scripts/portrait-art.mjs  → public/img/portrait.svg
 */
import { writeFileSync } from "node:fs";

const W = 800, H = 1100, CX = 400, HY = 470; // HY : centre du médaillon
const INK = "#1b1511", GOLD = "#c9a24a", GOLD_L = "#e9d18f", CREAM = "#f3e6cc", PAPER = "#efe0bf";
const RED = "#9b1c1c", RED_D = "#5e0f10", PEACOCK = "#1f5c57", PEACOCK_D = "#123a37";
const SKIN = "#f4e2c4", HAIR = "#ebe7df", HAIR_S = "#c3bcb0", HAIR_D = "#8f877a", NAVY = "#1f2b45";
const BROW = "#9a8a74";

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


<!-- Cheveux attachés en arrière : plaqués derrière les oreilles, queue de cheval derrière la nuque -->
<g>
  <path d="M304 378 C272 398 252 438 248 498 C246 540 252 572 266 596 C276 562 280 522 286 482 C290 444 296 412 304 378 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M496 378 C528 398 548 438 552 498 C554 540 548 572 534 596 C524 562 520 522 514 482 C510 444 504 412 496 378 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M452 648 C486 676 508 722 514 792 L474 800 C472 748 462 700 440 664 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M458 670 C480 700 494 740 496 790" fill="none" stroke="${HAIR_S}" stroke-width="2.5" stroke-linecap="round"/>
</g>

<!-- Habit : épaules et revers anguleux -->
<path d="M110 1100 L150 900 C180 820 260 790 332 772 L400 830 L468 772 C540 790 620 820 650 900 L690 1100 Z" fill="${INK}"/>
<!-- Chemise blanche : plastron plissé, boutons dorés, col cassé -->
<path d="M332 772 L468 772 L400 1030 Z" fill="#fbf7ee"/>
<g clip-path="url(#shirt)">
  <path d="M372 800 L386 1030 M428 800 L414 1030 M352 790 L372 1030 M448 790 L428 1030" stroke="${HAIR_S}" stroke-width="2" opacity=".7"/>
  <path d="M400 806 L400 1030" stroke="${HAIR_S}" stroke-width="2.5"/>
  <circle cx="400" cy="846" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
  <circle cx="400" cy="900" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
  <circle cx="400" cy="954" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
</g>
<path d="M356 770 L380 790 L352 806 Z M444 770 L420 790 L448 806 Z" fill="#fbf7ee" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M332 772 L400 1030 L346 1030 L262 812 Z" fill="#241c19" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M468 772 L400 1030 L454 1030 L538 812 Z" fill="#241c19" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M262 812 L300 880 M538 812 L500 880" stroke="${GOLD}" stroke-width="2"/>
<!-- Nœud papillon géométrique -->
<path d="M400 790 L336 760 L336 820 Z M400 790 L464 760 L464 820 Z" fill="${RED}" stroke="${GOLD}" stroke-width="3" stroke-linejoin="miter"/>
<path d="M400 774 L416 790 L400 806 L384 790 Z" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>


<!-- Cou -->
<path d="M360 672 L440 672 L446 770 L400 790 L354 770 Z" fill="${SKIN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
<path d="M372 740 Q400 756 428 740" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>

<!-- Oreilles -->
<path d="M268 500 C244 494 238 552 262 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>
<path d="M532 500 C556 494 562 552 538 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>

<!-- Visage au trait -->
<!-- Cheveux tirés en arrière, visibles sur les côtés du crâne ; dessus dégarni -->
<path d="M270 530 C256 470 262 420 290 382 C302 368 316 360 330 356 C306 396 290 446 286 530 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M530 530 C544 470 538 420 510 382 C498 368 484 360 470 356 C494 396 510 446 514 530 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M400 326 C492 326 536 404 534 508 C534 606 482 700 400 700 C318 700 266 606 266 508 C264 404 308 326 400 326 Z" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>

<!-- Quelques fins cheveux gris sur le dessus du crâne, tirés vers l'arrière -->
<path d="M332 348 C366 334 434 334 468 348 M348 338 C380 328 420 328 452 338 M300 400 C308 380 318 366 332 356 M500 400 C492 380 482 366 468 356" fill="none" stroke="${HAIR_S}" stroke-width="2" stroke-linecap="round" opacity=".75"/>

<!-- Anneau à l'oreille gauche -->
<circle cx="258" cy="588" r="11" fill="none" stroke="${GOLD}" stroke-width="4"/>
<circle cx="258" cy="588" r="11" fill="none" stroke="${INK}" stroke-width="1" opacity=".6"/>

<!-- Sourcils -->
<path d="M306 462 C330 448 356 448 378 458" fill="none" stroke="${BROW}" stroke-width="6" stroke-linecap="round"/>
<path d="M422 458 C444 448 470 448 494 462" fill="none" stroke="${BROW}" stroke-width="6" stroke-linecap="round"/>

<!-- Yeux en amande -->
<path d="M316 506 C330 492 352 492 366 506 C352 516 330 516 316 506 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
<path d="M434 506 C448 492 470 492 484 506 C470 516 448 516 434 506 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
<circle cx="341" cy="505" r="7" fill="${INK}"/><circle cx="459" cy="505" r="7" fill="${INK}"/>
<circle cx="343.5" cy="502.5" r="2" fill="${CREAM}"/><circle cx="461.5" cy="502.5" r="2" fill="${CREAM}"/>

<!-- Lunettes rondes à monture fine -->
<circle cx="341" cy="506" r="47" fill="none" stroke="${INK}" stroke-width="5"/>
<circle cx="459" cy="506" r="47" fill="none" stroke="${INK}" stroke-width="5"/>
<circle cx="341" cy="506" r="42" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".8"/>
<circle cx="459" cy="506" r="42" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".8"/>
<path d="M388 498 Q400 488 412 498" fill="none" stroke="${GOLD}" stroke-width="4"/>
<path d="M294 500 L268 510 M506 500 L532 510" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>

<!-- Nez : une ligne -->
<path d="M404 528 C396 566 388 590 396 600 C404 606 414 604 420 598" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>

<!-- Bouche calme, visage rasé -->
<path d="M358 640 C380 654 420 654 442 640" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
<path d="M378 664 C392 672 408 672 422 664" fill="none" stroke="#b07a62" stroke-width="4" stroke-linecap="round"/>
<path d="M352 634 Q355 641 360 644 M448 634 Q445 641 440 644" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>

<!-- Baguette et étoile déco -->
<path d="M560 1090 L690 880" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
<path d="M560 1090 L690 880" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
<path d="M674 906 L690 880" stroke="${CREAM}" stroke-width="16" stroke-linecap="round"/>
${decoStar(706, 852, 46)}

<rect width="${W}" height="${H}" filter="url(#n)"/>
</svg>`;

writeFileSync("public/img/portrait.svg", svg);
console.log("public/img/portrait.svg généré");
