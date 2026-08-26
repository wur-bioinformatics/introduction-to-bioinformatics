// Book-specific styling for Introduction to Bioinformatics.
//
// template.typ imports this *after* the [-IMPORTS-] placeholder, where mystmd
// writes myst-imports.typ. Definitions here therefore shadow the generic ones
// mystmd generates (admonition blocks, table styling), which is the supported
// way to restyle them: mystmd emits `#let tableStyle = (:)` and the various
// `#let <kind>Block(...)` bindings precisely so a template can override them.

#import "@preview/tiaoma:0.3.0"
#import "@preview/in-dexter:0.7.2": index, index-main, make-index

// Wageningen University & Research house colours.
#let wur-green = rgb("#34862b")
#let wur-blue = rgb("#0c5c8c")
#let wur-orange = rgb("#e87d1e")
#let wur-red = rgb("#c1272d")

// ---------------------------------------------------------------------------
// Admonitions
//
// Signature must match what mystmd's typst renderer calls:
//   #noteBlock[body]                      (default heading)
//   #noteBlock(heading: [Title])[body]    (explicit heading)
// ---------------------------------------------------------------------------

#let bifAdmonition(body, heading: none, color: wur-blue) = {
  block(
    breakable: true,
    width: 100%,
    stroke: (left: 2pt + color),
    fill: color.lighten(94%),
    inset: (left: 10pt, right: 8pt, top: 7pt, bottom: 7pt),
    above: 1em,
    below: 1em,
    radius: (top-right: 2pt, bottom-right: 2pt),
  )[
    #if heading != none {
      text(10pt, weight: "bold", fill: color.darken(15%))[#heading]
      v(3pt, weak: true)
    }
    #body
  ]
}

#let noteBlock(body, heading: [Note]) = bifAdmonition(body, heading: heading, color: wur-blue)
#let importantBlock(body, heading: [Important]) = bifAdmonition(body, heading: heading, color: wur-red)
#let attentionBlock(body, heading: [Attention]) = bifAdmonition(body, heading: heading, color: wur-orange)
#let warningBlock(body, heading: [Warning]) = bifAdmonition(body, heading: heading, color: wur-orange)
#let cautionBlock(body, heading: [Caution]) = bifAdmonition(body, heading: heading, color: wur-orange)
#let dangerBlock(body, heading: [Danger]) = bifAdmonition(body, heading: heading, color: wur-red)
#let errorBlock(body, heading: [Error]) = bifAdmonition(body, heading: heading, color: wur-red)
#let tipBlock(body, heading: [Tip]) = bifAdmonition(body, heading: heading, color: wur-green)
#let hintBlock(body, heading: [Hint]) = bifAdmonition(body, heading: heading, color: wur-green)
#let seealsoBlock(body, heading: [See also]) = bifAdmonition(body, heading: heading, color: wur-green)

// ---------------------------------------------------------------------------
// Videos
//
// The book embeds YouTube videos, which cannot exist on paper. plugins/print-plugin.mjs
// rewrites every embed into a call to this macro so the reader can scan through.
// ---------------------------------------------------------------------------

#let videoQR(url, title) = {
  block(
    breakable: false,
    width: 100%,
    inset: 8pt,
    above: 1em,
    below: 1em,
    stroke: 0.5pt + luma(180),
    radius: 2pt,
    grid(
      columns: (auto, 1fr),
      column-gutter: 12pt,
      align: horizon,
      tiaoma.qrcode(url, options: (scale: 1.1)),
      {
        text(10pt, weight: "bold")[#title]
        linebreak()
        text(8pt, fill: luma(100))[Video — scan the code, or visit]
        linebreak()
        text(8pt, fill: luma(100))[#link(url)[#url]]
      },
    ),
  )
}

// ---------------------------------------------------------------------------
// Tables
//
// mystmd renders tables through @preview/tablex and spreads `tableStyle` and
// `columnStyle` into every call.
// ---------------------------------------------------------------------------

#let tableStyle = (
  stroke: 0.5pt + luma(190),
)

// ---------------------------------------------------------------------------
// Exercises
//
// myst-to-typst renders {exercise} through a `proof` macro that wraps the box in
// `place(auto, float: true, ...)`. In a book that lets a practical assignment
// drift past the end of its own section — chapter 2's exercises landed after the
// glossary. This keeps the same call signature and figure semantics (so labels
// and chapter-scoped numbering still work) but leaves the box where it was
// written, and lets long exercises break across pages.
// ---------------------------------------------------------------------------

#let proof(
  body,
  heading: [],
  kind: "proof",
  supplement: "Proof",
  labelName: none,
  color: wur-green,
  float: false,
) = {
  let frame = 0.5pt + color.lighten(45%)

  set figure(placement: none)
  set figure.caption(position: top)
  show figure: set block(breakable: true)
  show figure.caption: it => block(
    width: 100%,
    inset: (x: 8pt, y: 5pt),
    fill: color.lighten(92%),
    stroke: frame,
  )[
    #set align(left)
    #text(10pt, weight: "bold", fill: color.darken(25%))[
      #it.supplement #context it.counter.display(it.numbering)#if heading != [] [: #heading]
    ]
  ]

  // A content block, not a code block: a label cannot be joined onto content.
  [
    #figure(
      kind: kind,
      supplement: supplement,
      gap: 0pt,
      {
        set align(left)
        set figure.caption(position: bottom)
        block(width: 100%, stroke: frame, inset: 8pt, body)
      },
      caption: heading,
    )
    #if labelName != none { label(labelName) }
  ]
}
