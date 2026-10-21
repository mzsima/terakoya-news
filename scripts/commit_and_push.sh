#!/bin/sh
set -e
cd "/Users/yusukemizushima/Work/子供の学力"
unset GITHUB_TOKEN

git add data/articles.json
if ! git diff --staged --quiet; then
  git commit -m "chore: update daily news articles (5AM batch)"
fi
git push origin main
