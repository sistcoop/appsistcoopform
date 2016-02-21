'use strict';

/* jshint -W098 */
angular.module('forms').directive('scTextQuestion', function () {
  return {
    restrict: 'E',
    scope: {
      scFormModel: '=',
      scSectionModel: '=',
      scQuestionModel: '=',
      onSaved: '&',
      onRemoved: '&',
      onClosed: '&'
    },
    replace: true,
    templateUrl: 'modules/forms/directives/text-question/text.question.html',
    controller: ['$scope', '$filter', 'toastr', 'SGDialog', 'SCForm', function ($scope, $filter, toastr, SGDialog, SCForm) {

      $scope.working = false;

      // UI objects
      $scope.view = {
        question: $scope.scQuestionModel,
        isEditing: false
      };

      // Combo definition
      $scope.combo = {
        type: [{name: 'Texto corto', value: 'SHORT'}, {name: 'Texto largo', value: 'LARGE'}],
        section: [$scope.scSectionModel]
      };
      $scope.combo.selected = {
        type: {name: 'Texto corto', value: 'SHORT'},
        section: $scope.scSectionModel
      };

      // Load sections if it is not defined
      var loadSections = function () {
        if (!$scope.scSectionModel) {
          $scope.scFormModel.SCSection().$getAll().then(function (response) {
            $scope.combo.section = $filter('orderBy')(response, 'number');
          });
        }
      };
      loadSections();

      // Saved method. Valid for POST and PUT
      $scope.save = function () {
        $scope.working = true;

        $scope.view.question.question = 'TEXT';
        $scope.view.question.type = $scope.combo.selected.type.value;

        var build = SCForm.$new($scope.scFormModel.id).SCSection().$new($scope.combo.selected.section.id).SCQuestion().$build();
        $scope.view.question = angular.extend(build, $scope.view.question);

        $scope.view.question.$save().then(
          function (response) {
            $scope.working = false;
            $scope.view.isEditing = false;
            toastr.success('Pregunta guardada');

            $scope.close();
            if ($scope.onSaved) {
              $scope.onSaved(response);
            }
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      };

      // Remove method
      $scope.remove = function () {
        SGDialog.confirmDelete($scope.view.question.title, 'pregunta', function () {
          $scope.working = true;
          $scope.view.question.$remove().then(
            function (response) {
              $scope.working = false;
              $scope.view.isEditing = false;
              toastr.success('Pregunta eliminada');

              if ($scope.onRemoved) {
                $scope.onRemoved();
              }
            },
            function error(err) {
              $scope.working = false;
              toastr.error(err.data.errorMessage);
            }
          );
        });
      };

      // On Cancel button
      $scope.cancel = function () {
        $scope.view.isEditing = false;
      };

      // On edit button
      $scope.edit = function () {
        $scope.view.isEditing = true;
      };

      // Close button
      $scope.close = function () {
        $scope.view.isEditing = false;
        if ($scope.onClosed) {
          $scope.onClosed();
        }
      };

    }],
    link: function (scope, element) {

    }
  };
});
