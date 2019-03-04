const express = require("express");

const orm = require("../climb/orm");

const app = express.Router({ mergeParams: true });

app.get("/", function(req, res, next) {
	const user_id = req.params.user_id;
	orm.select("users", { id: user_id })
		.then(orm.castUsers)
		.then(users => users[0] || Promise.reject())
		.then(user => res.data({ user }))
		.catch(next);
});

module.exports = app;
