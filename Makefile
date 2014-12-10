install:
	rm -rf node_modules
	npm install
	rm -rf public/assets/components
	bower install
	chmod +x scripts/init-database.sh

run:
	npm start

database:
	./scripts/init-database.sh

.PHONY: install run database
