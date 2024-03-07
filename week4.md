# Week 4 - AlphaFold

```{epigraph}

-- Justin van der Hooft & Rens Holmer, Wageningen, 2023

```

## Predicting protein structures: the sequence-structure-function paradigm

Proteins are essential for life on earth.
They have many kinds of functions in organisms such as supporting its structure (i.e., keratin in our skin), performing enzymatic reactions (i.e., Ribulose-1,5-bisphosphate carboxylase-oxygenase, a.k.a. Rubisco, in plants), or receptors for transduction of signals that mediate cell-to-cell communication.
Intriguingly, a relatively small amount of amino acid building blocks forms the basis of a structurally very diverse protein repertoire that exert a wide range of functions of which only some are mentioned before.
To understand the function of proteins, knowing their structures is key.
Proteins are created as a long chain of amino acids that then folds into a three-dimensional (3D) structure, based on various types of interactions between amino acid side groups.
Interestingly, whereas the amino acid sequence of proteins may differ, their folding may still result in comparable 3D structures – with comparable or even similar functionality (see {numref}`w4f1`).
Thus, the protein folding process is important, as it determines the final 3D structure and misfolding can lead to misfunctioning of the protein, for example causing a disease in humans or resulting in a loss of function in plants.

The sequence-structure-function paradigm states that, in principle, all information to predict the folding of a protein, and thus its 3D structure and ultimately its function, is stored in its primary sequence.
In practice, however, predicting structure from sequence turned out to be a very hard and challenging task.
In the various protein structure levels, the primary structure is the amino acid sequence, and the secondary structure refers to local shapes such as sheets, helices, and coils.
Subsequent interactions between sheets and helices typically form anchor points upon which the tertiary (3D) structure is based.
This chapter introduces the most recent approach to predicting tertiary (3D) structure directly from amino acid sequences: AlphaFold.

:::{figure} images/Week4/w4f1_myoglobin-1.png
:alt: Different protein structures
:align: center
:name: w4f1

Protein structures of human myoglobin (top left), African elephant myoglobin (top right, 80% sequence identity to human structure analogue), blackfin tuna myoglobin (bottom right, 45% sequence identity to human analogue) and pigeon myoglobin (bottom left, 25% sequence identity to human analogue).
Myoglobin can be found in muscles and its main function is to supply oxygen to muscle cells.
The protein structure figures illustrate how structure can be largely the same even for sequences that are quite different.  
Image source: https://www.blopig.com/blog/2021/07/alphafold-2-is-here-whats-behind-the-structure-prediction-miracle/
:::

While current experimental methods can generate many sequences of hypothetical proteins present in organisms, it is still hard and expensive to determine the corresponding 3D protein structures experimentally.
The main traditional experimental analytical techniques used are nuclear magnetic resonance (NMR) spectroscopy and X-ray crystallography.
The former yields useful but noisy measurements with usually multiple structural conformations; the latter is more accurate, but easily costs 120,000 euros and it can take a year or even longer to fully elucidate the protein 3D structure from the data, and some structures cannot be measured at all.
Thus, alternative methods to derive 3D protein structures are needed to interpret the large amount of biological sequence data that has become available in the recent decades.

Consequently, predicting protein structures has been a topic of high interest and relevance for biochemistry for many decades now.
Various approaches including ab initio, threading (also called fragment-based modelling), and homology modelling have been proposed and used to go from sequence to structure, with both sequence identity and alignment length as the most important factors to decide which approach to choose.
Very recently, the DeepMind team of Google introduced a machine learning-based approach called AlphaFold.
This reader describes how AlphaFold builds on previous approaches and has had substantial impact in biochemistry and bioinformatics.
An analogy could be made to the introduction of the smartphone: whereas previously, one needed to go to the library to find a computer and connect to the internet to get to a weather forecast, one now simply takes the phone and looks up the weather.
In the following sections, it is described why AlphaFold could be developed and work only now, how it was compared to other approaches in a fair manner, how it relies on database search and multiple sequence alignment, and what the introduction of the AlphaFoldDB-database that contains AlphaFold-predicted structure models means for discovery pipelines.

## AlphaFold ingredients: experimentally derived 3D structures & computational advances

:::{figure} images/Week4/w4f2.png
:alt: Protein structures in the Protein Data Bank
:align: center
:name: w4f2

Top: Number of added 3D protein structures that have been added to the Protein Data Bank from 1976 – present time.
Right: Number of unique 3D protein structures (based on their sequence) that have been added to the Protein Data Bank from 1976 – present time.
Source: https://www.rcsb.org/stats/
:::

It is good to realize why AlphaFold could work in the first place.
The AlphaFold approach is based on machine learning, i.e., computer algorithms that fit a predictive model based on training data.
Such a model can then predict the structure, when given a sequence that it has not seen before.
DeepMind made use of very large neural network models, so-called deep learning.
The training data for such models ideally consists of many known examples for very complex problems such as protein structure prediction.
The Protein Data Bank (PDB) collects experimentally such training data, i.e., measured protein 3D structures.
By now, ~200,000 PDB entries are available of ~80,000 unique protein sequences at 95% sequence similarity ({numref}`w4f2`, top).
The latter number is important, as a sufficiently diverse set of examples will ensure that there are enough examples in the training data to recognize relevant patterns of various protein folds and other structural features.

As input for their most recent machine learning model, the DeepMind team predicted the structure of 100,000 protein sequences and added those to the training data, a technique called data augmentation.
Thus, at the time of model training, the team could use nearly 300,000 protein sequence - 3D structure combinations to train their AlphaFold model that uses an FASTA file as input and outputs a 3D structure model that is described in section {ref}`model_quality`.

(alphafold_impact)=

## The impact of AlphaFold on biochemistry

The true impact of AlphaFold would be difficult to assess without an independent test.
Since protein folding and 3D structure prediction is one of the grand challenges of biochemistry, the Critical Assessment of protein Structure Prediction (CASP) competition was founded in 1994.
CASP is a community-wide competition where research groups are required to predict 3D structures from protein sequences that do not have any public 3D structure available.
More than 100 research groups worldwide join the CASP competition every two years.
Using all sequence and structure data available at the present time, they predict structures for protein sequences with newly derived (yet unreleased) structures, specifically withheld from the public for the purpose of this competition.

:::{figure} images/Week4/w4f3.png
:alt: AlphaFold progress; Amino acid residue in protein backbone
:align: center
:name: w4f3

Left: Average GDT tests of the contest winners.
Right: Schematic view of amino acid residue in protein backbone with key atoms labelled, including the alpha carbon used for GDT-TS (image sources: Nature news - https://www.nature.com/articles/d41586-020-03348-4, and FolditWiki - https://foldit.fandom.com/wiki/Alpha_carbon.)
:::

{numref}`w4f3` left side shows both the progress the subsequent AlphaFold models have made, as well as the general impact on the field.
On the y-axis, the main evaluation metric that CASP uses is plotted: the Global Distance Test – Total Score (GDT-TS), as an average over the challenges (i.e., protein sequences with no publicly known 3D structures).
It measures what percentage of α-carbons ({numref}`w4f3`, right) of the amino acids in the predicted structure are within a threshold distance in Ångstroms (to be precise, the average of four thresholds: 1, 2, 4, 8 Å) of the known structure, for the best possible alignment of the two.
{numref}`w4f3` shows how after years of stagnation, in 2018 AlphaFold clearly made a substantial improvement over the results of earlier years.
In 2020, the prediction results of their updated system, AlphaFold 2.0, were so good that the structure prediction problem has been dubbed as solved by some, although there is still some room for further improvement.
It is good to note that a score of 100 is not feasible by any predictive method, since there are areas in the protein structure that are inherently difficult to model, i.e., very flexible parts or transitions between, e.g., helix and a random coil.
Hence, a score between 90-95% is considered equally well as an experimentally derived 3D structure, a score that AlphaFold2 nearly reached.

With the above in mind, let us look at {numref}`w4f3` again.
The maximum average GDT-TS score in 2020 has more than doubled since pre-2018 editions.
This means that for many more protein sequences, we can gain some sort of reliable insight in their 3D structure.
Following the sequence-structure-function paradigm, this also provides us insight into their possible functions.
Since there are still many protein sequences with unknown functions, predictive software like AlphaFold can play a very important role in understanding their functions and roles in biochemistry.
Now that we better understand the impact of AlphaFold, let us find out more about how it works.

(alphafold_under_the_hood)=

## AlphaFold relies on sequence comparisons to find templates and predict co-evolution

To make a prediction with AlphaFold, all you need is a FASTA file with the protein primary sequence of interest.
The core of AlphaFold’s working is a sophisticated machine learning model.
However, it was not built from scratch: it heavily builds on previously developed approaches to create reliable structure models.
The most recent AlphaFold implementation can be summarized in three key steps that are recognizable modules linking to previous concepts and knowledge.

The first module processes the protein sequences into so-called numeric “representations” that can be used as input for the machine learning model.
To create these representations, first a database search is performed ({doc}`week2`).
Following that, two representations are created (i.e., the two paths in {numref}`w4f4`): a multiple sequence alignment (MSA – a concept introduced and used in {doc}`week2` and {doc}`week3`), which captures sequence variation; and a representation of how likely all residues interact with each other (i.e., that are close to each other in the 3D structure), in the form of a contact map.
The database search is also used to find if there are any suitable “templates” in the PDB database.
Up to 4 top templates can be chosen to serve as a starting position for the prediction models.
Please note that this is the first step in homology modelling as well, and that AlphaFold can make “good” predictions on a good quality multiple sequence alignment (MSA) alone; hence, there is no need for templates to be there.

It is important to realize that AlphaFold bases itself largely on co-evolutionary information.
Let us briefly reflect on why this is relevant for structure prediction.
As you have realized by now, the residue position in the protein primary sequence does not reflect its final position in 3D: residues far away in the primary sequence may end up close to each other after folding and have specific interactions.
The concept of co-evolution implies that if two interacting residues are important for the protein’s function, they are likely to co-evolve.
In other words, if one of them changes into a different amino acid, the other will likely have to change as well to maintain the interaction to support the protein’s 3D structure.
Such genomic signals can only be extracted when we compare many protein sequences with each other.
Therefore, a deep MSA of high quality is essential for good predictions.
During the BIF20306 course, you have learned how to create an MSA ({doc}`week2`), and how it is used for phylogenetic reconstruction ({doc}`week3`).
Here, AlphaFold uses MSA to extract evolutionary signals and predict co-evolution of residues.

The second module uses the representations and aims to find restrictions in how the protein sequence folds into its 3D structure.
This part is the actual machine learning model, and we will consider it largely as a black box.
The model uses deep learning to learn which input features are important to predict the protein folding based on data-driven pattern recognition.
The model passes information back and forth between the sequence-residue (MSA) and residue-residue (contact map) representations.
This part requires a lot of computation time and effort and thus needs a good infrastructure that is not available to all laboratories.
The DeepMind team had the powerful resources needed to train the extensive machine learning model.

The third and final module is the structure builder where the actual folding and refinement of the structure model takes place using the phi, psi, and omega angles (see also {doc}`week1`).
Furthermore, local and global Confidence Scores are determined.
Several prediction cycles usually take place where the predicted 3D structure model serves as a new input (i.e., template) for the structure prediction to allow for further fine-tuning.
The structure builder takes input from several independently trained models.
This yields several 3D structure models with tiny or large differences, which are finally ranked according to the models’ confidence scores (see {ref}`model_quality`).

To summarize the AlphaFold process, database searches are done to construct MSAs and find templates, the exact same input is given to several identical machine learning models with slightly different parameter settings, and the structure builder creates 3D structure models for them that are ranked based on confidence scores to report the best performing model.

:::{figure} images/Week4/w4f4.png
:alt: AlphaFold approach
:align: center
:name: w4f4

Figure 4 – Schematic overview of AlphaFold approach. Modified image from: https://www.nature.com/articles/s41586-021-03819-2
:::

## AlphaFold DB: a resource of pre-computed AlphaFold protein structure models

The computation of AlphaFold predictive models costs a lot of computation time and resources (see {ref}`alphafold_impact` and {ref}`alphafold_under_the_hood`).
To avoid running AlphaFold over and over on the same protein sequences and to facilitate the dissemination and inspection of AlphaFold protein structure models, the DeepMind team collaborated with EMBL’s European Bioinformatics Institute (EMBL-EBI) to create the AlphaFold Protein Structure Database (AlphaFold DB), https://alphafold.ebi.ac.uk/.
Currently, the resource contains over 200,000,000 structure models.
The first AlphaFold DB release covered the human proteome, along with several other key organisms such as _Arabidopsis thaliana_ and _Escherichia coli_.
Actually, for these species, most protein sequences in their UniProt reference proteome were folded by AlphaFold.
The second release more than doubled the size of the database by adding most of Swiss-Prot (the subset of the UniProt protein database that is manually curated by experts), for all species.
The third release focused on organisms with a UniProt reference proteome that are relevant to Neglected Tropical Disease or antimicrobial resistance.
The selection was based on priority lists compiled by the World Health Organisation.
The most recent release contains predicted structures for nearly all catalogued proteins known to science, which will expand the AlphaFold DB by over 200x - from nearly 1 million structures to over 200 million structures (see {numref}`w4f5`), covering most of UniProt.
It is expected that in the coming years all hypothetical proteins will be added to AlphaFold DB.
This will then – for example – also include viral proteins that are currently excluded.

AlphaFold DB can be searched based on protein name, gene name, UniProt accession, or organism name.
In one of the practical assignments, you will learn how to work with AlphaFold DB and how you could incorporate it in your biological discovery pipeline.
One important remaining question is: how do we know if we can trust the predictions?
In other words, how do we know if we can be confident in the 3D structure models that AlphaFold predicts and that AlphaFold DB contains?

:::{figure} images/Week4/w4f5_alphafold_num_prot_structures.svg
:alt: AlphaFold - Number of protein structures
:align: center
:width: 80%
:name: w4f5

The most recent release includes predicted protein structures for plants, bacteria, animals, and other organisms, opening up many new opportunities for researchers to use AlphaFold to advance their work on important issues, including sustainability, food insecurity, and neglected diseases.
Note that PDB contains experimentally validated structures (and ~200K nowadays) and AlphaFold produces predicted structure models.

Image source (July 2022): https://www.deepmind.com/blog/alphafold-reveals-the-structure-of-the-protein-universe
:::

(model_quality)=

## Assessing a protein structure model quality

:::{figure} images/Week4/w4f6_7mfb.png
:alt: AlphaFold - 7MBF crystal structure vs prediction
:align: center
:name: w4f6

Heavy chain portion of the crystal structure of an antibody (PDB: 7MBF, in orange) superposed with the AlphaFold 2 prediction (in blue).
The overlay view shows how the folding of the two domains is largely predicted correctly, with some parts of the 3D protein structure that fit the PDB structure better than others.
Source: https://www.blopig.com/blog/2021/07/alphafold-2-is-here-whats-behind-the-structure-prediction-miracle/
:::

Predictive models only have true value when they produce some measure of confidence, because without any idea of certainty about the predictions, it is hard to interpret results and draw conclusions.
To get an idea of how well predictions fit the reality, one needs to compare the model with the true situation.
{numref}`w4f6` shows how this can be done by manual visual inspection of two super-imposed structures, the real one and a predicted one.
However, to quantitatively assess differences between models, some sort of numeric score is needed.
In this reader, we have seen one such comparative measure for 3D protein structure models in the CASP section: the Global Distance Test – Total Score ({numref}`w4f3`).
Another score you may encounter more often is the root mean squared error (RMSE), based on the difference in position of the of α-carbons as input to calculate the score.
In principle, the smaller the RMSE of a model is, the better.
The QMEAN-DISCO score used by SWISS-MODEL is also used.
This score is an ensemble of various metrics that together provide insight into the quality of the model.

To assess the confidence in the model structure without a direct comparison to a known structure, one needs to assess the uncertainty in the position of the amino acid in the 3D coordinate system.
AlphaFold comes with its own local and global error predictions that the machine learning model calculates (see also {ref}`alphafold_under_the_hood`, and {numref}`w4f7`).
Where the local error focuses on individual positions of amino acids, the global error describes how confident the predictions are for various protein parts that can interact through residue-residue interactions.
The local error is also used to color-code the residues of the model in the 3D structure viewer.
In this way, it is easier to observe which parts of the structure model are more reliable than others.
You will study these two different error scores more during a practical assignment.

As you may have started to realize when using databases, they can also contain erratic entries.
To investigate the quality of both known and predicted 3D protein structures, the Ramachandran plot can be used ({doc}`week1`).
You will work with the Ramachandran plot during the practical assignments.
It is important to note here that some disordered proteins only come into orderly arrangement in the presence of their various protein partners; and other proteins never have ordered structures under any conditions, a property that may be essential to their function.
How to best model the behavior of such proteins is still an area of active research.

The above-described confidence measures are also useful in highlighting limitations of a predictive approach.
In the AlphaFold-related practical assignment, you will see some examples of this.
The main lesson is that you must treat a prediction as a prediction: it is a model of reality and may not accurately represent it.
Also, keep in mind that there are parts of the 3D protein structure that we can naturally be more confident about.
For example, secondary structure oftentimes supports the 3D protein structure, and parts of the protein that are naturally more disordered such as random loops are harder to predict correctly.
Such parts can typically represent parts of the protein structure that are more flexible in their biological environment and any prediction of (very) flexible parts should be considered as a snapshot of the protein structure.
If you study {numref}`w4f6` in more detail, you will see this reflected in the superimposed image of the PDB (experimental) 3D structure and the AlphaFold structure model.

## A protein structure model: and now?!

Imagine you have generated a protein structure model, such as the one in {numref}`w4f6`.
What can you do with it? As mentioned above, it can yield insights into its possible function and role in biochemistry.
In other words, you can start to form hypotheses that can be experimentally tested in the lab.
You can also start to make predictions of protein-protein interactions.
Since such interactions are typically driven by 3D structural elements (clefts, pockets, etc.), predicting such 3D structure elements from sequences will contribute to more confidently predicting protein-protein interactions.
Furthermore, you have seen how comparing protein sequences in multiple sequence alignments helps to gain insight into their relationships; by using 3D structure models as an input, a similar comparison could be done at the structural level.
As we are increasingly aware, sequences may deviate more than structural elements; thus, (multiple) structure alignments at the level of folds or subunits may give a different view on protein relationships.

A recent tool that allows to do structure-based alignments based on protein structure input in a reasonable timeframe is Foldseek: https://search.foldseek.com/.
By designing a novel 3D-interactions (3Di) alphabet, the team behind Foldseek overcame the mounting task of doing structure-based comparisons at the very large scale that the availability of >200 million structures, sparked by AlphaFold, requires.
For example, a traditional structure-based alignment tool would take ~1 month to compare on structure to 100 million ones in the database.
During the practical assignments, you will explore how the combination of AlphaFold and Foldseek can be used to explore possible functions for a protein sequence of interest.

It can be expected that the AlphaFold model will continue to develop.
For example, the most recent addition is a multimer model that predicts if and how several polypeptide chains are interacting.
Another topic of interest is modelling protein dynamics.
Many proteins can change shape and thereby function, for example depending on cellular conditions, but this is still very hard to model.
Finally, we are only starting to explore the role of post-translational modifications in generating many (structurally, functionally) different versions of each protein, so-called proteoforms.
Based on its current performance, it will be exciting to see where the field is in 10 years from now.
Akin to the mobile phone - smartphone development, we may be surprised by its capabilities by then.

:::{figure} images/Week4/w4f7.png
:alt: Auxin Response Factor 16 structural prediction
:align: center
:name: w4f7
Left: AlphaFold 3D protein structure model of Auxin Response Factor 16.
The amino acid residues are colored according to the local confidence score (see AlphaFold-PSD and practical assignment for further explanation).
Right: the AlphaFold global error confidence score overview.
This view shows low errors (dark green) for two parts of the protein structure model, and higher errors for the remaining structure – these also correspond to less confidence locally (see AlphaFold-PSD and practical assignment for further explanation).
The structure model can be used to validate the protein’s predicted function and can act as a starting point for further annotations, such as finding its biological interaction partners (i.e., other proteins, DNA, small molecules).
Source: https://alphafold.ebi.ac.uk/entry/A3B9A0
:::

## Closing remarks

::::{admonition} Test your knowledge now!
:class: note

Have you read the above? Test yourself directly by answering the questions first and then revealing the answer by clicking on the question. Correct? Great! If not, you are encouraged to reread the part of the above section that deals with the questioned topic.

:::{dropdown} Which type of information from a contact map that we cannot read from a protein primary sequence directly is relevant for protein 3D structure prediction?...
...The amino acid residues that are in close contact with each other even if they are not adjacent to each other in the primary sequence.
:::

:::{dropdown} How is a MSA relevant for protein 3D structure prediction?...
...An MSA will reveal conserved regions that indicate parts of the protein sequence that are important for its function. These parts are often represented by specific folds, i.e., stretches with presence of secondary structure elements in a specific configuration.
:::

:::{dropdown} What does RMSE stands for and where is it used?...
...Root Mean Square Error. This error is used in assessing the quality of 3D models by comparing distance between atoms in the predicted model and an experimental structure.
:::

::::

:::{seealso}

Please find below several links with further information about AlphaFold.
Please note that these are not part of the exam material, which is covered above in this reader.
A number of these resources were used as an inspiration for the reader material.

Video introduction by the AlphaFold team:

https://youtu.be/gg7WjuFs8F4?si=a8ebksOpRFin7VXa

Brief AlphaFold introduction by Deepmind:

https://www.deepmind.com/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology

History of AlphaFold:

https://www.deepmind.com/research/highlighted-research/alphafold/timeline-of-a-breakthrough

AlphaFold most recent update:

https://www.deepmind.com/blog/alphafold-reveals-the-structure-of-the-protein-universe

AlphaFold Nature publication:

https://www.nature.com/articles/s41586-021-03819-2

A blogpost on AlphaFold 2:

https://www.blopig.com/blog/2021/07/alphafold-2-is-here-whats-behind-the-structure-prediction-miracle/

Good pointers on confidence in protein models:

https://alphafold.ebi.ac.uk/faq#faq-5

Taken inspiration and figures from:

https://elearning.bits.vib.be/courses/alphafold/lessons/introduction-to-alphafold/ (CC-BY 4.0)

Foldseek publication:

https://www.nature.com/articles/s41587-023-01773-0
:::

# References

```{bibliography}
:filter: docname in docnames
```