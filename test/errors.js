var should = require('should'),
  mock = require('./mock-helper'),
  helper = require('./test-helper');

describe('Heroku API requests', function() {

  var api = require('../').api('GOOD_TOKEN');
  var unauthApi = require('../').api('BAD_TOKEN');
    
  it('should fail with a 401 response status and message for an invalid api token', function(done) {
    var mockSession = mock.unauthorizedRequest('/apps');
    unauthApi.apps(helper.confirmError(401, 'Access denied', mockSession, done));
  });
  
  it('should fail with a 402 response status and message when payment is required', function(done) {
    var mockSession = mock.failedRequest('/apps', 402, 'Payment required');
    api.apps(helper.confirmError(402, 'Payment required', mockSession, done));
  });
  
  it('should fail with a 403 response status and message for unauthorized calls', function(done) {
    var mockSession = mock.failedRequest('/apps/name', 403, 'Forbidden');
    api.app('name', helper.confirmError(403, 'Forbidden', mockSession, done));
  });
  
  it('should fail with a 404 response status and message for invalid calls', function(done) {
    var mockSession = mock.failedRequest('/apps/name', 404, 'Not found');
    api.app('name', helper.confirmError(404, 'Not found', mockSession, done));
  });
  
  it('should fail with a 412 response status and message for deprecated calls', function(done) {
    var mockSession = mock.failedRequest('/apps/name', 412, 'Deprecated');
    api.app('name', helper.confirmError(412, 'Deprecated', mockSession, done));
  });
  
  // TODO: Make this test use realistic failure call, i.e. createApp
  it('should fail with a 422 response status and message for invalid calls', function(done) {
    var mockSession = mock.failedRequest('/apps/name', 422, { "error": "Name must start with a letter and can only contain lowercase letters, numbers, and dashes" });
    api.app('name', helper.confirmError(422, 'Name must start', mockSession, done));
  });
  
  it('should fail with a 423 response status and message for invalid calls', function(done) {
    var mockSession = mock.failedRequest('/apps/name', 423, 'Locked');
    api.app('name', helper.confirmError(423, 'Locked', mockSession, done));
  });
});