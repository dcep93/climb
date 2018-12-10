var express = require('express');

var orm = require('./orm');

var app = express.Router();

app.get('/', function(req, res) {
	orm(req, res).getAllGyms((gyms) => 
		res.render('index.ejs', {
			gyms: gyms,
		})
	);
});

app.get('/gym/:gym', function(req, res) {
	var gymName = req.params.gym;
	orm(req, res).getGym(gymName, (gym) => {
		if (gym === null) {
			res.redirect('/');
		} else {
			orm(req, res).getWalls(gym.id, (walls) =>
				res.render('gym.ejs', {
					gym: gym,
					walls: walls,
				})
			);
		}
	});
});

module.exports = app;
