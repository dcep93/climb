var express = require("express");
var formidable = require('formidable');
var OAuth2Client = require("google-auth-library").OAuth2Client;

var orm = require("./orm");
var config = require("./config");

var app = express.Router();

Date.prototype._toDateString = function() {
  return this.toISOString().slice(0, 10);
};

app.use(function(req, res, next) {
  res.locals.common = {
    google_signin_client_id: config.google_signin_client_id
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
    res.render("index.ejs", {
      gyms: gyms
    });
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
        payload["name"],
        payload["picture"],
        function(userId) {
          req.session.userId = userId;
          res.sendStatus(200);
        }
      );
    });
});

app.post("/logout", function(req, res) {
  req.session.userId = undefined;
  res.sendStatus(200);
});

app.post("/new_gym", function(req, res, next) {
  if (!res.locals.common.user.is_admin) return res.redirect("/");
  var path = req.body.path;
  var name = req.body.name;
  var description = req.body.description;
  orm(req, res, next)
    .setErrF(function(q, err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send(`path "${path}" already exists`);
      } else {
        this.err(q, err);
      }
    })
    .newGym(path, name, description, () => res.send(`/gym/${path}`));
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
    return res.redirect("/gym/" + gymPath);
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
    this.getUserNumClimbedWalls(userId, function(numClimbedWalls) {
      res.render("user.ejs", { user, numClimbedWalls });
    });
  });
});

app.post("/user/:user_id/edit", function(req, res, next) {
  if (!res.locals.common.user.is_admin) return res.sendStatus(403);
  var userId = req.params.user_id;
  var field = req.body.field;
  var value = req.body.value === "true";
  var isAdmin;
  var isVerified;
  if (field === "admin") {
    isAdmin = value;
    if (isAdmin) {
      isVerified = true;
    }
  } else if (field === "verified") {
    isVerified = value;
    if (!isVerified) {
      isAdmin = false;
    }
  } else {
    return res.sendStatus(400);
  }
  orm(req, res, next).updateUserStatus(userId, isAdmin, isVerified);
});

app.get("/gym/:gym_path/wall/:wall_id", function(req, res, next) {
  var gymPath = req.params.gym_path;
  var wallId = req.params.wall_id;
  orm(req, res, next).getWall(gymPath, wallId, function(wall) {
    if (wall === undefined) return res.sendStatus(404);
    this.getGym(gymPath, function(gym) {
      this.getWallMedia(wallId, function(media) {
        var newVideoFormAction = `:${req.port}${req.path}/upload`;
        res.render("wall.ejs", { wall, gym, media, newVideoFormAction });
      });
    });
  });
});

app.post("/gym/:gym_path/wall/:wall_id/upload", function(req, res, next) {
  var gymPath = req.params.gym_path;
  var wallId = req.params.wall_id;

  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.now = Date.now();
    file.id = `${file.now}_${gymPath}_${wallId}`;
    console.log(`Uploading ${file.name} ${file.id}`);
    file.path = __dirname + '/uploads/' + file.id;
  });

  form.on('file', function (name, file) {
    var duration = (Date.now() - file.now) / 1000;
    console.log(`Uploaded ${file.name} ${file.id} ${duration}`);
  });

  res.sendStatus(501);
});

module.exports = app;
