var should = require('should');

exports.confirmError = function(status, message, session, done) {
  return function(err, app) {
    should.exist(err, 'Should expose an error');
    err.message.should.include(status);
    err.message.should.include(message);
    session.should.be.done;
    done();
  };
}