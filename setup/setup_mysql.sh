set -e
set -x
set -o pipefail

cd "$( dirname "${BASH_SOURCE[0]}" )"

CONFIG_PATH=$(bash get_config_path.sh)

MYSQL_PASSWORD=$(jq -r .mysql_password $CONFIG_PATH)
ADMIN_GOOGLE_ID=$(jq -r .admin_google_id $CONFIG_PATH)

apt-get install -y mysql-server

systemctl start mysql
# systemctl enable mysql

mysql create_tables.sql

if [[ ! -z "$ADMIN_GOOGLE_ID" ]]; then
    mysql -e "set @admin_google_id='${ADMIN_GOOGLE_ID}'; `cat insert_admin.sql`"
fi

mysql -e "set @pw='${MYSQL_PASSWORD}'; `cat set_password.sql`"

iptables -A INPUT -i eth0 -p tcp -m tcp --dport 3306 -j ACCEPT

# maybe need to edit /etc/mysql/mariadb.conf.d/50-server.cnf and remove bind-address
