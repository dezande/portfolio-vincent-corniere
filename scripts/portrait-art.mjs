/**
 * Portrait de l'accueil : Vincent en magicien, affiche d'inspiration Art nouveau et Art déco.
 *  - Art nouveau : médaillon circulaire perlé derrière la tête, tiges en coup de fouet,
 *    feuilles et fleurs stylisées.
 *  - Art déco : visage au trait fin et symétrique, haut-de-forme géométrique à chevrons,
 *    revers et nœud papillon anguleux, étoile rayonnante au bout de la baguette.
 * Composition et dessin originaux. Traits de Vincent : cheveux gris-blanc tirés en arrière
 * en longue queue de cheval, lunettes rondes fines, barbe courte poivre et sel, anneau à
 * l'oreille, expression calme. Chemise blanche de soirée.
 * Usage : node scripts/portrait-art.mjs  → public/img/portrait.svg
 */
import { writeFileSync } from "node:fs";

const W = 800, H = 1100, CX = 400, HY = 470; // HY : centre du médaillon
const INK = "#1b1511", GOLD = "#c9a24a", GOLD_L = "#e9d18f", CREAM = "#f3e6cc", PAPER = "#efe0bf";
const RED = "#9b1c1c", RED_D = "#5e0f10", PEACOCK = "#1f5c57", PEACOCK_D = "#123a37";
const SKIN = "#f4e2c4", HAIR = "#ebe7df", HAIR_S = "#c3bcb0", HAIR_D = "#8f877a", NAVY = "#1f2b45";
const BEARD = "#cfc0ab", BEARD_D = "#9a8a74";

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


<!-- Cheveux gris-blanc tirés en arrière : masse visible derrière les oreilles -->
<g>
  <path d="M302 372 C252 392 228 450 226 540 C224 620 216 690 198 742 C232 738 262 718 280 692 C272 640 268 580 272 520 C276 470 288 420 302 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M498 372 C548 392 572 450 574 540 C576 620 584 690 602 742 C568 738 538 718 520 692 C528 640 532 580 528 520 C524 470 512 420 498 372 Z" fill="${HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M258 430 C244 490 242 570 246 640 C248 680 240 706 226 726 M542 430 C556 490 558 570 554 640 C552 680 560 706 574 726" fill="none" stroke="${HAIR_S}" stroke-width="3" stroke-linecap="round"/>
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


<!-- Longue queue de cheval qui retombe sur l'épaule, en coup de fouet -->
<path d="M506 660 C550 706 576 766 574 836 C572 890 590 930 620 960 C592 964 560 942 546 908 C530 866 532 806 516 756 C508 726 498 698 490 676 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M512 690 C540 736 556 790 554 846 C554 884 566 916 590 944 M500 700 C520 750 530 800 530 850" fill="none" stroke="${HAIR_S}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M494 676 L522 652 L534 668 L506 692 Z" fill="${GOLD}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

<!-- Cou -->
<path d="M360 672 L440 672 L446 770 L400 790 L354 770 Z" fill="${SKIN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
<path d="M372 740 Q400 756 428 740" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>

<!-- Oreilles -->
<path d="M268 500 C244 494 238 552 262 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>
<path d="M532 500 C556 494 562 552 538 576" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>

<!-- Visage au trait -->
<path d="M400 356 C486 356 534 414 534 508 C534 606 482 700 400 700 C318 700 266 606 266 508 C266 414 314 356 400 356 Z" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>

<!-- Tempes : cheveux tirés vers l'arrière, front dégagé -->
<path d="M312 374 C290 392 276 420 270 466 C282 440 298 420 318 406 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
<path d="M488 374 C510 392 524 420 530 466 C518 440 502 420 482 406 Z" fill="${HAIR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>

<!-- Anneau à l'oreille gauche -->
<circle cx="258" cy="588" r="11" fill="none" stroke="${GOLD}" stroke-width="4"/>
<circle cx="258" cy="588" r="11" fill="none" stroke="${INK}" stroke-width="1" opacity=".6"/>

<!-- Sourcils -->
<path d="M306 462 C330 448 356 448 378 458" fill="none" stroke="${BEARD_D}" stroke-width="6" stroke-linecap="round"/>
<path d="M422 458 C444 448 470 448 494 462" fill="none" stroke="${BEARD_D}" stroke-width="6" stroke-linecap="round"/>

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

<!-- Barbe courte poivre et sel -->
<path d="M270 556 C272 640 322 714 400 718 C478 714 528 640 530 556 C514 598 484 624 456 628 C444 674 356 674 344 628 C316 624 286 598 270 556 Z" fill="${BEARD}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" opacity=".95"/>
<clipPath id="beardClip"><path d="M270 556 C272 640 322 714 400 718 C478 714 528 640 530 556 C514 598 484 624 456 628 C444 674 356 674 344 628 C316 624 286 598 270 556 Z"/></clipPath>
<g clip-path="url(#beardClip)"><path d="M527.5 598.3 l-3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M349.3 701.2 l3 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M505.1 675.4 l2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M269.6 651.8 l1 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M411.5 698.4 l0 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M538.5 633.2 l-1 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M321.7 676.2 l-2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M465.0 678.6 l-3 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M263.7 619.4 l3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M377.3 683.0 l2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M503.7 646.3 l1 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M304.3 648.6 l0 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M428.6 673.5 l-1 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M524.3 607.3 l-2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M334.9 698.1 l-3 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M493.8 683.0 l3 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M259.9 643.1 l2 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M397.5 699.6 l1 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M531.6 643.0 l0 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M309.6 671.2 l-1 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M453.2 683.5 l-2 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M257.2 610.3 l-3 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M364.7 682.0 l3 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M495.4 653.8 l2 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M294.9 642.4 l1 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M417.2 676.0 l0 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M520.1 616.2 l-1 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M320.7 694.0 l-2 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M481.6 689.8 l-3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M251.0 633.7 l3 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M383.4 699.9 l2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M523.7 652.4 l1 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M298.0 665.4 l0 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M440.9 687.6 l-1 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M545.3 607.7 l-2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M352.2 680.0 l-3 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M486.3 660.8 l3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M286.1 635.5 l2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M405.6 677.7 l1 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M515.0 624.7 l0 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M330.5 656.3 l-1 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M468.7 695.9 l-2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M243.1 623.7 l-3 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M369.2 699.2 l3 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M514.8 661.2 l2 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M287.0 658.7 l1 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M428.2 690.9 l0 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M541.1 618.0 l-1 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M339.9 677.2 l-2 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M476.5 667.2 l-3 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M278.0 628.0 l3 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M393.7 678.6 l2 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M509.0 633.0 l1 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M320.4 652.0 l0 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M455.2 701.0 l-1 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M236.2 613.0 l-2 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M355.0 697.6 l-3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M504.9 669.5 l3 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M276.6 651.3 l2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M415.0 693.4 l1 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M535.7 627.9 l0 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M327.8 673.5 l-1 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M466.0 672.9 l-2 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M270.6 619.9 l-3 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M381.6 678.7 l3 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M502.1 640.9 l2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M310.7 646.9 l1 8" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M441.1 705.2 l0 9" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M562.6 618.0 l-1 6" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M341.0 694.9 l-2 7" stroke="${BEARD_D}" stroke-width="2" stroke-linecap="round" opacity=".55"/></g>
<!-- Moustache -->
<path d="M344 628 C364 610 388 610 400 620 C412 610 436 610 456 628 C434 638 412 636 400 630 C388 636 366 638 344 628 Z" fill="${BEARD_D}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
<!-- Bouche calme -->
<path d="M374 648 C390 656 410 656 426 648" fill="none" stroke="#b07a62" stroke-width="5" stroke-linecap="round"/>
<path d="M366 642 C388 650 412 650 434 642" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>

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
