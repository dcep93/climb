#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "must run as root"
  exit 1
fi

set -e
set -x
set -o pipefail

apt-get update

cd "$( dirname "${BASH_SOURCE[0]}"

which jq || apt-get install -y jq

# write app config
if [[ ! -f "../app/config.json" ]]; then bash setup_config_json.sh; fi

# install mysql
which mysql || bash setup_mysql.sh

# install nodejs
which node || ( curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs )

# install nodemon
which nodemon || npm install --global nodemon

if [ ! -d app/node_modules ]; then
	( cd app && npm install )
fi

# server service
cat <<END > /etc/systemd/system/climb.service
[Unit]
Description=starts climb server
After=local-fs.target
Wants=local-fs.target

[Service]
ExecStart=/bin/bash $(pwd)/../run.sh
Type=simple

[Install]
WantedBy=multi-user.target

END
systemctl daemon-reload
systemctl enable climb
systemctl start climb

# accept http traffic
iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports 8080
iptables -A PREROUTING -t nat -p tcp --dport 443 -j REDIRECT --to-ports 8080
