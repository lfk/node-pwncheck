/**
 *
 */

var should     = require('should'),
	Promise    = require('bluebird'),
    pwnchecker = require('../');


describe('PwnChecker', function() {
  describe('When checking for a breach...', function() {

    it('should verify that a callback function was provided', function() {
      (function() { pwnchecker.checkBreach('foo@bar.com') }).should.throw();
    });

    it('should verify that an e-mail address was provided', function() {
      pwnchecker.checkBreach(null, function(err, breaches) {
        err.should.be.an.Error;
      });
    });

	it('Should return a list of breaches', function(done) {
      pwnchecker.checkBreach('foo@bar.com', done);
	});

	it('Should return a truncated list of breaches', function(done) {
      pwnchecker.checkBreach('foo@bar.com', true, done);
	});

  });

  // TODO: Promise.nodeify test
});
