'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.Edit.BuilderController',
  function ($scope, $state, $filter, toastr, form) {

    $scope.view = {
      form: form
    };
    $scope.sections = [];

    // Sections utils
    var addSection = function (section) {
      if(angular.isArray(section)) {
        $scope.sections = $filter('orderBy')($scope.sections.concat(section), 'number');
      } else {
        $scope.sections = $filter('orderBy')($scope.sections.concat([section]), 'number');
      }
    };
    var removeSection = function (index) {
      $scope.sections.splice(index, 1);
    };

    // Load all sections of the form
    $scope.loadSections = function () {
      $scope.view.form.SCSection().$getAll().then(function (response) {
        $scope.sections = [];
        addSection(response);
      });
    };
    $scope.loadSections();

    // Is action on menu clicked
    $scope.setOperation = function (op) {
      $scope.operation = op;
    };
    $scope.closeOperation = function () {
      $scope.operation = undefined;
    };

    // Active on new Section created
    $scope.sectionCreated = function (section) {
      $scope.closeOperation();
      addSection(section);
    };
    $scope.sectionRemoved = function (index) {
      removeSection(index);
    };

  });
