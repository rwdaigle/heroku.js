var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps/:name/domains', function() {

    beforeEach(function() {
      mock.get('/apps/name/domains', 'list-domains.json');
    });
    
    it('should not expose an error', function(done) {
      api.domains.list('name', function(err, domains) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all app domains', function(done) {
      api.domains.list('name', function(err, domains) {
        should.exist(domains);
        should.exist(domains[0], 'Domains response should include domain list');
        domains[0].domain.should.equal('self.heroku-sslendpoint.com', 'Response should include domain');
        done();
      });
    });
  });

  describe('POST /apps/:name/domains', function() {

    beforeEach(function() {
      mock.post('/apps/name/domains', { domain_name: { domain: 'ryanstest.com' } }, 'add-domain.json');
    });
    
    it('should not expose an error', function(done) {
      api.domains.add('name', 'ryanstest.com', function(err, res) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should add a new app domains', function(done) {
      api.domains.add('name', 'ryanstest.com', function(err, res) {
        should.exist(res);
        should.exist(res.domain, 'Response should include domain');
        res.domain.should.equal('ryanstest.com', 'Response should equal new domain');
        done();
      });
    });
  });

  describe('DELETE /apps/:name/domains/:domain', function() {

    beforeEach(function() {
      mock.delete('/apps/name/domains/ryanstest.com', 'remove-domain.json');
    });
    
    it('should not expose an error', function(done) {
      api.domains.remove('name', 'ryanstest.com', function(err, res) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should remove the domain from the app', function(done) {
      api.domains.remove('name', 'ryanstest.com', function(err, res) {
        should.exist(res);
        done();
      });
    });
  });
});