INPUTS:=*md _config.yml _toc.yml images/**/* _static/*

.PHONY: all

all: pdf html

pdf: _build/pdf

html: _build/html

_build/pdf: $(INPUTS)
	jupyter-book build --builder pdfhtml --all .
	mv _build/html _build/pdf_html

_build/html: $(INPUTS)
	jupyter-book build --builder html --all .
	sed -i.bak 's/@media/\/*@media/g' _build/html/_static/custom.css

clean:
	rm -rf _build _answers