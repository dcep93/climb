var OAuth2Client = require("google-auth-library").OAuth2Client;
var express = require("express");

var orm = require("../climb/orm");
var config = require("../config");

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
            orm(req, res, next).upsertUser(
                payload["sub"],
                payload["email"],
                payload["name"],
                payload["picture"],
                function(userId) {
                    req.session.userId = userId;
                    res.sendStatus(200);
                }
            );
        }, next);
});

app.post("/logout", function(req, res) {
    req.session.userId = undefined;
    res.sendStatus(200);
});

module.exports = app;
