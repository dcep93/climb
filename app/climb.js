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

  var mime = fullMime.split("/")[0];

  var acceptableMedia = ["image", "video"];

  if (acceptableMedia.indexOf(mime) === -1) return res.sendStatus(400);

  orm(req, res, next).createWallMedia(wallId, gcsPath, res.locals.common.user.id, fileSize, mime, function(id) {
    uploadToFacebook(id, mime, gcsPath, this);
  });
});

function uploadToFacebook(wallMediaId, mime, gcsPath, o) {
  var endpoint;
  var uploadField;
  var fieldsToGet;
  var handleGetResponse;
  var mediaId;

  var accessToken = config.facebook_page_access_token;

  var gcsUrl = `https://storage.googleapis.com/${config.gcs_bucket_id}/${gcsPath}`;

  function uploadMedia() {
    request({
      uri: endpoint,
      method: 'POST',
      qs: {
        access_token: accessToken,
        [uploadField]: gcsUrl,
      }
    }, function(error, _response, uploadBody) {
      if (error) return fail('post', error);
      mediaId = JSON.parse(uploadBody).id;
      if (!mediaId) return fail('no media id', uploadBody);
      getMedia();
    });
  }

  function getMedia() {
    request({
      uri: `https://graph.facebook.com/v3.2/${mediaId}`,
      method: 'GET',
      qs: {
        access_token: accessToken,
        fields: fieldsToGet,
      }
    }, function(error, _response, getBody) {
      if (error) return fail('get', error);
      handleGetResponse(getBody, JSON.parse(getBody));
    });
  }

  function fail(mimeExtension, error) {
    if (!error) error = mimeExtension;
    o.updateWallMedia(wallMediaId, {mime: `${mime} - ${mimeExtension}`, data: error}, function() {
      console.error(new Error(error));
    });
  }

  var getMediaTries = 100;
  function finish(data, height, width) {
    o.updateWallMedia(wallMediaId, {mime: mime, data: data, height: height, width: width}, function() {
      if (this.res) this.res.sendStatus(200);
      deleteFromGCS();
      console.log(`finished ${mime} ${mediaId} ${getMediaTries}`);
    });
  }

  function deleteFromGCS() {
    // TODO
  }

  if (mime === "image") {
    endpoint = "https://graph.facebook.com/v3.2/me/photos";
    uploadField = "url";
    fieldsToGet = "images,width,height";
    handleGetResponse = function(rawResponse, response) {
      var images = response.images;
      if (!images) return fail('no images', rawResponse);
      var firstImage = images[0];
      if (!firstImage) return fail('no first image', rawResponse);
      var imgSource = firstImage.source;
      if (!imgSource) return fail('no source', rawResponse);
      var height = response.height;
      var width = response.width;
      if (!height || !width) return fail(`bad dimensions - ${width}x${height}`, rawResponse);
      finish(imgSource, height, width);
    }
  } else if (mime === "video") {
    o.res.sendStatus(200);
    o = orm(null, null, console.error);
    endpoint = "https://graph-video.facebook.com/v3.2/me/videos"
    uploadField = "file_url";
    fieldsToGet = "permalink_url,format,status";
    handleGetResponse = function(rawResponse, response) {
      var status = response.status;
      if (!status) return fail('no status', rawResponse);
      var videoStatus = status.video_status;
      if (!videoStatus) return fail('no video status', rawResponse);
      if (videoStatus === 'ready') {
        var permaLink = response.permalink_url;
        if (!permaLink) return fail('no permalink', rawResponse);
        var formats = response.format;
        if (!formats) return fail('no formats', rawResponse);
        var lastFormat = formats[formats.length-1];
        if (!lastFormat) return fail('no last format', rawResponse);
        var height = lastFormat.height;
        var width = lastFormat.width;
        if (!height || !width) return fail(`bad dimensions - ${width}x${height}`, rawResponse);
        finish(permaLink, height, width);
      } else if (videoStatus === 'processing') {
        var processingProgress = status.processing_progress;
        if (processingProgress === undefined) return fail('undefined progress', rawResponse);
        o.updateWallMedia(wallMediaId, {mime: `${mime} - processing ${processingProgress}%`, data: rawResponse}, function() {
          if (--getMediaTries === 0) return fail('no more retries');
          console.log(`processing ${processingProgress}% ${mediaId} ${getMediaTries}`);
          setTimeout(getMedia, 3000)
        });
      } else {
        return fail(`bad video status ${videoStatus}`, rawResponse);
      }
    }
  } else {
    throw new DeveloperException("should never get here");
  }

  uploadMedia();
}

module.exports = app;
