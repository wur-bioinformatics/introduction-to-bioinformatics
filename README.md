# BIF20306 reader

Information for contributors

---

## Conventions

### Headers & sections
The reader uses headers (#) to aid with structure. A chapter should always start with one top level header (#), followed by a second level header (##).
If a section requires sub-sections third, fourth or even fifth level headers can be used (###, ####, #####, respectively).
It is important to realize however, that sub-sections will map under a second level header until another second level header is encountered.
So a second level header should be used to introduce a broad concept, where sub-sections provide information on the specific parts of that concept.
Each header is closed by a section divider (---), apart from the references section at the end.

An example of a properly structured markdown file:

`
# Main title

introduction to the chapter.

---

## Broad concept 1

Short description of what to expect from this section.

---

### More specific information in relation to concept 1.

Information.

---

### Additional specific information in relation to concept 1.

Information.

---

## Broad concept 2

Short description of what to expect from this section.

---

## References
`

For more information on headers and sections see the [Jupyter Book documentation](https://jupyterbook.org/en/stable/structure/sections-headers.html)

---

### Comments
adsfs