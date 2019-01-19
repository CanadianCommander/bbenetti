#!/bin/bash

if [ "${GOPATH}" = "" ]; then
  sudo -E ~/go/src/github.com/CanadianCommander/MicroWeb/install/install.sh
else
  sudo -E ${GOPATH}/src/github.com/CanadianCommander/MicroWeb/install/install.sh
fi
