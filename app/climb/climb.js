var express = require("express");
var exec = require("child_process").exec;

var config = require("../config");

var orm = require("./orm");

var locals = require("../routes/locals");

var admin = require("../routes/admin");
var auth = require("../routes/auth");
var gym = require("../routes/gym");
var user = require("../routes/user");

var app = express.Router();

app.use(locals);

app.use("/admin", admin);
app.use("/auth", auth);
app.use("/gym/:gym_path", gym);
app.use("/user/:user_id", user);

app.get("/", function(req, res, next) {
    orm(req, res, next).getAllGyms(function(gyms) {
        res.json({ gyms, common: res.locals.common });
    });
});

app.get("/get_gcs_key", function(req, res, next) {
    if (!res.locals.common.user.is_verified) return res.sendStatus(403);
    exec(`GOOGLE_APPLICATION_CREDENTIALS=${__dirname}/creds.json gcloud auth application-default print-access-token`, function(err, stdout, stderr) {
        if (err) return next(new Error(err));
        res.json({folder: res.locals.common.user.id, token: stdout, bucket: config.gcs_bucket_id});
    });
});

module.exports = app;
