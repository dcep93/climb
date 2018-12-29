var express = require('express');
var OAuth2Client = require('google-auth-library').OAuth2Client;

var orm = require('./orm');
var config = require('./config');

var app = express.Router();

app.get('/', function(req, res) {
	orm(req, res).getAllGyms((gyms) => 
		res.render('index.ejs', {
			google_signin_client_id: config.google_signin_client_id,
			gyms: gyms,
		})
	);
});

app.post('/login', function(req, res) {
	var idToken = req.body.id_token;
	var client = new OAuth2Client(config.clientId);
	client.verifyIdToken({
		idToken: idToken,
		audience: config.clientId,
	}).then(function(ticket) {
		var payload = ticket.getPayload();
		res.send({
			userId: payload['sub'],
			name: payload['name'],
			image: payload['picture'],
		});
	});
});

app.post('/logout', function(req, res) {
	res.sendStatus(200);
});

app.get('/gym/:gym', function(req, res) {
	var gymName = req.params.gym;
	orm(req, res).getGym(gymName, function (gym) {
		if (gym === null) {
			res.redirect('/');
		} else {
			this.getWalls(gym.id, (walls) =>
				this.getClimbedWalls(gym.id, (climbedWalls) =>
					res.render('gym.ejs', { gym, walls, climbedWalls})
				)
			);
		}
	});
});

module.exports = app;
