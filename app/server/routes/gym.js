var express = require("express");

var orm = require("../climb/orm");

var wall = require("./wall");

var app = express.Router({ mergeParams: true });

app.use("/wall/:wall_id", wall);

app.get("/", function(req, res, next) {
	var gym_path = req.params.gym_path;
	var state = {};
	orm.select("gyms", { path: gym_path })
		.then(gyms => gyms[0] || Promise.reject())
		.then(gym => Object.assign(state, { gym }))
		.then(() =>
			orm.select("walls", { gym_path }, { suffix: "ORDER BY id DESC" })
		)
		.then(walls => Object.assign(state.gym, { walls }))
		.then(() =>
			orm.select(
				"climbed_walls",
				{ gym_path, user_id: req.session.user_id, active: true },
				{ columns: ["wall_id"] }
			)
		)
		.then(rows => rows.map(row => row.wall_id))
		.then(climbed_walls => Object.assign(state.gym, { climbed_walls }))
		.then(() => res.data(state))
		.catch(next);
});

app.get("/edit", function(req, res, next) {
	var gym_path = req.params.gym_path;
	if (!res.common.user.is_verified) return res.redirect("/gym/" + gym_path);
	var state = {};
	orm.select("gyms", { path: gym_path })
		.then(gyms => gyms[0])
		.then(gym => gym || Promise.reject())
		.then(gym => Object.assign(state, { gym }))
		.then(() =>
			orm.select("walls", { gym_path }, { suffix: "ORDER BY id DESC" })
		)
		.then(walls => Object.assign(state.gym, { walls }))
		.then(() => res.data(state))
		.catch(next);
});

app.post("/edit", function(req, res, next) {
	var gym_path = req.params.gym_path;
	if (!res.common.user.is_verified) return res.sendStatus(403);

	var name = req.body.name;
	var description = req.body.description;

	orm.update("gyms", { name, description }, { path: gym_path })
		.then(() => res.sendStatus(200))
		.catch(next);
});

app.post("/new_wall", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	var gym_path = req.params.gym_path;

	var name = req.body.name;
	var difficulty = req.body.difficulty;
	var location = req.body.location;
	var date = new Date(req.body.date || null);
	var setter = req.body.setter;
	var color = req.body.color;
	var active = req.body.active;

	orm.insert("walls", {
		gym_path,
		name,
		difficulty,
		location,
		date,
		setter,
		color,
		active
	})
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = app;
