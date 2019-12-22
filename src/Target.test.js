const Target = require('./Target');
const Station = require('./Station');

const STATION_ID = 'Y230002001';
const DELAY = 40;
const DESCRIPTORS = {
	'son lit': 200,
	'le perron': 500,
	'la colline': 25000,
};

const fetch = require('node-fetch');
jest.mock('node-fetch');
fetch.mockImplementation(() => Promise.resolve({
	json: () => require('../test/mock/Y230002001-2019-12-20.json')
}));


let subject;

beforeEach(() => {
	subject = new Target(new Station(STATION_ID), DELAY, DESCRIPTORS);
});


test('Target constructor', () => {
	expect(subject).toBeInstanceOf(Target);
});

test('Target describes its future water height in human-readable terms', () => {
	return expect(subject.predictStatus()).resolves.toBe('L’eau recouvrira probablement le perron dans 40 minutes');
});
