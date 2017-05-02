"use strict";

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var ethUtil = require('ethereumjs-util');
var sigUtil = require('eth-sig-util');
var jwt = require('jsonwebtoken');

module.exports = {};

module.exports.attach = function(app, secret) {
  // Don't accept non-AJAX requests to prevent XSRF attacks.
  app.use(function(req, res, next) {
    if (!req.xhr) {
      res.status(500).send('Not AJAX');
    }
    else {
      next();
    }
  });

  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(expressJwt({
    secret: secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      return req.cookies.token;
    }
  }).unless({path: ['/sign-in']})
  );

  app.post('/sign-in', function (req, res) {
    console.log(req.body);
    
    var msgParams = {
      data: ethUtil.bufferToHex(new Buffer("Sign into demo app.", 'utf8')),
      sig: req.body.signed,
    };
    var recovered = sigUtil.recoverPersonalSignature(msgParams)

    if (recovered === req.body.account) {
      console.log('SigUtil Successfully verified signer as ' + req.body.account);
      
      var token = jwt.sign({loggedInAs: req.body.account}, secret);
      
      console.log('JWT token: ' + token);
      res.cookie('token', token, {domain: 'localhost', httpOnly: true});
      res.end();
    } else {
      console.log('SigUtil recover the message signer');
    }  
  });
}
