'use strict';

// Auth save the session user
angular.module(ApplicationConfiguration.applicationModuleName).factory('Auth', function (localStorageService) {
    var auth = {
      authz: {},
      isAuthenticated: function () {
        return angular.isDefined(this.authz.sessionId);
      },
      init: function (auth) {
        this.authz = auth;
        localStorageService.set('crossover', auth);
      },
      load: function() {
        var session = localStorageService.get('crossover');
        if(session && session.sessionId) {
          this.init(session);
        }
      },
      clean: function () {
        this.authz = {};
        localStorageService.remove('crossover');
      }
    };

    return auth;
  });
