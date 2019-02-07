var config = require("../climb/config");
var orm = require("../climb/orm");

function locals(req, res, next) {
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
}

module.exports = locals;
