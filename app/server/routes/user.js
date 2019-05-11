const express = require("express");

const orm = require("../climb/orm");

const app = express.Router({ mergeParams: true });

app.get("/", function(req, res, next) {
	const user_id = req.params.user_id;
	const state = {};
	orm.select("users", { id: user_id })
		.then(orm.castUsers)
		.then(users => users[0] || Promise.reject())
		.then(user => Object.assign(state, { user }))
		.then(() =>
			orm.select(
				"problem_media",
				{ user_id },
				{ suffix: "ORDER BY id DESC" }
			)
		)
		.then(media => Object.assign(state, { media }))
		.then(() =>
			orm.select(
				"problems",
				{ id: state.media.map(m => m.problem_id) },
				{ columns: ["id", "name"] }
			)
		)
		.then(problems => Object.assign(state, { problems }))
		.then(() => res.data(state))
		.catch(next);
});

module.exports = app;
