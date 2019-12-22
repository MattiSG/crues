const Target = require('./Target');
const Station = require('./Station');


const STATION_ID = 'Y230002001';
const DELAY = 40;
const DESCRIPTORS = {
	'son lit': 0,
	'le perron': 500,
	'la colline': 25000,
}


test('Target constructor', () => {
	expect(new Target(new Station(STATION_ID), DELAY, DESCRIPTORS)).toBeInstanceOf(Target);
});

test('Target describes its water height in human-readable terms', () => {
	return expect(new Target(new Station(STATION_ID), DELAY, DESCRIPTORS).getStatus()).resolves.toBe('L’eau recouvrira probablement le perron dans 40 minutes');
});
