const Station = require('./Station');

const ID = 'Y230002001';

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

test('Station returns its height', () => {
	return expect(subject.getWaterHeight()).resolves.toBe(4002);
});
