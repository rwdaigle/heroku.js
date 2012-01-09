var nock = require('nock');

exports.authorizedRequests = {
  '/apps': function() {
    return nock('https://api.heroku.com')
      .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
      .get('/apps')
      .reply(200, [ { owner_email: 'mock@heroku.com' } ]);
  }
}

exports.unauthorizedRequests = {
  '/apps': function() {
    return nock('https://api.heroku.com')
      .matchHeader('Authorization', 'Basic OkJBRF9UT0tFTg==')  // ':BAD_TOKEN' in Base64/basic http auth
      .get('/apps')
      .reply(401, 'Http Basic: Access denied');
  }
}