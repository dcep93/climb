const express = require("express");

const orm = require("../climb/orm");

const problem = require("./problem");

const app = express.Router({ mergeParams: true });

app.use("/problem/:problem_id", problem);

app.get("/", function(req, res, next) {
	const gym_path = req.params.gym_path;
	const state = {};
	orm.select("gyms", { path: gym_path })
		.then(gyms => gyms[0] || Promise.reject())
		.then(gym => Object.assign(state, { gym }))
		.then(() =>
			orm.select("problems", { gym_path }, { suffix: "ORDER BY id DESC" })
		)
		.then(problems => Object.assign(state.gym, { problems }))
		.then(() =>
			orm.select(
				"climbed_problems",
				{ gym_path, user_id: req.session.user_id, active: true },
				{ columns: ["problem_id"] }
			)
		)
		.then(rows => rows.map(row => row.problem_id))
		.then(climbed_problems =>
			Object.assign(state.gym, { climbed_problems })
		)
		.then(() =>
			orm.select(
				"problem_media",
				{ gym_path },
				{
					columns: ["picture", "problem_id"],
					suffix: "GROUP BY problem_id"
				}
			)
		)
		.then(pictures => Object.assign(state.gym, { pictures }))
		.then(() => res.data(state))
		.catch(next);
});

app.get("/edit", function(req, res, next) {
	const gym_path = req.params.gym_path;
	if (!res.common.user.is_verified) return res.redirect("/gym/" + gym_path);
	const state = {};
	orm.select("gyms", { path: gym_path })
		.then(gyms => gyms[0])
		.then(gym => gym || Promise.reject())
		.then(gym => Object.assign(state, { gym }))
		.then(() =>
			orm.select("problems", { gym_path }, { suffix: "ORDER BY id DESC" })
		)
		.then(problems => Object.assign(state.gym, { problems }))
		.then(() => res.data(state))
		.catch(next);
});

app.post("/edit", function(req, res, next) {
	const gym_path = req.params.gym_path;
	if (!res.common.user.is_verified) return res.sendStatus(403);

	const name = req.body.name;
	const description = req.body.description;

	orm.update("gyms", { name, description }, { path: gym_path })
		.then(() => res.sendStatus(200))
		.catch(next);
});

app.post("/new_problem", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	const gym_path = req.params.gym_path;

	const name = req.body.name;
	const difficulty = req.body.difficulty;
	const location = req.body.location;
	const date = new Date(req.body.date || null);
	const setter = req.body.setter;
	const color = req.body.color;
	const active = req.body.active;

	orm.insert("problems", {
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
