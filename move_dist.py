import os
import shutil
from pathlib import Path
from subprocess import run
import sys

BUILD_PATH = Path("build")


def is_apple():
    """Return whether OS is MacOS or OSX."""
    return sys.platform == "darwin"


def is_windows():
    """Return whether OS is Windows."""
    return os.name == "nt"


def get_reaper_root():
    if os.getenv("REAPER_ROOT"):
        return Path(os.getenv("REAPER_ROOT"), "reaper_www_root")
    if is_apple():
        return Path('~/Library/Application Support/REAPER', "reaper_www_root").expanduser()
    elif is_windows():
        return Path(os.path.expandvars(r'$APPDATA\REAPER'), "reaper_www_root")
    else:
        return Path('~/.config/REAPER', "reaper_www_root").expanduser()


REAPER_ROOT = get_reaper_root()


def clean_dist():
    for f in BUILD_PATH.iterdir():
        if f.is_dir():
            shutil.rmtree(f.absolute())
        else:
            os.remove(f.absolute())


def copy_dist():
    for f in BUILD_PATH.iterdir():
        print(f.absolute())
        if f.is_dir():
            shutil.copytree(f.absolute(), Path(REAPER_ROOT, f.name))
        else:
            shutil.copy(f.absolute(), REAPER_ROOT.absolute())

    Path(REAPER_ROOT, "index.html").rename(Path(REAPER_ROOT, "cue_mix.html"))


def clean_reap():
    for f in REAPER_ROOT.iterdir():
        if f.is_dir():
            shutil.rmtree(f.absolute())
        else:
            os.remove(f.absolute())


def build():
    run("yarn build", shell=True, check=True)


if __name__ == "__main__":
    try:
        clean_dist()
        clean_reap()
    except:
        pass

    build()
    copy_dist()
