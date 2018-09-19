#!/bin/bash

# ./get_microweb.sh install (to install microweb on to your system)
go get github.com/CanadianCommander/MicroWeb/cmd/microweb

if [ "${1}" = "install" ]; then
  if [ "${GOPATH}" = "" ]; then
    sudo -E ~/go/src/github.com/CanadianCommander/MicroWeb/install/install.sh
  else
    sudo -E ${GOPATH}/src/github.com/CanadianCommander/MicroWeb/install/install.sh
  fi
else
  go build -o microweb.a  github.com/CanadianCommander/MicroWeb/cmd/microweb
fi
