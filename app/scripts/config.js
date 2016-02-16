'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {

  // Init module configuration options
  var applicationModuleName = 'mean';

  var applicationModuleVendorDependencies = [
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'ncy-angular-breadcrumb',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.utils.masks',
    'patternfly',
    'restangular',
    'toastr',
    'LocalStorageModule'
  ];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };

})();
