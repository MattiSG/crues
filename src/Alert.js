const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
require('dotenv').config();


class Alert {
	constructor(recipients) {
		this.recipients = recipients;
	}

	sms(message) {
		let payload = new URLSearchParams();
		payload.append('phone', '');
		payload.append('message', message);
		payload.append('key', process.env.TEXTBELT_KEY);

		this.recipients.forEach(recipient => {
			payload.set('phone', recipient.replace('00', '+'));
			_sendSms(payload);
		});
	}
}

function _sendSms(parameters) {
	fetch('https://textbelt.com/text', {
		method: 'POST',
		body: parameters,
	}).then(res => res.json())
		.then(response => console.log(response));
}

module.exports = Alert;
