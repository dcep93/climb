#!/bin/bash

set -e
set -o pipefail

LOG_FILE=/var/log/climb.log

INDEX=$1

if [ -z "$INDEX" ]; then
	echo "usage: $0 <index_path>" | tee -a $LOG_FILE
	exit 1
fi

echo "$(date) startup" | tee -a $LOG_FILE

folder=$(dirname $INDEX)

env_file="$folder/env.sh"

screen -Dm bash -c "set -x; if [[ -f "$env_file" ]]; then source "$env_file"; fi; nodemon --watch $folder --delay 1 $INDEX; sh"

echo "$(date) success" | tee -a $LOG_FILE
