var express = require("express");

var orm = require("../climb/orm");

var app = express.Router({ mergeParams: true });

app.get("/", function(req, res, next) {
	var user_id = req.params.user_id;
	orm.select("users", { id: user_id })
		.then(users => users[0] || Promise.reject())
		.then(user => res.data({ user }))
		.catch(next);
});

module.exports = app;
