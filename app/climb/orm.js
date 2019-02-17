var mysql = require('mysql');

var config = require('../config');

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

function getWhere(where) {
	if (!where) return {w: '', p: []};

	var wk = Object.keys(where);
	var ws = wk.map((key) => `${key}=?`);
	var w = `WHERE ${ws.join(' AND ')}`;
	var p = wk.map((key) => where[key]);

	return {w,p};
}

class Orm {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	}

	select(options) {
		var table = options.table;
		var where = getWhere(options.where);
		var parts = [
			'SELECT',
			(options.columns || ['*']).join(','),
			'FROM',
			table,
			where.w,
			options.suffix,
		];
		var q = parts.filter(Boolean).join(' ');
		return new Promise((resolve, reject) => {
			conn.query(q, where.p, function(err, results, fields) {
				if (err) return reject(err);
				resolve(results, fields);
			});
		})
			.catch(this.next);
	}

	query(callback, q, params, useSingleRow, useSingleCol) {
		var thisOrm = this;
		conn.query(q, params, function(err, results, fields) {
			if (err) {
				console.log(err);
				throw new Error(err);
			}
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

	update(q, params) {
		this.query((results) => this.res.sendStatus(200), q, params);
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

	updateGym(gymPath, name, description) {
		this.update('UPDATE gyms SET name = ?, description = ? WHERE path = ?', [name, description, gymPath]);
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
}

connect();

module.exports = function () { return new Orm(...arguments); };
