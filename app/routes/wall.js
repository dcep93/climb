var express = require("express");

var uploadToFacebook = require("./uploadToFacebook");
var orm = require("../climb/orm");

var app = express.Router({mergeParams: true});

app.get("/", function(req, res, next) {
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;
    var state = {};
    orm(null, null, next).select('walls', {gym_path: gymPath, id: wallId})
        .then((walls) => walls[0] || Promise.reject())
        .then((wall) => Object.assign(state, {wall}))
        .then(() => orm(null, null, next).select('walls', {gym_path: gymPath}))
        .then((gyms) => gyms[0] || Promise.reject())
        .then((gym) => Object.assign(state.wall, {gym}))
        .then(() => orm(null, null, next).select('wall_media', {wall_id: wallId}))
        .then((media) => Object.assign(state.wall, {media}))
        .then(() => res.data(state))
        .catch(next);
});

app.post("/climb", function(req, res, next) {
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;
    var climbed = req.body.climbed === "true";

    var userId = this.req.session.userId;
    
    var promise;
    if (userId !== undefined) {
        promise = orm(null, null, next).insert('climbed_walls', {active: climbed, 'gym_path': gymPath, 'wall_id': wallId, 'user_id': userId}, {q: 'ON DUPLICATE KEY UPDATE active = ?', p: [climbed]})
    } else {
        if (req.session.climbed === undefined) req.session.climbed = {};
        req.session.climbed[wallId] = climbed;
        promise = Promise.resolve();
    }
    promise.then(() => res.sendStatus(200));
});

app.post("/edit", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;

    var name = req.body.name;
    var difficulty = req.body.difficulty;
    var location = req.body.location;
    var date = new Date(req.body.date || null);
    var setter = req.body.setter;
    var color = req.body.color;
    var active = req.body.active === "on";

    orm(null, null, next).update('walls', {name, difficulty, location, date, setter, color, active}, {gym_path: gymPath, id: wallId})
        .then(() => res.sendStatus(200));
});

app.post("/upload", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var wallId = req.params.wall_id;

    // var gcsId = req.body.gcs_id;
    var gcsPath = req.body.gcs_path;
    var fullMime = req.body.mime;
    var fileSize = req.body.size;
    var gcsKey = req.body.gcs_key;

    var mime = fullMime.split("/")[0];

    var acceptableMedia = ["image", "video"];

    if (acceptableMedia.indexOf(mime) === -1) return res.sendStatus(400);

    orm(null, null, next).insert('wall_media', {wall_id: wallId, gcs_path: gcsPath, user_id: res.common.user.id, file_size: fileSize, mime})
        .then((id) => uploadToFacebook(id, mime, gcsPath, gcsKey))
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = app;
