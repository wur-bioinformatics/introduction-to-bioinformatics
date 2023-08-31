all: _build

_build: *.md
	jupyter-book build --builder html --all .

clean:
	rm -r _build