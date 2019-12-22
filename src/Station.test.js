const Station = require('./Station');

const ID = 'Y230002001';
const FIRST_ENTRY_DATE = new Date(require('../test/mock/Y230002001-2019-12-20.json').data[0].date_obs);

const fetch = require('node-fetch');
jest.mock('node-fetch');
fetch.mockImplementation(() => Promise.resolve({
	json: () => require('../test/mock/Y230002001-2019-12-20.json')
}));


let subject;

beforeEach(() => {
	subject = new Station(ID);
});


test('Station constructor', () => {
	expect(subject).toBeInstanceOf(Station);
});

test('Station returns its current water height', () => {
	return expect(subject.getWaterHeight()).resolves.toBe(3336);
});

test('Station returns its past water height', () => {
	const twentyMinutesBeforeFirst = new Date(FIRST_ENTRY_DATE.getTime() - 15 * 60 * 1000);

	return expect(subject.getWaterHeight(twentyMinutesBeforeFirst)).resolves.toBe(26000);
});
