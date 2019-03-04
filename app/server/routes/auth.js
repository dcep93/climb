const OAuth2Client = require("google-auth-library").OAuth2Client;
const express = require("express");

const orm = require("../climb/orm");
const config = require("../../config");

const app = express.Router();

function setAdmin(user_id) {
	return orm.update(
		"users",
		{ is_admin: true, is_verified: true },
		{ id: user_id }
	);
}

app.post("/login", function(req, res, next) {
	const id_token = req.body.id_token;
	const client = new OAuth2Client(config.google_signin_client_id);
	client
		.verifyIdToken({
			idToken: id_token,
			audience: config.google_signin_client_id
		})
		.then(function(ticket) {
			const payload = ticket.getPayload();
			const email = payload["email"];
			const name = payload["name"];
			const image = payload["picture"];
			return orm.insert(
				"users",
				{
					google_id: payload["sub"],
					email,
					name,
					image
				},
				{
					q:
						"ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=?, image=?",
					p: [name, image]
				}
			);
		})
		.then(user_id => Object.assign(req.session, { user_id }) && user_id)
		.then(user_id => user_id == 1 && setAdmin(user_id))
		.then(() => res.sendStatus(200))
		.catch(next);
});

app.post("/logout", function(req, res) {
	req.session.user_id = undefined;
	res.sendStatus(200);
});

module.exports = app;
