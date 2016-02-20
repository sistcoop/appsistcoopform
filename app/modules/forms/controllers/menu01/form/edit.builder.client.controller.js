'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.Edit.BuilderController',
    function ($scope, $state, $filter, toastr, form, SGDialog, SCForm) {

      $scope.view = {
        form: form
      };
      $scope.sections = [];

      $scope.loadSections = function () {
        $scope.view.form.SCSection().$getAll().then(function(response){
          $scope.sections = $filter('orderBy')(response, 'number');;
        });
      };
      $scope.loadSections();

      $scope.setOperation = function(op){
        $scope.operation = op;
      };
      $scope.resetOperation = function () {
        $scope.operation = undefined;
      };

      $scope.onSectionChanged = function(){
        $scope.resetOperation();
        $scope.loadSections();
      };

    });
