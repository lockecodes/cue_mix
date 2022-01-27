# linux and mac?
REAPER_ROOT ?= ~/.config/REAPER/reaper_www_root

deploy:
	REAPER_ROOT=${REAPER_ROOT} python move_dist.py
