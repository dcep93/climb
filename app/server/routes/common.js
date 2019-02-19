var config = require("../../config");
var orm = require("../climb/orm");

function common(req, res, next) {
    res.common = {
        path: req.path,
        google_signin_client_id: config.google_signin_client_id,
    };
    res.data = (json) => res.json(Object.assign({common: res.common}, json));
    var user_id = req.session.user_id;
    if (user_id !== undefined) {
        orm.select('users', {id: user_id})
            .then((users) => users[0] || Promise.reject())
            .then((user) => Object.assign(res.common, {user}))
            .then(() => next())
            .catch(next);
    } else {
        res.common.user = {};
        next();
    }
}

module.exports = common;
