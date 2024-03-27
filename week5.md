# Week 5 - Omics data analysis

:::{figure} images/Week5/omics-levels.png
:alt: -Omics levels
:align: center
:name: omics_levels

Different -ome levels, here illustrated with numbers for *Arabidopsis thaliana*.
:::
%#% Self created figure?

---

> Etymology (from Wikipedia)
>
> **-ome** (“whole of class”) + **-ics**, both via international scientific vocabulary and New Latin ultimately from Ancient Greek
>
> Suffix
>
> -omics
>
> (chiefly biology) Forms nouns meaning “a study of the totality of something”.

This chapter discusses what we call omics measurements: genomics,
transcriptomics (gene expression), proteomics and metabolomics. Omics
technologies measure the presence, levels and/or interactions of different
types of molecules in the cell, obtaining data for all molecules at once (see {numref}`omics_levels`).
Genomics focuses on the entirety of information that can be derived from
genomes (structure, function, evolution, etc.). Transcriptomics, proteomics,
and metabolomics focus on gene expression, protein, and metabolite levels,
respectively. Finally, phenomics measures the outward appearance and
behavior of cells and organisms.

The concept of genes is central to the dogma of molecular biology: it
therefore makes sense that much early research was invested in sequencing
genomes. These genomes were then annotated for genes, with accompanying
predicted protein sequences. This focus on sequences has dominated much of
the first decades of bioinformatics, leading to the development of the
databases and tools for sequence alignment, phylogeny and sequence-based
prediction of structure that were discussed in earlier chapters. However,
after sequencing the first genomes it became clear that the DNA tells only
part of the entire story: the expression of genes and proteins and their
interactions in processes within and between cells govern how cells and
organisms behave. This led to research in functional genomics and systems
biology, for which computational data analysis of other omics level data
have become indispensable.

Below, genomics will first be introduced along with the most relevant
technology: sequencing, which is also used for transcriptomics. This will
be followed by an introduction to functional genomics and systems biology
and overviews of transcriptomics, proteomics, metabolomics, and phenomics, as well as
the main types of data analysis involved.

---

## Genomics and sequencing
:::{figure} images/Week5/central-dogma.png
:alt: Central dogma of molecular biology
:align: right
:width: 360px
:name: central_dogma

Information flow in the cell. \
Credits: CC0 1.0 \
https://creativecommons.org/publicdomain/zero/1.0/ \
{cite}`central_dogma_2008`
:::
DNA is the starting point in the chain of biological information flow. The
central dogma of molecular biology was postulated by Francis Crick in 1958:
cellular processes allow information flow away from DNA to RNA and then to
proteins, not the other way around ({numref}`central_dogma`). From DNA we progress
through transcription and translation towards whole organisms and their
phenotypes. So, it is fitting to start at the beginning. Even before
people knew about DNA and its role as keeper of hereditary information, they
were aware that parental characteristics are inherited by offspring. Around
1866 Gregor Mendel was the first to perform detailed experiments testing
heritability. He first described 'units of heredity', later named genes. 
Today, we know that genes are encoded in the DNA in our cells. Our
understanding of genes has expanded to a more complex concept, focused on
stretches of DNA coding for proteins or RNA. The term genome was originally
used to describe all genes in an organism or cell, but now refers to the
full DNA content of a cell.

(w5box1_humangenomeproject)=
::::{admonition} Box 1: The Human Genome Project
:class: tip
The goal of the Human Genome Project (HGP) was to sequence and annotate all genes in the human genome. 
```{image} images/Week5/vitruvian-man.jpg
:width: 150px
:align: right
:name: vitruvian_man
```
The project formally started in 1988, although sequencing did not start
until around 1990. During the first stages, technology development played
an important part and led to the development of techniques such as PCR
(polymerase chain reaction), gel electrophoresis, and other radically new lab
protocols. The human genome was completely sequenced with Sanger sequencing
technology (which is described [below](sangersequencing)) and a first draft genome, covering 90%
of the estimated 3.2 billion base pairs was published in Nature in 2001,
with a final genome in 2003. One of the most surprising findings was that
the human genome only contained roughly 20,000 genes, far less than the
estimated 50,000-140,000. The entire project is estimated to have cost [\$3
billion](https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project). 
In 2021 the first true telomere-to-telomere assembly of the human genome was
assembled using the third generation technologies described below: [PacBio](pacbio),
[Oxford Nanopore](nanopore) and Hi-C.
::::
%#% In the last line of box 1 it describes third generation technologies, amongst which Hi-C. However, the section [3rdgeneration] lacks information on Hi-C.
---

### The history of genome sequencing

The first genomes sequenced were those of the Phi X bacteriophage in 1977
and the Epstein-Barr virus in 1983. The first bacterial genome,
_Haemophilus influenzae_, was sequenced in 1995, followed by the first
archaeal genome sequence of _Methanococcus jannaschii_ in 1996. In the same
year followed the first eukaryotic genome, that of _Saccharomyces
cerevisiae_ (baker’s yeast). _Escherichia coli_, the main bacterial model
organism, was sequenced in 1997. Sequencing of the human genome started
already in 1988 and was officially finished in 2003 ({numref}`landmarks_in_genetics`) and
[Box 1](w5box1_humangenomeproject)).

:::{figure} images/Week5/landmarks-in-genetics.png
:alt: History of genome sequencing
:align: center
:name: landmarks_in_genetics

History of genome sequencing and the Human Genome Project. Credits: {cite}`landmarks_in_genetics_2003`.
:::

As previously described, the project was very costly, with an estimated cost of \$3 billion. In
comparison, it is nowadays possible to sequence all variants between a human
genome and the reference for less than \$1,000 on Illumina’s NovaSeq
machine.

---

### Genomes

With the rapid evolution of sequencing technology, our understanding of
genomes and their content has grown as well. We now know that genomes vary
greatly in terms of size, chromosome numbers, and ploidy ({numref}`genome_sizes`),
as well as gene content ({numref}`gene_ploidy`). Genome sizes range from 100kb in
bacteria to more than 100Gb (Giga basepairs) in plants.
:::{figure} images/Week5/genome-sizes.jpg
:alt: Gene content table
:align: center
:name: genome_sizes

Gene content in some representative species. Credits: {cite}`genome_sizes_2009`.
:::
Humans have a genome size of 3.2Gb. Not only the genome size varies
greatly, in eukaryotes the number of chromosomes and chromosomal copies
(ploidy) do too. Chromosome numbers range from 4 in fruitfly (_Drosophila_)
to 23 in human to 50 in goldfish and 100+ in some ferns. Similarly, ploidy
ranges from haploid (single set of chromosome(s), ploidy of N) and diploid
(two copies, ploidy of 2N) to polyploid (more than 3 copies), with at the
extreme end ferns with ploidy levels of over 100. Gene numbers also vary
per species; at the low end, bacterial endosymbionts have 120+ genes,
whereas most higher eukaryotes (including humans) have between 15,000 and
25,000 genes and some plants can have more than 40,000 genes – rice has over
46,000.

:::{figure} images/Week5/gene-ploidy.png
:alt:
:align: center
:name: gene_ploidy

Left, variety of genome sizes. Credits: CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ {cite}`gene_ploidy_2010`;
right, examples of ploidy. Credits: CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ {cite}`gene_ploidy_2011`.
:::

(w5box2_size)=
:::{admonition} Box 2: Size does(n’t) matter?
:class: tip
Genomes come in all shapes and sizes. The smallest known (non-viral) genome
is that of the bacterial endosymbiont _Nasuia deltocephalinicola_, which
only consists of 112,091 nucleotides, encoding 137 proteins. The largest
genomes known to date are marbled lungfish and the plant _Fritillaria
assyriaca_ with 130,000,000,000 nucleotides (130Gb), although the amoeboid
_Polychaos dubium_ is purported to have a genome size of 670Gb. Genome size
is not necessarily correlated with the number of genes in the genome (see
also {numref}`genome_sizes`). Number of protein coding genes in turn is not
correlated entirely with organism complexity.
:::

---

#### Genome sequencing technologies

The process of generating a genome starts with DNA sequencing, the detection
of nucleotides and their order along a strand of DNA. Conceptually, there
are three ways of sequencing:

- Chemical sequencing relies on step-by-step cleaving off the last nucleotide from a chain and identifying it.
  Mainly due to the use of radioactive labels, this method was nevery widely used.

- Sequencing-by-synthesis involves synthesizing a complementary strand base by base and detecting insertion at each position.
  This is currently the most widely used method, and various implementations are available.
  It is also referred to as [Next-Generation Sequencing](nextgenerationsequencing) (NGS).

- Direct sequencing involves directly measuring the order of nucleotides in a strand of DNA, which has only recently become feasible and is thus far only implemented in [Oxford Nanopore sequencing](nanopore).

Some sequencing devices and their capabilities in terms of read length and
yield per run are shown in {numref}`sequencing_technology`.

:::{figure} images/Week5/sequencing-technology.jpg
:alt: Sequencing technology evolution
:align: center
:name: sequencing_technology

Sequencing technology, with yield per run vs. read length. Note the
logarithmic scales. Multiple dots per technology indicate improvements in
read length and/or yield due to upgrades. This figure is already outdated
with higher yields produced by the Illumina Novase and longer reads by both
Oxford Nanopore MinION/PromethION and Pacbio Sequel II devices. Credits:
CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ {cite}`sequencing_technology_2016`.
:::

---

(sangersequencing)=
##### Sanger sequencing

Sanger sequencing was the first 'high-throughput' method of DNA sequencing. 
Developed in 1977 by Fred Sanger and colleagues, the protocol was first
largely manual until it was automated in 1985 by Applied Biosystems. Sanger
sequencing uses the chain-termination method ({numref}`sanger`).

:::{figure} images/Week5/sanger.svg
:alt: Sanger sequencing
:align: center
:name: sanger

Chain termination (Sanger) sequencing. Credits: CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ {cite}`sanger_2012`.
:::

In a first step, that is universal to all sequencing techniques, genomic DNA
is purified and sheared into fragments of the desired length. For Sanger
sequencing the fragment length is around 1,000 nucleotides. Shearing is
done either mechanically or chemically, and resulting fragments are not all
exactly equally long: they are distributed around the target fragment size.

:::{figure} images/Week5/sanger-signal.png
:alt: Sanger sequencing signal
:align: center
:name: sanger_signal

Sanger sequencing signal, with low quality bases at the start of the read. Credits: CC0 1.0 https://creativecommons.org/publicdomain/zero/1.0/ {cite}`sanger_signal_2005`.
:::

Template DNA fragments are amplified in a PCR reaction using a primer and
DNA polymerase. Each sample is amplified in 4 separate reactions, one for
each nucleotide (A, T, C, G). In each of these reactions, a small
proportion of modified nucleotides (ddNTP) is added to the normal
nucleotides (dNTP). These modified nucleotides are designed to stop the
elongation of the strand and are linked to a label by which they can be
identified. This leads to a collection of partially amplified fragments of
template DNA. The length of each fragment was originally measured by the
distance the fragment travelled on a gel, in later setups by the time it
took to pass through a capillary. The label on the last nucleotide then
identifies the base at a given position and a peak pattern is generated. 
From a signal of peak patterns ({numref}`sanger_signal`), the sequence can be read
off automatically. Sanger sequencing produces read lengths between
700-1,000 nucleotides; after this, the quality of the base calling drops too
far to be useful. The quality at the beginning of a read is generally too
low to be used ({numref}`sanger_signal`). Another problem with Sanger sequencing is
the detection of homopolymers (the same nucleotide occurring multiple
times), as the peak height of the signal decreases the longer the stretch
is. This makes it difficult to differentiate between 3, 4, and 5 nucleotides
of the same base.

Sanger sequencing was the main sequencing platform until around 2007. From
2004 onwards, it was increasingly superseded by the what we call
next-generation sequencing (NGS) methods. Today it is still used, among
others to sequence PCR products to validate variants, to determine the
orientation of genes in cloned vectors, or in microsatellite studies.

---

(nextgenerationsequencing)=
##### Next generation sequencing

Next-generation sequencing (NGS) technologies allow much higher throughput
at far lower cost than Sanger sequencing, although it comes at a price:
shorter reads and lower base-calling accuracy. Where Sanger sequencing
machines could sequence 96 fragments simultaneously, these newer devices now
produce billions of reads per sequencing run. Describing all of these
methods in detail is beyond the scope of this course.

As with Sanger sequencing, NGS methods rely on amplification of a library of
input DNA fragments to enhance the signal of the actual sequencing step. 
Most sequence data is nowadays generated by Illumina technology (or [3rd
generation methods](3rdgeneration)) which allows for massive parallel
sequencing of reads. A schematic overview of the steps required for
sequencing is given in {numref}`illumina_sequencing`. Illumina sequencing uses
bridge-amplification, where the PCR reaction takes place directly on a
flow-cell surface. In the library preparation step ({numref}`illumina_sequencing`A), a
forward and reverse adapter are ligated to the ends of a single strand
template fragment. The complementary sequences for the adapters are ligated
to a flow-cell as PCR primers. The initial template sequence (with
adapters) will then form a double stranded bond with one of the primers on
the flow-cell surface ({numref}`illumina_sequencing`B). The fragment is next copied in a
standard PCR reaction, but with the end firmly attached to the surface. The
DNA is denatured to go from double stranded to single stranded again and the
original template is washed away, leaving a single fixed copy. The end of
that strand can then form a bridge with a neighbouring empty primer of the
other end and the reaction is repeated, ending in first two fixed fragments
and subsequently thousands of identical fragments near each other. In the
sequencing step ({numref}`illumina_sequencing`C), a final PCR then uses fluorescent dye
terminated NTPs, which are washed across the surface in each cycle. A
camera detects the colour, the dye is cleaved off and the steps are repeated
for the length of the sequencing reaction.

:::{figure} images/Week5/illumina-sequencing.png
:alt: Illumina sequencing
:align: center
:name: illumina_sequencing

The process of Illumina sequencing. The Illumina NovaSeq uses a system of 2
fluorescent dies compared to the traditional 4. This greatly speeds up
sequencing
:::
%#% Figure illumina_sequencing tile D looks to be a modified from the original image. Did we do this ourselves? https://www.illumina.com/documents/products/illumina_sequencing_introduction.pdf (Figure 3).
Illumina reads can be sequenced from one primer end only, which yields
so-called single end reads, or from both primer ends, which gives paired end
reads, i.e., two reads that originate from the same molecule with a distance
that is approximately known. The read length is set by the protocol and
ranges between 30 to 2x350 nucleotides. The number of clusters of amplified
fragments on a flow cell ranges from millions to billions.

Illumina reads are cheap, short, and highly accurate. One issue is that
fragments with extreme GC content are less likely to be sequenced, which can
lead to incomplete genome assemblies or coverage.

---

(3rdgeneration)=
##### 3rd Generation sequencing

After the success of NGS, alternative so-called 3rd generation technologies
were introduced to overcome some of the shortcomings, mainly the limited
read length. All produce longer reads at lower yields and generally have a
higher error rate than the methods described previously.

---

(pacbio)=
###### PacBio

The most established method is Pacific Biosciences (PacBio) single molecule real time (SMRT)
sequencing. Compared to other methods it does not include a PCR step to
amplify the signal of the template DNA. Instead, it makes clever use of the
structure of SMRT-cells to amplify the light signal of bases being
incorporated with the use of a laser. A circularised double stranded piece
of template is loaded into tiny wells on a SMRT-cell, with the aim of having
a single molecule in each well. Incorporation of nucleotides is signalled
by cleavage of a phosphorescent molecule from the nucleotide and recorded
with a camera.

One major difference with NGS is that the template is circular instead of
linear, and that a single template can thus be sequenced multiple times
consecutively in what is called circular consensus sequencing (CCS). In
general 3rd generation sequencing techniques suffer from a higher error
rate, with most errors being indels, short insertions or deletions. This
has implications for, e.g., mapping and assembly. Making use of the CCS
allows for proofreading and higher accuracy ({numref}`pacbio_sequencing`), with the most
recent PacBio HiFi reads reaching 99% read accuracy.

:::{figure} images/Week5/pacbio-sequencing.png
:alt: PacBio sequencing
:align: center
:name: pacbio_sequencing

PacBio sequencing library construction and circular consensus sequencing
:::
%#% Figure pacbio seems to be an alteration of the figures found on the website of the University of Exeter (https://biosciences.exeter.ac.uk/sequencing/equipment/pacbio/sequel/), which itself seems to be derived from the PacBio website. The original images can no longer be found on the PacBio website.
The read length of this technology is determined by the size of the input
fragment and the length of time the polymerase functions (the high-energy
laser light slowly degrades the enzyme over time). Median read lengths vary
between 15,000 and 20,000 nucleotides for CCS reads and up to 175,000
nucleotides for continuous long read sequencing. PacBio sequencing has no
amplification bias like other technologies (there is no PCR step) and is
least influenced by GC-content. Overall, it gives the most uniform coverage
across a genome sequence. Unfortunately, it also has much lower throughput
than, e.g., Illumina sequencing and a still significantly higher price per
base.

---

(nanopore)=
###### Nanopore sequencing

<div class="videoWrapper">
    <iframe width="650" height="366" src="https://www.youtube.com/embed/RcP85JHLmnI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

The newest technology is nanopore sequencing, currently provided by Oxford
Nanopore on the MinION and related devices ({numref}`nanopore_sequencing`). This
technology is completely different to any of the others, in that it directly
detects the order of nucleotides of a DNA strand being pulled through a
protein nanopore by measuring the changes in current across the membrane the
nanopore is embedded in. The flow-cell in nanopore sequencing has a number
of wells. Each of these wells has a sensor at the bottom that detects
currents. The well itself is covered by a membrane, similar to a cell
membrane, although in this case it is not a lipid bilayer but a more stable
polymer. Embedded in this membrane are transmembrane protein pores
(genetically modified to work optimally) through which a DNA molecule fits. 
A current potential is applied between the top and the bottom of the
membrane and, as DNA is negatively charged, it wants to travel through the
pore. This changes the electrical resistance, which is detected by the
sensor. A problem is that the DNA travels too fast for the sensor to detect
the nucleotides; the solution is to add a DNA-polymerase, that acts as a
brake (denoted in {numref}`nanopore_sequencing` as motor, as it actively unzips the DNA). 
The polymerase itself does not fit through the pore and sits on top of it. 
As with PacBio, the read length is determined by the input DNA fragment size
and has no theoretical limit: the current read length record stands at 4.2
Mb, which is enough to sequence a bacterial genome in one go. Nanopore
sequencing has a similar error model as PacBio, with insertions and
deletions most prevalent and accuracy limited to between 85 and 95%,
although accuracy is improving. The main advantage over any of the other
technologies is that the template DNA itself is measured, so base
modifications like DNA methylation can be detected as well. The sequencer
is also small enough to fit in a pocket and people have used it in various
non-traditional conditions, such as arctic expeditions on Svalbard and in
the International Space Station.

:::{figure} images/Week5/nanopore-sequencing.png
:alt: Oxford Nanopore MinION
:align: center
:name: nanopore_sequencing

Oxford Nanopore MinION sequencer (left). Credits: modified from {cite}`nanopore_2016`. A nanopore with DNA and the generated signal (right). Credits: modified from {cite}`nanopore_2021`.
:::

---

##### Quality control

:::{figure} images/Week5/contamination.png
:alt: Sequencing contamination
:align: right
:name: contamination

Causes for contaminated sequencing \
samples, using as example the \
tardigrade and surrounding bacteria \
Credits: {cite}`contamination_2015`.
:::

As discussed above, sequencing technology is not perfect and errors will be
present in the output. Moreover, what we sequence is not always what we
originally intended to sequence ({numref}`contamination`).


Sources of errors related to sequencing itself are base calling errors
(substitution errors), uncalled bases (indels), GC bias, homopolymers, a
drop of quality towards the 3’ end of a read, and duplicates (amplification
bias). Additional error sources are contamination of the input sample,
remnants of adapters, and sequencing vectors. It is therefore important to
assess the quality of the sequencing itself and the output data before
further analysis.

---

#### Genome assembly

When no reference genome is available for a species, we need to assemble
one, i.e., build one from scratch by putting together DNA sequence reads. 
Here we discuss what to do when a reference genome sequence is not yet
available. First, we examine why we would want to create a reference
assembly, and what types of references can be created. Next, the assembly
process and its challenges are introduced. Finally, genome annotation and
detection of structural variation are discussed.

---
(referencegenomequality)=
##### Reference genome quality

:::{figure} images/Week5/co-segregation.svg
:alt: Co-segregation of alleles
:width: 300px
:height: 100px
:align: right
:name: co_segregation

Co-segregation of alleles
:::
%#% Self created image?
Genomes can be reconstructed with different aims, which influence the
required quality of the final assembly. The human genome, for example, has
been assembled as far as possible and in 2021, the first telomere-to-telomere
assembly was published, adding the final 5% of
bases. It has taken enormous effort, both in terms of finance and labour,
to get to this stage. This is neither feasible nor strictly necessary for
each genome assembly project. Hence, most genome assemblies currently available are so-called draft assemblies, and most fully completed genomes
are from bacteria and other species with small genomes. In terms of the
assembly process, for eukaryotic genomes the euchromatic regions assemble
easiest. Fortunately, these regions contain most of the genes, making draft
assemblies useful for studying mutations or expression patterns. When we
want to study larger features of the genome itself however, such as co-segregation of alleles ({numref}`co_segregation`) or gene order ({numref}`salmonella`),
we need more contiguous assemblies. 3rd generation sequencing, scaffolding
and newer technologies such as chromatin conformation capture (Hi-C) etc.
make chromosome-level assemblies increasingly attainable.

:::{figure} images/Week5/salmonella.png
:alt: Salmonella typhi chromosomal resistance island
:align: center
:name: salmonella

Genetic representation of the _Salmonella typhi_ chromosomal resistance island. Credits: {cite}`salmonella_2015`.
:::

---

#### Genome assembly strategies

In the early days of DNA sequencing, generating sequencing reads was very
costly. Much effort was therefore spent on developing methods requiring a
minimum amount of sequence data to assemble a genome. Moreover, Sanger
sequencing requires all fragments of DNA in a run to be identical, so some
form of organising the DNA was required. This was initially done by
sequencing the start of a single large fragment (much longer than the read
length), and generating sequencing primers from the end of the sequenced
part for the next round of sequencing, until the end of the fragment was
reached. This rather tedious approach was not feasible for larger genomes.
This led to the development of the whole genome shotgun sequencing method,
made possible by the growth in compute power for assembly. With the advent
of 2nd generation sequencing, this was updated by leaving out the cloning
step. 2nd generation sequencing technology (e.g., Illumina) allows for a
mixture of fragments to be sequenced at the same time and large volumes of
sequencing data to be generated. So instead of requiring lab work to
select which section to sequence, everything is sequenced at once and the
puzzle is solved later by computer.

---

##### Whole genome sequencing

Nowadays, the most widely employed genome sequencing approach is whole
genome sequencing (WGS, {numref}`WGS`). As the term implies the whole
genome is sequenced, without discrimination. DNA is extracted from cells
and sheared into random fragments. These fragments are then size selected
and sequenced using Illumina, PacBio or Oxford Nanopore technology. Note
that WGS generally generates draft genome assemblies; additional steps are
required to gain a complete, high-quality reference genome assembly.

:::{figure} images/Week5/WGS.png
:alt: WGS using short reads
:align: center
:name: WGS

Whole genome sequencing and assembly using short reads. Credits: CC BY-SA 2.5 https://creativecommons.org/licenses/by-sa/2.5/ modified from {cite}`WGS_2011`.
:::

---

##### Assembly challenges

The main challenge of assembly is to reconstruct the original genome
sequence from the millions or billions of small fragments. Some people have
likened this process to putting a stack of newspapers (each newspaper
representing one copy of the genome) through a shredder and attempting to
reconstruct a single original newspaper from the resulting confetti.
Solving this puzzle has driven the development of dedicated assembly
algorithms and software. Any computational approach has to overcome the
real-world challenges posed by the sequenced data and the characteristics of
genomes.

:::{figure} images/Week5/jigsaw.png
:alt: The assembly problem as a jigsaw puzzle
:align: center
:name: jigsaw

The assembly problem as a jigsaw puzzle. Credits: {cite}`jigsaw_2016`.
:::

If we look at a genome assembly using the analogy of a jigsaw puzzle ({numref}`jigsaw`), the challenges become obvious:

- There is no picture on the puzzle box, i.e., we have no idea what the assembled genome is meant to look like.
  We can look at related genomes, but this will only give an approximate idea.

- There are many pieces in the puzzle, billions of them.
  Every piece represents a small part of the genome that has been sequenced.

- Some pieces are frayed or dirty, i.e., reads contain errors, further obfuscating the overall picture.

- Some pieces are missing.
  Some parts of the genome do not break as easily as others, and are not included in the sheared fragments.
  Others have extreme GC values and do not amplify as well in the PCR step.

- Some parts of the puzzle contain the same image.
  In genome terms, these are duplicated regions, where some genes may have more than one copy.
  For example, the ribosomal RNA cistron (the region which encodes the parts of the ribosome) consists of multiple copies.

- Some parts of the puzzle look completely identical and are featureless, like blue sky: the repeat regions.

- In circular genomes, there are no “corners”: we do not know where the genome begins or ends.

In addition to the metaphors of the single puzzle, many organisms contain
two (i.e., diploid) or more (i.e., polyploid) copies of the same chromosome,
with small differences between them. In essence, in this case we try to
assemble one puzzle from two (or more) slightly different versions. If
these differences grow too big, parts from the two puzzles may be assembled
independently without noticing (remember - we have no puzzle box!).

With long high-quality reads this puzzle challenge becomes simpler, as there
are fewer pieces in total and fewer only blue-sky parts. Currently,
chromosome-level assemblies are routinely generated using PacBio HiFi reads
in combination with Hi-C.

---

##### Repeats

Repeat regions (i.e., the blue sky) are the main challenge in genome
assembly and most contigs (contiguous sequences, the longest stretches that
can be assembled unequivocally) stop at the edges of repetitive regions. 
The process is like finding many puzzle pieces containing both bits of stork
and blue sky, and trying to figure out which edge belongs to which stork and
how much blue sky goes in between. One solution for solving the repeat
problem are longer reads (that can bridge the blue sky between two storks).
To illustrate the scale of the problem that repeats pose in assembly: most
mammalian Y-chromosomes have not been assembled for more than 50%, because
of the repeat content.

---

##### Assembly quality assessment

When assembling a new genome, we have no way of verifying its quality
against a known ground truth. We also rarely get a complete genome or
chromosome as a single contig or scaffold as a result. Therefore, other
metrics and methods are required to assess the quality of an assembly. We
can use the experience gained in other assembly projects to gauge the
quality of an assembly; we can compare it to closely related genomes that
have already been assembled; and we can compare the assembly with the
expectations we have about the genome in terms of overall size, number of
chromosomes and genes, given the known biology of the species.

---

##### Insights from complete genomes

The contiguity and completeness of an assembly determines what we can learn
from them. In the [reference genome quality](referencegenomequality) section, co-segregating alleles and gene
order were already mentioned. If a genome is assembled in fewer, larger
pieces (i.e., longer contigs), we can also understand more about the long
distance regulatory elements that play a role in regulation of gene
expression ({numref}`regulatory_elements`).

:::{figure} images/Week5/regulatory-elements.png
:alt: Regulatory elements
:align: center
:name: regulatory_elements

Examples of long-distance regulatory elements and their distances to the
target gene identified in the human genome. Credits: {cite}`regulatory_elements_2010`
:::
%#% Figure regulatory_elements contains imagery that is specified as for personal use only.
As discussed above, the telomere-to-telomere assembly of the human genome
added the 5% hitherto missing genome sequence. While the previous human
genome assembly was already considered gold standard and very complete, the
number of genes increased with 5%, of which 0.4% were protein coding. This
increase in identified genes also allows the study of expression patterns of
these genes. An increase in genome coverage can also reveal hidden
elements: {numref}`FSHD` shows all paralogs of a disease related gene that
have finally been resolved. Most of the missing copies were in hard to
sequence parts of the genome. Chromosome-level assemblies also allow us to
study genome evolution itself, the way chromosomes are rearranged during
evolution and speciation.

:::{figure} images/Week5/FSHD.png
:alt: FRG1 and its 23 paralogs in CHM13, thanks to genome coverage
:align: center
:name: FSHD

Shows the protein-coding gene _FRG1_ and its 23 paralogs in CHM13. Only 9
were found in the previous assembly (GRCh38). Genes are drawn larger than
their actual size, and the “_FRG1_” prefix is omitted for brevity. All
paralogs are found near satellite arrays. _FRG1_ is involved in
acioscapulohumeral muscular dystrophy (FSHD). Credits: modified from {cite}`t2t_human_genome_2022`.
:::

---

### Variants

(w5box3_phenotypic_variation)=
::::{admonition} Box 3: Phenotypic variation
:class: tip
Small variants can have large phenotypic effects. 
```{figure} images/Week5/carrots.jpg
:alt: carrot phenotypic diversity
:width: 200px
:align: right
:name: carrots

Color variations in carrots. \
Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`carrots_2006`.
```
They account for the large variation in things all around us. In food
products, variants have been actively selected for to create the wide
varieties of shapes, color and taste we see in our food items today ({numref}`carrots`).
Historically, variants have been selected purely on these visible phenotypes
and new ones have been created mainly by chance in large-scale crosses.

Nowadays genetic information obtained through genome sequencing and variant
calling is used more and more in plant and animal breeding and selection.
::::

Mapping reads to a reference is a means to an end. As stated above, one of
the main goals is to detect genomic variation. Such variation can help
explain phenotypic variation (see [Box 3](w5box3_phenotypic_variation)). Genomic variation
between samples, individuals, and/or species can also be used to study
evolutionary history (see also weeks [2](week2) and [3](week3), on multiple sequence
alignments and phylogeny).

Variants are divided into two main groups: structural or large-scale
variants and small-scale variants. First, we will focus on small-scale variants.
Within this group we distinguish single-nucleotide polymorphisms (SNPs),
multiple nucleotide polymorphisms (MNPs) and small insertions and deletions
(indels):

:::{figure} images/Week5/indels.svg
:alt: Depictions of an SNP, insertions, and deletions.
:align: center
:name: indels

A single-nucleotide polymorphism (top left), insertions (bottom), and deletions (top right).
:::
%#% Figure indels is our own work?
Each variant at a particular position of a reference genome is called an
allele. In our example of an SNP above ({numref}`indels`), we have a reference allele T and an
alternate allele G. When a sample originates from a single individual, the
theoretical number of alleles at any position of the reference cannot exceed
the ploidy of that individual: a diploid organism can at most have two
different alleles (as in our example), a tetraploid can at most have four,
etc. Given that we only have four different nucleotides, the maximum number
of possible alleles for a single position is four, for higher ploidy alleles
get complicated. But if we find more than two alleles in a diploid organism
it must be the result of an error, either in the read or in the reference.

---

#### Variant calling

As we have already seen, variants can be real, they can be the result of
sequencing errors, or represent errors in the reference sequence. The
process of detecting variants (SNPs and indels) and determining which are
real or most likely errors is called variant calling. To indicate the
probability that a variant is real, a quality score is assigned to each
variant. This considers the read depth and the mapping quality at the
position of a putative variant. Variant calling software will also report,
among a whole host of statistics, the so-called allele frequency (AF),
determined by the number of reads representing each allele that map. In a
diploid organism with one reference allele and one alternate allele we
expect both, on average, to have a frequency of 0.5. When the frequency of
one allele is close to 0, it is an indication that this variant is most
likely due to an error.

---

#### Variants and their effects

:::{figure} images/Week5/flower-color.png
:alt: Flower color SNP
:align: center
:name: flower_color

The main features of the _bHLH_ gene and its expression products (not to
scale). In Caméor, a white flowered pea cultivar of genotype _a_, there is
a single G to A mutation in the intron 6 splice donor site that disrupts the
GT sequence required for normal intron processing. In the DNA, exons 6 and
7 are shown as grey boxes that flank the intron 6 splice donor and acceptor
sequences. In the RNA, the vertical lines represent exon junctions, and the
light grey box represents the 8 nucleotide (nt) insertion in the _a_ mRNA
that results from mis-splicing of intron 6. The red stars show the position
of the stop codon in the predicted protein, highlighting the premature
termination in the white flowered cultivar. Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`flower_color_2010`.
:::

SNPs between individuals underly most phenotypic variation. Sometimes a
single variant causes a different phenotype, like the classical mendelian
trait of flower color ({numref}`flower_color`).  More often phenotypic traits are
the result of multiple variants, one example is height. Some variants can
cause hereditary defects or increase the risk of certain diseases. 
Well-studied examples are mutations in the BRCA1 and BRCA2 genes
({numref}`BRCA`). A specific mutation in the BRCA1 gene increases the
chance for that person to develop breast cancer during their lifetime to
80%.

:::{figure} images/Week5/BRCA.png
:alt: BRCA genes
:align: center
:name: BRCA

Variants in BRCA1 and BRCA2 genes involved in cancer. Credits: {cite}`BRCA_2011`.
:::

---

#### Large-scale genome variation

Above, we discussed small scale variants such as SNPs and indels. In
contrast, large-scale variants are structural variants where parts of
genomes have been rearranged, duplicated or deleted ({numref}`large_scale_variants`). A
special case is copy number variation, where genes (or exons) have been
duplicated.

:::{figure} images/Week5/large-scale-variants.jpg
:alt: Large-scale structural variants
:align: center
:name: large_scale_variants

Different types of structural variants on chromosome level. Credits: {cite}`large_scale_variants_2024`.
:::

(w5box4_cri_du_chat)=
:::{admonition} Box 4: Cri du chat syndrome
:class: tip
```{image} images/Week5/cri-du-chat.png
:alt: cri du chat mutation and phenotype
:align: right
:width: 200px
:name: cri_du_chat
```
Cri du chat syndrome is a genetic disorder that is caused by the partial
deletion of the short arm of chromosome 5. Babies suffering from the
condition have a high pitched cry that sounds similar to a cat, which has
given the condition its name.

Furthermore, they suffer a.o. from delayed growth and poor reflexes.
:::
%#% Image cri_du_chat source unknown. Could be: https://healthjade.com/cri-du-chat-syndrome/. 

---

#### Structural variation

Structural variants are variations that are larger than approximately 1kb in
size, which can occur within and between chromosomes. Structural variants
have the potential to have major influence on phenotypes, such as disease,
but that is not necessarily the case. Structural variants do appear to play
a large role in the development of cancerous cells.

---

##### Copy number variation

Copy number variants (CNVs) are a special case of structural variants where
the number of times a gene occurs on the genome changes. In a diploid
organism, a deletion will leave only one copy, whereas a duplication can
result in three or more copies of the gene in an individual. Changing the
copy number can be part of normal variation in a population, e.g., genes
involved in immune response vary in copy number; but, more often than not,
copy number variation leads to severe phenotype changes, such as diseases in
humans.

---

##### Detection of structural variants

Accurately detecting structural variation in a genome is not easy. The
challenge lies in detecting the edges of the variants (i.e., breakpoints)
and, in case of duplications/insertions/deletions, the resulting copy
number. When a mapping-based approach is used (possible if the reference
genome is known) we can use read depth and paired end reads to detect
variants. In the case of a gene duplication we expect more reads to map to
the single copy of the reference genome than expected. More copies of the
gene in the sample will result in more reads from that gene
({numref}`gene_duplication`). Conversely, coverage is expected to drop when one copy
of a gene is lost.

:::{figure} images/Week5/gene-duplication.jpg
:alt: Gene duplication creates coverage challenges
:align: center
:name: gene_duplication

Gene duplication results in higher coverage than expected in the duplicated regions. Credits: [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) {cite}`gene_duplication_2009`.
:::

Orientations of paired end reads as well as split reads are a good
indicators to detect the boundaries of inversions, but also substitutions
and translocations. The rearrangements will result in one read from a pair
to map to one genomic location and the other read to another location.
Reads from the break point will be split in the alignment.

---

##### Examples of structural variants and CNVs

:::{figure} images/Week5/male-morphs.png
:alt: Inversion leading to phenotypic variation in ruffs
:align: center
:name: male_morphs

Orientation of the inversion in the three male morphs. Credits: {cite}`male_morphs_2022`.
:::

Large chromosomal inversions play a role in within-species phenotypic
variation and have also been found as the result of introgression after
hybridisation of two different species. One example of a within-species
inversion yielding large phenotypic differences are the three male morphs in
the ruff (_Calidris pugnax_, {numref}`male_morphs`).

:::{figure} images/Week5/butterflies.svg
:alt: Phenotypic differences in butterflies due to inversions
:align: center
:name: butterflies

At least two genetic inversions are associated with the _Heliconius numata_
supergene. The ancestral gene order, which matches that in _H. melpomene_
and _H. erato_ is shown on the left and is associated with ancestral
phenotypes such as _H. n. silvana_. Two sequentially derived inversions
are associated with dominant alleles and are shown in the middle and right. 
Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`butterflies_2017`.
:::

Another example is the acquisition of an inversion containing genes for wing
color patterns in different species of Heliconius butterflies
({numref}`butterflies`). Copy number variation can also affect phenotypic traits
with an example being flowering time, photoperiod sensitivity, and height of
wheat plants ({numref}`w5f24`).

:::{figure} images/Week5/Fig_24_122_2013_2177_Fig2_HTML.png
:alt: Graphs showing impact of gene copy number on phenotypes
:align: center
:name: w5f24

Gene CNV contributes to wheat phenotypic diversity. a) CNV of _Vrn-A1_ gene
controls flowering time by affecting vernalization requirement; b) CNV of
_Ppd-B1_ controls flowering time by affecting photoperiod sensitivity; c)
CNV of _Rht-D1b_ gene (a truncated version of _Rht-D1a_) determines severity
of plant dwarfism phenotype. In all three cases, the impact of gene copy
number on observed phenotype has been verified experimentally. Source data:
a, b, Díaz et al. (2012); c, Li et al. (2012). Credits: {cite}`CNV_2013`.
:::
%#% The description of figure CNV is a literal copy paste from the source article. Rewrite?
---

## Functional genomics and systems biology

:::{figure} images/Week5/w5bf2.svg
:alt: Different human cell types
:width: 400px
:align: center
:name: w5bf2

With the same genome, human stem cells differentiate into a wide range of shapes.
Source: Haileyfournier, CC-BY-SA 4.0,
[Wikimedia](https://commons.wikimedia.org/wiki/File:Final_stem_cell_differentiation_(1).svg).
:::

---

### The need for functional genomics

While genomics provides us with an enormous amount of data on genomes and
genes, it is clear that these are only part of the story. Cells are not
static objects: they display different behaviour during their lifetime, and
react to changes in the environment and to signals from other cells. In
most multicellular organisms, cells in different organs develop in very
different ways, leading to different cell shapes, tissue organization and
behaviour. Still, each cell contains the same genome, so there must be
differences in the way the genes are used. In other words, if the genome is
the book of life, it must also contain the information on how to read it.

(w5box5)=
::::{admonition} Box 5: Epigenetics
:class: tip
```{image} images/Week5/w5bf3.png
:width: 75%
:align: center
```
Epigenetic mechanisms are affected by several factors and processes
including development, environmental chemicals, drugs and pharmaceuticals,
aging, and nutrition. DNA methylation is what occurs when methyl groups, an
epigenetic factor found in some dietary sources, can tag DNA and activate or
repress genes. Histones are proteins around which DNA can wind for
compaction and gene regulation. Histone modification occurs when the
binding of epigenetic factors to histone “tails” alters the extent to which
DNA is wrapped around histones and the availability of genes in the DNA to
be activated. At a coarser level, the 3D organization of the DNA (“chromatin
structure”) also influences which regions of the genome are accessible for
transcription. In humans, all of these factors and processes can have an effect on
health and disruption can result in cancer,
autoimmune disease, mental disorders or diabetes, among other illnesses. 
Source: [National Institutes of
Health](http://commonfund.nih.gov/epigenomics/figure.aspx).
::::


A part of the explanation lies in what is called *epigenetics*,
modifications of the genome that do not change the DNA sequence but do
influence gene expression ([Box 5](w5box5)). There are other mechanisms besides
epigenetics that control how genes are expressed, and how the resulting
proteins eventually fulfill their function in the cell. The most well-known
ones are interactions between proteins and DNA (transcription factors and
enhancers, influencing expression); interactions between proteins, to form
complexes or to pass signals; and catalysis of metabolic reactions by
enzymes.

The field of research that studies how genes are used is called *functional
genomics*. The most prominent functional genomics project started
immediately following the completion of the human genome: the ENCODE
(“Encyclopedia of DNA elements”) project (2005-2015), aiming to identify all
functional parts of the genome.

---

#### The role of omics data

Functional genomics research mostly measures cellular activities in terms of
the abundance of genes, proteins and metabolites, and the interaction
between these molecules. When performed at a cell-wide level, i.e.
attempting to measure all molecules of a certain type at once, these are
called *omics* measurements. The technology to measure such omics data is
usually *high-throughput*, which means that little manual work or repetition
of experiments are needed. We generally distinguish five main levels of omics
measurements as illustrated in {numref}`omics_levels`, although many new omics terms are
still being introduced. Next to genomics, the following omics measure:
- Epigenomics: all epigenetic modifications of the genome
- Transcriptomics: the expression levels of all genes
- Proteomics: the presence/quantity of all proteins 
- Metabolomics: the presence/quantity of all metabolites
- Phenomics: the eventual phenotype(s), i.e. form or behaviour, of a cell or organism

Such measurements are increasingly also applied on mixed samples, mostly
bacterial/fungal/viral communities such as found in the human gut and in the soil.
As a kind of ‘meta’ analysis, this has been labeled metagenomics,
metatranscriptomics etc.

The introduction of omics technologies over the last 25 years has broadened
the field of bioinformatics and made it increasingly relevant to all areas
of biology. Very large measurement datasets are now routinely produced and
should be cleaned, checked for quality and processed.
Moreover, the data should be stored in databases to make it accessible and
re-usable for further research. Finally, careful analysis, interpretation and
visualization of the data is essential to allow biologists to infer
biological functions. Bioinformatics delivers the tools and databases to
support all these steps.

Even though omics measurements provide highly detailed overviews of
cellular states and reactions to perturbations, there are a number of
important limitations:
- Cost: omics devices are often expensive to acquire, and each experiment requires
labour and consumables. Experimental costs (time, money) are therefore often
limiting, especially when studying multiple omics levels or investigating
the effects of all combinations of interventions.
- Technical noise: all measurements come with inherent variation and
measurement noise. Moreover, omics measurements are often indirect,
measuring the effects of certain molecules or interactions through other
readouts (for example, by imaging fluorescent markers, or by translating RNA
to DNA for subsequent sequencing) or measuring only parts of molecules. Such
technologies require steps in data analysis to translate the measurements
back to what we actually wanted to measure, which also introduces noise.
- Biological variation: when studying the effect of a mutation or
intervention by comparing two samples, ideally all other biological circumstances should be
identical. In practice, cells are dynamic (e.g. cell cycle) and sensitive to
environmental influence. Similarly, molecule levels and interactions are
dynamics: molecules are produced, transported, modified and degraded
continuously, and a measurement at a specific time point is only a
snapshot.
- Bias and coverage: most omics technologies are most efficient for
measuring specific types of molecules or interactions, or work best for
certain ranges of levels. It is often also hard to take the many different
functional forms of a molecule, such as modified proteins, into account. 
Some technologies are even limited to measuring a subset of all possible
molecules or interactions. This means that care must be taken when
analyzing the resulting data; in particular, *not* measuring something does
not mean it is not there.

Typically, functional genomics experiments then involve studying the effect
of genetic variation on certain omics levels. Such variation can be
natural, for example comparing omics data measured on two organisms with
known (limited) genetic differences due to evolution. It can also be
experimentally introduced, for example by:
- changing the environment (temperature, nutrients, drugs etc.)
- introducing small mutations in the DNA sequence 
- knocking out genes (ensuring they are no longer expressed)
- knocking down genes (removing the transcripts)
- knocking in genes (introducing new genes)

The effects of such interventions at a specific omics level then provide
information on the function of the manipulated gene(s). Ideally we would
measure different omics levels at the same time (multi-omics) and even in
the same sample (paired omics), but this is often experimentally too complex
and costly. Some omics technologies are more acccessible than
others, in terms of cost, data quality and interpretation and are therefore
most widely used - in particular, gene expression levels (transcriptomics)
are often measured and assumed to reflect the overall state of a cell.
However, as discussed below, we should be careful with this.

---

#### From functional genomics to systems biology

Where functional genomics uses omics measurements to learn about the role
of genes and proteins in the cell, individual experiments and measurements
generally only provide individual pieces of the puzzle, which often do not
make much sense without understanding other cellular processes. Recognizing
the need for a more holistic approach, systems biology was proposed as a
scientific approach in which the main goal is to construct models of living
systems, that are increasingly refined by hypothesis formation,
experimentation and model extension or modification. 

:::{figure} images/Week5/w5bf4.png
:alt: The systems biology cycle
:align: center
:name: w5bf4

The systems biology cycle, aiming to iteratively improve models of living
systems. Image taken from: H. Kitano, “[Systems biology: a brief
overview](https://www.science.org/doi/10.1126/science.1069492)”,
*Science* 295(5560):1662-1664, 2002.
:::

Eventually, the hope of systems biology is to arrive at systems-level
understanding of life that will allow us to simulate the effects of
interventions (mutations, drug treatments etc.) or even (re)design genes and
proteins to improve certain behaviour, such as production levels of desired
compounds in biotechnology. While we still have a long way to go, omics
data analysis is an essential element in systems biology.

---

### Transcriptomics

Transcriptomics is concerned with measuring the expression of genes (i.e. 
the levels of transcription of genes on the genome to RNA). RNA and its
role in the cell has already been discussed in week 1. If you want to know
what other types of RNA exist outside the common mRNA, tRNA and rRNA, read
[Box 6](w5box6). Here we focus on measuring and counting transcripts (mRNA)

(w5box6)=
:::{admonition} Box 5: The RNA world
:class: tip
Many other types of RNA exist in the cell and they perform important regulatory functions:

- miRNA (micro RNA): Small (20-21nt) pieces of RNA that are cut from a longer pre-miRNA hairpin.
  miRNAs bind to target sites in mRNA and prevent binding of the messenger.
- siRNA (short interfering RNA): are generally 20-24nt long pieces of RNA that work similar to miRNAs but instead of actively preventing translation, the targeted mRNA is cut into pieces and destroyed.

![](images/Week5/Fig_Box_5_Picture18.png)

- snoRNA (small nucleolar RNA): Guide the methylation and pseudouridylation of ribosomal RNA required in the mature rRNA.
- lncRNA (long non-coding RNA): >200not long stretches of RNA that arise from transcription but (appear to) have no open reading frame.
  How many of these lncRNAs have a specific function and what that function might be is not clear. Most might simple be the result of pervasive transcription. 
- piRNA (piwi interacting RNA): Found in animals and slightly longer than miRNAs (26-31nt), they interact with piwi proteins. piRNAs are implicated in epigenetic gene silencing, but not much is known.
:::

For the understanding of transcriptome analysis it is important to remember that in eukaryotes most genes contain introns and that one gene can have many transcripts.

In transcriptomics, the aim is to measure presence and abundance of
transcripts. Such measurements are based on a large number of cells but
more recently the transcriptome of individual cells can also be studied. So
what do transcripts and their abundance tell us about a studied subject? In
any experiment we often want to know what happens to cell/tissue/organism
under certain circumstances. Most informative for this are protein levels
and even more specifically protein activity as these directly influence what
happens. As will be discussed below, detecting and measuring proteins is
complex. Measuring mRNA levels is far easier, but it is important to
realise that they only provide a proxy to what happens in a cell. mRNA
levels do not always correlate with protein levels as transcripts can be
regulated or inhibited, affecting translation. Protein levels can be
equally affected by regulation and abundance does not always correlate with
activity.

Despite its limitations, we can address a number of very relevant questions
based on transcriptomics measurements. Three general analyses will be
discussed below, but note that to detect relationships between experimental
conditions and mRNA expression patterns, it is important to be aware what
can cause variation in mRNA levels. Some of these causes may be intended
variation, some will cause noise.

mRNA levels:
- differ between genes 
- differ between isoforms 
- differ between tissues and cell types 
- differ between developmental stages 
- vary with cell cycle
- vary during the day (circadian rhythm) and/or season 
- differ between individual cells 
- depend on the environment 
- are the result of mRNA synthesis and mRNA decay

---

#### How to measure mRNAs?


:::{figure} images/Week5/Fig_25_differentialGel.jpg
:alt: Differential display gel
:width: 150px
:height: 300px
:align: right
:name: w5f25
Example of differential display gel. \
From: [Physiological Genomics](https://doi.org/10.1152/physiolgenomics.00013.2001)
:::
Early methods of detecting transcripts and expression levels are northern
blots and differential display ({numref}`w5f25`). Both are gel-based
methods that are low throughput and not very accurate.
:::{figure} images/Week5/Fig_26_qPCR.jpg
:alt: qPCR amplification graph
:align: right
:name: w5f26
Amplification plot of a DNA \
fragment in a qPCR reaction. \
Cq corresponds to the cycle \
were fluorescence passes the \
detection threshold. \
From: BioRAD website
:::
Just like the study of genomes, transcriptomics has greatly benefitted from
technological developments that allowed an increase in throughput and
sensitivity of measurements.


Northern blots and differential displays were superseded by qPCR
(quantitative PCR) and microarrays. qPCR is a form of PCR with the formal
name of quantitative real-time PCR (abbreviated as qPCR, whereas RT-PCR
stands for reverse transcription PCR and when using RNA as input is
sometimes called RT-qPCR, reverse transcription qPCR). The real-time
assessment of the PCR product allows the quantification of the number of
input materials. The abundance of each DNA molecule is measured by adding a
fluorescent reporter, either a dye that binds DNA or fluorescent probes. 
The level of fluorescence increases with the number of amplified fragments,
which in turn is detected. When the reaction passes a threshold at a given
cycle, the cycle number is used to deduce the original amount of template
fragments in the reaction ({numref}`w5f26`). qPCR is often used to validate
results obtained by other quantitative methods.

---

#### Microarrays

The first widely used high-throughput method to study expression of genes
was the microarray. DNA microarrays are based on the principle that
complementary strands of DNA tend to bind to each other. Microarrays are
typically flat surfaces (slides of glass or some other material) that
contain microscopic spots of single-strand DNA sequences - so-called probes - 
fixated at known locations, ranging from a few thousand to millions. Each
DNA sequence is chosen to as best as possible represent a specific gene,
i.e. a unique subsequence. This means that microarrays can only be
designed to detect known genes and are organism-specific, and that gene
variants (SNPs, splice variants) are hard to detect.
 
The general measurement protocol is then as follows. From a given sample,
mRNA molecules are first selected by looking for a poly-A tail, converted
into cDNA, labelled with a fluorescent dye and washed over the surface. 
Complementary sequences will bind, and after some time the unbound material
is washed off and fluorescence is measured using a microscope. The light
intensity level at a certain location on the surface is then an indirect
readout for the number of sequences that bound, and thus for the relative
expression of the corresponding gene.

---

##### cDNA and oligonucleotide arrays

:::{figure} images/Week5/w5bf1.png
:alt: cDNA (two-color) vs oligonucleotide (one-color) microarray analysis.
:align: center
:name: w5bf1
Taken from: H. van Bakel, F.C.P. Holstege, “A tutorial on DNA microarray
expression profiling”, in: D. Zuk (editor), “Evaluating techniques in biochemical research”,
Cell Press, 2008.
:::

There are two main competing types of microarrays: cDNA and oligonucleotide
arrays. While the principles are the same, they differ in production and
use (as illustrated in {numref}`w5bf1`):
- cDNA microarrays contain rather long probes of several hundreds of
nucleotides, up to 1000nt. Microarrays can be produced in the lab by spotting
robots, so they can easily be adjusted for specific experiments. This comes
with greater variation between microarrays, making it harder to compare
different measurements. cDNA microarrays are therefore mostly used for
direct comparisons between two samples, in which both samples (for example,
healthy and diseased tissue) are labelled with different fluorophores -
usually Cy3 (green) and Cy5 (red). The relative number of DNA sequences
bound then reflects the relative concentration of an mRNA molecule in sample
1 and sample 2, and thus the color. A green spot means only sample 1
contained the corresponding mRNA molecule, a red spot means that it was
found in sample 2 and a yellow spot that it was found in both samples. The
intensity then reflects the overall expression level: black/dark for low
expression in both samples, bright for high expression.
- oligonucleotide microarrays contain short probes (25nt), which are
produced using technology similar to microchip production. This means
quality is high and constant, and different arrays can easily be compared.
Oligonucleotide arrays therefore usually measure just a single sample using
one color. However, as short probes are less likely to be unique for a gene
transcripts are usually measured by combining multiple probes in so-called
probesets.

Analysis of microarray data involves microscope image acquisition, followed
by image processing to extract spot intensities at the right locations. 
Overall, microarray measurements are often noisy and cannot distinguish very
low expression levels, as they do not provide enough fluorescence
signal. Data normalization is therefore also an important step, to remove
non-relevant variation between different microarray measurements. For cDNA
microarrays, careful experimental design - deciding which samples to compare
on the same array - is also essential. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/0ATUjAxNf6U" title="DNA Microarray Methodology" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

##### Repositories

While popular in the 1990s and early 2000s, microarrays haves now been
mostly superseded by RNAseq as a cheaper and better quality alternative (see
below). However, there are many microarray samples still available for
re-use in databases, as submission of measurement data to such databases is
compulsory upon publication of a scientific paper. The most well-known
repositories are the NCBI Gene Expression Omnibus ([GEO](https://www.ncbi.nlm.nih.gov/geo/)), with as of September 2023 6.7 million samples, and [EBI ArrayExpress](https://www.ebi.ac.uk/biostudies/arrayexpress). If you are interested in a certain question that may be answered using transcriptomics, it makes sense to look here first to see what experimental data is already
available.

---

#### RNAseq

RNAseq makes use of affordable and reliable sequencing methods. Important
for the development of RNAseq was the reliable quantitative nature of NGS
protocols and sequencers. RNAseq is untargeted: all RNA in a sample can in
principle be sequenced and it is not necessary to have prior knowledge of
transcript sequences. While RNAseq is mainly used to study transcript
abundance, it can also be used to detect transcript isoforms (and their
abundance), as well as variants (see Variants above).

:::{admonition} Box 6: Ever more detail
:class: tip
Until now, most RNAseq experiments have been performed on groups of cells,
as sequencing devices require large amounts of DNA. This means that cells
of different cell types or different life stages are included in a single
sample. While detection of differentially expressed genes is clearly
possible with this method, weak or more nuanced variation is averaged out
across all cells. Recently, methods have become available that separate
tissues into individual cells and sequence each of these separately. This
does require PCR amplification of RNA to reach the amounts required for
sequencing, as well as sophisticated bioinformatics and statistical methods
to deal with the resulting data. For a review, see
dx.doi.org/10.1186/s13059-016-0927-y.
:::

---

##### Protocol

:::{figure} images/Week5/Fig_w5f26a_RNAseq.png
:alt: RNAseq protocol
:align: right
:width: 350px
:name: w5f26a
Standard RNAseq protocol
:::
The standard protocol of an RNAseq experiment is shown in {numref}`w5f26a`. First, all RNA (total RNA) is extracted from a biological sample. Next, mRNA is selected using a polyT oligo to select RNA with a polyA tail. The RNA is then converted to stable double stranded cDNA. The resulting cDNA library is then sequenced, usually as paired end reads of 100-150bp. A standard sequencing run results in 30 million or more reads per sample.

The read lengths currently used are relatively short and complicated models
are used to assign reads to exons and isoforms. New developments in this
field are long cDNA conversions that allow sequencing of full-length
transcripts on PacBio and direct sequencing of RNA on Oxford Nanopore. This
allows the detection of the actual isoforms present in samples.

Next, the reads need to be assigned to their corresponding transcripts. For
this there are two options: mapping of the reads to an existing reference
which can be either a genome or a transcriptome, or de novo assembly of the
transcripts (similar to assembly of genomes). Once reads have been assigned
to their corresponding transcript or gene, expression is quantified by
counting the number of reads per feature.

The following points summarize the strength and weaknesses of RNAseq for the
measurement of transcripts compared to microarrays:

✔️ Works for species without a reference genome.

✔️ Can identify alternatively spliced transcripts.

✔️ Can identify SNPs between transcripts.

✔️ Is more quantitative than microarrays, especially at lower expression levels.

❌ Is limited by fragment/read length, although full length transcript sequencing solves this.

❌ Produces large raw datasets.

❌ Analysis is less straightforward than for microarray data; there is not
yet one standard protocol.

---

##### Mapping

In principle, sequencing reads from an RNAseq experiment do not differ from
reads sequenced from genomic DNA in that they can be mapped to a reference
sequence. The same algorithms apply when mapping RNAseq reads to an
assembled transcriptome (a reference sequence that only contains RNA
sequences) or to prokaryotic genomes. Mapping eukaryotic mRNA sequences to
a genomic reference is more cumbersome, as most genes have introns, which
are no longer present in the mature mRNA ({numref}`w5f27`).
:::{figure} images/Week5/Fig_27_spliced_alignment.svg
:alt: Spiced read alignment
:align: right
:name: w5f27
Mapping of mRNA reads to genomic reference with splice aware aligner.
:::
This means that reads might contain an exon-exon junction, which means they
should be split along the reference. Most aligners will not consider this a
valid option. Special splice aware aligners have been developed for this
reason, that are able to map normal reads that map contiguously to the
reference sequence as well as reads that are split across splice sites
({numref}`w5f27`). They also take into account known intron exon boundaries
to determine the point within a read where it has to be split and whether
the split alignment is correct.

---

#### Transcript quantification

After sequencing and mapping, the next step is to quantify the abundance of
transcripts, i.e. the expression levels. Reads assigned to each feature
(exon or gene) are counted, with the underlying assumption that the number
of reads mapping to a feature is strongly correlated with the abundance of
that feature in the experiment. Comparing abundance of transcripts between
samples, conditions and experiments is not as straight forward as it seems. 
Apart from the bullet points above that influence mRNA abundance, there is
variation in each sequencing experiment. The main variation affecting
comparability of read counts between samples is the total number of reads
sequenced in each sample. Also, not all transcripts are the same length,
affecting the number of reads detected per transcript. So, some
normalisation is required to take into account these differences and make
data comparable. The next section will cover the steps and explain why a
certain normalisation is required.

---

##### Simple counting

This is the starting point of every analysis. We count the number of reads
that map to each exon or gene.

---

##### CPM

CPM stands for counts per million (reads). It represents a relative measure
for the read counts corrected for the total number of reads of a sample. It
assigns each read a value that corresponds to the proportion of the total
number of reads that single read represents. This tiny fraction is then
multiplied by a million to make it more readable.
:::{figure} images/Week5/Fig_28_quantification.svg
:alt: Counting reads
:align: right
:name: w5f28
:::

---

##### Comparing between transcripts

We not only have to normalise for the total number of reads representing
each sample. When comparing expression of two different transcripts, we
also have to take into account the characteristics of the transcripts we are
comparing and normalise accordingly.

RPKM and FPKM (Reads/Fragments per kilobase transcript per million)
normalise the counts per feature length and the total number of reads. TPM
(transcripts per million transcripts) normalises per transcript. TPM uses a
calculation to give a measurement of which proportion of the total number of
transcripts in the original sample is represented by each transcript.
:::{figure} images/Week5/Fig_29_comparing_transcripts.svg
:alt: Comparing transcript levels
:align: right
:name: w5f29
:::

---

##### Which method to use?

There is no easy answer and there is a large debate whether RPKM/FPKM or TPM
are the better method. CPM can clearly only be used when there is no
difference in transcript length, e.g. when comparing one transcript between
two samples.

---

#### ChIPseq and other protocols

RNAseq is a clever protocol that uses the attractive cheap, high-throughput
DNA sequencing technology to measure something else – in this case, gene
expression levels. The trick is to first translate the mRNA into DNA,
measure the DNA, and then reconstruct the desired measurement by transcript
quantification. Many more such protocols have been developed to measure
other molecule levels and interactions of interest. Three well-known
protocols are:

- ChIPseq, for chromatin immunoprecipitation sequencing: for a given protein
  – for example, a transcription factor or a histone – this can detect where
  it binds DNA.
{numref}`w5f31` illustrates this.
After sequencing, the DNA can be mapped against the genome: peaks of mapped
reads indicate regions where the protein of interest binds.
- Hi-C, to study 3D proximity of chromosome parts in the nucleus.
- bisulfite sequencing, to assess methylation of DNA.
:::{figure} images/Week5/Fig_32_ChipSeq.jpeg
:alt: ChIPseq protocol
:align: right
:name: w5f32
The chromatin immunoprecipitation (ChIP) protocol. Proteins are
cross-linked to DNA, after which genomic DNA is isolated and sheared. Using
an antibody, only the protein of interest is selected (the
immunoprecipitation step), after which the cross-linking is reversed and the
DNA can be sequenced by PCR (ChIP-PCR) or NGS (ChIPseq). Similar protocols
are available for protein-RNA and protein-protein interactions, the latter
using two antibodies. From [Journal of Endocrinology, 201(1), 1-13](https://doi.org/10.1677/JOE-08-0526)
:::

---

### Proteomics

As mentioned earlier, transcriptomics is widely applied but does not reflect
the overall cellular state accurately. The resulting proteins are the workhorses
of the cell, and knowing their concentrations, modifications and
interactions provides more insight than gene expression can provide.
Unfortunately, while major advances have been made in proteomics
technologies, accurate measurement of proteins is still complex and costly,
for a number of reasons:

- Obviously, the problem of identifying molecules with 20 building blocks
(amino acids) is harder than that of identifying molecules with 4 building
blocks (nucleotides).
- Moreover, given alternative splicing, the number of proteins that needs to
be distinguished it higher than the number of genes.
- Proteins can be modified in myriad ways, structurally as well as
biochemically, by the addition of many different groups on individual amino
acids. For some proteins, it is estimated that many thousands of different
variants can be found in a cell.
- Most proteins are structured, some form complexes or insert into the
membrane; such structures often have to be removed to allow accurate measurements.
- Proteins lack properties that make DNA and RNA easy to multiply (PCR) and measure:
replication and binding to complementary strands.
- The dynamic range of protein abundances is enormous: some protein
concentrations are a million-fold higher than that of others. This would
not be a problem if we had a protocol to make copies of low-abundant
proteins (like PCR for DNA), but such a protocol is not available.

Still, a number of methods to measure proteins and their interactions are in
use. We distinguish between quantitative proteomics (measuring
presence/absence and levels of proteins) and functional proteomics
(measuring protein interactions with other molecules).

---

#### Quantitative proteomics

##### Blots and gels

:::{figure} images/Week5/w5bf5.png
:alt: Western blot and 2D gel
:align: center
:name: w5bf5
An example Western blot (left) and two 2D gels (right), separating proteins
found in two different strains of *Brucella*. Investigating the difference
between the two figures on the right can give insight in what proteins are
differentially expressed between the two strains. Taken from: G. Wareth, 
M. Pletz, H. Neubauer, J. Murugaiyan, “[Proteomics of Brucella: technologies and their applications for basic
research and medical microbiology](https://www.mdpi.com/2076-2607/8/5/766)”, 
*Microorganisms* 8(5):766, 2020.
:::

As for DNA, gels ({numref}`w5bf5`) are traditional means to measure the
presence/absence of proteins (Western blots), denaturing proteins, tagging
proteins of interest with a specific labeled antibody and separating them by
size (molecular weight). After separation, the labeled antibodies can be
imaged and used to infer presence (and to some extent, level) of the protein
of interest. 2D versions are also used, that separate proteins by both size
and isoelectric point or pH value. Such experiments can be repeated on
different samples to look for spots with different intensities, that may
point to abundance differences. One would still have to perform
extract these spots and perform further measurements to learn more about
these proteins, such as their sequence. One method of sequencing proteins
is Edman degradation, but this is limited to short peptides (~30 amino
acids) and requires large amounts of starting material.

---

##### Protein microarrays

Like DNA microarrays, arrays have also been developed for proteins. This
requires antibodies for all proteins that have to be distinguished, which
makes designing and performing a protein microarray experiment far more
cumbersome than a DNA microarray experiment. Arrays are therefore mostly
used for specific applications, such as high-throughput detection of
specific interactions.

---

##### Mass spectrometry

:::{figure} images/Week5/w5bf10.png
:alt: Three mass spectrometry setups
:align: center
:name: w5bf10
Three mass spectrometry setups, from top to bottom: time-of-flight, 
sector field and quadrupole. Taken from: G.L. Glish, R.W. Vachet, 
[“The basics of mass spectrometry in the twenty-first century”](https://www.nature.com/articles/nrd1011)
*Nature Reviews Drug Discovery* 2:140-150, 2003.
:::

Currently the most widely used technology for proteomics (and metabolomics)
is mass spectrometry (MS). MS devices have been in constant development and
improvement since their inception in the late 19th century. They differ in
specific setup, but all follow three basic steps:

1. Ionize a molecule
2. Separate or select molecules based on their mass
3. Detect time and/or location of arrival at a detector to infer the mass of
each molecule

To be fully correct, MS measures the mass-over-charge ratio (m/z) rather
than the actual mass, i.e. the mass in relation to the charge number of the
ion.

For each step, different technologies are available which are best suited to
detection of specific mixtures, compounds of interest (proteins, metabolites),
and compound size ranges. {numref}`w5bf10` illustrates a number of widely used
separation steps, i.e. by measuring time-of-flight or susceptibility to
deflection by magnetic fields or by tuning an oscillating electrical field
to allow only specific masses to pass through.

<div class="videoWrapper">
    <iframe width="650" height="488" src="https://www.youtube.com/embed/J-wao0O0_qM" title="Mass Spectrometry MS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

:::{figure} images/Week5/w5bf11.png
:alt: Example mass spectrum
:align: center
:name: w5bf11
Left: an example mass spectrum measured on toluene. The various peaks
correspond to fragments of the original molecule (right).
:::

The output of any MS experiment is a mass spectogram, with m/z
ratios on the x-axis and peaks indicating how many molecules of a certain
mass have been detected ({numref}`w5bf11`). In theory, if a database of known
molecule structures (e.g. proteins or peptides) and their calculated masses
would be available, one could look up each mass and identify the
corresponding molecule. A major challenge in interpreting such a
spectrum is the limited resolution of MS devices, which means that a
certain peak can still be caused by many different types of molecules. Some
smaller molecules of interest may even have identical masses (e.g. 
isoforms) and so cannot be distinguished, which is particularly hard in
complex mixtures. A number of approaches try to solve this problem:

- Chromatography: moving the sample through a separation column before entering the MS
device, filled with an inert gas (gas chromatography, GC) or liquid
(LC). Different molecules take different times to travel through these
columns, and arrival time at the MS device thus provides extra information.
Again, a database of column travel times for specific known compounds is
essential to analyze these arrival times.
- Tandem mass spectrometry or MS/MS: measuring molecules twice, once intact (in a first MS device) and then
again after selection and fragmentation (in a second MS device). This depends on the
predictability of fragmentation: if a molecule falls apart at specific
places, we can get more information from the combination of the overall mass
and the masses of the fragments in breaks into.
- Shotgun proteomics: specifically for proteins, a protocol in which an enzyme is first used to
cut the protein at specific places (for example, trypsin cleaves the protein
into peptides at arginines and lysines) ({numref}`w5bf12`). The peptide masses are then
measured and compared to the mass spectra of predicted peptides resulting from a
database of known proteins, to identify the protein likely being measured.
This approach can also be used to measure posttranslation modifications,
as they lead to small (known) shifts in the measured spectra for the modified
peptides.

:::{figure} images/Week5/w5bf12.jpg
:alt: Schematic overview of shotgun proteomics
:align: center
:name: w5bf12
A schematic overview of shotgun proteomics. Taken from: 
A.I. Nesvizhskii, [“Protein identification by tandem mass 
spectrometry and sequence database searching”](https://link.springer.com/protocol/10.1385/1-59745-275-0:87)
in: Mass spectrometry data analysis in proteomics 367:87-119, 
series Methods in molecular biology, 2007.
:::

More complex protocols have also been developed to compare two protein
samples in a single experiment, for example by adding known weighgs (using natural isotopes or
modified amino acids) and investigating relative differences in shifted mass spectra.

---

#### Functional proteomics

:::{figure} images/Week5/w5bf13.png
:alt: Experimental protein interaction detection
:align: center
:name: w5bf13
Experimental methods to detect proteins. Top: high-throughput, bottom:
low-throughput. Taken from: P. Aloy, R.B. Russell, 
[“Structural systems biology: modelling protein interactions”](https://www.nature.com/articles/nrm1859), 
*Nature Reviews Molecular Cell Biology* 7:188-197, 2006.
:::

Next to protein levels, we are also interested in what proteins do in the
cell: their functions and interactions. Many protocols and analyses have
been developed for this, with most focusing on protein-protein, protein-DNA
and protein-metabolite (enzymatic) interactions. Note that while many of these experiments are
cumbersome, they are essential to advance functional genomics -
(bioinformatics) predictions critically depend on high-quality data and
cannot replace experimental validation.

For protein-DNA interaction, the already mentioned ChIPseq method is widely
used to learn how proteins modify DNA, initiate replication and repair and
regulate expression as transcription factors or enhancers. For
protein-protein interactions, the main high-throughput protocols ({numref}`w5bf13`,
top) are:

- Yeast two-hybrid, in which one of the two proteins is attached to a DNA-binding
  domain and the other to an expression activating domain. Only if the two
proteins interact will a reporter gene (e.g. for a fluorescent protein) be
expressed.
- Tandem affinity purification, in which all proteins interacting with a
“bait” protein are purified and subsequently measured using MS.

These protocols are noisy and have many false positives and negatives, so
further experimental validation using low-throughput methods, essentially
measuring the structure of protein complexes, is often necessary
({numref}`w5bf13`, bottom). Nevertheless, like transcriptomics data,
“interactomics” measurements are stored in databases, such as
[IntAct](https://www.ebi.ac.uk/intact/home) and can be used to obtain
insights into cell-wide protein interaction networks ({numref}`w5bf14`). 
Groups of highly connected proteins, i.e. with many interactions, can
indicate e.g. protein complexes or signalling pathways within or between
cells.

:::{figure} images/Week5/w5bf14.jpg
:alt: Example protein interaction network
:align: center
:name: w5bf14
A protein interaction network (4,927 proteins, 209,912 interactions found by
tandem affinity purification) for *Drosophila melanogaster*, with
clusters corresponding to protein complexes indicated in color. Taken from: 
K.G. Guruharsha, J.-F. Rual, B. Zhai et al., [“A protein complex network of Drosophila melanogaster”](https://doi.org/10.1016/j.cell.2011.08.047),
*Cell* 147(3):690-703, 2011.
:::

The methods mentioned measure *physical* interactions between proteins, as
opposed to *functional* interactions. Such interactions occur when two
proteins have similar functions - even though they may never actually
physically interact, for example when they are two alternative transcription
factors for the same gene. Such functional interactions can be measured to
some extent, but are mostly predicted by bioinformatics tools that combine
various pieces of evidence: literature, sequence similarity, gene co-expression
etc. [STRING](https://string-db.org/) and
[GeneMania](https://genemania.org/) are the most well-known examples.

---

### Metabolomics

:::{figure} images/Week5/w5bf15.png
:alt: Metabolic network
:align: center
:name: w5bf15
The Roche biochemical pathway chart: global overview of metabolic processes
(left) and a close-up of part of the citrate cycle (right). Obtained from
[biochemical-pathways.com](http://biochemical-pathways.com/#/map/1).
:::

Many cells produce a wide range of metabolites - small molecules or compounds that are part of metabolism. Many of
these, so-called primary metabolites, serve as building blocks for essential
molecules such as DNA and proteins and provide energy for reactions. Other
metabolites, specialized metabolites, function in many organisms for
communication, regulation (hormones), defense (antibiotics) and symbiosis.
Some metabolites also regulate relevant phenotypes. As such, solving the structures of all molecules circulating in cells and measuring the
concentrations of metabolites as so-called “end points” of cellular
organization seems highly relevant in studying growth and development of
organisms and communities. Metabolomics is also important in medicine and
pharmacology, in food safety and in uncovering the production repertoire of
microbes in industrial biotechnology.

For measuring metabolites, mostly the MS technologies described above are
employed, in particular GC-MS and LC-MS. As the range of metabolite sizes
and characteristics is large and many metabolites are still unknown,
identifying them from mass spectra is still very challenging. An advantage
is that known metabolic reactions, collected in metabolic networks
({numref}`w5bf15`), can
support systems biology approaches, specifically in microbes.

---

### Phenomics

The final outcome of cellular regulation is the phenotype, i.e. the
set of observable characteristics or behaviours of a cell or organism at
macro-scale. These phenotypes often depend in complex ways on levels and
interactions of a (large) number of molecules in the cell. Uncovering the
genotype-phenotype relation, i.e. what variation at the genomic level
underlies (disrupted) phenotypes, is one of the most important goals in many
scientific areas, including medicine. 

The set of potential phenotypes for different organisms is enormous, and
there is no standardized approach to phenomics as there is for the other
omics levels. Exceptions include structured databases of human diseases such as
[MalaCards](https://www.malacards.org/), and of genetic disorders such as
[OMIM](https://www.omim.org/). Similar approaches are starting to find their
way into other areas of biology (ecology, plant development and breeding,
animal behaviour), with (standardized) repositories for image, video and tracking 
data. Reliable, high-throughput phenomics data will prove indispensable to
make sense of the genetic variation we find.

---

### -Omics data analysis

Transcriptomics, proteomics and metabolomics (can) all provide quantitative
measurements on molecule levels present. The resulting data can be analysed
in various ways, to answer different questions. The main approaches
are:
- Visualization, to facilitate inspection of experimental outcomes and
identifying large patterns
- Differential abundance, to compare abundance levels between
conditions, cell types or strains
- Time series analysis, to follow changes over time (i.e. time series
experiments)
- Clustering, grouping genes or samples based on similarity in abundance
(e.g. to learn about shared function)
- Classification, finding which gene(s) are predictive of a certain
phenotype (e.g. a disease)
- Enrichment, learning which biological functions/processes are most found
in a given set of genes
We will discuss each of these below. Most examples will be provided for
transcriptomics data and we will use the term “genes” throughout, but the
approaches can without change be applied to quantitative proteomics
(“proteins”) and metabolomics (“metabolites”) data.

However, remember that all these measurements are noisy, and that care
should be taken to distinguish biological variation of interest from
technical and biological variation that is not relevant. As an example,
RNAseq is often performed as part of an experiment with the aim of finding
genes responding differently to two or more experimental conditions. Such
experiments are set up to exclude as much variation as possible, but there
will still be differences in abundance levels detected that are not the
result of the treatment but rather measurement noise. To distinguish
clearly between real differences and noise, repeated measures of the same
condition are important ({numref}`w5f30`). These are called *replicates*. 
Underlying the variation in repeated measurements are both biological and
technical variation; in {numref}`w5f31` this comparison is made for all
transcripts detected in the samples, for two replicates (left) and two
different conditions (middle and right).

:::{figure} images/Week5/Fig_30_compare_conditions.svg
:alt: Comparing expression between conditions
:align: right
:name: w5f30
Difference in expression of gene X between two conditions and two possible distributions the measurement could have come from.
:::

:::{figure} images/Week5/Fig_31_error_vs_conditions.svg
:alt: Comparison of differences between replicates and conditions
:align: right
:name: w5f31
Comparison of FPKM values between 2 replicates (left) and two conditions (middle and right). The correlation between replicates should be very high, the differences between two conditions can be small (middle) or large (right).
:::

---

#### Visualization

:::{figure} images/Week5/w5bf6.png
:alt: PCA plot and heatmap of simple bacterial transcriptomics dataset
:align: center
:name: w5bf6
Visualization of the expression of 2,135 genes in *Streptococcus parauberis*
after 1, 2 and 4 hours of growth in two different media, fish serum and
broth. Each condition has been measured on 3 replicates. Left: a Principal
Component Analysis (PCA) that the major separation (44% of the variance) is
betwen the two media and that there is clear progression along time. On
serum, there is not much expression difference after 2 and 4 hours of
growth. Right: a heatmap visualizes the entire dataset, with colors
indicating z-score normalized expression values: green is low, black is
medium and red is high expression. Rows are genes, columns indicate growth
condition, both are clustered. Taken from
Y. Lee, N. Kim, H. Roh et al. “[Transcriptome analysis unveils survival strategies of
*Streptococcus parauberis* against fish
serum](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0252200)”,
*PLoS ONE* 16(5):e0252200, 2021.
:::

While omics data can be analyzed in for example Microsoft Excel, it is very
hard to make sense of a data matrix with tens of thousands of genes and
dozens to hundreds of samples. It is therefore wise to first use methods to
visualize or summarize the data to see whether major patterns or outliers
can already be detected. A widely used visualization is the so-called
heatmap, an image of the matrix (genes-by-samples) where each measurement is represented by a
color. If the data is clustered along both genes and samples (see below),
interesting patterns may be easy to spot. A second approach often used in
initial data exploration is Principal Component Analysis (PCA), which plots
samples (or genes) along the main axes of variation in the data. If color or
markers are added, a PCA plot serves very well to detect outliers and
groups. Both visualizations are illustrated in {numref}`w5bf6`.

---

#### Differential abundance

:::{figure} images/Week5/w5bf7.png
:alt: T-test
:align: center
:name: w5bf7
The simplest test for differential abundance of a gene between two
conditions is the *t*-test. The *t*-statistic is a measure for the
difference between the means *x* of two distributions, corrected by the
uncertainty expressed in terms of their standard deviation *s*. A *p*-value,
the probability that we find a *t*-statistic as large or larger by chance, 
can be calculated using the *t*-distribution.
:::

Perhaps the most widely used analysis on omics data, the goal here is to
compare abundance levels between two classes, conditions, strains, cell
types etc. - for example, healthy vs. diseased tissue, with or without a
certain drug, in different growth conditions etc. The simplest approach is
to collect a number of replicate measurements under both conditions and, for
each gene perform a simple statistical test such as the *t*-test
({numref}`w5bf7`). Each test
gives a *p*-value, and genes with a *p*-value below a certain
threshold, say 5%, could then called significantly differentially expressed. 
There are two caveats:

1. If you perform an individual test for each of thousands of genes, at a
threshold of 5% you would still incorrectly call many hundreds to thousands
genes differentially expressed. To solve this, *p*-values are generally
*adjusted* for multiple testing, i.e. made larger.
2. If the variation (standard deviation *s* in {numref}`w5bf7`) is low enough, a
small difference can become significant even if the actual abundance
difference is small. Therefore, in many experiments an additional
requirement to select genes is that the fold change is large enough. Often,
this is expressed as log2(fold change), where +1 means that a gene is 2x
more expressed, +2 means 4x more expressed, -1 means 2x less expressed and
so on.

There are a number of similar, but more sophisticated approaches that better
match with experimental follow-up, but these are out of scope for this
reader.

---

#### Classification

Classification is related to differential abundance analysis, in that it
tries to find genes that best explain the difference between conditions. 
However, here the goal is actually to predict the condition of a new (additional) sample based on a limited set of gene expression levels, as accurately as possible. Applications are mainly found in medicine, such as diagnosis and prognosis, but are also used to distinguish different cell types, growth stages etc.

---

#### Time series analysis

:::{figure} images/Week5/w5bf8.png
:alt: Transcriptomics of various stages of T-cell development.
:align: center
:name: w5bf8
Transcriptomics of various stages of T-cell development, i.e. a time
series analysis. Left: heatmap of the 446 genes with most variable gene
expression levels, clustered into 15 clusters. Right: average expression
profiles of each cluster show that different groups of genes peak in
expression in different development stages. These genes may be regulated in
the same way and be active in similar biological processes. Taken from: 
W.A. Dik, K. Pike-Overzet, F. Weerkamp et al., [“New insights on human T
cell development by quantitative T cell receptor gene rearrangement studies
and gene expression profiling”](https://rupress.org/jem/article/201/11/1715/52356/New-insights-on-human-T-cell-development-by), 
*Journal of Experimental Medicine* 201(11):1715-1723, 2005.
:::

Often it is more interesting to follow abundance over time rather than
compare it at one specific timepoint, e.g. when tracking the response to a
drug, a change in growth conditions, regulation of organ development and so
on. Given the cost of omics measurements, a major challenge is to select
optimal time points for sampling, balancing the information obtained with
the investment. Subsequent analyses include clustering to find similarly
regulated genes (see below and ) and more advanced methods that try to identify
regulatory interactions by seeing which gene increase/decrease precedes that
of another (set of) gene(s). {numref}`w5bf8` provides an example.

---

#### Clustering

Clustering methods attempt to find groups of genes that have similar
abundance profiles over all samples, or (vice versa) samples that have
similar abundance profiles over all genes. We call such genes or samples
co-expressed. Based on the guilt-by-association principle, correlation
(also known as ‘co-expression’ when applied to transcriptomics)
can be used to learn about the function of genes - “if the expression of gene
A is similar to that of gene B with a certain function F, then gene A likely
also has function F”. This can help identify genes involved in similar
processes or pathways: co-expressed genes can be co-regulated, code for
interacting proteins etc. For samples, it can help identify for example
disease subtypes, different genotypes etc. that may be helpful to learn
about different outcomes. Clustering is often used to order the rows and
columns of a heatmap (as in {numref}`w5bf6` and {numref}`w5bf8`), after 
which obvious clusters should become visible as large color blocks.

---

#### Enrichment

:::{figure} images/Week5/w5bf9.png
:alt: A part of the Gene Ontology
:align: center
:name: w5bf9
An example part of the Gene Ontology (GO), in the biological process category.
Lower-level terms are specific instantiations of the higher-level ones. In
this figure, GO terms are colored according to the *p*-value in an
enrichment test. Taken from: Z. Du, X. Zhou, Y. Ling et al., [“agriGO: a GO analysis toolkit for the agricultural
community”](http://dx.doi.org/10.1093/nar/gkq310), *Nucleic Acids Research*
38(S2):W64-70, 2010.
:::

A final often used analysis is enrichment, in which we use gene functional
annotation to learn about a set of genes, such as a list of differentially
expressed genes or a cluster. The most widely used annotation for genes is
the Gene Ontology, a structured dictionary of terms that describe the
molecular functions of genes and their involvement in biological processes
or cellular components at different levels of detail ({numref}`w5bf9`). A statistical test
then assesses how significantly often (more than by chance) we find a
certain annotaton in our list of genes. Like differential abundance, the
*p*-values produced should be adjusted for multiple testing. The resulting
significant annotations can help interpret the outcome of an experiment at a
higher level than that of individual genes.

---

### Outlook

This section of the reader on omics data analysis is likely the most prone
to obsolescence. We have only touched upon or even left out recent
developments in single-molecule measurements of DNA, RNA and proteins, of
single-cell and spatial omics analysis, where molecules are measured in
individual cells or at grid points in tissues, and accompanying developments
in deep learning that promise to provide foundation models to capitalize on
the large volumes of omics data in order to solve specific tasks. The end
goal, [a systems biology simulation of the living
cell](https://www.wholecellviz.org/viz.php#replication), is still far from
reality, but may be reached sooner than we now believe possible.

---

# References

```{bibliography}
:filter: docname in docnames
:labelprefix: 5W
```