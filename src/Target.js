class Target {
	constructor(station, minutesDelay, descriptors) {
		this.station = station;
		this.descriptors = descriptors;
		this.minutesDelay = minutesDelay;
	}

	getStatus() {
		return this.station.getWaterHeight().then(height => {
			let description = '';

			Object.keys(this.descriptors).forEach(descriptor => {
				if (this.descriptors[descriptor] <= height)
					description = descriptor;
			});

			return `${description} dans ${this.minutesDelay} minutes`;
		});
	}
}


module.exports = Target;
