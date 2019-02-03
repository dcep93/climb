var express = require("express");
var exec = require("child_process").exec;

var config = require("./config");

var orm = require("./orm");

var locals = require("./routes/locals");

var gym = require("./routes/gym");
var user = require("./routes/user");
var auth = require("./routes/auth");

var app = express.Router();

app.use(locals);

app.use("/gym/:gym_path", gym);
app.use("/user/:user_id", user);
app.use("/auth", auth);

app.get("/", function(req, res, next) {
    orm(req, res, next).getAllGyms(function(gyms) {
        res.render("index.ejs", { gyms });
    });
});

app.get("/get_gcs_key", function(req, res, next) {
    if (!res.locals.common.user.is_verified) return res.sendStatus(403);
    exec(`GOOGLE_APPLICATION_CREDENTIALS=${__dirname}/creds.json gcloud auth application-default print-access-token`, function(err, stdout, stderr) {
        if (err) return next(new Error(err));
        res.send({folder: res.locals.common.user.id, token: stdout, bucket: config.gcs_bucket_id});
    });
});

module.exports = app;
