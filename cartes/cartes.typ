// ============================================================================
//  Cartes de visite de Vincent Cornière — 5 variantes
//  Même direction artistique que le site et le CV (affiche de magicien, Art déco).
//
//  Recto : nom, métier, et une frise de 5 losanges sur laquelle un lapin est assis.
//  La place du lapin (1 à 5, de gauche à droite) est le seul marquage : elle se lit
//  d'un coup d'œil mais passe pour un ornement. Le verso est identique sur les 5.
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

// Frise de marquage : 5 emplacements ; le lapin est assis au-dessus de l'emplacement n
#let rabbit-rail(n) = {
  let slot = 7mm
  box(width: 5 * slot + 16mm, height: 7mm, {
    place(bottom + left, dy: -1.4pt, line(length: 100%, stroke: 0.35pt + gold))
    place(bottom + left, dx: -1.8pt, dy: 0.4pt, star(r: 1.8pt))
    place(bottom + right, dx: 1.8pt, dy: 0.4pt, star(r: 1.8pt))
    for k in range(1, 6) {
      let x = 8mm + (k - 1) * slot + slot / 2
      place(bottom + left, dx: x - 1.4pt, diamond(r: 1.4pt, fill: if k == n { bg } else { gold }))
      if k == n {
        place(bottom + left, dx: x - 2.6mm, dy: -2.1pt, image("lapin.svg", width: 5.2mm))
      }
    }
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

#let verso = {
  frame
  let medal = 22mm
  let scale = medal / 700
  place(left + horizon, dx: bleed + 6.5mm, box(width: medal + 5pt, height: medal + 5pt, {
    place(center + horizon, circle(radius: medal / 2 + 2.2pt, stroke: 0.6pt + gold))
    place(center + horizon, box(width: medal, height: medal, radius: medal / 2, clip: true,
      place(top + left, dx: -50 * scale, dy: -251 * scale,
        image("../public/img/portrait.svg", width: 800 * scale, height: 1100 * scale))))
  }))
  let short(url) = url.replace("https://", "").replace("www.", "").trim("/", at: end)
  let row(name, body) = [#icon(name, size: 6pt) #h(2.5pt) #body]
  place(left + horizon, dx: bleed + 6.5mm + medal + 5.5mm, box(width: 43mm, {
    set text(size: 6.2pt, fill: cream)
    text(font: f-title, weight: 700, size: 7.4pt, tracking: 1.1pt, fill: gold, upper(d.profile.fullName))
    v(-5pt)
    text(size: 6.8pt, style: "italic", fill: muted, d.profile.roleLong + " · " + d.profile.specialty)
    v(-2pt)
    box(width: 100%, line(length: 100%, stroke: 0.3pt + gold))
    v(-1pt)
    stack(dir: ttb, spacing: 3.2pt,
      row("mail", link("mailto:" + d.profile.email, d.profile.email)),
      row("home", link(d.profile.website, short(d.profile.website))),
      ..d.socials.map(so => row(lower(so.label), link(so.url, short(so.url)))),
      row("pin", d.profile.location),
    )
  }))
}

#let variants = sys.inputs.at("variants", default: "1,2,3,4,5").split(",").map(int)
#for (i, n) in variants.enumerate() {
  if i > 0 { pagebreak() }
  recto(n)
  pagebreak()
  verso
}
