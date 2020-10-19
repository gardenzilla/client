.PHONY: release, build, dev, serve, push

release:
	ng build --prod --outputPath=dist

build:
	ng build --outputPath=dist

dev:
	ng serve --port 4700

push:
	docker push gardenzilla/client:latest

serve: dev