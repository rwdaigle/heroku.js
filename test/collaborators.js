var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps/:name/collaborators', function() {

    beforeEach(function() {
      mock.get('/apps/name/collaborators', 'list-collaborators.json');
    });
    
    it('should not expose an error', function(done) {
      api.collaborators.list('name', function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all app collaborators', function(done) {
      api.collaborators.list('name', function(err, collaborators) {
        should.exist(collaborators);
        should.exist(collaborators[0].email, 'Collaborator response should include email');
        should.exist(collaborators[0].access, 'Collaborator response should include access role');
        done();
      });
    });
  });
});