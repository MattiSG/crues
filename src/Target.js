class Target {
	constructor(station, minutesDelay, landmarks) {
		this.station = station;
		this.landmarks = landmarks;
		this.minutesDelay = minutesDelay;
	}

	predictStatus() {
		return this.station.getWaterHeight().then(height => {
			return `L’eau recouvrira probablement ${this.findSubmergedLandmarkForHeight(height)} dans ${this.minutesDelay} minutes.`;
		});
	}

	inferStatus(reference = new Date()) {
		const nowWithDelay = new Date(reference.getTime() - this.minutesDelay * 60 * 1000);

		return this.station.getWaterHeight(nowWithDelay).then(height => {
			return `L’eau recouvre probablement ${this.findSubmergedLandmarkForHeight(height)} actuellement.`;
		});
	}

	findSubmergedLandmarkForHeight(height) {
		let highestSubmergedLandmark = '';

		Object.keys(this.landmarks).forEach(landmark => {
			if (this.landmarks[landmark] <= height)
				highestSubmergedLandmark = landmark;
		});

		return highestSubmergedLandmark;
	}
}


module.exports = Target;
