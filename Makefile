GULP_BIN=node_modules/.bin/gulp

default: install dev

install:
	@npm install

build:
	@$(GULP_BIN) build

dev:
	@bundle install
	@$(GULP_BIN)

server:
	@$(GULP_BIN) serve

PHONY: default install build dev clean
