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
	const ticket_payload = {};
	client
		.verifyIdToken({
			idToken: id_token,
			audience: config.google_signin_client_id
		})
		.then(ticket => Object.assign(ticket_payload, ticket.getPayload()))
		.then(() =>
			orm.insert(
				"users",
				{
					google_id: ticket_payload.sub,
					email: ticket_payload.email,
					name: ticket_payload.name,
					image: ticket_payload.picture
				},
				{
					q: "ON DUPLICATE KEY UPDATE name=?, image=?",
					p: [ticket_payload.name, ticket_payload.picture]
				}
			)
		)
		.then(user_ids => {
			if (user_ids.length > 0) return user_ids;
			return orm.select(
				"users",
				{ google_id: ticket_payload.sub },
				{ columns: ["id"] }
			);
		})
		.then(user_ids => user_ids[0] || Promise.reject())
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
