var express = require('express');
var OAuth2Client = require('google-auth-library').OAuth2Client;

var orm = require('./orm');
var config = require('./config');

var app = express.Router();

Date.prototype._toDateString = function() { return this.toISOString().slice(0, 10); };

app.use(function(req, res, next) {
	res.locals.common = {
		google_signin_client_id: config.google_signin_client_id,
	}
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

app.get('/', function(req, res, next) {
	orm(req, res, next).getAllGyms((gyms) => 
		res.render('index.ejs', {
			gyms: gyms,
		})
	);
});

app.post('/login', function(req, res, next) {
	var idToken = req.body.id_token;
	var client = new OAuth2Client(config.clientId);
	client.verifyIdToken({
		idToken: idToken,
		audience: config.clientId,
	}).then(function(ticket) {
		var payload = ticket.getPayload();
		orm(req, res, next).upsertUser(payload['sub'], payload['name'], payload['picture'], (userId) => {
			req.session.userId = userId;
			res.sendStatus(200);
		});
	});
});

app.post('/logout', function(req, res) {
	req.session.userId = undefined;
	res.sendStatus(200);
});

app.get('/gym/:gym_path', function(req, res, next) {
	var gymPath = req.params.gym_path;
	orm(req, res, next).getGym(gymPath, function (gym) {
		if (gym === undefined) return res.sendStatus(404);
		this.getWalls(gymPath, (walls) =>
			this.getClimbedWalls(gymPath, (climbedWalls) =>
				res.render('gym.ejs', { gym, walls, climbedWalls})
			)
		);
	});
});

app.get('/gym/:gym_path/edit', function(req, res, next) {
	var gymPath = req.params.gym_path;
	if (!res.locals.common.user.is_verified) return res.redirect('/gym/'+gymPath);
	orm(req, res, next).getGym(gymPath, function (gym) {
		if (gym === undefined) return res.sendStatus(404);
		this.getWalls(gymPath, (walls) =>
			res.render('gym_edit.ejs', { gym, walls })
		);
	});
});

app.post('/gym/:gym_path/:wall_id/climb', function(req, res, next) {
	var gymPath = req.params.gym_path;
	var wallId = req.params.wall_id;
	var climbed = req.body.climbed === 'true';
	orm(req, res, next).setClimbed(gymPath, wallId, climbed);
});

app.post('/gym/:gym_path/edit/wall/:wall_id', function(req, res, next) {
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
		req.body.active === 'on',
	);
});

app.post('/gym/:gym_path/edit/new_wall', function(req, res, next) {
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
		req.body.active === 'on',
	);
});

app.get('/user/:user_id', function(req, res, next) {
	var userId = req.params.user_id;
	orm(req, res, next).getUser(userId, function(user) {
		if (user == undefined) return res.sendStatus(404);
		this.getUserNumClimbedWalls(userId, (numClimbedWalls) =>
			res.render('user.ejs', { user, numClimbedWalls })
		);
	});
});

app.post('/user/:user_id/edit', function(req, res, next) {
	if (!res.locals.common.user.is_admin) return res.sendStatus(403);
	var userId = req.params.user_id;
	var field = req.body.field;
	var value = req.body.value === 'true';
	var isAdmin;
	var isVerified;
	if (field === 'admin') {
		isAdmin = value;
		if (isAdmin) {
			isVerified = true;
		}
	} else if (field === 'verified') {
		isVerified = value;
		if (!isVerified) {
			isAdmin = false;
		}
	} else {
		return res.sendStatus(400);
	}
	orm(req, res, next).updateUserStatus(userId, isAdmin, isVerified);
})

module.exports = app;
