PwnCheck
========

*This package provides an easy-to-use wrapper for Troy Hunt's excellent
[Have I been pwned?][hibp] API.*


Installation
------------

```
npm install pwncheck
```


Quickstart
----------

PwnCheck is used by creating an endpoint for invoking the `checkBreach` method.
This endpoint would favorably -- though not necessarily -- be queried via AJAX.

```javascript
app.param('email', function(req, res, next, email) {
  if(!validator.isEmail(email)) {
    return res.status(400).send('Invalid e-mail address: "' + email + '"');
  }

  req.email = email;
  return next();
});

app.get('/pwncheck/:email', function(req, res) {
  pwncheck.checkBreach(req.email, false, function(err, result) {
    if(err) { console.log(err); return res.status(500).json(err); }
    return res.status(200).json(result);
  });
});
```

Please refer to `examples/example.js` for a fully functional demonstration.


Demo application
----------------

* `$ node examples/example.js`
* Visit http://localhost:8080/


Changelog
---------

### 0.0.1

* Implemented `PwnChecker.checkBreach()`
* Created demo application
* Wrote basic unit tests
* Added LICENSE and README files


Credits
-------

[Have I been pwned?][hibp] is developed and maintained by [Troy Hunt][troyhunt].


License
-------

Distributed under the [MIT License][license].

[hibp]: https://haveibeenpwned.com
[troyhunt]: http://www.troyhunt.com
[license]: https://github.com/lfk/node-pwncheck/blob/master/LICENSE
