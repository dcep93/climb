const log = console.log;
console.log = function() {
	const arr = Array.from(arguments);
	const d = new Date();
	const date_string = `${d.toDateString()} ${d.toTimeString().split(" ")[0]}`;
	arr.unshift(date_string);
	log(...arr);
	return arr[1];
};

function time(obj) {
	console.log(new Date().getMilliseconds(), this.toString());
	return obj;
}

const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const cookie_session = require("cookie-session");

const climb = require("./climb/climb");
const config = require("../config");

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(
	cookie_session({
		name: "session",
		secret: config.cookie_secret || "*"
	})
);

app.use("/api", climb);

const build = path.join(__dirname, "../", "client", "build");

app.use(express.static(build));
app.get("/*", function(req, res) {
	res.sendFile(path.join(build, "index.html"));
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.stack);
});

app.use(function(req, res, next) {
	res.sendStatus(404);
});

const port = config.port || 8080;

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
