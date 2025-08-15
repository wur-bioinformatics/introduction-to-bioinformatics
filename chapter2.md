---
title: 2. Alignment, sequence search, and primer design
label: chapter2
authors:
  - annekupczok
  - rensholmer
---

In chapter 2 of Introduction to Bioinformatics, you will study sequence alignment.

```{important} Learning goals
After studying this chapter you should be familiar with what DNA and protein alignments are used for and you can explain the differences between local and global alignments.
You should have knowledge of concepts related to alignments and sequence search, like dotplots, alignment scores, E-values, and substitution matrices.
Make sure you understand what multiple alignments are used for and that you can explain the differences between different solutions for the MSA problem.
You should understand what motifs are and the basics of profile hidden Markov models.
```

During the practical you will learn how to make pairwise and multiple sequence alignments, perform sequence searches and motif analyses, design primers, and discuss the results.

## Introduction

%#%[TODO: There can be more biological examples in this section]

Comparing sequences is a key tool in the field of applied bioinformatics.
By analyzing DNA and protein sequences, researchers can annotate genes in new genomes, build models of protein structures, and investigate gene expression.
It is important to notice that nature tends to stick with what works, rather than reinventing the wheel for each species.
Organisms evolve from ancestors and accumulate mutations.
Here we deal with __small-scale__ mutations, that affect a few characters: substitutions (see also [Chapter 1](#chapter1_substitutions)) and small insertions and deletions ({numref}`mutations`).
Later in the book, we will also look at [large-scale genome variations](#chapter5_large-scale_genome_variation).

```{figure} images/chapter2/mutations.png
:alt: Types of mutations
:align: center
:width: 50%
:name: mutations

Different types of small-scale mutations.
Credits: https://evolution.berkeley.edu/, [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
```

Via mutations, organisms can gradually develop new traits over time.
These evolutionary relationships also mean that similar genes can be found in different organisms and the functional annotation can be transferred from one protein to another if both possess a certain degree of similarity.
However, even though two proteins may look similar, they could have different functions.
Generally, similarities arise because of shared ancestry (divergent evolution), nevertheless, similarities can also appear independently (convergent evolution).
Before diving into the analysis of whether sequences are related, it is important to understand some key terms.

```{important} Homology and similarity
**Homology** means that sequences share a common evolutionary history and therefore have a common ancestor.
Homology is not quantifiable.
If two sequences have a common ancestor, they are __homologous__.
Thus, two sequences are either homologous or they are not.

**Sequence identity** and **sequence similarity** are often used to infer whether two sequences are homologous.
We can measure the identity or similarity between sequences and we will see how to do this later in this chapter.

In contrast, we cannot measure homology, but we can only infer it.
```

```{seealso} See also
Here is a classic paper, where homologous protein families are introduced: [Tatusov et al., 1997](https://pubmed.ncbi.nlm.nih.gov/9381173/).
```

This chapter covers the basics of sequence comparisons. We will describe how two sequences can be compared with dot plots or with a pairwise sequence alignment.
Then, the search of similar sequences in databases is described.
Different approaches for comparing multiple sequences are covered: multiple sequence alignments to align them, motifs to find common sequences and profile hidden markov models to represent multiple sequences.
This chapter concludes with a section on PCR primer design as an example on the use of sequence alignment algorithms in practice.

## Dot plots

Dot plots are a simple way to visualize similar regions between two sequences.
They are represented by a matrix, where one sequence is written vertically and the other horizontally.
A dot is placed in a cell where the residues are identical.
In the resulting plot, similar regions appear as diagonal stretches and insertions and deletions appear as discontinuities in the diagonal lines ({numref}`dotsmall`).
A sequence can also be compared to itself, then the main diagonal will be filled with dots and additional repeats are on the off-diagonal ({numref}`dotlarge`).

```{figure} images/chapter2/dot_small2.png
:alt: Small dotplot example
:align: center
:width: 40%
:name: dotsmall

A small example of a dotplot. \
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

```{figure} images/chapter2/dot_large.png
:alt: Large dotplot example
:width: 80%
:name: dotlarge

An example of a dotplot to compare a sequence with itself. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

This simple way of marking identical residues comes with a lot of background noise.
To detect interesting patterns, a filter is typically applied.
For example, a minimum identity should be present across a certain window size, i.e., consecutive number of residues being considered.
This feature is implemented in a webserver to visualize dotplots, [dotlet](https://dotlet.vital-it.ch/) {cite}`dotlet_2000` ({numref}`dotweb`).

```{figure} images/chapter2/dot_web.png
:alt: Screenshot of dotlet
:width: 100%
:name: dotweb

A screenshot of [dotlet](https://dotlet.vital-it.ch/) with the following protein sequence submitted as Sequence 1 and Sequence 2: `MRRPDFMDALQGFLSPLNPAHQLDFMDSLGNLRLEECRIM`.

- (A) The two sliders to change the appearance of the plot: The top slider can adjust the sensitivity, moving it to the right, fewer similar regions are shown; moving it to the left, also regions with lower similarity appear.
  The bottom slider adjusts the color scheme and is less relevant compared to the top slider.
- (B) The histogram indicates how many hits with a particular similarity are shown; thus the slider can be adjusted to the right tail of the histogram.
- \(C\) The two sliders that can adjust how the two sequences are positioned against each other.
- (D) Serves a similar function as the two sliders of C but allows for arrow key navigation of the dotplot.
- (E) Here you can select the window size of sequence comparison and the scoring matrix (window size is explained [below](#chapter2_blast_algorithm) and substitution matrices are also explained [below](#chapter2_substitution_matrices)).
- Credits: {cite}`dotlet_2000`.
```

## Pairwise alignment

Dot plots provide a visual way to compare two sequences, but do not provide the similarity between two sequences.
To calculate sequence similarity or sequence identity, we need to perform a **pairwise sequence alignment**.
In an alignment, the two sequences will be placed above each other and gaps can be introduced to represent insertions or deletions of residues.
We also say that the two sequences will be **aligned**.
The resulting alignment contains matches, mismatches, and gaps ({numref}`algterm`)

```{figure} images/chapter2/alg_term.png
:alt: Small alignment example
:width: 50%
:name: algterm

A small example of two aligned sequences.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

### Alignments of DNA sequences

Every position in a sequence could potentially have an insertion or a deletion, so there are many possible locations and combinations for gaps and thus many potential alignments.
The final alignment will be the one with the maximum total alignment score.
This score is determined by so-called _scoring parameters_, which are chosen before the alignment calculation.
An example of DNA sequence scoring parameters could be that matches score 1, mismatches -1, and a gap has a penalty of -1.
The total __score__ of an alignment is calculated by summing over all its columns ({numref}`algscore`).
Then we can compare the scores of different alignments, where alignments with higher scores display a _better_ alignment of the sequences.
However, the choice of the scoring parameters has an impact which alignment will have the maximum score.
To understand the impact of the parameters on the final alignment, fill in table {numref}`algex`.

```{figure} images/chapter2/alg_score.png
:alt: Small alignment example with scoring
:width: 60%
:name: algscore

An example calculation of the alignment score, where matches score 1, mismatches -1 and there is a gap penalty of -1.
This results in a total score of 1 for this alignment.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```


```{figure} images/chapter2/alg_exercise.png
:alt: Exercise to score alignments
:width: 100%
:name: algex

**Assignment**: Fill the table for the two alignments and the two sets of scoring parameters.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

```{note} Note 2.1: Affine gap costs
The DNA and protein sequences that we want to align often have varying lengths, which is the result of insertions and deletions during evolution.
Insertion and deletion events can affect one or multiple residues, where one event of length 2 is more likely to happen than two independent events of length 1.
To include this in the scoring scheme, alignment programs use **affine gap costs** that distinguish between opening a gap and extending a gap.
For example, the default parameters of the pairwise alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) {cite}`EMBL_tools_2022` are:

Gap open (score for the first residue in a gap): -10

Gap extend (score for each additional residue in a gap): -0.5
```

```{note} Note 2.2: Finding the best alignment
A huge number of alignments are possible for two sequences, since the gaps can be placed in many different ways.
However, to find the **optimal alignment**, i.e., the one with the highest score, it is not necessary to explore all these possibilities.
Efficient algorithms exist that guarantee to find the optimal alignment.
The Needleman-Wunsch algorithm was the first algorithm and can solve this task in a time that is quadratic to the length of the input sequences.
```

### Alignments of protein sequences

(chapter2_substitution_matrices)=

#### Substitution matrices

In [Chapter 1](#chapter1_aminoacids), we learned that different amino acids have different chemical properties.
When protein structure and function are conserved, it is more likely that an amino acid gets replaced by a chemically similar one than a very different one.
When aligning protein sequences, we thus want to penalize the substitution of chemically dissimilar amino acids and reward the substitution of chemically similar ones.
To this end, the score of matches and mismatches is generally determined by a **substitution matrix**, e.g., BLOSUM62 - **BLOSUM (BLOck SUbstitution Matrix)** ({numref}`blosum62`).
The substitution matrix and the gap parameters then determine the alignment score ({numref}`aa_alg`).


```{figure} images/chapter2/blosum62.png
:alt: Blosum 62 matrix
:width: 100%
:name: blosum62

The BLOSUM62 amino acid substitution matrix.
The matrix is ordered and positive values and zero values are highlighted.
Credits: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) {cite}`blosum62_2022`.
```

```{tip} Box 2.1: Assignment
Look at the amino acid properties in the table in [Chapter 1](#chapter1_aminoacids), choose some amino acids with the same properties and some with different properties.
Then look up these pairs in the BLOSUM62 matrix.
What do you observe?
```

```{figure} images/chapter2/aa_alg.png
:alt: A small example to score a protein alignment
:width: 100%
:name: aa_alg

Example of a pairwise protein alignment.
With the BLOSUM62 scoring matrix, a gap opening score of -10, and a gap extension score of -1, the resulting alignment score is 34.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

Note that we motivated the use of amino acid substitution matrices by the chemical properties of amino acids; however, these properties were not directly used when determining these matrices.
Instead, the BLOSUM matrix is determined by aligning conserved regions from Swiss-Prot ([Chapter 1](#chapter1_uniprot)) and clustering them based on identity.
Then, the substitutions between the different pairs of amino acids within a cluster are counted, which is used to compute the BLOSUM scores.
Thus, these scores reflect directly which amino acids are replaced more often with each other during evolution and we can observe that this frequency is strongly correlated with their chemical properties.
There are different versions of BLOSUM; for example, BLOSUM62 was derived by clustering sequences with an identity of 62% and is appropriate for comparing protein sequences having around 62% identity.
Other available matrices are for example BLOSUM45 (for more divergent sequences) and BLOSUM80 (for more similar sequences) ({numref}`submat`).

Another group of matrices, that was derived even before BLOSUM, is **PAM (Point Accepted Mutation)**.
The entries in a PAM matrix denote the substitution probabilities of amino acids over a defined unit of evolutionary change.
For example, PAM1 represents one substitution per 100 amino acid residues and is thus appropriate for very closely related sequences.
A commonly used matrix is PAM250, which means that 250 mutations happened over 100 residues; that is, many residues have been affected by more than one mutation.

```{figure} images/chapter2/submat.jpg
:alt: Example calculation for identity and similarity
:width: 80%
:name: submat

An overview of different available substitution matrices.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

```{seealso}
An introduction into PAM and BLOSUM substitution matrices.

<div class="videoWrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/68lF71zEUF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
```

#### Protein identity and similarity

For two protein sequences, we can distinguish two different measures of how much they are alike, identity and similarity, which are defined slightly differently.
The **protein identity** is given by the number of identical amino acids divided by the alignment length.
The **protein similarity** is given by the number of similar amino acids _and_ the number of identical amino acids divided by the alignment length.
In the pairwise alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle), **identical amino acids** are marked by a vertical line ( | ), **similar amino acids** are marked by a colon (:) and defined by pairs that have a positive score (i.e., >0) in the chosen substitution matrix ({numref}`aa_sim`).

```{figure} images/chapter2/aa_sim.png
:alt: Example calculation for identity and similarity
:width: 60%
:name: aa_sim

Example protein alignment. The percent identity is 10 / 18 = 55.6% and the percent similarity is 14 / 18 = 77.8%.
The lengths of the individual sequences are shown on the right.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

Note that the pairwise alignment method does not directly try to maximize similarity or identity, but these calculated from the best alignment, which is a result of the chosen parameters.
Especially for distantly related sequences, the parameters can have a big impact on the alignment and thus on the estimated identity and similarity.
In {numref}`alg_gap`, you can find two alignments, where the same two protein kinases from rice have been aligned with different parameters.
Depending on the parameters, the identity varies between 17.6% and 26.2%.

```{figure} images/chapter2/alg_gap.png
:alt: Impact of gap parameters on alignment
:width: 100%
:name: alg_gap

Alignments of the same two sequences (LERK1_ORYSI and XA21_ORYSI) with different parameters:
A) BLOSUM62 matrix, gap open: -10, gap extend: -0.5. Identity = 210/1191 (17.6%), Similarity = 345/1191 (29.0%).
B) BLOSUM62 matrix, gap open: -5, gap extend: -0.5. Identity = 305/1166 (26.2%), Similarity = 428/1166 (36.7%).
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024` made using [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) {cite}`EMBL_tools_2022`.
```

Up until now, we have only considered pairwise alignments, where both sequences are aligned completely; these are called **global alignments**.

### Local alignments

We have seen in [Chapter 1](#chapter1_Interpro) that many proteins are composed of domains.
Thus, some sequences might not be related over their full length, but only share similarity over parts of their sequences that correspond to domains.
When comparing such proteins, it is more appropriate to perform a **local alignment**.
Local alignment is also a good tool for identifying functional sites from which sequence patterns and motifs can be derived ({numref}`alg_local`).

The aim of a local alignment is to find the best subsequences of both input sequences that result in the maximum alignment score given the alignment parameters.
As for global alignment, efficient algorithms exist to solve this task.
The Smith-Waterman algorithm can solve this task in a time that is quadratic in the length of the input sequences, just like the Needleman-Wunsch algorithm for global alignments.

```{figure} images/chapter2/alg_local.png
:alt: Local alignment
:width: 100%
:name: alg_local

Alignments of the same two sequences, once using the global alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) and once using the local alignment program [water](https://www.ebi.ac.uk/jdispatcher/psa/emboss_water) {cite}`EMBL_tools_2022`.
The same alignment parameters were used: [DNAfull matrix](https://rosalind.info/glossary/dnafull/), gap open -10, gap extend -0.5.
The global identity is 20/71 (28.2%) and the local identity is 12/12 (100.0%).
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

(chapter2_sequence_search)=

## Search in sequence databases

In Chapter 1, we learned about different [sequence databases](#chapter1_databases).
We often want to search novel sequences in these databases, for example, to learn which other organisms have homologs.
Two sequences that are highly similar might also share the same function.
This relationship is used for the [functional annotation](#chapter1_functional_annotation) of sequences, where the search in databases is an important step.

```{note} Note 2.3: Similarity by chance
When all nucleotides occur randomly and at the same frequency, then each sequence of length `x` is expected to occur with a frequency of 1/4{sup}`x`, e.g., a sequence of length 3 has a frequency of 1/64 and a sequence of length 10 has a frequency of about 1 in a million.
This becomes important since these days, databases are very large: they can contain millions of sequences.
Due to this large amount of data, some similarities might just be observed by chance, especially if our sequence of interest is short.
Thus, statistical methods have been developed to estimate if an observed alignment might have just occurred due to chance (see below).
```

### Database search vs. pairwise alignment

Pairwise alignments are also used when searching sequences in databases.
In this task, we have a query sequence and we want to find similar sequences in a database; these similar sequences are called __subjects__ or __hits__.
Although the algorithms that were discussed in the previous section are relatively fast when two sequences are aligned, it would still take too long overall to perform pairwise sequence alignments of the query with all potential subjects from the database.
We thus need even more efficient algorithms.

```{note} Note 2.4: Heuristic algorithms
The Needleman-Wunsch and the Smith-Waterman algorithm described in the previous section guarantee to find the alignment with the best score for the given sequences and parameters.
In contrast, a **heuristic algorithm** employs some rules-of-thumb, which generally lead to good results and which make the algorithm much faster.
However, such a method does not guarantee to find the optimal score anymore.
```

### BLAST

Basic Local Alignment Search Tool (**BLAST**) is a heuristic method to find regions of local similarity between protein or nucleotide sequences.
The program compares nucleotide or protein sequences to sequences in a database and calculates the statistical significance of the matches.
Both the standalone and web version of BLAST are available from the National Center for Biotechnology Information ([NCBI](https://www.ncbi.nlm.nih.gov)).

(chapter2_blast_algorithm)=
#### The algorithm

The starting point of BLAST is the set of words that two sequences have in common, where a __word__ is a part of a sequence of a fixed length.
For protein blast, the default word size is 5 and for nucleotide blast it is 11.
To find these common words, first a lookup table of the query words is reconstructed ({numref}`blast_overview`A), where neighborhood words are listed as well.
__Neighborhood words__ are all the words that have a high alignment score with the query word ({numref}`blast_overview`B).
Then, BLAST scans the database for word matches.
For protein blast, two matches within 40 residues must be found for BLAST to consider it as an __initial hit__ ({numref}`blast_overview`C).
Note that for nucleotides, initial hits are found in a simpler way:
only one exact match must be found, i.e., no neighborhood is considered.

After finding initial hits, BLAST extends these to local alignments ({numref}`blast_overview`D).
As this __extension__ happens, the alignment score increases or decreases.
When the alignment score drops below a set level, extension stops.
This prevents the alignment from stretching into areas where there is very little similarity between the query and hit sequences.
If the obtained alignment receives a score above a certain threshold, it will be included in the final BLAST result.
BLAST is thus a heuristic algorithm (Note 2.4), but its careful process provides a reasonable trade-off between run time and accuracy.

```{figure} images/chapter2/blast.png
:alt: Blast overview
:width: 100%
:name: blast_overview

An overview of the BLAST algorithm.
Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`blast_2022`.
```

#### BLAST output

The BLAST output contains vast information on the found hits, their alignments, and taxonomy ({numref}`blast_output`).

```{figure} images/chapter2/blast_output.png
:alt: Blast output
:width: 100%
:name: blast_output

Top 5 blast hits when searching the rat protein P50745 in the Swiss-Prot 2024_02 release database.
Credits: {cite}`blast_2009`
```

```{note} Note 2.5: E-value
An important output statistic is the expectation value (**E-value**), which is the number of BLAST hits with the observed score or higher that you expect to see by chance in the database.
Note that due to this definition, the E-value depends on the database size.
Since it is more likely to find something by chance in a larger database, the E-value for the same hit would be higher compared to a smaller database.
Thus, to find as many good hits as possible, it makes sense to use the smallest specific database that contains all the sequences you are interested in.
For example, if you are only interested in plants, then restrict your search to only plant sequences.
During the practical you will get to know how to do that in the online BLAST interface.

The BLAST output is sorted by increasing E-value.
This can result in very low numbers and the BLAST output uses the scientific notation to list these, where, e.g., 3e-145 means $3 \times 10^{-145}$.
Thus, the hits listed in {numref}`blast_output` are likely not random, since the number of occurrences expected by chance is very low.
If the alignment is not by chance, then it might be due to a biological meaningful relationship between the two sequences.
However, it is difficult to define a clear E-value cutoff for biologically meaningful hits.
Commonly used cutoffs are 1e-5 or 1e-10.
```

Note that you cannot infer homology by E-value alone; the coverage and percent identity need to be taken into account as well.
For example, in {numref}`blast_output`, all hits have very low E-values:
the first hit is to the sequence itself; then there are hits with high identity and high coverage in mouse and human, these might be homologous sequences.
The 4{sup}`th` and 5{sup}`th` hit are local, since the query cover is ~30%, these sequences might only share a homologous domain with the query protein.

#### BLAST types

Different types of BLAST exist to search nucleotides or proteins in the respective databases:
`blastn` searches a nucleotide sequence in a nucleotide database and `blastp` searches a protein sequence in a protein database.
In addition, the query and/or the database can also be translated in all six reading frames to allow additional kinds of comparisons ({numref}`blast_types`).

%#%[TODO: check that the reading frame translation is clear from chapter 1 or explain more]

Different BLAST types exist for these different kinds of comparisons, where these translations are done automatically ({numref}`blast_types`).

```{figure} images/chapter2/blast_types.png
:alt: Blast types
:width: 100%
:name: blast_types

Different BLAST types to compare different data types.
The input query is marked by a red box.
Sequences/databases with a blue background originate from protein sequences, wheres sequences/databases with a green background originate from nucleotide sequences.
Note that some of the latter are automatically translated into all possible proteins (indicated by blue font).
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

%#%[TODO chapter 1: File formats]

### PCR primer design

A special use case of sequence comparisons is designing __primers__ for the polymerase chain reaction (PCR, see box 2.6).
Many laborary techniques in biomedical applications rely on PCR for amplifying specific fragments of DNA.
Examples include pathogen detection, analyzing genetic variation, targeted mutagenesis, _de novo_ protein synthesis, and studying gene expression patterns.
Which DNA fragments are amplified is determined largely by which PCR __primers__ are used.
To design primers that successfully amplify the DNA of interest, several computational steps are combined.
This section highlights some of these bioinformatic considerations.

(chapter2_PCR)=
`````{tip} Box 2.6: The polymerase chain reaction (PCR)
Invented in 1983 by Kary B. Mullis, the polymerase chain reaction was first published in 1985 in a study on sickle cell anemia {cite}`saiki1985enzymatic`. Ten years after its discovery, PCR's many biomedical applications gained its inventor the 1993 Nobel prize (shared with Michael Smith for his work on site-directed mutagenesis).

As a method for amplifying DNA, PCR relies on the naturally occurring process of DNA replication by the polymerase enzyme to duplicate DNA (See [Chapter 1](#chapter1_replication)).
The reaction uses so-called primers to select which regions of DNA to amplify, and a temperature-cycling scheme to double the number of reaction products in each cycle ({numref}`PCR`).
PCR primers are relatively short fragments of single stranded DNA that _prime_ the polymerase: they determine where DNA replication should start.
Primers always come in pairs: by using a forward and a reverse primer at opposing ends and strands of the desired DNA region, it is ensured that copies of DNA can be made from one original DNA region.

During the reaction, typically three different temperature phases are alternated:
1. The denaturation phase (~95°C) breaks up the double stranded DNA into single stranded DNA.
2. The annealing phase (~55°C) allows the primers to bind to their complementary DNA, forming a small region of double stranded DNA.
3. The extension phase (~72°C) allows the polymerase enzyme to extend the double stranded region, creating two full double stranded copies of the original material.

Repeating this process keeps on doubling the number of copies, which is why it is referred to as a chain reaction.
A crucial discovery in the invention of the PCR reaction for biomedical applications is the use of a polymerase enzyme that can withstand the high temperatures of the denaturation phase.
The first thermostable polymerase was extracted from a species of bacteria living in hot springs: _Thermus aquaticus_ (hence, it is called after this species _Taq_ polymerase).

```{figure} images/chapter2/PCR.jpg
:alt: PCR reaction product doubling
:width: 100%
:name: PCR

The polymerase chain reaction uses primers to select a desired region of DNA, and doubles its reaction products every cycle.
After the first cycle, $2^1=2$ copies are expected, after the second cycle $2^2=4$, after the third cycle $2^3=8$, ...
Credits: {cite}`PCR_NHGR`.
```
`````

PCR primers typically have to meet several requirements to result in a successful PCR product: they have to be biochemically feasible (i.e. denature, anneal, and extend at the right temperature), they have to be specific (only amplify the region of interest), they should produce a product of a reasonable size (~500-1000 nucleotides, depending on the application), and they should be stable as single stranded DNA.
The combination of these requirements typically allows primers of ~18-30 nucleotides long.
To aid in the quick design of potentially successful primers, tools such as [Primer-BLAST](https://www.ncbi.nlm.nih.gov/tools/primer-blast/) or [Primer3+](https://www.primer3plus.com/index.html) automatically check most of the mentioned requirements.
For example, Primer-BLAST lets a user upload a sequence of DNA that should be amplified, and can be configured to find primer products of a specific size.
In addition, putative off-target amplification (to ensure specificity) is checked using BLAST on a database of choice, and several desired temperatures can be configured.

```{important} Approximating PCR denaturation temperature $T_m$
The temperature at which approximately half of the DNA strands in a solution are in a denatured stated is referred to as the _melting temperature_ $T_m$, and is an important parameter in primer design.
The exact melting temperature depends on the exact length and nucleotide composition of the DNA fragment, but a useful approximation exists for short sequences.
This approximation can come in handy for quick checks and predictions.

For primers shorter than 14 nucleotides, the melting temperature can be approximated with the following formula:

$T_m \approx 2 \times (A + T) + 4 \times (G + C)$

where A, C, G, and T are the number of respective nucleotides in the primer.
```

## Comparisons of multiple sequences
(chapter2_multiple_sequence_alignment)=
### Multiple sequence alignment

One straightforward observation from a sequence search is that one query sequence is often similar to multiple sequences ({numref}`blast_output`).
This can lead to research questions on evolution (where do these sequences come from?), function (why are some sequences more similar to each other than to others?), or structure (are all parts of these sequences equally similar/dissimilar?).
Comparing all of these sequences with each other using a pairwise alignment strategy would quickly lead to a large number of comparisons and would be difficult to interpret.
Instead, in cases where we want to compare 3 or more sequences with each other, we use a **multiple sequence alignment (MSA)**.

The objective of performing multiple sequence alignment is to identify matching residues (DNA, RNA, or amino acids) across multiple sequences of potentially differing lengths.
The resulting alignment can be thought of as a square matrix: rows represent the sequences that we started with, columns represent homologous residues across sequences, and the entries are either residues or gaps ({numref}`msa_concept`).

```{figure} images/chapter2/msa.png
:alt: Multiple Sequence Alignment (conceptual)
:width: 80%
:name: msa_concept

Conceptual diagram depicting multiple sequence alignment. Colored dots represent similar sequence elements, in the multiple sequence diagram on the right these elements align in vertical columns. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

%#% INSERT: SOME SECTION ON RELEVANCE OF MSA

In contrast to pairwise alignment, it is computationally not feasible to calculate the best multiple sequence alignment for a set of sequences and scoring parameters.
Instead, various heuristic algorithms (Note 2.4) for creating multiple sequence alignments exist.
Here we will go over two main concepts that are adopted by many tools: progressive alignment and iterative alignment.

#### Progressive alignment
Progressive alignment builds the alignment using a so-called __guide tree__ (Box 2.2).
The guide tree is a crude representation of similarity between all sequences to be aligned.
Progressive alignment picks the two most similar sequences using the guide tree and initializes the multiple sequence alignment by aligning these two sequences with a global alignment strategy.
Subsequently, the guide tree is used to determine the order in which sequences are added to the alignment.
One way of thinking about this is that progressive alignment creates increasingly large 'blocks' of sequences, where a block is always treated as a unit (e.g., introducing a gap will happen for all sequences in the block).
By going through the guide tree, this alignment strategy _progresses_ to the final result, hence the name _progressive alignment_.

```{tip} Box 2.2: Constructing a guide tree
The guide tree that is used by the progressive alignment strategy is typically created with a clustering algorithm that takes as input all pairwise distances between sequences (see [Chapter 3](#chapter3_neighbor_joining)).
Obtaining these pairwise distances can be done through, e.g., local alignment scores, but another common approach is to count the number of subsequences of length $k$ (also known as $k$-mers) that are present in both sequences.
The downside of this k-mer based strategy is that it provides a crude distance measure (and is therefore not very accurate), the benefit is that it is very fast.

Once a multiple sequence alignment has been created with the progressive strategy, it is straightforward to recompute the guide tree based on this first multiple sequence alignment and calculate a second multiple sequence alignment based on this updated guide tree.
This recomputing of the guide tree could in theory be repeated a lot of times (e.g., until it does not change anymore), in practice it is sufficient to only recompute it once.
The often used multiple sequence alignment program `mafft` implements recomputing the guide tree in the `FFT-NS-2` algorithm.
```

%#% TODO: It would be nice to have a visualization here, all good ones are with copyright, need to redo it

#### Iterative refinement
One potential downside of the progressive alignment strategy is that some of the intermediate blocks may represent sub-optimal alignments.
For example, when a gap is introduced during an early stage of the progressive approach, it is never removed from the alignment.
Identifying and potentially improving such cases is often referred to as __iterative refinement__ and typically happens on a multiple sequence alignment that was created with a progressive strategy.

Iterative refinement takes as input a multiple sequence alignment, a scoring function for the multiple sequence alignment, and a function to rearrange the multiple sequence alignment.
It produces a _refined_ multiple sequence alignment by rearranging the multiple sequence alignment and only keeping the new multiple sequence alignment if the score has increased.
This process is typically repeated until the score no longer increases (or for a fixed number of iterations).

Since iterative refinement methods typically start with a progressive alignment and improve its score, programs that implement an iterative refinement strategy (e.g., the `FFT-NS-i` method in `mafft`) typically perform better, but also need more time, than programs that are based on progressive alignment (e.g., the `FFT-NS-2` method in `mafft` and the Clustal program) {cite}`katoh_mafft_2014`.

```{tip} Box 2.3: Scoring and rearranging multiple sequence alignments
For iterative refinement, various scoring and rearranging strategies exist. Here we outline a common approach for both: the weighted sum-of-pairs scoring function and the partitioning rearrangement strategy.

__Weighted sum-of-pairs scoring__: The sum-of-pairs method calculates and sums all possible pairwise alignment scores. The weighted version consists of adding specific weighing factors to each pair, where the weights are determined by the [phylogenetic relationship](#chapter3) between the sequences.

__Partitioning rearrangement__: Following a guide tree, the multiple sequence alignment is partitioned into two sub-alignments (or blocks) along each branch of the tree. Each pair of blocks is then realigned, but the resulting alignment is only kept if the score of the realigned blocks has increased.
```

### Motifs

Having established how to obtain a multiple sequence alignment, we now focus on several interpretations.
One possible interpretation is the identification of (and search for) commonly occurring sequence patterns.
A frequently used term for a commonly occurring sequence pattern is __motif__, which we will use from now on.
Motifs can be found by summarizing the _columns_ of the multiple sequence alignment, in an attempt to describe commonly occurring residues across all sequences.

```{note} Note 2.5: Multiple sequence alignments vs. motifs
Since motifs are based on multiple sequence alignments, it may seem tempting to use the terms interchangeably. A key distinction is that a motif always represent a commonly occurring pattern, whereas a multiple sequence alignment can also contain regions of low conservation/similarity. In addition, one multiple sequence alignment can contain multiple motifs.
```

The simplest representation of a motif is the __consensus sequence__ ({numref}`motif_concept`B), where every column of the multiple sequence alignment is represented by the most frequently occurring residue (i.e., the majority consensus).
The downside of a consensus sequence is that it does not represent any of the variation present in the motif.

An extension of the consensus sequence that can represent some variation in a motif is the __pattern string__ ({numref}`motif_concept`C).
In pattern strings, unambigous positions are represented by single letters and there is a special syntax for representing variation:
Positions in the MSA with more than one character are represented by multiple characters in between square brackets.
A pattern string containing, for example, the pattern `[AG]` indicates that one position in the motif can be either `A` or `G`.
As such, pattern strings take inspiration from [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).
Various types of pattern strings exist; for example, `PROSITE` __REF__ strings used in the [Prosite database](#chapter1_prosite) contain the syntax for representing positions in a motif where the residue is irrelevant (marked by an `*`).
Pattern strings are capable of representing some variation in the motif, but they cannot express how likely the occurrence of specific variants is (in the example of `[AG]`, both `A` and `G` are equally likely to occur).

To express the likelihood of a specific residue occurring at a specific position, a __Position Specific Scoring Matrix (PSSM)__ can be used ({numref}`motif_concept`D).
Every row represents one of the possible characters in the MSA and every column represents a column in the MSA, where numbers indicate the probability of observing a specific character at a specific position.
Hence, every column sums to one.
For example: a DNA PSSM would have four rows, representing the nucleotides `A`, `C`, `G`, or `T`.
The entries represent probabilities of observing a specific residue at a specific position.
As a consequence, all columns in a PSSM must sum to one.
Since a PSSM contains probabilities, it is relatively straightforward to calculate how well an unknown sequence matches an existing PSSM: assuming independence between positions, one simply multiplies the observation probabilities of the characters in the novel sequence.

Finally, __sequence logos__ are a graphical representation of an alignment ({numref}`motif_concept`E).
Every position in the sequence logo represents a position in the MSA.
The total height of the logo at a position indicates the _information_ that this column contains, i.e., an unambiguous position has a high information content, whereas a position with equal frequencies of characters has a low information content.
Additionally, the characters are scaled proportional to their probability of being observed at their respective positions.

```{figure} images/chapter2/msa-pattern-pssm-logo.png
:alt: Various representations of a motif
:width: 60%
:name: motif_concept

Conceptual diagram depicting various representations of a conserved motif. __A:__ Multiple sequence alignment (MSA) of 5 sequences and 7 positions. __B:__ Consensus sequence. __C:__ Pattern string. __D:__ Position Specific Scoring Matrix (PSSM). __E:__ Sequence logo.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

(chapter2_phmms)=
### Profile hidden Markov models (pHMMs)

The previous sections on multiple sequence alignments and motifs explained some basics of how collections of similar sequences can be summarized and used.
In this section, we highlight a powerful approach for using the information in MSAs to perform sequence search and comparison: __profile hidden Markov models (pHMMs)__.
Some of the fundamentals of general hidden Markov models have been covered in [Chapter 1](#chapter1); here we introduce how a few simple adaptations to the general concept of HMMs unlocks a powerful sequence search approach.

We can think of a profile hidden Markov model as an extension of a position specific scoring matrix.
Like a PSSM, a pHMM contains probabilities of observing certain characters at certain positions in an MSA.
However, in contrast to PSSMs, HMMS can also represent insertions and deletions, that is, an insertion at a particular position might be more likely than an insertion at another position.
To this end, hidden Markov models contain the _hidden states_ match/insertion/deletion and _transition probabilities_ between the  hidden states.
In addition, _emission probabilities_ represent the unique probabilities for the different characters for the match states and for the insert states.
A graphical representation of a simple profile HMM can be seen in {numref}`simple_hmm`.
Just like for PSSMs, a probabilistic score can be calculated for a novel sequence matching an existing HMM.
Efficient algorithms for working with pHMMs exist and have been implemented in for example the [HMMer suite](http://hmmer.org/).

```{figure} images/chapter2/hmm.png
:alt: DNA profile HMM with three positions and three states (match, insertion, deletion)
:width: 60%
:name: simple_hmm

Schematic representation of a simple DNA profile HMM containing all model probabilities.
The model consists of three types of hidden states: match (yellow square), deletion (red circle), and insertion (blue diamond).
Emission probabilities are indicated inside the hidden states, transition probabilities between hidden states are indicated next to arrows.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`own_2_2024`.
```

```{tip} Box 2.4: Calculating the probability of a sequence
In principle, the information in {numref}`simple_hmm` is enough to calculate the probability of a sequence belonging to this pHMM.
For example, the sequence `GAT` represented by match states would get a probability of $(0.8 * 0.6) * (0.4 * 0.7) * (0.3 * 0.4) * 0.8 = 0.013$.
We arrive at this number by multiplying all relevant transition and emission probabilities.
Note that the hidden states are generally unknown; thus, determining the relevant probabilities is more complex than in this simple example.
Efficient algorithms for determining the optimal path through the HMM graph exist, but are outside of the scope of this book.
Also, we do not expect that you can perform these calculation by hand.
```


```{important} Sequence search with MSAs
The ability to convert a multiple sequence alignment into a collection of probabilities (e.g., PSSMs or pHMMs) makes it possible to calculate the probability of a novel sequence _belonging_ to the multiple sequence alignment.
This technique generally allows for a more sensitive approach than searching based on pairwise alignments (e.g., with BLAST).
In practice, this means that matching sequences can be identified over larger evolutionary distances.
Tools that implement some version of this approach are `psiBLAST` (which uses PSSMs) and various `HMMer` tools (all using pHMMs).
```

```{tip} Box 2.5: pHMMs in databases
The ability to group biological sequences based on conserved/co-occurring regions and subsequently using this grouping for sequence search is exploited in a wide range of biological sequence databases.
Some of these databases have been introduced in [Chapter 1](#chapter1); here we briefly outline a few more details on how HMMs are incorporated into many of these resources, using [Pfam](#chapter1_pfam) as an example.
All entries in the Pfam database are represented by profile HMMs.
The entries are subdivided into one of six categories: family, domain, repeat, conserved site, coiled coil, or disordered.
The main distinction between these six categories is the length of the matching sequences: a _family_ Pfam HMM is expected to match across the entire length of a protein sequence, a _conserved site_ is typically only a small region in a protein.
As such, multiple Pfam HMMs can match a given protein sequence. The combination of matching Pfam HMMs on a given sequence can be used to give a fine-grained description of known elements in a sequence.
```

## Glossary

This glossary contains the most important terms from this chapter.

`````{admonition} Glossary
:class: important
```{glossary}
Affine gap costs
:  Alignment scoring scheme that distinguishes between gap opening and gap extension costs

BLAST
:  Basic Local Alignment Search Tool

BLOSUM
:  BLOck SUbstitution Matrix - a group of protein substitution matrices

Consensus sequence
:  Sequence of most frequently occurring residues in an alignment

E-value
:  Expectation value - the number of hits with the observed score or higher that you expect to see by chance in the database (e.g., with BLAST)

Global alignment
:  Alignment strategy, where the complete sequences are aligned

Guide tree
:  A tree based on clustering of the sequences based on their pairwise distances that is used for constructing MSAs

Heuristic algorithm
:  A method that is not guaranteed to find the solution with the best score, but instead employs rules-of-thumb that generally lead to good results

Homology
:  Homologous sequences share a common ancestor

Iterative refinement
:  Heuristic to improve an MSA

Local alignment
:  Alignment strategy, where regions of local similarity are identified

Motif
:  Commonly occurring sequence pattern

MSA
:  Multiple sequence alignment - alignment of more than two sequences

Pairwise sequence alignment
:  Alignment of two sequences by introducing gaps such that a score is maximized

PAM
:  Point Accepted Mutation - a group of protein substitution matrices

PCR
:  Polymerase chain reaction

pHMM
:  profile hidden Markov model - probabilistic representation of an MSA that allows to search sequences against domain databases

Primers
:  Short fragments of single stranded DNA that are used during PCR to prime the polymerase

Progressive alignment
:  Heuristic method of MSA building based on a guide tree

Protein identity
:  Number of identical amino acids in a pairwise alignment divided by the alignment length

Protein similarity
:  Number of similar and identical amino acids in a pairwise alignment divided by the alignment length

PSSM
:  Position Specific Scoring Matrix

Sequence logo
:  Graphical representation of an alignment showing the information in that column
```
`````
---

## Practical assignments

This practical contains questions and exercises to help you process the study materials of chapter 2.
There are two supervised practical sessions, one on Wednesday and one on Thursday.
On the first practical day you should aim to get about halfway through this guide.
Thus, you should aim to be close to finishing Assignment IV on the first day.
Use the time indication to make sure that you do not get stuck in one assignment.
These practical exercises offer you the best preparation for the project.
Make sure that you develop your practical skills now, in order to apply them during the project.

**Note, the answers will be published after the practical!**


```{exercise} Protein sequence BLAST of Vps36, 30 minutes

Finding homologs of proteins is a common task in biology, since the presence of homologs can tell us something about the function of the protein and in which other species it can be found.  Thus, we first practise finding homologs using BLAST. We want to find homologs of the yeast protein Vps36, the Vacuolar protein-sorting-associated protein 36. To this end, we search in  different databases and compare the results.
1. Retrieve the protein sequence of Vps36p from the yeast S. cerevisiae (NP_013521.3) from NCBI in fasta format. (Note: you can download it into a file or leave the tab open and use copy/paste). What does the fasta format look like? I.e. how is the sequence and the additional information (name) of the sequence stored?
2. We want to identify similar proteins in the swissprot database using the National Center for Biotechnology Information (NCBI) BLAST program. Go to the website of the [NCBI](https://www.ncbi.nlm.nih.gov). On the right side of the webpage, you find a direct link to BLAST. Next, you need to decide which search strategy would be appropriate to search a protein database (swissprot) with a protein sequence as a query (if you are not sure anymore, look at {numref}`blast_types`). Click on the appropriate search strategy. Enter the sequence into the query box, select UniProtKb/Swissprot as the database you want to search, and make sure you have the correct algorithm selected. Finally, click on the ‘BLAST’ button to perform the search. What might be the advantage and disadvantage of searching first in swissprot?
3. Have a look at the result page of your search. Where can you find information about your query, an overview of the database hits obtained, the distribution of these hits on along your query sequences, and the alignments between the query and each individual database sequence?
4. In which organisms do you find similar sequences? Which of the hits do you consider as homologs?
5. What is the interpretation of an E-value? What does an E-value of 0.0 suggest?  **Note**: We still need the results in Swissprot. Save the urls, so you can retrieve them later or leave these results open and perform the new search in a new browser window or tab.
6. Next, we want to find more homologous sequences; thus we search in the ClusteredNR database. How many hits do you find? Look at the last hit, do you think that all similar sequences in that database have been found?
7. Perform the same search as in (6), but now allow for finding a larger number of hits (Change Max target sequences under Algorithm parameters to the maximum available). How many hits do you find? Would you consider all of them as homologous to the yeast Vps36?
8. Go back to the Swissprot results and look at the first hit that is not the query sequence itself. Compare the blast results (score, query coverage, E-value, percent identity, alignment length) to the hit of the same species found in ClusteredNR. What do you observe?
```


```{exercise} Some more BLAST, with flavors, 60 minutes

Blast cannot only be used to search protein sequences in protein databases with blastp, but also offers different blast flavors that either allow to search in databases of different type (see {numref}`blast_types`) or with alternative search strategies and also to restrict the search to particular species.
Here we explore these strategies by searching for homologs of the yeast Vps36p in fungi and other organisms.
1. Next, we aim to find out if homologs of this protein exist in the fungus _Cryptococcus neoformans_. What would be the most straightforward BLAST search strategy to do this? Perform this blast search using a large database (ClusteredNR). How many hits do you find? Inspect the length of the alignments, the percent identity, and E-value. What do you observe and what do you conclude?
2. In case no homologs would have been found using a ‘normal’ blastp search, which alternatives could you use to still find homologs, e.g., in the genome sequence? Describe what happens in that BLAST flavor.
3. Search the protein sequence of Vps36p against the nucleotide sequences of _C. neoformans_ using tblastn, indicating that you _only_ want to search this single species and not the entire database (use the database: Core nucleotide database (core_nt)). Inspect the search results. Do you think these are good hits and would you feel comfortable to conclude that there are (or are not) homologs of this gene in _C. neoformans_?
4. Some of the hits reported are part of chromosome 1 of _C. neoformans_. Inspect these hits in more detail. How long is your query and how long is the sequence in the database?
5. Think about the following case, where you would like to study this hit in more detail. For instance, you could perform a multiple sequence alignment of your protein with this database hit and also with other sequences. What would happen if you would download the sequence from the database? Why could this be a problem, and how could you solve this?
6. _S. cerevisiae_ belongs to the fungal phylum Ascomycota, while _C. neoformans_ belongs to the phylum Basidiomycota. Vps36p is highly conserved throughout Ascomycota and likely has homologs outside of this phylum too, as already indicated by your searches above. We now want to get a better overview of possible homologs of Vps36p in other species (outside of Ascomycota). To this end, perform a blastp search of Vsp36p to the refseq_protein database (excluding Ascomycota), set the number of target sequences to the maximum. Have a look at the best hits. What can you say in terms of query coverage and identity?
7. Take a look at the taxonomy report of your results (link on top of the blast result page). In which groups of species do you find hits?
8. What could be a possible blast strategies to find more distant homologs?
9. Try to modify the Algorithm parameters for the search done in (6). To find more homologs, keep using the blastp algorithm, just try to modify a parameter. How many hits do you find?
10. Look at the taxonomy report. In which groups of species do you find hits now?
11. Finally, we want to get an overview how similar these distantly related proteins are.
To this end, we will download some hits and perform a multiple sequence alignment.
Generate a multi-fasta file of 10 sequences: The first 9 hits from the previous blast search and the original sequence (NP_013521.1).
(Hint: you can mark sequences and save them by clicking on Download -> Fasta (complete sequences); use a text editor to add the original sequence manually).
12. We will use [M-Coffee](https://tcoffee.crg.eu/apps/tcoffee/do:mcoffee) from the [T-Coffee suite](https://tcoffee.crg.eu/apps/tcoffee/index.html). This program uses multiple other tools to compute several multiple sequence alignments and combines them into one final alignment. The output includes a color code showing the agreement between the methods. Upload your multi-fasta file and run it with default parameters. Look at the estimated alignment. What can you say about the overall alignment quality? Where can you find regions of high and low agreement?
13. Would you conclude that these sequences are homologous across their entire length? Why/why not?
```

```{exercise}Looking for distant homologs, 20 minutes

In addition to BLAST, other methods for homology search exist and some of them are particularly useful for finding distant homologs. Here, we want to work with one of these tools, [HMMER](https://www.ebi.ac.uk/Tools/hmmer/home).
1. We will first perform a search with phmmer. phmmer can be used like BLAST, it searches a sequence against a sequence database. Internally, phmmer builds a profile from your single query sequence using BLOSUM62 and gaps. This way, it is more _sensitive_, i.e., it is expected to find more distant homologs compared to BLAST. Use phmmer to search Vps36p against the Swissprot database. How many hits do you find? How do they compare to the results in Assignment I question 2?
2. Next we try to find even more distant homologs using the HMM-based tool jackhmmer. Read the first paragraph [here](http://cryptogenomicon.org/interactive-iterative-searches-using-jackhmmer.html) to learn about this tool. How does the method find more hits found in subsequent iterations?
3. Run jackhmmer with the default database. How many hits do you find and how do they distribute across the taxonomy?
4. Start the second iteration with the button on top. How many hits do you get now? Compare the taxonomy to the previous iteration. What do you observe?
```

```{exercise} Analyses of the PLT1 family - part 1, 60 minutes

Stem cells are undifferentiated cells that can differentiate into specialized cells and therefore are crucial during embryonic development of different tissues and for growth.
In plants, such as the thale cress _Arabidopsis thaliana_, stem cells are found in specific regions in the roots and shoots, thereby providing a continuous supply of specialized cells required for these tissues.
PLT1 is a transcription factor that is required to maintain stem cells in the root ([Aida et al. 2004](https://doi.org/10.1016/j.cell.2004.09.018)).
Here, we will use bioinformatics approaches to analyse PLT1 to discover if it is part of a larger gene family and which related sequences exist in _A. thaliana_.

[UniProt](http://www.uniprot.org) is a publicly available protein database that contains protein sequences and functional annotation for >200,000,000 protein entries.
1. Have a look at the UniProt website. Why does UniProtKB-TrEMBL have so many more entries than UniProtKB-Swiss-Prot?
2. Search for the _Arabidopsis_ protein PLT1 using the UniProt identifier Q5YGP8. The PLT1 entry provides you with an overview of the protein entry and some functional information. Read the functional description of PLT1. Does this description fit the information above on PLT1, and how does UniProt gather this information?
3. Which functional regions are present in PLT1? Where in the sequence are they located? Which database is used for that information? (Hint: functional regions can be found under Function -> Features).
4. Towards the end of the entry, you can find the actual protein sequence of PLT1. You can download the sequence in fasta format by clicking on the Download button.
5. Interpro also provides a functional analysis of proteins and their domains. Go to the [interpro](https://www.ebi.ac.uk/interpro/) website and look up the entry for PLT1. How many protein domains have been identified in PLT1 and where are they located?
6. Look up the domain in Interpro. What is the function of the identified domains? What information can you find on GO terms and on protein structures?
7. Look up the domain in Pfam and look at the HMM logo of the domain. Which 3 positions are most conserved and which amino acids are preferred there?
8. We want to analyze the repeats in this protein using the online dot-plot program [Dotlet](http://dotlet.vital-it.ch). Go to the website and add the PLT1 protein sequence as sequence 1 and sequence 2 (we want to perform a self-comparison). To filter some of the low scoring alignments, you need to use the sliders below the score histogram. How many repeats can you find in this segment of the protein, and at which locations within the protein fragment are these located?
9. What happens if you change the scoring matrix from `BLOSUM62` to `Identity`?
10. Use the mouse to click on the region that likely contains the repeat sequence. Use the left and right arrow keys to locate the beginning of the aligned repeat structure. Which conserved amino acids can you identify? Compare the logo of the repeat family with the conserved amino acids that you found. What do you observe?
11. Pairwise sequence alignments can identify regions that are conserved.
  Obtain the amino acid sequence of the first and second AP2 domain of PLT1 that was found in InterPro and perform a pairwise sequence alignment with algorithms you can find on the [EBI website](https://www.ebi.ac.uk/jdispatcher/psa).
  First perform a global alignment using the Needleman-Wunsch algorithm (Needle). Choose protein alignment and add the protein sequence of each of the protein domain sequences of PLT1. What is the overall identity and similarity between the two domains, and why do these two values differ?
12. Now perform a local alignment using the Smith-Waterman algorithm. Do you expect to observe large differences between the global and the local alignment? Explain why.
```


```{exercise} Analyses of the PLT1 family - part 2, finding homologs, 30 minutes

After we analysed the PLT1 sequence, we want to find potential homologs of PLT1 in the thale cress _Arabidopsis thaliana_.
We will use BLAST to identify protein sequences in publicly available databases with sufficiently high similarity scores such that these are likely homologs of PLT1.
1. Go back to the UniProt database and click on Tools -> BLAST within the UniProt entry. Change the target database to "UniProtKB Swiss-Prot" and perform the search (‘Run BLAST’). What is the ‘best’ hit found (how could you define ‘best’)? Look at the second-best hit, which sequence is that and in which organism is it found? Report the E-value, the identity, and the score. How might the two sequences be related?
2. How many hits do you find with that search?
3. Do you expect to find even more database hits in the UniProtKB database than what your original search showed? Why? Which database would be the most useful database to identify PLT1 homologs in plants? Why?
4. How could you influence the number of hits you find in the database?
5. Repeat the search, but only consider hits with an E-value of 1e-4 and up to 1,000 possible matches. How many hits do you find?
6. Now we want to focus on homologs in _A. thaliana_ (click on _A. thaliana_ in popular organism). How many hits do you find in _A. thaliana_?
7. On the right part of the output page, you can find a graphical overview of the alignment (aligned part highlighted as thick bar). You can also click on these to see the aligned regions. If you look at the first ten sequences, what do you observe regarding the aligned region, and what does this suggest? Is this what you would expect from a BLAST search, and why?
8. Save the first ten database hits in fasta format. Note: UniProt provides an alignment option, which provides the easiest way to get all sequences of interest: Mark them -> click Align -> click Align selected results -> copy the sequences from the window into a text file, take care to copy the whole 10 sequences.
```


```{exercise} Analyses of the PLT1 family - part 3, conservation, 30 minutes

Next, we want to explore the conservation of the PLT1 family identified in the previous assignment.
To this end, we use multiple sequence alignments.
1. Use the first ten hits from the Swiss-Prot database (see assignment V, question 8.) to perform the multiple sequence alignment using [MAFFT](https://mafft.cbrc.jp/alignment/server/). Download this alignment in FASTA format and save it somewhere you will be able to find it again. You will re-use this alignment in Chapter 3 to build a phylogenetic tree.
2. Which regions are well aligned, and which not? How can you easily spot these in a multiple-sequence alignment? How does this region relate to the previously identified protein domains?
3. Look at the iterative refinement methods available as options in MAFFT. Which strategy do you find appropriate for your data set?
4. Run the strategy that you propose and compare it to the previous alignment. What do you observe? Check the results page of the first run again. Can you find an explanation for your observation?
5. Display your first multiple sequence alignment (question 1) in an [alignment viewing program](https://www.ebi.ac.uk/jdispatcher/msa/mview). Locate the start of the first AP2 domain in the alignment (Hint: look at the Pfam logo and try to find the first 2 highly conserved positions). Where does the domain start? Look at the first 10 positions of the domain and compare the conservation in the alignment to the Pfam logo. What do you observe?
6. Next, we try a different alignment tool: [M-Coffee](https://tcoffee.crg.eu/apps/tcoffee/do:mcoffee) from the [T-Coffee suite](https://tcoffee.crg.eu/apps/tcoffee/index.html). Does that tool provide a good global alignment? Why/why not?
7. The T-Coffee suite also includes a program to extract reliable regions from an alignment: the Core/TCS tool. We want to use this tool to extract reliable columns from our alignment. Use the button under "Send results" -> Core/TCS at the bottom to run it, then click "Submit". A fasta file, where only the well aligned columns are included, can be downloaded at the bottom ("fasta_aln file"). Display this file in mview. What can you say about the quality of this alignment?
```

```{exercise} Motif discovery in bacteria, 20 minutes

The bacterial immune system CRISPR/Cas encodes the defense sequences to target mobile genetic elements in the CRISPR (clustered regularly interspaced short palindromic repeats) locus, where the defense sequences are located between repeats.
Here we will use motif discovery to determine the repeat sequences.
1. Access the RefSeq database at NCBI to retrieve the genome data for _Streptococcus thermophilus_ (Accession NZ_LR822015.1). Hint: Use Customize view to display all features
2. Go the the first `repeat_region` feature. Where in the genome is it located? Retrieve the sequence of this feature (Hint: click on `repeat_region` and then on `Fasta` in the bottom right).
3. Use MEME and MAST to discover the motif. Go to the [MEME suite](https://meme-suite.org/) and click on MEME. Under Input, select "Type in sequences" from the dropdown menu to paste your fasta sequence. Choose the correct option under "How do you expect motif sites to be distributed in sequences?" and select one motif to find.
4. After running the search, retrieve the MAST HTML output. Which motif do you find and how often does it occur in the sequence? Compare the motif to the repeat annotated in RefSeq. What do you observe?
```

```{exercise} Primer design for the Phytophthora infestans effector gene Avr1, 30 minutes

_Phytophthora infestans_ is the causal agent of tomato and potato late blight disease.
Potato late blight had significant historic impact in Europe and North America as it led to the Great Famine in Ireland in the middle of the 19th century, where one million inhabitants of Ireland died and another million emigrated to the United States of America. _P. infestans_, as many other plant pathogens, utilizes so-called effector proteins to establish themselves in susceptible plant hosts. The _Avr1_ gene in _P. infestans_ encodes an effector _Avr1_ that contributes to virulence in susceptible potato plants, yet is recognized by the plant immune system in some resistant potato varieties. Therefore, to avoid recognition by the plant immune system, some _P. infestans_ isolates lost the _Avr1_ gene. Here, we will look for the presence of _Avr1_ by designing primers for its sequence (XM_002896847.1). Recently, a farmer collected different _P. infestans_ isolates from his fields around Wageningen, and the farmer wants to know if these isolates contain _Avr1_. Here, we aim to design primers that can be used to detect the presence of the _Avr1_ gene in _P. infestans_.  
1. To help you design 'appropriate' primers (remember what characteristics are important when designing a primer), we will use [PrimerBLAST](https://www.ncbi.nlm.nih.gov/tools/primer-blast). PrimerBLAST combines Primer3, a program that designs primers for a given target sequence, and BLAST, which determines if the primer sequences are specific.
2. Have a look at the settings for the expected product size (default value is set to be between 70-1000nt). What does this mean?
3. We want to make sure that our designed primers are as specific as possible. Therefore, we want to avoid that the designed primer can match to any other region in the genome other than the target region, in this case _Avr1_. Therefore, we can indicate that PrimerBLAST will check the specificity against the _P. infestans_ genome sequence. To this end, select the database ('Refseq representative genomes') and enter _Phytophthora infestans_ in the 'organism' field. One of the possibilities is also to use the 'non-redundant' (nr) database. Can you imagine why choosing the nr database can be a problem when identifying specific primer sequences?
4. Enter the _Avr1_ accession into the search field of PrimerBLAST, and run PrimerBLAST with the options defined under question 3 (database and organism). PrimerBLAST will identify that your _Avr1_ is matching to an existing sequence in the database, which can interfere with the identification of specific primers. To make sure that PrimerBLAST takes this into account, select the database sequence, and proceed by clicking on the submit button.
5. Look at the results from PrimerBLAST. On top, you will find a summary about your submitted sequence (its length), and a message on whether PrimerBLAST was able to identify specific primers. Below, you will find a graphical overview of the distribution of the primer pairs along your sequence, as well as detailed information for each of the primer pairs (e.g., GC, Tm, length, and product length). Which of the primer pairs would be the best, and why (clearly all primers fulfill the quality criteria)?
6. If you place your mouse over the primer pair in the graphical overview, you can save the sequence of the primer and the product as a FASTA formatted file. Moreover, you can also directly search the product in the NCBI databases using BLAST. Why is it useful to save such a primer sequence?
7. BLAST the product of 'Primer pair 2', set the Max target sequences to the maximum and leave all other settings to default. How many hits do you find in the database that match your product? Can you imagine why PrimerBLAST indicated that your primer pair is specific?
8. PCR cannot only amplify regions from the genome, but also regions from mRNA (mRNA needs to be first converted into cDNA). When performing this type of PCR, one tries to design primer pairs that span an intron in the gene of interest (this is also an option in PrimerBLAST). Can you speculate why primers spanning an intron can be helpful?
```

```{important} **Project Preparation Exercise**

We continue the project exercise from chapter 1.
Both ARF5 and IAA5 belong to large gene families in _A. thaliana_.
Now, focus on the ARF5 family and explore it by identifying homologs and looking for conserved parts among the family members.
Perform this analysis both within _Arabidopsis thaliana_ and outside of this species.
Assess in which plant families members are detected.

Describe the following items in a few bullet points each.
You may include up to two figures or tables.

1. **Materials & Methods** What did you do? Which data, databases and tools did you use, and why did you choose them? What important settings did you select?
2. **Results** What did you find, what are the main results? Report the relevant data, numbers, tables/figures, and clearly describe your observations.
3. **Discussion & Conclusion** Do the results make sense? Are they according to your expectation or do you see something surprising? What do the results mean, how can you interpret them? Do different tools agree or not? What can you conclude? Make sure to describe the expectations and assumptions underlying your interpretation.
```

```{bibliography}
```
