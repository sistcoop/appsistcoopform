'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.EditController',
    function ($scope, $state, toastr, form, SGDialog) {

      $scope.view = {};
      $scope.view.form = form;

    });
