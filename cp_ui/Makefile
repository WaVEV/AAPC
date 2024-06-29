SHELL := /bin/bash
PROJECT_NAME := cp_api


docker-build:
	docker build -f Dockerfile -t cp_ui .


run: docker-build
	docker run -u 1000 -v ${PWD}:/app -p 3000:3000 -it cp_ui npm start


install: docker-build
	docker run -v ${PWD}:/app -p 3000:3000 -u $UID cp_ui npm install


build:
	docker run -u 1000 -v ${PWD}:/app -it cp_ui npm run build

	sed -i 's@manifest.json@static/manifest.json@g' ./build/index.html
	sed -i 's@favicon.ico@static/favicon.ico@g' ./build/index.html
	sed -i 's@logo192.png@static/logo192.png@g' ./build/index.html
	cp ./build/index.html ../$(PROJECT_NAME)/frontend/templates/frontend/index.html
	cp ./build/manifest.json ../$(PROJECT_NAME)/frontend/static
	rm -rf ../$(PROJECT_NAME)/frontend/static/js
	rm -rf ../$(PROJECT_NAME)/frontend/static/css
	rm -rf ../$(PROJECT_NAME)/frontend/static/media
	cp -r public/static/* ../$(PROJECT_NAME)/frontend/static/
	cp -r build/static/js ../$(PROJECT_NAME)/frontend/static/js
	cp -r build/static/css ../$(PROJECT_NAME)/frontend/static/css
	cp -r build/static/media ../$(PROJECT_NAME)/frontend/static/media


dev-build:
	npm run build-dev
	sed -i 's@manifest.json@static/manifest.json@g' ./build/index.html
	sed -i 's@favicon.ico@static/favicon.ico@g' ./build/index.html
	cp ./build/index.html ../$(PROJECT_NAME)/frontend/templates/frontend/index.html
	rm -rf ../$(PROJECT_NAME)/frontend/static/js
	rm -rf ../$(PROJECT_NAME)/frontend/static/css
	rm -rf ../$(PROJECT_NAME)/frontend/static/media
	cp -r build/static/js ../$(PROJECT_NAME)/frontend/static/js
	cp -r build/static/css ../$(PROJECT_NAME)/frontend/static/css
	cp -r build/static/media ../$(PROJECT_NAME)/frontend/static/media
	cp ./build/manifest.json ../$(PROJECT_NAME)/frontend/static


dev:
	npm run dev
	mv dev_build/main.js ../$(PROJECT_NAME)/frontend/static/js
	sed -i -E 's@(<script src="[^>]*2\.[^>]*\.chunk\.js"></script>)@@g' ../$(PROJECT_NAME)/frontend/templates/frontend/index.html
	sed -i -E 's@(<script src="[^>]*main\.[^>]*\.chunk\.js"></script>)@<script src="/static/js/main.js"></script>@g' ../agropow/frontend/templates/frontend/index.html

.PHONY: build dev-build dev
