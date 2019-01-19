#!/bin/bash

# install webroot + server.cfg.json to /etc/microweb. Overwriting any files there.
pushd $(dirname $0) > /dev/null
cp ./serverInstallConfig.cfg.json /etc/microweb/microweb.cfg.json
cp -r ../webroot/* /var/www/
cp -r ../plugins /var/www/
popd > /dev/null
