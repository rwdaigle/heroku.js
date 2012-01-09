var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps', function() {
    
    it('should get a list of all applications', function(done) {
      var mockSession = mock.authorizedRequests['/apps']();
      api.apps(function(err, apps) {
        should.not.exist(err);
        should.exist(apps, 'Result data should not be null');
        apps.length.should.be.above(0, 'Result should contain list of application data');
        should.exist(apps[0].name, 'Result does not appear to contain application data');
        mockSession.should.be.done;
        done();
      });
    });
  });

  describe('GET /apps/:name', function() {
    
    it('should get the application\'s details', function(done) {
      var mockSession = mock.authorizedRequests['/apps/name']();
      api.app('name', function(err, app) {
        should.not.exist(err);
        should.exist(app, 'Application details should not be null');
        should.exist(app.name, 'Result does not appear to contain application data');
        mockSession.should.be.done;
        done();
      });
    });
  });
});