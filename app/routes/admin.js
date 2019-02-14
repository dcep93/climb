var express = require('express');

var orm = require("../climb/orm");
var adminNodemon = require("./admin_nodemon");

var app = express.Router();

app.use(adminNodemon);

app.use(function(req, res, next) {
	if (!res.common.user.is_admin) return res.sendStatus(403);
	next();
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

app.get("/user/latest", function(req, res, next) {
	orm(req, res, next).getLatestUsers(function(users) {
		res.render("admin/user_latest.ejs", { users });
	});
});

app.post("/user/:user_id/edit", function(req, res, next) {
  var userId = req.params.user_id;
  if (userId == res.common.user.id) return res.sendStatus(409);
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

module.exports = app;
