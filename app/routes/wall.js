var express = require("express");

var uploadToFacebook = require("./uploadToFacebook");
var orm = require("../climb/orm");

var app = express.Router({mergeParams: true});

app.get("/", function(req, res, next) {
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;
    orm(req, res, next).getWall(gymPath, wallId, function(wall) {
        if (wall === undefined) return res.sendStatus(404);
        this.getGym(gymPath, function(gym) {
            this.getWallMedia(wallId, function(media) {
                res.data({ wall, gym, media });
            });
        });
    });
});

app.post("/climb", function(req, res, next) {
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;
    var climbed = req.body.climbed === "true";
    orm(req, res, next).setClimbed(gymPath, wallId, climbed);
});

app.post("/edit", function(req, res, next) {
    if (!res.common.user.is_verified) return res.sendStatus(403);
    var gymPath = req.params.gym_path;
    var wallId = req.params.wall_id;
    orm(req, res, next).editWall(
        gymPath,
        wallId,
        req.body.name,
        req.body.difficulty,
        req.body.location,
        new Date(req.body.date),
        req.body.setter,
        req.body.color,
        req.body.active === "on"
    );
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

    orm(req, res, next).createWallMedia(wallId, gcsPath, res.common.user.id, fileSize, mime, function(id) {
        uploadToFacebook(id, mime, gcsPath, gcsKey, this);
    });
});

module.exports = app;
