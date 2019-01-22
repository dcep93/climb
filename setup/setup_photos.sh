set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SCRIPTS_DIR="$DIR/../app/scripts"

cat <<END
visit https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com to enable the google photos api
visit https://console.cloud.google.com/iam-admin/serviceaccounts and download service account key and place in app/scripts/creds.json
END
echo -n "Press (ENTER) when complete "
read

TOKEN=$(python $SCRIPTS_DIR/get_oauth_token.py)

DATA=$(cat <<END
{"album": {"title": "$(hostname)"}}
END
)
CREATE_RESPONSE=$(curl -s -X POST https://photoslibrary.googleapis.com/v1/albums \
    --header "Authorization: Bearer $TOKEN" \
    --header "Content-type: application/json" \
    --data "$DATA" \
| tee /dev/tty)

ALBUM_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id')

DATA=$(cat <<END
{"sharedAlbumOptions": {"isCollaborative": "true","isCommentable": "true"}}
END
)
SHARE_RESPONSE=$(curl -s -X POST "https://photoslibrary.googleapis.com/v1/albums/$ALBUM_ID:share" \
    --header "Authorization: Bearer $TOKEN" \
    --header "Content-type: application/json" \
    --data "$DATA" \
| tee /dev/tty)

echo -n "share url: "
SHARE_URL=$(echo "$SHARE_RESPONSE" | jq -r .shareInfo.shareableUrl | tee /dev/tty)

NEW_CREDS=$(jq ". + {album_id: \"$ALBUM_ID\", album_share_url: \"$SHARE_URL\"}" $SCRIPTS_DIR/creds.json)
echo "$NEW_CREDS" > $SCRIPTS_DIR/creds.json
