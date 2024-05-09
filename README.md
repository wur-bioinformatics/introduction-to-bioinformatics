# BIF20306 reader

Information for contributors

---

## Conventions

Throughout the reader conventions are used to create a uniform whole that is easy to understand by its contributors, making future adjustments an easy task.
Below, these conventions are described. Remember that the [Jupter Book documentation](https://jupyterbook.org/en/stable/intro.html) contains more information.

---

### Headers & sections
The reader uses headers (#) to aid with structure. A chapter should always start with one top level header (#), followed by a second level header (##).
If a section requires sub-sections, third, fourth, fifth, or even sixth level headers can be used (###, ####, #####, ######, respectively).
It is important to realize however, that sub-sections will map under a second level header until another second level header is encountered.
So a second level header should be used to introduce a broad concept, where sub-sections provide information on the specific parts of that concept.
Each header is closed by a section divider (---), apart from the references section at the end.

An example of a properly structured markdown file:

```none
# Main title

Introduction to the chapter.

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
```

For more information on headers and sections see the [Jupyter Book documentation](https://jupyterbook.org/en/stable/structure/sections-headers.html)

---

### Figures

When text is accompanied by a figure, the following syntax is used:

```none
:::{figure} ../images/image.(png/jpg/svg/etc.)
:alt: An alternative textual description of the image
:align: (center/left/right)
:width: (px/%)
:name: Referencing name of figure

Description of the figure.
:::
```

An example of a proper figure content block:

```none
:::{figure} images/Week1/aminoacid.jpg
:alt: Structure of an amino acid
:align: center
:width: 40%
:name: aminoacid

The structure of an amino acid. Four groups are connected to the α-carbon:
an amino group, a hydrogen atom, a carboxyl group, and a side chain (R group).
:::
```

The description of figures should always end with the applicable licensing (if available) and a citation of the original source.
The next section will cover how to include references and refer to them from the text.
More information on figures can be found in the [Jupyter Book documentation](https://jupyterbook.org/en/stable/content/figures.html)

---

### Referencing, citing, licences, and cross-referencing

In the reader several methods of linking are implemented, each requiring their own syntax. Below, each of these methods are explained in greater detail.

#### References

When refering to a figure the following syntax is used:
```none
See {numref}`referencing name of figure`.
```

As an example, the figure content block looks like this:

```none
:::{figure} images/Week1/protrep.jpg
:alt: Protein representation
:align: center
:width: 60%
:name: protrep

Different representations of the PDB structure 5PEP generated with NGL.
:::
```
To reference this figure you would then put the following line in the text:

```none
For some examples see {numref}`protrep`.
```

Using `{numref}` ensures that the figure is provided with automatic numbering and is referred in the text using this number.
More information on referencing figures can be found in the [Jupyter Book documentation](https://jupyterbook.org/en/stable/reference/cheatsheet.html#referencing-figures)

---

#### Citations and licensing

When figures or text are used from an external source (a paper, website, etc.), proper attribution is essential.

Citing a source should be done in the text or at the end of the description of a figure using the following syntax:

```none
{cite}`citation name`
```
The citation name is based on name given to the citation in the references.bib file in root of the repository.
This file is a BibTex file, which contains BibTex entries for each citation.
Bibtex citations can usually be downloaded directly from papers, however, an understanding of the general format is beneficial.
More information on the BibTex format can be found on [BibTex.org](https://www.BibTex.org/Using/).

An example of a BibTex file, which contains a single citation:

```none
@article{GDT_2020,
	title = {‘It will change everything’: DeepMind’s AI makes gigantic leap in solving protein structures},
	author = {Callaway, E.},
	journal = {Nature},
	volume = {588},
	pages = {203-204},
	url = {https://www.nature.com/articles/d41586-020-03348-4},
	doi = {10.1038/d41586-020-03348-4},
	year = {2020}
}
```
The name given to this citation is GDT_2020. The general format for naming should follow a `name_year` style.
In the case of the example, GDT is short for global distance test, and 2020 was the year of publication.

Citations should be added as BibTex entries prior to using `{cite}`.

Assuming the previous example has been saved in references.bib, citing can be done using :

```none
{cite}`GDT_2020`.
```

If a Creative Commons license is available for used imagery, the license should be listed in the description of the figure.
This license is linked to the Creative Commons website using the following syntax:

```none
[Type of license](url to license webpage)
```

When attributing a figure for example:
```none
:::{figure} images/Week1/terstructure.jpg
:alt: Tertiary structure interactions
:align: center
:width: 80%
:name: terstructure

Chemical interactions that stabilize the tertiary structure of proteins.
Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) {cite}`proteins_2018`.
:::
```

This ensures that there can be no doubt about the proper usage of imagery in the reader. Citations always follow licensing (if applicable).

Self-created imagery has the preference by the WUR to be published under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) licensing.

More information on references and citations can be found in the [Jupyter Book documentation](https://jupyterbook.org/en/stable/reference/cheatsheet.html#citations)

---

#### Cross-references

It may happen that a reference to an earlier or later section is made in the text to aid in the understanding of a topic.
These are cross-references and use labels that can be attached to headers.

The following syntax is used for the creation of header labels:

```none
(label)=

# Header
```

And a label is cross-referenced to using:

```none
[Any text](label)
```

For example, when a cross-reference is to be made to a section about translation, you would add the following label above the header that contains information on translation:

```none
(translation)=

# Translation

Information on translation.
```

Which you can then reference to using:

```none
For more information on translation, see the above section [Translation](translation).
```

This will produce a link on the word Translation that leads to the section label called translation.

For more information on referencing and cross-referencing, see the [Jupyter Book documentation](https://jupyterbook.org/en/stable/content/references.html#references-and-cross-references).

---

### Bibliographies

It is essential that each citation is also included in a bibliography, otherwise the citations will not work.
Bibliographies are included at the end of each chapter, containing only the citations that were used in that chapter.

Adding a bibliography to the end of a markdown file is done by adding the following:

```none
## References

:::{bibliography}
:filter: docname in docnames
:labelprefix: (week number, followed by a capital W), for example: 1W
:::
```

This will add all used citations into a bibliography at the bottom of the page.

---

### Comments

When writing or reviewing the markdown files, you may want to leave a comment for yourself or other contributors to see.
The compiler assumes every line that starts with `%` is a comment line.
However, since percentages are used rather frequently, which makes filtering for comments more difficult, a preference has been given to use `%#%` for commenting.
This makes sure that it is easy to search for comments in a markdown file and that they are not included in the actual output of the compiler.
Comments are put directly beneath a paragraph or figure that you would like to comment on.

For example:

```none
#### Secondary structure prediction

As we have seen in Section X.X, there are key similarities and differences between α-helices and β-sheets.
%#% Not sure what the Section X.X refers to.
```