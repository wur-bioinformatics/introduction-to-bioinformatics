const COLOURS = {
  "positively charged": "#CBE4F9",
  "negatively charged": "#CDF5F6",
  "polar uncharged": "#EFF9DA",
  hydrophobic: "#F9EBDF",
  "hydrophobic and aromatic": "#F9D8D6",
  special: "#D6CDEA",
};

const plugin = {
  name: "aminoacid-table",
  transforms: [
    {
      name: "highlight-amino-aids",
      doc: "A transform that highlights table rows containing certain amino acids",
      stage: "document",
      plugin: (_, utils) => (node) => {
        utils
          // Find the rows of all tables with label "amino-acids"
          .selectAll("container[class^=aminoacidtable] table tableRow", node)
          .forEach((tableRow) => {
            const tableCells = utils.selectAll("tableCell", tableRow);
            const tableCellValues = tableCells.map((tableCell) =>
              // Check if the text representation of the cell starts with our pattern
              utils
                .selectAll("text", tableCell)
                .map((child) => child.value)
                .join("")
                .toLowerCase()
            );

            // Loop over possible colours
            for (const [pattern, colour] of Object.entries(COLOURS)) {
              if (
                tableCellValues.some((value) =>
                  // Check if the text representation of the cell starts with our pattern
                  value.startsWith(pattern)
                )
              ) {
                tableRow["style"] = {
                  "background-color": colour,
                };
              }
            }
          });
      },
    },
  ],
};

export default plugin;
