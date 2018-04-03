'use strict';
import Request from 'request-promise-native';
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
		let options = {
			uri: CHALLONGE_API_BASE_URI + uri,
			method: method,
			json: true,
		}

		if (method==='GET' || method==='DELETE' || method==='PUT' || forceqs) options.qs = params;
		if (method==='POST') options.body = params;

		return Request(options);
	}
}

exports.withAPIKey = function withAPIKey(key) {
	let instance = new ChallongeAPI(key);
	instance.tournaments = new Tournaments(instance);
	instance.participants = new Participants(instance);
	instance.matches = new Matches(instance);
	return instance;
}
