set -e
set -x
set -o pipefail

DIR=$1

MYSQL_PASSWORD=$(jq -r .mysql_password $DIR/../app/config.json)
ADMIN_GOOGLE_ID=$(jq -r .admin_google_id $DIR/../app/config.json)

apt-get install -y mysql-server

systemctl start mysql
# systemctl enable mysql

mysql $DIR/create_tables.sql

if [[ ! -z "$ADMIN_GOOGLE_ID" ]]; then
    mysql -e "set @admin_google_id='${ADMIN_GOOGLE_ID}'; `cat $DIR/insert_admin.sql`"
fi

mysql -e "set @pw='${MYSQL_PASSWORD}'; `cat $DIR/set_password.sql`"

iptables -A INPUT -i eth0 -p tcp -m tcp --dport 3306 -j ACCEPT
