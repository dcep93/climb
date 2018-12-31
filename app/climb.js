var express = require('express');
var OAuth2Client = require('google-auth-library').OAuth2Client;

var orm = require('./orm');
var config = require('./config');

var app = express.Router();

app.get('/', function(req, res, next) {
	orm(req, res, next).getAllGyms((gyms) => 
		res.render('index.ejs', {
			isSignedIn: req.session.userId !== undefined,
			google_signin_client_id: config.google_signin_client_id,
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
		if (gym === null) {
			res.sendStatus(404);
		} else {
			this.getWalls(gym.id, (walls) => 
				this.getClimbedWalls(gymPath, (climbedWalls) =>
					res.render('gym.ejs', { gym, walls, climbedWalls})
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

module.exports = app;
