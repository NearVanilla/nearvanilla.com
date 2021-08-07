#!/usr/bin/env bash

set -euo pipefail

# Base config
ref="${1:-refs/heads/master}"

#repo="pdinklag/MinecraftStats"
repo="Prof-Bloodstone/MinecraftStats"

url="https://github.com/${repo}/archive/${ref}.zip"

webdir="src/awards/"
award_scripts="scripts/awards/"

web_files=(
  font/
  img/
  js/
  localization/
  index.html
  style.css
  style.min.css
)

python_files=(
  mcstats/
  javaproperties.py
  makeconfig.py
  mojang.py
  update.py
)

ignored_files=(
  .gitignore
  LICENSE.txt
  README.md
)

# Helper function
array_contains() {
  local -r item="${1?Item required}"
  shift
  local -r arr=( "${@}" )
  for other in "${arr[@]}"; do
    if [ "${item}" == "${other}" ]; then
      return 0
    fi
  done
  return 1
}

# Lets start
tempdir="$(mktemp --directory)"
trap 'rm -r ${tempdir}' EXIT

zip_file="${tempdir}/stats.zip"
unpacked_dir="${tempdir}/unpacked/"

curl --fail --location "${url}" --output "${zip_file}"
unzip "${zip_file}" -d "${unpacked_dir}"

# Delete old files
# TODO: Maybe don't delete the data dir?
for directory in "${webdir}" "${award_scripts}"; do
  if [ -d "${directory}" ]; then
    echo "Removing old ${directory}..."
    rm -r "${directory}"
  fi
  mkdir "${directory}"
done

# Move files to proper dirs
for file in "${unpacked_dir}"/*/*; do # Double /*/*, cause first matches top level archive dir like MinecraftStats-master/
  filebase="$(basename "${file}")"
  if [ -d "${file}" ]; then
    # Add trailing slashes to directories
    file="${file}/"
    filebase="${filebase}/"
  fi
  if array_contains "${filebase}" "${web_files[@]}"; then
    cp -r "${file}" "${webdir}"
  elif array_contains "${filebase}" "${python_files[@]}"; then
    cp -r "${file}" "${award_scripts}"
  elif array_contains "${filebase}" "${ignored_files[@]}"; then
    : # Ignored
  else
    echo "I have no idea what to do with ${filebase}. Aborting."
    exit 1
  fi
done

