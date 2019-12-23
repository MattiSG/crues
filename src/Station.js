const fetch = require('node-fetch');


class Station {
	constructor(id) {
		this.id = id;
	}

	getWaterHeight(atDate = new Date()) {
		return fetch(`https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?size=10&grandeur_hydro=H&code_entite=${this.id}`)
			.then(res => res.json())
			.then(json => this.findHeightAtDate(json.data, atDate));
	}

	/**
	 * @param  {Array} data  Measurement entries, ordered by descending date.
	 * @param  {Date}  [date]  The date at which the water value should be returned. Defaults to now.
	 * @return {Number}      Last known water height in the given dataset at the given date, in mm.
	 */
	findHeightAtDate(data, date = new Date()) {
		return data.find(entry => new Date(entry.date_obs) <= date).resultat_obs;
	}
}

module.exports = Station;
