var express = require('express');
var exec = require('child_process').exec;

var orm = require("./orm");

var app = express.Router();

app.use(function(req, res, next) {
	if (!res.locals.common.user.is_admin) return res.sendStatus(403);
	next();
});

app.get("/user/latest", function(req, res, next) {
	orm(req, res, next).getLatestUsers(function(users) {
		res.render("user_latest.ejs", { users });
	});
});

app.post("/new_gym", function(req, res, next) {
  var path = req.body.path;
  var name = req.body.name;
  var description = req.body.description;
  orm(req, res, next)
    .setErrF(function(q, err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send(`path "${path}" already exists`);
      } else {
        this.err(q, err);
      }
    })
    .newGym(path, name, description, () => res.send(`/gym/${path}`));
});

app.post("/user/:user_id/edit", function(req, res, next) {
  var userId = req.params.user_id;
  if (userId == res.locals.common.user.id) return res.sendStatus(409);
  if (userId == 1) return res.sendStatus(403);
  var field = req.body.field;
  var value = req.body.value === "true";
  var isAdmin;
  var isVerified;
  if (field === "admin") {
    isAdmin = value;
    if (isAdmin) {
      isVerified = true;
    }
  } else if (field === "verified") {
    isVerified = value;
    if (!isVerified) {
      isAdmin = false;
    }
  } else {
    return res.sendStatus(400);
  }
  orm(req, res, next).updateUserStatus(userId, isAdmin, isVerified);
});

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
