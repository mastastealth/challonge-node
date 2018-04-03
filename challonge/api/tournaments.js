'use strict'

let _api = new WeakMap();

export default class Tournaments {

	constructor(parent) {
		_api = parent;
	}

	index(params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments.json', params)
			.then(function (response) {
				//remove 1st layer "tournament"
				resolve(response.map(function(obj) {
					return obj.tournament;
				}));
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	// https://api.challonge.com/v1/documents/tournaments/create
	create(nameOrParams, url, tournament_type = 'single elimination') {
		// Either pass in the name/url and optional tournament type, or pass in the whole param object
		let params = (nameOrParams.hasOwnProperty('tournament')) ? nameOrParams : {
			name: nameOrParams,
			tournament_type: tournament_type,
			url: url,
		};

		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments.json', params)
			.then(function (response) {
				resolve(response.tournament);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//https://api.challonge.com/v1/documents/tournaments/show
	show(tid, params={}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'.json', params)
			.then(function (response) {
				resolve(response.tournament);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//http://api.challonge.com/v1/documents/tournaments/update
	update(tid, params) {
		return new Promise((resolve, reject) => {
			_api.request('PUT', 'tournaments/'+tid+'.json', params)
			.then(function (response) {
				resolve(response.tournament);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	destroy(tid) {
		let params = {};

		return new Promise((resolve, reject) => {
			_api.request('DELETE', 'tournaments/'+tid+'.json', params)
			.then(function (response) {
				response.tournament.id === tid ? resolve() : reject('Mismatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	start(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/start.json', params)
			.then(function (response) {
				response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	reset(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/reset.json', params)
			.then(function (response) {
				response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	finalize(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/finalize.json', params, true)
			.then(function (response) {
				response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	// https://api.challonge.com/v1/documents/tournaments/process_check_ins
	proc_checkin(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/process_check_ins.json', params)
			.then(function (response) {
				response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	// https://api.challonge.com/v1/documents/tournaments/abort_check_ins
	abort_checkin(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/abort_check_ins.json', params)
			.then(function (response) {
				response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}
}
