"use strict";

var Web3 = require('web3');
var Eth = require('ethjs');
var ethUtil = require('ethereumjs-util');
var $ = require('jquery');

module.exports = {};

module.exports.signIn = function() {

  window.Eth = Eth;
  window.web3 = new Web3(web3.currentProvider);
  var eth = new Eth(web3.currentProvider)
  
  var baseUrl = location.protocol + "//" + location.hostname;

  eth.personal_sign(web3.eth.accounts[0], ethUtil.bufferToHex(new Buffer("Sign into " + baseUrl, 'utf8')))
  .then((signed) => {
    console.log('Signed!  Result is: ', signed);

    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url: baseUrl + ":" + location.port + '/sign-in',
      data: JSON.stringify({
        account: web3.eth.accounts[0],
        signed: signed,
      }),
      success: function (data, textStatus, jqXHR) {
        console.log('Signed in.');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Failed to sign in.');
      }
    });
  })
}
