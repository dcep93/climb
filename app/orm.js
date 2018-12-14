var dummy = require('./dummy');

class Orm {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	getAllGyms(callback) {
		callback([dummy.dpb]);
	}

	getGym(gymName, callback) {
		callback(dummy.dpb);
	}

	getWalls(gymId, callback) {
		callback(dummy.walls);
	}

	getClimbedWalls(gymId, callback) {
		callback(dummy.climbedWalls);
	}
}

module.exports = () => new Orm(...arguments);
