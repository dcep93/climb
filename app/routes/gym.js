var express = require("express");

var orm = require("../climb/orm");

var wall = require("./wall");

var app = express.Router({mergeParams: true});

app.use("/wall/:wall_id", wall);

app.get("/", function(req, res, next) {
    var gymPath = req.params.gym_path;
    orm(req, res, next).getGym(gymPath, function(gym) {
        if (gym === undefined) return res.sendStatus(404);
        this.getWalls(gymPath, function(walls) {
            gym.walls = walls;
            this.getClimbedWalls(gymPath, function(climbedWalls) {
                gym.climbedWalls = climbedWalls;
                res.data({ gym });
            });
        });
    });
});

app.get("/edit", function(req, res, next) {
    var gymPath = req.params.gym_path;
    if (!res.common.user.is_verified) return res.redirect("/gym/" + gymPath);
    orm(req, res, next).getGym(gymPath, function(gym) {
        if (gym === undefined) return res.sendStatus(404);
        this.getWalls(gymPath, function(walls) {
            gym.walls = walls;
            res.data({ gym });
        });
    });
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
        new Date(req.body.date),
        req.body.setter,
        req.body.color,
        req.body.active === "on"
    );
});

module.exports = app;
