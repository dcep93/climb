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

function getCons(where) {
	var wk = Object.keys(where || {});
	var w = wk.map((key) => `${key}=?`).join(' AND ')
	var p = wk.map((key) => where[key]);

	return {w,p};
}

class Orm {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	}

	select = (table, where, options) => {
		var w = getCons(where);
		var options = options || {};
		var parts = [
			'SELECT',
			(options.columns || ['*']).join(','),
			'FROM',
			table,
			w.w ? 'WHERE' : null,
			w.w,
			options.suffix,
		];
		return this.query(parts, w.p);
	}

	update = (table, updates, where) => {
		var w = getCons(where);
		var u = getCons(updates);
		var parts = [
			'UPDATE',
			table,
			'SET',
			u.w,
			'WHERE',
			w.w,
		];
		return this.query(parts, u.p.concat(w.p));
	}

	insert = (table, inserts, suffix) => {
		var keys = Object.keys(inserts);
		var values = keys.map((key) => inserts[key]);
		var s = suffix || {};
		var parts = [
			'INSERT INTO',
			table,
			`(${keys.join(',')})`,
			'VALUES',
			`(${values.join(',')})`,
			s.q,
		];
		return this.query(parts, i.p.concat(s.p));
	}

	query = (parts, params) => {
		var queryString = parts.filter(Boolean).join(' ');
		return new Promise((resolve, reject) =>
			conn.query(queryString, params, function(err, results, fields) {
				if (err) return reject(err);
				resolve(results, fields);
			})
		)
			.catch(this.next);
	}
}

connect();

module.exports = function () { return new Orm(...arguments); };
