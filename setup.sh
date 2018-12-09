#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "must run as root"
  exit 1
fi

set -e
set -x
set -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# install mysql
bash $DIR/setup_mysql.sh

# install nodejs
which node || ( curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs )

# install nodemon
which nodemon || npm install --global nodemon

if [ ! -d $DIR/app/node_modules ]; then
	( cd $DIR/app && npm install )
fi

STARTUP_SCRIPT=$DIR/run.sh
INDEX=$DIR/app/index.js

# server service
cat <<END > /etc/systemd/system/climb.service
[Unit]
Description=starts climb server
After=local-fs.target
Wants=local-fs.target

[Service]
ExecStart=/bin/bash $STARTUP_SCRIPT $INDEX
Type=simple

[Install]
WantedBy=multi-user.target

END
systemctl daemon-reload
systemctl enable climb

# accept http traffic
iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports 8080
iptables -A PREROUTING -t nat -p tcp --dport 443 -j REDIRECT --to-ports 8080
