cd "$( dirname "${BASH_SOURCE[0]}" )"

(cd ../app/client && npm install)

cat <<END > ../app/config.json
{
	"target": "https://climb.nomorerice.com"
}
END

echo "run 'npm run client' from within /app to start the client server"
