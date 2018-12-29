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
		var thisOrm = this;
		conn.query(q, params, function(err, results, fields) {
			if (err) {
				console.error(err);
				thisOrm.res.sendStatus(500);
				return;
			}
			if (useSingleRow && results.length > 0) results = results[0];
			try {
				callback.bind(thisOrm)(results);
			} catch (e) {
				console.error(e);
				thisOrm.res.sendStatus(500);
			}
		});
	}

	getAllGyms(callback) {
		this.query(callback, 'SELECT * FROM gyms');
	}

	getGym(gymName, callback) {
		this.query(callback, 'SELECT * FROM gyms WHERE name = ?', [gymName], true);
	}

	getWalls(gymId, callback) {
		this.query(callback, 'SELECT * FROM walls WHERE gym_id = ?', [gymId]);
	}

	getClimbedWalls(gymId, callback) {
		this.query(callback, 'SELECT * FROM climbed_walls WHERE gym_id = ?', [gymId]);
	}
}

connect();

module.exports = () => new Orm(...arguments);
