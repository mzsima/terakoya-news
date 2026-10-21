#!/bin/sh
set -e
unset GITHUB_TOKEN

if ! gh repo view mzsima/urayomi-news >/dev/null 2>&1; then
  gh repo create mzsima/urayomi-news --public --source=. --remote=origin --push
else
  git push -u origin main
fi

# Enable GitHub Pages on main branch root (ignore error if already enabled)
gh api -X POST repos/mzsima/urayomi-news/pages \
  -f "source[branch]=main" \
  -f "source[path]=/" >/dev/null 2>&1 || true

echo "Published to: https://mzsima.github.io/urayomi-news/"
