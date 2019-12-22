const fetch = require('node-fetch');


class Station {
	constructor(id) {
		this.id = id;
	}

	getWaterHeight() {
		return fetch(`http://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?size=1&code_entite=${this.id}`)
			.then(res => res.json())
			.then(json => json.data[0].resultat_obs);
	}
}

module.exports = Station;
