var mysql = require('mysql');

var config = require('./config');

var conn;

function connect() {
	conn = mysql.createConnection({
		host: config.mysql_host || '127.0.0.1',
		database: config.mysql_database || 'climb',
		user: 'root',
		password: config.mysql_password,
	});
	conn.connect();
}

class Orm {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	query(callback, q, params, useSingleRow) {
		conn.query(q, params, function(err, results, fields) {
			if (err) {
				console.error(err);
				this.res.sendStatus(500);
				return;
			}
			if (useSingleRow && results.length > 0) results = results[0];
			callback.bind(this)(results);
		});
	}

	getAllGyms(callback) {
		this.query(callback, 'SELECT * FROM gyms');
	}

	getGym(gymName, callback) {
		this.query(callback, 'SELECT * FROM gyms WHERE name = ?', gymName, true);
	}

	getWalls(gymId, callback) {
		this.query(callback, 'SELECT * FROM walls WHERE gym_id = ?', gymId);
	}

	getClimbedWalls(gymId, callback) {
		this.query(callback, 'SELECT * FROM climbed_walls WHERE gym_id = ?', gymId);
	}
}

connect();

module.exports = () => new Orm(...arguments);
