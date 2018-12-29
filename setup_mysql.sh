set -e
set -x
set -o pipefail

DIR=$1

MYSQL_PASSWORD=$(jq -r .mysql_password $DIR/app/config.json)

apt-get install -y mysql-server

systemctl start mysql
# systemctl enable mysql

cmd="UPDATE mysql.user SET Password = PASSWORD('$MYSQL_PASSWORD') WHERE User = 'root'; FLUSH PRIVILEGES"

mysql -e "$cmd"

ufw allow mysql
