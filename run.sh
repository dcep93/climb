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

screen -Dm bash -c "set -x; nodemon --watch $(dirname $INDEX) --delay 1 $INDEX; sh"

echo "$(date) success" | tee -a $LOG_FILE
