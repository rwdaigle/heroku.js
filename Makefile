SRC = lib/heroku.js

TESTS = test/*.js
REPORTER = dot

all: heroku.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

heroku.js: $(SRC)
	cat $^ > $@

clean:
	rm -f heroku.js

.PHONY: test clean