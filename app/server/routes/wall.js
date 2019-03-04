const express = require("express");

const uploadToFacebook = require("./uploadToFacebook");
const orm = require("../climb/orm");

const app = express.Router({ mergeParams: true });

app.get("/", function(req, res, next) {
	const gym_path = req.params.gym_path;
	const wall_id = req.params.wall_id;
	const state = {};
	orm.select("walls", { gym_path, id: wall_id })
		.then(walls => walls[0] || Promise.reject())
		.then(wall => Object.assign(state, { wall }))
		.then(() => orm.select("walls", { gym_path }))
		.then(gyms => gyms[0] || Promise.reject())
		.then(gym => Object.assign(state.wall, { gym }))
		.then(() =>
			orm.select(
				"wall_media",
				{ wall_id },
				{ suffix: "ORDER BY id DESC" }
			)
		)
		.then(media => Object.assign(state.wall, { media }))
		.then(() => res.data(state))
		.catch(next);
});

app.post("/climb", function(req, res, next) {
	const gym_path = req.params.gym_path;
	const wall_id = req.params.wall_id;
	const active = req.body.climbed;

	const user_id = req.session.user_id;

	let promise;
	if (user_id !== undefined) {
		promise = orm.insert(
			"climbed_walls",
			{ active, gym_path, wall_id, user_id },
			{ q: "ON DUPLICATE KEY UPDATE active = ?", p: [active] }
		);
	} else {
		if (req.session.climbed === undefined) req.session.climbed = {};
		req.session.climbed[wall_id] = active;
		promise = Promise.resolve();
	}
	promise.then(() => res.sendStatus(200)).catch(next);
});

app.post("/edit", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	const gym_path = req.params.gym_path;
	const wall_id = req.params.wall_id;

	const name = req.body.name;
	const difficulty = req.body.difficulty;
	const location = req.body.location;
	const date = new Date(req.body.date || null);
	const setter = req.body.setter;
	const color = req.body.color;
	const active = req.body.active;

	orm.update(
		"walls",
		{ name, difficulty, location, date, setter, color, active },
		{ gym_path, id: wall_id }
	)
		.then(() => res.sendStatus(200))
		.catch(next);
});

app.post("/upload", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	const wall_id = req.params.wall_id;

	// const gcs_id = req.body.gcs_id;
	const gcs_path = req.body.gcs_path;
	const full_mime = req.body.mime;
	const file_size = req.body.size;
	// const gcs_key = req.body.gcs_key;

	const mime = full_mime.split("/")[0];

	const acceptable_media = ["image", "video"];

	if (acceptable_media.indexOf(mime) === -1) return res.sendStatus(400);

	orm.insert("wall_media", {
		wall_id,
		gcs_path,
		user_id: res.common.user.id,
		file_size,
		mime
	})
		.then(id => uploadToFacebook(id, mime, gcs_path))
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = app;
