var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps/:name/ps', function() {

    beforeEach(function() {
      mock.get('/apps/name/ps', 'list-processes.json');
    });
    
    it('should not expose an error', function(done) {
      api.ps.list('name', function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all processes', function(done) {
      api.ps.list('name', function(err, processes) {
        should.exist(processes, 'Result data should not be null');
        processes.length.should.be.above(0, 'Result should contain list of process data');
        should.exist(processes[0].command, 'Result does not appear to contain processes data');
        done();
      });
    });
  });

  describe('POST /apps/:name/ps/restart', function() {

    beforeEach(function() {
      mock.post('/apps/name/ps/restart', null, 'restart-processes.json');
      mock.post('/apps/name/ps/restart', { type: 'web' }, 'restart-processes.json');
      mock.post('/apps/name/ps/restart', { ps: 'web.1' }, 'restart-processes.json');
    });
    
    it('should not expose an error', function(done) {
      api.ps.restart('name', function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should restart the app', function(done) {
      api.ps.restart('name', function(err, body) {
        should.exist(body, 'Result data should not be null');
        done();
      });
    });
  });
});