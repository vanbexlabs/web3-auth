'use strict';

var Web3 = require('web3');
var Eth = require('ethjs');
var ethUtil = require('ethereumjs-util');
var $ = require('jquery');

module.exports = {};

module.exports.signIn = function() {
  window.Eth = Eth;
  window.web3 = new Web3(web3.currentProvider);
  var eth = new Eth(web3.currentProvider);

  var baseUrl = location.protocol + '//' + location.hostname;

  var from = web3.eth.accounts[0];

  var msgParams = [
    {
      type: 'string',
      name: 'Message',
      value: 'Sign into ' + baseUrl
    }
  ];

  web3.currentProvider.sendAsync(
    {
      method: 'eth_signTypedData',
      params: [msgParams, from],
      from: web3.eth.accounts[0]
    },
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        var signed = result.result;
        console.log('Signed!  Result is: ', signed);
        $.ajax({
          method: 'POST',
          contentType: 'application/json',
          url: baseUrl + ':' + location.port + '/sign-in',
          data: JSON.stringify({
            account: web3.eth.accounts[0],
            signed: signed
          }),
          success: function(data, textStatus, jqXHR) {
            console.log('Signed in.');
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('Failed to sign in.');
          }
        });
      }
    }
  );
};
