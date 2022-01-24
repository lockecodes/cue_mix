import shutil
import pathlib
from subprocess import run


def get_dist():
  return pathlib.Path("build")


def get_reap():
  return pathlib.Path("/home/slocke/.config/REAPER/reaper_www_root")


def clean_dist():
  dist = get_dist()

  for f in dist.iterdir():
    if f.is_dir():
      shutil.rmtree(f.absolute())
    else:
      pathlib.os.remove(f.absolute())


def copy_dist():
  dist = get_dist()
  reaper = get_reap()
  for f in dist.iterdir():
    print(f.absolute())
    if f.is_dir():
      shutil.copytree(f.absolute(), pathlib.Path(reaper, f.name))
    else:
      shutil.copy(f.absolute(), reaper.absolute())

  pathlib.Path(reaper, "index.html").rename(pathlib.Path(reaper,"cue_mix.html"))
  shutil.copytree("src/data", pathlib.Path(reaper, "data"))
  shutil.copytree("src/images", pathlib.Path(reaper, "images"))


def clean_reap():
  reaper = get_reap()

  for f in reaper.iterdir():
    if f.is_dir():
      shutil.rmtree(f.absolute())
    else:
      pathlib.os.remove(f.absolute())


def build():
  run("/home/slocke/.nvm/versions/node/v16.13.1/bin/node /home/slocke/.nvm/versions/node/v16.13.1/lib/node_modules/npm/bin/npm-cli.js run build --scripts-prepend-node-path=auto", shell=True, check=True)


try:
  clean_dist()
  clean_reap()
except:
  pass

build()
copy_dist()

