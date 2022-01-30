import os
import shutil
from pathlib import Path
from subprocess import run

REAPER_ROOT = Path(os.getenv("REAPER_ROOT", "~/.config/REAPER/reaper_www_root"))
BUILD_PATH = Path("build")


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
