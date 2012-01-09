var nock = require('nock'),
  fs = require('fs');

exports.request = function(path, responseFile) {
  var fixturePath = 'test/fixtures/';
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(200, fs.readFileSync(fixturePath + responseFile, 'utf8'));
}

exports.unauthorizedRequest = function(path) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkJBRF9UT0tFTg==')  // ':BAD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(401, 'Http Basic: Access denied');
}

exports.failedRequest = function(path, responseStatus, body) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(responseStatus, body);
}