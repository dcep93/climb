FILE=$1

{

set -euo pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "getting token..."
TOKEN=$(python $DIR/get_oauth_token.py | tee /dev/tty)

echo "uploading..."
echo $FILE
UPLOAD_RESPONSE=$(curl -s -X POST https://photoslibrary.googleapis.com/v1/uploads \
    --header "Authorization: Bearer $TOKEN" \
    --header 'Content-type: application/octet-stream' \
    --header "X-Goog-Upload-File-Name: $(basename "$FILE")" \
    --header 'X-Goog-Upload-Protocol: raw' \
    --data-binary @"$FILE" \
| tee /dev/tty)
echo
(echo "$UPLOAD_RESPONSE" | jq -r .message 2>/dev/null && exit 1) || :

ALBUM_ID=$(jq -r .album_id $DIR/creds.json)
DATA=$(cat <<END
{"albumId": "$ALBUM_ID", "newMediaItems": [{"simpleMediaItem":{"uploadToken":"$UPLOAD_RESPONSE"}}]}
END
)

echo "creating..."
CREATE_RESPONSE=$(curl -s -X POST https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate \
    --header "Authorization: Bearer $TOKEN" \
    --header 'Content-type: application/json' \
    --data "$DATA" \
| tee /dev/tty)
echo

CREATE_RESPONSE_MESSAGE=$(echo "$CREATE_RESPONSE" | jq -r '..|.message? | select(type != "null")')
if [[ "$CREATE_RESPONSE_MESSAGE" != "OK" ]]; then
    echo $CREATE_RESPONSE_MESSAGE
    exit 1
fi

MIME_TYPE=$(echo "$CREATE_RESPONSE" | jq -r '.newMediaItemResults[0].mediaItem.mimeType' | tee /dev/tty)

if [[ "$MIME_TYPE" == video/* ]]; then
    echo "video - success!"
    exit 0
elif [[ "$MIME_TYPE" == image/* ]]; then
    echo "photo"
    URL=$(bash $DIR/share_photo.sh "$UPLOAD_RESPONSE" "$TOKEN")
else
    echo "unknown [$MIME_TYPE] - not implemented"
    exit 1
fi

} >&2

echo $URL
