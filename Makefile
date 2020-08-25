.PHONY: release, build, dev, serve

release:
	ng build --prod --outputPath=dist

build:
	ng build --outputPath=dist

dev:
	ng serve

serve: dev