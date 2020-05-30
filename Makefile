install:
	sudo npm install

build:
	sudo npm run build
	
start:
	npx babel-node src/brain-games.js

publish:
	sudo npm publish --dry-run
lint:
	npx eslint . --fix