INPUTS:=*.md myst.yml images/**/* plugins/* style/* references.bib BIF_logo.png

.PHONY: all html pdf start clean

all: html

html: _build/html

pdf: exports

_build/html: $(INPUTS) node_modules
	npx myst build --html

# Requires typst and/or a LaTeX toolchain installed locally
exports: $(INPUTS) node_modules
	npx myst build --pdf

node_modules: package-lock.json
	npm ci

start: node_modules
	npx myst start

clean:
	rm -rf _build exports
