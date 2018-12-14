var dpb = {
	'name': 'Dogpatch Boulders',
	'path': 'dogpatch_boulders',
	'description': 'I am a description',
};

var walls = [
	{
		'id': 123,
		'name': 'Climb 123',
		'difficulty': 'V1',
		'location': 'Wave',
		'date': '2018/12/13',
		'setter': 'Dan',
		'active': true,
		'color': 'red',
	},
	{
		'id': 456,
		'name': 'Climb 456',
		'difficulty': 'V4',
		'location': 'Barrel',
		'date': '2018/12/13',
		'setter': 'Eric',
		'active': true,
		'color': 'blue',
	},
];

var climbedWalls = [
	123,
];

module.exports = {dpb: dpb, walls: walls, climbedWalls: climbedWalls};
