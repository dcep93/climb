const proxy = require("http-proxy-middleware");

const config = require("../../config.json");

const changeOrigin = Boolean(config.target);
const target = config.target || `http://localhost:${config.port || 8080}/`;

module.exports = function(app) {
	app.use(proxy("/api", { target, changeOrigin }));
};
