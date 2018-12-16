var express = require('express');
var exec = require('child_process').exec;

var app = express.Router();

app.use('/pull', function(req, res) {
	exec(`git -C ${__dirname} pull`, function(err, stdout, stderr) {
		if (err) {
			console.log(stderr);
			res.status(500).send(stderr);
		} else {
			console.info(stdout);
			res.send(stdout);
		}
	});
});

app.use('/rs', function(req, res) {
	res.sendStatus(200);
	process.kill(process.pid, 'SIGUSR2');
});

module.exports = app;
