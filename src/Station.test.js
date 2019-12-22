const Station = require('./Station');

const ID = 'Y230002001';


test('Station constructor', () => {
	expect(new Station(ID)).toBeInstanceOf(Station);
});

test('Station returns its height', () => {
	return expect(new Station(ID).getWaterHeight()).resolves.toBe(4002);
});
