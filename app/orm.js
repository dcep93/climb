var mysql = require('mysql');

var config = require('./config');

var dbConfig = {
	host: config.mysql_host || '127.0.0.1',
	database: config.mysql_database || 'climb',
	user: 'root',
	password: config.mysql_password,
};
var conn;

function connect() {
	conn = mysql.createConnection(dbConfig);
	conn.connect(function(err) {
		if (err) {
			console.log('db connection error', err);
			setTimeout(connect, 1000);
		}
	});
	conn.on('error', function(err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			setTimeout(connect, 1000);
		} else {
			throw err;
		}
	});
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
			if (thisOrm.err(q, err)) return;
			if (callback === undefined) return;
			if (useSingleCol && fields.length > 0) results = results.map((row) => row[fields[0].name]);
			if (useSingleRow) results = results[0];
			try {
				callback.bind(thisOrm)(results);
			} catch (e) {
				thisOrm.next(err);
			}
		});
	}

	err(q, err) {
		var errF = this.errF;
		this.errF = undefined;

		if (err) {
			if (errF !== undefined) {
				errF.bind(this)(q, err);
			} else {
				console.error(q);
				this.next(err);
			}
			return true;
		}

		return false
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

	getWalls(gymPath, callback) {
		this.query(callback, 'SELECT * FROM walls WHERE gym_path = ? ORDER BY id DESC', [gymPath]);
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
			this.req.session.climbed[wallId] = active;
			this.res.sendStatus(200);
		}
	}

	insert(callback, q, params) {
		this.query((packet) => callback.bind(this)(packet.insertId), q, params);
	}

	upsertUser(googleId, email, name, image, callback) {
		this.insert(callback, 'INSERT INTO users (google_id, email, name, image) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=?, image=?', [googleId, email, name, image, name, image]);
	}

	getUser(userId, callback) {
		this.query(callback, 'SELECT * FROM users WHERE id = ?', [userId], true);
	}

	editWall(gymPath, wallId, name, difficulty, location, date, setter, color, active) {
		this.update(
			'UPDATE walls SET name = ?, difficulty = ?, location = ?, date = ?, setter = ?, color = ?, active = ? WHERE gym_path = ? and id = ?',
			[name, difficulty, location, date, setter, color, active, gymPath, wallId]
		);
	}

	createWall(gymPath, name, difficulty, location, date, setter, color, active) {
		this.update(
			'INSERT INTO walls (gym_path, name, difficulty, location, date, setter, color, active) VALUES (?,?,?,?,?,?,?,?)',
			[gymPath, name, difficulty, location, date, setter, color, active]
		);
	}

	getUserNumClimbedWalls(userId, callback) {
		this.query(callback, 'SELECT COUNT(*) FROM climbed_walls WHERE active and user_id = ?', [userId], true, true);
	}

	updateUserStatus(userId, isAdmin, isVerified) {
		var updateStrings = [];
		var parameters = [];
		if (isAdmin !== undefined) {
			updateStrings.push('is_admin = ?');
			parameters.push(isAdmin);
		}
		if (isVerified !== undefined) {
			updateStrings.push('is_verified = ?');
			parameters.push(isVerified);
		}
		var q = updateStrings.join(', ')
		parameters.push(userId);
		this.update('UPDATE users SET '+q+' WHERE id = ?', parameters);
	}

	newGym(path, name, description, callback) {
		this.query(callback, 'INSERT INTO gyms (path, name, description) VALUES (?,?,?)', [path, name, description]);
	}

	setErrF(errF) {
		this.errF = errF;
		return this;
	}

	updateGym(gymPath, name, description) {
		this.update('UPDATE gyms SET name = ?, description = ? WHERE path = ?', [name, description, gymPath]);
	}

	getWall(gymPath, wallId, callback) {
		this.query(callback, 'SELECT * FROM walls WHERE gym_path = ? and id = ?', [gymPath, wallId], true);
	}

	getWallMedia(wallId, callback) {
		this.query(callback, 'SELECT * FROM wall_media WHERE wall_id = ? ORDER BY id DESC', [wallId]);
	}

	createWallMedia(wallId, gcsPath, userId, fileSize, mime, callback) {
		this.insert(callback, 'INSERT INTO wall_media (wall_id, gcs_path, user_id, file_size, mime) VALUES (?,?,?,?,?)', [wallId, gcsPath, userId, fileSize, mime]);
	}

	updateWallMedia(id, updates, callback) {
		var updateStringParts = [];
		var params = [];
		for (var key in updates) {
			updateStringParts.push(`${key}=?`);
			params.push(updates[key]);
		}
		var updateString = updateStringParts.join(',');
		params.push(id);
		var q = `UPDATE wall_media SET ${updateString} WHERE id = ?`;
		this.query(callback, q, params);
	}

	getLatestUsers(callback) {
		this.query(callback, 'SELECT * FROM users ORDER BY id DESC LIMIT 100');
	}
}

connect();

module.exports = function () { return new Orm(...arguments); };
