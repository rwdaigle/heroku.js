var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps', function() {

    beforeEach(function() {
      mock.request('/apps', 'list-apps.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps(function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all applications', function(done) {
      api.apps(function(err, apps) {
        should.exist(apps, 'Result data should not be null');
        apps.length.should.be.above(0, 'Result should contain list of application data');
        should.exist(apps[0].name, 'Result does not appear to contain application data');
        done();
      });
    });
  });

  describe('GET /apps/:name', function() {

    beforeEach(function() {
      mock.request('/apps/name', 'show-app.json');
    });
    
    it('should not expose an error', function(done) {
      api.app('name', function(err, app) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get the application\'s details', function(done) {
      api.app('name', function(err, app) {
        should.exist(app, 'Application details should not be null');
        should.exist(app.name, 'Result does not appear to contain application data');
        done();
      });
    });
  });
});