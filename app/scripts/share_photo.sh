UPLOAD_TOKEN=$1
TOKEN=$2

{

set -euo pipefail

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
{"albumId": "$ALBUM_ID", "newMediaItems": [{"simpleMediaItem":{"uploadToken":"$UPLOAD_TOKEN"}}]}
END
)

ADD_RESPONSE=$(curl -s -X POST https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate \
    --header "Authorization: Bearer $TOKEN" \
    --header 'Content-type: application/json' \
    --data "$DATA" \
| tee /dev/tty)
echo

ADD_RESPONSE_MESSAGE=$(echo "$ADD_RESPONSE" | jq -r '..|.message? | select(type != "null")')
if [[ "$ADD_RESPONSE_MESSAGE" != "OK" ]]; then
    echo $ADD_RESPONSE_MESSAGE
    exit 1
fi

DATA=$(cat <<END
{"sharedAlbumOptions": {"isCollaborative": "true","isCommentable": "true"}}
END
)
SHARE_RESPONSE=$(curl -s -X POST "https://photoslibrary.googleapis.com/v1/albums/$ALBUM_ID:share" \
    --header "Authorization: Bearer $TOKEN" \
    --header "Content-type: application/json" \
    --data "$DATA" \
| tee /dev/tty)

SHARE_URL=$(echo "$SHARE_RESPONSE" | jq -r .shareInfo.shareableUrl | tee /dev/tty)

URL=$(curl -s 'https://www.publicalbum.org/api/v2/webapp/parse-google-photos-image/jsonrpc' \
    --header 'accept: application/json' \
    --data '{"method":"getGooglePhotosImage","params":["'$SHARE_URL'"]}' \
| tee /dev/tty | jq -r '.result'.url)
echo

} >&2

echo $URL