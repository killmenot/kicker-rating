install:
	rm -rf node_modules
	npm install
	rm -rf public/assets/components
	bower install

.PHONY: install run