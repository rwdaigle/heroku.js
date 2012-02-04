var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps/:name/logs', function() {

    // beforeEach(function() {
    //   mock.get('/apps/name/logs', 'get-logs.json');
    // });
    
    // it('should not expose an error', function(done) {
    //   api.logs.get(function(err, keys) {
    //     should.not.exist(err);
    //     done();
    //   });
    // });
    
    // it('should get recent logs', function(done) {
    //   api.logs.get('name', function(err, logs) {
    //     should.exist(logs);
    //     done();
    //   });
    // });
  });
});