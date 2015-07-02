#!/bin/bash

ABSOLUTE_PATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)/../

pushd $ABSOLUTE_PATH > /dev/null
git config --global user.name "Travis-CI"
git config --global user.email "travisci@ianduffy.ie"
git remote set-url origin https://${GH_TOKEN}@github.com/imduffy15/dcutt-ui.git
git fetch --tags

export VERSION=`grep -Po '(?<="version": ")[^"]*' package.json`

if [ -z "${TRAVIS_TAG}" ]; then git tag $VERSION; fi
if [ -z "${TRAVIS_TAG}" ]; then git push --tags; fi

if [ -z "${TRAVIS_TAG}" ]; then cd www; git init; git remote add origin https://${GH_TOKEN}@github.com/imduffy15/dcutt-ui.git; git add .; git commit -a -m "init"; git push -u origin -f master:gh-pages; cd ../; fi
	popd > /dev/null