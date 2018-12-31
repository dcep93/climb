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
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	}

	query(callback, q, params, useSingleRow, useSingleCol) {
		var thisOrm = this;
		conn.query(q, params, function(err, results, fields) {
			if (err) {
				console.error(q);
				return thisOrm.next(err);
			}
			if (useSingleCol && results.length > 0) results = results.map((row) => row[fields[0].name]);
			if (useSingleRow && results.length > 0) results = results[0];
			try {
				callback.bind(thisOrm)(results);
			} catch (e) {
				console.error(q);
				return thisOrm.next(e);
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
			this.query(callback, 'SELECT wall_id FROM climbed_walls WHERE gym_path = ? AND user_id = ? AND active', [gymPath, userId], false, true);
		} else {
			var climbed = this.req.session.climbed;
			if (climbed !== undefined) {
				var walls = [];
				for (var wallId in climbed) {
					if (climbed[wallId]) walls.push(Number.parseInt(wallId));
				}
				callback(walls);
			} else {
				callback([]);
			}
		}
	}

	setClimbed(gymPath, wallId, active) {
		var userId = this.req.session.userId;
		if (userId !== undefined) {
			this.update('INSERT INTO climbed_walls (active, gym_path, wall_id, user_id) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE active = ?', [active, gymPath, wallId, userId, active]);
		} else {
			if (this.req.session.climbed === undefined) this.req.session.climbed = {};
			this.req.session.climbed[wallId] = climbed;
			this.res.sendStatus(200);
		}
	}

	upsertUser(googleId, name, image, callback) {
		this.query((packet) => callback(packet.insertId), 'INSERT INTO users (google_id, name, image) VALUES (?,?,?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=?, image=?', [googleId, name, image, name, image]);
	}

	setAdmin(userId) {
		this.update('UPDATE users SET is_admin = true, is_verified = true WHERE id = ?' [userId]);
	}
}

connect();

module.exports = function () { return new Orm(...arguments); };
