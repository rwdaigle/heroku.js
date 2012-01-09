var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API', function() {

  var api = require('../').api('GOOD_TOKEN');
  var unauthApi = require('../').api('BAD_TOKEN');

  describe('authorization', function() {
    
    it('should fail with a 401 response status and message for an invalid api token', function(done) {
      var mockSession = mock.unauthorizedRequest('/apps');
      unauthApi.apps(function(err, apps) {
        should.exist(err, 'Should expose an error');
        err.message.should.include('401');
        err.message.should.include('Access denied');
        mockSession.should.be.done;
        done();
      });
    });
    
    it('should succeed with a valid api token', function(done) {
      var mockSession = mock.authorizedRequests['/apps']();
      api.apps(function(err, apps) {
        should.not.exist(err);
        should.exist(apps);
        mockSession.should.be.done;
        done();
      });
    });
  });

  describe('error handling', function() {
    
    it('should fail with a 402 response status and message when payment is required', function(done) {
      var mockSession = mock.failedRequest('/apps', 402, 'Payment required');
      api.apps(function(err, apps) {
        should.exist(err, 'Should expose an error');
        err.message.should.include('402');
        err.message.should.include('Payment required');
        mockSession.should.be.done;
        done();
      });
    });
    
    it('should fail with a 403 response status and message for unauthorized calls', function(done) {
      var mockSession = mock.failedRequest('/apps/name', 403, 'Forbidden');
      api.app('name', function(err, app) {
        should.exist(err, 'Should expose an error');
        err.message.should.include('403');
        err.message.should.include('Forbidden');
        mockSession.should.be.done;
        done();
      });
    });
  });
});