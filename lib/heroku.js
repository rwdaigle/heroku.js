var request = require('request'),
  fs = require('fs'),
  spawn = require('child_process').spawn,
  Hash = require('hashish');;

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

  this.apps = {

    list: function(callback) {
      defaultReq.get(buildURL('apps'), handleResponse(callback));
    }
  }

  this.app = {

    get: function(name, callback) {
      defaultReq.get(buildURL('apps/' + name), handleResponse(callback));
    },

    create: function() {
      var data = arguments.length == 2 ? { app: arguments[0] } : {};
      var callback = arguments[arguments.length - 1];
      defaultReq.post({ url: buildURL('apps'), json: data }, handleResponse(callback));
    },

    update: function(name, params, callback) {
      defaultReq.put({ url: buildURL('apps/' + name), json: { app: params} }, handleResponse(callback));
    },

    maintenance: function(name, on, callback) {
      defaultReq.post({ url: buildURL('apps/' + name + '/server/maintenance'), json: { maintenance_mode: on ? 1 : 0 } }, handleResponse(callback));
    },

    destroy: function(name, callback) {
      defaultReq.del({ url: buildURL('apps/' + name) }, handleResponse(callback));
    }
  }

  this.collaborators = {
      
    list: function(name, callback) {
      defaultReq.get(buildURL('apps/' + name + '/collaborators'), handleResponse(callback));
    },

    add: function(name, email, callback) {
      defaultReq.post({ url: buildURL('apps/' + name + '/collaborators'), json: { collaborator: { email: encodeURIComponent(email) }} }, handleResponse(callback));
    },

    remove: function(name, email, callback) {
      defaultReq.del({ url: buildURL('apps/' + name + '/collaborators/' + encodeURIComponent(email)) }, handleResponse(callback));
    }
  }

  this.config = {
      
    list: function(name, callback) {
      defaultReq.get(buildURL('apps/' + name + '/config_vars'), handleResponse(callback));
    },

    add: function(name, configs, callback) {
      defaultReq.put({ url: buildURL('apps/' + name + '/config_vars'), json: configs }, handleResponse(callback));
    },

    remove: function(name, key, callback) {
      defaultReq.del({ url: buildURL('apps/' + name + '/config_vars/' + encodeURIComponent(key)) }, handleResponse(callback));
    }
  }

  this.domains = {
      
    list: function(name, callback) {
      defaultReq.get(buildURL('apps/' + name + '/domains'), handleResponse(callback));
    },

    add: function(name, domain, callback) {
      defaultReq.post({ url: buildURL('apps/' + name + '/domains'), json: { domain_name: { domain: domain }}}, handleResponse(callback));
    },

    remove: function(name, key, callback) {
      defaultReq.del({ url: buildURL('apps/' + name + '/domains/' + encodeURIComponent(key)) }, handleResponse(callback));
    }
  }

  this.keys = {
      
    list: function(callback) {
      defaultReq.get(buildURL('user/keys'), handleResponse(callback));
    },

    add: function(key,callback) {
      defaultReq.post({ url: buildURL('user/keys'), json: { body: key}}, handleResponse(callback));
    },

    remove: function(keyDescriptor, callback) {
      defaultReq.del({ url: buildURL('user/keys/' + encodeURIComponent(keyDescriptor)) }, handleResponse(callback));
    },

    removeAll: function(callback) {
      defaultReq.del({ url: buildURL('user/keys') }, handleResponse(callback));
    }
  }

  this.logs = {
    
    // Needs work to have consistent API (i.e. pass a callback for err handling or emit events)
    get: function(name, options, writeStream) {
      var opts = Hash.merge(options, { logplex: 'true' });
      defaultReq.get({ url: buildURL('apps/' + name + '/logs'), json: opts}, handleResponse(function(err, res) {
        if(err) {
          console.err(err.message);
        } else {
          // Body of response is logplex URL w/ unique session key
          streamLogplex(res, writeStream);
        }
      }));
    }
  }

  var streamLogplex = function(logplexUrl, stream) {

    var curl = spawn('curl', [logplexUrl]);

    curl.stdout.on('data', function (data) {
      stream.write(data);
    });
  }

  var buildURL = function(path) {
    return 'https://:' + token + '@' + baseURL + '/' + path;
  }

  var handleResponse = function(callback) {
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