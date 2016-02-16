'use strict';

//For configure base path or the web services
angular.module(ApplicationConfiguration.applicationModuleName)

  .provider('sra', function () {
    this.restUrl = 'http://localhost';
    this.$get = function () {
      var restUrl = this.restUrl;
      return {
        getRestUrl: function () {
          return restUrl;
        }
      }
    };
    this.setRestUrl = function (restUrl) {
      this.restUrl = restUrl;
    };
  })

  .factory('SRARestangular', ['Restangular', 'sra', function (Restangular, sra) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(sra.getRestUrl());
    });
  }])

  .factory('SRAAuth', ['SRARestangular', 'Auth', function (SRARestangular, Auth) {
    var resources = {
      $login: function (input) {
        return SRARestangular.all('authenticate').post(input);
      },
      $logout: function () {
        var input = {'sessionId': Auth.authz.sessionId};
        return SRARestangular.all('logout').post(input);
      }
    };
    return resources;
  }])

  .factory('SRACustomer', ['SRARestangular', 'Auth', function (SRARestangular, Auth) {
    var resources = {
      $getAll: function () {
        var input = {'sessionId': Auth.authz.sessionId};
        return SRARestangular.all('customer/list').post(input);
      },
      $findDetail: function (id) {
        var input = {'sessionId': Auth.authz.sessionId};
        input.customerid = id;
        return SRARestangular.all('customer/details').post(input);
      },
      $saveNote: function (data) {
        var input = angular.extend(data, {'sessionId': Auth.authz.sessionId});
        return SRARestangular.all('customer/savenotes').post(input);
      },
      $saveVisit: function (data) {
        var input = angular.extend(data, {'sessionId': Auth.authz.sessionId});
        return SRARestangular.all('customer/savevisit').post(input);
      }
    };
    return resources;
  }]);
