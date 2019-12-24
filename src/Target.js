class Target {
	constructor(station, minutesDelay, landmarks) {
		this.station = station;
		this.landmarks = landmarks;
		this.minutesDelay = minutesDelay;
	}

	predictStatus(reference = new Date()) {
		return this.station.getWaterHeight(reference).then(height => {
			const highestSubmergedLandmark = this.findSubmergedLandmarkForHeight(height);
			const message = highestSubmergedLandmark
				? `recouvrira probablement ${highestSubmergedLandmark}`
				: 'sera probablement dans son lit';

			return `L’eau ${message} dans ${this.minutesDelay} minutes.`;
		});
	}

	inferStatus(reference = new Date()) {
		return this.getPastHeight(reference).then(height => {
			const highestSubmergedLandmark = this.findSubmergedLandmarkForHeight(height);
			const message = highestSubmergedLandmark
				? `recouvre probablement ${highestSubmergedLandmark}`
				: 'est probablement dans son lit';

			return `L’eau ${message} actuellement.`;
		});
	}

	getPastHeight(reference = new Date()) {
		const nowWithDelay = new Date(reference.getTime() - this.minutesDelay * 60 * 1000);

		return this.station.getWaterHeight(nowWithDelay);
	}

	findSubmergedLandmarkForHeight(height) {
		let highestSubmergedLandmark;

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
