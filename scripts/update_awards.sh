#!/usr/bin/env bash

set -euo pipefail

webdir="public/awards/"
award_scripts="scripts/awards/"
config="awards-config.json"

script="${award_scripts}/update.py"

toplevel="$(git rev-parse --show-toplevel)"

[ "$(pwd -P)" == "${toplevel}" ] || {
 echo "Script needs to run from top git dir"
 exit 1
}

cd "${webdir}"
python3 "${toplevel}/${script}" "${toplevel}/${config}"
