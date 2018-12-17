var log = console.log;
console.log = function() {
	var arr = Array.from(arguments);
	var d = new Date();
	var dateString = `${d.toDateString()} ${d.toTimeString().split(' ')[0]}`;
	arr.unshift(dateString);
	log(...arr);
};

var express = require('express');
var path = require('path');

var climb = require('./climb');
var admin = require('./admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(climb);

app.use(admin);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
	console.error('err', err.stack);
	res.send(err.stack);
});

app.use(function(req, res, next) {
	res.sendStatus(404);
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
