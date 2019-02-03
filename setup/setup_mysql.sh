set -e
set -x
set -o pipefail

cd "$( dirname "${BASH_SOURCE[0]}"

MYSQL_PASSWORD=$(jq -r .mysql_password ../app/config.json)
ADMIN_GOOGLE_ID=$(jq -r .admin_google_id ../app/config.json)

apt-get install -y mysql-server

systemctl start mysql
# systemctl enable mysql

mysql create_tables.sql

if [[ ! -z "$ADMIN_GOOGLE_ID" ]]; then
    mysql -e "set @admin_google_id='${ADMIN_GOOGLE_ID}'; `cat insert_admin.sql`"
fi

mysql -e "set @pw='${MYSQL_PASSWORD}'; `cat set_password.sql`"

iptables -A INPUT -i eth0 -p tcp -m tcp --dport 3306 -j ACCEPT
