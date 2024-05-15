# Week 2 - Alignment, sequence search, and primer design

In week 2 of Introduction to Bioinformatics, you will study sequence alignment.
In this week, we use public reading material.
Read this reading guide carefully and study the described sections.

Make sure you understand what DNA and protein alignments are used for and that you can explain the differences between local and global alignments.
You should be familiar with concepts related to alignments and sequence search, like dotplots, alignment scores, e-values, and substitution matrices.
Make sure you understand what multiple alignments are used for and that you can explain the differences between different solutions for the MSA problem.
You should understand what motifs are and the basics of profile hidden Markov models.
Finally, make sure that you know the basics of primer design.

During the practical you will learn how to make pairwise and multiple-sequence alignments, perform sequence searches and motif analyses, design primers, and discuss the results.


## Introduction

%#%[TODO: There can be more biological examples in this section]

Comparing DNA and protein sequences is a key tool in the field of applied bioinformatics.
By analyzing these sequences, researchers can annotate genes from new genomes, build models of protein structures, and investigate gene expression, i.e., which genes are turned on and off.
It is important to notice that nature tends to stick with what works, rather than reinventing the wheel for each species.
Instead, organisms evolve from ancestors, they accumulate mutations ([Week 1](Week1_substitutions)), and gradually develop new traits over time.
That means that similar genes can be found in different organisms and the functional information can be transferred from one protein to another if both possess a certain degree of similarity.
However, even though two proteins may look similar, they could also have different functions.
Generally, similarities arise because of shared ancestry (divergent evolution), nevertheless, similarities can also appear independently (convergent evolution).

Before diving into the analysis of whether sequences are related, it is important to understand some key terms.

```{admonition} Homology and similarity
:class: important
**Homology** means that sequences share a common evolutionary history and therefore have a common ancestor.
Homology is not quantifiable.
If two sequences have a common ancestor, they are homologous.
Thus, two sequences are either homologous or they are not.

**Sequence identity** and **sequence similarity** are often used to infer whether two sequences are homologous.
We can measure the identity or similarity between sequences and we will see how to do this later in this chapter.

In contrast, we cannot measure homology, but we can only infer it.
```

```{admonition} See also
:class: seealso
Here is a classic paper on homologous protein families: [Tatusov et al., 1997](https://pubmed.ncbi.nlm.nih.gov/9381173/).
```

## Dot plots

:::{figure} images/Week2/dot_small2.png
:alt: Small dotplot example
:align: right
:width: 90%
:name: dotsmall

A small example of a dotplot. \
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`dot_small_2024`.
:::

Dot plots are a simple way to visualize similar regions between two sequences.
They are represented by a two-dimensional array, where one sequence is written vertically and the other horizontally.
A dot is placed in a cell, where the residues are identical.
In the resulting plot, similar regions appear as diagonal stretches and insertions and deletions appear as a discontinuity in a diagonal line ({numref}`dotsmall`).

A sequence can also be compared to itself, then the main diagonal will be filled with dots and additional repeats are on the off-diagonal ({numref}`dotlarge`).

:::{figure} images/Week2/dot_large.png
:alt: Large dotplot example
:width: 100%
:name: dotlarge

An example of a dotplot to compare a sequence with itself. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`dot_large_2024`.
:::

This simple way of marking identical residues shows a lot of background noise.
To detect interesting patterns, typically a filter is applied.
For example, a minimum identity should be present across a certain window size, i.e., consecutive number of residues being considered.
This feature is implemented in a webserver to visualize dotplots, [dotlet](https://dotlet.vital-it.ch/) {cite}`dotlet_2000` ({numref}`dotweb`).

:::{figure} images/Week2/dot_web.png
:alt: Screenshot of dotlet
:width: 100%
:name: dotweb

A screenshot of [dotlet](https://dotlet.vital-it.ch/) with sequence `MRRPDFMDALQGFLSPLNPAHQLDFMDSLGNLRLEECRIM`.
- (A) The two sliders to change the appearence of the plot: The top slider can adjust the sensitivity, moving it to the right, fewer similar regions are shown; moving it to the left, also regions with lower similarity appear. The bottom slider adjusts the color scheme and is less relevant compared to the top slider.
- (B) The histogram indicates how many hits with a particular similarity are shown; thus the slider can be adjusted to the right tail of the histogram.
- \(C) The two sliders that can adjust how the two sequences are positioned against each other.
- (D) Serves a similar function to the two sliders of C but allows for arrow key navigation of the dotplot.
- (E) Here you can select the window size of sequence comparison and the scoring matrix (window size is explained [below](Week2_blast_algorithm) and substitution matrices will also be explained [below](Week2_substitution_matrices).
- Credits: {cite}`dotlet_2000`.
:::

## Pairwise alignment

Dot plots provide a visual way to compare two sequences, however, they do not give the similarity between two sequences.
To calculate sequence similarity or sequence identity, we need to perform a **pairwise sequence alignment**.
In an alignment, the two sequences will be placed above each other and gaps can be introduced to represent insertions or deletions of residues.
We also say that the two sequences will be **aligned**.
The resulting alignment contains matches, mismatches, and gaps ({numref}`algterm`)

:::{figure} images/Week2/alg_term.png
:alt: Small alignment example
:width: 50%
:name: algterm

A small example of two aligned sequences. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`alg_term_2024`.
:::

### Alignments of DNA sequences

Every position in a sequence could potentially have an instertion or a deletion, so there are many possible locations and combinations for gaps and thus many potential alignments.
The final alignment will be the one with the maximum total alignment score.
This score is determined by the scoring parameters that are chosen before the alignment calculation.
An example of DNA sequence scoring paramaters could be that matches score 1 and mismatches -1 and that there is a gap penalty of -1.
The total alignment score is calculated by summing over all columns in the alignment ({numref}`algscore`).

:::{figure} images/Week2/alg_score.png
:alt: Small alignment example with scoring
:width: 60%
:name: algscore

An example calculation of the alignment score, where matches score 1, mismatches -1 and there is a gap penalty of -1.
This results in a total score of 1 for this alignment. [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`alg_score_2024`.
:::

The choice of the scoring parameters has an impact which alignment will have the maximum score.
To understand the impact of the parameters on the final alignment, fill in table {numref}`algex`.

:::{figure} images/Week2/alg_exercise.png
:alt: Exercise to score alignments
:width: 100%
:name: algex

**Assignment**: Fill the table for the two alignments and the two sets of scoring parameters.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`alg_exercise_2024`.
:::

```{admonition} Note 2.1: Affine gap costs
:class: note
The DNA and protein sequences that we want to align often have varying lengths, which is the result of insertions and deletions during evolution.
Insertion and deletion events can affect one or multiple residues, where one event of length 2 is more likely to happen than two independent events of length 1.
To include this in the scoring scheme, alignment programms use **affine gap costs** that distinguish between opening a gap and extending a gap.
For example, the default parameters of the pairwise alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) {cite}`EMBL_tools_2022` are:

Gap open (score for the first residue in a gap): -10

Gap extend (score for each additional residue in a gap): -0.5
```

### Alignments of protein sequences

(Week2_substitution_matrices)=

#### Substitution matrices

In [week 1](Week1_aminoacids), we learned that different amino acids have different chemical properties.
When the protein structure and function are conserved, it is more likely that an amino acid gets exchanged by a chemically similar amino acid, compared to a very different one.
When aligning protein sequences, we thus want to penalize the exchange of chemically dissimilar amino acids and reward the exchange of chemically similar amino acids.
To this end, the score of matches and mismatches is generally determined by a **substitution matrix**, e.g., BLOSUM62 - **BLOSUM (BLOck SUbstitution Matrix)** ({numref}`blosum62`).

:::{figure} images/Week2/blosum62.svg
:alt: Blosum 62 matrix
:width: 100%
:name: blosum62

The BLOSUM62 amino acid substitution matrix.
The matrix is ordered and positive values and zero values are highlighted.
Credits: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) {cite}`blosum62_2022`.
:::

```{admonition} Box 2.1: Assignment
:class: tip
Look at the amino acid properties in the table in [week 1](Week1_aminoacids), choose some amino acids with the same properties and some with different properties.
Then look up these pairs in the BLOSUM62 matrix.
What do you observe?
```

The substitution matrix and the gap parameters then determine the alignment score ({numref}`aa_alg`).

:::{figure} images/Week2/aa_alg.png
:alt: A small example to score a protein alignment
:width: 100%
:name: aa_alg

Example of a pairwise protein alignment.
With the BLOSUM62 scoring matrix, a gap opening score of -10, and a gap extension score of -1, the resulting alignment score is 34.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`aa_alg_2024`.
:::

Note that we motivated the use of amino acid substitution matrices by the chemical properties of amino acids; however, these properties were not directly used when determining these matrices.
Instead, the BLOSUM matrix is determined by aligning conserved regions from Swiss-Prot ([week 1](Week1_uniprot)) and clustering them based on identity.
Then, the substitutions between the different pairs of amino acids within a cluster are counted, which is used to compute the BLOSUM scores.
Thus, these scores reflect directly which amino acids are exchanged more often with each other over evolutionary time and we can observe that this frequency is strongly correlated to their chemical properties.
There are different versions of BLOSUM, for example BLOSUM62 was derived by clustering sequences with an identity of 62% and it is appropriate for comparing protein sequences having around 62% identity.
Other available matrices are for example BLOSUM45 and BLOSUM80 ({numref}`submat`).

Another group of matrices that was derived even before BLOSUM is **PAM (Point Accepted Mutation)**.
The entries in a PAM matrix denote the substitution probabilities of amino acids over a defined unit of evolutionary change.
For example, PAM1 represents one substitution per 100 amino acid residues and is thus appropriate for very closely related sequences.
A commonly used matrix is PAM250, which means that 250 mutations happened over 100 residues; that is, many residues have been affected by more than one mutation.

:::{figure} images/Week2/submat.svg
:alt: Example calculation for identity and similarity
:width: 80%
:name: submat

An overview of different available substitution matrices. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`submat_2024`.
:::
%#% Own figure

:::{seealso}
An introduction into PAM and BLOSUM substitution matrices.

<div class="videoWrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/68lF71zEUF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
:::

#### Protein identity and similarity

For two protein sequences, we can distinguish two different measures of how much they are alike: identity and similarity, which are defined slightly differently.
The **protein identity** is given by the number of identical amino acids divided by the alignment length.
The **protein similarity** is given by the number of similar amino acids **and** the number of identical amino acids divided by the alignment length.
In the pairwise alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle), **identical amino acids** are marked by a pipe symbol/vertical line (|), **similar amino acids** are marked by a colon (:) and defined by pairs that have a positive score (i.e., >0) in the chosen substitution matrix ({numref}`aa_sim`).

:::{figure} images/Week2/aa_sim.png
:alt: Example calculation for identity and similarity
:width: 60%
:name: aa_sim

Example protein alignment. The percent identity is 10 / 18 = 55.6% and the percent similarity is 14 / 18 = 77.8%.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`aa_sim_2024`.
:::

Note that the pairwise alignment method does not try to maximize similarity or identity, but they are a result of the chosen parameters.
Especially for distantly related sequences, the parameters can have a big impact on the alignment and thus on the estimated identity and similarity.
In {numref}`alg_gap`, you can find an example where two protein kinases from rice.

:::{figure} images/Week2/alg_gap.png
:alt: Impact of gap parameters on alignment
:width: 100%
:name: alg_gap

Alignments of the same two sequences (LERK1_ORYSI and XA21_ORYSI) with different parameters:
A) BLOSUM62 matrix, gap open: -10, gap extend: -0.5. Identity = 210/1191 (17.6%), Similarity = 345/1191 (29.0%).
B) BLOSUM62 matrix, gap open: -5, gap extend: -0.5. Identity = 305/1166 (26.2%), Similarity = 428/1166 (36.7%).
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`alg_gap_2024` made using [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) {cite}`EMBL_tools_2022`.
:::

Up until now, we have only considered pairwise alignments, where both sequences are aligned completely, these are called **global alignments**.

```{admonition} Note 2.2: Finding the best alignment
:class: note
There is a huge number of alignments possible for two sequences, since the gaps can be placed in many different ways.
However, to find the **optimal alignment**, i.e., the one with the highest score, it is not necessary to explore all these possibilities.
Efficient algorithms exist that guarantee to find the optimal alignment.
The Needleman-Wunsch algorithm was the first algorithm and can solve this task in a time that is quadratic to the length of the input sequences.
```

### Local alignments

The previous example shows that some sequences might not be related over their full length.
We have seen in [week 1](Week1_Interpro) that many proteins are composed of domains.
When comparing two proteins, only some parts that correspond to the domains might be related.
Then, it is more appropriate to perform a **local alignment**.
Local alignment is also a good tool for identifying functional sites from which sequence patterns and motifs can be derived {numref}`alg_local`.

The aim of a local alignment is to find the best subsequences of both input sequences that result in the maximum alignment score given the alignment parameters.
As for global alignment, efficient algorithms exist to solve this task.
The Smith-Waterman algorithm can also solve this task in a time that is quadratic in the length of the input sequences, just like the Needleman-Wunsch algorithm for global alignments.

:::{figure} images/Week2/alg_local.png
:alt: Local alignment
:width: 100%
:name: alg_local

Alignments of the same two sequences, once using the global alignment program [needle](https://www.ebi.ac.uk/jdispatcher/psa/emboss_needle) and once using the local alignment program [water](https://www.ebi.ac.uk/jdispatcher/psa/emboss_water) {cite}`EMBL_tools_2022`.
The same alignment paramters were used: [DNAfull matrix](https://rosalind.info/glossary/dnafull/), gap open -10, gap extend -0.5.
The global identity is 20/71 (28.2%) and the local identity is 12/12 (100.0%).
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`alg_local_2024`.
:::

## Search in sequence databases

### Database search vs. pairwise alignment

Pairwise alignments are also used when searching sequences in sequence databases.
In this task, we have a query sequence and we want to find similar sequences in a database; these similar sequences are called subjects or hits.
Although the algorithms that were discussed in the previous section are relatively fast when two sequences are aligned, it would still take too long overall to perform pairwise sequence alignments of the query with all potential subjects from the database.
We thus need even more efficient algorithms.

```{admonition} Note 2.3: Heuristic algorithms
:class: note
The Needleman-Wunsch and the Smith-Waterman algorithm described in the previous section guarantee to find the alignment with the best score for the given sequences and parameters.
In contrast, an **heuristic algorithm** employs some heuristics, which generally lead to good results and which make the algorithm much faster. However, the method does not guarantee to find the optimal score anymore.
```

### BLAST

Basic Local Alignment Search Tool (**BLAST**) is a heuristic method to find regions of local similarity between protein or nucleotide sequences.
The program compares nucleotide or protein sequences to sequences in a database and calculates the statistical significance of the matches.
Both the standalone and web version of BLAST are available from the National Center for Biotechnology Information ([NCBI](https://www.ncbi.nlm.nih.gov)).

(Week2_blast_algorithm)=

#### The algorithm

The starting point of BLAST is the words that two sequences have in common, where a word is a part of the sequence of a fixed length.
For protein blast, the default word size is 5 and for nucleotide blast it is 11.
To find these common words, first a lookup table of the query words is reconstructed ({numref}`blast`A).
In which neighborhood words are listed as well. These are all the words that have a high alignment score with the query word ({numref}`blast`B).
Then, BLAST scans the database for word matches.
For protein blast, two matches within 40 residues must be found such that the BLAST considers the hit as an initial match ({numref}`blast`C).
Note that for nucleotides, initial hits are found in a simpler way:
Only one exact match must be found, i.e., no neighborhood is considered.

After finding initial matches, BLAST extends these matches into local alignments ({numref}`blast`D).
As this extension happens, the alignment score increases or decreases.
When the alignment score drops below a set level, the extension stops.
This prevents the alignment from stretching into areas where there is very little similarity between the query and hit sequences.
If the obtained alignment receives a score above a certain threshold, it will be included in the final BLAST result.
BLAST is thus a heuristic algorithm, but its careful process helps to ensure a reasonable trade-off between run time and accuracy.

:::{figure} images/Week2/blast.png
:alt: Blast overview
:width: 100%
:name: blast

An overview of the BLAST algorithm. Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`blast_2022`.
:::

#### BLAST output

The BLAST output contains vast information on the found hits, their alignments, and taxonomy ({numref}`blast_output`).

:::{figure} images/Week2/blast_output.png
:alt: Blast output
:width: 100%
:name: blast_output

Top 5 blast hits when searching the rat protein P50745 in the Swiss-Prot 2024_02 release database. Credits: {cite}`blast_2009`
:::
%#% Own figure

```{admonition} Note 2.4: E-value
:class: note
An important output statistic is the expectation value (**e-value**), which is the number of BLAST hits you expect to see by chance in the database, with the observed score or higher.
Note that due to this definition, the e-value depends on the database size.
Since it is more likely to find something by chance in a larger database, the e-value for the same hit would be higher compared to a smaller database.
Thus, to find as many good hits as possible, it makes sense to use the smallest specific database that contains all the sequences you are interested in.
For example, if you are only interested in plants, then restrict your search to only plant sequences.
During the practical you will get to know how to do that in the online BLAST interface.

The BLAST output is sorted by increasing e-value.
This can result in very low numbers and the BLAST output uses the scientific notation to list these, where e.g., 3e-145 means 3*10{sup}`-145`.
Thus, the hits listed in {numref}`blast_output` are likely not random, since their number to be observed by chance is very low.
If the alignment is not by chance, then it might be due to a biological meaningful relationship between the two sequences.
However, it is difficult to define a clear e-value cutoff for biologically meaningful hits.
Commonly used cutoffs are 1e-5 or 1e-10.
```

Note that you cannot infer homology by e-value alone, also the coverage and percent identity need to be taken into account.
For example, in {numref}`blast_output`, all hits have very low e-value:
the first hit is to the sequence itself, then there are hits with high identity and high coverage in mouse and human, these might be homologous sequences.
The 4{sup}`th` and 5{sup}`th` hit are only local, since the query cover is ~30%, these sequences might only share a homologous domain with the query protein.

#### BLAST types

Different types of BLAST exist to search nucleotides or proteins in the respective databases:
`blastn` searches a nucleotide sequence in a nucleotide database and `blastp` searches a protein sequence in a protein database ({numref}`blast_types`).
In addition, the query and/or the database can also be translated in all six reading frames to allow additional kinds of comparisons.

%#%[TODO: check that the reading frame translation is clear from week 1 or explain more]

Different BLAST types exist for these different kinds of comparisons, where these translations are done automatically ({numref}`blast_types`).

:::{figure} images/Week2/blast_types.png
:alt: Blast types
:width: 100%
:name: blast_types

Different BLAST types to compare different data types. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`blast_types_2024`.
:::

%#%[TODO week 1: File formats]

## Multiple sequence alignment

Rens

## Motifs

PSSM, logo

Rens

## HMMs

jackhammer, psi-BLAST(!)

Rens

## Primer design

Rens

**OLD**

This reading material was provided last year:
* Alignment
 * pairwise alignment
 * scoring matrices
 * alignment score, example calculation
 * BLAST
 * HMMs (very short)
 * Needleman Wunsch and Smith Waterman (very short)
* Dot plots
* Scoring matrices
* BLAST
* MSA
* Sequence motifs
* HMMs
* Primer design

## Alignment

Read chapter 3 of “Applied Bioinformatics” (Selzer):
Sequence Comparisons and Sequence-Based Database Searches available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007/978-3-319-68301-0_3.pdf).

All material of Chapter 3 is relevant for this course.
Therefore, you are required to study the whole chapter.
Unfortunately, the chapter contains some errors:
* p. 36 first paragraph: "convergent evolution" and "divergent evolution" should be swapped.
* p. 37 Fig 3.1: in the panel “Insertions and Deletion” W is matched with Q. There should not be a line between these 2 amino acids.
* p. 38 Fig 3.2: There are many errors in the BLOSUM62 matrix, you can find the correct matrix in ({numref}`blosum62`). The scores with the correct matrix are 68 for the green alignment and 12 for the red alignment.
* p. 42 “The evolutionary distances correspond to the length of the horizontal branches.” The word horizontal should be removed. All branches correspond to evolutionary distances.


After reading you should be able to answer for example the following questions:
* What is the difference between local and global alignment
* Given a pairwise alignment and the scoring parameters, calculate the alignment score and decide which alignment is better. For example, fill in the table in ({numref}`pairalgexa`).

:::{figure} images/Week2/pairwise_alignment_example.png
:alt: Example to calculate scores of pairwise alignments
:width: 100%
:name: pairalgexa

Fill the table: Calculate the scores of both alignments under both scoring schemes.
:::


### Dot plots

Read section 3.1.1. of “Comparative Gene Finding” (Axelson-Fisk): Dot Plot Matrix - available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007%2F978-1-4471-6693-1_3.pdf).

After reading, you should be able to describe what dot plots are and what they are used for.

### Scoring matrices

Read section 4.1. of “Bioinformatics and Computational Biology” (Tiwary): Introduction - available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007/978-981-16-4241-8_4.pdf).


After reading, you should be able to explain when amino acid alignment and when nucleotide alignments are used.
Also, you should be able to name which BLOSUM and which PAM matrix is used for divergent sequences.

### BLAST

Read two websites:
* Section 1 from BLAST QuickStart available from [here](https://www.ncbi.nlm.nih.gov/books/NBK1734/)
* and “How does BLAST work?” available from [here](https://resources.qiagenbioinformatics.com/manuals/clcgenomicsworkbench/current/index.php?manual=How_does_BLAST_work.html).

After reading you should be able to name the different steps of BLAST and to describe how the word size can influence the results.

### Multiple sequence alignment

Read parts of “Multiple sequence alignments” (Sperlea) available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007/978-3-662-64473-7.pdf).

Read:
* 1.1 Introduction
* 1.2 Areas of Application of MSAs
* 1.3.1 FASTA
* 1.3.7 Graphical Visualizations
* 2.3 Multiple Sequence Alignments

After reading, you should be able to explain what MSAs are and which different kinds of solutions exist for this problem.

### Sequence motifs

Read Sections 1-2 of “Discovering sequence motifs” (Bailey) available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007/978-1-59745-514-5_17.pdf).

After reading, you should be able to read the representation of sequence motifs and evaluate if a motif has a hit in a certain sequence, for example, given the genome sequence ACCTGAATGTTAA, which of the following motifs has a hit in the genome?

* T-G-A
* G-A(1,2)-T
* A-A-N-T-T

Also, you should be able to read logos and evaluate which positions are conserved for which amino acids.

### Hidden Markov models

Read “What are profile hidden Markov models” available from [here](https://www.ebi.ac.uk/training/online/courses/pfam-creating-protein-families/what-are-profile-hidden-markov-models-hmms/).

After reading, you should be able to explain which properties of MSAs are represented in HMMs.

## Primer Design
Read parts of chapter 5 of “Introduction to Bioinformatics in Microbiology” (Christensen): Primer Design - available from [here](https://link-springer-com.ezproxy.library.wur.nl/content/pdf/10.1007/978-3-319-99280-8_5.pdf).

Only some sections of this chapter are relevant for this course.
Nevertheless, these sections provide a clear and concise overview of bioinformatic considerations when designing PCR primers.
You should specifically focus on the part about PCR.
The part on hybridization (i.e. as used in microarrays) is not relevant for this course.

Read:
* 5.1 Background for Oligonucleotide Design
* 5.2 General Rules for Design of Oligonucleotides
* 5.3.1 String comparison by Score
* 5.3.3 Design of Primers for PCR and “Kwok’s Rules”
* 5.4.1 Estimation of Tm by Formula

Unfortunately, there is a typo in the Tm formula on p. 91 in the book.
The correct formula is Tm=4(G+C)+2(A+T)

After reading, you should be able to explain the basics of primer design and to name which factors influence primer design.

## References

```{bibliography}
:filter: docname in docnames
:labelprefix: 2W
```