'use strict';

// Crypto Utils
angular.module(ApplicationConfiguration.applicationModuleName).factory('CryptoUtil', [
  function () {

    var rand = function () {
      return Math.random().toString(36).substr(2); // remove `0.`
    };
    var tokenGenerator = function () {
      return rand() + rand(); // to make it longer
    };

    var cryptoUtil = {
      MD5Base64Encoded: function(string) {
        var passwordHash = CryptoJS.MD5(string);
        return passwordHash.toString(CryptoJS.enc.Base64);
      },
      getRandomToken: function(){
        return tokenGenerator();
      }
    };

    return cryptoUtil;
  }
]);
