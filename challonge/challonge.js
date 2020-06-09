'use strict';
const fetch = require('node-fetch');
const fetchJson = require('fetch-json');

import Tournaments from './api/tournaments';
import Participants from './api/participants';
import Matches from './api/matches';

const CHALLONGE_API_BASE_URI = "https://api.challonge.com/v1/";
let _api_key = new WeakMap();

class ChallongeAPI {

	constructor(key) {
		_api_key = key;
	}

	request(method, uri, params, forceqs = false) {
		params['api_key'] = _api_key;
		const url = CHALLONGE_API_BASE_URI + uri;

		return forceqs
			? fetch(`${url}?${new URLSearchParams(params)}`, { method })
			: fetchJson.request(method, url, params);
	}
}

exports.withAPIKey = function withAPIKey(key) {
	const instance = new ChallongeAPI(key);
	instance.tournaments = new Tournaments(instance);
	instance.participants = new Participants(instance);
	instance.matches = new Matches(instance);

	return instance;
}
