var express = require("express");
var OAuth2Client = require("google-auth-library").OAuth2Client;
var exec = require("child_process").exec;
var request = require("request");

var orm = require("./orm");
var config = require("./config");

var app = express.Router();

Date.prototype._toDateString = function() {
  return this.toISOString().slice(0, 10);
};

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
      console.log(payload);
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
    });
});

app.post("/logout", function(req, res) {
  req.session.userId = undefined;
  res.sendStatus(200);
});

app.post("/new_gym", function(req, res, next) {
  if (!res.locals.common.user.is_admin) return res.sendStatus(403);
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
    this.getUserNumClimbedWalls(userId, function(numClimbedWalls) {
      res.render("user.ejs", { user, numClimbedWalls });
    });
  });
});

app.post("/user/:user_id/edit", function(req, res, next) {
  if (!res.locals.common.user.is_admin) return res.sendStatus(403);
  var userId = req.params.user_id;
  if (userId == res.locals.common.user.id) return res.sendStatus(409);
  if (userId == 1) return res.sendStatus(403);
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

app.get("/admin/user/latest", function(req, res, next) {
  if (!res.locals.common.user.is_admin) return res.redirect('/');
  orm(req, res, next).getLatestUsers(function(users) {
    res.render("user_latest.ejs", { users });
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
    if (err) return next(err);
    res.send(stdout);
  });
});

app.post("/gym/:gym_path/wall/:wall_id/upload", function(req, res, next) {
  if (!res.locals.common.user.is_verified) return res.sendStatus(403);
  var wallId = req.params.wall_id;

  var accessToken = config.facebook_page_access_token;

  var gcsPath = req.body.gcs_path;
  var gcsUrl = req.body.gcs_url;
  var fullMime = req.body.mime;

  var mime = fullMime.split("/")[0];

  var endpoint;
  var uploadField;
  var getField;
  var getResponseToData;
  if (mime === "image") {
    endpoint = "https://graph.facebook.com/v3.2/me/photos";
    uploadField = "url";
    getField = "images";
    getResponseToData = function(response) {
      var images = response.images;
      if (!images) return null;
      var firstImage = images[0];
      if (!firstImage) return null;
      return firstImage.source;
    }
  } else if (mime === "video") {
    endpoint = "https://graph-video.facebook.com/v3.2/me/videos"
    upload_field = "file_url";
    getField = "embed_html";
    getResponseToData = function(response) {
      return response.embed_html;
    }
  } else {
    return res.sendStatus(400);
  }

  request.post(endpoint, {
    access_token: accessToken,
    [uploadField]: gcsUrl,
  }, function(error, uploadResponse, body) {
    if (error) return next(error);
    var mediaId = uploadResponse.id;
    if (!mediaId) return next(uploadResponse);
    get(`https://graph.facebook.com/v3.2/${mediaId}`, {
      access_token: accessToken,
      fields: getField,
    }, function(error, getResponse, body) {
      if (error) return next(error);
      var data = getResponseToData(getResponse);
      if (data) return next(getResponse);
      orm(req, res, next).createWallMedia(wallId, gcsPath, res.locals.common.user.id, mime, data);
    });
  })
});

module.exports = app;
