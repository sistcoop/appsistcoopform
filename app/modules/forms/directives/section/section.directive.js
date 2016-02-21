'use strict';

/* jshint -W098 */
angular.module('forms').directive('scSection', function () {
  return {
    restrict: 'AE',
    scope: {
      scFormModel: '=',
      scSectionModel: '=',
      onSaved: '=',
      onRemoved: '&',
      onClosed: '&'
    },
    replace: true,
    templateUrl: 'modules/forms/directives/section/section.html',
    controller: ['$scope', '$filter', 'toastr', 'SGDialog', 'SCForm', function ($scope, $filter, toastr, SGDialog, SCForm) {

      $scope.working = false;

      // UI objects
      $scope.view = {
        section: $scope.scSectionModel,
        isEditing: false
      };
      $scope.questions = [];

      // Load questions if section is defined
      var loadQuestions = function () {
        if ($scope.scSectionModel) {
          $scope.scSectionModel.SCQuestion().$getAll().then(function (response) {
            $scope.questions = $filter('orderBy')(response, 'number');
          });
        }
      };
      loadQuestions();


      // Saved method. Valid for POST and PUT
      $scope.save = function () {
        $scope.working = true;

        var build = SCForm.$new($scope.scFormModel.id).SCSection().$build();
        $scope.view.section = angular.extend(build, $scope.view.section);

        $scope.view.section.$save().then(
          function (response) {
            $scope.working = false;
            $scope.view.isEditing = false;
            toastr.success('Seccion guardada');

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
        SGDialog.confirmDelete($scope.view.section.title, 'seccion', function () {
          $scope.working = true;
          $scope.view.section.$remove().then(
            function () {
              $scope.working = false;
              $scope.view.isEditing = false;
              toastr.success('Seccion eliminada');

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

      // Sections utils
      var addQuestion = function (question) {
        if(angular.isArray(question)) {
          $scope.questions = $filter('orderBy')($scope.questions.concat(question), 'number');
        } else {
          $scope.questions = $filter('orderBy')($scope.questions.concat([question]), 'number');
        }
      };
      var removeQuestion = function (index) {
        $scope.questions.splice(index, 1);
      };

      // On create and remove questions
      $scope.questionCreated = function (question) {
        //addQuestion(question);
        loadQuestions();
      };
      $scope.questionRemoved = function (index) {
        removeQuestion(index);
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
