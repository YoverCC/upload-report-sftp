run:
	make setup
	node index.js

setup:
	mkdir -p ./example/tmp
	rm -rf ./example/tmp/*
	mkdir -p ./example/failedtmp


