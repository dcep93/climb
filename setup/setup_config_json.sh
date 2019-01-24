set -e
set -x
set -o pipefail

DIR=$1

echo -n "admin google id (sub): "
read ADMIN_GOOGLE_ID

echo -n "google signin client id: "
read GOOGLE_SIGNIN_CLIENT_ID

echo -n "mysql password: "
read -s MYSQL_PASSWORD

echo "Follow instructions at http://meanandroid.com/latestposts/how-never-expiring-facebook-access-token/"
echo -n "facebook page access token: "
read -S FACEBOOK_PAGE_ACCESS_TOKEN

cat <<END > $DIR/../app/config.json
{
    "admin_google_id": "$ADMIN_GOOGLE_ID",
    "mysql_password": "$MYSQL_PASSWORD",
    "google_signin_client_id": "$GOOGLE_SIGNIN_CLIENT_ID",
    "facebook_page_access_token": "$FACEBOOK_PAGE_ACCESS_TOKEN"
}

END
