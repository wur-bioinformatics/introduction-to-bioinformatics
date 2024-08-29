INPUTS:=*md _config.yml _toc.yml images/**/* _static/*

.PHONY: all

all: pdf html

pdf: _build/pdf

html: _build/html

_build/pdf: $(INPUTS)
	jupyter-book build --builder pdfhtml --all .

_build/html: $(INPUTS)
	python extract_answers.py
	jupyter-book build --builder html --all .

clean:
	rm -rf _build _answers