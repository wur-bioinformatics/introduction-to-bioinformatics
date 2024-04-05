# Week 3 - Phylogenetics & tree reconstruction

```{epigraph}

-- Freek T. Bakker (WUR Biosystematics Group), Wageningen, 2024
```
%#% Main remark about this week is that a lot of concepts are presented, which are repeated or further explained in many different sections (same for abbreviations). I have tried to amend this as much as I could. Some sections could do with a rewrite to make this chapter more congruent (merging paragraphs and explaining a concept once and not adding more on to its definition throughout the chapter). Also tried to do this wherever deemed necessary. - When reading through this chapter there should be a clear separation between what should be considered exam material and what is not.
## Rationale

:::{figure} images/Week3/tree-of-life.png
:alt: The Tree of Life
:width: 100%
:name: tree_of_life
The Tree of Life. Dated in millions of years; rooted with Eubacteria. Credits: {cite}`tree_of_life_2022`.
:::
%#% Replaced Figure tree_of_life with a higher resolution variant.
Why should we study phylogenetics and what is it about?
Ever since Darwin we know that all living things are connected in a tapestry of life, forming a phylogenetic tree of everything ({numref}`tree_of_life`).
Phylogenetics aims at understanding evolutionary relationships among genes, species, and higher taxa and as such it is relevant to almost all biological questions.
Why? Because an evolutionary context (rather than a "snapshot" perspective) allows identifying evolutionary lineages and their origins, and can provide information on how lifeforms and sequences change and adapt across millions of years.
Examples are the evolution of gene families within genomes, the build-up of species relationships in a lineage, studying Covid-19 and other pathogen outbreaks ({numref}`sars-cov-2`), studying molecular evolution and the accumulation of substitutions in a multiple sequence alignment (MSA), studying population history within a species, reconstructing historical biogeography. In all these cases having an **accurate phylogenetic tree** is crucial because we want to be able to reconstruct evolutionary lineages (the branches in phylogenetic trees) and how they evolved, changed, duplicated, or went extinct.
By **accurate** we mean estimating relationships that are as close as possible to the actual (historic) relationships, which we cannot know for sure.
As they happened in the past we cannot **prove** them, but they are hypotheses (of relationships) that we can only **corroborate** (confirm, seek support for).
%#% Merged previously separate above and below paragraphs.
:::{figure} images/Week3/sars-cov-2.svg
:alt: The SARS-CoV-2 phylogenetic tree
:width: 100%
:name: sars-cov-2

The SARS-CoV-2 phylogenetic tree, March 2024. Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`sars-cov-2_2018`.
:::

---

%#% Figure sars-cov-2 replaced with an updated SVG. If the file size is too large, can be converted to PNG or JPG.
## Phylogenetic trees: structure & interpretation

Like all trees, phylogenetic trees come with a stem, branches, leaves and ideally a root.
What makes phylogenetic trees special however is that they are actually hypotheses of evolutionary relationships, as outlined in the previous section.
The leaves or external nodes are then the individuals (or sequences) that are observed and compared, which are also referred to as **operational taxonomic units** (OTUs) or terminals.
The branches and nodes are the **lineages** or **clades** (common ancestor with all its descendants) that are inferred, i.e., not observed (this is described in more detail in section [Rooting & clades](rootingandclades)).
The internal nodes in your phylogenetic tree are known as **hypothetical taxonomic units** (HTUs) and the branches are the horizontal lines connecting the OTUs and HTUs, as for instance shown in {numref}`tree_example`.
%#% This paragraph mentions clades, but the explanation for clades is found much later, in the section [Rooting & clades]. - Added a short description of clade to this paragraph and a reference to the [Rooting & clades](rootingandclades) section.
:::{figure} images/Week3/tree-example.png
:alt: Example of a phylogenetic tree with its key components highlighted.
:width: 100%
:name: tree_example

A rooted ultrametric phylogenetic tree with its main parts and characteristics indicated.
Here, the OTUs are GenBank plant chloroplast gene accessions, the names of which have been condensed.
:::
%#% Figure tree_example is derived from tree_types, is tree_types self created image?
Whereas the horizontal lines represent the actual branches, the vertical lines do not have a meaning and are just there to connect the branches and clades; they will get longer when more terminals are included but do not have a relation with the data (i.e., the MSA).
As outlined above, **external nodes** are the actual **individuals** observed; they are never connected directly to each other, only through internal nodes.
These individuals can represent genes, species or higher taxa, but they are never categories (or averages), as characters and states are indivisible observations scored on individuals (see below).
Branches and nodes collectively build the **tree topology**, i.e., the structure of the tree.
%#% Merged information that was originally in this paragraph with the one above. - Need to have a clear separation between the concepts of character states, characters, and states. - Unclear which section is meant when referring to (see below).
One of the most important aspects of a phylogenetic tree is whether it is rooted, meaning whether we can distinguish which nodes are old and which are more recent, and also what clades are present.
Rooting is done by selecting an **outgroup**, which is a reference taxon outside the group of interest (this is described in more detail in section [Rooting & clades](rootingandclades)).
It is important to realise that most phylogenetic reconstruction methods actually produce unrooted trees, which can then rooted using an outgroup to visualize in what direction evolution proceeded and which clades can be identified.

When a phylogenetic tree is known for a specific group, and it is properly rooted, the ancestral states for its characters can in principle be reconstructed (for instance the ancestral amino acid residues in a protein sequence).
With that, evolutionary trends (towards current conditions) can be inferred, enabling the study of character evolution, i.e., how things change over time ({numref}`ancestral_states`).
%#% This paragraph describes ancestral states of characters, without first introducing the concept of character states, rooting or the general make up of a phylogenetic tree. Move this to a section after these concepts have been introduced.
:::{figure} images/Week3/ancestral-states.png
:alt: A phylogenetic tree with ancestral states
:width: 100%
:name: ancestral_states

Comparing species (or genes) in a phylogenetic tree allows inference of ancestral states and evolutionary trends.
:::
%#% Figure ancestral_states is rather blurry. - Self created image? If so, reupload in higher resolution.

---

### Related, diverged

:::{figure} images/Week3/MRCA-mammals.png
:alt: An additive phylogenetic tree rooted at monkey
:width: 100%
:name: MRCA_mammals

Additive phylogenetic tree of mammalian species, rooted on monkey.
The MRCA of monkey, cat and dog is indicated.
Tree topology informs relatedness, branch lengths correspond to divergence. Credits: modified from {cite}`bioinformatics_2007`.
:::
%#% The text describes the MRCA of multiple species combinations, not just dog and bear. Include labels of MRCA for all the species whose relatedness is compared, not just dog and bear? - Imagery from this source (Zvelebil and Baum, 2007) is also used by Rice University in their course material: https://www.cs.rice.edu/~nakhleh/COMP571/.
In a rooted phylogenetic tree, terminals sharing a more recent common ancestor are more closely related than terminals sharing a less recent common ancestor.
Thus, in {numref}`MRCA_mammals`, dog and bear are more related than dog and sea lion, because dog and bear share a more recent common ancestor.
On the other hand, monkey and dog are as related as monkey and cat, because they all share the same **most recent common ancestor** (MRCA, more information in [Rooting & clades](rootingandclades) below).
Being **related** is not the same as being **diverged**, as divergence means the amount of change accumulated since the split of two lineages, which is reflected in the branch lengths.
Raccoon and dog would be more diverged than raccoon and bear, but not more closely related.
%#% Perhaps it would be nice to include that divergence is also expressed as (dis)similarity to help understand this wording in later sections (if that is indeed what is meant)?

---

(trees)=

### Cladogram, additive and ultrametric

Phylogenetic trees come in three flavors: **ultrametric**, **additive**, and **cladogram**.
When all paths starting from the root to each external node are of equal length, you could interpret the length of a path through the tree as proportional to time and thus equally old as other paths; the ages of nodes can then in principle be inferred.
Such a tree is known as an **ultrametric** tree, which can be easily recognised by its topology in which all terminal branches line up.
Another, more common type of phylogenetic tree is the **additive** tree, in which branch lengths are proportional not to time but to the amount of change occurring in your data set (the MSA).
Therefore, the more changes (i.e., substitutions, insertions, deletions) occur for an individual, the longer the branch to its MRCA will be in the additive tree.
Most phylogenetic and tree building platforms or software packages produce additive trees.
Producing ultrametric trees usually requires taking extra steps, with each step introducing uncertainty.
You could argue that ultrametric trees are **one extra step away from the data** compared to additive trees.
Only when the data accumulates substitutions in a strictly clock-like manner (i.e., like radio-active decay) would the ultrametric and additive tree version be the same.
However, such strict molecular clocks are never encountered in real data.
Finally, a **cladogram**-style tree is a "schematic tree" meant to only show the topology of your tree.
It therefore has artificial (equal) branch lengths, including for terminal branches.
:::{figure} images/Week3/tree-types.png
:alt: Examples of Additive and Ultrametric phylogenetic trees and a Cladogram
:width: 100%
:name: tree_types

A rooted phylogenetic tree with its main parts and characteristics indicated.
Here, the OTUs are GenBank plant chloroplast gene accessions, the names of which have been condensed.
For the same data, the tree is given as **additive** tree (top) and as an **ultrametric** tree (bottom left) with branch lengths corresponding to time.
On the right, flipped, the same tree as **cladogram**, with branch lengths only indicating the structure of the trees.
:::
%#% Moved Figure tree_types to this section. - This figure could be much clearer in depicting additive trees and cladograms.

---

### Tree resolution

The resolution of a phylogenetic tree is the extent to which nodes and branches (clades) can be inferred/observed from the tree.
Trees can be **fully-resolved**, in which case each internal node is connected to three branches: the ancestral branch and two subtending branches.
Such trees are called **bi-furcating** or **dichotomous**, meaning that each branch splits into two and there are no uncertainties on branching order or resolution of nodes.
Frequently however, phylogenetic trees will be **partially-resolved** and contain **polytomies**, which are nodes connected to (many) more than three branches.
Polytomies represent parts of the phylogenetic tree that are uncertain in terms of branching order of the lineages involved.
This can be due to there being insufficient information in the MSA for resolving the lineages, or ample but conflicting signal.
Polytomies are usually interpreted as **soft**, meaning that the data used does not allow to resolve the lineages at hand.
In contrast, the **hard** interpretation would be: instantaneous speciation, i.e., an ancestral species lineage split up so fast that the new lineages do not have sufficient unique substitutions to "mark" them and to assign them an internal node in the tree.
An example is the late-Tertiary radiation of mammalian orders, after the fairly quick establishment of cold water around the Earth's poles, combined with that of the hot tropics.
Several published mammalian phylogenetic trees contain unresolved spines or backbones.
On the other hand, [**gene trees**](orthologsandparalogs) (used for studying gene families) may also contain polytomies and they are usually considered as soft (the data is not decisive enough to infer a branching order).
**Whole genome duplications** (auto-polyploidisations) are fairly well known in the evolution of plants and following such an event pairs of genes can be expected to form instantaneously, i.e., without accumulating unique substitutions, and may result in hard polytomies.

:::{figure} images/Week3/polytomies.png
:alt: Hard and soft polytomies
:width: 60%
:name: polytomies

Hard and soft polytomies in a phylogenetic tree.
The soft polytomy can imply different tree resolutions. Credits: {cite}`phylogenetic_approach_1998`.
:::
%#% Figure polytomies is quite blurry. Could be reuploaded in higher resolution (I don't have access to the book). Alternatively, easily able to redraw ourselves?

---

(orthologsandparalogs)=

### Orthologs & paralogs

When the terminals included are actually **gene** or **protein sequences**, the tree will be a **gene tree**, likely containing **homologs** (derived from a common ancestor gene), possibly also **orthologs** and **paralogs**, the latter visualising gene duplications as multiple occurrences of particular terminals on the tree.
**Orthology** is the occurrence of corresponding, homologous (and mostly similar), genes in lineages resulting from speciation.
For instance, human beta globin and chimp beta globin are orthologs.
Usually, these genes will have the same function in different species, but this doesn't need to be the case.
**Paralogy** is the occurrence of similar genes resulting from gene duplication.
For example, proteins from a gene family with different functions in the same species.
{numref}`genic_taxic` illustrates the process of gene duplication followed by speciation (which represents an ideal case) and the challenge with resulting paralogs in phylogenetic analysis, especially when not all members of a gene family have been sampled.

:::{figure} images/Week3/genic-taxic.jpg
:alt: Gene trees evolving in genic and taxic dimensions
:width: 60%
:name: genic_taxic

Gene trees evolve in both a genic dimension (gene duplication, indicated by stars), yielding orthologs A, B, and C, as well as in a taxic dimension (speciation, indicated by circled numbers).
If speciation and gene duplication would keep track with each other (i.e., if they would be synchronous), the full gene tree would be congruent with the species tree topology.
In this tree, for instance A1, A2, and A3 would be paralogs, all in species A, and A1, B1, and C1 would be orthologs.
On the other hand A1, B2, and C3 would be paralogs: "non-corresponding" genes, as a result of gene duplication.
:::
%#% Figure genic_taxic is self created image?
In {numref}`gene_duplication_speciation`, a sequence of events is given involving two duplications and one speciation event that can lead to a set of homologous genes in two species.
Some of these are **orthologs** and some are **paralogs** that have acquired new functions.
A species tree is depicted by the pale blue cylinders, with the branch points (nodes) in the cylinders representing speciation events.
In the ancestral species a gene is present as a single copy and has function α (blue).
At a specfic moment, a gene duplication event occurs within the genome, producing two identical gene copies, one of which subsequently evolves a different function, identified as β (red).
These are paralogous genes.
Later a speciation event occurs, resulting in two species (A and B) both containing genes α and β.
Gene Bα (in species B) subsequently undergoes another duplication event, which after further divergent evolution results in genes Bα and Bγ, the latter with a new function γ (green).
The Bα gene is still functionally very similar to the original gene.
At the end of this period of evolution, all five genes in both species are homologous, with three orthologous pairs: Aβ/Bβ, Aα/Bα, and Aα/Bγ.
The Bα and Bγ genes are paralogous, as are any other combinations except the orthologous pairs.
Note that Aα and Bγ are orthologs despite their different functions, and so if the intention is to study the evolution of a particular functional product, such as the α function, we need to be able to distinguish the Aα/Bα pair from the Aα/Bγ pair.
This can be done using sequence similarity, which would be expected to be greater for the Aα/Bα pair as they will be evolving under almost identical evolutionary pressures.
Errors in functional orthology assignment can easily occur, depending on sequence and functional similarity and whether all related genes have been discovered.
The gene tree inferred from these five genes has multiple occurrences of both species A and B ({numref}`gene_duplication_speciation`B).
:::{figure} images/Week3/gene-duplication-speciation.png
:alt: Evolutionary history of a gene after duplication and speciation events.
:width: 100%
:name: gene_duplication_speciation

The evolutionary history of a gene that has undergone two separate duplication events.
(A) The species tree (large blue cylinders) comprising species A and B and with indicated gene duplication and neo-functionalisation events leading to β and γ functions.
(B) The phylogenetic tree that would be drawn for the resulting 5 genes in (A), here drawn as a cladogram. Credits: {cite}`bioinformatics_2007`.
:::
Consider the trees in {numref}`IL_tree`, a species tree and a gene tree.
There are multiple occurrences of the terminals from the species tree (bovine, sheep, pig etc.) in the gene tree, each grouped with a different Interleukin sequence type.
These are the paralogs that probably resulted from gene duplication events during the proliferation of the IL clade.
In fact, we can deduce that 4 gene duplication events must have happened, to explain the occurrence of for instance "human" at three positions in the gene tree (indicated with green in {numref}`IL_tree`), namely I) in the IL-1α clade, II) in the IL-1rα clade, and III) as a sister pair in the IL-1β clade.
The fourth duplication event would be necessary to assume to explain the IL-1β versus IL-1βm copies.
All gene copies in this tree are homologs, some are orthologs (for instance Human IL-1β and Mouse IL-1β), and some are paralogs (for instance Human IL-1β and Human IL-1βm).

:::{figure} images/Week3/IL-tree.png
:alt: Species tree and a gene tree of mammalian Interleukin-1 genes.
:width: 100%
:name: IL_tree

A species tree based on external evidence (left) and a gene tree based on a comparison of mammalian Interleukin-1 genes (right).
In the gene tree, both alpha and beta copies can be seen, which are probably the result of gene duplications (see {numref}`gene_duplication_speciation`). Credits: {cite}`phylogenetic_approach_1998`.
:::

The tree in {numref}`IL_reconciled` is a so-called **reconciled tree**, which has been inferred as an extended tree that would be necessary to assume in order to explain the position and distribution of all IL sequence types in the gene tree.
Apart from four gene duplications (marked δ{sub}`1`, δ{sub}`2`, δ{sub}`3` and δ{sub}`4`), several **gene losses** too would need to be assumed to explain the pattern in the gene tree in {numref}`IL_tree`.

:::{figure} images/Week3/IL-reconciled.png
:alt: A reconciled tree of the species tree and gene tree of mammalian Interleukin-1 genes.
:width: 100%
:name: IL_reconciled

Reconciled tree for the mammalian interleukin-1 gene tree shown in {numref}`IL_tree`.
Gene losses are indicated in light grey. Of the four duplications required, three are supported by the presence of multiple copies of IL in the same mammal species, and one (δ{sub}`3`) is required to explain the incongruence between IL-1 and mammalian phylogeny. Credits: {cite}`phylogenetic_approach_1998`.
:::

:::{admonition} Box 1: Species tree estimation analysis.
:class: tip
{numref}`embedded_tree` shows an example of multiple gene trees (in color) contributing to the species tree (indicated by black lines) as a result of species tree estimation analysis.
Such analysis is beyond the scope of this course, but it is of course important to always keep in mind at what level your phylogenetic reconstruction is, whether at the species, gene, or even biogeographic area level.
```{figure} images/Week3/embedded-tree.png
:alt: Gene trees embedded in a species tree of western pocket gophers (Geomyidae, Thomomys).
:width: 100%
:name: embedded_tree

Gene trees, in color, embedded in the species tree (black lines) of western pocket gophers (_Geomyidae, Thomomys_). Credits: [CC BY-NC 2.5](http://creativecommons.org/licenses/by-nc/2.5) {cite}`embedded_tree_2009`.
```
:::

---

(nodalsupportthebootstrap)=

### Nodal support in phylogenetic trees: the bootstrap

Not all parts of a phylogenetic tree will be equally well-supported or strong, given our character data (MSA).
In experimental science, usually some statistic measure is used to quantify uncertainty, for instance the mean and standard deviation of outcomes of repeated experiments.
Phylogenetics is not experimental but rather seeks to reconstruct historic patterns that were driven/shaped by evolution.
As outlined earlier in this chapter, the implication is that we cannot **prove** phylogenetic trees nor repeat them, or even know whether we reconstructed the correct one.

What we **can** do is measure the support for the nodes in our phylogenetic tree, given our MSA.
To do this, rather than producing several replicates of our MSA (which will most likely all be identical), we can draw random samples from the MSA and use these **pseudo-replicate data sets** to build trees ({numref}`bootstrap_resampling`).
Repeating this process many times (hundreds or thousands) and summarizing the variation among the trees thus reconstructed, provides insight in the structure of our data and how it supports the nodes in a tree.
It actually measures the sampling **variance about the estimate** of the phylogeny.
This process is called bootstrap analysis and will be further discussed in [Maximum likelihood tree building](MLtreebuilding), after we have covered the characters underlying our trees in the next section.

:::{figure} images/Week3/bootstrap-resampling.png
:alt: Comparison between an unlimited and limited data bootstrap resampling analysis approach.
:width: 100%
:name: bootstrap_resampling

Bootstrap resampling analysis in phylogeny reconstruction.
In case of unlimited data (A), not realistic, a summary of sample-based trees yields sampling variance about the **true phylogeny**.
In case of limited data (B), realistic, only pseudo-samples are available, that summarise sampling variance about the **estimate of true phylogeny**.
:::
%#% Unable to find the original source for Figure bootstrap_resampling.

---

(charactersandtrees)=

## Characters & trees

As outlined above, phylogenetic trees are not directly observed but **inferred**, and represent hypotheses of evolutionary relationship, grouping individuals on the basis of shared history.
The data used for comparison are the homologous sites among a set of sequences (amino acid or nucleotide) that have been aligned in an MSA in which substitutions are made visible ({numref}`MSA`A).
All nucleotide or amino acid substitutions in the MSA, both unique ones (occurring in only a single individual or sequence) and shared ones (occurring in at least two sequences), are used to build the phylogenetic tree.
Invariant characters however, showing no substitutions, are not expected to contribute to the tree building process as they do not contain comparative signal.
Shared substitutions are informative for building the branches of your tree, as they connect individuals (**grouping power**) and hence add to the length of internal branches.
Unique substitutions on the other hand only contribute to the **twigs** or external branch lengths and have no grouping power.
The more shared substitutions occur for a set of sequences in your MSA, the stronger the resulting node in the phylogenetic tree will be supported.

When observing substitutions in an MSA we cannot say which ones are ancestral (occurring already in "deep" ancestors) and which ones are derived (occurring more recently).
But placed in the context of a rooted phylogenetic tree, shared substitutions can actually be shared derived (SD) substitutions, which are known as **synapomorphies** (_syn_=shared, _apo_=derived, _morphy_=character), whereas uniquely derived substitutions are called **autapomorphies** (see {numref}`MSA`B & C).

:::{figure} images/Week3/MSA.png
:alt: Multiple sequence alignments and autapomorphies and synapomorphies.
:width: 100%
:name: MSA

Characters and trees.
A) Multiple sequence alignment (MSA, nucleotides) with examples of shared-derived (S), unique (U) as well as invariant (I) characters indicated; B) MSA containing S, U and I characters; the number of steps per character plus total tree length is indicated when assuming the two trees on the right \(C).
Character state changes for all characters are indicated on the trees and exemplar syn- and autapomorphies are indicated.
Note that character 6 is invariant and therefore does not contribute to any tree.
:::
%#% Figure MSA is quite small and difficult to read (especially the indicated U, I, and S symbols in underneath the MSA). Perhaps rearrange image to display panels underneath each other instead of next to each other? - Self-created figure?
When designing a phylogenetic study, involving the compilation of one or more MSAs, there is usually a choice between adding more **characters** (lengthening the MSA) versus adding more **taxa** (adding more sequences(rows) to the MSA).
Whereas the former is tempting, it is often more useful to add taxa as this allows extra synapomorphies to be realised.
After all, synapomorphies are relative (not absolute) entities: only in the context of other sequences can you actually "see" them.
For instance, when studying a gene family in which duplications have occurred during the evolution of its lineages, many taxa should be included in the MSA in order to capture the duplication events.
Only adding more characters may amplify errors or artefacts caused by taxic under-sampling.
This can lead to incorrectly inferred long branches with seemingly high support for their position and nodes.
%#% Maybe a short description of the difference between characters and taxa would be fitting here? - Added this description.
%#% The parsimony approach was introduced here but lacked explanation. - Moved this paragraph to the [Parsimony analysis] section.

---

(rootingandclades)=

### Rooting & clades

A **clade** is an ancestral node together with all its descendants, which is also referred to as a **monophyletic group**.
We usually refer to the ancestral node of a clade as the inferred **most recent common ancestor** (MRCA).
Of course, there will always be less recent ("deeper") ancestors but they will probably not be informative for recognising and inferring a clade and its relationships, as they are also the ancestor of other clades.
At deep divergences (e.g., herring _versus_ fruit fly), homology and resolution of the characters used may not be clear and sufficient.

Information contained in phylogenetic trees is **hierarchical**, with structures being part of other, more inclusive ones.
Clades are indeed usually nested into each other, i.e., a clade is a subset of a larger clade.
Apart from being nested, clades can also be each other's **sisters**, which means they share an exclusive most recent common ancestor (MRCA) with no other clades included ({numref}`nested_clades`).
Such **sister groups** are highly useful in, for instance, evolutionary and comparative studies, as they represent lineages of exact equal age.
Again, an MRCA together with **all** its descendants is considered to form a clade.
Such a clade can then be the basis of further analysis or classification.
It is good to realise that the clade is based on observations (synapomorphies) and therefore represents **evidence**, whereas classification is in principle subjective (opinion) and an interpretation and use of the clade.
For instance, when any descendant of a clade is left out in a classification, for example _Vertebrates_ being left out from the _Invertebrates_, or birds left out from dinosaurs, the proposed taxon or classification is not monophyletic anymore and is considered a **paraphyletic group** (i.e., an MRCA and not **all** its descendants).
Paraphyletic groups (also referred to as **non-natural groups**) are still in use but not considered to be a proper basis for classification.

When studying gene families and their evolution, it is useful to make comparisons among clades in the gene tree, especially among sister clades, as they are of exactly the same age.
Any differences between them, in terms of substitution rates, sequence bias in composition, or the number of lineages per clade, is then not due to different age of the clades.
In order to make these comparisons it is important to compare monophyletic and not paraphyletic groups as the latter are not directly-comparable or of equal age.

:::{figure} images/Week3/rooted-trees.jpg
:alt: Unrooted and rooted tree depictions.
:width: 100%
:name: rooted_trees

Rooting phylogenetic trees.
(Left) Unrooted tree depicting phylogenetic relationships among a set of yellow and brown bird species; external nodes represent the extant (living, observed) species, each with their morphological synapo- or autapomorphies, the internal nodes represent inferred (unobserved) ancestors.
The tree is fully resolved, as each internal node is connected to three branches.
Looking at the brown and yellow birds at adjacent internal nodes, it is not clear in what direction evolution proceeded and whether brown yielded yellow or rather the other way round.
This becomes possible upon rooting the tree, usually based on comparison with an external reference species.
(Right) Rooted tree; external evidence (not shown) was apparently convincing in placing the root between the yellow and brown birds.
Thus, a new, internally-placed, brown bird is inferred as the MRCA, making the brown birds paraphyletic with regards to the yellow birds, which are now monophyletic.
The grey arrows indicate the time lines, from the brown bird ("root") which is now the MRCA of the entire tree, to the tips where observed species are located. Credits: {cite}`bioinformatics_2007`
:::

Rooting a tree is polarising it, making a distinction in what are old and younger nodes.
When a tree is properly rooted, usually with an outgroup reference taxon outside the group of interest, it is directed in terms of ancestry and clades can be inferred (see {numref}`rooted_trees`, left); Note that unrooted trees, which are non-polarised, in principle do not contain clades but "clans").
In the example in {numref}`rooted_trees`, right, we see that the rooted version of the bird phylogenetic tree seems to contain one extra brown bird.
External evidence (which is not shown in the figure, only the vertical branch on top leading to the outgroup) was apparently convincing in placing the root between the yellow and brown birds.
Thus, a new, internally-placed, brown bird is inferred as the MRCA, to which the outgroup branch can attach.
This however makes the brown birds paraphyletic with regards to the yellow birds, because not all descendants from the brown MRCA are brown, some are yellow.
The yellow birds themselves are now monophyletic.

:::{figure} images/Week3/nested-clades.png
:alt: A depiction of a rooted nested tree and nested and sister clades with MRCA.
:width: 100%
:name: nested_clades

Nested clades and sister clades.
Left, the same rooted tree as in {numref}`rooted_trees`, now with nested clades indicated by orange shapes: the small orange clade is nested in the lager orange one; it is also a sister clade of the green clade; as are the blue and large orange shapes. Credits: modified from {cite}`bioinformatics_2007`.
Right, nested and sister clades with LCA (last common ancestor = MRCA) indicated. Credits: modified from {cite}`nested_clades_2014`.
:::

In {numref}`hcgob` an example is given illustrating how improper rooting affects clades and the overall structure of the tree.
The correct rooting of this tree is indicated in {numref}`hcgob`, which is undisputed and based on external evidence for these species.
Placing the root at the seven possible different positions in the unrooted tree of five terminals shows that only in three cases the (correct) human-chimp-gorilla monophyly is maintained ({numref}`hcgob_roots`).
The other four topologies show extensive conflict, both with each other and with the correct topology.
This indicates that care should be taken in selecting and assigning a suitable outgroup, which can be problematic in the case of isolated long phylogenetic branches (for instance, in protists or zooplankton lineages) or in the case of reconstructing a gene tree.
In that case, one usually considers a copy of the gene of interest with sufficient similarity to be considered homologous, in a far-related evolutionary lineage (such as _Amborella_, for angiosperm plants) as a suitable outgroup for rooting that gene tree.
{numref}`alphaproteobacteria` shows an example of an unrooted tree with additive branch lengths; notice that in such a tree there are no "connectors" (see {numref}`tree_types`) needed.

:::{figure} images/Week3/hcgob.png
:alt: A properly rooted tree and an unrooted version of the same tree, with the proper root indicated.
:width: 60%
:name: hcgob

Rooting phylogenetic trees.
With human (H), chimp \(C), gorilla (G), orang-utan (O) and gibbon (B) indicated, the rooted tree (top) represents the correct tree topology based on external evidence.
The position of this root is indicated, both in the rooted and unrooted tree. Credits: {cite}`phylogenetic_approach_1998`.
:::

:::{figure} images/Week3/hcgob-roots.png
:alt: Seven rooted trees derived from placing the root on a different branch of the unrooted tree.
:width: 100%
:name: hcgob_roots

Rooting phylogenetic trees.
The seven rooted trees that can be derived from the unrooted tree for five sequences in {numref}`hcgob`.
Each rooted tree 1-7 corresponds to placing the root on a different branch of the unrooted tree.
Terminal labels as for {numref}`hcgob`; the orange shape indicates monophyly of human, chimp, and gorilla, when present. Credits: modified from {cite}`phylogenetic_approach_1998`.
:::

:::{figure} images/Week3/alphaproteobacteria.png
:alt: An unrooted tree of a group of alphaproteobacteria.
:width: 100%
:name: alphaproteobacteria

An example of an unrooted tree (of a group of alphaproteobacteria).
color marks indicate groups that may be clades, depending on how the tree may become rooted.
The scale bar indicates substitutions per site. Credits: {cite}`bioinformatics_2007`
:::

---

### Newick tree notation

Phylogenetic trees are graphical structures ("graphs") that are the outcome of phylogenetic reconstruction of sometimes hundreds or thousands of sequences, and especially when using character-based tree search (see below [Main approaches to tree building](mainapproachestotreebuilding)) there can be enormous amounts of "best trees" that all will have to be taken into account, for instance by calculating a consensus tree (see [Tree space and heuristic search methods](treespaceandheuristicsearchmethods)).
In any case, handling large numbers of trees in phylogenetical and bioinformatic analytical pipelines requires the tree graphs to be in a format that can be easily read and produced, as a linear statement.
For this, the Newick notation is commonly used in which brackets describe the structure of the tree.
For instance, the rooted tree in {numref}`hcgob` above would look like `((((H,C)G)O)B)` in Newick notation.
In case the tree has branch lengths, they can be indicated in this notation as well (see also the Newick tree Activity suggested in the Reading guide).

(mainapproachestotreebuilding)=

## Main approaches to tree building

### Character based

Tree building is about finding clades and reconstructing phylogenetic relationships among a group of individuals.
These individuals can represent genes, species or higher taxa, but they are never categories (or averages), as **characters** and **states** are observations on individuals.
Considering one character (i.e., an MSA position, or column) at a time, **character-based** methods (for instance maximum parsimony (MP), maximum likelihood (ML) and Bayesian Inference (BI)) simultaneously compare **all** sequences in an MSA, in order to calculate a score for each character.
The task is then to find the tree with the best overall score across **all** characters.
This score, which is also known as an **optimality criterion**, is a measure of how well the data (the characters in your MSA) fit on to a particular tree under consideration.
This is then repeated with another tree, and again another etc. -**the better the fit, the better the tree**.

---

(treespaceandheuristicsearchmethods)=

#### Tree space and heuristic search methods

The number of possible bifurcating trees increases astronomically with increasing numbers of included taxa (terminals or sequences in your MSA) and cannot be calculated analytically (see [Box 2](w3box2_bifurcating)).
For instance, the total number of unrooted bifurcating trees for 10 and for 30 sequences is $2,027,025$ and $4.95 × 10^{38}$ respectively.
In fact, it quickly becomes practically impossible to compare all possible trees and find the **exact** best one.
To overcome this problem, random trees are generated that serve as starting points for tree search in remote and differently placed parts of the tree space (see below).
Different kinds of branch-swapping local re-arrangements can be used to improve the tree score, and then the best-scoring trees (which can be many) are selected.
Such tree search methods are called **heuristic** (rather than exact), yielding best possible estimates, though not necessarily guaranteed best solutions.
Answers represent estimates, and whether or not the "best tree" is actually found remains an open question.
%#% Unclear what (see below) refers to.
(w3box2_bifurcating)=

:::{admonition} Box 2: Given a set amount of terminals (n), how many bifurcating trees are possible?
:class: tip

This number increases very rapidly with increasing _n_.
Note: the number of unrooted ("unordered") trees follows that of rooted trees.

```{figure} images/Week3/bifurcating.png
:alt: A calculation of how many bifurcating trees are possible, given a number of unrooted and rooted trees.
:width: 100%
:name: bifurcating

Having to assess such large numbers of trees falls under the category of "NP complete" problems which cannot be solved in a lifetime even with unlimited resources.

(Introduction to Bioinformatics, Helsinki CS 2006)
```
:::
%#% Figure bifurcating source references slides from the University of Helsinki, which itself seems to derive from the book Computational Genome Analysis: An Introduction. This book has pretty strict copyrights, however, the image is easily able to be recreated, are we allowed to use this material? (https://www.cs.helsinki.fi/bioinformatiikka/mbi/courses/06-07/itb/slides/itb0607_slides_66-117.pdf) (https://www.cs.helsinki.fi/bioinformatiikka/mbi/courses/06-07/itb/) (https://books.google.nl/books?id=IensoPRVAasC&lpg=PR7&hl=nl&pg=PA344#v=onepage&q&f=false).
These **character-based** tree building methods (as opposed to [**distance-based**](distancebased) methods, are attractive in that trees are made directly from sequence characters, enabling detailed analysis of what characters contribute where in the tree, or reconstructing what ancestral characters (and hence sequences) would have looked like.
This is a powerful feature of character-based tree building methods, which have become dominant in recent years.

---

#### Consensus trees

Following the character-based tree building approach does usually not result in just one best tree, but rather a set of trees that all score best under the optimality criterion applied.
In such case a consensus tree will have to be calculated to efficiently communicate the outcome of the analysis.
In {numref}`consensus` three trees are shown, along with their so-called **strict** consensus and **50% majority-rule** consensus trees which are explained below.
Congruence among trees means that the same nodes (and hence clades) can be found in each tree.
There may be differences, but these do not contradict the other tree topologies.
Trees 1, 2 and 3 are incongruent (i.e., they contain clades that contradict those in the other trees), therefore it is important to apply the right consensus approach in order to visualise the differences between the trees.
**Strict** consensus demands that only identical tree topologies can make it into the strict consensus tree.
As this is not the case (AB,C is present in Trees 1 and 3, but not in 2; note that "AB,C" means there is a clade AB and C is its sister), this part of the strict consensus collapses into the trichotomy (A,B,C).
Likewise, D and E are monophyletic only in Tree 3, therefore this part of the tree collapses in a "deep" trichotomy (D,E, the rest).
For the **50% majority-rule** consensus, the amount of (in)congruence among a set of trees is actually quantified, based on the occurrence of each node in the entire set of trees, and applying a majority-rule threshold.
Thus, in {numref}`consensus` clade AB occurs in Tree 1 and Tree 3 and its group frequency is therefore ⅔ or 67% in the 50% majority-rule consensus tree.
Clade ABC is present in all trees and gets 100%.
DE occurs only once and gets 33%, which is below the majority of 50% and therefore does not occur in the 50% majority-rule consensus tree.

:::{figure} images/Week3/consensus.png
:alt: Three primary trees with their strict and majority-rule consensus trees.
:width: 80%
:name: consensus

Consensus trees.
Three primary trees are shown on top, their strict and 50% majority-rule consensus trees on the bottom. Credits: {cite}`phylogenetic_approach_1998`.
:::

---

(parsimonyanalysis)=

#### Parsimony analysis

The simplest method for character-based tree building is **parsimony analysis** in which, character-by-character, the fit (of each character) onto a candidate tree is counted (see {numref}`parsimony`).
Some characters may have changed only once but did so in multiple sequences (**synapomorphies**, whereas others may have changed several times independently (**homoplasies**).
Some characters may have changed only in one of the sequences (**autapomorphy**) (see above, [Characters & trees](charactersandtrees)).
When all characters in the MSA have been evaluated, the overall score of the fit of the data with that candidate tree is calculated by adding up the changes across all characters (as in {numref}`parsimony`).
Then, another candidate tree is assumed and the process is carried out again.
More and more trees are compared this way until either a single best or a group of **equally most parsimonious** reconstructions remains.
Given the vastness of tree spaces for even moderate numbers of terminals (see [Box 2](w3box2_bifurcating)) this process may take some time to complete.
Usually only heuristic search methods (see [Tree space and heuristic search methods](treespaceandheuristicsearchmethods)) are applied in case of >15 terminals.
%#% Homoplasies are described in the text but not visually represented in a figure.
:::{figure} images/Week3/parsimony.png
:alt: Parsimony analysis, in which character state changes in the MSA are indicated on the resulting trees.
:width: 100%
:name: parsimony

Parsimony analysis (same data and trees as in {numref}`MSA`). Character state changes for all characters in the MSA shown left are indicated on the trees and exemplar syn- and autapomorphies are indicated. Note that character 6 is invariant and therefore does not contribute to any tree. Also note that each substitution occurring in the MSA results in one extra step on the tree.
:::
%#% Again, like Figure MSA, self-created figure?
Each character change can be considered an **ad hoc** assumption, each of them associated with their type I error, or the chance of having a **false positive**.
This would be a character change (substitution) inferred on the tree where no change took place.
The tree that minimises the number of changes also minimises the number of **ad hoc** assumptions, and hence the type I error.
This is the parsimony criterion, that was already described in the 14th century by the Franciscan friar **William of Ockham** ({numref}`ockham`) and has become known as "Occam's razor".
In other words: when presented with competing hypotheses about the same prediction, one should select the solution with the fewest assumptions.

:::{figure} images/Week3/ockham.jpg
:alt: William of Ockham
:width: 40%
:name: ockham

William of Ockham, "father of parsimony", from the 14{sup}`th` century. Credits: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) {cite}`ockham_2022`.
:::
%#% Replaced the image in Figure ockham. The WikiMedia page shows the copyright of the previously used image as under dispute.
In the parsimony approach each substitution leads to an extra "step" on the tree, i.e., it makes the tree one step longer.
Simulation studies have shown that, especially in the case of the combination of short internal branches and long terminal branches, the parsimony approach can give wrong topologies.
The reason for this is that in such long-branch cases **false** synapomorphies can form, producing wrong clades.
After all, long branches mean "many changes" and with a nucleotide alphabet of "only" A, C, G, and T the same nucleotides can easily occur in one MSA position by chance.
This phenomenon has become known as **long-branch attraction** and has been especially challenging in, for instance, the placement of early land plant lineages.
These lineages (e.g., _Amborella_, _Nymphea_) are on long branches in isolated positions in the phylogenetic tree and have proven difficult to place with confidence.
Applying models of nucleotide substitution in sequence divergence estimation and modelling of branch lengths ([Estimating sequence divergence](estimatingsequencedivergence)) has been shown to overcome parts of this problem.

Is nature parsimonious?
This is a commonly-heard question but it is good to keep in mind that the parsimony criterion is applied to **choosing between hypotheses** (trees) and does not assume anything about nature and evolution!
Maximum parsimony methods are included in the software ([MEGA11](https://www.megasoftware.net/){cite}`mega_2021`) used in this week's practical.

Two other important character-based methods for tree building exist: **maximum likelihood** (ML) analysis and **Bayesian Inference** (BI).
Both differ from parsimony analysis in that they do not merely count differences (as in parsimony analysis) but are based on explicit models of character evolution and operate in a probability framework.
ML will be discussed in section [Maximum likelihood tree building](MLtreebuilding) below; BI is beyond the scope of this course and will therefore not be treated here.

---

(distancebased)=

### Distance-based

The other main approach to tree building is **clustering**, which is distance-based, and is widely used in several applications, for instance in visualising BLAST searches as Neighbor Joining trees.
Distance-based means that instead of comparing one character at a time across all sequences in the MSA, only pairwise comparisons of entire sequences are made (i.e., all characters are compared at once), for all possible sequence pairs in the MSA ({numref}`character_distance`).
Pairwise comparisons yield pairwise distances, which can be ultrametric or Euclidean (see [Box 3](w3box3_distances)).
Keep in mind that the relation between Distance ($D$) and Similarity ($S$) is:

$$
1 – D = S
$$

and that in different studies either $D$ or $S$ may be used for comparison.
Which one is used can usually easily be inferred from the resulting pairwise distance matrix diagonals, where each sequence is compared with itself.
There will be all 0's in case of a Distance matrix and 1's in case of a similarity matrix.

If the sequences would have accumulated substitutions in a clock-like manner (i.e., like radio-active decay) the resulting pairwise distances may even be ultrametric.
This would mean that the distances in the triangular pairwise distance matrix are identical with the distances as measured over the resulting distance tree. 
In ({numref}`character_distance`), the parsimony analysis (left) state changes (indicated by the cross-bars) were optimized for each character separately.
Pairwise distances (right) are calculated from the MSA by counting the number of differences in each possible pair of sequences.
This yields a triangular pairwise distance matrix ("distances") and the MSA is not further used in the analysis.
Pairwise distance values are then used to build a distance tree, for instance using [Neighbor Joining](neighborjoining).
In this case the distance values perfectly fit the distance tree.
Note that both trees have the same topology, but the parsimony tree contains more information: in addition to the branching pattern and branch lengths it also contains information on what character changed where on the tree.

:::{figure} images/Week3/character-distance.png
:alt: Comparison between the parsimony and distance approaches in reconstructing a phylogenetic tree of sequences that accumulated substitutions in a clock-like manner. 
:width: 100%
:name: character_distance

Character-based versus distance-based.
The same data set (MSA) of 7 characters observed over 4 terminals (sequenced) analysed using a character-based approach (left, ‘parsimony’) and, using a distance-based approach (right). Credits: {cite}`phylogenetic_approach_1998`.
:::
%#% Long description of figure, with important concepts were being explained here. Moved to the main body of the text.
However, such clean data is hardly ever found, and the distances measured over the tree may differ from the observed distances in the pairwise matrix.
This is illustrated in {numref}`ultrametric_distance` in which two trees are depicted: an ultrametric one (left) and an additive tree (right) containing unequal sister branch lengths (to a and b).
In the additive distance matrix (the matrix on the right), due to the difference in length towards a and b, the most similar sequences may actually not be the most closely related.
%#% Removed the math notation of a and b in this paragraph, as I understand that terminals a and b are meant here, which are not alpha and beta. - The way the last sentence is written might cause the wrong assumption that difference in branch lengths affects relatedness. Perhaps it should be flipped around? (the most closely related sequences may actually not be the most similar/least divergent).
:::{figure} images/Week3/ultrametric-distance.png
:alt: Comparison between ultrametric distance matrix and tree to additive distance matrix and tree.
:width: 100%
:name: ultrametric_distance

Ultrametric distance matrix between four sequences a-d and the corresponding ultrametric tree (left).
Additive distance matrix between four sequences a-d and the corresponding additive tree (right).
Values in the distance matrix correspond to the sum of the branch lengths along the path between the two sequences on the tree, therefore this data is metric.
Note that for the additive matrix the most similar sequences (b and c) are not the most closely related, whereas in the ultrametric matrix a and b are most similar and closest-related. Credits: {cite}`phylogenetic_approach_1998`.
:::

Once these pairwise distances have been calculated, the MSA is not further used and trees are built directly from the distances ({numref}`character_distance`).
Unlike for the character-based trees, in distance-based trees it is not possible to assess what character contributed where on the tree, as all individual characters have been combined into one overall pairwise distance value.
Moreover, invariant characters (MSA positions containing no variation) **do contribute** to the pairwise distance values.
This is a main difference with the character-based approach where only variant characters contribute to the tree.

Clustering methods have the advantage that they are fast and do not require vast computational resources (there is no [tree space](treespaceandheuristicsearchmethods) as for the character-based trees).
Clustering methods assign individuals to clusters in such a way that individuals in one cluster are more similar to each other than to those from other clusters.
There is no explicit score or optimality criterion, only the minimisation of overall distance across all sequences.
Clustering usually produces one tree, no alternative "equally good" trees are shown; this is due to the clustering algorithm which is designed to produce a single tree.

(w3box3_distances)=

:::{admonition} Box 3: Distance measures and their qualities
:class: tip

```{figure} images/Week3/distances.png
:alt: The different distance measures.
:width: 100%
:name: distances

Euclidean or metric distance requires observed distances to be **non-negative**, **symmetrical**, **distinct** and to obey the **triangle inequality** ({numref}`inequality`, left): the distance between any pair of sequences a and b cannot exceed the sum of the distances between those sequences and a third sequence c.
```
%#% Again, removed math notation for a and b.
```{figure} images/Week3/inequality.png
:alt: Metric distances adhering to the triangle inequality and ultrametric distances adhering to the ultrametric inequality.
:width: 100%
:name: inequality

Ultrametric distances are characterised by **ultrametric inequality** ({numref}`inequality`, right): the two largest distances, when comparing three sequences, are equal (in this case 6 = 6).
Ultrametric distances have the attractive characteristic that they evolve clock-like, and hence that the most similar sequences will also be most closely related.
In fact, the ultrametric tree ({numref}`ultrametric_distance`) perfectly describes the observed distances as shown in the distance matrix.
%#% Self-made image? If not, original source is missing.
When distances are additive, the additive tree perfectly describes them ({numref}`ultrametric_distance`, right). However, here sequences b and c have the smallest distance ($d(\text{b,c})=3$), but are not most closely related.
```
:::

---

(neighborjoining)=

#### Neighbor Joining

Probably the most commonly used distance tree building method is Neighbor Joining (NJ), which is fast and effective, especially for large MSAs (with hundreds of sequences).
NJ tree building starts with a fully unresolved tree, containing all sequences in an MSA, and calculates a total tree length (or overall starting distance) by summing all pairwise distances.
Subsequently, a pair of sequences is chosen and combined to start a small cluster ("neighbors") and the total tree length is updated, now replacing the two original by the joined taxa.
This step is repeated until all sequences and pairs are joined, whilst minimising the overall distance (tree length) between them ({numref}`neighbor-joining-kimura`).

Neighbor Joining produces unrooted trees and therefore, if needed, outgroup rooting should be applied in order to root the tree.
There is no molecular clock assumption, which allows differences in branch lengths between neighbors (sisters) to be reconstructed.
NJ is implemented in [MEGA11](https://www.megasoftware.net/){cite}`mega_2021`) and used in the practical.

:::{figure} images/Week3/neighbor-joining-kimura.png
:alt: Stepwise process involved in the neighbor joining computational process.
:width: 100%
:name: neighbor-joining-kimura

Neighbor Joining.
An illustration of the computational process.
Tree length S is the sum of all branch lengths, and is minimised (F) by iteratively joining neighbors, starting from the star tree (A) (From Kimura 2004)
:::
%#% Closest I got to finding the source for Figure neighbor-joining-kimura was: https://www.slideserve.com/ivi/puu-rekonstrueerimise-meetodid, slide 19.
NJ is highly popular as it can generate trees with hundreds of terminals in a very short time.
This makes it a great tool for quickly assessing the (phylogenetic) structure in a data set (MSA) without having to explore wide tree spaces (as in the character-based approach).
It is good to keep in mind that NJ is a clustering method, i.e., it groups sequences on the basis of overall similarity, not on shared ancestry or synapomorphy.
Therefore, for phylogenetic studies, character-based analysis is preferred and NJ analysis can be used in addition, to check for possible incongruencies between the two.
If these are found, it could mean that the data (the synapomorphies accumulated in the MSA) are not metric for that part of the tree, which could warrant additional analysis methods (such as phylogenetic network reconstruction) which is beyond the scope of this course.

:::{figure} images/Week3/neighbor-joining-aa.jpg
:alt: An unrooted Neighbor Joining tree of Mysosin amino acid sequences.
:width: 100%
:name: neighbor_joining-aa

Neighbor Joining.
An unrooted NJ tree based on Myosin amino acid sequences.
The scale bar indicates 5% sequence divergence. Credits: {cite}`neighbor_joining_aa_2000`.
:::
%#% Figure neighbor_joining-aa is not referred to anywhere in the text. Do we want to keep this figure in?

---

(estimatingsequencedivergence)=

## Estimating sequence divergence

As outlined in the section [Parsimony analysis](parsimonyanalysis), phylogenetic reconstruction in case of long terminal branches combined with short internal ones usually poses a problem when using parsimony analysis, where each substitution occurring in the MSA results in one extra step of treelength.
This so-called **long-branch attraction** artefact has been shown to be mitigated to some extent by **modelling branch lengths** (rather than merely counting differences as branch length).
For the accurate estimation of branch lengths in a phylogenetic tree we need accurate **sequence divergence estimation**.
Evolutionary divergence (or distance) between homologous sequences is reflected in substitutions between them since splitting-off from their MRCA.
Intuitively, when comparing two sequences, one would just take the proportion of differing sites as sequence divergence, for instance, for a sequence of 1000 positions, having 10 differences would yield 0.01 or 1% difference.
However, this so-called **$p$-difference** does not necessarily consider **all** substitutions that historically occurred during divergence of the two sequences, which may include reversals to the original state.
Estimating all substitutions that historically happened means that we need to find substitutions that **did** happen but are not visible in your MSA.
Variable sites can actually keep on changing during evolution, causing multiple substitutions to occur at the same position, which can lead to saturation of change.
In this way several substitutions may go unnoticed and a mere $p$-difference will underestimate actual sequence divergence.

---

### Substitution models

Substitution models, all based on the Jukes-Cantor (JC) formula given below, correct divergence estimates for unobserved events.
The JC formula is based on calculation of the chance of having a substitution for a particular site plus the chance of it not changing into any of the three other nucleotides for that site.
In the formula, $p$ stands for the observed proportion of differences (i.e., the $p$-difference), and $d$ for the corrected divergence measure. When all sites differ (i.e., $p = 1$), $d$ reaches 0.75 in the limit, i.e., the corrected $d$ cannot exceed 75%.

$$
d = -\frac{3}{4} \log{\left(1 - \frac{4}{3}p\right)}
$$

{numref}`JC` shows how the JC formula is applied in a **model of substitution**, the JC model.
There is a matrix defining the six possible substitution types among the 4 nucleotide bases, i.e., T↔C, A↔G, A↔T, T↔G, C↔G, and C↔A.
In this case the relative rates for all six substitution types are assumed to be equal and denoted by one shared parameter, named "a".
Another assumption in this model is that the base composition across the MSA is equal, assuming a 25% probability of finding of each base at each position in each sequence.
The JC model is considered a fairly simple, one parameter, model.

:::{figure} images/Week3/JC.png
:alt:
:align: center
:name: JC
The Jukes Cantor model (left), transitions (blue) and transversions (red) and how they accumulate differently during evolutionary time (right) (From Zvelebil & Baum 2008).
:::
%#% Unable to find Figure JC in the credited source. - Part of the figure is found from the Rice University slides (https://www.cs.rice.edu/~nakhleh/COMP571/Slides/Phylogenetics-RecoveringEvolutionaryHistory-Handout.pdf).
:::{figure} images/Week3/neighbor-joining-phylogeny.jpg
:alt:
:width: 100%
:name: neighbor_joining_phylogeny

Building a Neighbor Joining tree on pairwise distances that have been corrected with a best-fitting model of nucleotide substitutions.
:::
%#% Unable to find original source of Figure neighbor_joining_phylogeny, seems to be derived from a book that was also used on this website (https://internet-evoluzzer.de/die-phylogenie-der-wale/) and here (https://slideplayer.com/slide/8230731/), slide 70. - Figure is not referred to anywhere in the text. Do we want to keep this figure in?
The first two substitution types listed above are **transitions** (substitutions among the pyrimidines T and C, and among the purines A and G), whereas the other four occur between purines and pyrimidines and are referred to as **transversions**.
The rate of transitions ($ti$) has a different dynamic, and hence build-up of substitutions, compared with the rate of transversions ($tv$) (see {numref}`JC`).
In the Kimura 2 Parameter (K2P) model ({numref}`K2P`) this is accounted for by adding an extra parameter $b$.
Parameter $a$ now estimates $ti$ (P) and parameter $b$ estimates $tv$ (Q); in the Kimura 2 Parameter formula, P and Q are the proportions of $ti$ and $tv$, respectively:

$$
d = \frac{1}{2} \ln{\left[ \frac{1}{1 - 2P - Q} \right]} + \frac{1}{4} \ln{\left[ \frac{1}{1 - 2Q} \right]}
$$

Besides the JC and K2P models, other models exist that take into account different aspects of DNA sequence evolution, such as differences between all six substitution types (**general time reversible** or GTR), sequence base composition or nucleotide frequencies (**Felsenstein81** or F81), and the distribution of rates of change in sites throughout the MSA: how many fast, and how many slow-evolving sites are there and how are they distributed (this is achieved by comparison with a gamma Γ distribution).
The most complex models, with many parameters, will consist of combinations of all these aspects of DNA sequence evolution.
There are up to 220 different models to choose from.
It is good to realise that these models are reversible and therefore allow the reconstruction of unrooted trees only.
Once these are determined they can be rooted using outgroup rooting.

:::{figure} images/Week3/K2P.png
:alt: The Kimura 2-parameter substitution model.
:width: 50%
:name: K2P

The Kimura 2-parameter substitution model with transitions indicated in orange (parameter $a$) and transversions in blue (parameter $b$).
Note that base frequencies f{sub}`N` are considered equal in this model.
:::
%#% Unable to find the original source for this image. - The resolution of the image is quite low. Maybe recreate this image ourselves?
For amino acid sequence comparisons, instead of estimating parameter values from the data, amino acid substitution models are based on (pre-defined) **substitution cost matrices** that are based on observations of amino acid substitutions found in over 30,000 protein sequences (e.g., the JTT, Blosum, Dayhoff, LG and WAG matrices).

---

(MLtreebuilding)=

## Maximum likelihood tree building

For character-based approaches these substitution models, as they are based on probabilities, allow us to calculate the **likelihood** of our data supporting a particular tree and model.
This likelihood is a score describing how well data, tree and model fit together:

$$
L = Pr(D|H)
$$

Or described in words: the likelihood $L$ is the probability of obtaining the data $D$ given hypothesis $H$, which includes the substitution model **and** tree selected.
We could therefore also say:

$$
L = Pr(\text{MSA} | \text{Tree, substitution model})
$$

Obviously, it is important to select the best fitting model for the data set (MSA).
Model selection proceeds by calculating the likelihood for your MSA using a range of different models and the same tree; the best resulting likelihood scores imply the best-fitting model.

After selecting the best-fitting model, evaluating different trees and model parameter values allows the **Maximum Likelihood estimate** (MLE) to be found, depending on the number of sequences in your MSA (driving the tree space).
The MLE then corresponds to a set of optimal model parameter values, with which the estimated sequence divergence and hence the branch lengths in the best-fitting phylogenetic tree topology can be calculated.
Like most character-based tree building methods, the ML approach too is heuristic.

Phylogenetic tree reconstruction based on MLE has become the dominant tree building approach over the past decade.
It is an efficient method that can consider differences in substitution rates and patterns between the sequences in an MSA.
This would mean that non-clocklike or biased (non-random) accumulation of substitutions would be modelled, and this would minimise possible artefacts in inferring the ML tree topology, for instance branch attraction artefacts.

MLE works as follows. Starting from an MSA ("the data"), first a best-fitting substitution model (e.g., JC, K2P, etc.) is determined.
Subsequently, a candidate tree is considered and the likelihood $L_D$ of observing the data (the MSA) is calculated given that model and that particular tree.
Then, another tree is considered whilst the same best-fitting model remains selected and its parameter values are estimated again.
The likelihood, $L_D$, of observing the data (your MSA) is calculated again and this time the likelihood may actually be better.
More trees are evaluated and more model parameter values are considered, all the time keeping track of $L_D$ until no further increase of $L_D$ can be obtained.
This is usually achieved by using the heuristic tree search approaches as outlined in [Tree space and heuristic search methods](treespaceandheuristicsearchmethods) and depending on the tree space, determined by the number of sequences in the MSA.
The end result is the MLE: the combination of a tree and model parameter values that maximizes the likelihood of the data.
This tree, which may not be the exact best MLE (it is after all heuristics), is then usually referred to as the ML tree.

---

### Model-testing, ML tree search, Bootstrapping

After an ML tree with branch lengths has been obtained, there is still no information on how nodes in the ML tree may differ in terms of support by the data (MSA).
Therefore a bootstrap analysis is carried out, repeating the MLE process a number of times, based on pseudo-replicate data sets drawn from the MSA (see [Nodal support in phylogenetic trees: the bootstrap](nodalsupportthebootstrap)).
After an ML tree is obtained for each pseudo-replicate data set, a 50% majority-rule consensus tree is calculated in order to see the group frequencies (the proportion of replicates in which each node is occurring).
These frequencies are also referred to as **bootstrap values**.
The idea is that the more synapomorphies a node has, the higher its bootstrap value will be.
Unfortunately, there is no simple linear relationship between character support and bootstrap values.
Generally, bootstrap values <90% are considered poor support for that node, and values <50% (or even <60%) as "no support".
Bootstrap values of 62% are usually obtained for MSAs containing one synapomorphy, meaning that such nodes should probably be ignored and collapsed.
{numref}`bootstrap_collapse` illustrates what happens to bootstrap consensus trees when poorly supported nodes are collapsed: the tree topology becomes less well resolved but what is left is strong.

:::{figure} images/Week3/bootstrap-collapse.jpg
:alt: ML tree with bootstrap values and the same ML tree with low support bootstrap values collapsed.
:width: 100%
:name: bootstrap_collapse

Bootstrap analysis.
A) A maximum likelihood tree with bootstrap values indicated at nodes.
Note that not all nodes show a bootstrap value, which is probably because values <50% are ignored.
B) The same analysis, but this time all nodes with bootstrap values <50% collapsed.
Note the introduction of a polytomy containing four lineages resulting from collapsing weak nodes, and the change from additive tree to cladogram style in the collapsed tree. Credits: {cite}`bioinformatics_2007`.
:::

The MLE pipeline for phylogenetic reconstruction is implemented in the software package [IQ-TREE](http://www.iqtree.org/){cite}`iqtree_2020`, which includes I) model testing, II) ML tree search, and III) bootstrapping for both nucleotide and amino acid sequences.
IQ-TREE will be demonstrated and used in the practical.

---

## Recap tree building methods

To summarise, tree building methods can be classified according to the type of data used, characters (or "sites") versus pairwise distance, and depending on whether an explicit model of character evolution is applied versus mere counting (parsimony).
In this course we covered Maximum Likelihood and parsimony, and Neighbor Joining using corrected distances, i.e., applying the character model in pairwise sequence comparison.
Bayesian Inference, in which probabilities for nodes are calculated, and different models are evaluated simultaneously, is beyond the scope of this course.
(If you are interested they are covered in [BIS-30306 Comparative Biology & Systematics](https://wur.osiris-student.nl/onderwijscatalogus/extern/cursus?cursusid=817294&taal=en)).

```{list-table}
:header-rows: 1
:widths: auto

* - Data →
  - Distances (pairwise)
  - Sites (characters)
* - **Approach** ↴
  -
  -
* - Explicit model of character evolution
  - Neighbor Joining \
    Neighbor Network
  - Maximum Likelihood
* - No model of character evolution
  - $p$-difference
  - Parsimony("counting")
* - Criterion?
  - Clustering
  - Optimality criterion
```

---

## Glossary
This glossary contains the most important terms from this week.
:::{admonition} Glossary
:class: important
```{glossary}
Apomorphy
  Derived character state

Autapomorphy
  For a group, all members being derived from one MRCA

Bifurcating
  A tree containing nodes that are all connected through three branches

Bootstrap
  A method for measuring support

Branch length
  The length, either in steps (parsimony), distances (clustering) or substitutions per site (maximum likelihood)

Clade
  Monophyletic group, MRCA with all descendants

GTR
  General time reversible substitution model

JC
  Jukes-Cantor nucleotide substitution model

K2P
  Kimura 2-parameter nucleotide substitution model

Monophyly
  For a group, all members being derived from one MRCA

MLE
  Maximum likelihood estimate

MRCA
  Most recent common ancestor

MSA
  Multiple sequence alignment

Nodal support
  The support -by the characters- for a node in the phylogenetic tree

Paraphyly
  For a group, not all members being derived from one MRCA

p-difference
  Proportional difference, uncorrected

Polytomy
  Part of a phylogenetic tree with nodes connected through >>3 branches

Root
  Reference individual, used for polarising a tree

Synapomorphy
  Shared derived character state
```
:::

---

# References

```{bibliography}
:filter: docname in docnames
:labelprefix: 3W
```