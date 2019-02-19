var OAuth2Client = require("google-auth-library").OAuth2Client;
var express = require("express");

var orm = require("../climb/orm");
var config = require("../../config");

var app = express.Router();

app.post("/login", function(req, res, next) {
    var idToken = req.body.id_token;
    var client = new OAuth2Client(config.clientId);
    client
        .verifyIdToken({
            idToken: idToken,
            audience: config.clientId
        })
        .then(function(ticket) {
            var payload = ticket.getPayload();
            orm(null, null, next).insert('users', {
                    google_id: payload["sub"],
                    email: payload["email"],
                    name: payload["name"],
                    image: payload["picture"]
                }, {
                    q: 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=?, image=?',
                    p: [name, image]
                })
                    .then((userId) => Object.assign(req.session, {userId}))
                    .then(() => res.sendStatus(200));
        }, next);
});

app.post("/logout", function(req, res) {
    req.session.userId = undefined;
    res.sendStatus(200);
});

module.exports = app;
