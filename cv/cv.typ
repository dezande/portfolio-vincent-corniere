// ============================================================================
//  CV de Vincent Cornière
//  Structure du CV d'origine (une colonne, lecture linéaire, sections soulignées,
//  projets détaillés par entreprise) habillée de la direction artistique du
//  portfolio (Art déco), pensée pour l'impression : fond blanc, aucun aplat,
//  filets fins, lisible en noir et blanc.
//
//  Données : data.json, extrait du site par scripts/export-data.mjs.
//  Génération : npm run cv (ou cv/build.sh)
// ============================================================================

#let d = json("data.json")

// --- Palette -----------------------------------------------------------------
// Or sombre et rouge profond, choisis pour rester lisibles si le PDF est imprimé
// en noir et blanc (or ≈ 40 % de gris, rouge ≈ 80 %).
#let ink = rgb("#1b1511")
#let gold = rgb("#8a6420")
#let red = rgb("#7c1a1a")
#let muted = rgb("#4a3f35")

#let f-display = "Cinzel Decorative"
#let f-title = "Cinzel"
#let f-body = "EB Garamond"

// --- Icônes du site (exportées en SVG dans data.json) --------------------------
#let icon(name, size: 11pt, color: gold) = box(baseline: 18%, image(
  bytes(d.icons.at(name).replace("currentColor", color.to-hex())),
  format: "svg",
  height: size,
))

// Médaillon d'icône : cercle fin, icône au centre
#let medal(name, size: 22pt) = box(baseline: 30%, width: size, height: size, {
  place(center + horizon, circle(radius: size / 2, stroke: 0.6pt + gold))
  place(center + horizon, icon(name, size: size * 0.56))
})

// Ligne précédée d'une icône, texte aligné sur la même marge que les listes
#let icon-line(name, body, size: 12.5pt) = grid(
  columns: (size + 5pt, 1fr),
  align: (center + top, left + top),
  pad(top: 1.5pt, icon(name, size: size)),
  body,
)

// Icône de chaque ligne de compétences (présentation uniquement ; le contenu vient du site)
#let skill-icons = (
  "Langages": "mi-Quill",
  "Back-end": "mi-Wand",
  "Front-end": "mi-Cards",
  "Protocoles SSO": "mi-OrnateKey",
  "Bases de données": "mi-Trunk",
  "API tierces": "mi-Envelope",
  "Infrastructure": "mi-DecoCloud",
  "Serveurs web": "mi-Theatre",
  "Outils": "mi-Scarab",
  "Méthodes": "mi-Scroll",
)

// --- Ornements (traits fins, très peu d'encre) -------------------------------
#let star(r: 3pt, fill: gold) = box(width: 2 * r, height: 2 * r, baseline: 15%, place(dx: r, dy: r, polygon(
  fill: fill,
  (0pt, -r), (0.22 * r, -0.22 * r), (r, 0pt), (0.22 * r, 0.22 * r),
  (0pt, r), (-0.22 * r, 0.22 * r), (-r, 0pt), (-0.22 * r, -0.22 * r),
)))

#let diamond(r: 2.4pt, fill: gold) = box(width: 2 * r, height: 2 * r, baseline: 20%, place(dx: r, dy: r, polygon(
  fill: fill, (0pt, -r), (r, 0pt), (0pt, r), (-r, 0pt),
)))

#let divider(width: 70mm) = align(center, box(width: width, grid(
  columns: (1fr, auto, auto, auto, 1fr),
  align: horizon,
  column-gutter: 3pt,
  line(length: 100%, stroke: 0.4pt + gold),
  circle(radius: 1.2pt, stroke: 0.4pt + gold),
  diamond(),
  circle(radius: 1.2pt, stroke: 0.4pt + gold),
  line(length: 100%, stroke: 0.4pt + gold),
)))

// Titre de section à la manière du CV d'origine : capitales, puis filet pleine largeur
#let section(title, icon-name: none) = block(above: 28pt, below: 14pt, sticky: true, {
  if icon-name != none { medal(icon-name, size: 30pt); h(10pt) }
  text(font: f-title, weight: 700, size: 18pt, tracking: 1.4pt, fill: ink, upper(title))
  v(-4pt)
  grid(
    columns: (1fr, auto, 1fr),
    align: horizon,
    column-gutter: 4pt,
    line(length: 100%, stroke: 0.6pt + gold),
    diamond(r: 2pt),
    line(length: 100%, stroke: 0.25pt + gold),
  )
})

#let label(body, size: 8.8pt) = text(font: f-title, weight: 700, size: size, tracking: 1.2pt, fill: gold, upper(body))

// --- Page : double filet et losanges d'angle -------------------------------
#let frame = {
  let o = 8mm
  let i = 9.6mm
  place(top + left, dx: o, dy: o, rect(width: 100% - 2 * o, height: 100% - 2 * o, stroke: 0.7pt + gold))
  place(top + left, dx: i, dy: i, rect(width: 100% - 2 * i, height: 100% - 2 * i, stroke: 0.25pt + gold))
  for (x, y) in ((left, top), (right, top), (left, bottom), (right, bottom)) {
    place(x + y, dx: if x == left { o - 3pt } else { -o + 3pt }, dy: if y == top { o - 3pt } else { -o + 3pt }, diamond(r: 2.4pt))
  }
}

#set document(title: "CV — " + d.profile.fullName, author: d.profile.fullName)
#set page(
  paper: "a4",
  margin: (x: 20mm, top: 18mm, bottom: 20mm),
  background: frame,
  footer: context align(center, text(font: f-title, size: 8pt, tracking: 1.6pt, fill: gold)[
    #star(r: 2pt) #h(4pt) #upper(d.profile.fullName) #h(6pt) · #h(6pt) #counter(page).display() / #counter(page).final().first() #h(4pt) #star(r: 2pt)
  ]),
)
#set text(font: f-body, size: 12pt, fill: ink, lang: "fr", hyphenate: false)
#set par(justify: false, leading: 0.62em, spacing: 0.9em)
#set list(marker: star(r: 2.4pt), indent: 6pt, body-indent: 8pt, spacing: 0.6em)
#show link: it => it

// ============================================================================
//  En-tête — coordonnées en haut à gauche, grand titre centré
// ============================================================================
#let contact(name, body) = box[#icon(name, size: 12pt) #h(3pt) #body]
#let gap = h(16pt)

// Portrait du site en médaillon : cadré sur le visage et le chapeau, petit pour limiter l'encre.
// L'image est lue directement dans public/img/ : même portrait que la page d'accueil.
#let portrait-medal(size: 40mm) = {
  // Le portrait fait 800 × 1100 ; le visage est centré en (400, 531).
  // On cadre un carré de 700 centré sur lui : x 50–750, y 181–881.
  let scale = size / 700
  box(width: size + 8pt, height: size + 8pt, {
    place(center + horizon, circle(radius: size / 2 + 3.5pt, stroke: 0.8pt + gold))
    place(center + horizon, box(width: size, height: size, radius: size / 2, clip: true,
      place(top + left, dx: -50 * scale, dy: -181 * scale,
        image("../public/img/portrait.svg", width: 800 * scale, height: 1100 * scale))))
    place(center + horizon, circle(radius: size / 2 + 0.6pt, stroke: 0.3pt + gold))
  })
}

#align(center)[
  #portrait-medal()
  #v(4pt)
  #text(font: f-title, weight: 600, size: 12.5pt, tracking: 5pt, fill: gold)[#star(r: 2.8pt) #h(8pt) #upper(d.profile.fullName) #h(8pt) #star(r: 2.6pt)]
  #v(4pt)
  #text(font: f-display, weight: 900, size: 29pt, fill: ink)[#d.profile.roleLong.replace("-", "\u{2011}")]
  #v(-14pt)
  #text(font: f-display, weight: 700, size: 23pt, fill: red)[#d.profile.specialty]
  #v(4pt)
  #divider(width: 90mm)
  #v(6pt)
  #set text(size: 11pt, fill: muted)
  #let short(url) = url.replace("https://", "").replace("www.", "").trim("/", at: end)
  // Coordonnées en grille : deux colonnes alignées, centrées sous le titre
  #box(grid(
    columns: (auto, auto),
    column-gutter: 34pt,
    row-gutter: 8pt,
    align: left,
    contact("pin", d.profile.location),
    contact("mail", link("mailto:" + d.profile.email)[#d.profile.email]),
    contact("home", link(d.profile.website)[#short(d.profile.website)]),
    ..d.socials.map(so => contact(lower(so.label), link(so.url)[#short(so.url)])),
    contact("calendar", [Disponibilité : #d.profile.availability]),
  ))
]

// ============================================================================
//  Domaines d'intervention — liste à puces, sur deux colonnes
// ============================================================================
#section("Domaines d'intervention", icon-name: "briefcase")
// Une seule colonne : chaque domaine sur toute la largeur, titre gardé avec sa liste
#for (i, x) in d.expertise.enumerate() {
  block(sticky: true, above: if i == 0 { 0pt } else { 14pt }, below: 5pt)[
    #icon(x.icon, size: 14pt) #h(4pt) #text(font: f-title, weight: 700, size: 10.5pt, tracking: 0.8pt, fill: gold, upper(x.title))
  ]
  list(..x.items)
}

// ============================================================================
//  Compétences — « Libellé : valeurs », comme dans le CV d'origine
// ============================================================================
#section("Compétences", icon-name: "grid")
#stack(dir: ttb, spacing: 7pt, ..d.skillGroups.map(g => icon-line(skill-icons.at(g.k, default: "mi-Cog"),
  [#text(font: f-title, weight: 700, size: 11pt)[#g.k :] #h(2pt) #text(size: 12pt)[#g.v]])))

// ============================================================================
//  Formations
// ============================================================================
#section("Formations", icon-name: "book")
#stack(dir: ttb, spacing: 10pt, ..d.education.map(e => icon-line("mi-Grimoire", size: 15pt, [
  #text(font: f-display, weight: 900, size: 15pt, fill: gold)[#e.period] #h(6pt) #text(font: f-title, weight: 700, size: 12.5pt)[#e.role] \
  #text(size: 11pt, style: "italic", fill: muted)[#e.org]
])))

// ============================================================================
//  Expériences professionnelles — entreprise, poste, dates, projets détaillés
// ============================================================================
#section("Expériences professionnelles", icon-name: "building")

#let project-block(p) = block(breakable: false, above: 12pt, below: 4pt, {
  icon("mi-Cards", size: 13pt)
  h(5pt)
  text(font: f-title, weight: 700, size: 13.5pt, fill: ink)[#p.title]
  h(6pt)
  text(font: f-title, size: 9.6pt, tracking: 1pt, fill: gold)[#p.year]
  v(-4pt)
  p.desc
  if p.bullets.len() > 0 {
    v(-2pt)
    list(..p.bullets)
  }
})

#let company-footer(c) = {
  if c.clients.len() > 0 {
    block(above: 10pt, below: 0pt)[#icon("mi-Theatre", size: 11pt) #h(3pt) #label(c.at("clientsLabel", default: "Clients & projets")) #h(5pt) #text(size: 11pt)[#c.clients.join(" · ")]]
  }
  block(above: 6pt, below: 0pt)[#icon("mi-Cog", size: 11pt) #h(3pt) #label("Environnement technique") #h(5pt) #text(size: 11pt, style: "italic", fill: muted)[#c.stack.join(", ")]]
}

#for (i, c) in d.companies.enumerate() {
  let projects = d.projects.filter(p => p.client == c.name)
  let detailed = projects.len() >= 2

  let header = block(sticky: true, above: if i == 0 { 4pt } else { 26pt }, below: 8pt, {
    grid(
      columns: (1fr, auto),
      align: (left + bottom, right + bottom),
      text(font: f-display, weight: 900, size: 23pt, fill: ink, upper(c.name)),
      [#icon("calendar", size: 11.5pt) #h(3pt) #text(font: f-title, weight: 600, size: 9.8pt, tracking: 1.2pt, fill: gold, upper(c.period))],
    )
    v(-5pt)
    icon("mi-Mask", size: 14pt)
    h(5pt)
    text(font: f-title, weight: 700, size: 15pt, fill: red)[#c.role]
    h(6pt)
    text(size: 11.5pt, style: "italic", fill: muted)[#c.kind]
  })

  // Dernier élément (projet ou réalisations) + clients + environnement : toujours sur la même page,
  // pour qu'aucune ligne « Environnement technique » ne se retrouve seule en haut de page.
  let tail = block(breakable: false, above: if detailed { 12pt } else { 8pt }, below: 0pt, {
    if detailed { project-block(projects.last()) } else if c.bullets.len() > 0 { list(..c.bullets) }
    company-footer(c)
  })

  if not detailed and c.bullets.len() == 0 {
    // Expérience courte : entièrement insécable
    block(breakable: false, above: 0pt, below: 0pt, { header; c.desc; parbreak(); company-footer(c) })
  } else {
    header
    c.desc
    parbreak()
    if detailed { for p in projects.slice(0, -1) { project-block(p) } }
    tail
  }

  if i < d.companies.len() - 1 {
    v(10pt)
    align(center, box(width: 40%, line(length: 100%, stroke: (paint: gold, thickness: 0.3pt, dash: "dotted"))))
  }
}

// ============================================================================
//  Centres d'intérêt
// ============================================================================
#section("Centres d'intérêt", icon-name: "heart")
#align(center, d.interests.map(it => box[
  #icon(it.icon, size: 21pt) #h(6pt)
  #text(font: f-title, weight: 600, size: 14pt, tracking: 1.6pt, fill: ink, upper(it.title))
  #if it.text != none [ — #text(style: "italic")[#it.text]]
]).join(h(26pt)))
