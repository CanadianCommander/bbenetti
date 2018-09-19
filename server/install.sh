#!/bin/bash

# install webroot + server.cfg.json to /etc/microweb. Overwriting any files there.
pushd $(dirname $0) > /dev/null
cp ./server.cfg.json /etc/microweb/microweb.cfg.json
cp -r ../webroot /etc/microweb/
popd > /dev/null
