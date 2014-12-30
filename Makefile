install:
	rm -rf node_modules
	npm install
	chmod +x scripts/init-database.sh
	chmod +x scripts/reset-database.sh

run:
	npm start

init-database:
	./scripts/init-database.sh

reset-database:
	./scripts/reset-database.sh

migrate:
	./node_modules/.bin/sequelize db:migrate

.PHONY: install run init-database reset-database migrate
