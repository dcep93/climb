const express = require("express");
const exec = require("child_process").exec;

const config = require("../../config");

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

app.use("/reset_db", function(req, res) {
	exec(
		`mysqldump -u root -p${config.mysql_password} climb | mysql -u root -p${
			config.mysql_password
		} remote`,
		function(err, stdout, stderr) {
			if (err) {
				console.log(stderr);
				return res.status(500).send(`<pre>${stderr}</pre>`);
			}
			res.send("success");
		}
	);
});

module.exports = app;
