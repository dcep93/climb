const express = require("express");
const exec = require("child_process").exec;

const app = express.Router();

app.use("/pull", function(req, res) {
	exec(`git -C ${__dirname} pull -f`, function(err, stdout, stderr) {
		let send_string;
		if (err) {
			console.log(stderr);
			res.status(500);
			send_string = stderr;
		} else {
			console.info(stdout);
			send_string = stdout;
		}
		res.send(`<pre>${send_string}</pre>`);
	});
});

app.use("/rs", function(req, res) {
	res.sendStatus(200);
	process.kill(process.pid, "SIGUSR2");
});

module.exports = app;
