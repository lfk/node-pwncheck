/**
 *
 */

var https = require('https'),
	pjson = require('../package.json');

function PwnChecker() {}

/**
 * Connects to HaveIBeenPwned and retrieves breach information for `email`.
 *
 * If truncate is truthy, only names of breaches will be returned;
 * otherwise, full breach information will be returned.
 */
PwnChecker.prototype.checkBreach = function(email, truncate, callback) {
  if(typeof truncate === 'function') {
    callback = truncate;  
	truncate = false;
  }

  if(typeof callback !== 'function') {
    throw new Error('No callback function provided');
  }

  if(typeof email !== 'string') {
    return callback(new Error('E-mail must be a string'));
  }

  truncate = typeof truncate === 'undefined' ? false : truncate;

  // Issue the API request
  https.get({
    headers: { 'User-Agent': 'node-pwnchecker-' + pjson.version },
    host:    'haveibeenpwned.com',
    path:    '/api/v2/breachedaccount/' + email + '?truncateResponse=' +
	         (truncate ? 'true' : 'false')
  }, function(res) {
    if(res.statusCode !== 200) {
      return callback(new Error('Error: HTTP ' + res.statusCode));
    }

	var buffer = '';
    res.on('data', function(data) {
      buffer += data;
	});

	res.on('end', function() {
	  return callback(null, JSON.parse(buffer));
    });
  }).on('error', function(err) {
    return callback(err);
  });
};

module.exports = new PwnChecker();
