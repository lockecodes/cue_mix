SHELL=/usr/bin/env bash

LINUX_REAPER_ROOT ?= ~/.config/REAPER/reaper_www_root
MAC_REAPER_ROOT ?= ~/Application\ Support/REAPER/reaper_www_root
UNAME = $(shell uname -s)

ifeq ($(UNAME),Linux)
	REAPER_ROOT = ${LINUX_REAPER_ROOT}
endif

ifeq ($(UNAME_S),Darwin)
	REAPER_ROOT = ${MAC_REAPER_ROOT}
endif

yarn-install:
	yarn install

deploy:
	REAPER_ROOT=${REAPER_ROOT} python3 move_dist.py
