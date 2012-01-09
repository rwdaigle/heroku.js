var request = require('request'),
  fs = require('fs');

var version = JSON.parse(fs.readFileSync('package.json','utf8')).version; 

exports.api = function() {
  var token = arguments[0] || process.env['HEROKU_API_TOKEN'];
  var baseURL = arguments[1] || process.env['HEROKU_API_URL'] || 'api.heroku.com';
  return new Heroku(token, baseURL);
}

var Heroku = function(token, baseURL) {

  var token = this.token = token;
  var baseURL = this.baseURL = baseURL;
  var defaultReq = request.defaults({
    headers: { 'Accept': 'application/json', 'User-Agent': 'heroku.js/' + version },
    json: true,
    followRedirect: false
  });

  this.apps = function(callback) {
    defaultReq.get(this.buildURL('apps'), this.handleResponse(callback));
  }

  this.app = function(name, callback) {
    defaultReq.get(this.buildURL('apps/' + name), this.handleResponse(callback));
  }

  this.createApp = function() {
    var data = arguments.length == 2 ? { app: arguments[0] } : {};
    var callback = arguments[arguments.length - 1];
    defaultReq.post({ url: this.buildURL('apps'), json: data }, this.handleResponse(callback));
  }

  this.updateApp = function(name, params, callback) {
    defaultReq.put({ url: this.buildURL('apps/' + name), json: { app: params} }, this.handleResponse(callback));
  }

  this.buildURL = function(path) {
    return 'https://:' + token + '@' + baseURL + '/' + path;
  }

  this.handleResponse = function(callback) {
    return function(err, res, body) {
      if (!err && res.statusCode == 200) {
        callback(null, body);
      } else {
        if(err) {
          callback(err, body);
        } else {
          var errorMessage = typeof body.error == 'undefined' ? body : body.error;
          callback(new Error('Request failed with response status: ' + res.statusCode + ', message: ' + errorMessage), body);
        }
      }
    }
  }
}