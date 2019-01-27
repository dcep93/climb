FILE="$1"

{

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

FILE_PATH="$DIR/uploads/$FILE"

TOKEN=$(jq -r .facebook_page_access_token $DIR/config.json)
MIME=$(file -b --mime-type $FILE_PATH)

function upload_video() {
    # UPLOAD_RESPONSE=$(curl -s -X POST "https://graph-video.facebook.com/v3.2/me/videos" \
    #     -F "access_token=$TOKEN" \
    #     -F "source=@$FILE_PATH" \
    # ); echo
    UPLOAD_RESPONSE='{"id":"748844575486014"}'
    VIDEO_ID=$(echo "$UPLOAD_RESPONSE" | jq -r .id)
    if [[ "$VIDEO_ID" == "null" ]]; then
        echo "failed upload"
        echo "$UPLOAD_RESPONSE"
        exit 1
    fi
    GET_RESPONSE=$(curl -s "https://graph.facebook.com/v3.2/$VIDEO_ID" \
        -F "access_token=$TOKEN" \
        -F "fields=embed_html" \
    )
    EMBED_HTML=$(echo "$GET_RESPONSE" | jq -r .embed_html)
    if [[ "$EMBED_HTML" == "null" ]]; then
        echo "failed get embed html"
        echo "$GET_RESPONSE"
        exit 1
    fi
    echo $EMBED_HTML
    OUTPUT=$(jq -n \
        --arg html "$EMBED_HTML" \
        --arg mime "$MIME" \
        '{info: $html, mime: $mime, type: "video"}' \
        )
}

function upload_image() {
    # UPLOAD_RESPONSE=$(curl -s -X POST "https://graph.facebook.com/v3.2/me/photos" \
    #     -F "access_token=$TOKEN" \
    #     -F "source=@$FILE_PATH" \
    # ); echo
    UPLOAD_RESPONSE='{"id":"1656931191280272","post_id":"1656557151317676_1656931191280272"}'
    IMAGE_ID=$(echo "$UPLOAD_RESPONSE" | jq -r .id)
    if [[ "$IMAGE_ID" == "null" ]]; then
        echo "failed upload"
        echo "$UPLOAD_RESPONSE"
        exit 1
    fi
    GET_RESPONSE=$(curl -s "https://graph.facebook.com/v3.2/$IMAGE_ID" \
        -F "access_token=$TOKEN" \
        -F "fields=images" \
    )
    IMAGE_URL=$(echo "$GET_RESPONSE" | jq -r .images[0].source)
    if [[ "$IMAGE_URL" == "null" ]]; then
        echo "failed get image"
        echo "$GET_RESPONSE"
        exit 1
    fi
    OUTPUT=$(jq -n \
        --arg image_url "$IMAGE_URL" \
        --arg mime "$MIME" \
        '{info: $image_url, mime: $mime, type: "image"}' \
        )
}

if [[ "$MIME" == video/* ]]; then
    upload_video
elif [[ "$MIME" == image/* ]]; then
    upload_image
else
    echo "unknown [$MIME] - not implemented"
    exit 1
fi

} >&2

echo $OUTPUT
