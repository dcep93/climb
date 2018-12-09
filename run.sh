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

screen -dm bash -c "set -x; nodemon --delay 1 $INDEX; exec sh"

echo "$(date) success" | tee -a $LOG_FILE
