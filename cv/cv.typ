// ============================================================================
//  CV de Vincent Cornière
//  Structure du CV d'origine (une colonne, lecture linéaire, sections soulignées,
//  projets détaillés par entreprise) habillée de la direction artistique du
//  portfolio (Art déco), pensée pour l'impression : fond blanc, aucun aplat,
//  filets fins, lisible en noir et blanc.
//
//  Données : data.json, extrait du site par scripts/export-data.mjs.
//  Génération : ./build.sh  (PDF couleur + PDF noir et blanc)
// ============================================================================

#let d = json("data.json")
#let mode = sys.inputs.at("mode", default: "couleur") // "couleur" | "nb"

// --- Palette -----------------------------------------------------------------
// « couleur » : or sombre et rouge profond, lisibles une fois convertis en gris.
// « nb » : niveaux de gris purs, pour une impression monochrome garantie.
#let ink = if mode == "nb" { luma(10%) } else { rgb("#1b1511") }
#let gold = if mode == "nb" { luma(38%) } else { rgb("#8a6420") }
#let red = if mode == "nb" { luma(18%) } else { rgb("#7c1a1a") }
#let muted = if mode == "nb" { luma(30%) } else { rgb("#4a3f35") }

#let f-display = "Cinzel Decorative"
#let f-title = "Cinzel"
#let f-body = "EB Garamond"

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
#let section(title) = block(above: 22pt, below: 12pt, sticky: true, {
  text(font: f-title, weight: 700, size: 12.5pt, tracking: 1.2pt, fill: ink, upper(title))
  v(-6pt)
  grid(
    columns: (1fr, auto, 1fr),
    align: horizon,
    column-gutter: 4pt,
    line(length: 100%, stroke: 0.6pt + gold),
    diamond(r: 2pt),
    line(length: 100%, stroke: 0.25pt + gold),
  )
})

#let label(body) = text(font: f-title, weight: 700, size: 8.4pt, tracking: 0.8pt, fill: gold, upper(body))

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
  footer: context align(center, text(font: f-title, size: 7pt, tracking: 1.6pt, fill: gold)[
    #star(r: 2pt) #h(4pt) #upper(d.profile.fullName) #h(6pt) · #h(6pt) #counter(page).display() / #counter(page).final().first() #h(4pt) #star(r: 2pt)
  ]),
)
#set text(font: f-body, size: 10.5pt, fill: ink, lang: "fr", hyphenate: false)
#set par(justify: false, leading: 0.62em, spacing: 0.9em)
#set list(marker: star(r: 2.4pt), indent: 6pt, body-indent: 8pt, spacing: 0.6em)
#show link: it => it

// ============================================================================
//  En-tête — coordonnées en haut à gauche, grand titre centré
// ============================================================================
#grid(
  columns: (1fr, auto),
  align: (left + top, right + top),
  [
    #text(font: f-display, weight: 700, size: 15pt, tracking: 1pt, fill: ink)[#d.profile.firstName #upper(d.profile.lastName)]
    #v(-4pt)
    #set text(size: 10.5pt, fill: muted)
    #d.profile.location \
    #link("mailto:" + d.profile.email)[#d.profile.email] \
    #d.socials.map(s => link(s.url)[#s.url.replace("https://", "").replace("www.", "").trim("/", at: end)]).join(linebreak())
  ],
  text(font: f-title, size: 8.5pt, tracking: 1pt, fill: gold, upper("Disponibilité : " + d.profile.availability)),
)

#v(18pt)
#align(center)[
  #text(font: f-display, weight: 900, size: 25pt, fill: ink)[#d.profile.roleLong]
  #v(-10pt)
  #text(font: f-display, weight: 700, size: 21pt, fill: red)[#d.profile.specialty]
  #v(2pt)
  #divider()
]

// ============================================================================
//  Domaines d'intervention — liste à puces, sur deux colonnes
// ============================================================================
#section("Domaines d'intervention")
#grid(
  columns: (1fr, 1fr),
  column-gutter: 18pt,
  row-gutter: 12pt,
  ..d.expertise.map(x => [
    #label(x.title)
    #v(-2pt)
    #list(..x.items)
  ]),
)

// ============================================================================
//  Compétences — « Libellé : valeurs », comme dans le CV d'origine
// ============================================================================
#section("Compétences")
#list(..d.skillGroups.map(g => [*#g.k :* #g.v]))

// ============================================================================
//  Formations
// ============================================================================
#section("Formations")
#list(..d.education.map(e => [
  #text(font: f-title, weight: 700, fill: gold)[#e.period :] *#e.role* — #text(style: "italic")[#e.org]
]))

// ============================================================================
//  Expériences professionnelles — entreprise, poste, dates, projets détaillés
// ============================================================================
#section("Expériences professionnelles")

#let project-block(p) = block(breakable: false, above: 12pt, below: 4pt, {
  text(font: f-title, weight: 700, size: 10.5pt, fill: ink)[#p.title]
  h(5pt)
  text(size: 9.5pt, style: "italic", fill: gold)[#p.year]
  v(-4pt)
  p.desc
  if p.bullets.len() > 0 {
    v(-2pt)
    list(..p.bullets)
  }
})

#let company-footer(c) = {
  if c.clients.len() > 0 {
    block(above: 10pt, below: 0pt)[#label(c.at("clientsLabel", default: "Clients & projets")) #h(5pt) #c.clients.join(" · ")]
  }
  block(above: 6pt, below: 0pt)[#label("Environnement technique") #h(5pt) #text(style: "italic")[#c.stack.join(", ")]]
}

#for (i, c) in d.companies.enumerate() {
  let projects = d.projects.filter(p => p.client == c.name)
  let detailed = projects.len() >= 2

  let header = block(sticky: true, above: if i == 0 { 4pt } else { 26pt }, below: 8pt, {
    grid(
      columns: (1fr, auto),
      align: (left + bottom, right + bottom),
      text(font: f-display, weight: 900, size: 15pt, fill: ink, upper(c.name)),
      text(font: f-title, weight: 600, size: 8.8pt, tracking: 0.8pt, fill: gold, upper(c.period)),
    )
    v(-5pt)
    text(font: f-title, weight: 700, size: 11pt, fill: red)[#c.role]
    h(6pt)
    text(style: "italic", fill: muted)[#c.kind]
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
#section("Centres d'intérêt")
#list(..d.interests.map(it => if it.text != none [*#it.title* — #it.text] else [#it.title]))
