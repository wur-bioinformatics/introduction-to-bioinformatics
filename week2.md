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

:::{figure} images/Week2/blosum62.png
:alt: Blosum 62 matrix
:width: 100%
:name: blosum62

The BLOSUM62 amino acid substitution matrix.
The matrix is ordered and positive values and zero values are highlighted.
Credits: Ppgardne, CC BY 4.0 https://creativecommons.org/licenses/by/4.0, via Wikimedia.
:::

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

:::{seealso}
An introduction into PAM and BLOSUM substitution matrices can be found [here](https://www.youtube.com/watch?v=68lF71zEUF8).
:::

After reading, you should be able to explain when amino acid alignment and when nucleotide alignments are used.
Also, you should be able to name which BLOSUM and which PAM matrix is used for divergent sequences.

### BLAST

Read two websites:
* Section 1 from BLAST QuickStart available from [here](https://www.ncbi.nlm.nih.gov/books/NBK1734/)
* and “How does blast work?” available from [here](https://resources.qiagenbioinformatics.com/manuals/clcgenomicsworkbench/current/index.php?manual=How_does_BLAST_work.html).

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
