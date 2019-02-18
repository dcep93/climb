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

  orm(null, null, next).insert('gyms', {path, name, description})
    .then(() => res.send(`/gym/${path}`));
});

app.get("/user/latest", function(req, res, next) {
  orm(null, null, next).select('users', null, {suffix: 'ORDER BY id DESC LIMIT 100'})
    .then((users) => res.data({users}));
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

  var s = {};
  if (isAdmin !== undefined) s['is_admin'] = isAdmin;
  if (isVerified !== undefined) s['is_verified'] = isVerified;

  orm(null, null, next).update('users', s, {id: userId})
    .then(() => res.sendStatus(200));
});

module.exports = app;
