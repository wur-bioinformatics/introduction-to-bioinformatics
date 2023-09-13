# Week 3 - Phylogenetics & tree reconstruction

```{epigraph}

-- Freek T. Bakker (WUR Biosystematics Group), Wageningen, 2023
```

## Rationale

Why should we study phylogenetics and what is it about? 
Ever since Darwin we know that all living things are connected in a *tapestry of life*, forming a phylogenetic tree of everything (Fig 1.1a). 
Phylogenetics aims at understanding evolutionary relationships among genes, species and higher taxa and as such it is relevant to almost all biological questions. 
Why? Because an evolutionary context (rather than a "snap-shot" perspective) allows identifying evolutionary lineages and their origins, and can provide information on how living forms and sequences change and adapt across millions of years. 
Examples are the evolution of gene families within genomes, the build-up of species relationships in a lineage, studying Covid-19 and other pathogen outbreaks (Fig 1.1b), studying molecular evolution and the accumulation of substitutions in a multiple sequence alignment (MSA), studying population history within a species, reconstructing historical biogeography: in all these cases having an *accurate phylogenetic tree* is crucial, because we want to be able to reconstruct evolutionary lineages (the branches in phylogenetic trees) and how they evolved, changed, duplicated or went extinct.

By *accurate* we mean estimating relationships that are as close as possible to the actual (historic) relationships, which we cannot know for sure.
As they happened in the past we cannot *prove* them, but they are hypotheses (of relationships) that we can only *corroborate* (confirm, seek support for).

When a phylogenetic tree is known for a specific group, and it is properly-rooted, the ancestral states for its characters can in principle be reconstructed (for instance the ancestral amino acid residues in a protein sequence). 
With that, evolutionary trends (towards current conditions) can be inferred, enabling the study of character evolution, i.e. how things change over time (Fig 1.2).

## Phylogenetic trees: structure & interpretation

Like all trees, phylogenetic trees come with a stem, branches, leaves and ideally a root. 
What makes phylogenetic trees special however is that they are actually hypotheses of evolutionary relationships, as outlined in the previous section. 
The leaves are then the individuals (or sequences) that are observed and compared, which are also referred to as *operational taxonomic units* (OTU's) or terminals. 
The branches and nodes are the *lineages* or *clades* (see below) that are inferred – i.e. not observed. 
They are the horizontal lines connecting the OTU's and HTU's (*hypothetical taxonomic units*) in your phylogenetic tree, as for instance shown in Fig 2.1.

Whereas the horizontal lines represent the actual branches, the vertical lines do not have a meaning and are just there to connect the branches and clades; they will get longer when more terminals are included but do not have a relation with the data (i.e. the multiple sequence alignment or MSA). 
Branches are connected via *nodes*, that can be internal or external, with *internal nodes* representing *hypothetical ancestors* (also known as HTU's), that are not observed or sequenced but inferred or reconstructed. 
As outlined above, *external nodes* are the actual *individuals* observed; they are never connected directly to each other, only through internal nodes. 
These individuals can represent genes, species or higher taxa, but they are never categories (or averages), as characters and states are indivisible observations scored on individuals (see below). 
Branches and nodes collectively build the *tree topology*, i.e. the structure of the tree.

One of the most important aspects of a phylogenetic tree is whether it is rooted, meaning whether we can distinguish which nodes are old and which are more recent, and also what clades are present. 
Rooting is done by selecting an *outgroup*, which is a reference taxon outside the group of interest (this will be dealt with here in section 3.1 below). 
It is important to realise that most phylogenetic reconstruction methods actually produce unrooted trees, which are then rooted using an outgroup.

### Related, diverged

In a rooted phylogenetic tree, terminals sharing a more recent common ancestor are more closely related than terminals sharing a less recent common ancestor. 
Thus, in Fig 2.2, dog and bear are more related than dog and sea lion, because dog and bear share a more recent common ancestor. 
On the other hand, monkey and dog are as related as monkey and cat, because they all share the same *most recent common ancestor* (MRCA, and see 3.1 below). 
Being *related* is not the same as being *diverged*, as divergence means the amount of change accumulated since the split of two lineages, which is reflected in the branch lengths. 
Raccoon and dog would be more diverged than raccoon and bear, but not more closely related.

### Cladogram, additive and ultrametric

Phylogenetic trees come in three flavours: *ultrametric*, *additive*, and *cladogram*. 
When all paths starting from the root to each external node are of equal length, you could interpret the length of a path through the tree as proportional to time and thus equally old as other paths; the ages of nodes can then in principle be inferred. 
Such a tree is known as an *ultrametric* tree, which can be easily recognised by its topology in which all terminal branches line up. 
Another, more common type of phylogenetic tree is the *additive* tree, in which branch lengths are proportional not to time but to the amount of change occurring in your data set (the MSA).
Therefore, the more changes (i.e. substitutions, insertions, deletions) occur for an individual, the longer the branch to its MRCA will be in the additive tree. 
Most phylogenetic and tree building platforms or software packages produce additive trees. 
Producing ultrametric trees usually requires taking extra steps, with each step introducing uncertainty. 
You could argue that ultrametric trees are *one extra step away from the data* compared to additive trees. 
Only when the data accumulates substitutions in a strictly clock-like manner (i.e. like radio-active decay) would the ultrametric and additive tree version be the same. 
However, such strict molecular clocks are never encountered in real data. 
Finally, a *cladogram*-style tree is a "schematic tree" meant to only show the topology of your tree. 
It therefore has artificial (equal) branch lengths, including for terminal branches.

### Tree resolution

The resolution of a phylogenetic tree is the extent to which nodes (clades) can be inferred /observed from the tree. 
Trees can be *fully resolved*, in which case each internal node is connected to three branches: the ancestral branch and two subtending branches. 
Such trees are called *bi-furcating* or *dichotomous*, meaning that each branch splits into two and there are no uncertainties on branching order or resolution of nodes. 
Frequently however, phylogenetic trees will be *partly resolved* and contain *polytomies*, which are nodes connected to (many) more than three branches. 
Polytomies represent parts of the phylogenetic tree that are uncertain in terms of branching order of the lineages involved. 
This can be due to there being insufficient information in the MSA for resolving the lineages, or ample but conflicting signal. 
Polytomies are usually interpreted as *soft*, meaning that the data used does not allow to resolve the lineages at hand. 
In contrast, the *hard* interpretation would be: instantaneous speciation, i.e. an ancestral species lineage split up so fast that the new lineages do not have sufficient unique substitutions to "mark" them and to assign them an internal node in the tree. 
An example is the late-Tertiary radiation of mammalian orders, after the fairly quick establishment of cold water around the Earth's poles, combined with that of the hot tropics. 
Several published mammalian phylogenetic trees contain unresolved spines or backbones. 
On the other hand, *gene trees* (used for studying gene families, see below) may also contain polytomies and they are usually considered as soft (the data is not decisive enough to infer a branching order). 
*Whole genome duplications* (auto-polyploidisations) are fairly well known in the evolution of plants and following such an event pairs of genes can be expected to form instantaneously, i.e. without accumulating unique substitutions, and may result in hard polytomies.

### Orthologs & paralogs

When the terminals included are actually *gene* or *protein sequences*, the tree will be a *gene tree*, likely containing *homologs* (derived from a common ancestor gene), possibly also *orthologs* and *paralogs*, the latter visualising gene duplications as multiple occurrences of particular terminals on the tree. 
*Orthology* is the occurrence of corresponding, homologous (and mostly similar), genes in lineages resulting from speciation. 
For instance, human beta and chimp beta globin are orthologs. 
Usually, these genes will have the same function in different species, but this doesn't necessary be the case. 
*Paralogy* is the occurrence of similar genes resulting from gene duplication. 
For example, proteins from a gene family with different functions in the same species. 
Fig. 2.5 illustrates both the taxic (speciation, indicated by stars) and genic (duplication) dimensions of gene trees. 
If speciation would keep track with gene duplication, a perfect multi-copy "full" gene tree would be the result, in which the species tree topology can be easily recognised. 

In this tree, for instance A1, A2 and A3 would be paralogs, all in species A, and A1, B1 and C1 would be ortologs. 
On the other hand A1, B2 and C3 would be paralogs: "non-corresponding" genes, as a result of gene duplication.

In Figure 2.6 a sequence of events is given involving two duplication and one speciation event that can lead to a set of homologous genes in two species. 
Some of these are *orthologs* and some are *paralogs* that have acquired new functions. 
A species tree is depicted by the pale blue cylinders, with the branch points (nodes) in the cylinders representing speciation events. 
In the ancestral species a gene is present as a single copy and has function α (blue). 
At some time, a gene duplication event occurs within the genome, producing two identical gene copies, one of which subsequently evolves a different function, identified as β (red). 
These are paralogous genes. 
Later a speciation event occurs, resulting in two species (A and B) both containing genes α and β. 
Gene Bα (in species B) subsequently undergoes another duplication event, which after further divergent evolution results in genes Bα and Bγ, the latter with a new function γ (green). 
The Bα gene is still functionally very similar to the original gene. 
At the end of this period of evolution, all five genes in both species are homologous, with three orthologous pairs: Aβ/Bβ, Aα/Bα, and Aα/Bγ. 
The Bα and Bγ genes are paralogous, as are any other combinations except the orthologous pairs. 
Note that Aα and Bγ are orthologs despite their different functions, and so if the intention is to study the evolution of a particular functional product, such as the α function, we need to be able to distinguish the Aα/Bα pair from the Aα/Bγ pair. 
This can be done using sequence similarity, which would be expected to be greater for the Aα/Bα pair as they will be evolving under almost identical evolutionary pressures. 
Errors in functional orthology assignment can easily occur, depending on sequence and functional similarity and whether all related genes have been discovered. 
The gene tree inferred from these 5 genes has multiple occurrences of both species A and B (Fig 2.6b).

Consider the trees in Fig 2.7, a species tree and a gene tree. 
There are multiple occurrences of the terminals from the species tree (bovine, sheep, pig etc.) in the gene tree, each grouped with a different Interleukin sequence type. 
These are the paralogs, that probably resulted from gene duplication events during the proliferation of the IL clade. 
In fact, we can deduce that 4 gene duplication events must have happened, to explain the occurrence of for instance "human" at three positions in the gene tree (indicated with green highlight in Fig. 2.6), namely i) in the IL-1α clade, ii) in the IL-1rα clade, and iii) as a sister pair in the IL-1β clade. 
The fourth duplication event would be necessary to assume to explain the IL-1β versus IL-1βm copies. 
All gene copies in this tree are homologs, some are orthologs (for instance Human IL-1β and Mouse IL-1β), and some are paralogs (for instance Human IL-1β and Human IL-1βm). 

The tree in Fig 2.8 is a so-called *reconciled tree*, which has been inferred as an extended tree that would be necessary to assume in order to explain the position and distribution of all IL sequence types in the gene tree. 
Apart from four gene duplications (marked δ{sub}`1`, δ{sub}`2`, δ{sub}`3` and δ{sub}`4`), several *gene losses* too would need to be assumed to explain the pattern in the gene tree in Fig. 2.7.

When our individuals are meant to represent species, it would in principle be a *species tree*. 
Fig 2.9 shows an example of multiple gene trees (in colour) contributing to the species tree (indicated by black lines) as a result of *species tree estimation* analysis. 
Such analysis is beyond the scope of this course, but it is of course important to always keep in mind at what level your phylogenetic reconstruction is, whether at the species, gene, or even biogeographic area level.

### Nodal support in phylogenetic trees: the bootstrap

Not all parts of a phylogenetic tree will be equally well-supported or strong, given our character data (MSA). 
In experimental science, usually some statistic measure is used to quantify uncertainty, for instance the mean and standard deviation of outcomes of repeated experiments. 
Phylogenetics is not experimental but rather seeks to reconstruct historic patterns that were driven/shaped by evolution. 
As outlined at the beginning of this chapter, the implication is that we cannot *prove* phylogenetic trees nor repeat them, or even know whether we reconstructed the correct one.

What we *can* do is measure the support for the nodes in our phylogenetic tree, given our MSA. 
To do this, rather than producing several replicates of our MSA (which will most likely all be identical), we can draw random samples from the MSA and use these *pseudo-replicate data sets* to build trees (Fig. 2.10). 
Repeating this process many times (hundreds or thousands) and summarizing the variation among the trees thus reconstructed, provides insight in the structure of our data and how it supports the nodes in a tree. 
It actually measures the sampling *variance about the estimate* of the phylogeny. 
This process is called bootstrap analysis and will be further discussed in section 6, after we have covered the characters underlying our trees in the next chapter.

## Characters & trees

As outlined above, phylogenetic trees are not directly observed but *inferred*, and represent hypotheses of evolutionary relationship, grouping individuals on the basis of shared history. 
The data used for comparison are the homologous sites among a set of sequences (amino acid or nucleotide) that have been aligned in a multiple sequence alignment (MSA) in which substitutions are made visible (Fig 3.1). 
All nucleotide or amino acid substitutions in the MSA, both unique ones (occurring in only a single individual or sequence) and shared ones (occurring in at least two sequences), are used to build the phylogenetic tree. 
Invariant characters however, showing no substitutions, are not expected to contribute to the tree building process as they do not contain comparative signal. 
Shared substitutions are informative for building the branches of your tree, as they connect individuals (*grouping power*) and hence add to the length of internal branches. 
Unique substitutions on the other hand only contribute to the *twigs* or external branch lengths and have no grouping power. 
The more shared substitutions occur for a set of sequences in your MSA, the stronger the resulting node in the phylogenetic tree will be supported.

When observing substitutions in an MSA we cannot say which ones are ancestral (occurring already in "deep" ancestors) and which ones are derived (occurring more recently). 
But placed in the context of a rooted phylogenetic tree, shared substitutions can actually be shared derived (SD) substitutions, which are known as *synapomorphies* (*syn*=shared, *apo*=derived, *morphy*=character), whereas uniquely derived substitutions are called *autapomorphies* (see Fig. 3.1).

When designing a phylogenetic study, involving the compilation of one or more MSAs there is usually a choice between adding more *characters* versus adding more *taxa* (sequences). 
Whereas the former is tempting, it is often more useful to add taxa as this allows extra synapomorphies to be realised. 
After all, synapomorphies are relative (not absolute) entities: only in the context of other sequences can you actually "see" them. 
For instance, when studying a gene family in which duplications have occurred during the evolution of its lineages, many taxa should be included in the MSA in order to capture the duplication events. 
Only adding more characters may amplify errors or artefacts caused by taxic under-sampling. 
This can lead to incorrectly inferred long branches with seemingly high support for their position and nodes.

In Chapter 5 we will focus on the estimation of branch lengths using modelling of nucleotide or amino acid changes. 
In the parsimony approach each substitution leads to an extra "step" on the tree, i.e. makes the tree one step longer. 
Simulation studies have shown that, especially in the case of the combination of short internal branches and long terminal branches, the parsimony approach can give wrong topologies. 
The reason for this is that in such long-branch cases *false* synapomorphies can form, producing wrong clades. 
After all, long branches mean "many changes" and with a nucleotide alphabet of "only" A, C, G and T the same nucleotides can easily occur in one MSA position by change. 
This phenomenon has become known as *long branch attraction* and has been especially challenging in, for instance, the placement of early land plant lineages. 
These lineages (i.e. *Amborella*, *Nymphea*) are on long branches in isolated positions in the phylogenetic tree and have proven difficult to place with confidence. 
Applying models of nucleotide substitution in sequence divergence estimation and modelling of branch lengths (Chapter 5) has been shown to overcome parts of this problem.

### Rooting & clades

A *clade* is an ancestral node together with all its descendants, which is also referred to as a *monophyletic group*. 
We usually refer to the ancestral node of a clade as the inferred *most recent common ancestor* (MRCA). 
Of course, there will always be less recent ("deeper") ancestors but they will probably not be informative for recognising and inferring a clade and its relationships, as they are also the ancestor of other clades. 
At deep divergences (i.e. herring *versus* fruit fly), homology and resolution of the characters used may not be clear and sufficient. 

Information contained in phylogenetic trees is *hierarchical*, with structures being part of other, more inclusive, ones. 
Clades are indeed usually nested into each other, i.e. a clade is a subset of a larger clade. 
Apart from being nested, clades can also be each other's *sisters*, which means they share an exclusive most recent common ancestor (MRCA) with no other clades included (Fig 3.3). 
Such *sister groups* are highly useful in, for instance, evolutionary and comparative studies, as they represent lineages of exact equal age.
Again, a MRCA together with *all* its descendants is considered to form a clade. 
Such a clade can then be the basis of further analysis or classification. 
It is good to realise that the clade is based on observations (synapomorphies) and therefore represents *evidence*, whereas classification is in principle subjective (opinion) and an interpretation and use of the clade. 
For instance, when any descendant of a clade is left out in a classification, for example *Vertebrates* being left out from the *Invertebrates*, or birds left out from dinosaurs, the proposed taxon or classification is not monophyletic anymore and is considered a *paraphyletic group* (i.e. a MRCA and not *all* its descendants). 
Paraphyletic groups (also referred to as *non-natural groups*) are still in use but not considered to be a proper basis for classification. 

When studying gene families and their evolution, it is useful to make comparisons among clades in the gene tree, especially among sister clades, as they are of exactly the same age. 
Any differences between them, in terms of substitution rates, sequence bias in composition, or the number of lineages per clade, is then not due to different age of the clades. 
In order to make these comparisons it is important to compare monophyletic and not paraphyletic groups as the latter are not directly-comparable or of equal age.

Rooting a tree is polarising it, making a distinction in what are old and younger nodes. 
When a tree is properly rooted, usually with an outgroup reference taxon outside the group of interest, it is therefore directed in terms of ancestry and clades can be inferred (see Fig. 3.2; Note that unrooted trees, which are non-polarised, in principle do not contain clades but "clans"). 
In the example in Fig. 3.2 we see that the rooted version of the bird phylogenetic tree seems to contain one extra brown bird. 
External evidence (which is not shown in the Figure, only the vertical branch on top leading to the outgroup) was apparently convincing in placing the root between the yellow and brown birds. 
Thus, a new, internally-placed, brown bird is inferred as MRCA, to which the outgroup branch can attach. 
This however makes the brown birds paraphyletic with regards to the yellow birds, because not all descendants from the brown MRCA are brown, some are yellow. 
The yellow birds themselves are now monophyletic.

In Fig 3.4 an example is given illustrating how improper rooting affects clades and the overall structure of the tree. 
The correct rooting of this tree is indicated in Fig 3.4, which is undisputed and based on external evidence for these species. 
Placing the root at the seven possible different positions in the unrooted tree of five terminals shows that only in three cases the (correct) human-chimp-gorilla monophyly is maintained (Fig 3.5). 
The other four topologies show extensive conflict, both with each other and with the correct topology. 
This indicates that care should be taken in selecting and assigning a suitable outgroup, which can be problematic in the case of isolated long phylogenetic branches (for instance, in protists or zooplankton lineages) or in the case of reconstructing a gene tree. 
In that case, one usually considers a copy of the gene of interest with sufficient similarity to be considered homologous, in a far-related evolutionary lineage (such as *Amborella*, for angiosperm plants) as a suitable outgroup for rooting that gene tree. 
Fig 3.6 shows an example of an unrooted tree with additive branch lengths; notice that in such a tree there are no "connectors" (see Fig 2.1) needed.

### Newick tree notation

Phylogenetic trees are graphical structures ("graphs") that are the outcome of phylogenetic reconstruction of sometimes hundreds or thousands of sequences, and especially when using character-based tree search (see below Chapter 4) there can be enormous amounts of "best trees" that all will have to be taken into account, for instance by calculating a consensus tree (see 4.1.1). 
In any case, handling large numbers of trees in phylogenetical and bioinformatic analytical pipelines requires the tree graphs to be in a format that can be easily read and produced, as a linear statement. 
For this, the Newick notation is commonly used in which brackets describe the structure of the tree. 
For instance, the rooted tree in Fig 3.4 above would look like `((((H,C)G)O)B)` in Newick notation. 
In case the tree has branch lengths, they can be indicated in this notation as well (see also the Newick tree Activity suggested in the Reading guide).

## Main approaches to tree building

### Character based

Tree building is about finding clades and reconstructing phylogenetic relationships among a group of individuals. 
These individuals can represent genes, species or higher taxa, but they are never categories (or averages), as *characters* and *states* are observations on individuals. 
Considering one character (i.e. a MSA position, or column) at a time, *character-based* methods (for instance maximum parsimony (MP), maximum likelihood (ML) and Bayesian Inference (BI)) simultaneously *compare all sequences* in a MSA, in order to calculate a score for each character. 
The task is then to find the tree the with best overall score *across all characters*. 
This score, which is also known as an *optimality criterion*, is a measure of how well the data (the characters in your MSA) fit on to a particular tree under consideration. 
This is then repeated with another tree, and again another etc. -*the better the fit, the better the tree*. 

#### Tree space and heuristic search methods

The number of possible bifurcating trees increases astronomically with increasing numbers of included taxa (terminals or sequences in your MSA) and cannot be calculated analytically (see Box 1). 
For instance, the total number of unrooted bifurcating trees for 10 and for 30 sequences is $2,027,025$ and $4.95 × 10^{38}$ respectively. 
In fact, it quickly becomes practically impossible to compare all possible trees and find the *exact* best one. 
To overcome this problem, random trees are generated that serve as starting points for tree search in remote and differently placed parts of the tree space (see below). 
Different kinds of branch-swapping local re-arrangements can be used to improve the tree score, and then the best-scoring trees (which can be many) are selected. 
Such tree search methods are called *heuristic* (rather than exact), yielding best possible estimates, though not necessarily guaranteed best solutions. 
Answers represent estimates, and whether or not the "best tree" is actually found remains an open question.

(w3box1)=
:::{admonition} Box 1: Given a set amount of terminals (n), how many bifurcating trees are possible?
:class: tip

This number increases very rapidly with increasing *n*.
Note: the number of unrooted ("unordered") trees follows that of rooted trees.

Having to assess that large numbers of trees falls under the category of "NP complete" problems which cannot be solved in a lifetime even with unlimited resources.

**REF** Introduction to Bioinformatics, Helsinki CS 2006
:::

These *character-based tree building* methods (as opposed to distance-based methods, see below) are attractive in that trees are made directly from sequence characters, enabling detailed analysis of what characters contribute where in the tree, or reconstructing what ancestral characters (and hence sequences) would have looked like. 
This is a powerful feature of character-based tree building methods, which have become dominant in recent years.

#### Consensus trees

Following the character-based tree building approach does usually not result in just one best tree, but rather a set of trees that all score best under the optimality criterion applied. 
In such case a consensus tree will have to be calculated to efficiently communicate the outcome of the analysis. 
In Fig 4.1 three trees are shown, along with their so-called *strict* consensus and *50% majority-rule* consensus trees which are explained below. 
Congruence among trees means that the same nodes (and hence clades) can be found in each tree. 
There may be differences, but these do not contradict the other tree topologies. 
Trees 1, 2 and 3 are incongruent (i.e. they contain clades that contradict those in the other trees), therefore it is important to apply the right consensus approach in order to visualise the differences between the trees. 
*Strict* consensus demands that only identical tree topologies can make it into the strict consensus tree. 
As this is not the case (AB,C is present in Trees 1 and 3, but not in 2; note that "AB,C" means there is a clade AB and C is its sister), this part of the strict consensus collapses into the trichotomy (A,B,C). 
Likewise, D and E are monophyletic only in Tree 3, therefore this part of the tree collapses in a "deep" trichotomy (D,E, the rest). 
For the *50% majority-rule* consensus, the amount of (in)congruence among a set of trees is actually quantified, based on the occurrence of each nodes in the entire set of trees, and applying a majority-rule threshold. 
Thus, in Fig 4.1 clade AB occurs in Tree 1 and Tree 3 and its group frequency is therefore ⅔ or 67% in the 50% majority-rule consensus tree. 
Clade ABC is present in all trees and gets 100%. 
DE occurs only ones and gets 33%, which is below the majority of 50% and therefore does not occur in the 50% majority-rule consensus tree. 

#### Parsimony analysis

The simplest method for character-based tree building is *parsimony analysis* in which, character-by-character, the fit (of each character) onto a candidate tree is counted (see Fig 4.3). 
Some characters may have changed only once but did so in multiple sequences (*synapomorphies*, see above, chapter 3), whereas others may have changed several times independently (*homoplasies*). 
Some characters may have changed only in one of the sequences (*autapomorphy*). 
When all characters in the MSA have been evaluated, the overall score of the fit of the data with that candidate tree is calculated by adding up the changes across all characters (as in Figure 4.3). 
Then, another candidate tree is assumed and the process is carried out again. 
More and more trees are compared this way until either a single best or a group of *equally most parsimonious* reconstructions remains. 
Given the vastness of tree spaces for even moderate numbers of terminals (see Box 1) this process may take some time to complete. 
Usually only heuristic search methods (see 4.1.1) are applied in case of >15 terminals.

Each character change can be considered an *ad hoc* assumption, each of them associated with their type I error, or the chance of having a *false positive*. 
This would be a character change (substitution) inferred on the tree where no change took place. 
The tree that minimises the number of changes also minimises the number of *ad hoc* assumptions, and hence the type I error. 
This is the parsimony criterion, that was already described in the 14th century by the Franciscan friar *William of Ockham* (Fig 4.2) and has become known as "Occam's razor". 
In other words: when presented with competing hypotheses about the same prediction, one should select the solution with the fewest assumptions (Wikipedia 2022). 

Is nature parsimonious? 
This is a commonly-heard question but it is good to keep in mind that the parsimony criterion is applied to *choosing between hypotheses* (trees) and does not assume anything about nature and evolution! 
Maximum parsimony methods are included in the software (MEGA11) used in this practical.

Two other important character-based methods for tree building exist: *maximum likelihood* (ML) analysis and *Bayesian Inference* (BI). 
Both differ from parsimony analysis in that they do not merely count differences (as in parsimony analysis) but are based on explicit models of character evolution and operate in a probability framework. 
ML will be discussed in Chapter 6 below; BI is beyond the scope of this course and will therefore not be treated here. 

### Distance-based

The other main approach to tree building is *clustering*, which is distance-based, and is widely used in several applications, for instance in visualising BLAST searches as Neighbor Joining trees. 
Distance-based means that instead of comparing one character at a time across all sequences in the MSA, only pairwise comparisons of entire sequences are made (i.e. all characters are compared at once), for all possible sequence pairs in the MSA (Fig 4.3 below). 
Pairwise comparisons yield pairwise distances, which can be ultrametric or Euclidean (see Box 2). 
Keep in mind that the relation between Distance ($D$) and Similarity ($S$) is

$$
1 – D = S 
$$

and that in different studies either $D$ or $S$ may be used for comparison. 
Which one is used can usually easily be inferred from the resulting pairwise distance matrix diagonals, where each sequence is compared with itself. 
There will be all 0's in case of a Distance matrix and 1's in case of a similarity matrix.

If the sequences would have accumulated substitutions in a clock-like manner (i.e. like radio-active decay) the resulting pairwise distances may even be ultrametric. 
This would mean that the distances in the triangular pairwise distance matrix are identical with the distances as measured over the resulting distance tree (Fig 4.4). 

However, such clean data is hardly ever found, and the distances measured over the tree may differ from the observed distances in the pairwise matrix. 
This is illustrated in Fig 4.5 in which two trees are depicted: an ultrametric one (left) and an additive tree (right) containing unequal sister branch lengths (to $a$ and $b$). 
In the additive distance matrix (4.5b), due to the difference in length towards $a$ and $b$, the most similar sequences may actually not be the most closely related.

Once these pairwise distances have been calculated, the MSA is not further used and trees are built directly from the distances (Fig 4.4). 
Unlike for the character-based trees, in distance-based trees it is not possible to assess what character contributed where on the tree, as all individual characters have been combined into one overall pairwise distance value. 
Moreover, invariant characters (MSA positions containing no variation) *do contribute* to the pairwise distance values. 
This is a main difference with the character-based approach where only variant characters contribute to the tree. 

Clustering methods have the advantage that they are fast and do not require vast computational resources (there is no tree space as for the character-based trees outlined above). 
Clustering methods assign individuals to clusters in such a way that individuals in one cluster are more similar to each other than to those from other clusters. 
There is no explicit score or optimality criterion, only the minimisation of overall distance across all sequences. 
Clustering usually produces one tree, no alternative "equally good" trees are shown; this is due to the clustering algorithm which is designed to produce a single tree.

(w3box2)=
:::{admonition} Box 2: Distance measures and their qualities
:class: tip
A) Euclidean or metric distance requires observed distances to be *non-negative*, *symmetrical*, *distinct* and to obey the *triangle inequality* (B): the distance between any pair of sequences a and b cannot exceed the sum of the distances between those sequences and a third sequence c. 

Ultrametric distances are characterised by *ultrametric inequality* (C): the two largest distances – when comparing three sequences – are equal (in this case 6 = 6). 
Ultrametric distances have the attractive characteristic that they evolve clock-like, and hence that the most similar sequences will also be most closely related. 
In fact, the ultrametric tree (**Fig xa**) perfectly describes the observed distances as shown in the distance matrix. 

When distances are additive, the additive tree perfectly describes them (Fig 4.3b). However, here sequences b and c have the smallest distance ($d(\text{b,c})=3$), but are not most closely related. 
:::

#### Neighbor Joining

Probably the most commonly used distance tree building method is Neighbor Joining (NJ), which is fast and effective, especially for large MSA's (with hundreds of sequences). 
NJ tree building starts with a fully unresolved tree, containing all sequences in an MSA, and calculates a total tree length (or overall starting distance) by summing all pairwise distances. 
Subsequently, a pair of sequences is chosen and combined to start a small cluster ("neighbors") and the total tree length is updated, now replacing the two original by the joined taxa. 
This step is repeated until all sequences and pairs are joined, whilst minimising the overall distance (tree length) between them (Fig 4.6). 

Neighbor Joining produces unrooted trees and therefore, if needed, outgroup rooting should be applied in order to root the tree. 
There is no molecular clock assumption, which allows i) differences in branch lengths between neighbors (sisters) to be reconstructed. 
NJ is implemented in MEGA11 and used in the practical.

NJ is highly popular as it can generate trees with hundreds of terminals in a very short time. 
This makes it a great tool for quickly assessing the (phylogenetic) structure in a data set (MSA) without having to explore wide tree spaces (as in the character-based approach). 
It is good to keep in mind that NJ is a clustering method, i.e. it groups sequences on the basis of overall similarity, not on shared ancestry or synapomorphy. 
Therefore, for phylogenetic studies, character-based analysis is preferred and NJ analysis can be used in addition, to check for possible incongruencies between the two. 
If these are found, it could mean that the data (the synapomorphies accumulated in the MSA) are not metric for that part of the tree, which could warrant additional analysis methods (such as phylogenetic network reconstruction) which is beyond the scope of this course.

## Estimating sequence divergence

As outlined in Chapter3, phylogenetic reconstruction in case of long terminal branches combined with short internal ones usually poses a problem when using parsimony analysis, where each substitution occurring in the MSA results in one extra step of treelength. 
This so-called *long branch attraction* artefact has been shown to be mitigated to some extent by *modelling branch lengths* (rather than merely counting differences as branch length). 
For the accurate estimation of branch lengths in a phylogenetic tree we need accurate *sequence divergence estimation*. 
Evolutionary divergence (or distance) between homologous sequences is reflected in substitutions between them since splitting-off from their MRCA. 
Intuitively, when comparing two sequences, one would just take the proportion of differing sites as sequence divergence, for instance, for a sequence of 1000 positions, having 10 differences would yield 0.01 or 1% difference. 
However, this so-called *$p$-difference* does not necessarily consider *all* substitutions that historically occurred during divergence of the two sequences, which may include reversals to the original state. 
Estimating all substitutions that historically happened means that we need to find substitutions that *did* happen but are not visible in your MSA. 
Variable sites can actually keep on changing during evolution, causing multiple substitutions to occur at the same position, which can lead to saturation of change. 
In this way several substitutions may go unnoticed and a mere $p$-difference will underestimate actual sequence divergence.

###	Substitution models
Substitution models, all based on the Jukes-Cantor (JC) formula given below, correct divergence estimates for unobserved events. 
The JC formula is based on calculation of the chance of having a substitution for a particular site plus the chance of it not changing into any of the three other nucleotides for that site. 
In the formula, $p$ stands for the observed proportion of differences (i.e., the $p$-difference), and $d$ for the corrected divergence measure. When all sites differ (i.e. $p = 1$), $d$ reaches 0.75 in the limit, i.e. the corrected $d$ cannot exceed 75%. 

$$
d = -\frac{3}{4} \log{\left(1 - \frac{4}{3}p\right)}
$$

Fig 5.1 shows how the JC formula is applied in a *model of substitution*, the JC model. 
There is a matrix defining the six possible substitution types among the 4 nucleotide bases, i.e. T↔C, A↔G, A↔T, T↔G, C↔G, and C↔A. 
In this case the relative rates for all six substitution types are assumed to be equal and denoted by one shared parameter, named "a". 
Another assumption in this model is that the base composition across the MSA is equal, assuming a 25% probability of finding of each base at each position in each sequence. 
The JC model is considered a fairly simple, one parameter, model.

The first two substitution types listed above are *transitions* (substitutions among the pyrimidines T and C, and among the purines A and G), whereas the other four occur between purines and pyrimidines and are referred to as *transversions*. 
The rate of transitions ($ti$) has a different dynamic, and hence build-up of substitutions, compared with the rate of transversions ($tv$) (see Fig. 5.1). 
In the Kimura 2 Parameter (K2P) model this is accounted for by adding an extra parameter $b$. 
Parameter $a$ now estimates $ti$ (P) and parameter $b$ estimates $tv$ (Q); in the Kimura 2 Parameter formula, P and Q are the proportions of $ti$ and $tv$, respectively:

$$
d = \frac{1}{2} \ln{\left[ \frac{1}{1 - 2P - Q} \right]} + \frac{1}{4} \ln{\left[ \frac{1}{1 - 2Q} \right]}
$$

Besides the JC and K2P models, other models exist that take into account different aspects of DNA sequence evolution, such as differences between all six substitution types (*general time reversible* or GTR), sequence base composition or nucleotide frequencies (*Felsenstein81* or F81), and the distribution of rates of change in sites throughout the MSA: how many fast, and how many slow-evolving sites are there and how are they distributed (this is achieved by comparison with a gamma Γ distribution). 
The most complex models, with many parameters, will consist of combinations of all these aspects of DNA sequence evolution. 
There are up to 220 different models to choose from. 
It is good to realise that these models are reversible and therefore allow the reconstruction of unrooted trees only. 
Once these are determined they can be rooted using outgroup rooting.

For amino acid sequence comparisons, instead of estimating parameter values from the data, amino acid substitution models are based on (pre-defined) *substitution cost matrices* that are based on observations of amino acid substitutions found in over 30,000 protein sequences (i.e. the JTT, Blosum, Dayhoff, LG and WAG matrices).

## Maximum likelihood tree building

For character-based approaches these substitution models, as they are based on probabilities, allow us to calculate the *likelihood* of our data supporting a particular tree and model. 
This likelihood is a score describing how well data, tree and model fit together:

$$
L = Pr(D|H)
$$

Or in words: the likelihood $L$ is the probability of obtaining the data $D$ given hypothesis $H$, which includes the substitution model *and* tree selected. 
We could therefore also say:

$$
L = Pr(\text{MSA} | \text{Tree, substitution model})
$$

Obviously, it is important to select the best fitting model for the data set (MSA). 
Model selection proceeds by calculating the likelihood for your MSA using a range of different models and the same tree; the best resulting likelihood scores imply the best-fitting model. 

After selecting the best-fitting model, evaluating different trees and model parameter values allows the Maximum Likelihood estimate (MLE) to be found, depending on the number of sequences in your MSA (driving the tree space). 
The MLE then corresponds to a set of optimal model parameter values with which the estimated sequence divergence and hence the branch lengths in the best-fitting phylogenetic tree topology can be calculated. 
Like most character-based tree building methods, the ML approach too is heuristic. 

Phylogenetic tree reconstruction based on maximum likelihood estimation (MLE) has become the dominant tree building approach over the past decade. 
It is an efficient method that can consider differences in substitution rates and patterns between the sequences in a MSA. 
This would mean that non-clocklike or biased (non-random) accumulation of substitutions would be modelled, and this would minimise possible artefacts in inferring the ML tree topology, for instance branch attraction artefacts. 

MLE works as follows. Starting from a MSA ("the data"), first a best-fitting substitution model (i.e. JC, K2P etc.) is determined. 
Subsequently, a candidate tree is considered and the likelihood $L_D$ of observing the data (the MSA) is calculated given that model and that particular tree. 
Then, another tree is considered whilst the same best-fitting model remains selected and its parameter values are estimated again. 
The likelihood $L_D$ of observing the data (your MSA) is calculated again and this time the likelihood may actually be better. 
More trees are evaluated and more model parameter values are considered, all the time keeping track of $L_D$ until no further increase $L_D$ can be obtained. 
This is usually achieved by using the heuristic tree search approaches as outlined in 4.1.1 and depending on the tree space, determined by the number of sequences in the MSA. 
The end result is the MLE: the combination of a tree and model parameter values that maximizes the likelihood of the data. 
This tree, which may not be the exact best MLE (it is after all heuristics), is then usually referred to as the ML tree. 

### Model-testing, ML tree search, Bootstrapping

After a ML tree with branch lengths has been obtained, there is still no information on how nodes in the ML tree may differ in terms of support by the data (MSA). 
Therefore a bootstrap analysis is carried out, repeating the MLE process a number of times, based on pseudo-replicate data sets drawn from the MSA (see 2.5). 
After a ML tree is obtained for each pseudo-replicate data set, a 50% majority-rule consensus tree is calculated in order to see the group frequencies (the proportion of replicates in which each node is occurring). 
These frequencies are also referred to as *bootstrap values*. 
The idea is that the more synapomorphies a node has, the higher its bootstrap value will be. 
Unfortunately, there no simple linear relationship between character support and bootstrap values. 
Generally, bootstrap values <90% are considered poor support for that node, and values <50% (or even <60%) as "no support". 
Bootstrap values of 62% are usually obtained for MSAs containing one synapomorphy, meaning that such nodes should probably be ignored and collapsed. 
Fig 6.2 illustrates what happens to bootstrap consensus trees when poorly supported nodes are collapsed: the tree topology becomes less well resolved but what is left is strong.

The MLE pipeline for phylogenetic reconstruction is implemented in the software package IQ-TREE, which includes i) model testing, ii) ML tree search, and iii) bootstrapping for both nucleotide and amino acid sequences. 
IQ-TREE will be demonstrated and used in the practical.

## Recap tree building methods

To summarise, tree building methods can be classified according to the type of data used, characters (or "sites") *versus* pairwise distance, and depending on whether an explicit model of character evolution is applied versus mere counting (parsimony). 
In this course we covered Maximum Likelihood and parsimony, and Neighbor Joining using corrected distances, i.e. applying the character model in pairwise sequence comparison. 
Bayesian Inference, in which probabilities for nodes are calculated, and different models are evaluated simultaneously, is beyond the scope of this course. 
(If you are interested they are covered in BIS-30306 Comparative Biology & Systematics).

```{list-table}
:header-rows: 1
:widths: auto

* - Data 
  - Distances (pairwise)
  - Sites (characters)
* - Approach
  - 
  -
* - Explicit model of character evolution
  - Neighbor Joining Neighbor Network
  - Maximum Likelihood Bayesian Inference
* - No model of character evolution
  - $p$-difference
  - Parsimony("counting")
* - Criterion?
  - Clustering
  - Optimality criterion
```

## Glossary

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
  The length, either in steps, distances or 

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