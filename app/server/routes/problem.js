const express = require("express");

const uploadToFacebook = require("./uploadToFacebook");
const orm = require("../climb/orm");

const app = express.Router({ mergeParams: true });

app.get("/", function(req, res, next) {
	const gym_path = req.params.gym_path;
	const problem_id = req.params.problem_id;
	const state = {};
	orm.select("problems", { gym_path, id: problem_id })
		.then(problems => problems[0] || Promise.reject())
		.then(problem => Object.assign(state, { problem }))
		.then(() => orm.select("problems", { gym_path }))
		.then(gyms => gyms[0] || Promise.reject())
		.then(gym => Object.assign(state, { gym }))
		.then(() =>
			orm.select("gyms", { path: gym_path }, { columns: ["name"] })
		)
		.then(gyms => gyms[0] || Promise.reject())
		.then(gym => gym.name || Promise.reject())
		.then(gym_name => Object.assign(state, { gym_name }))
		.then(() =>
			orm.select(
				"problem_media",
				{ gym_path, problem_id },
				{ suffix: "ORDER BY id DESC" }
			)
		)
		.then(media => Object.assign(state, { media }))
		.then(() =>
			orm.select(
				"users",
				{
					id: Array.from(
						new Set(state.media.map(media => media.user_id))
					)
				},
				{ columns: ["id", "image", "name"] }
			)
		)

		.then(users => Object.assign(state, { users }))
		.then(() => res.data(state))
		.catch(next);
});

app.post("/climb", function(req, res, next) {
	const gym_path = req.params.gym_path;
	const problem_id = req.params.problem_id;
	const active = req.body.climbed;

	const user_id = req.session.user_id;

	let promise;
	if (user_id !== undefined) {
		promise = orm.insert(
			"climbed_problems",
			{ active, gym_path, problem_id, user_id },
			{ q: "ON DUPLICATE KEY UPDATE active = ?", p: [active] }
		);
	} else {
		if (req.session.climbed === undefined) req.session.climbed = {};
		req.session.climbed[problem_id] = active;
		promise = Promise.resolve();
	}
	promise.then(() => res.sendStatus(200)).catch(next);
});

app.post("/edit", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	const gym_path = req.params.gym_path;
	const problem_id = req.params.problem_id;

	const name = req.body.name;
	const difficulty = req.body.difficulty;
	const location = req.body.location;
	const date = new Date(req.body.date || null);
	const setter = req.body.setter;
	const color = req.body.color;
	const active = req.body.active;

	orm.update(
		"problems",
		{ name, difficulty, location, date, setter, color, active },
		{ gym_path, id: problem_id }
	)
		.then(() => res.sendStatus(200))
		.catch(next);
});

app.post("/upload", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	const problem_id = req.params.problem_id;
	const gym_path = req.params.gym_path;
	const user_id = res.common.user.id;

	// const gcs_id = req.body.gcs_id;
	const gcs_path = req.body.gcs_path;
	const full_mime = req.body.mime;
	const file_size = req.body.size;
	// const gcs_key = req.body.gcs_key;

	const mime = full_mime.split("/")[0];

	const acceptable_media = ["image", "video"];

	if (acceptable_media.indexOf(mime) === -1) return res.sendStatus(400);

	const caption = `${
		res.common.user.name
	} - https://climb.nomorerice.com/user/${user_id}\n${
		req.body.problem_name
	} - ${
		req.body.gym_name
	} - https://climb.nomorerice.com/gym/${gym_path}/problem/${problem_id}`;

	orm.insert("problem_media", {
		problem_id,
		gym_path,
		gcs_path,
		user_id,
		file_size,
		mime
	})
		.then(id =>
			setTimeout(() => uploadToFacebook(id, mime, gcs_path, caption))
		)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = app;
