var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API', function() {

  var api = require('../').api('GOOD_TOKEN');
  var unauthApi = require('../').api('BAD_TOKEN');

  describe('authorization', function() {
    
    it('should fail with a 401 response status and message for an invalid api token', function(done) {
      var mockSession = mock.unauthorizedRequests['/apps']();
      unauthApi.apps(function(err, results) {
        should.exist(err);
        err.message.should.include('401');
        err.message.should.include('Access denied');
        mockSession.should.be.done;
        done();
      });
    });
    
    it('should succeed with a valid api token', function(done) {
      var mockSession = mock.authorizedRequests['/apps']();
      api.apps(function(err, results) {
        should.not.exist(err);
        should.exist(results);
        mockSession.should.be.done;
        done();
      });
    });
  });
});