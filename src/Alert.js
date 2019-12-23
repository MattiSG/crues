require('dotenv').config();

const ovh = require('ovh')({
	appKey: process.env.OVH_APP_KEY,
	appSecret: process.env.OVH_APP_SECRET,
	consumerKey: process.env.OVH_CONSUMER_KEY,
});


class Alert {
	constructor(recipients) {
		this.recipients = recipients;
	}

	sms(message) {
		ovh.request('POST', `/sms/${process.env.OVH_SERVICE_NAME}/jobs`, {
			message,
			receivers: this.recipients,
		}, console.log.bind(console));
	}
}

module.exports = Alert;
