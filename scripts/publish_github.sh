#!/bin/sh
set -e
unset GITHUB_TOKEN

# Rename urayomi-news to terakoya-news if not already renamed
if gh repo view mzsima/urayomi-news >/dev/null 2>&1; then
  gh repo rename terakoya-news --repo mzsima/urayomi-news --yes
  git remote set-url origin https://github.com/mzsima/terakoya-news.git
fi

if ! gh repo view mzsima/terakoya-news >/dev/null 2>&1; then
  gh repo create mzsima/terakoya-news --public --source=. --remote=origin --push
else
  git push -u origin main
fi

# Enable GitHub Pages on main branch root (ignore error if already enabled)
gh api -X POST repos/mzsima/terakoya-news/pages \
  -f "source[branch]=main" \
  -f "source[path]=/" >/dev/null 2>&1 || true

echo "Published to: https://mzsima.github.io/terakoya-news/"
