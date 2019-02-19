const proxy = require("http-proxy-middleware");

const config = require("../../config.json");

const port = config.port || 8080;

const target = `http://localhost:${port}/`;

module.exports = function(app) {
	app.use(proxy("/api", { target }));
};
