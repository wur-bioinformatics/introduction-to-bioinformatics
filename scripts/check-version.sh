#!/usr/bin/env bash
#
# Check that package.json and the git tags agree about the book version.
#
#   scripts/check-version.sh v1.2.3   release build: the tag must match package.json
#   scripts/check-version.sh          any other build: package.json must match the
#                                     latest release tag
#
# `npm version <patch|minor|major>` writes package.json and creates the matching
# tag in one step, so the two can only disagree if a tag or a version was made by
# hand. Both directions of that mistake are caught here.
#
# Prints VERSION= and TAG= lines suitable for appending to $GITHUB_OUTPUT.
# The no-argument form needs all v* tags locally (checkout with fetch-tags: true).

set -euo pipefail

RELEASE_FLOW="npm version <patch|minor|major> && git push --follow-tags"

VERSION=$(jq -er .version package.json)

if ! printf '%s' "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "package.json version '$VERSION' is not a plain X.Y.Z version." >&2
  exit 1
fi

TAG=${1:-}

if [ -n "$TAG" ]; then
  if [ "$TAG" != "v$VERSION" ]; then
    echo "Tag '$TAG' does not match package.json, which is at version '$VERSION'." >&2
    echo "This tag was not created by npm. Delete it and cut the release with:" >&2
    echo "  $RELEASE_FLOW" >&2
    exit 1
  fi
else
  LATEST=$(git tag --list 'v[0-9]*.[0-9]*.[0-9]*' | sed 's/^v//' | sort -V | tail -n1)
  if [ -n "$LATEST" ] && [ "$VERSION" != "$LATEST" ]; then
    echo "package.json version '$VERSION' does not match the latest release 'v$LATEST'." >&2
    echo "Do not edit 'version' by hand; releases are cut on main with:" >&2
    echo "  $RELEASE_FLOW" >&2
    exit 1
  fi
fi

printf 'VERSION=%s\nTAG=%s\n' "$VERSION" "v$VERSION"
