// ============================================================================
//  Cartes de visite de Vincent Cornière — 5 variantes
//  Même direction artistique que le site et le CV (affiche de magicien, Art déco).
//
//  Recto : nom, métier, et une frise où un lapin est assis entre 4 losanges.
//  Le seul marquage est un losange évidé (voir rabbit-rail) : invisible pour qui
//  ne le cherche pas, lisible d'un coup d'œil grâce au lapin qui sert de repère.
//  Verso : blanc et vide, pour que les spectateurs puissent y dessiner.
//
//  Format : 85 × 55 mm, fond perdu de 3 mm (page de 91 × 61 mm).
//  Ordre des pages : recto 1, verso, recto 2, verso… (impression recto verso).
//  Données : ../cv/data.json, extrait du site. Génération : npm run cartes
// ============================================================================

#let d = json("../cv/data.json")

#let bg = rgb("#0d0a09")
#let gold = rgb("#c9a24a")
#let gold-light = rgb("#e9d18f")
#let cream = rgb("#f1e6cf")
#let muted = rgb("#bfae8e")
#let crimson = rgb("#9b1c1c")

#let f-display = "Cinzel Decorative"
#let f-title = "Cinzel"
#let f-body = "EB Garamond"

#let bleed = 3mm
#let W = 85mm
#let H = 55mm

#set document(title: "Cartes de visite — " + d.profile.fullName, author: d.profile.fullName)
#set page(width: W + 2 * bleed, height: H + 2 * bleed, margin: 0pt, fill: bg)
#set text(font: f-body, fill: cream, lang: "fr", hyphenate: false)

#let icon(name, size: 7pt, color: gold) = box(baseline: 18%, image(
  bytes(d.icons.at(name).replace("currentColor", color.to-hex())),
  format: "svg",
  height: size,
))

#let diamond(r: 1.4pt, fill: gold) = box(width: 2 * r, height: 2 * r, baseline: 20%, place(dx: r, dy: r, polygon(
  fill: fill, (0pt, -r), (r, 0pt), (0pt, r), (-r, 0pt),
)))

#let star(r: 2pt, fill: gold) = box(width: 2 * r, height: 2 * r, baseline: 15%, place(dx: r, dy: r, polygon(
  fill: fill,
  (0pt, -r), (0.22 * r, -0.22 * r), (r, 0pt), (0.22 * r, 0.22 * r),
  (0pt, r), (-0.22 * r, 0.22 * r), (-r, 0pt), (-0.22 * r, -0.22 * r),
)))

// Cadre double, à 4 mm du bord de coupe (reste dans la zone sûre)
#let frame = {
  let o = bleed + 3.2mm
  let i = bleed + 4.2mm
  place(top + left, dx: o, dy: o, rect(width: W + 2 * bleed - 2 * o, height: H + 2 * bleed - 2 * o, stroke: 0.6pt + gold))
  place(top + left, dx: i, dy: i, rect(width: W + 2 * bleed - 2 * i, height: H + 2 * bleed - 2 * i, stroke: 0.25pt + gold))
  for (x, y) in ((left, top), (right, top), (left, bottom), (right, bottom)) {
    place(x + y, dx: if x == left { o - 1.6pt } else { -o + 1.6pt }, dy: if y == top { o - 1.6pt } else { -o + 1.6pt }, diamond(r: 1.6pt))
  }
}

// Éventail Art déco en haut de carte
#let fan(r: 9mm) = box(width: 2 * r, height: r, {
  for k in range(0, 13) {
    let a = 180deg + k * 15deg
    place(bottom + left, dx: r, line(start: (0pt, 0pt), end: (r * calc.cos(a), r * calc.sin(a)), stroke: 0.3pt + gold))
  }
  place(bottom + left, dx: r - 2.2mm, dy: 2.2mm, circle(radius: 2.2mm, fill: bg, stroke: 0.5pt + gold))
})

// Frise de marquage : le lapin est toujours assis au centre, entre 4 losanges.
// Un seul losange est évidé ; sa place par rapport au lapin donne le numéro :
//   1 = loin à gauche, 2 = près à gauche, 3 = aucun (tous pleins), 4 = près à droite, 5 = loin à droite.
// Le lapin sert de repère : on lit le marquage sans compter.
#let rabbit-rail(n) = {
  let slot = 7mm
  let hollow = (0, 1, none, 3, 4).at(n - 1)
  box(width: 5 * slot + 16mm, height: 7mm, {
    place(bottom + left, dy: -1.4pt, line(length: 100%, stroke: 0.35pt + gold))
    place(bottom + left, dx: -1.8pt, dy: 0.4pt, star(r: 1.8pt))
    place(bottom + right, dx: 1.8pt, dy: 0.4pt, star(r: 1.8pt))
    for k in (0, 1, 3, 4) {
      let x = 8mm + k * slot + slot / 2
      let r = 1.4pt
      place(bottom + left, dx: x - r, box(width: 2 * r, height: 2 * r, place(dx: r, dy: r, polygon(
        fill: if k == hollow { bg } else { gold },
        stroke: if k == hollow { 0.4pt + gold } else { none },
        (0pt, -r), (r, 0pt), (0pt, r), (-r, 0pt),
      ))))
    }
    let x = 8mm + 2 * slot + slot / 2
    place(bottom + left, dx: x - 2.6mm, dy: -2.1pt, image("lapin.svg", width: 5.2mm))
  })
}

#let recto(n) = {
  frame
  place(top + center, dy: bleed + 5mm, fan(r: 6.5mm))
  place(center + horizon, dy: 1.2mm, align(center, {
    text(font: f-title, weight: 600, size: 6pt, tracking: 2.2pt, fill: gold)[#star(r: 1.6pt) #h(3pt) PRÉSENTE #h(3pt) #star(r: 1.6pt)]
    v(-2pt)
    text(font: f-display, weight: 900, size: 16pt, fill: cream, d.profile.firstName)
    linebreak()
    v(-8pt)
    text(font: f-display, weight: 900, size: 16pt, fill: gold-light, d.profile.lastName)
    v(-4pt)
    text(font: f-title, weight: 700, size: 7pt, tracking: 1.4pt, fill: crimson.lighten(25%), upper(d.profile.role))
  }))
  place(bottom + center, dy: -(bleed + 5.4mm), rabbit-rail(n))
}

// Verso vide et blanc : les spectateurs doivent pouvoir y dessiner au stylo
#let verso = page(fill: white)[]

#let variants = sys.inputs.at("variants", default: "1,2,3,4,5").split(",").map(int)
#for (i, n) in variants.enumerate() {
  if i > 0 { pagebreak() }
  recto(n)
  verso
}
