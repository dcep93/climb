set -e
set -x
set -o pipefail

cd "$( dirname "${BASH_SOURCE[0]}" )"

CONFIG_PATH=$(bash get_config_path.sh)

if [[ -f "$CONFIG_PATH" ]]; then
    echo "config already created"
    exit 0
fi

echo -n "admin google id (sub): "
read ADMIN_GOOGLE_ID

echo -n "google signin client id: "
read GOOGLE_SIGNIN_CLIENT_ID

echo -n "mysql password: "
read -s MYSQL_PASSWORD

echo "Create a service account to write to GCS and place it in app/creds.json"
read -s

echo "Create a GCS bucket from https://console.cloud.google.com/storage/browser"
echo -n "gcs bucket id: "
read -s GCS_BUCKET_ID

echo "Follow instructions at http://meanandroid.com/latestposts/how-never-expiring-facebook-access-token/"
echo "You need `manage_pages` and `publish_pages` permissions"

echo -n "facebook page access token: "
read -s FACEBOOK_PAGE_ACCESS_TOKEN

cat <<END > $CONFIG_PATH
{
    "admin_google_id": "$ADMIN_GOOGLE_ID",
    "mysql_password": "$MYSQL_PASSWORD",
    "google_signin_client_id": "$GOOGLE_SIGNIN_CLIENT_ID",
    "gcs_bucket_id": "$GCS_BUCKET_ID",
    "facebook_page_access_token": "$FACEBOOK_PAGE_ACCESS_TOKEN"
}

END
