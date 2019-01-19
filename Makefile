SASSBUILD = sass
GOBUILD = go build
GOGET = go get
GOBUILD_PLUGIN = go build -buildmode=plugin

GET_DEPENDENCIES_SCRIPT = ./server/getDependencies.sh
DEPLOY_SCRIPT = ./server/deploy.sh
MW_INSTALL_SCRIPT = ./server/installMicroweb.sh

PLUGINS_SRC = ./plugins/cv/*.go ./plugins/templatePlugins/animation/*.go ./plugins/templatePlugins/static/*.go ./plugins/templatePlugins/techMap/*.go
PLUGINS_OUT = ./plugins/cv/cv.so ./plugins/templatePlugins/animation/animation.so ./plugins/templatePlugins/static/static.so ./plugins/templatePlugins/techMap/techMap.so
SCSS = $(shell find -path "./webroot/*.scss")
CSS = $(patsubst %.scss, %.css, $(SCSS))

.PHONY: build
build: $(CSS) $(PLUGINS_OUT)

$(CSS): $(SCSS)
	$(SASSBUILD) $(patsubst %.css, %.scss, $@) $@

$(PLUGINS_OUT): $(PLUGINS_SRC)
	(cd ./`dirname $@`; $(GOBUILD_PLUGIN) .)

.PHONY: clean
clean:
	rm -f $(CSS) $(PLUGINS_OUT)

.PHONY: install
install:
	sudo -E $(DEPLOY_SCRIPT)

# install dependencies
.PHONY: getdept
getdept:
	sudo -E $(GET_DEPENDENCIES_SCRIPT)
	sudo -E $(MW_INSTALL_SCRIPT)
