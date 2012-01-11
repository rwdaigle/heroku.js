var should = require('should'),
  mock = require('./mock-helper');

describe('Heroku API:', function() {

  var api = require('../').api('GOOD_TOKEN');

  describe('GET /apps', function() {

    beforeEach(function() {
      mock.get('/apps', 'list-apps.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps.list(function(err, apps) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get a list of all applications', function(done) {
      api.apps.list(function(err, apps) {
        should.exist(apps, 'Result data should not be null');
        apps.length.should.be.above(0, 'Result should contain list of application data');
        should.exist(apps[0].name, 'Result does not appear to contain application data');
        done();
      });
    });
  });

  describe('GET /apps/:name', function() {

    beforeEach(function() {
      mock.get('/apps/name', 'show-app.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps.get('name', function(err, app) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should get the application\'s details', function(done) {
      api.apps.get('name', function(err, app) {
        should.exist(app, 'Application details should not be null');
        should.exist(app.name, 'Result does not appear to contain application data');
        done();
      });
    });
  });

  describe('POST /apps', function() {

    beforeEach(function() {
      mock.post('/apps', {}, 'create-app.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps.create(function(err, app) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should respond with the application\'s details', function(done) {
      api.apps.create(function(err, app) {
        should.exist(app, 'Application details should not be null');
        should.exist(app.name, 'Result does not appear to contain application data');
        done();
      });
    });

    describe('with name specified', function() {

      beforeEach(function() {
        mock.post('/apps', { app: { name: 'name' } }, 'create-app.json');
      });
      
      it('should not expose an error', function(done) {
        api.apps.create({ name: 'name' }, function(err, app) {
          should.not.exist(err);
          done();
        });
      });
      
      it('should respond with the application\'s details', function(done) {
        api.apps.create({ name: 'name' }, function(err, app) {
          should.exist(app, 'Application details should not be null');
          should.exist(app.name, 'Result does not appear to contain application data');
          done();
        });
      });
    });

    describe('with stack specified', function() {

      beforeEach(function() {
        mock.post('/apps', { app: { stack: 'cedar' } }, 'create-app.json');
      });
      
      it('should not expose an error', function(done) {
        api.apps.create({ stack: 'cedar' }, function(err, app) {
          should.not.exist(err);
          done();
        });
      });
      
      it('should respond with the application\'s details', function(done) {
        api.apps.create({ stack: 'cedar' }, function(err, app) {
          should.exist(app, 'Application details should not be null');
          should.exist(app.name, 'Result does not appear to contain application data');
          done();
        });
      });
    });

    describe('with name and stack specified', function() {

      beforeEach(function() {
        mock.post('/apps', { app: { name: 'name', stack: 'cedar' } }, 'create-app.json');
      });
      
      it('should not expose an error', function(done) {
        api.apps.create({ name: 'name', stack: 'cedar' }, function(err, app) {
          should.not.exist(err);
          done();
        });
      });
      
      it('should respond with the application\'s details', function(done) {
        api.apps.create({ name: 'name', stack: 'cedar' }, function(err, app) {
          should.exist(app, 'Application details should not be null');
          should.exist(app.name, 'Result does not appear to contain application data');
          done();
        });
      });
    });
  });

  describe('PUT /apps', function() {

    describe('to rename an application', function() {

      beforeEach(function() {
        mock.put('/apps/name', { app: { name: 'newname' }}, 'update-app.json');
      });
      
      it('should not expose an error', function(done) {
        api.apps.update('name', { name: 'newname'}, function(err, body) {
          should.not.exist(err);
          done();
        });
      });
      
      it('should respond with the application\'s details', function(done) {
        api.apps.update('name', { name: 'newname'}, function(err, body) {
          should.exist(body, 'API response body should not be null');
          should.exist(body.name, 'Result is not of the expected format');
          done();
        });
      });
    });

    describe('to transfer an application', function() {

      beforeEach(function() {
        mock.put('/apps/name', { app: { transfer_owner: 'newowner@heroku.com' }}, 'update-app.json');
      });
      
      it('should not expose an error', function(done) {
        api.apps.update('name', { transfer_owner: 'newowner@heroku.com'}, function(err, body) {
          should.not.exist(err);
          done();
        });
      });
      
      it('should respond with the application\'s details', function(done) {
        api.apps.update('name', { transfer_owner: 'newowner@heroku.com'}, function(err, body) {
          should.exist(body, 'API response body should not be null');
          should.exist(body.name, 'Result is not of the expected format');
          done();
        });
      });
    });
  });

  describe('POST /apps/:name/server/maintenance', function() {

    beforeEach(function() {
      mock.post('/apps/name/server/maintenance', { maintenance_mode: 1 }, 'empty.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps.maintenance('name', true, function(err, app) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should respond with an empty body', function(done) {
      api.apps.maintenance('name', true, function(err, body) {
        should.exist(body);
        done();
      });
    });
  });

  describe('DELETE /apps/:name', function() {

    beforeEach(function() {
      mock.delete('/apps/name', 'destroy-app.json');
    });
    
    it('should not expose an error', function(done) {
      api.apps.destroy('name', function(err, body) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should respond with an empty body', function(done) {
      api.apps.destroy('name', function(err, body) {
        should.exist(body);
        done();
      });
    });
  });
});