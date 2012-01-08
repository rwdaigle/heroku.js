var should = require('should');

describe('Heroku API', function() {

  describe('configuration', function() {

    it('should expose a default api URL', function(done) {
      var heroku = require('../').api();
      heroku.baseURL.should.equal('api.heroku.com');
      done();    
    });

    it('should set the api URL via the HEROKU_API_URL environment variable', function(done) {
      process.env['HEROKU_API_URL'] = 'test.heroku.com';
      var heroku = require('../').api();
      heroku.baseURL.should.equal('test.heroku.com');
      process.env['HEROKU_API_URL'] = null;
      done();    
    });

    it('should allow the explicit setting of the api URL', function(done) {
      var heroku = require('../').api(null, 'explicit.heroku.com');
      heroku.baseURL.should.equal('explicit.heroku.com');
      done();    
    });

    it('should set the api token via the HEROKU_API_TOKEN environment variable', function(done) {
      process.env['HEROKU_API_TOKEN'] = 'mytoken';
      var heroku = require('../').api();
      heroku.token.should.equal('mytoken');
      process.env['HEROKU_API_TOKEN'] = null;
      done();    
    });

    it('should allow the explicit setting of the api token', function(done) {
      var heroku = require('../').api('yourtoken');
      heroku.token.should.equal('yourtoken');
      done();    
    });

  });
});