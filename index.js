const Station = require('./src/Station');
const Target = require('./src/Target');
const Alert = require('./src/Alert');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
function check(req, res) {
	const stationPaulhan = new Station('Y230002001');

	const maison = new Target(stationPaulhan, 40, {
		'la plateforme': 3100,
		'les pieds du banc': 3600,
		'le premier muret': 4700,
		'la première marche de l’escalier': 4990,
		'le perron': 5950,
		'10 cm dans la maison': 6050,
	});

	const alert = new Alert(process.env.SMS_RECIPIENTS.split(';'));

	maison.hasForeseeableChanges().then(hasForeseeableChanges => {
		if (hasForeseeableChanges) {
			maison.predictStatus().then(prediction => {
				alert.sms(prediction);
				res.send(`Foreseeable change: ${prediction}. Notifying recipients.`);
			});
		} else {
			res.send('No foreseeable changes');
			console.log('No foreseeable changes');
		}
	});
}

module.exports = {
	check,
}
