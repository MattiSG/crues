class Target {
	constructor(station, minutesDelay, landmarks) {
		this.station = station;
		this.landmarks = landmarks;
		this.minutesDelay = minutesDelay;
	}

	getStatus() {
		return this.station.getWaterHeight().then(height => {
			let highestSubmergedLandmark = '';

			Object.keys(this.landmarks).forEach(landmark => {
				if (this.landmarks[landmark] <= height)
					highestSubmergedLandmark = landmark;
			});

			return `L’eau recouvrira ${highestSubmergedLandmark} dans ${this.minutesDelay} minutes`;
		});
	}
}


module.exports = Target;
