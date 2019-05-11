const express = require("express");
const exec = require("child_process").exec;

const config = require("../../config");

const orm = require("./orm");

const common = require("../routes/common");

const admin = require("../routes/admin");
const auth = require("../routes/auth");
const gym = require("../routes/gym");
const user = require("../routes/user");

const app = express.Router();

app.use(function(req, res, next) {
	console.log(req.path);
	next();
});

app.use(common);

app.use("/admin", admin);
app.use("/auth", auth);
app.use("/gym/:gym_path", gym);
app.use("/user/:user_id", user);

app.get("/", function(req, res, next) {
	orm.select("gyms")
		.then(gyms => res.data({ gyms }))
		.catch(next);
});

app.get("/get_gcs_key", function(req, res, next) {
	if (!res.common.user.is_verified) return res.sendStatus(403);
	exec(
		`GOOGLE_APPLICATION_CREDENTIALS=${__dirname}/creds.json gcloud auth application-default print-access-token`,
		function(err, stdout, stderr) {
			if (err) return next(new Error(err));
			res.json({
				folder: res.common.user.id,
				token: stdout,
				bucket: config.gcs_bucket_id
			});
		}
	);
});

module.exports = app;
