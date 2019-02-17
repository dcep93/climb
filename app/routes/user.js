var express = require("express");

var orm = require("../climb/orm");

var app = express.Router({mergeParams: true});

app.get("/", function(req, res, next) {
    var userId = req.params.user_id;
    orm(null, null, next).select({table: 'users', where: {id: userId}})
        .then((users) => users[0] || Promise.reject())
        .then((user) => res.data({user}));
});

module.exports = app;