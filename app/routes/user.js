var express = require("express");

var orm = require("../climb/orm");

var app = express.Router({mergeParams: true});

app.get("/", function(req, res, next) {
    var userId = req.params.user_id;
    orm(req, res, next).getUser(userId, function(user) {
        if (user == undefined) return res.sendStatus(404);
        res.data({ user });
    });
});

module.exports = app;