# Week 5 - Omics data analysis

%#% Main remarks about week5: Clear and formal writing style, similar to week1. Only uses box type admonitions and could do with more of the other types. Information follows a logical order, some cross-references jump far across the document. Some figures have descriptions that are taken straight from their source and could be rewritten (see individual comments).
:::{figure} images/Week5/omics-levels.png
:alt: -Omics levels
:align: center
:name: omics_levels

Different -ome levels, here illustrated with numbers for _Arabidopsis thaliana_. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`omcis_levels_2024`.
:::

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
Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`central_dogma_2008`.
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
%#% Beautiful figure but under copyright by Springer Nature. Their quick price estimate returns a $250 price tag for our use case.
As previously described, the project was very costly, with an estimated cost of \$3 billion. In
comparison, it is nowadays possible to sequence all variants between a human
genome and the reference for less than \$1,000 on Illumina’s NovaSeq
machine.

---

### Genomes

With the rapid evolution of sequencing technology, our understanding of
genomes and their content has grown as well. We now know that genomes vary
greatly in terms of size, chromosome numbers, and ploidy ({numref}`gene_ploidy`),
as well as gene content ({numref}`genome_sizes`). Genome sizes range from 100kb in
bacteria to more than 100Gb (Giga basepairs) in plants.

:::{figure} images/Week5/gene-ploidy.png
:alt:
:align: center
:name: gene_ploidy

Left, variety of genome sizes. Credits: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`gene_ploidy_2010`;
right, examples of ploidy. Credits: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`gene_ploidy_2011`.
:::
%#% Figure genome*sizes comes from the book A Primer of Genome Science. Not able to use this figure (for free).
Humans have a genome size of 3.2Gb. Not only the genome size varies
greatly, in eukaryotes the number of chromosomes and chromosomal copies
(ploidy) do too. Chromosome numbers range from 4 in fruitfly (\_Drosophila*)
to 23 in human to 50 in goldfish and 100+ in some ferns. Similarly, ploidy
ranges from haploid (single set of chromosome(s), ploidy of N) and diploid
(two copies, ploidy of 2N) to polyploid (more than 3 copies), with at the
extreme end ferns with ploidy levels of over 100. Gene numbers also vary
per species; at the low end, bacterial endosymbionts have 120+ genes,
whereas most higher eukaryotes (including humans) have between 15,000 and
25,000 genes and some plants can have more than 40,000 genes – rice has over
46,000.

:::{figure} images/Week5/genome-sizes.jpg
:alt: Gene content table
:align: center
:name: genome_sizes

Gene content in some representative species. Credits: {cite}`genome_sizes_2009`.
:::
%#% Figure genome_sizes comes from the book A Primer of Genome Science. Not able to use this figure (for free).

:::{figure} images/Week5/genome-sizes_alt.svg
:alt: Gene content table
:align: center
:name: genome_sizes_alt

Gene content in some representative species. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`genome_sizes_alt_2024`.
:::

(w5box2_size)=

:::{admonition} Box 2: Size does(n’t) matter?
:class: tip
Genomes come in all shapes and sizes. The smallest known (non-viral) genome
is that of the bacterial endosymbiont _Nasuia deltocephalinicola_, which
only consists of 112,091 nucleotides, encoding 137 proteins. The largest
genomes known to date are marbled lungfish and the plant _Paris
japonica_ with 130,000,000,000 nucleotides (130Gb) and 150,000,000,000 nucleotides (150Gb) respectively, although the amoeboid
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
with higher yields produced by the Illumina NovaSeq and longer reads by both
Oxford Nanopore MinION/PromethION and Pacbio Sequel II devices. Credits:
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`sequencing_technology_2016`.
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

Chain termination (Sanger) sequencing. Credits: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`sanger_2012`.
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

Sanger sequencing signal, with low quality bases at the start of the read. Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`sanger_signal_2005`.
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
that strand can then form a bridge with a neighboring empty primer of the
other end and the reaction is repeated, ending in first two fixed fragments
and subsequently thousands of identical fragments near each other. In the
sequencing step ({numref}`illumina_sequencing`C), a final PCR then uses fluorescent dye
terminated NTPs, which are washed across the surface in each cycle. A
camera detects the color, the dye is cleaved off and the steps are repeated
for the length of the sequencing reaction.

:::{figure} images/Week5/illumina-sequencing.png
:alt: Illumina sequencing
:align: center
:name: illumina_sequencing

The process of Illumina sequencing. The Illumina NovaSeq uses a system of 2
fluorescent dies compared to the traditional 4. This greatly speeds up
sequencing
:::
%#% Figure illumina_sequencing source states that imagery can only be used for personal, non-commercial use only, and will not be copied or posted on any network computer or broadcast in any media, (iii) you may not modify the materials in any way or reproduce, publicly display, perform, distribute, transmit, or create derivative works from any of the materials on this Site.
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
%#% Figure pacbio seems to be an alteration of the figures http://www.pacb.com/wp-content/uploads/2015/08/SMRT_Technology.SMRTbell_Template.jpg and https://speakerdeck.com/pacbio/pacbio-template-preparation?slide=5
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
Credits: modified from {cite}`contamination_2015`.
:::
%#% Figure contamination has a Japanese webpage as its source. Is this actually where it came from? Not sure if we are allowed to use this.
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
%#% Not sure if self-created image.

:::{figure} images/Week5/co-segregation_alt.svg
:alt: Co-segregation of alleles
:width: 300px
:align: right
:name: co_segregation_alt

Co-segregation of alleles. \
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`co-segregation_alt_2024`
:::

Genomes can be reconstructed with different aims, which influence the
required quality of the final assembly. The human genome, for example, has
been assembled as far as possible and in 2021, the first telomere-to-telomere
assembly was published, adding the final 5% of
bases. It has taken enormous effort, both in terms of finance and labor,
to get to this stage. This is neither feasible nor strictly necessary for
each genome assembly project. Hence, most genome assemblies currently available are so-called draft assemblies, and most fully completed genomes
are from bacteria and other species with small genomes. In terms of the
assembly process, for eukaryotic genomes the euchromatic regions assemble
easiest. Fortunately, these regions contain most of the genes, making draft
assemblies useful for studying mutations or expression patterns. When we
want to study larger features of the genome itself however, such as co-segregation of alleles ({numref}`co_segregation`) or gene order ({numref}`salmonella`),
we need more contiguous assemblies. 3rd generation sequencing, scaffolding
and newer technologies such as chromatin conformation capture (Hi-C), etc.
make chromosome-level assemblies increasingly attainable.

:::{figure} images/Week5/salmonella.png
:alt: Salmonella typhi chromosomal resistance island
:align: center
:name: salmonella

Genetic representation of the _Salmonella typhi_ chromosomal resistance island. Credits: {cite}`salmonella_2015`.
:::
%#% Figure salmonella is under copyright by Springer Nature. Unable to use this image for free.

:::{figure} images/Week5/salmonella_alt.png
:alt: Salmonella enterica subsp. enterica serovar Stanley genetic organization of virulence factors in SPI-1
:align: center
:name: salmonella_alt

Genetic representation of the _Salmonella enterica subsp. enterica_ serovar Stanley pathogenicity island-1. Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) modified from {cite}`salmonella_alt_2019`.
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

Whole genome sequencing and assembly using short reads. Credits: [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/) modified from {cite}`WGS_2011`.
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
%#% Figure jigsaw is created by a lecturer at the Melbourne University. Not sure if we are allowed to use this.
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
%#% Figure regulatory_elements contains imagery that is specified as for personal use only. Replace this figure.
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
%#% Figure FSHD is under copyright by Science. Unable to use this figure for free.

---

(variants)=

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

A single-nucleotide polymorphism (top left), insertions (bottom), and deletions (top right). Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`indels_2024`.
:::

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
%#% Figure BRCA is under copyright by JAMA. Unable to use this image for free.

:::{figure} images/Week5/BRCA_alt.png
:alt: BRCA genes
:align: center
:name: BRCA_alt

Mutations in BRCA1 and BRCA2 found in breast and ovarian cancers. Credits: {cite}`BRCA_alt_2018`.
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

Different types of structural variants on chromosome level. Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`large_scale_variants_2024`.
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

Orientation of the inversion in the three male morphs. Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`male_morphs_2022`.
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
wheat plants ({numref}`CNV`).

:::{figure} images/Week5/CNV.png
:alt: Graphs showing impact of gene copy number on phenotypes
:align: center
:name: CNV

Gene CNV contributes to wheat phenotypic diversity. a) CNV of _Vrn-A1_ gene
controls flowering time by affecting vernalization requirement; b) CNV of
_Ppd-B1_ controls flowering time by affecting photoperiod sensitivity; c)
CNV of _Rht-D1b_ gene (a truncated version of _Rht-D1a_) determines severity
of plant dwarfism phenotype. In all three cases, the impact of gene copy
number on observed phenotype has been verified experimentally. Source data:
a, b, Díaz et al. (2012); c, Li et al. (2012). Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`CNV_2013`.
:::

---

## Functional genomics and systems biology

:::{figure} images/Week5/stem-cell.svg
:alt: Different human cell types
:width: 400px
:align: center
:name: stem_cell

With the same genome, human stem cells differentiate into a wide range of shapes.
Credits: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) {cite}`stem_cell_2019`.
:::

---

### The need for functional genomics

While genomics provides us with an enormous amount of data on genomes and
genes, it is clear that these are only part of the story. Cells are not
static objects: they display different behavior during their lifetime, and
react to changes in the environment and to signals from other cells. In
most multicellular organisms, cells in different organs develop in very
different ways, leading to different cell shapes, tissue organization and
behavior ({numref}`stem_cell`). Still, each cell contains the same genome, so there must be
differences in the way the genes are used. In other words, if the genome is
the book of life, it must also contain the information on how to read it.

(w5box5_epigenetics)=

::::{admonition} Box 5: Epigenetics
:class: tip

```{figure} images/Week5/epigenetics.png
:alt: Description of epigenetic mechanisms
:width: 100%
:align: center
:name: epigenetics

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
Credits: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) {cite}`epigenetics_2005`.
```

::::
%#% The original URL in box5 that is credited as the source leads to page that does not exist anymore. Changed to WikiMedia url. - The description is a literal copy paste from the figure description on WikiMedia.

A part of the explanation lies in what is called _epigenetics_,
modifications of the genome that do not change the DNA sequence but do
influence gene expression ([Box 5](w5box5_epigenetics)). There are other mechanisms besides
epigenetics that control how genes are expressed, and how the resulting
proteins eventually fulfill their function in the cell. The most well-known
ones are interactions between proteins and DNA (transcription factors and
enhancers, influencing expression); interactions between proteins, to form
complexes or to pass signals; and catalysis of metabolic reactions by
enzymes.

The field of research that studies how genes are used is called _functional
genomics_. The most prominent functional genomics project started
immediately following the completion of the human genome: the ENCODE
(“Encyclopedia of DNA elements”) project (2005-2015), aiming to identify all
functional parts of the genome.

---

#### The role of omics data

Functional genomics research mostly measures cellular activities in terms of
the abundance of genes, proteins and metabolites, and the interaction
between these molecules. When performed at a cell-wide level, i.e.,
attempting to measure all molecules of a certain type at once, these are
called _omics_ measurements. The technology to measure such omics data is
usually _high-throughput_, which means that little manual work or repetition
of experiments are needed. We generally distinguish five main levels of omics
measurements as illustrated in {numref}`omics_levels`, although many new omics terms are
still being introduced. Next to genomics, the following omics measure:

- Epigenomics: all epigenetic modifications of the genome.
- Transcriptomics: the expression levels of all genes.
- Proteomics: the presence/quantity of all proteins.
- Metabolomics: the presence/quantity of all metabolites.
- Phenomics: the eventual phenotype(s), i.e., form or behavior, of a cell or organism.

Such measurements are increasingly also applied on mixed samples, mostly
bacterial/fungal/viral communities such as found in the human gut and in the soil.
As a kind of ‘meta’ analysis, this has been labeled metagenomics,
metatranscriptomics, etc.

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
  labor and consumables. Experimental costs (time, money) are therefore often
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
  identical. In practice, cells are dynamic (e.g., cell cycle) and sensitive to
  environmental influence. Similarly, molecule levels and interactions are
  dynamics: molecules are produced, transported, modified, and degraded
  continuously, and a measurement at a specific time point is only a
  snapshot.
- Bias and coverage: most omics technologies are most efficient for
  measuring specific types of molecules or interactions, or work best for
  certain ranges of levels. It is often also hard to take the many different
  functional forms of a molecule, such as modified proteins, into account.
  Some technologies are even limited to measuring a subset of all possible
  molecules or interactions. This means that care must be taken when
  analyzing the resulting data; in particular, _not_ measuring something does
  not mean it is not there.

Typically, functional genomics experiments then involve studying the effect
of genetic variation on certain omics levels. Such variation can be
natural, for example comparing omics data measured on two organisms with
known (limited) genetic differences due to evolution. It can also be
experimentally introduced, for example by:

- changing the environment (temperature, nutrients, drugs, etc.).
- introducing small mutations in the DNA sequence .
- knocking out genes (ensuring they are no longer expressed).
- knocking down genes (removing the transcripts).
- knocking in genes (introducing new genes).

The effects of such interventions at a specific omics level then provide
information on the function of the manipulated gene(s). Ideally we would
measure different omics levels at the same time (multi-omics) and even in
the same sample (paired omics), but this is often experimentally too complex
and costly. Some omics technologies are more acccessible than
others, in terms of cost, data quality, and interpretation and are therefore
most widely used - in particular, gene expression levels (transcriptomics)
are often measured and assumed to reflect the overall state of a cell.
However, as discussed [below](omics), we should be careful with this.

---

#### From functional genomics to systems biology

Where functional genomics uses omics measurements to learn about the role
of genes and proteins in the cell, individual experiments and measurements
generally only provide individual pieces of the puzzle, which often do not
make much sense without understanding other cellular processes. Recognizing
the need for a more holistic approach, systems biology was proposed as a
scientific approach in which the main goal is to construct models of living
systems, that are increasingly refined by hypothesis formation,
experimentation, and model extension or modification.

:::{figure} images/Week5/systems-biology.png
:alt: The systems biology cycle
:align: center
:width: 400px
:name: systems_biology

The systems biology cycle, aiming to iteratively improve models of living
systems. Credits: {cite}`systems_biology_2002`.
:::
%#% Figure systems_biology is under copyright by Science. Unable to use for free.
Eventually, the hope of systems biology is to arrive at systems-level
understanding of life that will allow us to simulate the effects of
interventions (mutations, drug treatments, etc.) or even (re)design genes and
proteins to improve certain behavior, such as production levels of desired
compounds in biotechnology. While we still have a long way to go, omics
data analysis is an essential element in systems biology.

---

(transcriptomics)=

### Transcriptomics

Transcriptomics is concerned with measuring the expression of genes (i.e.,
the levels of transcription of genes on the genome to RNA). RNA and its
role in the cell has already been discussed in [week 1](rna_transcription_splicing). If you want to know
what other types of RNA exist outside the common mRNA, tRNA and rRNA, read
[Box 6](w5box6_RNA). Here we focus on measuring and counting transcripts (mRNA).
%#% Week 1 does also mention miRNA as one of the main types of RNA.
(w5box6_RNA)=
:::{admonition} Box 6: The RNA world
:class: tip
Many other types of RNA exist in the cell and they perform important regulatory functions:

- miRNA (micro RNA): small (20-21nt) pieces of RNA that are cut from a longer pre-miRNA hairpin.
  miRNAs bind to target sites in mRNA and prevent binding of the messenger.
- siRNA (short interfering RNA): are generally 20-24nt long pieces of RNA that work similar to miRNAs but instead of actively preventing translation, the targeted mRNA is cut into pieces and destroyed.

```{figure} images/Week5/RNA-types.png
:alt: Overview of the different types of RNA
:align: center
:width: 100%
:name: RNA_types

The generalized RNAi mechanism up to the molecular level depicting the role of various cellular proteins and external siRNAs. Credits: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) modified from {cite}`RNA_types_2016`.
```

- snoRNA (small nucleolar RNA): guides the methylation and pseudouridylation of ribosomal RNA required in the mature rRNA.
- lncRNA (long non-coding RNA): >200nt long stretches of RNA that arise from transcription but (appear to) have no open reading frame.
  How many of these lncRNAs have a specific function and what that function might be is not clear. Most might simply be the result of pervasive transcription.
- piRNA (piwi interacting RNA): found in animals and slightly longer than miRNAs (26-31nt), they interact with piwi proteins. piRNAs are implicated in epigenetic gene silencing, but not much is known.
  :::
  %#% Figure RNA_types is rather blurry and unclear. Replace image that better depicts the different types of RNA?
  For the understanding of transcriptome analysis it is important to remember that in eukaryotes most genes contain introns and that one gene can have many transcripts.

In transcriptomics, the aim is to measure presence and abundance of
transcripts. Such measurements are based on a large number of cells but
more recently the transcriptome of individual cells can also be studied. So
what do transcripts and their abundance tell us about a studied subject? In
any experiment we often want to know what happens to a cell/tissue/organism
under certain circumstances. Most informative for this are protein levels
and even more specifically protein activity, as these directly influence what
happens. As will be discussed [below](proteomics), detecting and measuring proteins is
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

- Differ between genes.
- Differ between isoforms.
- Differ between tissues and cell types.
- Differ between developmental stages.
- Vary with cell cycle.
- Vary during the day (circadian rhythm) and/or season.
- Differ between individual cells.
- Depend on the environment.
- Are the result of mRNA synthesis and mRNA decay.

---

#### How to measure mRNAs?

%:::{figure} images/Week5/differential-gel.jpg
%:alt: Differential display gel
%:width: 150px
%:height: 300px
%:align: right
%:name: differential_gel
%
%Example of differential \
%display gel. Credits: modified from \
%{cite}`differential_gel_2001`.
%:::
%#% Figure differential_gel is under copyright by the American Physiological Society. Unable to use for free.

:::{figure} images/Week5/differential-gel_alt.png
:alt: Differential display gel
:width: 184px
:height: 367px
:align: right
:name: differential_gel_alt

Example of differential \
display gel. Credits: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) \
modified from \
{cite}`differential_gel_alt_2014`.
:::

Early methods of detecting transcripts and expression levels are northern
blots and differential display ({numref}`differential_gel_alt`). Both are gel-based
methods that are low throughput and not very accurate.

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
fragments in the reaction ({numref}`qPCR`). qPCR is often used to validate
results obtained by other quantitative methods.

:::{figure} images/Week5/qPCR.jpg
:alt: qPCR amplification graph
:align: center
:width: 500px
:name: qPCR

Amplification plot of a DNA fragment in a qPCR reaction.
C{sub}`q` corresponds to the cycle were fluorescence passes the
detection threshold. Credits: {cite}`qPCR_nd`.
:::
%#% Biorad website states its imagery is solely for personal, noncommercial use. Replace figure.

:::{figure} images/Week5/qPCR_alt.svg
:alt: qPCR amplification graph
:align: center
:width: 80%
:name: qPCR_alt

Amplification plot of a DNA fragment in a qPCR reaction.
C{sub}`q` corresponds to the cycle were fluorescence passes the
detection threshold. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`qPCR_alt_2024`.
:::

---

#### Microarrays

The first widely used high-throughput method to study expression of genes
was the microarray. DNA microarrays are based on the principle that
complementary strands of DNA tend to bind to each other. Microarrays are
typically flat surfaces (slides of glass or some other material) that
contain microscopic spots of single-strand DNA sequences - so-called probes -
fixated at known locations, ranging from a few thousand to millions. Each
DNA sequence is chosen to (as best as possible) represent a specific gene,
i.e., a unique subsequence. This means that microarrays can only be
designed to detect known genes and are organism-specific, and that gene
variants (SNPs, splice variants) are hard to detect.

The general measurement protocol is then as follows. From a given sample,
mRNA molecules are first selected by looking for a poly-A tail, converted
into complementary DNA (cDNA), labelled with a fluorescent dye and washed over the surface.
Complementary sequences will bind, and after some time the unbound material
is washed off and fluorescence is measured using a microscope. The light
intensity level at a certain location on the surface is then an indirect
readout for the number of sequences that bound, and thus for the relative
expression of the corresponding gene.

---

##### cDNA and oligonucleotide arrays

:::{figure} images/Week5/microarrays.png
:alt: cDNA (two-color) vs oligonucleotide (one-color) microarray analysis.
:align: center
:name: microarrays

The difference between cDNA (two-color) and oligonucleotide (one-color) microarray analysis.
Credits: modified from {cite}`microarrays_2007`.
:::
%#% Figure microarrays is under copyright by Elsevier. Unable to use this image for free.

:::{figure} images/Week5/microarrays_alt.svg
:alt: cDNA (two-color) vs oligonucleotide (one-color) microarray analysis.
:align: center
:name: microarrays_alt

The difference between cDNA (two-color) and oligonucleotide (one-color) microarray analysis.
Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`microarrays_alt_2024`.
:::

There are two main competing types of microarrays: cDNA and oligonucleotide
arrays. While the principles are the same, they differ in production and
use (as illustrated in {numref}`microarrays`):

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
  one color. However, as short probes are less likely to be unique for a gene,
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

<div class="videoWrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/0ATUjAxNf6U" title="DNA Microarray Methodology" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div

---

##### Repositories

While popular in the 1990s and early 2000s, microarrays haves now been
mostly superseded by RNAseq as a cheaper and better quality alternative (see
[below](rnaseq)). However, there are many microarray samples still available for
re-use in databases, as submission of measurement data to such databases is
compulsory upon publication of a scientific paper. The most well-known
repositories are the NCBI Gene Expression Omnibus ([GEO](https://www.ncbi.nlm.nih.gov/geo/)),
with as of March 2024 ~7.1 million samples, and [EBI ArrayExpress](https://www.ebi.ac.uk/biostudies/arrayexpress).
If you are interested in a certain question that may be answered using transcriptomics,
it makes sense to look here first to see what experimental data is already available.

---

(rnaseq)=

#### RNAseq

RNAseq makes use of affordable and reliable sequencing methods. Important
for the development of RNAseq was the reliable quantitative nature of NGS
protocols and sequencers. RNAseq is untargeted: all RNA in a sample can in
principle be sequenced and it is not necessary to have prior knowledge of
transcript sequences. While RNAseq is mainly used to study transcript
abundance, it can also be used to detect transcript isoforms (and their
abundance), as well as variants (see [Variants](variants) above).

:::{admonition} Box 7: Ever more detail
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
to deal with the resulting data. For a review, see this [paper](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-016-0927-y).
:::

---

##### Protocol

:::{figure} images/Week5/RNAseq-protocol.png
:alt: RNAseq protocol
:align: right
:width: 350px
:name: RNAseq_protocol

Standard RNAseq protocol. \
Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) modified from \
{cite}`RNAseq_protocol_2011`.
:::
%#% Figure RNAseq_protocol seems to be self-created out of imagery from different sources. I was only able to find the source for the sequencer, which now serves as the reference for the whole image.
The standard protocol of an RNAseq experiment is shown in {numref}`RNAseq_protocol`.
First, all RNA (total RNA) is extracted from a biological sample.
Next, mRNA is selected using a polyT oligo to select RNA with a polyA tail.
The RNA is then converted to stable double stranded cDNA.
The resulting cDNA library is then sequenced, usually as paired end reads of 100-150bp.
A standard sequencing run results in 30 million or more reads per sample.

The read lengths currently used are relatively short and complicated models
are used to assign reads to exons and isoforms. New developments in this
field are long cDNA conversions that allow sequencing of full-length
transcripts on [PacBio](pacbio) and direct sequencing of RNA on [Oxford Nanopore](nanopore).
This allows the detection of the actual isoforms present in samples.

Next, the reads need to be assigned to their corresponding transcripts. For
this there are two options: mapping of the reads to an existing reference
which can be either a genome or a transcriptome, or a de novo assembly of the
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

❌ Produces large raw datasets, which take up storage and computing power to process.

❌ Analysis is less straightforward than for microarray data; there is not
yet one standard protocol.

---

##### Mapping

In principle, sequenced reads from an RNAseq experiment do not differ from
reads sequenced from genomic DNA in that they can be mapped to a reference
sequence. The same algorithms apply when mapping RNAseq reads to an
assembled transcriptome (a reference sequence that only contains RNA
sequences) or to prokaryotic genomes. Mapping eukaryotic mRNA sequences to
a genomic reference is more cumbersome, as most genes have introns, which
are no longer present in the mature mRNA ({numref}`spliced_alignment`).

:::{figure} images/Week5/spliced-alignment.svg
:alt: Spiced read alignment
:align: right
:name: spliced_alignment

Mapping of mRNA reads to genomic reference with splice aware aligner. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`spliced_alignment_2024`.
:::

This means that reads might contain an exon-exon junction, which means they
should be split along the reference. Most aligners will not consider this a
valid option. Special splice aware aligners have been developed for this
reason, that are able to map normal reads that map contiguously to the
reference sequence as well as reads that are split across splice sites
({numref}`spliced_alignment`). They also take into account known intron exon boundaries
to determine the point within a read where it has to be split and whether
the split alignment is correct.

---

#### Transcript quantification

After sequencing and mapping, the next step is to quantify the abundance of
transcripts, i.e., the expression levels. Reads assigned to each feature
(exon or gene) are counted, with the underlying assumption that the number
of reads mapping to a feature is strongly correlated with the abundance of
that feature in the experiment. Comparing abundance of transcripts between
samples, conditions and experiments is not as straight forward as it seems.
Apart from the bullet points [above](transcriptomics) that influence mRNA abundance, there is
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

##### CPM

CPM stands for counts per million (reads). It represents a relative measure
for the read counts corrected for the total number of reads of a sample. It
assigns each read a value that corresponds to the proportion of the total
number of reads that single read represents. This tiny fraction is then
multiplied by a million to make it more readable.

:::{figure} images/Week5/CPM.svg
:alt: Counting reads
:align: right
:name: CPM

Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`CPM_2024`.
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

:::{figure} images/Week5/comparing-transcripts.svg
:alt: Comparing transcript levels
:align: right
:name: comparing_transcripts

Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`comparing_transcripts_2024`.
:::

---

##### Which method to use?

There is no easy answer and there is a large debate whether RPKM/FPKM or TPM
are the better method. CPM can clearly only be used when there is no
difference in transcript length, e.g., when comparing one transcript between
two samples.

---

#### ChIPseq and other protocols

:::{figure} images/Week5/chip-protocol.jpeg
:alt: ChIPseq protocol
:align: right
:name: chip_protocol

The chromatin immunoprecipitation (ChIP) protocol. Proteins are
cross-linked to DNA, after which genomic DNA is isolated and sheared. Using
an antibody, only the protein of interest is selected (the
immunoprecipitation step), after which the cross-linking is reversed and the
DNA can be sequenced by PCR (ChIP-PCR) or NGS (ChIPseq). Similar protocols
are available for protein-RNA and protein-protein interactions, the latter
using two antibodies. Credits: {cite}`chip_protocol_2009`.
:::
%#% Figure chip_protocol is under copyright by Bioscientifica Limited. Unable to use this image for free.

:::{figure} images/Week5/chip-protocol_alt.jpg
:alt: ChIPseq protocol
:align: center
:name: chip_protocol_alt

The chromatin immunoprecipitation (ChIP) protocol. Proteins are
cross-linked to DNA, after which genomic DNA is isolated and sheared. Using
an antibody, only the protein of interest is selected (the
immunoprecipitation step), after which the cross-linking is reversed and the
DNA can be sequenced by PCR (ChIP-PCR) or NGS (ChIPseq). Similar protocols
are available for protein-RNA and protein-protein interactions, the latter
using two antibodies. Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`chip_protocol_alt_2015`.
:::

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
  {numref}`chip_protocol` illustrates this.
  After sequencing, the DNA can be mapped against the genome: peaks of mapped
  reads indicate regions where the protein of interest binds.
- Hi-C, to study 3D proximity of chromosome parts in the nucleus.
- Bisulfite sequencing, to assess methylation of DNA.

---

(proteomics)=

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
  be distinguished is higher than the number of genes.
- Proteins can be modified in a myriad of ways, structurally, as well as
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

:::{figure} images/Week5/gels.png
:alt: Western blot and 2D gel
:align: center
:name: gels

An example Western blot (left) and two 2D gels (right), separating proteins
found in two different strains of _Brucella_. Investigating the difference
between the two figures on the right can give insight in what proteins are
differentially expressed between the two strains. Credits: [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) {cite}`gels_2020`.
:::

As for DNA, gels ({numref}`gels`) are traditional means to measure the
presence/absence of proteins (Western blots), denaturing proteins, tagging
proteins of interest with a specific labeled antibody and separating them by
size (molecular weight). After separation, the labeled antibodies can be
imaged and used to infer presence (and to some extent, level) of the protein
of interest. 2D versions are also used, that separate proteins by both size
and isoelectric point or pH value. Such experiments can be repeated on
different samples to look for spots with different intensities, that may
point to abundance differences. One would still have to
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

(massspectrometry)=

##### Mass spectrometry

%#%:::{figure} images/Week5/mass-spectrometry.png
%#%:alt: Three mass spectrometry setups
%#%:align: center
%#%:name: mass_spectrometry
%#%
%#%Three mass spectrometry setups, (a) time-of-flight,
%#%(b) sector field and \(c) quadrupole. Credits: {cite}`mass_spectrometry_2003`.
%#%:::
%#% Figure mass_spectrometry is under copyright by Springer Nature. Unable to use this image for free.

:::{figure} images/Week5/mass-spectrometry_alt.svg
:alt: Three mass spectrometry setups
:align: center
:width: 70%
:name: mass_spectrometry_alt

Three mass spectrometry setups, (top) time-of-flight,
(middle) sector field and (bottom) quadrupole. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`mass_spectrometry_alt_2024`.
:::

Currently the most widely used technology for proteomics (and metabolomics)
is mass spectrometry (MS). MS devices have been in constant development and
improvement since their inception in the late 19{sup}`th` century. They differ in
specific setup, but all follow three basic steps:

1. Ionize a molecule.
2. Separate or select molecules based on their mass.
3. Detect time and/or location of arrival at a detector to infer the mass of
   each molecule.

To be fully correct, MS measures the mass-over-charge ratio (m/z) rather
than the actual mass, i.e., the mass in relation to the charge number of the
ion.

For each step, different technologies are available which are best suited to
detection of specific mixtures, compounds of interest (proteins, metabolites),
and compound size ranges. {numref}`mass_spectrometry_alt` illustrates a number of widely used
separation steps, i.e., by measuring time-of-flight or susceptibility to
deflection by magnetic fields or by tuning an oscillating electrical field
to allow only specific masses to pass through.

<div class="videoWrapper">
    <iframe width="650" height="488" src="https://www.youtube.com/embed/J-wao0O0_qM" title="Mass Spectrometry MS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

:::{figure} images/Week5/mass-spectrum.png
:alt: Example of a mass spectrum
:align: center
:name: mass_spectrum

An example mass spectrum measured on toluene (left). The various peaks
correspond to fragments of the original molecule (right). Credits: modified from (left) [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`mass_spectrum_left_2005`, (right) [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`mass_spectrum_right_2008`.
:::

The output of any MS experiment is a mass spectogram, with m/z
ratios on the x-axis and peaks indicating how many molecules of a certain
mass have been detected ({numref}`mass_spectrum`). In theory, if a database of known
molecule structures (e.g., proteins or peptides) and their calculated masses
would be available, one could look up each mass and identify the
corresponding molecule. A major challenge in interpreting such a
spectrum is the limited resolution of MS devices, which means that a
certain peak can still be caused by many different types of molecules. Some
smaller molecules of interest may even have identical masses (e.g.,
isoforms) and so cannot be distinguished, which is particularly hard in
complex mixtures. A number of approaches try to solve this problem:

- Chromatography: moving the sample through a separation column before entering the MS
  device, filled with an inert gas (gas chromatography, GC) or liquid
  (liquid chromatography, LC). Different molecules take different times to travel through these
  columns, and arrival time at the MS device thus provides extra information.
  Again, a database of column travel times for specific known compounds is
  essential to analyze these arrival times.
- Tandem mass spectrometry or MS/MS: measuring molecules twice, once intact (in a first MS device) and then
  again after selection and fragmentation (in a second MS device). This depends on the
  predictability of fragmentation: if a molecule falls apart at specific
  places, we can get more information from the combination of the overall mass
  and the masses of the fragments it breaks into.
- Shotgun proteomics: specifically for proteins, a protocol in which an enzyme is first used to
  cut the protein at specific places (for example, trypsin cleaves the protein
  into peptides at arginines and lysines) ({numref}`shotgun_proteomics`). The peptide masses are then
  measured and compared to the mass spectra of predicted peptides resulting from a
  database of known proteins, to identify the protein likely being measured.
  This approach can also be used to measure posttranslation modifications,
  as they lead to small (known) shifts in the measured spectra for the modified
  peptides.

:::{figure} images/Week5/shotgun-proteomics.jpg
:alt: Schematic overview of shotgun proteomics
:align: center
:name: shotgun_proteomics

A schematic overview of shotgun proteomics. Credits: {cite}`shotgun_proteomics_2007`.
:::
%#% Figure shotgun_proteomics is under copyright by Springer Nature. Unable to use this image for free.
More complex protocols have also been developed to compare two protein
samples in a single experiment, for example by adding known weights (using natural isotopes or
modified amino acids) and investigating relative differences in shifted mass spectra.

---

#### Functional proteomics

:::{figure} images/Week5/experimental-protein-methods.png
:alt: Experimental protein interaction detection
:align: center
:name: experimental_protein_methods

Experimental methods to detect proteins. Top: high-throughput, bottom:
low-throughput. Credits: modified from {cite}`experimental_protein_methods_2006`.
:::
%#% Figure experimental_protein_methods is under copyright by Springer Nature. Unable to use this image for free.
Next to protein levels, we are also interested in what proteins do in the
cell: their functions and interactions. Many protocols and analyses have
been developed for this, with most focusing on protein-protein, protein-DNA
and protein-metabolite (enzymatic) interactions. Note that while many of these experiments are
cumbersome, they are essential to advance functional genomics -
(bioinformatics) predictions critically depend on high-quality data and
cannot replace experimental validation.

For protein-DNA interaction, the already mentioned ChIPseq method is widely
used to learn how proteins modify DNA, initiate replication and repair, and
regulate expression as transcription factors or enhancers. For
protein-protein interactions, the main high-throughput protocols ({numref}`experimental_protein_methods`,
top) are:

- Yeast two-hybrid, in which one of the two proteins is attached to a DNA-binding
  domain and the other to an expression activating domain. Only if the two
  proteins interact will a reporter gene (e.g., for a fluorescent protein) be
  expressed.
- Tandem affinity purification, in which all proteins interacting with a
  “bait” protein are purified and subsequently measured using MS.

These protocols are noisy and have many false positives and negatives, so
further experimental validation using low-throughput methods, essentially
measuring the structure of protein complexes, is often necessary
({numref}`experimental_protein_methods`, bottom). Nevertheless, like transcriptomics data,
“interactomics” measurements are stored in databases, such as
[IntAct](https://www.ebi.ac.uk/intact/home) and can be used to obtain
insights into cell-wide protein interaction networks ({numref}`protein_network`).
Groups of highly connected proteins, i.e., with many interactions, can
indicate e.g., protein complexes or signalling pathways within or between
cells.

:::{figure} images/Week5/protein-network.jpg
:alt: Example protein interaction network
:align: center
:name: protein_network

A protein interaction network (4,927 proteins, 209,912 interactions found by
tandem affinity purification) for _Drosophila melanogaster_, with
clusters corresponding to protein complexes indicated in color. Credits: modified from {cite}`protein_network_2011` under [Elsevier user license](http://www.elsevier.com/open-access/userlicense/1.0/).
:::
%#% Figure protein_network is under open access: Permitted for non-commercial purposes: read, print & download. We should be able to use this image.

The methods mentioned measure _physical_ interactions between proteins, as
opposed to _functional_ interactions. Such interactions occur when two
proteins have similar functions - even though they may never actually
physically interact, for example when they are two alternative transcription
factors for the same gene. Such functional interactions can be measured to
some extent, but are mostly predicted by bioinformatics tools that combine
various pieces of evidence: literature, sequence similarity, gene co-expression,
etc. [STRING](https://string-db.org/) and
[GeneMania](https://genemania.org/) are the most well-known examples.

---

### Metabolomics

:::{figure} images/Week5/metabolic-network.png
:alt: Metabolic network
:align: center
:name: metabolic_network

The Roche biochemical pathway chart: global overview of metabolic processes
(left) and a close-up of part of the citrate cycle (right). Credits: {cite}`metabolic_network_2016`.
:::

Many cells produce a wide range of metabolites - small molecules or compounds that are part of metabolism. Many of
these so-called primary metabolites, serve as building blocks for essential
molecules, such as DNA or proteins, and provide energy for reactions. Other
metabolites, specialized metabolites, function in many organisms for
communication, regulation (hormones), defense (antibiotics), and symbiosis.
Some metabolites also regulate relevant phenotypes. As such, solving the structures of all molecules circulating in cells and measuring the
concentrations of metabolites as so-called “end points” of cellular
organization seems highly relevant in studying growth and development of
organisms and communities. Metabolomics is also important in medicine and
pharmacology, in food safety and in uncovering the production repertoire of
microbes in industrial biotechnology.

For measuring metabolites, mostly the MS technologies described [above](massspectrometry) are
employed, in particular GC-MS and LC-MS. As the range of metabolite sizes
and characteristics is large and many metabolites are still unknown,
identifying them from mass spectra is still very challenging. An advantage
is that known metabolic reactions, collected in metabolic networks
({numref}`metabolic_network`), can
support systems biology approaches, specifically in microbes.

---

### Phenomics

The final outcome of cellular regulation is the phenotype, i.e., the
set of observable characteristics or behaviours of a cell or organism at
macro-scale. These phenotypes often depend in complex ways on levels and
interactions of a (large) number of molecules in the cell. Uncovering the
genotype-phenotype relation, i.e., what variation at the genomic level
underlies (disrupted) phenotypes, is one of the most important goals in many
scientific areas, including medicine.

The set of potential phenotypes for different organisms is enormous, and
there is no standardized approach to phenomics as there is for the other
omics levels. Exceptions include structured databases of human diseases such as
[MalaCards](https://www.malacards.org/), and of genetic disorders such as
[OMIM](https://www.omim.org/). Similar approaches are starting to find their
way into other areas of biology (ecology, plant development and breeding, and
animal behaviour), with (standardized) repositories for image, video, and tracking
data. Reliable, high-throughput phenomics data will prove indispensable to
make sense of the genetic variation we find.

---

(omics)=

### -Omics data analysis

Transcriptomics, proteomics and metabolomics (can) all provide quantitative
measurements on molecule levels present. The resulting data can be analyzed
in various ways, to answer different questions. The main approaches
are:

- Visualization, to facilitate inspection of experimental outcomes and
  identifying large patterns.
- Differential abundance, to compare abundance levels between
  conditions, cell types or strains.
- Time series analysis, to follow changes over time (i.e., time series
  experiments).
- Clustering, grouping genes or samples based on similarity in abundance
  (e.g., to learn about shared function).
- Classification, finding which gene(s) are predictive of a certain
  phenotype (e.g., a disease).
- Enrichment, learning which biological functions/processes are most found
  in a given set of genes.

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
condition are important ({numref}`compare_conditions`). These are called _replicates_.
Underlying the variation in repeated measurements are both biological and
technical variation; in {numref}`error_vs_conditions` this comparison is made for all
transcripts detected in the samples, for two replicates (left) and two
different conditions (middle and right).

:::{figure} images/Week5/compare-conditions.svg
:alt: Comparing expression between conditions
:align: center
:name: compare_conditions

Difference in expression of gene X between two conditions measured without replicates and two possible distributions the measurement could have come from. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`compare_conditions_2024`.
:::

:::{figure} images/Week5/error-vs-conditions.svg
:alt: Comparison of differences between replicates and conditions
:align: center
:name: error_vs_conditions

Comparison of FPKM values between 2 replicates (left) and two conditions (middle and right).
The correlation between replicates should be very high, the differences between two conditions can be small (middle) or large (right). Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`error_vs_conditions_2024`.
:::
%#% Figure error_vs_conditions is saved as an svg but is not actually a vectorized image.

---

#### Visualization

:::{figure} images/Week5/streptococcus-pca-heatmap.png
:alt: PCA plot and heatmap of simple bacterial transcriptomics dataset
:align: center
:name: streptococcus_pca_heatmap

Visualization of the expression of 2,135 genes in _Streptococcus parauberis_
after 1, 2, and 4 hours of growth in two different media: fish serum and
broth. Each condition has been measured on 3 replicates. Left: a Principal
Component Analysis (PCA) that shows there is a major separation (44% of the variance)
between the two media and that there is clear progression along time.
Note that there is not much expression difference after 2 and 4 hours of
growth on serum. Right: a heatmap visualizes the entire dataset, with colors
indicating z-score normalized expression values: green is low, black is
medium and red is high expression. Rows are genes, columns indicate growth
condition, both are clustered. Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`streptococcus_pca_heatmap_2021`.
:::

While omics data can be analyzed in for example Microsoft Excel, it is very
hard to make sense of a data matrix with tens of thousands of genes and
dozens to hundreds of samples. It is therefore wise to first use methods to
visualize or summarize the data to see whether major patterns or outliers
can already be detected. A widely used visualization is the so-called
heatmap, an image of the matrix (genes-by-samples) where each measurement is represented by a
color. If the data is clustered along both genes and samples,
interesting patterns may be easy to spot. A second approach often used in
initial data exploration is Principal Component Analysis (PCA), which plots
samples (or genes) along the main axes of variation in the data. If color or
markers are added, a PCA plot serves very well to detect outliers and
groups. Both visualizations are illustrated in {numref}`streptococcus_pca_heatmap`.

---

#### Differential abundance

:::{figure} images/Week5/t-test.png
:alt: T-test
:align: center
:name: t_test

The simplest test for differential abundance of a gene between two
conditions is the _t_-test. The _t_-statistic is a measure for the
difference between the means _x_ of two distributions, corrected by the
uncertainty expressed in terms of their standard deviation _s_. A _p_-value,
the probability that we find a _t_-statistic as large or larger by chance,
can be calculated using the _t_-distribution. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`t_test_2024`.
:::
%#% Figure t_test is self-created image?
Perhaps the most widely used analysis on omics data, the goal here is to
compare abundance levels between two classes, conditions, strains, cell
types, etc. - for example, healthy vs. diseased tissue, with or without a
certain drug, in different growth conditions, etc. The simplest approach is
to collect a number of replicate measurements under both conditions and, for
each gene perform a simple statistical test such as the _t_-test
({numref}`t_test`). Each test
gives a _p_-value, and genes with a _p_-value below a certain
threshold, say 5%, could then called significantly differentially expressed.
There are two caveats:

1. If you perform an individual test for each of thousands of genes, at a
   threshold of 5% you would still incorrectly call many hundreds to thousands
   genes differentially expressed. To solve this, _p_-values are generally
   _adjusted_ for multiple testing, i.e., made larger.
2. If the variation (standard deviation _s_ in {numref}`t_test`) is low enough, a
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
However, here the goal is actually to predict the condition of a new (additional)
sample based on a limited set of gene expression levels, as accurately as possible.
Applications are mainly found in medicine, such as diagnosis and prognosis,
but are also used to distinguish different cell types, growth stages, etc.

---

#### Time series analysis

:::{figure} images/Week5/time-series.png
:alt: Transcriptomics of various stages of T-cell development.
:align: center
:name: time_series

Transcriptomics of various stages of T-cell development, i.e., a time
series analysis. Left: heatmap of the 446 genes with most variable gene
expression levels, clustered into 15 clusters. Right: average expression
profiles of each cluster show that different groups of genes peak in
expression in different development stages. These genes may be regulated in
the same way and be active in similar biological processes. Credits: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) {cite}`time_series_2005`.
:::

Often it is more interesting to follow abundance over time rather than
compare it at one specific timepoint, e.g., when tracking the response to a
drug, a change in growth conditions, regulation of organ development, and so
on. Given the cost of omics measurements, a major challenge is to select
optimal time points for sampling, balancing the information obtained with
the investment. Subsequent analyses include clustering to find similarly
regulated genes (see [below](clustering)) and more advanced methods that try to identify
regulatory interactions by seeing which gene increase/decrease precedes that
of another (set of) gene(s). {numref}`time_series` provides an example.

---

(clustering)=

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
interacting proteins, etc. For samples, it can help identify for example
disease subtypes, different genotypes, etc. that may be helpful to learn
about different outcomes. Clustering is often used to order the rows and
columns of a heatmap (as in {numref}`streptococcus_pca_heatmap` and {numref}`time_series`), after
which obvious clusters should become visible as large color blocks.

---

#### Enrichment

:::{figure} images/Week5/GO-enrichment.png
:alt: A part of the Gene Ontology
:align: center
:name: go_enrichment

An example part of the Gene Ontology (GO), in the biological process category.
Lower-level terms are specific instantiations of the higher-level ones. In
this figure, GO terms are colored according to the _p_-value in an
enrichment test. Credits: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) {cite}`go_enrichment_2010`.
:::

A final often used analysis is enrichment, in which we use gene functional
annotation to learn about a set of genes, such as a list of differentially
expressed genes or a cluster. The most widely used annotation for genes is
the Gene Ontology, a structured dictionary of terms that describe the
molecular functions of genes and their involvement in biological processes
or cellular components at different levels of detail ({numref}`go_enrichment`). A statistical test
then assesses how significantly often (more than by chance) we find a
certain annotaton in our list of genes. Like differential abundance, the
_p_-values produced should be adjusted for multiple testing. The resulting
significant annotations can help interpret the outcome of an experiment at a
higher level than that of individual genes.

---

### Outlook

This section of the reader on omics data analysis is likely the most prone
to obsolescence. We have only touched upon or even left out recent
developments in single-molecule measurements of DNA, RNA, and proteins, of
single-cell and spatial omics analysis, where molecules are measured in
individual cells or at grid points in tissues, and accompanying developments
in deep learning that promise to provide foundation models to capitalize on
the large volumes of omics data in order to solve specific tasks. The end
goal, [a systems biology simulation of the living
cell](https://www.wholecellviz.org/viz.php#replication), is still far from
reality, but may be reached sooner than we now believe possible.
%PRACTICAL_SEPARATOR%

---

## Practical assignments

This practical contains questions and exercises to help you process the study materials of Week 5.
You have 2 mornings to work your way through the exercises.
In a single session you should aim to get about halfway through this guide (i.e., day 1: assignment 1-3, day 2: assignment 4, 5 and project preparation exercise).
Use the time indication to make sure that you do not get stuck in one assignment.
These practical exercises offer you the best preparation for the project.
Especially the **project preparation exercise** at the end is a good reflection of the level that is required to write a good project report.
Make sure that you develop your practical skills now, in order to apply them during the project.

**Note, the answers will be published after the practical!**

:::::{admonition} **Genomics**

_Assignment I: Genomics (20 minutes)_

Genome assembly using next-generation sequencing reads is challenging due the short length of the reads, the errors that occur during sequencing and the presence of repeats in the genome.
After completing this exercise, you should be able to explain how genome assembly works and what problems may be encountered.

- a. Given the set of 6 short reads below, try to recreate the original DNA sequence by looking for overlaps between the reads. Note that there may be some sequencing errors. What amino acid sequence does the DNA sequence code for? Hint: copy the sequences into Word in a fixed-width font (e.g., Courier) and add spaces to align the sequences; for translation, you can Google for an online tool.

```
> read_1
aagcagcgcgggcgaataataataa
> read_2
acccatattagcattagcacccttg
> read_3
cccatgaacatattgatgatgaaaa
> read_4
aaaacatggaaagcagcgcgggcga
> read_5
ttagcattagcacccatgaacatat
> read_6
gatgatgcaaacatggaaagcagcg
```

- b. Would you be able to unambiguously reconstruct the overall sequence without read_6?

%ANSWER%:::{dropdown} Assignment I answers
%ANSWER%a. There are two sequencing errors (underlined):
%ANSWER%`
%ANSWER%                                                  aagcagcgcgggcgaataataataa
%ANSWER%acccatattagcattagcaccct̲tg                                                  
%ANSWER%                   cccatgaacatattgatgatgaaaa                               
%ANSWER%                                        aaaacatggaaagcagcgcgggcga          
%ANSWER%       ttagcattagcacccatgaacatat                                           
%ANSWER%                                 gatgatgc̲aaacatggaaagcagcg                 
%ANSWER%acccatattagcattagcacccatgaacatattgatgatgaaaacatggaaagcagcgcgggcgaataataataa
%ANSWER%`
%ANSWER%This translates to the amino acid sequence `THISISTHEHIDDENMESSAGE***`. \
%ANSWER%b. No, then you would also be able to reconstruct this sequence:
%ANSWER%`
%ANSWER%                                          aagcagcgcgggcgaataataataa                       
%ANSWER%acccatattagcattagcaccct̲tg                                                                 
%ANSWER%                   cccatgaacatattgatgatgaaaa                                              
%ANSWER%                                                                 aaaacatggaaagcagcgcgggcga
%ANSWER%       ttagcattagcacccatgaacatat                                                          
%ANSWER%acccatattagcattagcaccct̲tgaacatattgatgatgaaaagcagcgcgggcgaataataataaaacatggaaagcagcgcgggcga
%ANSWER%`
%ANSWER% which translates to `THISISTLEHIDDEKQRGRIIIKHGKQRGR`. Read 6 spans the `aaaa` repeat and is needed to uniquely assemble this sequence.
%ANSWER%:::

_Assignment II: Genomics and NGS (60 minutes)_

In this brief hands-on tutorial, you will use a genome browser to learn more about a specific gene and its sequence variants; then you will work with IGV, the Integrated Genome Viewer, to inspect a number of different NGS datasets.
Note that in most of the environments discussed below, you can get additional information on plot elements (boxplots, points etc.) by hovering your mouse over it.
Please <u>**use Google Chrome or Firefox**</u> as other browsers do not display all websites well.

After completing this exercise, you should be able to explain how next-generation sequencing data is used to study genomic conservation, genetic variation and genome function.

- a. This tour of genome browsers will be based on a gene called BCL11B. First, look up some information on this gene in the [GeneCards database](https://www.genecards.org/). How did it get its name?
- b. Visit the [UCSC Genome Browser](https://genome-euro.ucsc.edu/) and go to the Genome Browser (below "Tools"). Below "Human Assembly", select the "hg19" genome assembly and search for BCL11B. If you get a list of possible ocations, please choose the correct link corresponding to the BCL11B gene. What chromosome is the gene on, how long is it (in bp), and how many exons does it have? At what position does the gene start (hint: check the arrows in the gene model)?
- c. Click on the top gene variant in the top of your figure panel to visit a page with information on the gene model. How long is the coding region? How long is the ORF (in bp and in amino acids)?
- d. Go back to the genome view. Genome browsers work with "tracks", i.e., various sources of information aligned to the genome. What does the "100 Vert. cons" track contain? Do you see a correlation of this track with another track?
- e. You can also add tracks to the view yourself. Below the main genome window, lookup (but do not yet click on) "ClinVar Variants" under "Phenotype and Literature", select "pack" using the drop-down menu below it, and press the "refresh" button on the right. ClinVar is a database of mutations that have a proven clinical effect (i.e. lead to a disease). Find the red T>G SNP in the fourth exon – under “ClinVar Short Variants” – and zoom in to the nucleotide level ('base') to check whether it is synonymous or not (hint: use the "--->" at the top to select the correct strand). Does this match your expectations?
- f. Is the position conserved in other genomes?

You can inspect a large number of pre-computed tracks in the UCSC Genome Browser, but it is hard to visualise individual NGS samples.
For that we move to IGV, the [Integrated Genome Viewer](https://igv.org/app).
Have a look at the documentation (under "Help" in the top menu) to get somewhat acquainted with the user interface.

Once you are familiar with IGV, first select the hg19 human genome assembly under the "Genomes" menu item.
Then look up BCL11B using the search box and load some additional tracks.
First, select "Tracks -> Variants", then choose "1KG Phase 3 SNPs" from the list; these are genotypes found in the 1000 Human Genomes project (which eventually sequenced approximately 2500 genomes).
Also select "Tracks -> Platinum Genomes" and choose "NA12878"; this is short read data of one of six genomes which have been sequenced in depth using different technologies, a lymphoblast cell line to be precise.

- g. Zoom in on the last exon (on the left). What do you notice in the NA12878 read data and the coverage plot at the top of that track?
- h. Zoom in on position 99,639,270. What does the 1KG genotype track tell about this position? Click on track elements to get more information.
- i. What genotype does NA12878 have at this position? How many reads support that genotype?
- j. Next, load regulatory transcription data from the ENCODE project. The ENCODE project was a large functional genomics project that delivered a wide variety of datasets on how the human genome is used: transcription activity, histone modifications, DNA accessibility, etc. Download a file with [RNAseq data for NA12878](http://www.bioinformatics.nl/courses/BIF-20306/wgEncodeRegTxnCaltechRnaSeqGm12878R2x75Il200SigPooled_small.bigWig) and load it as a track in the IGV web app using "Tracks -> Local File...". If you look carefully at this track over the full length of BCL11B, is it in concordance with the gene model? What may cause this?

Structural variants are another type of variation found in genomes that can be inspected in IGV.

- k. Go to chr1:85,974,000-85,993,000 (copy and paste the coordinates into the search box). Have a closer look at the read data track of NA12878. What type of structural variant does the read coverage suggest here? Take a look at [Figure 3A](https://genome.cshlp.org/content/27/1/157) in the paper on the platinum genomes. Does this match your observation? From the "Tracks -> Variants..." menu, load the "1KG Phase 3 SVs" to verify this.
- l. Locate the other end of the structural variant. What is its size?
- m. In IGV a gene overlaps the structural variant. What is the name of the gene? Do you think the structural variant affects the protein sequence of the gene?

---

<b><center>Optional</b></center>

- n. You can visualize the individual datasets generated in the ENCODE project using "Tracks -> ENCODE Signals...". Search for "12878" in the top-right box and select a few tracks to display. Use Google to learn what experiments are displayed in these tracks.

---

This concludes this trial of genome browsers, which demonstrates how you can relatively easily inspect genomics data for conservation, variation, expression etc.
Although here we have focused on the human genome (because of the wide availability of data), IGV can handle any genomic data – as long as it is in a standard format – and genome browsers similar to the human UCSC one are available for many different organisms at [UCSC](https://genome-euro.ucsc.edu/), [EMBL-EBI](https://www.ensembl.org/) and [Ensembl Genomes](http://ensemblgenomes.org/) and at model organisms community sites.

%ANSWER%:::{dropdown} Assignment II answers
%ANSWER%a. It is closely related to BCL11A, a gene whose translocation may be associated with B-cell malignancies (CLL, chronic lymphatic leukemia; BCL = B-cell lymphoma/leukemia). \
%ANSWER%b. Chromosome 14, 102,198bp, 4 exons. It starts at position 99,737,822 and lies on the reverse strand (the arrows go left). \
%ANSWER%c. 97,068 bp; 2,685 bp or 894 amino acids (and 1 stop codon). \
%ANSWER%d. Conservation in 100 vertebrate genomes; yes, conservation is correlated with exons, although there also seem to be some conserved (regulatory?) regions in the introns. \
%ANSWER%e. It is nonsynonymous (AAT -> AAG: Asn -> Lys). This replaces a polar residue by a basic one, which may indeed interfere with protein structure and/or function. You can also find this by clicking on the variant; at the top, the effect on the protein sequence is specified as c.1323T>G (p.Asn441Lys), where c. means coding region, p. means protein and p.XPY means that at position P, amino acid X is replaced by Y. \
%ANSWER%f. The position is not conserved (3rd codon position), due to the redundancy in the genetic code; but the amino acid is. \
%ANSWER%g. Variants become visible: some differences occur only in one or two reads (likely sequencing errors), some occur in many reads and are represented in the coverage plot by colored bars. Most of these bars have two colors, indicating that only one chromosome carries the variant. \
%ANSWER%h. It says the reference contains a T, but an alternative (ALT) G is found in a number of samples. The abbreviations are not very clear, but the count of alternative alleles (G) is 1100 (AC) out of a total number of 5008 alleles (AN), i.e., 21.96% (the allele frequency, AF). \
%ANSWER%i. NA12878 has genotype T|G (reference T, alternative G), i.e., two different alleles on the two chromosomes. These are supported by 75 reads – 40 x G, 35 x T. \
%ANSWER%j. Not fully: you can see some reads outside an exon. Could be an incorrect gene model or (more likely) erroneously mapped reads. Also, exon 1 and 3 are barely covered, which could point to alternative splicing in this sample. For exon 3 this is corroborated by the gene models in the UCSC genome browser; for exon 1 it could point to RNA degradation, i.e., a measurement artefact. \
%ANSWER%k. The read coverage (in the top part of the track of NA12878) doubles in the view. This is indicative of a duplication: the sequenced genome contains two copies of the sequence compared to the reference, leading (on average) to twice as many reads. In this case the region has been duplicated in place as a tandem duplication. The paper and the SV track confirm this. \
%ANSWER%l. The duplication begins at roughly 85,980,100 and ends around 86,007,500, making it about 27,500 bp long. \
%ANSWER%m. The gene is DDAH1. The duplication falls completely within an intron and does not affect the resulting protein (at least, its amino acid sequence; it could influence transcription or folding through mechanisms that depend on the intron). \
%ANSWER%n. Many tracks are available, displaying various summaries of measurements on genome functionality (e.g., transcription, histone binding and modification, transcription factor and RNA binding, DNA accessibility, methylation etc.). For more information see, e.g., the [ENCODE project website](https://www.encodeproject.org/) or [Wikipedia](https://en.wikipedia.org/wiki/ENCODE).
%ANSWER%:::
:::::

:::::{admonition} **Transcriptomics**

_Assignment III: Omics data analysis (45 minutes)_

There is a wide variety of tools to analyze omics data; introducing all of these is beyond the scope of this course.
To gain some experience, we will explore a pre-processed online compendium of human cancer cell line transcriptomics measurements, the Cancer Cell Line Encyclopedia (CCLE).
The data is hosted on the [Cancer Dependency Portal (DepMap)](https://depmap.org/portal/ccle/) by the Broad Institute, a collaboration between Harvard and MIT, as part of the Broad Cancer Dependency Map.

The CCLE project stores among others the expression of all human genes, measured using RNAseq.
RNAseq measurements are in log<sub>2</sub>(TPM+1), where TPM stands for Transcripts Per Million (a normalised count of reads per gene).
The project also includes measurements on copy number (CN) variation, DNA methylation etc.

Again, <u>**use Google Chrome or Firefox**</u>, and do not forget that in most tools you can get additional information on plot elements by hovering your mouse over it.
After completing this assignment, you should be able to explain the main types of analyses (differential expression, clustering, enrichment analysis) that can be performed on quantitative data.

- a. Visit the CCLE website and search for the gene we worked with before, BCL11B. Your initial view contains a lot of information on expression and mutations of the gene in different (diseased) tissues. Select the "Characterization" tab at the top. You will then see the expression of the BCL11B gene, visualized using so-called _boxplots_. Use Google to figure out how you should interpret these plots – what do the boxes and lines represent?
- b. Select the "Show lineage subtypes" box in the menu on the left. In which tissues/tumours is the gene highly expressed? In these tissues, in which diseases is it lowly expressed (i.e., between what diseases is BCL11B **differentially expressed**)? Does this match what you learned in GeneCards?
- c. By clicking "Explore relationships with other data" (top right) you can explore the data in more depth. In the initial view, the y-axis is just used to separate the data points, it does not actually display a measurement. Hover your mouse over the dots to get more information on the samples in which BCL11B was measured. You can get a more informative picture by selecting "Primary disease" for the "Group by" option under "View Options". In which diseases and which samples do you find the highest expression?
- d. Now select "Gene" as the data type for the Y axis (top left), enter "BCL11A" and select the "Expression" dataset. Again, under "View options", select to color by "Primary disease". Each point now represents the expression of BCL11A and BCL11B in one sample. In what samples are both genes highly expressed?
- e. Now compare the expression of BCL11B to the expression of the gene RHOH in the same way. What do you see? You can again hover over the points to get more information; in the legend on the right, you can also double-click a specific disease to isolate a single disease and get a clearer picture.
- f. What can you say about **differential expression** of RHOH by itself? Again, play with the "Group by" and "Filter by" View Options if needed. Does the differential expression pattern make sense? You can Google search the diseases to learn more about the tissues in which they occur.

---

<b><center>Optional (20 minutes)</b></center>

- g. Look up BCL11B in [GTEx](https://gtexportal.org/), the gene-tissue expression compendium. GTEx is similar to CCLE, but profiles expression in healthy tissues, collected from donors (directly after they passed away). Under the menu item "Expression", search for the BCL11B gene. In the resulting plot, play around to figure out in which tissue BCL11B is normally expressed most highly.
- h. While at GTEx, you can inspect some PCA plots of the samples. PCA, or **Principal Component Analysis**, is often used to visualize high-dimensional data. It finds directions in the data along which the samples differ mostly: PC1 is the direction with most variation, PC2 the next direction perpendicular to PC1, and so on. Using the top menu, go to "Expression" -> "Expression PCA". Select the "Hardy Scale" to color the samples. What do you think this scale measures? Hint: look at the legend beneath the plots, the colors correspond to the Hardy Scale.
- i. In what tissue do you expect to see differences in expression for "Ventilator case" donors? Check this by selecting the tissue from the "Select a tissue" drop down box to create a tissue-specific PCA plot.
- j. Return to the CCLE and plot BCL11B expression versus BCL11B proteomics. Do you expect a correlation, and do you see one?
- k. Plot BCL11B expression versus methylation (1kb upstream TSS) and check what DNA methylation does (https://en.wikipedia.org/wiki/DNA_methylation). Are the results what you would expect?

---

%ANSWER%:::{dropdown} Assignment III answers
%ANSWER%a. Boxplots display distributions, i.e., a large collection of measurements. Boxes indicate the first and third quartile (i.e., 25% of the data falls below the box, 25% above the box) and a line indicates the median. The whiskers typically extend to 1.5x the range between the first and third quartile. Individual points indicate "outliers", i.e., measurements which fall outside this range. \
%ANSWER%b. Mostly high in blood and bone tissues, specifically in ALL and Ewings sarcoma. Low in blood for AML and chronic diseases (CLL, CML) and in bone for the other sarcomas. And yes, more or less; BCL11B is involved in T-cell tumors, not B-cell ones (UniProt actually lists this). It seems to be a B-cell tumor _repressor_, so low expression indicates disease. \
%ANSWER%c. Expression is highest in bone cancer (sample SKNMC) and leukemia (SUPT11). \
%ANSWER%d. In leukemia and lung cancer samples (top right). \
%ANSWER%e. Correlated expression in leukemia and bone cancer. In both cases, both genes clearly have a much higher expression for the particular disease than in other cell types/diseases. \
%ANSWER%f. Differential expression between lymphomas/leukemias vs. most other diseases. This makes sense: the GeneCard for RHOH describes a role in leukemias and lymphomas. \
%ANSWER%g. In the skin, followed by the brain. \
%ANSWER%h. The way in which the donor died. \
%ANSWER%i. In lung. Yes, there is a clear difference along PC1. Also holds for other tissues, though. \
%ANSWER%j. At low expression levels the relation is not very clear, but at high expression levels proteomics measurements are also high. \
%ANSWER%k. Methylation of the promoter region silences gene expression. It is not very easy to see, but for high methylation expression is mostly low (as expected).
%ANSWER%:::

_Assignment IV: Clustering (30 minutes)_

If all went well, you found a correlation between the expression of BCL11B and RHOH in some tissues.
It is easier to find such relations by performing clustering, i.e., finding groups of genes and/or groups of samples that have similar expression.
Such clusters can help you learn about functional relations between genes that cluster together, or phenotypic relations between samples that cluster together.
For the CCLE, a nice interactive viewer is available [here](https://maayanlab.github.io/CCLE_Clustergrammer/).
Open the page and select the "Bone" subset.

- a. In the main figure, the so-called **heatmap**, what do blue and red pixels correspond to? Note that you can zoom in and scroll around using the mouse.
- b. What is the expression level of BCL11B (use the search box if needed) in sample RDES?
- c. On the right and at the bottom, the clusters are indicated by grey bars. How many groups of genes do you see initially? And how many groups of samples? Do you think that is reasonable, given the gene expression values?
- d. You can create fewer or more clusters using the "volume slider buttons" next to the clusters. Try these. Does it look OK to group the genes into more clusters? And the samples?
- e. Zoom in on the gene names on the left. Is BCL11B indeed clustered with RHOH?
- f. At the top, additional information on the samples is plotted (tissue, histology, etc.). Does one of the sample clusters correspond to a certain annotation?
- g. The top left shows a number of Gene Ontology terms (recall from [week 1](sec_go) that occur more often in the set of genes involved in bone tumours than you would expect by chance (i.e., than if a set of genes of similar size were randomly drawn from all genes). We call this a **GO enrichment analysis**. The heights of the bars correspond to the p-values of this analysis; the higher the bar, the more significant the enrichment. Do the terms make sense?

%ANSWER%:::{dropdown} Assignment IV answers
%ANSWER%a. Blue corresponds to low gene expression and red corresponds to high gene expression. Expression here seems to be normalized, where 0 means average expression. \
%ANSWER%b. 1.304 (zoom in and hover). \
%ANSWER%c. Two groups of genes, three groups of samples. There seems to be a clear distinction between the two gene clusters, in terms of color (expression); the difference between the sample clusters is less clear – you could argue that 2 or 4 clusters would be equally good. \
%ANSWER%d. It does not seem to look OK for Genes, you get many very small clusters. Samples maybe; at four clusters, you get a small extra cluster of two similar samples. \
%ANSWER%e. Yes, they are next to each other in the clustering: their expression is very similar over all samples. \
%ANSWER%f. Yes, histology: the right cluster clearly corresponds to Ewing sarcoma. \
%ANSWER%g. Yes, these are all bone-related biological processes.
%ANSWER%:::
:::::

:::::{admonition} **Differential gene expression**

_Assignment V: Differential gene expression (45 minutes)_

NCBI hosts the Gene Expression Omnibus, a database containing gene expression experiments. You can download and combine these data in various formats and analyse them on your own computer to potentially answer biological questions without performing measurements yourself. This course is too short to teach all the skills you need for reanalysing public data, but we can make use of an online tool called GEO2R to do some simple analyses in a web browser.

After completing this assignment, you should be able to interpret the results of differential expression analyses on quantitative data

- a. Visit the [Gene Expression Omnibus](https://www.ncbi.nlm.nih.gov/geo), search for sample series GSE69485 and read the summary and design of the study that produced this series. At the bottom you can find a list of samples. How many are there?
- b. What type of microarray is used? You can get more information by searching GEO for GPL90. How many probesets are there, for how many genes?

You can perform simple analyses on this data in GEO2R.
In this case, we will try to find genes differentially expressed between yeast grown in aerobic and anaerobic conditions, i.e., with oxygen vs. without oxygen.
To get started, return to the page for sample series GSE69485 and press the "Analyze with GEO2R" button at the bottom of the page.
You will see a list of all samples, which you can now assign to different groups.
First, click "Define groups" (at the top) to create two groups, say "aerobic" and "anaerobic".
Then select all four samples taken during exponential growth phase (also late/end) under anaerobic conditions and assign them to the anaerobic group, by clicking "anaerobic" in the group list.
Do the same for the four aerobic exponential growth phase samples.

- c. Scroll down and press the "Analyze" button. After some processing, a number of graphs are shown that present expression levels, fold changes, differentially expressed genes (blue/red) etc. The "expression density" plot contains the overall distributions of the expression values of all genes per sample; if these distributions look very different, for example due to differences in the measurement setup, this may point to problems. Do these arrays look like they can be compared?

Below the figures you should see a list of Affymetrix probe sets (under "ID"), sorted by (adjusted) _p_-values.
The logFC column indicates the log<sub>2</sub> fold change: 0 for no change, positive for genes more highly expressed under anaerobic conditions and negative for genes more highly expressed under aerobic conditions (or vice versa, depending on which group you created first).

- d. What is the most significantly differentially expressed gene here (the one with the lowest _p_-value)?
- e. You can inspect the underlying expression values by clicking on the corresponding row in the table, this will show a plot with the expression in each sample; the "Sample values" button will show the actual measurements. Compare the expression ranges for the top three genes. What do you notice?
- f. To learn more about the differentially expressed genes, you can add Gene Ontology (GO) information. To do so, click "Select columns" above the table and select "GO: Function", "GO: Process" and "GO: Component". Then press "Set". What types of functions do you notice in the top 20 genes?

---

<b><center>Optional</b></center>
Ideally, the results obtained are corroborated by additional experiments.
In GEO, another study is available that focused on the effect of engineering amylase genes in yeast, producing series GSE38848.

- g. Use GEO2R on series GSE38848 to find genes differentially expressed under anaerobic and aerobic conditions in the reference strain (NC) only. Do you find the same genes? The same functions?

---

Note that this was just a quick tour of a number of tools to interpret omics data, for some very specific datasets (transcriptomics in human cancer cells and yeast
cells). However, the underlying analyses – differential expression, clustering,
principal component analysis etc. – can be widely applied on most quantitative –
omics datasets. If you want to dive deeper, you will need to use more advanced
(statistical) methods which are taught in other courses.

%ANSWER%:::{dropdown} Assignment V answers
%ANSWER%a. There are 20 samples. \
%ANSWER%b. The microarray is an Affymetrix Yeast Genome S98 one: 9,335 probesets, over 6,400 genes. There are more probesets than genes: some probesets (attempt to) detect the same gene, some probesets are there for putative ORFs and some probesets are for quality control and calibration. \
%ANSWER%c. Yes, the distributions are rather similar. \
%ANSWER%d. YML038C, a hypothetical protein – its function is not yet verified. \
%ANSWER%e. While the _relative_ changes are similar, the underlying _absolute_ measurement values are wildly different, ranging to 150 for the top gene to over 10,000 for the third gene. \
%ANSWER%f. The top 20 genes seem to be mostly related to respiration: heme, iron transport, stress response and redox (reduction-oxidation) reactions. However, there are also less clear functions, such as steroid/sterol and borate transport. \
%ANSWER%g. Some genes (or gene families) are the same (TIR, DAN, FET), but not exactly so – small differences in measurement setup, background strain, experimental conditions etc. play a role. The functions seem very similar though.
%ANSWER%:::
:::::

:::::{admonition} **Project Preparation Exercise**
:class: important

An assignment focusing on how to write a good project report is available on BrightSpace.
The results will be discussed at the end of the Week 5 recap lecture

---

Explore tissue-specific gene expression of ARF5 and IAA5.
For this, you can use some other (plant-specific) resources than the human-centered ones you used above, e.g., [Expression Atlas](https://www.ebi.ac.uk/gxa/), also accessible through UniProt, under "Expression") or [BAR](https://bar.utoronto.ca/), the Bio-Analytic Resource for Plant Biology.

Describe the following items in a few bullet points each.
You may include up to two figures or tables.

1. **Materials & Methods** What did you do? Which data, databases and tools did you use, and why did you choose these? What important settings did you select?
2. **Results** What did you find, what are the main results? Report the relevant data, numbers, tables/figures, and clearly describe your observations.
3. **Discussion & Conclusion** Do the results make sense? Are they according to your expectation or do you see something surprising? What do the results mean, how can you interpret them? Do different tools agree or not? What can you conclude? Make sure to describe the expectations and assumptions underlying your interpretation.
   :::::
   %PRACTICAL_SEPARATOR%

## References

```{bibliography}
:filter: docname in docnames
:labelprefix: 5W
```
