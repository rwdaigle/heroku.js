var nock = require('nock'),
  fs = require('fs');

exports.get = function(path, responseFile) {
  var fixturePath = 'test/fixtures/';
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(200, fs.readFileSync(fixturePath + responseFile, 'utf8'));
}

exports.post = function(path, data, responseFile) {
  var fixturePath = 'test/fixtures/';
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .post(path, data)
    .reply(200, fs.readFileSync(fixturePath + responseFile, 'utf8'));
}

exports.put = function(path, data, responseFile) {
  var fixturePath = 'test/fixtures/';
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .put(path, data)
    .reply(200, fs.readFileSync(fixturePath + responseFile, 'utf8'));
}

exports.delete = function(path, responseFile) {
  var fixturePath = 'test/fixtures/';
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .delete(path)
    .reply(200, fs.readFileSync(fixturePath + responseFile, 'utf8'));
}

exports.failedRequest = function(path, responseStatus, body) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(responseStatus, body);
}

exports.unauthorizedRequest = function(path) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkJBRF9UT0tFTg==')  // ':BAD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(401, 'Http Basic: Access denied');
}