const assert = require('chai').assert;
const expect = require('chai').expect;
import ChallongeAPI from '../challonge/challonge';

const challonge = ChallongeAPI.withAPIKey('<API_KEY>');

describe('Tournament', function() {
	let tid = '';

	describe('#create()', function() {
		it('should return success with tournament id', function() {
			return challonge.tournaments.create('mastatest', 'mastatest_url').then(function(tournament) {
				expect(tournament).to.have.property('id');
				tid = tournament.id;
			});
		});
	});

	describe('#index()', function() {
		it('should return tournament list containing latest tournament id', function() {
			return challonge.tournaments.index().then(function(tournaments) {
				// In case you already have tournaments under the user,
				// We'll reverse the list so the one we just added (last) is first in array
				expect( tournaments.reverse()[0].id ).to.eql(tid);
			});
		});
	})

	describe('#show()', function() {
		it('should return valid tournament object', function() {
			return challonge.tournaments.show(tid).then(function(tournament) {
				expect(tournament.id).to.equal(tid);
			});
		});
	});

	describe('#update()', function() {
		it('should return correct updated tournament name', function() {
			let params = {
				tournament: {
					name: 'update_test',
				}
			}
			return challonge.tournaments.update(tid, params).then(function(tournament) {
				expect(tournament.name).to.equal('update_test');
			});
		});
	});

	describe('#start()', function() {
		it('should reject due to not enough participants', function() {
			return challonge.tournaments.start(tid).then(function(tournament) {
				throw new Error('Expected to not start, not enough participants');
			}, function rejected(error) {
				assert(true);
			});
		});
	});

	describe('#reset()', function() {
		it('should reject due to finalized/incomplete tournament', function() {
			return challonge.tournaments.reset(tid).then(function(tournament) {
				throw new Error('Expected to not reset, must be in progress or complete');
			}, function rejected(error) {
				assert(true);
			});
		});
	});

	describe('#delete()', function() {
		it('should resolve', function() {
			return challonge.tournaments.destroy(tid);
		});
	});

});
