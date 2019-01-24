FILE="$1"

{

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

TOKEN=$(jq -r .facebook_page_access_token $DIR/config.json)
MIME=$(file -b --mime-type $FILE)

function upload_video() {
    echo video not implemented
    exit 1
}

function upload_image() {
    echo image not implemented
    exit 1
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
