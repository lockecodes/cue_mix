SHELL=/usr/bin/env bash

UNAME = $(shell uname -s)
#
#ifeq ($(UNAME),Linux)
#	REAPER_ROOT = ${LINUX_REAPER_ROOT}
#endif

yarn-install:
	yarn install

deploy:
	python3 move_dist.py
