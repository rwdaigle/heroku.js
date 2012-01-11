var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps/:name/config_vars', function() {

    beforeEach(function() {
      mock.get('/apps/name/config_vars', 'list-config-vars.json');
    });
    
    it('should not expose an error', function(done) {
      api.config.list('name', function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all app config vars', function(done) {
      api.config.list('name', function(err, config) {
        should.exist(config);
        should.exist(config.RACK_ENV)
        config.RACK_ENV.should.equal('production');
        done();
      });
    });
  });

  describe('PUT /apps/:name/config_vars', function() {

    beforeEach(function() {
      mock.post('/apps/name/config_vars', { body: { NEW_VAR: 'value' } }, 'update-config-vars.json');
    });
    
    it('should not expose an error', function(done) {
      api.config.add('name', { NEW_VAR: 'value' }, function(err, config) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should update the app configuration and expose the current configuration');
    // , function(done) {
    //   api.config.add('name', { NEW_VAR: 'value' }, function(err, config) {
    //     should.exist(config);
    //     should.exist(config.RACK_ENV)
    //     config.RACK_ENV.should.equal('production');
    //     done();
    //   });
    // });
  });

  describe('DELETE /apps/:name/config_vars/:key', function() {

    beforeEach(function() {
      mock.delete('/apps/name/config_vars/NEW_VAR', 'remove-config-var.json');
    });
    
    it('should not expose an error', function(done) {
      api.config.remove('name', 'NEW_VAR', function(err, config) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should remove the app config and expose the current configuration', function(done) {
      api.config.remove('name', 'NEW_VAR', function(err, config) {
        should.exist(config);
        should.exist(config.RACK_ENV)
        config.RACK_ENV.should.equal('production');
        done();
      });
    });
  });
});