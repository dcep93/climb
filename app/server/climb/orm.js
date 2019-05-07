const mysql = require("mysql");

const config = require("../../config");

const db_config = {
	host: config.mysql_host || "127.0.0.1",
	database: config.mysql_database || "climb",
	user: "root",
	password: config.mysql_password
};

var conn;

function connect() {
	conn = mysql.createConnection(db_config);
	conn.connect(function(err) {
		if (err) {
			console.log("db connection error", err);
			setTimeout(connect, 1000);
		}
	});
	conn.on("error", function(err) {
		console.log("db error", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			setTimeout(connect, 1000);
		} else {
			throw err;
		}
	});
}

function getCons(where) {
	const wk = Object.keys(where || {});
	const w = wk.map(
		key => `${key}${Array.isArray(where[key]) ? " IN (?)" : "=?"}`
	);
	const p = wk.map(key => where[key]);
	console.log(JSON.stringify(p));

	return { w, p };
}

function select(table, where, _options) {
	const options = _options || {};
	const w = getCons(where);
	const parts = [
		"SELECT",
		(options.columns || ["*"]).join(","),
		"FROM",
		table,
		w.w.length > 0 ? "WHERE" : null,
		w.w.join(" AND "),
		options.suffix
	];
	return query(parts, w.p);
}

function update(table, updates, where) {
	const w = getCons(where);
	const u = getCons(updates);
	const parts = [
		"UPDATE",
		table,
		"SET",
		u.w.join(","),
		"WHERE",
		w.w.join(" AND ")
	];
	return query(parts, u.p.concat(w.p));
}

function insert(table, inserts, suffix) {
	const keys = Object.keys(inserts);
	const values = keys.map(key => inserts[key]);
	const s = suffix || { q: "", p: [] };
	const parts = [
		"INSERT INTO",
		table,
		`(${keys.join(",")})`,
		"VALUES",
		`(${values.map(value => "?").join(",")})`,
		s.q
	];
	return query(parts, values.concat(s.p)).then(packet => packet.insertId);
}

function query(parts, params) {
	const query_string = parts.filter(Boolean).join(" ");
	console.log(query_string, params);
	return new Promise((resolve, reject) =>
		conn.query(query_string, params, function(err, results, fields) {
			if (err) return reject(err);
			resolve(results, fields);
		})
	);
}

function castTransforms(row, transforms) {
	const rval = {};
	for (let t in transforms) {
		rval[t] = transforms[t](row[t]);
	}
	return rval;
}

function cast(arr, transforms) {
	return arr.map(row =>
		Object.assign({}, row, castTransforms(row, transforms))
	);
}

function castUsers(users) {
	return cast(users, { is_admin: Boolean, is_verified: Boolean });
}

connect();

module.exports = { select, update, insert, cast, castUsers };
