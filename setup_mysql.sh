set -e
set -x
set -o pipefail

DIR=$1

MYSQL_PASSWORD=$(jq -r .mysql_password $DIR/app/config.json)

apt-get install -y mysql-server

systemctl start mysql
# systemctl enable mysql

mysql -e "set @pw=${MYSQL_PASSWORD}; source $DIR/setup_mysql.sql"

iptables -A INPUT -i eth0 -p tcp -m tcp --dport 3306 -j ACCEPT
