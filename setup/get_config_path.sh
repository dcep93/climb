set -euo pipefail

echo `(cd $(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)/../app && pwd)`/config.json
