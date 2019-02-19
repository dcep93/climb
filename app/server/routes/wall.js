var express = require("express");

var upload_to_facebook = require("./upload_to_facebook");
var orm = require("../climb/orm");

var app = express.Router({mergeParams: true});

app.get("/", function(req, res, next) {
    var gym_path = req.params.gym_path;
    var wall_id = req.params.wall_id;
    var state = {};
    orm.select('walls', {gym_path, id: wall_id})
        .then((walls) => walls[0] || Promise.reject())
        .then((wall) => Object.assign(state, {wall}))
        .then(() => orm.select('walls', {gym_path}))
        .then((gyms) => gyms[0] || Promise.reject())
        .then((gym) => Object.assign(state.wall, {gym}))
        .then(() => orm.select('wall_media', {wall_id}))
        .then((media) => Object.assign(state.wall, {media}))
        .then(() => res.data(state))
        .catch(next);
});

app.post("/climb", function(req, res, next) {
    var gym_path = req.params.gym_path;
    var wall_id = req.params.wall_id;
    var active = req.body.climbed === "true";

    var user_id = this.req.session.user_id;
    
    var promise;
    if (user_id !== undefined) {
        promise = orm.insert('climbed_walls', {active, gym_path, wall_id, user_id}, {q: 'ON DUPLICATE KEY UPDATE active = ?', p: [active]})
    } else {
        if (req.session.climbed === undefined) req.session.climbed = {};
        req.session.climbed[wall_id] = active;
        promise = Promise.resolve();
    }
    promise
        .then(() => res.sendStatus(200))
        .catch(next);
});

app.post("/edit", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var gym_path = req.params.gym_path;
    var wall_id = req.params.wall_id;

    var name = req.body.name;
    var difficulty = req.body.difficulty;
    var location = req.body.location;
    var date = new Date(req.body.date || null);
    var setter = req.body.setter;
    var color = req.body.color;
    var active = req.body.active === "on";

    orm.update('walls', {name, difficulty, location, date, setter, color, active}, {gym_path, id: wall_id})
        .then(() => res.sendStatus(200))
        .catch(next);
});

app.post("/upload", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var wall_id = req.params.wall_id;

    // var gcs_id = req.body.gcs_id;
    var gcs_path = req.body.gcs_path;
    var full_mime = req.body.mime;
    var file_size = req.body.size;
    var gcs_key = req.body.gcs_key;

    var mime = full_mime.split("/")[0];

    var acceptable_media = ["image", "video"];

    if (acceptable_media.indexOf(mime) === -1) return res.sendStatus(400);

    orm.insert('wall_media', {wall_id, gcs_path, user_id: res.common.user.id, file_size, mime})
        .then((id) => upload_to_facebook(id, mime, gcs_path, gcs_key))
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = app;
