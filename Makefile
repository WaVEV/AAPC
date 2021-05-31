SHELL := /bin/bash
BUILD_NAME := build_prod_`date +'%y_%m_%d'`
PROJECT_NAME := cp_api

build-prod: clean build-frontend
	mkdir -p $(BUILD_NAME)/$(PROJECT_NAME)

	cp -r $(PROJECT_NAME)/$(PROJECT_NAME) $(BUILD_NAME)/$(PROJECT_NAME)
	cp -r $(PROJECT_NAME)/backend $(BUILD_NAME)/$(PROJECT_NAME)
	cp -r $(PROJECT_NAME)/frontend $(BUILD_NAME)/$(PROJECT_NAME)
	cp -r $(PROJECT_NAME)/manage.py $(BUILD_NAME)/$(PROJECT_NAME)
	cp -r $(PROJECT_NAME)/requirements.txt $(BUILD_NAME)/

	# remove .maps
	find $(BUILD_NAME)/$(PROJECT_NAME)/frontend -name "*.js.map" -exec rm {} \;
	find $(BUILD_NAME)/$(PROJECT_NAME)/frontend -name "*.css.map" -exec rm {} \;

	# copy the enviroments
	cp .env.prod $(BUILD_NAME)/$(PROJECT_NAME)/$(PROJECT_NAME)/.env

	tar czf $(BUILD_NAME).tar.gz $(BUILD_NAME)
	rm -rf $(BUILD_NAME)


build-frontend:
	cd cp_ui && make build

dev-build:
	cd cp_ui && make dev-build

clean:
	py3clean .

.PHONY: build-prod buld-frontend
