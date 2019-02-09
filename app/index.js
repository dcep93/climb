var log = console.log;
console.log = function() {
	var arr = Array.from(arguments);
	var d = new Date();
	var dateString = `${d.toDateString()} ${d.toTimeString().split(' ')[0]}`;
	arr.unshift(dateString);
	log(...arr);
};

Date.prototype._toDateString = function() {
  return this.toISOString().slice(0, 10);
};

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var climb = require('./climb/climb');
var config = require("./config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
	name: 'session',
	secret: config.cookie_secret || '*'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', climb);

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
