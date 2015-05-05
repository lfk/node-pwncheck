/**
 * Pwncheck demo application
 *
 * The `/pwncheck/{email}` route is queried via an AJAX GET call;
 * pwncheck results are returned as JSON-encoded data which is subsequently
 * processed and displayed on the website.
 */

var express    = require('express'),
    pwncheck   = require('../'),
    validator  = require('validator');

var app = express();
app.set('views', './views');
app.set('view engine', 'jade');


app.param('email', function(req, res, next, email) {
  if(!validator.isEmail(email)) {
    return res.status(400).send('Invalid e-mail address: "' + email + '"');
  }

  req.email = email;
  return next();
});

app.get('/', function(req, res) {
  return res.render('example');
});

app.get('/pwncheck/:email', function(req, res) {
  pwncheck.checkBreach(req.email, false, function(err, result) {
    if(err) { console.log(err); return res.status(500).json(err); }
    return res.status(200).json(result);
  });
});

var server = app.listen(8080, 'localhost', function() {
  console.log('The pwncheck demo is up and running at http://%s:%d/',
    server.address().address, server.address().port);
});
