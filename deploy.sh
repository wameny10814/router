#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://wameny10814.github.io
# git push -f git@github.com:wameny10814/wameny10814.github.io.git main

# if you are deploying to https://wameny10814.github.io/router
git push -f git@github.com:wameny10814/router.git main:gh-pages

cd -