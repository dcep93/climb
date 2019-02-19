var express = require('express');

var orm = require("../climb/orm");
var admin_nodemon = require("./admin_nodemon");

var app = express.Router();

app.use(admin_nodemon);

app.use(function(req, res, next) {
	if (!res.common.user.is_admin) return res.sendStatus(403);
	next();
});

app.post("/new_gym", function(req, res, next) {
  var path = req.body.path;
  var name = req.body.name;
  var description = req.body.description;

  orm.insert('gyms', {path, name, description})
    .then(() => res.send(`/gym/${path}`))
    .catch(next);
});

app.get("/user/latest", function(req, res, next) {
  orm.select('users', null, {suffix: 'ORDER BY id DESC LIMIT 100'})
    .then((users) => res.data({users}))
    .catch(next);
});

app.post("/user/:user_id/edit", function(req, res, next) {
  var user_id = req.params.user_id;
  if (user_id == res.common.user.id) return res.sendStatus(409);
  if (user_id == 1) return res.sendStatus(403);
  var field = req.body.field;
  var value = req.body.value === "true";
  var is_admin;
  var is_verified;
  if (field === "admin") {
    is_admin = value;
    if (is_admin) {
      is_verified = true;
    }
  } else if (field === "verified") {
    is_verified = value;
    if (!is_verified) {
      is_admin = false;
    }
  } else {
    return res.sendStatus(400);
  }

  var s = {};
  if (is_admin !== undefined) s['is_admin'] = is_admin;
  if (is_verified !== undefined) s['is_verified'] = is_verified;

  orm.update('users', s, {id: user_id})
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = app;
