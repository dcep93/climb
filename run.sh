#!/bin/bash

set -e
set -o pipefail

NAME=climb

LOG_FILE=/var/log/$NAME.log

cd "$( dirname "${BASH_SOURCE[0]}" )"

echo "$(date) startup" | tee -a $LOG_FILE

screen -S $NAME -Dm bash -c "set -x; nodemon --delay 1 app/index.js; sh"

echo "$(date) success" | tee -a $LOG_FILE
