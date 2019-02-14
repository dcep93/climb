var config = require("../config");
var orm = require("../climb/orm");

function locals(req, res, next) {
    res.common = {
        path: req.path,
        google_signin_client_id: config.google_signin_client_id,
    };
    res.data = (json) => res.json(Object.assign({common: res.common}, json));
    var userId = req.session.userId;
    if (userId !== undefined) {
        orm(req, res, next).getUser(userId, function(user) {
            res.common.user = user;
            next();
        });
    } else {
        res.common.user = {};
        next();
    }
}

module.exports = locals;
