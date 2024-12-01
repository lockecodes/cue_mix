SHELL:=/usr/bin/env bash
CONTAINER_NAME := reaper
VERSION := $(shell git describe --tags --always || echo latest)
PODMAN ?= false
ifeq "$(PODMAN)" "true"
DOCKER := podman
else
DOCKER := docker
endif
UNAME := $(shell uname -s)
USER_ID := $(shell id -u)
#
#ifeq ($(UNAME),Linux)
#	REAPER_ROOT = ${LINUX_REAPER_ROOT}
#endif

.PHONY: deps-install
deps-install:
	brew install yarn node

.PHONY: build-local
build-local:
	yarn install \
	&& yarn build

.PHONY: deploy-local
deploy-local: build-local
	python3 move_dist.py

.PHONY: env
env:
	cp ./.env.template .env
	echo "USER_ID=$(USER_ID)" >> .env

.PHONY: build
build:
	$(DOCKER) build \
	  --build-arg USER_ID=$(USER_ID) \
	  --tag $(CONTAINER_NAME) \
	  .

.PHONY: xhost-shim
xhost-shim:
	xhost +

.PHONY: run
run: xhost-shim
	DISPLAY=$(DISPLAY) \
	  XDG_RUNTIME_DIR=$(XDG_RUNTIME_DIR) \
      WAYLAND_DISPLAY=$(WAYLAND_DISPLAY) \
      USER_ID=$(USER_ID) \
	  $(DOCKER) compose up