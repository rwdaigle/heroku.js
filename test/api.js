var should = require('should');

describe('Heroku API', function() {

  var api = require('../').api();

  describe('authorization', function() {
    
    it('should fail with a 401 response status for an invalid api token', function(done) {
      api.apps(function(err, results) {
        should.exist(err);
        err.message.should.include('401')
        done();
      });
    });
  });

  // describe('for apps', function() {

  //   it('should list a user\'s apps', function(done) {
  //     heroku.apps(function(err, results) {
  //       assert.ok(results, '/apps response is invalid');
  //       done();
  //     });
  //   });

  // });
});