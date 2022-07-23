SHELL=/usr/bin/env bash

UNAME = $(shell uname -s)
#
#ifeq ($(UNAME),Linux)
#	REAPER_ROOT = ${LINUX_REAPER_ROOT}
#endif
deps-install:
	brew install yarn node

yarn-install: deps-install
	yarn install

deploy:
	python3 move_dist.py
