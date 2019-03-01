var log = console.log;
console.log = function() {
	var arr = Array.from(arguments);
	var d = new Date();
	var date_string = `${d.toDateString()} ${d.toTimeString().split(" ")[0]}`;
	arr.unshift(date_string);
	log(...arr);
	return arr[0];
};

Date.prototype._toDateString = function() {
	return this.toISOString().slice(0, 10);
};

var express = require("express");
var path = require("path");
var body_parser = require("body-parser");
var cookie_session = require("cookie-session");

var climb = require("./climb/climb");
var config = require("../config");

var app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(
	cookie_session({
		name: "session",
		secret: config.cookie_secret || "*"
	})
);

app.use("/api", climb);

var build = path.join(__dirname, "../", "client", "build");

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

var port = config.port || 8080;

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
