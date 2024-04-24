# Week 4 - AlphaFold
%#% Main remarks about week4: writing style is a little more informal than the other chapters but clear. Could use more admonitions. Long header names make the table of contents look clustered. Information is ordered logically, without too many cross-references. This week is quite short but I understand it is not finished yet.
```{epigraph}

-- Justin van der Hooft, Wageningen, 2024

```

## Predicting protein structures: the sequence-structure-function paradigm

A lot of sequences have become available.
However, for most, we do not yet know what type of proteins they represent, and what functionality they have.

Proteins are essential for life on earth.
They have many kinds of functions in organisms such as supporting its structure (e.g., keratin in our skin), performing enzymatic reactions (e.g., Ribulose-1,5-bisphosphate carboxylase-oxygenase, a.k.a. Rubisco, in plants), or receptors for transduction of signals that mediate cell-to-cell communication.
Intriguingly, a relatively small amount of amino acid building blocks forms the basis of a structurally very diverse protein repertoire.
Hence, to understand the function of proteins, knowing their structures is key. Proteins are created as a long chain of amino acids held together by peptide bonds, i.e., a polypeptide chain, that folds into a three-dimensional (3D) structure, based on various types of interactions between amino acid side groups.
Usually, during this folding process, shorter stretches of local secondary (2D) structure form first, held together by hydrogen bonds.
Interestingly, whereas the amino acid sequence of proteins may differ, their folding may still result in comparable 3D structures of the polypeptide chain – with comparable or even similar functionality (see {numref}`myoglobin`).
Several folded polypeptide chains can form the final quaternary complex that is functional within the cell.
Thus, the protein folding process is important, as it determines the 3D structure of polypeptide chains, and misfolding can lead to misfunctioning of the protein, for example by non-specific binding to other proteins, causing a disease in humans.

While current experimental methods can generate many sequences of hypothetical proteins present in organisms, it is still hard and expensive to determine the corresponding 3D protein structures experimentally.
The main traditional experimental analytical techniques used are nuclear magnetic resonance (NMR) spectroscopy and X-ray crystallography.
The former yields useful but noisy measurements with usually multiple structural conformations; the latter is more accurate, but easily costs 120,000 euros and it can take a year or even longer to fully elucidate the protein 3D structure from the data, and some structures cannot be measured at all.
However, fueled by recent technical advances, biological sequence data has become widely available, mostly in the form of genomic sequences.
By translating these DNA sequences into possible amino acid sequences using the codon language, amino acid sequences can be inferred in which theoretical proteins can be predicted.
The sheer number of biological sequences make manual analysis too daunting. Thus, alternative methods to derive 3D protein structures are needed to interpret the large amount of biological sequence data that has become available in the recent decades.
Consequently, predicting protein structures based on protein sequence information has been a topic of high interest and relevance for biochemistry for many decades now.

The sequence-structure-function paradigm states that, _in principle_, all information to predict the folding of a protein, and thus its 3D structure and ultimately its function, is stored in its primary sequence.
In practice, however, predicting structure from its sequence turned out to be a very complex and challenging task.
In the various protein structure levels, the primary structure is the amino acid sequence, and the secondary structure (2D) refers to local shapes such as sheets, helices, and coils.
Subsequent interactions between sheets and helices typically form anchor points upon which the tertiary (3D) structure is based.
This chapter first describes 2D structure assignment and prediction, after which foundational 3D structure prediction approaches are discussed, including the main challenges and the three zones of tertiary structure prediction.
It ends with the most recent approaches to predicting and comparing tertiary structures: AlphaFold and FoldSeek.

:::{figure} images/Week4/myoglobin.png
:alt: Different protein structures
:align: center
:width: 80%
:name: myoglobin

Protein structures of human myoglobin (top left), African elephant myoglobin (top right, 80% sequence identity to human structure analogue), blackfin tuna myoglobin (bottom right, 45% sequence identity to human analogue), and pigeon myoglobin (bottom left, 25% sequence identity to human analogue).
Myoglobin can be found in muscles and its main function is to supply oxygen to muscle cells.
The protein structures in this figure illustrate how structure can be largely the same even for sequences that are quite different.
Credits: {cite}`blopig_2021`.
:::

---

## Secondary protein structure prediction
Proteins consist of several locally defined secondary structure elements of which alpha helices (α-helices) and beta strands/sheets (β-strands/sheets) are the mostly occurring ones.
Please note here that a β-strand refers to one side of the β-sheet, where two strands come together.
In this section, we will cover how to assign these two secondary structure elements using 3D protein structures, and how to predict these secondary structure elements based on sequence data.
Furthermore, we will cover the prediction of two biologically relevant “special cases” of secondary structure elements: transmembrane sections and signaling peptides.

### Secondary structure assignment

If we consider the 3D structure of folded protein chains, we typically observe that the more ordered parts of their structures usually contain more α-helices and β-strand stretches than the more randomly organized parts.
As these elements fold locally, they can initiate folding of more complex tertiary folding patterns. Indeed, the presence/absence of α-helices and β-sheets and their specific conformation helps to categorize proteins.
As a result, databases exist that categorize proteins according to specific fold types, in a structured, hierarchical way.
Therefore, the assignment of amino acid residues to either α-helix, β-strand, or “random coil” (i.e., “other”), based on the 3D structure of a protein chain, can be seen as a first step to understand the protein structural configuration.
Also, when we need training data to predict secondary structure elements based on the primary (1D) sequence, we would need sufficient labeled training data based on actual assignments.
Hence, several assignment tools were developed to replace the manual assignment of secondary structure elements based on 3D information.

The three options for an amino acid residue as mentioned above would translate into a so-called “three-state model”, used by secondary structure assignment tools such as DSSP, PALSSE, and Stride, that use 3D structures as an input to assign three secondary structure labels.
You will get hands-on experience with these tools during the practical assignments. Please note that there are additional – less occurring – secondary structure elements that could be recognized, such as the β-turn, a sharp bend in the protein chain, and several special helices.
As a result, some tools will return eight states or even more. However, these can also be summarized in the three original states listed above. 

Assigning or predicting the secondary structure of a protein is only useful if you have an idea of the accuracy of the assignments/predictions from a given program.
The measured accuracy is used to help estimate its likely performance when presented with a sequence of an unknown structure.
Accuracy can be measured either in respect of individual residue predictions or in relation to the numbers of correctly predicted helices and strands.
One commonly used and relatively straightforward method to assign accuracy to individual residues is the Q{sub}`3` measure.
The values of Q{sub}`3` can range between 0 and 100%, with 100% equalling a perfect prediction.
The value for a completely at random prediction depend on the number of different labels or “states” we predict: if we predict in the “three-state model”, a random prediction would return 33% for Q{sub}`3`.
Please note that the same value can mean completely different things ({numref}`Q3`); hence, the values need to be considered together with the actual sequence aligments.
Whilst it may seem natural to strive for a perfect prediction, the maximum Q{sub}`3` that is generally achievable is ~80%.
This is mainly caused by difficulties in defining the start and end of secondary structure elements: the different tools that assign or predict secondary structure may well deviate at the borders of the predicted elements.
Even as a human, manual annotation of secondary structure elements may pose challenges on which residues are inside or outside secondary structure elements.
During the practical assignment, you will explore this phenonemon more. 

:::{figure} images/Week4/Q3.png
:alt: Q{sub}`3` measure
:align: center
:name: Q3

The Q{sub}`3` measure produces useful accuracy predictions when the resulting secondary structure prediction contains a slight shift compared to the actual structure (prediction 1). It is however not useful when the secondary structure elements have been interpreted incorrectly (E -> H in prediction 2).
:::
%#% Unable to find source for figure Q3, self-created image?
### Secondary structure prediction

Here, we will describe approaches to predict secondary structure elements on the basis of sequence data alone.
As these approaches form the foundation for tertiary structure prediction tools, it makes sense to study them first.
One of the first methods to predict secondary structures used statistics to infer a residue’s secondary structure and was the so-called Chou-Fasman approach that, starting in the 1970s, used an increasing set of reference protein 3D structures and 2D structure assignments to determine the natural tendency (propensity) for each amino acid type to either form, break, or be indifferent to form or break an α-helix or β-strand (see {numref}``).
If we consider a stretch of amino acids, these propensities help to determine if and where an α-helix or β-strand starts or stops.
For example, some amino acids have a strong tendency to form α-helices (e.g., Alanine) or β-strands (e.g., Isoleucine), whereas others tend to break these local structures.
In particular, we can observe that Proline is a strong breaker of both structure elements.
This can be explained by the special side group arrangement of Proline: this is fused twice to the backbone of the protein, rendering the amino acid very inflexible when it comes to the phi (φ) and ψ (psi) angles it can render (see [week1](week1_sec_struc) for more information on phi and psi angles).
Another amino acid that that tends to break alpha helices and beta strands is Glycine.
Whilst now superseded by first more accurate statistical methods and more recently by machine learning-based methods, the Chou-Fasman approach very elegantly demonstrates how the side groups of amino acids do impact their tendency to form specific structures.

:::{figure} images/Week4/chou-fasman.png
:alt: The Chou-Fasman approach
:align: center
:name: chou_fasman

Chou and Fasman Propensities (P). F stands for strong former, f weak former, while B and b stand for strong and weak breaker, respectively. I (indifferent) indicates residues that are neither forming nor breaking helices or strands. We can see that Pro has the lowest propensity for forming a helix and a low one for strands as well. However, many other residues that are either weak or indifferent have been reclassified since the propensities shown here have been reparameterized as more data have become available. Credits: {cite}`chou_fasman_1978`.
:::
%#% Figure chou_fasman is derived from https://docplayer.org/53395035-Vorlesungsskript-softwarewerkzeuge-der-bioinformatik.html page 80. Are we allowed to use this?
In subsequent decades, several statistical-based methods were developed that improved sequence-based predictions of secondary structure elements.
They, for example, started to include information of multiple sequence alignments including residue conservation: such approaches first matched the query sequence to database sequences with known 3D structures and assigned secondary structure elements.
Then, using the best matching sequences, the secondary structure state of amino acid residues of the query sequence stretch are inferred by averaging the states from the homologous sequences found, further adapted using additional information such as the conserveness of the residue.
An example of such an approach is Zpred. In general, the use of multiple sequences and additional information about the amino acid residue’s physicochemical properties and conserveness greatly enhanced the prediction performance.
Next, machine learning took over in the form of neural networks. Such approaches use a so-called sliding window that encompass multiple amino acid residues of which the central one’s state is predicted using a model.
They typically result in probabilities for each state that can be used to assign the most likely state, i.e., alpha-helical, beta-strand, or random coil (in a three-state model). Examples of such approaches are Jnet and RaptorX.

Most recently, deep learning approaches have been introduced to predict secondary structure elements based on sequence information. The state-of-the-art approach is NetSurfP, which is currently running version 3.
You will gain hands-on experience of NetSurfP 3.0 during the practical assignments. Here, we will briefly explain how it works and how to assess its results.
The prediction tool uses a deep neural network approach to accurately predict solvent accessibility and secondary structure using both three- and eight-state definitions, amongst other properties.
To make this approach work, sufficient training data is needed of protein chains with known PDB 3D structures.
To avoid over-fitting the model on predominant sequence stretches, each protein sequence that had more than 25% sequence identity to any other protein sequence already in the test set was removed.
To ensure good quality data, a resolution of 2.5 Angstrom or better was selected for. This resulted in ~10,000 protein sequences used for training.
To obtain “ground truth”, DSSP was used (see Section X.X) to calculate properties such as solvent accessibility and secondary structure states, resulting in a labeled data set for training.
The parameters of the neural network were trained using small batches of protein sequences and their “ground truth” to result in a final model.

:::{figure} images/Week4/netsurfp.png
:alt:
:align: center
:name: netsurfp

NetSurfP 3.0 output for a yeast protein that contains both α-helical as well as β-strand sections. Credits: {cite}`netsurfp_2022`. The 3D structure of this protein was obtained from: {cite}`1CT5_1999`.
:::

As we have seen in Section X.X, there are key similarities and differences between α-helices and β-sheets.
Both secondary structure elements rely on hydrogen bonds between backbone atoms in the polypeptide chain.
However, where residues involved in α-helices only have local interactions in the chain, β-sheet residues can have long-range interactions.
Consequently, β-sheets are more difficult to predict for sequence-based prediction tools.
The availability of sufficient homologous proteins can alleviate this bottleneck and provide reliable predictions of β-sheets as well.
Also, the development of 3D structure prediction tools (see Section X.X) is expected to lead to further improvements in predicting secondary structure elements and other per-residue properties like surface exposure/solvent accessibility based on sequence information alone.

### Transmembrane protein sections
Cells are surrounded by a membrane that consists of a lipid bilayer.
The membrane is literally what separates the inside of the cell with the outside world.
Hence, if messages need to be passed on from outside to inside the cell, or vice versa, these messages will need to pass the apolar environment of the membrane.
To do so, the cellular machinery is using proteins to assist in signal transduction across the membrane.
Where globular proteins are present within the cell, so-called transmembrane proteins span the membrane at least once.
It is estimated that ~30% of the proteins are transmembrane, indicating their functional importance.
Due to restrictions of the protein exterior put on by the specific environment of the membrane in terms of size and polarity, only some local structural configurations are typically found to span the membrane.
These configurations are typically linked to the protein’s function: be it a receptor for signal transduction or a transporter of specific substances across the membrane.
Let us consider size first: the average thickness of a membrane is ~30 angstrom (Å), which corresponds to an α-helix of between 15 and 30 residues.

## AlphaFold ingredients: experimentally derived 3D structures & computational advances

:::{figure} images/Week4/PDB-stats.png
:alt: Protein structures in the Protein Data Bank
:align: center
:name: PDB_stats

Top: Number of unique 3D protein structures (based on their sequence) at 95% sequence identity that have been added annually to the Protein Data Bank from 1976 – present time.
Bottom: Number of 3D protein structures that have been added to the Protein Data Bank from 1976 – present time.
Note: the low number of structures in 2024 is caused by these statistics being taken from PDB early in the year, meaning many more structures are likely to be generated over the rest of 2024.
Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`PDB_stats_2024`.
:::

It is good to realize why AlphaFold could work in the first place.
The AlphaFold approach is based on machine learning, i.e., computer algorithms that fit a predictive model based on training data.
Such a model can then predict the structure, when given a sequence that it has not seen before.
DeepMind made use of very large neural network models, so-called deep learning.
The training data for such models ideally consists of many known examples for very complex problems such as protein structure prediction.
The Protein Data Bank (PDB) collects such experimental training data, i.e., measured protein 3D structures.
By now, ~218,000 PDB entries are available of ~150,000 unique protein sequences at 95% sequence similarity ({numref}`PDB_stats`, top).
The latter number is important, as a sufficiently diverse set of examples will ensure that there are enough examples in the training data to recognize relevant patterns of various protein folds and other structural features.

As input for their most recent machine learning model, the DeepMind team predicted the structure of 100,000 protein sequences and added those to the training data, a technique called data augmentation.
Thus, at the time of model training, the team could use around 300,000 protein sequences - 3D structure combinations to train their AlphaFold model that uses a FASTA file as input and outputs a 3D structure model that is described in the [Assessing a protein structure model quality](model_quality) section.

---

(alphafold_impact)=

## The impact of AlphaFold on biochemistry

The true impact of AlphaFold would be difficult to assess without an independent test.
Since protein folding and 3D structure prediction is one of the grand challenges of biochemistry, the Critical Assessment of protein Structure Prediction ([CASP](https://predictioncenter.org/)) competition was founded in 1994.
CASP is a community-wide competition where research groups are required to predict 3D structures from protein sequences that do not have any public 3D structure available.
More than 100 research groups worldwide join the CASP competition every two years.
Using all sequence and structure data available at the present time, they predict structures for protein sequences with newly derived (yet unreleased) structures, specifically withheld from the public for the purpose of this competition.

:::{figure} images/Week4/casp.png
:alt: AlphaFold progress; Amino acid residue in protein backbone
:align: center
:name: casp

Left: Average GDT tests of the contest winners.
Right: Schematic view of amino acid residue in protein backbone with key atoms labelled, including the alpha carbon used for GDT-TS. Credits: {cite}`GDT_2020` and [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) {cite}`alpha_carbon_2018`.
:::

The left side of {numref}`casp` shows both the progress the subsequent AlphaFold models have made, as well as the general impact on the field.
On the y-axis, the main evaluation metric that CASP uses is plotted: the Global Distance Test – Total Score (GDT-TS), as an average over the challenges (i.e., protein sequences with no publicly known 3D structures).
It measures what percentage of α-carbons ({numref}`casp`, right) of the amino acids in the predicted structure are within a threshold distance in Ångstroms (to be precise, the average of four thresholds: 1, 2, 4, 8 Å) of the known structure, for the best possible alignment of the two.
{numref}`casp` shows how after years of stagnation, in 2018 AlphaFold clearly made a substantial improvement over the results of earlier years.
In 2020, the prediction results of their updated system, AlphaFold 2.0, were so good that the structure prediction problem has been dubbed as solved by some, although there is still some room for further improvement.
It is good to note that a score of 100 is not feasible by any predictive method, since there are areas in the protein structure that are inherently difficult to model, i.e., very flexible parts or transitions between, e.g., helix and a random coil.
Hence, a score between 90-95% is considered equally well as an experimentally derived 3D structure, a score that AlphaFold2 nearly reached.

With the above in mind, let us look at {numref}`casp` again.
The maximum average GDT-TS score in 2020 has more than doubled since pre-2018 editions.
This means that for many more protein sequences, we can gain some sort of reliable insight in their 3D structure.
Following the sequence-structure-function paradigm, this also provides us insight into their possible functions.
Since there are still many protein sequences with unknown functions, predictive software like AlphaFold can play a very important role in understanding their functions and roles in biochemistry.
Now that we better understand the impact of AlphaFold, let us find out more about how it works.

---

(alphafold_under_the_hood)=

## AlphaFold relies on sequence comparisons to find templates and predict co-evolution

To make a prediction with AlphaFold, all you need is a FASTA file with the protein primary sequence of interest.
The core of AlphaFold’s working is a sophisticated machine learning model.
However, it was not built from scratch: it heavily builds on previously developed approaches to create reliable structure models.
The most recent AlphaFold implementation can be summarized in three key steps that are recognizable modules linking to previous concepts and knowledge.

The first module processes the protein sequences into so-called numeric “representations” that can be used as input for the machine learning model.
To create these representations, first a database search is performed ([week 2](week2)).
Following that, two representations are created (i.e., the two paths in {numref}`alphafold_approach`): a multiple sequence alignment (MSA – a concept introduced and used in [week 2](week2) and [week 3](week3)), which captures sequence variation; and a representation of how likely all residues interact with each other (i.e., that are close to each other in the 3D structure), in the form of a contact map.
The database search is also used to find if there are any suitable “templates” in the PDB database.
Up to four top templates can be chosen to serve as a starting position for the prediction models.
Please note that this is the first step in homology modelling as well, and that AlphaFold can make “good” predictions on a good quality multiple sequence alignment (MSA) alone; hence, there is no need for templates to be there.

It is important to realize that AlphaFold bases itself largely on co-evolutionary information.
Let us briefly reflect on why this is relevant for structure prediction.
As you may have realized by now, the residue position in the protein primary sequence does not reflect its final position in 3D: residues far away in the primary sequence may end up close to each other after folding and have specific interactions.
The concept of co-evolution implies that if two interacting residues are important for the protein’s function, they are likely to co-evolve.
In other words, if one of them changes into a different amino acid, the other will likely have to change as well to maintain the interaction to support the protein’s 3D structure.
Such genomic signals can only be extracted when we compare many protein sequences with each other.
Therefore, a deep MSA of high quality is essential for good predictions.
During the BIF20306 course, you have learned how to create an MSA ([week 2](week2)), and how it is used for phylogenetic reconstruction ([week 3](week3)).
Here, AlphaFold uses MSA to extract evolutionary signals and predict co-evolution of residues.
%#% The paragraph above repeats information (MSA from week 2 and phylogeny from week 3), which is also featured in the paragraph above it.
The second module uses the representations and aims to find restrictions in how the protein sequence folds into its 3D structure.
This part is the actual machine learning model, and we will consider it largely as a black box.
The model uses deep learning to learn which input features are important to predict the protein folding based on data-driven pattern recognition.
The model passes information back and forth between the sequence-residue (MSA) and residue-residue (contact map) representations.
This part requires a lot of computation time and effort and thus needs a good infrastructure that is not available to all laboratories.
The DeepMind team had the powerful resources needed to train the extensive machine learning model.

The third and final module is the structure builder where the actual folding and refinement of the structure model takes place using the phi, psi, and omega angles (see also [week 1](week1)).
Furthermore, local and global confidence scores are determined.
Several prediction cycles usually take place where the predicted 3D structure model serves as a new input (i.e., template) for the structure prediction to allow for further fine-tuning.
The structure builder takes input from several independently trained models.
This yields several 3D structure models with tiny or large differences, which are finally ranked according to the models’ confidence scores (see [Assessing a protein structure model quality](model_quality)).

To summarize the AlphaFold process, database searches are done to construct MSAs and find templates, the exact same input is given to several identical machine learning models with slightly different parameter settings, and the structure builder creates 3D structure models for them that are ranked based on confidence scores to report the best performing model.

:::{figure} images/Week4/alphafold-approach.png
:alt: AlphaFold approach
:align: center
:name: alphafold_approach

Schematic overview of AlphaFold approach. Credits: modified from {cite}`alphafold_approach_2021`.
:::

---

## AlphaFold DB: a resource of pre-computed AlphaFold protein structure models

The computation of AlphaFold predictive models costs a lot of computation time and resources (see [The impact of AlphaFold on biochemistry](alphafold_impact) and [AlphaFold relies on sequence comparisons to find templates and predict co-evolution](alphafold_under_the_hood)).
To avoid running AlphaFold over and over on the same protein sequences and to facilitate the dissemination and inspection of AlphaFold protein structure models, the DeepMind team collaborated with EMBL’s European Bioinformatics Institute ([EMBL-EBI](https://www.ebi.ac.uk/)) to create the AlphaFold Protein Structure Database ([AlphaFold DB](https://alphafold.ebi.ac.uk/)).
Currently, the resource contains over 200,000,000 structure models.
The first AlphaFold DB release covered the human proteome, along with several other key organisms such as _Arabidopsis thaliana_ and _Escherichia coli_.
Actually, for these species, most protein sequences in their UniProt reference proteome were folded by AlphaFold.
The second release more than doubled the size of the database by adding most of Swiss-Prot (the subset of the UniProt protein database that is manually curated by experts), for all species.
The third release focused on organisms with a UniProt reference proteome that are relevant to Neglected Tropical Disease or antimicrobial resistance.
The selection was based on priority lists compiled by the World Health Organisation.
The most recent release contains predicted structures for nearly all catalogued proteins known to science, which will expand the AlphaFold DB by over 200x - from nearly 1 million structures to over 200 million structures (see {numref}`alphafolddb`), covering most of UniProt.
It is expected that in the coming years all hypothetical proteins will be added to AlphaFold DB.
This will then – for example – also include viral proteins that are currently excluded.

AlphaFold DB can be searched based on protein name, gene name, UniProt accession, or organism name.
In one of the practical assignments, you will learn how to work with AlphaFold DB and how you could incorporate it in your biological discovery pipeline.
One important remaining question is: how do we know if we can trust the predictions?
In other words, how do we know if we can be confident in the 3D structure models that AlphaFold predicts and that AlphaFold DB contains?

:::{figure} images/Week4/alphafolddb.svg
:alt: AlphaFold - Number of protein structures
:align: center
:width: 80%
:name: alphafolddb

The most recent release includes predicted protein structures for plants, bacteria, animals, and other organisms, opening up many new opportunities for researchers to use AlphaFold to advance their work on important issues, including sustainability, food insecurity, and neglected diseases.
Note that PDB contains experimentally validated structures (~218K nowadays) and AlphaFold produces predicted structure models. Credits: {cite}`alphafolddb_2022`.
:::

---

(model_quality)=

## Assessing a protein structure model quality

:::{figure} images/Week4/7mfb.png
:alt: AlphaFold - 7MBF crystal structure vs prediction
:align: center
:name: 7mbf

Heavy chain portion of the crystal structure of an antibody (PDB: 7MBF, in orange) superposed with the AlphaFold 2 prediction (in blue).
The overlay view shows how the folding of the two domains is largely predicted correctly, with some parts of the 3D protein structure that fit the PDB structure better than others.
Credits: {cite}`blopig_2021`.
:::

Predictive models only have true value when they produce some measure of confidence, because without any idea of certainty about the predictions, it is hard to interpret results and draw conclusions.
To get an idea of how well predictions fit the reality, one needs to compare the model with the true situation.
{numref}`7mbf` shows how this can be done by manual visual inspection of two super-imposed structures, the "real" (experimentally derived) one and a predicted one.
However, to quantitatively assess differences between models, some sort of numeric score is needed.
In this reader, we have seen one such comparative measure for 3D protein structure models in the CASP section: the Global Distance Test – Total Score ({numref}`casp`).
Another score you may encounter more often is the root mean squared error (RMSE), based on the difference in position of the of α-carbons as input to calculate the score.
In principle, the smaller the RMSE of a model is, the better.
The QMEAN-DISCO score used by SWISS-MODEL is also used.
This score is an ensemble of various metrics that together provide insight into the quality of the model.

To assess the confidence in the model structure without a direct comparison to a known structure, one needs to assess the uncertainty in the position of the amino acid in the 3D coordinate system.
AlphaFold comes with its own local and global error predictions that the machine learning model calculates (see also [AlphaFold relies on sequence comparisons to find templates and predict co-evolution](alphafold_under_the_hood)), and {numref}`arf16`).
Where the local error focuses on individual positions of amino acids, the global error describes how confident the predictions are for various protein parts that can interact through residue-residue interactions.
The local error is also used to color-code the residues of the model in the 3D structure viewer.
In this way, it is easier to observe which parts of the structure model are more reliable than others.
You will study these two different error scores more during the practical assignment.

As you may have started to realize when using databases, they can also contain erratic entries.
To investigate the quality of both known and predicted 3D protein structures, the Ramachandran plot can be used ([week 1](week1)).
You will work with the Ramachandran plot during the practical assignments.
It is important to note here that some disordered proteins only come into orderly arrangement in the presence of their various protein partners; and other proteins never have ordered structures under any conditions, a property that may be essential to their function.
How to best model the behavior of such proteins is still an area of active research.

The above-described confidence measures are also useful in highlighting limitations of a predictive approach.
In the AlphaFold-related practical assignment, you will see some examples of this.
The main lesson is that you must treat a prediction as a prediction: it is a model of reality and may not accurately represent it.
Also, keep in mind that there are parts of the 3D protein structure that we can naturally be more confident about.
For example, secondary structure oftentimes supports the 3D protein structure, and parts of the protein that are naturally more disordered such as random loops are harder to predict correctly.
Such parts can typically represent parts of the protein structure that are more flexible in their biological environment and any prediction of (very) flexible parts should be considered as a snapshot of the protein structure.
If you study {numref}`7mbf` in more detail, you will see this reflected in the superimposed image of the PDB (experimental) 3D structure and the AlphaFold structure model.

---

## A protein structure model: and now?!

Imagine you have generated a protein structure model, such as the one in {numref}`7mbf`.
What can you do with it? As mentioned above, it can yield insights into its possible function and role in biochemistry.
In other words, you can start to form hypotheses that can be experimentally tested in the lab.
You can also start to make predictions of protein-protein interactions.
Since such interactions are typically driven by 3D structural elements (clefts, pockets, etc.), predicting such 3D structure elements from sequences will contribute to more confidently predicting protein-protein interactions.
Furthermore, you have seen how comparing protein sequences in multiple sequence alignments helps to gain insight into their relationships; by using 3D structure models as an input, a similar comparison could be done at the structural level.
As we are increasingly aware, sequences may deviate more than structural elements; thus, (multiple) structure alignments at the level of folds or subunits may give a different view on protein relationships.

A recent tool that allows to do structure-based alignments based on protein structure input in a reasonable timeframe is [Foldseek](https://search.foldseek.com/).
By designing a novel 3D-interactions (3Di) alphabet, the team behind Foldseek overcame the mounting task of doing structure-based comparisons at the very large scale that the availability of >200 million structures, sparked by AlphaFold, requires.
For example, a traditional structure-based alignment tool would take ~1 month to compare one structure to 100 million ones in the database.
During the practical assignments, you will explore how the combination of AlphaFold and Foldseek can be used to explore possible functions for a protein sequence of interest.

It can be expected that the AlphaFold model will continue to develop.
For example, the most recent addition is a multimer model that predicts if and how several polypeptide chains are interacting.
Another topic of interest is modelling protein dynamics.
Many proteins can change shape and thereby function, for example depending on cellular conditions, but this is still very hard to model.
Finally, we are only starting to explore the role of post-translational modifications in generating many (structurally, functionally) different versions of each protein, so-called proteoforms.
Based on its current performance, it will be exciting to see where the field is ten years from now.
Akin to the mobile phone - smartphone development, we may be surprised by its capabilities by then.

:::{figure} images/Week4/arf16.png
:alt: Auxin Response Factor 16 structural prediction
:align: center
:name: arf16

Left: AlphaFold 3D protein structure model of Auxin Response Factor 16.
The amino acid residues are colored according to the local confidence score (see [AlphaFold-PSD](https://alphafold.ebi.ac.uk/entry/A3B9A0#help) and practical assignment for further explanation).
Right: the AlphaFold global error confidence score overview.
This view shows low errors (dark green) for two parts of the protein structure model, and higher errors for the remaining structure – these also correspond to less confidence locally (see [AlphaFold-PSD](https://alphafold.ebi.ac.uk/entry/A3B9A0#help) and practical assignment for further explanation).
The structure model can be used to validate the protein’s predicted function and can act as a starting point for further annotations, such as finding its biological interaction partners (i.e., other proteins, DNA, small molecules).
Credits: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) {cite}`arf16_2022`.
:::

---

## Closing remarks

::::{admonition} Test your knowledge now!
:class: note

Have you read the above? Test yourself directly by answering the questions first and then revealing the answer by clicking on the question. Correct? Great! If not, you are encouraged to reread the part of the above section that deals with the questioned topic.

:::{dropdown} Which type of information from a contact map that we cannot read from a protein primary sequence directly is relevant for protein 3D structure prediction?...
...The amino acid residues that are in close contact with each other even if they are not adjacent to each other in the primary sequence.
:::

:::{dropdown} How is an MSA relevant for protein 3D structure prediction?...
...An MSA will reveal conserved regions that indicate parts of the protein sequence that are important for its function. These parts are often represented by specific folds, i.e., stretches with presence of secondary structure elements in a specific configuration.
:::

:::{dropdown} What does RMSE stands for and where is it used?...
...Root Mean Square Error. This error is used in assessing the quality of 3D models by comparing distance between atoms in the predicted model and an experimental structure.
:::

::::

:::{seealso}

Below, you will find several links with further information about AlphaFold.
Please note that these are not part of the exam material, which is covered above in this reader.
A number of these resources were used as an inspiration for the reader material.

Video introduction by the AlphaFold team:
<div class="videoWrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/gg7WjuFs8F4?si=0luD_xzP6LMG9ydm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

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

https://elearning.bits.vib.be/courses/alphafold/lessons/introduction-to-alphafold/ ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))

Foldseek publication:

https://www.nature.com/articles/s41587-023-01773-0
:::

---

## References

```{bibliography}
:filter: docname in docnames
:labelprefix: 4W
```