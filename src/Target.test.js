const Target = require('./Target');
const Station = require('./Station');

const STATION_ID = 'Y230002001';
const DELAY = 15;
const DESCRIPTORS = {
	'son lit': 200,
	'le perron': 500,
	'la colline': 25000,
};
const FIRST_ENTRY_DATE = new Date(require('../test/mock/Y230002001-2019-12-20.json').data[0].date_obs);

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

test('Target finds no submerged landmark under first registered water height', () => {
	expect(subject.findSubmergedLandmarkForHeight(199)).toBeUndefined();
});

test('Target describes its future water height in human-readable terms', () => {
	return expect(subject.predictStatus()).resolves.toBe('L’eau recouvrira probablement le perron dans 15 minutes.');
});

test('Target describes its current water height in human-readable terms', () => {
	return expect(subject.inferStatus(FIRST_ENTRY_DATE)).resolves.toBe('L’eau recouvre probablement la colline actuellement.');
});

test('Target states if there have been changes in submerged landmarks', () => {
	return expect(subject.hasForeseeableChanges(FIRST_ENTRY_DATE)).resolves.toBe(true);
});
