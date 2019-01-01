var express = require('express');
var OAuth2Client = require('google-auth-library').OAuth2Client;

var orm = require('./orm');
var config = require('./config');

var app = express.Router();

app.use(function(req, res, next) {
	req.common = {
		google_signin_client_id: config.google_signin_client_id,
	}
	var userId = req.session.userId;
	if (userId !== undefined) {
		orm(req, res, next).getUser(userId, function(user) {
			req.common.user = user;
			next();
		});
	} else {
		req.common.user = {};
		next();
	}
});

app.get('/', function(req, res, next) {
	orm(req, res, next).getAllGyms((gyms) => 
		res.render('index.ejs', {
			common: req.common,
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
	var common = req.common;
	orm(req, res, next).getGym(gymPath, function (gym) {
		if (gym === undefined) {
			res.sendStatus(404);
		} else {
			this.getWalls(gymPath, (walls) =>
				this.getClimbedWalls(gymPath, (climbedWalls) =>
					res.render('gym.ejs', { common, gym, walls, climbedWalls})
				)
			);
		}
	});
});

app.post('/gym/:gym_path/:wall_id/climb', function(req, res, next) {
	var gymPath = req.params.gym_path;
	var wallId = req.params.wall_id;
	var climbed = req.body.climbed === 'true';
	orm(req, res, next).setClimbed(gymPath, wallId, climbed);
});

app.post('/gym/:gym_path/:wall_id/edit', function(req, res, next) {
	if (!req.common.user.is_verified) return res.sendStatus(403);
	var gymPath = req.params.gym_path;
	var wallId = req.params.wall_id;
	orm(req, res, next).editWall(
		gymPath,
		wallId,
		req.body.name,
		req.body.difficulty,
		req.body.location,
		req.body.date,
		req.body.setter,
		req.body.color,
		req.body.active === 'on',
	);
});

app.post('/gym/:gym_path/new', function(req, res, next) {
	if (!req.common.user.is_verified) return res.sendStatus(403);
	var gymPath = req.params.gym_path;
	orm(req, res, next).createWall(
		gymPath,
		req.body.name,
		req.body.difficulty,
		req.body.location,
		req.body.date,
		req.body.setter,
		req.body.color,
		req.body.active === 'on',
	);
});

module.exports = app;
