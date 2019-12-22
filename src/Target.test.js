const Target = require('./Target');
const Station = require('./Station');


const STATION_ID = 'Y230002001';
const DELAY = 40;
const DESCRIPTORS = {
	'Hauteur normale': 0,
	'Perron inondé': 500,
	'Arche de Noé': 25000,
}


test('Target constructor', () => {
	expect(new Target(new Station(STATION_ID), DELAY, DESCRIPTORS)).toBeInstanceOf(Target);
});

test('Target describes its water height in human-readable terms', () => {
	return expect(new Target(new Station(STATION_ID), DELAY, DESCRIPTORS).getStatus()).resolves.toBe('Perron inondé dans 40 minutes');
});
