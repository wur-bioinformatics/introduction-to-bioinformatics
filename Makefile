INPUTS:=*.md myst.yml images/**/* plugins/* style/* templates/**/* references.bib BIF_logo.png

.PHONY: all html pdf start clean

all: html

html: _build/html

_build/html: $(INPUTS) node_modules
	npx myst build --html

# Requires the typst CLI: `brew install typst` (or see https://github.com/typst/typst).
# Always rebuilt: jtex only copies the template into exports/ when it is missing,
# so a stale exports/ would silently pin an old template.
pdf: node_modules
	npm run build:pdf

node_modules: package-lock.json
	npm ci

start: node_modules
	npx myst start

clean:
	rm -rf _build exports
