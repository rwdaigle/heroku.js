var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /user/keys', function() {

    beforeEach(function() {
      mock.get('/user/keys', 'list-keys.json');
    });
    
    it('should not expose an error', function(done) {
      api.keys.list(function(err, keys) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all app domains', function(done) {
      api.keys.list(function(err, keys) {
        should.exist(keys);
        should.exist(keys[0], 'Keys response should include keys list');
        keys[0].email.should.equal('rd@heroku.com', 'Response should include key email');
        done();
      });
    });
  });

  describe('POST /user/keys', function() {

    beforeEach(function() {
      mock.post('/user/keys', { body: 'newkey' }, 'empty.json');
    });
    
    it('should not expose an error', function(done) {
      api.keys.add('newkey', function(err, res) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should add a new key', function(done) {
      api.keys.add('newkey', function(err, res) {
        should.exist(res);
        done();
      });
    });
  });

  describe('DELETE /user/keys/:user-host', function() {

    beforeEach(function() {
      mock.delete('/user/keys/ryan%40Palermo.local', 'empty.json');
    });
    
    it('should not expose an error', function(done) {
      api.keys.remove('ryan@Palermo.local', function(err, res) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should remove the domain from the app', function(done) {
      api.keys.remove('ryan@Palermo.local', function(err, res) {
        should.exist(res);
        done();
      });
    });
  });

  describe('DELETE /user/keys', function() {

    beforeEach(function() {
      mock.delete('/user/keys', 'empty.json');
    });
    
    it('should not expose an error', function(done) {
      api.keys.removeAll(function(err, res) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should remove the domain from the app', function(done) {
      api.keys.removeAll(function(err, res) {
        should.exist(res);
        done();
      });
    });
  });
});