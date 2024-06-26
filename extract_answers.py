#!/usr/bin/env python
"""
Extract markdown blocks containing questions and answers from chapter/week files.
Input markdown files are selected with the regex 'week[0-5].md', output files follow
the regex 'week[0-5]_answers.md' and are saved to the provided output folder
(default is _answers).
"""

__author__ = "Rens Holmer"

from itertools import groupby
from glob import glob
from pathlib import Path
from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter


def main(output_folder_name: str):
    output_folder = Path(output_folder_name)
    if not output_folder.exists():
        output_folder.mkdir()
    # select all original markdown files
    source_files = [Path(f) for f in glob("week[0-5].md")]
    # for every markdown file extract answers
    for infile in source_files:
        # output filename based on input filename
        outfile = output_folder / infile.with_stem(infile.stem + "_answers")
        # Read input file, keep all whitespace as is (i.e. not trimming or stripping)
        with open(infile, "r") as fh:
            lines = fh.readlines()

        # First line in the markdown file contains the chapter/week header
        header = [lines[0]]

        # Question/answer section begins and ends with special separator
        # Group by the separator and select the 3rd entry: this is the block between two separators
        # Important: separator must occur exactly twice
        sections = groupby(lines, lambda line: "%PRACTICAL_SEPARATOR%" in line)
        # Extract text lines for the relevant groups, simultaneously replace answer prefixes
        answer_section = [
            [s.replace("%ANSWER%", "") for s in section[1]] for section in sections
        ][2]

        # Produce output string
        extracted_answers = "".join(header + answer_section)

        # Save to output file
        with open(outfile, "w") as fh:
            fh.write(extracted_answers)


if __name__ == "__main__":
    parser = ArgumentParser(
        prog="extract_answers",
        description=__doc__,
        formatter_class=ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "-o",
        "--output_folder",
        default="_answers",
        type=str,
        help="Output folder where processed markdown files are stored. Will be created if not already existing.",
    )
    args = parser.parse_args()
    output_folder_name: str = args.output_folder
    main(output_folder_name)
