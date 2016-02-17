'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.SearchController',
    function ($scope, $state) {

      $scope.query;
      $scope.encuestas = [{name: 'nombre', title: 'titulo'}];

    });
