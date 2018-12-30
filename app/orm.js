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

	err(e) {
		console.error(e);
		this.res.status(500).send(e);
	}

	query(callback, q, params, useSingleRow, useSingleCol) {
		var thisOrm = this;
		conn.query(q, params, function(err, results, fields) {
			if (err) {
				return thisOrm.err(err);
			}
			if (useSingleCol && results.length > 0) results = results.map((row) => row[fields[0]]);
			if (useSingleRow && results.length > 0) results = results[0];
			try {
				callback.bind(thisOrm)(results);
			} catch (e) {
				return thisOrm.err(e);
			}
		});
	}

	update(q, params) {
		this.query((results) => this.res.sendStatus(200), q, params);
	}

	getAllGyms(callback) {
		this.query(callback, 'SELECT * FROM gyms');
	}

	getGym(gymPath, callback) {
		this.query(callback, 'SELECT * FROM gyms WHERE path = ?', [gymPath], true);
	}

	getWalls(gymId, callback) {
		this.query(callback, 'SELECT * FROM walls WHERE gym_id = ?', [gymId]);
	}

	getClimbedWalls(gymPath, callback) {
		var userId = this.req.session.userId;
		if (userId !== undefined) {
			this.query(callback, 'SELECT id FROM climbed_walls WHERE gym_path = ? AND user_id = ?', [gymPath, userId], false, true);
		} else {
			var climbed = this.req.session.climbed;
			if (climbed !== undefined) {
				var walls = [];
				for (var wallId in climbed) {
					if (climbed[wallId] === 'true') walls.push(Number.parseInt(wallId));
				}
				callback(walls);
			} else {
				callback([]);
			}
		}
	}

	setClimbed(gymPath, wallId, climbed) {
		var userId = this.req.session.userId;
		if (userId !== undefined) {
			this.update('UPDATE climbed_walls SET active = ? WHERE gym_path = ? AND wall_id = ?', [climbed, gymPath, wallId]);
		} else {
			if (this.req.session.climbed === undefined) this.req.session.climbed = {};
			this.req.session.climbed[wallId] = climbed;
			this.res.sendStatus(200);
		}
	}

	upsertUser(googleId, name, image, callback) {
		this.query((packet) => callback(packet.insertId), 'REPLACE INTO users (google_id, name, image) VALUES (?,?,?)', [googleId, name, image]);
	}
}

connect();

module.exports = function () { return new Orm(...arguments); };
