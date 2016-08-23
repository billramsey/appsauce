var http = require('http');
var request = require('request');
var URL_PREFIX = '/wd/hub/session';
var Promise = require('bluebird');


var httpRequest = (url, endpoint, json, method) => {
  return new Promise((resolve, reject) => {
    var connectUrl = url + URL_PREFIX + endpoint;
    // console.log('connecturl', connectUrl);
    // console.log('json', json);
    var options = {
      url: connectUrl,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      json: json
    };
    // better parsing here could be done
    if (json !== undefined && json !== '') {
      options.json = json; 
    }

    request(options, 
    (error, response, body) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(body);
    });
  });
};


var seleniumRequest = function(url, options) {
  var seleniumObject = Object.create(seleniumRequest.prototype);
  
  seleniumObject.sessionId = null;
  seleniumObject.url = url;
  seleniumObject.options = options;
  return seleniumObject;
};

seleniumRequest.prototype.connect = function(browserUrl) {
  return new Promise((resolve, reject) => {
    httpRequest(this.url, '', this.options, 'POST')
    .then((body) => {
      if (body.sessionId === undefined) {
        reject('no returned session id', body);
      }
      this.sessionId = body.sessionId;
      resolve();
    })
    .catch(reject);
  });
};

seleniumRequest.prototype.navigate = function(url) {
  return new Promise((resolve, reject) => {
    httpRequest(this.url, '/' + this.sessionId + '/' + 'url', {url: url}, 'POST')
    .then((body) => {
      resolve(body);
    })
    .catch(reject);
  });
};

seleniumRequest.prototype.title = function() {
  return new Promise((resolve, reject) => {
    httpRequest(this.url, '/' + this.sessionId + '/' + 'title', '', 'GET')
    .then((body) => {
      var bodyObject = JSON.parse(body);
      resolve(bodyObject.value);
    })
    .catch(reject);
  });
};

seleniumRequest.prototype.find = function(data) {
  return new Promise((resolve, reject) => {
    httpRequest(this.url, '/' + this.sessionId + '/' + 'element', data, 'POST')
    .then((body) => {
      if (body.value === undefined || body.value.ELEMENT === undefined) {
        reject('no element returned', body);
      }
      resolve(body.value.ELEMENT);
    })
    .catch(reject);
  });
};


seleniumRequest.prototype.close = function() {
  return new Promise((resolve, reject) => {
    httpRequest(this.url, '/' + this.sessionId, '', 'DELETE')
    .then((body) => {
      resolve();
    })
    .catch(reject);
  });
};

module.exports = seleniumRequest;




