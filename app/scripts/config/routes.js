'use strict';

// Setting up route
angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/app', '/app/home');
    $urlRouterProvider.otherwise('/app/home');

    var checkLogin = function ($q, $timeout, $location, Auth) {
      var deferred = $q.defer();
      if (Auth.isAuthenticated()) {
        $timeout(deferred.resolve);
      } else {
        $timeout(deferred.reject);
        $location.path('/login');
      }
      return deferred.promise;
    };

    // State routing
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginController'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'app.html',
        resolve: {
          loggedin: function ($q, $timeout, $location, Auth) {
            return checkLogin($q, $timeout, $location, Auth);
          }
        },
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('app.home', {
        url: '/home',
        templateUrl: 'home.html'
      });

  }
]);
