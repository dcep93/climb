const express = require("express");

const orm = require("../climb/orm");
const admin_nodemon = require("./admin_nodemon");

const app = express.Router();

app.use(admin_nodemon);

app.use(function(req, res, next) {
	if (!res.common.user.is_admin) return res.sendStatus(403);
	next();
});

app.post("/new_gym", function(req, res, next) {
	const path = req.body.path;
	const name = req.body.name;
	const description = req.body.description;

	orm.insert("gyms", { path, name, description })
		.then(() => res.send(`/gym/${path}`))
		.catch(next);
});

app.get("/user/latest", function(req, res, next) {
	orm.select("users", null, { suffix: "ORDER BY id DESC LIMIT 100" })
		.then(orm.castUsers)
		.then(users => res.data({ users }))
		.catch(next);
});

app.post("/user/:user_id/edit", function(req, res, next) {
	const user_id = req.params.user_id;
	if (user_id == res.common.user.id) return res.sendStatus(409);
	if (user_id == 1) return res.sendStatus(403);

	const s = Object.assign({}, req.body);
	if (s.is_admin) s.is_verified = true;
	else if (s.is_verified === false) s.is_admin = false;

	orm.update("users", s, { id: user_id })
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = app;
