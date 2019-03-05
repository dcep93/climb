#!/bin/bash

set -e
set -o pipefail

NAME=climb

LOG_FILE=/var/log/$NAME.log

cd "$( dirname "${BASH_SOURCE[0]}" )"

echo "$(date) startup" | tee -a $LOG_FILE

cd app && npm run server

echo "$(date) success" | tee -a $LOG_FILE
