var express = require('express');
var exec = require('child_process').exec;

var app = express.Router();

app.use("/pull", function(req, res) {
	exec(`git -C ${__dirname} pull -f`, function(err, stdout, stderr) {
		var sendString;
		if (err) {
			console.log(stderr);
			res.status(500);
			sendString = stderr;
		} else {
			console.info(stdout);
			sendString = stdout;
		}
		res.send(`<pre>${sendString}</pre>`);
	});
});

app.use("/rs", function(req, res) {
	res.sendStatus(200);
	process.kill(process.pid, 'SIGUSR2');
});

module.exports = app;
