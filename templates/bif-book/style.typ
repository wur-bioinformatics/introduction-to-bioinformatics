  
#let leftCaption(it) = {
  set text(size: 8pt)
  set align(left)
  set par(justify: true)

  // Within the context of the element, you may use the counter
  context(it, {
    text(weight: "bold")[#it.supplement #it.counter.display(it.numbering).]
  })

  h(4pt)
  set text(fill: black.lighten(20%), style: "italic")
  it.body
}


#let template(
  // FRONTPAGE.
  title: "Book Title",
  subtitle: none,
  authors: "Your name",
  cover: none,            // <— path to cover "images/cover.png"
  cover_width: 12cm,    
  coverposition: 1cm,
  justification: false,

  // TOC
  ToC_depth: 2,
  show_ToC: true,

  // PREFACE
  preface: none,

  // COLOPHON (reverse of the title page)
  doi: none,
  license: none,
  institution: none,
  book_url: none,

  // SPECIFICATION of output
  paper-size: "a4",       // https://typst.app/docs/reference/layout/page/#parameters-paper
  margin: (),                          
  linespacing: .5em,
  show_pagenumber: false,
  margin_top: 2cm,
  margin_bottom: 2cm,
  margin_left: 20%,
  margin_right: 10%,
  logo: none,
  logo_width: 10%,
  
  font: "Libertinus Serif", 
  fontsize: 11pt,

  theme: red.darken(30%),
  colorheadings: black,
  
  // The book's content.
  body
) = {

  set page(
    numbering: none,
    paper-size,
    ) //numbering off until first chapter
  
  // The first level-1 heading is the introduction: front matter, not a chapter.
  // So the chapter number is always the level-1 counter minus one, and anything
  // still in the front matter (chapter number 0) is left unnumbered.
  set heading(numbering: (..args) => {
    let nums = args.pos()
    let chapter = nums.at(0) - 1
    if chapter < 1 { return none }
    let scoped = (chapter,) + nums.slice(1)
    if nums.len() == 1 { [#numbering("1.", ..scoped)] } else { [#numbering("1.1.1", ..scoped)] }
  })

  // Figures are numbered chapter.figure — 2.7, not 43. Cross-references resolve
  // through the same counter (plugins/print-plugin.mjs rewrites {numref} to
  // typst's @label form), so a reference and its caption can never disagree.
  set figure(numbering: (..args) => {
    let chapter = counter(heading).display((..nums) => {
      let n = nums.pos().at(0, default: 1) - 1
      if n < 1 { "" } else { str(n) + "." }
    })
    [#chapter#numbering("1", ..args.pos())]
  })
  

  // Configure equation numbering and spacing. Same chapter offset as figures.
  set math.equation(numbering: (..args) => {
    let chapter = counter(heading).display((..nums) => {
      let n = nums.pos().at(0, default: 1) - 1
      if n < 1 { "" } else { str(n) + "." }
    })
    [(#chapter#numbering("1)", ..args.pos())]
  })
  show math.equation: set block(spacing: 1em)


  // Configure lists.
  set enum(indent: 10pt, body-indent: 9pt)
  set list(indent: 10pt, body-indent: 9pt)

  // link behaviour
  show link: set text( fill: blue.darken(30%))

// TITLE PAGE
  {
    set page(margin: (top: 5cm, bottom: 3cm, left: 3cm, right: 3cm))
    align(center)[
      #text(28pt, weight: "bold", fill: theme, title)
      #if subtitle != none {
        v(6pt)
        text(15pt, fill: gray.darken(30%), subtitle)
      }
      #v(4pt)
      #line(length: 40%, stroke: 1pt + theme)
    ]

    if cover != none {
      v(coverposition)
      align(center, image(cover, width: cover_width))
    }

    if authors != none {
      place(bottom + center, text(11pt, fill: gray.darken(40%), authors))
    }
  }

// COLOPHON — the reverse of the title page
  if doi != none or license != none or institution != none or book_url != none {
    pagebreak()
    set page(margin: (top: 3cm, bottom: 3cm, left: 3cm, right: 3cm))
    place(bottom + left, block(width: 100%)[
      #set text(9pt, fill: gray.darken(40%))
      #set par(leading: 0.6em)
      #text(11pt, weight: "bold", fill: theme, title) \
      #if institution != none [#institution \ ]
      #if book_url != none [Online edition: #link(book_url)[#book_url] \ ]
      #if doi != none [DOI: #link("https://doi.org/" + doi)[#doi] \ ]
      #if license != none [#license]
    ])
  }


// PREFACE, 
  if preface != none {
    pagebreak()
    place(top + left, 
      text(14pt, fill: theme, "Preface")
    )
    v(1em)
    set par(justify: true)
    align(center, box(width: 70%, text(11pt, overhang: true, font:  "New Computer Modern", fill: gray.darken(30%), preface)))
  }


//OUTLINE OF THE BOOK
  pagebreak()
  if show_ToC == true {
      
    show outline.entry.where(level: 1): it => {
      v(12pt, weak: true)
      
      strong(it)
    }
    // setting outline in themecolor
    outline(
    title: strong(text(fill: theme, "Contents")),
    depth: ToC_depth,
    indent: auto,
  )

  }

//CHAPTER OPENERS + RESETTING NUMBERING
  show heading.where(level: 1): it => {
    pagebreak()
    // Reset all counters with a new chapter. myst-to-typst tags figures with
    // string kinds ("figure", "table", "exercise"), each of which typst counts
    // separately, so each needs resetting by name.
    counter(figure.where(kind: "figure")).update(0)
    counter(figure.where(kind: "table")).update(0)
    counter(figure.where(kind: "exercise")).update(0)
    counter(math.equation).update(0)

    // Front matter, and the unnumbered back matter typst generates for the
    // bibliography and the index, get a plain heading; chapters get an opener.
    context {
      let chapter = counter(heading).get().at(0, default: 1) - 1
      if it.numbering == none or chapter < 1 {
        block(above: 0pt, below: 1.2em, text(20pt, weight: "bold", fill: theme, it.body))
      } else {
        block(above: 0pt, below: 0.4em)[
          #text(9pt, weight: "bold", fill: theme, tracking: 2pt)[CHAPTER #chapter]
        ]
        block(above: 0pt, below: 0.5em, text(20pt, weight: "bold", fill: theme, it.body))
        block(above: 0pt, below: 1.6em, line(length: 100%, stroke: 0.8pt + theme))
      }
    }
  }

  //Heading colors
  show heading: set text(colorheadings)
  

// PAGE LAYOUT OF CONTENT
  set page(
    numbering: if show_pagenumber == true {"1"} else {none},         //turn on numbering
    margin: (
      top: margin_top,
      bottom: margin_bottom,
      left: margin_left,
      right: margin_right 
      ),    //set left margin
    header: if logo != none { align(center)[#image(logo, width: logo_width)] } else { none },//include logo
  )   

  set text(
    font: font,
    size: fontsize
    )
  set par(
    leading: linespacing,
    justify: justification
    )

  counter(page).update(1)   //set number to 1

  // Display the book's contents.
  [#body]
}
