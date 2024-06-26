.PHONY: all

all: html pdf

pdf: _build/latex

html: _build/html

_build/latex: *md
	jupyter-book build --builder pdflatex --all .

_build/html: *.md
	python extract_answers.py
	jupyter-book build --builder html --all .

clean:
	rm -r _build _answers