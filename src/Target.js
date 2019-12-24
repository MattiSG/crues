class Target {
	constructor(station, minutesDelay, landmarks) {
		this.station = station;
		this.landmarks = landmarks;
		this.minutesDelay = minutesDelay;
	}

	predictStatus(reference = new Date()) {
		return this.station.getWaterHeight(reference).then(height => {
			return `L’eau recouvrira probablement ${this.findSubmergedLandmarkForHeight(height)} dans ${this.minutesDelay} minutes.`;
		});
	}

	inferStatus(reference = new Date()) {
		return this.getPastHeight(reference).then(height => {
			return `L’eau recouvre probablement ${this.findSubmergedLandmarkForHeight(height)} actuellement.`;
		});
	}

	getPastHeight(reference = new Date()) {
		const nowWithDelay = new Date(reference.getTime() - this.minutesDelay * 60 * 1000);

		return this.station.getWaterHeight(nowWithDelay);
	}

	findSubmergedLandmarkForHeight(height) {
		let highestSubmergedLandmark = '';

		Object.keys(this.landmarks).forEach(landmark => {
			if (this.landmarks[landmark] <= height)
				highestSubmergedLandmark = landmark;
		});

		return highestSubmergedLandmark;
	}

	hasForeseeableChanges(reference = new Date()) {
		return Promise.all([ this.station.getWaterHeight(reference), this.getPastHeight(reference) ])
			.then(([ currentHeight, pastHeight ]) => {
				return this.findSubmergedLandmarkForHeight(currentHeight) != this.findSubmergedLandmarkForHeight(pastHeight);
			});
	}
}


module.exports = Target;
