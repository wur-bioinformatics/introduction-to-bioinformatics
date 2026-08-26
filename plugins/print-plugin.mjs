// Print-only transforms for the typst/PDF export.
//
// mystmd's typst renderer has real gaps (verified against mystmd 1.10.1): it has
// no handler for `glossary` or `bibliography` nodes, it writes cross-reference
// labels without escaping so any identifier containing a space produces invalid
// typst (jupyter-book/mystmd#2251), and it drops raw HTML entirely. Rather than
// forking mystmd, this plugin rewrites the document into the subset the typst
// renderer does handle.
//
// Every transform here is a no-op unless MYST_PRINT=1, so `myst build --html`
// and `myst start` produce exactly what they produced before. `npm run build:pdf`
// sets it.

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const PRINT = process.env.MYST_PRINT === "1";

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

// What typst accepts inside an angle-bracket label: letters, numbers, _, -, : and .
const TYPST_SAFE = /^[a-z0-9_:.-]+$/;
const FOLLOWED_BY_WORD = /^[a-zA-Z0-9\-_]/;

// mystmd's normalizeLabel, which is what turns a glossary term into an identifier.
function normalizeIdentifier(label) {
  return label
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/['\u2018\u2019"\u201c\u201d]+/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Canonical spelling of every glossary term, keyed by its identifier.
 *
 * Prose writes terms in whatever case the sentence needs — "the additive tree" —
 * while the glossary defines "Additive tree". in-dexter keys index entries on
 * their text, so without this the index lists the same term twice under two
 * spellings. Reading the definitions up front, rather than collecting them as
 * files are transformed, keeps the result independent of the order MyST happens
 * to process pages in.
 */
const GLOSSARY_FENCE = /^(:{3,}|`{3,})\{glossary\}\s*$/;

function readGlossaryTerms() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const terms = new Map();
  readdirSync(root)
    .filter((name) => name.endsWith(".md"))
    .forEach((name) => {
      const lines = readFileSync(new URL(`../${name}`, import.meta.url), "utf-8").split("\n");
      let fence;
      lines.forEach((line, index) => {
        if (fence) {
          if (line.trimEnd() === fence) {
            fence = undefined;
          } else if (line.trim() && !/^[\s:]/.test(line) && lines[index + 1]?.trimStart().startsWith(":")) {
            terms.set(normalizeIdentifier(line.trim()), line.trim());
          }
          return;
        }
        const match = GLOSSARY_FENCE.exec(line);
        if (match) fence = match[1];
      });
    });
  return terms;
}

const GLOSSARY_TERMS = readGlossaryTerms();

// mystmd only hands plugins { select, selectAll }, so this is local.
function toText(node) {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(toText).join("");
}

// A `raw` node with a `typst` field is written verbatim by the typst renderer.
function rawTypst(value) {
  return { type: "raw", typst: value };
}

// Typst content blocks are delimited by [ ], and # introduces an expression.
function escapeTypstText(value) {
  return String(value).replace(/([\\#\[\]$])/g, "\\$1");
}

function replaceNode(parent, node, replacements) {
  const index = parent.children.indexOf(node);
  if (index < 0) return false;
  parent.children.splice(index, 1, ...replacements);
  return true;
}

/**
 * Walk the tree, calling visit(node, parent). Collected first so that visitors
 * are free to splice their own parent's children.
 */
function walk(utils, tree, type, visit) {
  const pairs = [];
  const recurse = (node, parent) => {
    if (!node || typeof node !== "object") return;
    if (node.type === type) pairs.push([node, parent]);
    node.children?.forEach((child) => recurse(child, node));
  };
  recurse(tree, undefined);
  pairs.forEach(([node, parent]) => visit(node, parent));
}

// ---------------------------------------------------------------------------

/**
 * typst's `include` gives the included file its own scope, so bindings from the
 * main document are invisible inside each chapter. mystmd writes `#import
 * "myst-imports.typ": *` at the top of every chapter file; this adds the book's
 * own import next to it, which both brings in the macros the transforms below
 * emit (videoQR, index) and shadows mystmd's generic admonition and table
 * styling with the book's. The template copies bif_style.typ alongside the
 * chapter files, so the relative path resolves.
 */
const importBookStyle = {
  name: "import-book-style",
  doc: "Import the book's typst styling into every exported article.",
  stage: "document",
  plugin: () => (node) => {
    if (!PRINT) return;
    node.children = [
      rawTypst('#import "bif_style.typ": *\n\n'),
      ...(node.children ?? []),
    ];
  },
};

/**
 * Each article's frontmatter title becomes a level-1 heading in the export, and
 * MyST shifts the body's own headings down to sit under it — but by one level too
 * many, so a chapter's `##` sections land at level 3 and level 2 is never used.
 * Typst then numbers them "2.0.1". Document-stage transforms run after MyST has
 * assigned depths, so the shift can simply be undone here.
 */
const promoteHeadings = {
  name: "promote-headings",
  doc: "Close the gap MyST leaves between an article title and its sections.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    const headings = utils.selectAll("heading", node);
    if (!headings.length) return;
    // Only when the gap is really there — never flatten a document that already
    // has level-2 sections.
    if (headings.some((heading) => heading.depth <= 2)) return;
    headings.forEach((heading) => {
      heading.depth -= 1;
    });
  },
};

/**
 * Let typst number the cross-references.
 *
 * MyST counts figures per source file, flat: chapter 5's figures are 1..50 and
 * so are chapter 1's. It bakes that number into the reference text, while the
 * caption underneath the figure is numbered by typst — so the book would say
 * "see Figure 1" under a figure captioned "Figure 2.1". Replacing a bare
 * `{numref}` with typst's own `@label` reference makes both come from the same
 * counter, and chapter-scoped figure numbers work the way a book expects.
 *
 * Only childless references are converted: those are exactly the bare
 * `{numref}` roles. A `[Box 3.3](#chapter3_bifurcating)` link still carries its
 * own text, and is still a `link` node at this stage anyway.
 *
 * And only references to a figure, table or equation: typst's `@` form needs a
 * numbered element to point at, and fails with "cannot reference text" on the
 * labels this plugin attaches to admonitions and bare `{image}` directives.
 * Those keep MyST's plain link, which is what they render as on the web too.
 */
const typstNativeReferences = {
  name: "typst-native-references",
  doc: "Let typst resolve and number figure and table cross-references.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    const referenceable = new Set(
      ["container", "math"]
        .flatMap((type) => utils.selectAll(type, node))
        .map((target) => target.identifier)
        .filter(Boolean)
    );

    walk(utils, node, "crossReference", (reference, parent) => {
      const { identifier } = reference;
      if (!parent || reference.children?.length) return;
      if (!identifier || !referenceable.has(identifier)) return;
      // `{numref}`blast_overview`A` would otherwise run together into the label
      // `@blast_overviewA`; wrapping it in a content block ends the label.
      const next = parent.children[parent.children.indexOf(reference) + 1];
      const runsOn = next?.type === "text" && FOLLOWED_BY_WORD.test(next.value ?? "");
      replaceNode(parent, reference, [
        rawTypst(runsOn ? `#[@${identifier}]` : `@${identifier}`),
      ]);
    });
  },
};

/**
 * Glossary terms, in one pass: cross-reference links, typst labels, and index
 * entries all key off the same identifier.
 *
 * MyST's normalizeLabel keeps spaces, so `{term}`Tree topology`` gets the
 * identifier `term-tree topology`. myst-to-typst then writes `#link(<term-tree
 * topology>)`, which does not parse — typst's angle-bracket labels only allow
 * letters, numbers, _, -, : and . (jupyter-book/mystmd#2251). Its `#cite`
 * handler already solves this with the `label("...")` form; its `crossReference`
 * handler was never given the same treatment.
 *
 * The identifiers themselves are left alone — MyST resolves cross-references
 * after this stage, and renaming them here just breaks that. Instead the nodes
 * are replaced with raw typst that says what the renderer should have said.
 * myst-to-typst emits no label at all for a definition term, so the anchor these
 * links point at has to be emitted here too.
 */
const glossaryTerms = {
  name: "glossary-terms",
  doc: "Emit typst labels, term links and index entries for glossary terms.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;

    // The definition: the anchor every {term} link points at, and the primary
    // index entry (set in bold by in-dexter's index-main).
    //
    // mystmd's own glossary transform runs *after* document-stage plugins, so
    // these nodes have no identifier yet and it has to be derived here, with the
    // same rule (normalizeLabel, prefixed with "term-") so the two ends match.
    utils.selectAll("glossary definitionTerm", node).forEach((term) => {
      const text = toText(term).trim();
      if (!text) return;
      const identifier = `term-${normalizeIdentifier(text)}`;
      term.children = [
        ...(term.children ?? []),
        rawTypst(` #label("${identifier}")`),
        rawTypst(`#index-main[${escapeTypstText(text)}]`),
      ];
    });

    // The use: a link to that anchor, plus a secondary index entry.
    walk(utils, node, "crossReference", (reference, parent) => {
      const { identifier } = reference;
      if (!parent || !identifier?.startsWith("term-")) return;
      const text = toText(reference).trim();
      if (!text) return;
      // The link keeps the sentence's own wording; the index entry uses the
      // glossary's spelling so both ends land on one entry.
      const entry = GLOSSARY_TERMS.get(identifier.slice("term-".length)) ?? text;
      replaceNode(parent, reference, [
        rawTypst(`#link(label("${identifier}"))[${escapeTypstText(text)}]`),
        rawTypst(`#index[${escapeTypstText(entry)}]`),
      ]);
    });
  },
};

/**
 * Everything else that carries an identifier must already be expressible as a
 * plain typst label. All 178 `:name:` values in the book are, but a new figure
 * name with a space in it would fail deep inside `typst compile`, so say so here.
 */
const checkIdentifiers = {
  name: "check-typst-identifiers",
  doc: "Warn about identifiers typst cannot express as a plain label.",
  stage: "document",
  plugin: (_, utils) => (node, vfile) => {
    if (!PRINT) return;
    ["crossReference", "container", "heading", "math", "span"].forEach((type) => {
      utils.selectAll(type, node).forEach((target) => {
        const { identifier } = target;
        if (!identifier || TYPST_SAFE.test(identifier)) return;
        vfile?.message(
          `Identifier "${identifier}" is not a valid typst label; use only letters, numbers, _, - and .`
        );
      });
    });
  },
};

/**
 * myst-to-typst decides between `*bold*` and `#strong[bold]` by checking whether
 * the next sibling starts with a word character — but its check bails out early
 * for a node at index 0 (`if (!ind) return false`). So `**D**eoxyribo...` at the
 * start of a block comes out as `*D*eoxyribo`, and typst rejects it: a closing
 * `*` has to be at a word boundary. Emit the function form for those directly.
 */
const INLINE_TYPST_FUNCTION = { strong: "strong", emphasis: "emph" };

const fixLeadingInlineMarkup = {
  name: "fix-leading-inline-markup",
  doc: "Emit #strong[...]/#emph[...] where typst cannot parse the shorthand.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    Object.entries(INLINE_TYPST_FUNCTION).forEach(([type, fn]) => {
      walk(utils, node, type, (inline, parent) => {
        if (!parent || parent.children.indexOf(inline) !== 0) return;
        const next = parent.children[1];
        if (next?.type !== "text" || !FOLLOWED_BY_WORD.test(next.value ?? "")) return;
        if (!inline.children?.every((child) => child.type === "text")) return;
        replaceNode(parent, inline, [
          rawTypst(`#${fn}[${escapeTypstText(toText(inline))}]`),
        ]);
      });
    });
  },
};

/**
 * Inline nodes such as `{sub}` are rendered as typst function calls — `log#sub[2]`
 * — and typst then reads a literal `(` or `[` right after one as that call's
 * argument list: `log<sub>2</sub>(TPM+1)` fails with "expected function, found
 * content". Escaping the bracket ends the call. `\(` renders as a plain `(`.
 */
const OPENING_BRACKET = /^([([])/;

const escapeBracketAfterCall = {
  name: "escape-bracket-after-call",
  doc: "Stop typst reading a literal bracket as an inline call's arguments.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    walk(utils, node, "text", (text, parent) => {
      if (!parent) return;
      const index = parent.children.indexOf(text);
      const previous = parent.children[index - 1];
      // Only a preceding non-text node can have emitted a `#...` call.
      if (!previous || previous.type === "text") return;
      const match = OPENING_BRACKET.exec(text.value ?? "");
      if (!match) return;
      text.value = text.value.slice(1);
      parent.children.splice(index, 0, rawTypst(`\\${match[1]}`));
    });
  },
};

/**
 * myst-to-typst writes a blockquote as `#quote(block: true)[...]` and returns
 * without a trailing newline, so whatever follows is glued onto the same line.
 * A following paragraph silently merges into the quote; a following heading is
 * worse — `=== Reading guide` stops being at the start of a line and typst
 * renders the `===` as literal text.
 */
const separateQuotes = {
  name: "separate-quotes",
  doc: "Break the line after a blockquote so the next block still parses.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    const isQuote = (candidate) =>
      candidate.type === "blockquote" ||
      (candidate.type === "container" && candidate.kind === "quote");

    ["blockquote", "container"].forEach((type) => {
      walk(utils, node, type, (quote, parent) => {
        if (!parent || !isQuote(quote) || isQuote(parent)) return;
        replaceNode(parent, quote, [quote, rawTypst("\n\n")]);
      });
    });
  },
};

/**
 * There is no `glossary` handler in myst-to-typst, so the whole node errors out
 * and every chapter glossary vanishes. Its only child is a `definitionList`,
 * which the renderer does handle, so unwrapping it is enough.
 */
const unwrapGlossaries = {
  name: "unwrap-glossaries",
  doc: "Replace glossary nodes with their definition list, which typst can render.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    walk(utils, node, "glossary", (glossary, parent) => {
      if (!parent) return;
      replaceNode(parent, glossary, glossary.children ?? []);
    });
  },
};

/**
 * Each chapter ends with `## References` + a `{bibliography}` directive. There
 * is no `bibliography` handler in myst-to-typst either — but the export writes
 * main.bib and hands it to the template, which emits one APA bibliography in the
 * back matter. So the per-chapter lists are dropped rather than reproduced.
 */
const dropInlineBibliographies = {
  name: "drop-inline-bibliographies",
  doc: "Remove per-chapter reference sections; the template emits one at the end.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    walk(utils, node, "bibliography", (bibliography, parent) => {
      if (!parent) return;
      const index = parent.children.indexOf(bibliography);
      parent.children.splice(index, 1);
      // Drop the "References" heading that introduced it, and any block wrapper
      // left holding nothing.
      for (let i = index - 1; i >= 0; i -= 1) {
        const previous = parent.children[i];
        if (previous.type === "block" && !previous.children?.length) {
          parent.children.splice(i, 1);
          continue;
        }
        if (previous.type !== "heading") break;
        if (!/^references$/i.test(toText(previous).trim())) break;
        parent.children.splice(i, 1);
        break;
      }
    });
    // The directive nodes wrapping them are left empty; harmless, but tidy up.
    utils.selectAll("block", node).forEach((block) => {
      if (block.children?.length === 0) block.children = [];
    });
  },
};

/**
 * myst-to-typst emits no typst label for an admonition (jupyter-book/mystmd#2164)
 * or for a bare `{image}` directive, so every `(chapter5_msms)=`-style anchor on
 * a box, and every `{numref}` to a captionless image, points at nothing and
 * `typst compile` fails outright. Emit the missing anchors.
 *
 * A typst label attaches to whatever precedes it, so the admonition's anchor is
 * a zero-width box at the top of the box — appending the label at the end
 * instead silently steals the label off a figure that ends the admonition. A
 * bare image is always followed by a paragraph break, so its label necessarily
 * lands just after it, which is close enough to jump to.
 */
const addMissingLabels = {
  name: "add-missing-labels",
  doc: "Emit typst labels for admonitions and bare images.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;

    utils.selectAll("admonition", node).forEach((admonition) => {
      if (!admonition.identifier) return;
      admonition.children = [
        rawTypst(`#box(width: 0pt)#label("${admonition.identifier}")\n`),
        ...(admonition.children ?? []),
      ];
    });

    walk(utils, node, "image", (image, parent) => {
      // Images inside a figure are labelled by the container handler already.
      if (!parent || !image.identifier || parent.type === "container") return;
      replaceNode(parent, image, [image, rawTypst(`#label("${image.identifier}")`)]);
    });
  },
};

/**
 * The book embeds YouTube videos two ways: raw <iframe> HTML and the {iframe}
 * directive. Neither survives to paper — MyST strips raw HTML before the typst
 * renderer ever sees it, and the {iframe} handler renders nothing unless a
 * :placeholder: image was given. Both become a QR code the reader can scan.
 */
const YOUTUBE_SRC = /(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/;

function youtubeShortUrl(src) {
  const match = YOUTUBE_SRC.exec(src ?? "");
  return match ? `https://youtu.be/${match[1]}` : undefined;
}

function videoQRNode(url, title) {
  // Trailing newlines keep following prose from running on after the call.
  return rawTypst(`#videoQR("${url}", [${escapeTypstText(title)}])\n\n`);
}

const videosToQrCodes = {
  name: "videos-to-qr-codes",
  doc: "Replace video embeds with a scannable QR code.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;

    // The {iframe} directive.
    walk(utils, node, "iframe", (iframe, parent) => {
      if (!parent) return;
      const url = youtubeShortUrl(iframe.src);
      if (!url) return;
      const title = iframe.title?.replace(/YouTube video player/i, "").trim();
      replaceNode(parent, iframe, [videoQRNode(url, title || "Video")]);
    });

    // Raw <iframe> HTML, and the <div class="videoWrapper"> some are wrapped in.
    walk(utils, node, "html", (html, parent) => {
      if (!parent) return;
      const value = html.value ?? "";
      const url = youtubeShortUrl(value);
      if (url) {
        const titleMatch = /title="([^"]*)"/.exec(value);
        const title = titleMatch?.[1]?.replace(/YouTube video player/i, "").trim();
        replaceNode(parent, html, [videoQRNode(url, title || "Video")]);
        return;
      }
      if (/^\s*<\/?div\b/i.test(value)) {
        replaceNode(parent, html, []);
      }
    });
  },
};

/**
 * mystmd's typst renderer errors with "Unknown admonition kind" on a generic
 * {admonition} and drops the whole box. Chapter 3's numbered "Box 3.x" callouts
 * and chapter 5's Box 5.15 are all of this shape; give them a kind so they render.
 */
const kindGenericAdmonitions = {
  name: "kind-generic-admonitions",
  doc: "Give bare {admonition} directives a kind so typst can render them.",
  stage: "document",
  plugin: (_, utils) => (node) => {
    if (!PRINT) return;
    utils.selectAll("admonition", node).forEach((admonition) => {
      if (!admonition.kind) admonition.kind = "note";
    });
  },
};

const plugin = {
  name: "print",
  doc: `Print-only transforms for the typst export (book version ${version}). Inactive unless MYST_PRINT=1.`,
  transforms: [
    importBookStyle,
    promoteHeadings,
    typstNativeReferences,
    glossaryTerms,
    checkIdentifiers,
    fixLeadingInlineMarkup,
    escapeBracketAfterCall,
    addMissingLabels,
    separateQuotes,
    unwrapGlossaries,
    dropInlineBibliographies,
    videosToQrCodes,
    kindGenericAdmonitions,
  ],
};

export default plugin;
