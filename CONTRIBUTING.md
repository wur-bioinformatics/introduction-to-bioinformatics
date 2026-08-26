# Information for contributors

---

## Jupyter Book
The Introduction to Bioinformatics reader is an open source book written in [MyST Markdown](https://mystmd.org/guide/quickstart), compiled using [Jupyter Book 2](https://next.jupyterbook.org/) and published using [GitHub Pages](https://pages.github.com/). Jupyter Book 2 is still in alpha and many of the conventions below are subject to change.

The same sources also build a typeset PDF of the whole book via [typst](https://typst.app/); see [Building the PDF](#building-the-pdf).

## Conventions

Throughout the reader conventions are used to create a uniform whole that is easy to understand by its contributors, making future adjustments an easy task.
Below, these conventions are described. Remember that the [Jupter Book 2 documentation](https://next.jupyterbook.org/start/) contains more information.

---

### Headers & sections
The reader uses headers (#) to aid with structure. A chapter should always start with one top level header (#), followed by a second level header (##).
If a section requires sub-sections, third, fourth, and at most fifth level headers can be used (###, ####, #####, respectively).
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
More information Jupyter Book 2 citations can be found on the [Jupyter Book 2 Documentation](https://next.jupyterbook.org/tutorial/mystmd/#citations) on the BibTex citations in general can be found on [BibTex.org](https://www.BibTex.org/Using/).

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

Self-created imagery has the preference by the WUR to be published under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) licensing and uses the format:
```
{cite}`own_[chapter number]_[year]`.
```
For example:
```
{cite}`own_2_2024`. 
```
for self-created figures in chapter 2.

More information on references and citations can be found in the [Jupyter Book documentation](https://jupyterbook.org/en/stable/reference/cheatsheet.html#citations)

---

#### Cross-references

It may happen that a reference to an earlier or later section is made in the text to aid in the understanding of a topic.
These are cross-references and use labels that can be attached to headers.

The following syntax is used for the creation of header labels:

```none
(chapter[#]_label)=

# Header
```

And a label is cross-referenced to using:

```none
[Any text](#chapter[#]_label)
```

For example, when a cross-reference is to be made to a section about translation, you would add the following label above the header that contains information on translation:

```none
(chapter1_translation)=

# Translation

Information on translation.
```

Which you can then reference to using:

```none
For more information on translation, see the above section [Translation](#chapter1_translation).
```

This will produce a link on the word Translation that leads to the section label called translation in Chapter 1.

For more information on links and cross-referencing, see the [Jupyter Book 2 documentation](https://next.jupyterbook.org/tutorial/mystmd/#links-cross-references).

---
### Glossaries and terms

Each chapter in the book has its own glossary containing that chapter's most important terms and definitions. A glossary is created in the following manner:
```none
:::{glossary}
Entry1
: Definition of Entry1

Entry2
: Definition of Entry2
:::
```

Entries and definitions can be created at will, however, we also use the {term} convention to directly link to entries in glossaries across all chapters.
This is important because {term} can only link to an exact match in a glossary (case sensitive). Consider the following example:

The glossary of a chapter is structured like this:
```none
:::{glossary}
MSA
: **M**ultiple **S**equence **A**lignment - alignment of more than two sequences.

DNA
: **D**eoxyribo**N**ucleic **A**cid
:::
```

The first appearance of the word MSA in the chapter then needs to link to the glossary like so:
```none
Instead, in cases where we want to compare 3 or more sequences with each other, we use a **multiple sequence alignment** ({term}`MSA`).
```

This creates a direct link to the MSA entry in the glossary. Not only does this work for terms for that chapter's glossary,
if a term is found in another chapter's glossary (no duplicate entries allowed),
it will actually link to that chapter's glossary as well!

Only first time appearances of terms get the {term} cross-reference (unless you would really like to stress the importance of a term that appeared earlier in the reader).
This way, later chapters don't get overwhelming with the amount of cross-references to glossaries.

---

### Bibliographies

It is essential that each citation is also included in a bibliography, otherwise the citations will not work.
Bibliographies are included at the end of each chapter, containing only the citations that were used in that chapter.
(The PDF drops these per-chapter lists in favour of a single bibliography in the back matter; nothing needs doing for that, it is handled by the print plugin.)

Adding a bibliography to the end of a markdown file is done by adding the following:

```none
## References

:::{bibliography}
:::
```

This will add all used citations into a bibliography at the bottom of the page.

NOTE: Bibliography customization is currently not possible in Jupyer Book 2. Using the above syntax will create a standard format reference list that cannot be further adjusted.

---

### Comments

When writing or reviewing the markdown files, you may want to leave a comment for yourself or other contributors to see.
The compiler assumes every line that starts with `%` is a comment line.
However, since percentages are used rather frequently, which makes filtering for comments more difficult, a preference has been given to use `%#%[write your comment here]` for commenting.
This makes sure that it is easy to search for comments in a markdown file and that they are not included in the actual output of the compiler.
Comments are put directly beneath a paragraph or figure that you would like to comment on.

For example:

```none
#### Secondary structure prediction

As we have seen in Section X.X, there are key similarities and differences between α-helices and β-sheets.
%#%[Not sure what the Section X.X refers to.]
```

---

### Publishing and deployment

Content reaches `main` through pull requests; a **git tag** is what publishes it.

1. Create a branch and open a pull request against `main`.
2. Every pull request automatically runs the **Build check** workflow, which builds
   the book with the exact MyST version pinned in `package.json` and produces a
   downloadable `site-preview` artifact (kept for 7 days) with the rendered HTML.
3. Merge using **squash merge**. Merging does not publish anything.

#### Cutting a release

Releases are cut with `npm version`, on `main`, by a maintainer:

```none
git checkout main && git pull
npm version patch          # 1.2.3 -> 1.2.4: small fixes or changes
npm version minor          # 1.2.3 -> 1.3.0: larger revision of a chapter
npm version major          # 1.2.3 -> 2.0.0: overhaul affecting the whole reader
git push --follow-tags
```

`npm version` bumps `version` in `package.json`, commits that, and creates the
matching `vX.Y.Z` tag in one step; `--follow-tags` pushes the commit and the tag
together. Do not create version tags by hand — `npm version` is what keeps the tag
and `package.json` in step, and CI rejects a tag that disagrees with either.

Pushing the tag triggers the **Deploy online book** workflow: it checks the tag
against `package.json` and checks the tagged commit is on `main`, then builds the
book two ways in parallel — the website, which it deploys to GitHub Pages, and the
PDF, which it attaches to a GitHub release created with automatically generated
notes. That version is what the sidebar footer shows, because the footer reads
`version` from `package.json` (see `plugins/version-plugin.mjs`).

The release is only cut once *both* the site and the PDF have built, so a broken
PDF blocks the release rather than publishing one without the download the site
links to. The site is still deployed at that point — if the *Build PDF* job is the
only failure, fix it and re-run the failed jobs rather than re-tagging.

Everything merged since the previous tag is published together, so several pull
requests can be stacked and released in one go.

#### Verifying a deploy

- The **Actions** tab shows the run; the *Build and deploy* job's **Build HTML**
  step prints any MyST errors or warnings to fix, and the *Build PDF* job's
  **Build PDF** step prints any typst ones.
- The live reader is at <https://introduction.bioinformatics.nl> (served from
  <https://wur-bioinformatics.github.io/introduction-to-bioinformatics/>).
- Check the version in the sidebar footer and the release list on GitHub.
- Check the release has `BIF20306book.pdf` attached, and that the sidebar's
  **Download the PDF** link fetches it.

#### Building locally

You need Node.js 22 (LTS) and npm. Then:

```none
npm ci            # install the pinned MyST version
npm run start     # live preview at http://localhost:3000 while editing
npm run build     # full HTML build into _build/html (same command CI runs)
```

`make html` and `make start` wrap the same commands.

#### Building the PDF

The book also builds as a single typeset PDF. This additionally needs the
[typst](https://github.com/typst/typst) CLI — `brew install typst`, or a release
binary from that page. Then:

```none
npm run build:pdf  # writes exports/BIF20306book.pdf
```

`make pdf` wraps the same command. The build also leaves the generated typst
source in `exports/`, which is where to look when something renders oddly: the
`.typ` files there are what `typst compile` actually saw. On the first run typst
downloads a few packages it needs; after that the build is offline. `exports/` is
gitignored and rebuilt from scratch every time.

CI builds the PDF too — see [Publishing and deployment](#publishing-and-deployment).

##### How the PDF build differs from the website

Three pieces work together, and it is worth knowing which one to reach for:

- **`templates/bif-book/`** — the typst book template, vendored from
  [plain_typst_book](https://github.com/myst-templates/plain_typst_book) (MIT) so
  it is versioned with the book. `style.typ` holds the page layout, title page,
  chapter openers and numbering; `bif_style.typ` holds everything specific to
  this book — admonition colours, exercise boxes, the video QR macro, the index.
  Page size, fonts, margins and the colophon are set from `options:` under the
  export in `myst.yml`.
- **`plugins/print-plugin.mjs`** — transforms that rewrite the document into the
  subset MyST's typst renderer handles: glossaries, term links, video embeds,
  labels MyST does not emit. Every one of them is inert unless `MYST_PRINT=1`, so
  the website is unaffected; `npm run build:pdf` sets it. Each transform carries a
  comment explaining which MyST gap it works around.
- **`myst.yml`** — the `exports:` block. Chapter titles are overridden there to
  drop the "1. ", "2. " prefixes the web version carries, because typst numbers
  the chapters itself and the introduction is front matter rather than chapter 1.
  The `downloads:` block above it is the other direction: it is what puts the PDF
  in the website's download menu.

##### How readers find the PDF

The built PDF is attached to each GitHub release rather than served from the site.
It is around 65 MB, and release assets do not count against the GitHub Pages
bandwidth allowance, which a cohort of students downloading a copy each otherwise
would. `releases/latest/download/BIF20306book.pdf` always resolves to the newest
release — the same release the deployed site was built from — so the link never
needs updating.

Three places point at it, all using that URL:

- `myst.yml` `downloads:` — the download menu in the page toolbar.
- `components/primary-sidebar-footer.md` — a visible link under the version.
- `intro.md`, at the end of the reading guide.

There is a short window just after a tag is pushed where the site is deployed but
the release is not yet created, and the link 404s. It resolves as soon as the
*Release* job finishes.

##### Writing with the PDF in mind

Almost everything works in both outputs, but two habits matter:

- **Use `{sub}` and `{sup}` roles rather than raw `<sub>`/`<sup>` HTML.** Raw HTML
  happens to survive today, but MyST strips most of it before the typst renderer
  sees it, so it is a silent way to lose content in print.
- **Use the `{iframe}` directive rather than a raw `<iframe>` for videos.** Both
  are turned into a scannable QR code in the PDF, but the directive lets you give
  the video a real title (and a `:placeholder:` still image if you prefer that to
  a QR code). A raw `<iframe>` only offers its `title` attribute, and the ones
  copied from YouTube all say "YouTube video player", which the PDF has to fall
  back to a bare "Video" for.

Cross-references, citations, figures, tables, admonitions, exercises, glossaries
and math all work in both without any special handling.

To keep something out of the PDF entirely — the "download the PDF" note at the end
of the introduction, for instance — wrap it in a block tagged `no-pdf`, which MyST
honours natively:

```none
+++ {"tags": ["no-pdf"]}

This paragraph appears on the website but not in the PDF.

+++
```

The bare `+++` afterwards ends the tagged block; without it everything to the end
of the file inherits the tag.

#### Troubleshooting

- **Build check fails on a PR**: open the failed run's *Build HTML* step; fix the
  reported MyST errors and push again.
- **Build check fails on the version**: the pull request hand-edits `version` in
  `package.json`. Revert that; the version is bumped by `npm version` when the
  release is cut, not in a content pull request.
- **`npm version` refuses with "Git working directory not clean"**: commit or stash
  your local changes first. Releases are cut from a clean, up-to-date `main`.
- **Deploy fails after pushing a tag**: the tag already exists, so fix the cause and
  re-run the workflow (Actions → *Re-run failed jobs*). If the tag itself was wrong,
  delete it locally and on the remote (`git tag -d vX.Y.Z && git push origin
  :refs/tags/vX.Y.Z`) before cutting the release again.
- **"Tag does not match package.json"**: the tag was created by hand rather than by
  `npm version`. Delete it as above and use `npm version`.
- **"Tag points at a commit that is not on main"**: the release was cut from a
  branch. Delete the tag, merge to `main` first, then cut the release there.
- **Merged but nothing was published**: merging never publishes. Cut a release.
