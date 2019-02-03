var express = require("express");
var OAuth2Client = require("google-auth-library").OAuth2Client;
var exec = require("child_process").exec;

var orm = require("./orm");
var config = require("./config");

var app = express.Router();

app.use(function(req, res, next) {
  res.locals.common = {
    path: req.path,
    google_signin_client_id: config.google_signin_client_id,
  };
  var userId = req.session.userId;
  if (userId !== undefined) {
    orm(req, res, next).getUser(userId, function(user) {
      res.locals.common.user = user;
      next();
    });
  } else {
    res.locals.common.user = {};
    next();
  }
});

app.get("/", function(req, res, next) {
  orm(req, res, next).getAllGyms(function(gyms) {
    res.render("index.ejs", { gyms });
  });
});

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
    }, function(error) {
      console.log(error);
    });
});

app.post("/logout", function(req, res) {
  req.session.userId = undefined;
  res.sendStatus(200);
});

app.get("/gym/:gym_path", function(req, res, next) {
  var gymPath = req.params.gym_path;
  orm(req, res, next).getGym(gymPath, function(gym) {
    if (gym === undefined) return res.sendStatus(404);
    this.getWalls(gymPath, function(walls) {
      this.getClimbedWalls(gymPath, function(climbedWalls) {
        res.render("gym.ejs", { gym, walls, climbedWalls });
      });
    });
  });
});

app.get("/gym/:gym_path/edit", function(req, res, next) {
  var gymPath = req.params.gym_path;
  if (!res.locals.common.user.is_verified)
    return res.redirect("/gym/" + gymPath);
  orm(req, res, next).getGym(gymPath, function(gym) {
    if (gym === undefined) return res.sendStatus(404);
    this.getWalls(gymPath, function(walls) {
      res.render("gym_edit.ejs", { gym, walls });
    });
  });
});

app.post("/gym/:gym_path/edit", function(req, res, next) {
  var gymPath = req.params.gym_path;
  if (!res.locals.common.user.is_verified)
    return res.sendStatus(403);
  var name = req.body.name;
  var description = req.body.description;
  orm(req, res, next).updateGym(gymPath, name, description);
});

app.post("/gym/:gym_path/:wall_id/climb", function(req, res, next) {
  var gymPath = req.params.gym_path;
  var wallId = req.params.wall_id;
  var climbed = req.body.climbed === "true";
  orm(req, res, next).setClimbed(gymPath, wallId, climbed);
});

app.post("/gym/:gym_path/wall/:wall_id/edit", function(req, res, next) {
  if (!res.locals.common.user.is_verified) return res.sendStatus(403);
  var gymPath = req.params.gym_path;
  var wallId = req.params.wall_id;
  orm(req, res, next).editWall(
    gymPath,
    wallId,
    req.body.name,
    req.body.difficulty,
    req.body.location,
    req.body.date || new Date(),
    req.body.setter,
    req.body.color,
    req.body.active === "on"
  );
});

app.post("/gym/:gym_path/new_wall", function(req, res, next) {
  if (!res.locals.common.user.is_verified) return res.sendStatus(403);
  var gymPath = req.params.gym_path;
  orm(req, res, next).createWall(
    gymPath,
    req.body.name,
    req.body.difficulty,
    req.body.location,
    req.body.date || new Date(),
    req.body.setter,
    req.body.color,
    req.body.active === "on"
  );
});

app.get("/user/:user_id", function(req, res, next) {
  var userId = req.params.user_id;
  orm(req, res, next).getUser(userId, function(user) {
    if (user == undefined) return res.sendStatus(404);
    res.render("user.ejs", { user });
  });
});

app.get("/gym/:gym_path/wall/:wall_id", function(req, res, next) {
  var gymPath = req.params.gym_path;
  var wallId = req.params.wall_id;
  orm(req, res, next).getWall(gymPath, wallId, function(wall) {
    if (wall === undefined) return res.sendStatus(404);
    this.getGym(gymPath, function(gym) {
      this.getWallMedia(wallId, function(media) {
        res.render("wall.ejs", { wall, gym, media });
      });
    });
  });
});

app.get("/get_gcs_key", function(req, res, next) {
  if (!res.locals.common.user.is_verified) return res.sendStatus(403);
  exec(`GOOGLE_APPLICATION_CREDENTIALS=${__dirname}/creds.json gcloud auth application-default print-access-token`, function(err, stdout, stderr) {
    if (err) return next(new Error(err));
    res.send({folder: res.locals.common.user.id, token: stdout, bucket: config.gcs_bucket_id});
  });
});

app.post("/gym/:gym_path/wall/:wall_id/upload", function(req, res, next) {
  if (!res.locals.common.user.is_verified) return res.sendStatus(403);
  var wallId = req.params.wall_id;

  // var gcsId = req.body.gcs_id;
  var gcsPath = req.body.gcs_path;
  var fullMime = req.body.mime;
  var fileSize = req.body.size;
  var gcsKey = req.body.gcs_key;

  var mime = fullMime.split("/")[0];

  var acceptableMedia = ["image", "video"];

  if (acceptableMedia.indexOf(mime) === -1) return res.sendStatus(400);

  orm(req, res, next).createWallMedia(wallId, gcsPath, res.locals.common.user.id, fileSize, mime, function(id) {
    uploadToFacebook(id, mime, gcsPath, gcsKey, this);
  });
});

module.exports = app;
