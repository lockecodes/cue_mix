# Cue Mix
Generate a configurable react front-end for Reaper's web front-ends


# Local setup (not docker)
* Install deps: `make deps-install yarn-install`
* `make deploy`

# Running with docker
* Create the `.env` file: `make env`
* `make build run`
You should have reaper open and it will already be running the server. Navigate to `http://localhost:8080`
NOTE: This works on linux and I have not tested on mac just yet.

## TODO: Instructions to add cue_mix web interface to reaper

## Setup track to monitor
* create track named: `bass`
* create track named: `bass Monitor`
* Change output (send) for bass Monitor track to the desired output
* Add send from `bass` to `bass Monitor`
* Arm the `bass` track
* Go to the cue_mix page and select `bass Monitor` and enjoy

## Troubleshooting
 * `Authorization required, but no authorization protocol specified`:
   * `xhost +`
   * https://unix.stackexchange.com/a/417233

## ISSUES
Upon coming back to this project to get the docker stuff working and some docs, it appears that now this does not
work due to Content Security Policies around `eval-unsafe`.
I'm still investigating this for now unfortunately.

## Integration with reaper_scripting
This was created alongside this repository https://gitlab.com/locke-codes/reaper_scripting/-/tree/main?ref_type=heads
which allows changing presets for your virtual instrument through the same interface.
I have not yet worked on getting that integration working here yet.
