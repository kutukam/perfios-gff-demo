#!/usr/bin/env bash
# Build and publish to the gh-pages branch.
#
# Uses a throwaway worktree rather than switching branches in this checkout.
# Switching in place once failed halfway (uncommitted source changes blocked
# the checkout) and the rest of the script then ran against `main`, committing
# the build output onto the source branch and overwriting index.html.
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$(pwd)
WT=$(mktemp -d)/gh-pages

npm run build

git fetch -q origin gh-pages 2>/dev/null || true
git worktree add -q --force -B gh-pages "$WT" origin/gh-pages 2>/dev/null \
  || git worktree add -q --force -B gh-pages "$WT"
trap 'git -C "$ROOT" worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT

# Replace the published files only — never a bare rm in a directory that could
# still be the source checkout.
find "$WT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. "$WT"/
touch "$WT/.nojekyll"

git -C "$WT" add -A
git -C "$WT" commit -q -m "Deploy build $(date -u +%Y-%m-%dT%H:%MZ)" || { echo "nothing to deploy"; exit 0; }
git -C "$WT" push -q origin gh-pages
echo "deployed: https://kutukam.github.io/perfios-gff-demo/"
