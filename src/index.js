global.Station = require('./Station');
global.Target = require('./Target');
global.Alert = require('./Alert');

function check() {
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

	Promise.all([maison.predictStatus(), maison.inferStatus()])
		.then(([ prediction, inference ]) => {
			if (prediction != inference)
				alert.sms(prediction);
		});
}

check();
