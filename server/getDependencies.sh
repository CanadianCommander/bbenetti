#!/bin/bash

# check for user install dependencies
go version
if (($? == 127)); then
  echo "Go not detected. Please install Go."
  exit 1
fi

sass --version
if (($? == 127)); then
  echo "Sass not detected. Please install sass"
  exit 1
fi

git --version
if (($? == 127)); then
  echo "git not detected. Please install git"
fi

# fetch microweb
go get github.com/CanadianCommander/MicroWeb/cmd/microweb
echo "Building MicroWeb..."
go build -a -v -o microweb.a  github.com/CanadianCommander/MicroWeb/cmd/microweb
