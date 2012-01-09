var nock = require('nock');

exports.authorizedRequests = {
  '/apps': function() {
    return nock('https://api.heroku.com')
      .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')  // ':GOOD_TOKEN' in Base64/basic http auth
      .get('/apps')
      .reply(200,
        [
          {
            "id": 000001,
            "name": "example1",
            "create_status": "complete",
            "created_at": "2011/01/01 00:00:00 -0700",
            "stack": "bamboo-ree-1.8.7",
            "requested_stack": null,
            "repo_migrate_status": "complete",
            "slug_size": 1000000,
            "repo_size": 1000000,
            "dynos": 1,
            "workers": 0
          },
          {
            "id": 000002,
            "name": "example2",
            "create_status": "complete",
            "created_at": "2011/01/01 00:00:00 -0700",
            "stack": "bamboo-ree-1.8.7",
            "requested_stack": null,
            "repo_migrate_status": "complete",
            "slug_size": 1000000,
            "repo_size": 1000000,
            "dynos": 1,
            "workers": 0
          }
        ]);
    },

  '/apps/name': function() {
    return nock('https://api.heroku.com')
      .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')
      .get('/apps/name')
      .reply(200,
        {
          "id": 000001,
          "name": "example1",
          "create_status": "complete",
          "created_at": "2011/01/01 00:00:00 -0700",
          "stack": "bamboo-ree-1.8.7",
          "requested_stack": null,
          "repo_migrate_status": "complete",
          "slug_size": 1000000,
          "repo_size": 1000000,
          "dynos": 1,
          "workers": 0
        });
  }
}

exports.unauthorizedRequest = function(path) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkJBRF9UT0tFTg==')  // ':BAD_TOKEN' in Base64/basic http auth
    .get(path)
    .reply(401, 'Http Basic: Access denied');
}

exports.failedRequest = function(path, responseStatus, body) {
  return nock('https://api.heroku.com')
    .matchHeader('Authorization', 'Basic OkdPT0RfVE9LRU4=')
    .get(path)
    .reply(responseStatus, body);
}