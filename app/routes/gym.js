var express = require("express");

var orm = require("../climb/orm");

var wall = require("./wall");

var app = express.Router({mergeParams: true});

app.use("/wall/:wall_id", wall);

app.get("/", function(req, res, next) {
    var gymPath = req.params.gym_path;
    var state = {};
    orm(null, null, next).select({table: 'gyms', where: {path: gymPath}})
        .then((gyms) => gyms[0] || Promise.reject())
        .then((gym) => Object.assign(state, {gym}))
        .then(() => orm(null, null, next).select({table: 'walls', where: {gym_path: gymPath}, suffix: 'ORDER BY id DESC'}))
        .then((walls) => Object.assign(state.gym, {walls}))
        .then(() => orm(null, null, next).select({table: 'climbed_walls', columns: ['wall_id'], where: {gym_path: gymPath, user_id: req.session.userId, active: true}}))
        .then((climbedWalls) => Object.assign(state.gym, {climbedWalls}))
        .then(() => res.data(state))
        .catch(next);
});

app.get("/edit", function(req, res, next) {
    var gymPath = req.params.gym_path;
    if (!res.common.user.is_verified) return res.redirect("/gym/" + gymPath);
    var state = {};
    orm(null, null, next).select({table: 'gyms', where: {path: gymPath}})
        .then((gyms) => gyms[0])
        .then((gym) => gym || Promise.reject())
        .then((gym) => Object.assign(state, {gym}))
        .then(() => orm(null, null, next).select({table: 'walls', where: {gym_path: gymPath}, suffix: 'ORDER BY id DESC'}))
        .then((walls) => Object.assign(state.gym, {walls}))
        .then(() => res.data(state));
});

app.post("/edit", function(req, res, next) {
    var gymPath = req.params.gym_path;
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var name = req.body.name;
    var description = req.body.description;
    orm(req, res, next).updateGym(gymPath, name, description);
});

app.post("/new_wall", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var gymPath = req.params.gym_path;
    orm(req, res, next).createWall(
        gymPath,
        req.body.name,
        req.body.difficulty,
        req.body.location,
        new Date(req.body.date || null),
        req.body.setter,
        req.body.color,
        req.body.active === "on"
    );
});

module.exports = app;
