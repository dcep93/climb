#!/bin/bash

set -e
set -o pipefail

NAME=climb

LOG_FILE=/var/log/$NAME.log

cd "$( dirname "${BASH_SOURCE[0]}" )"

echo "$(date) startup" | tee -a $LOG_FILE

screen -S $NAME -Dm bash -c "cd app && npm run server; sh"

echo "$(date) success" | tee -a $LOG_FILE
