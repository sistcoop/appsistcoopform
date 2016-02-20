'use strict';

/* jshint -W098 */
angular.module('forms').directive('scTextQuestion', function () {
  return {
    restrict: 'AE',
    scope: {
      scForm: '=',
      scSection: '=',
      scQuestion: '='
    },
    replace: true,
    templateUrl: 'modules/forms/directives/text-question/text.question.html',
    controller: ['$scope', 'toastr', 'SCForm', function ($scope, toastr, SCForm) {

      var loadSections = function () {
        SCForm.$new($scope.scForm.id).SCSection().$getAll().then(function (response) {
          $scope.combo.section = response;
        });
      };

      var configCombo = function () {
        if ($scope.scSection) {
          $scope.combo.section = [$scope.scSection];
          $scope.combo.selected.section = [$scope.scSection];
        } else {
          loadSections();
        }
      };

      $scope.combo = {
        section: undefined
      };
      $scope.combo.selected = {
        section: undefined
      };

      configCombo();


      $scope.working = false;

      $scope.save = function () {
        $scope.working = true;

        var question;
        if(!$scope.scQuestion.id) {
          question = SCForm.$new($scope.scForm.id).SCSection().$new($scope.combo.selected.section.id).SCQuestion().$build();
          question = angular.copy(question, $scope.scQuestion);
        } else {
          question = $scope.scQuestion;
        }
        question.$save().then(
          function (response) {
            toastr.success('Pregunta creada satisfactoriamente');
            $scope.working = false;
          },
          function error(err) {
            toastr.error(err.data.errorMessage);
            $scope.working = false;
          }
        );
      };

      $scope.remove = function(){
        $scope.working = true;

        var question;
        if(!$scope.scQuestion.id) {
          question = SCForm.$new($scope.scForm.id).SCSection().$new($scope.combo.selected.section.id).SCQuestion().$build();
          question = angular.copy(question, $scope.scQuestion);
        } else {
          question = $scope.scQuestion;
        }
        question.$remove().then(
          function (response) {
            toastr.success('Pregunta eliminada satisfactoriamente');
            $scope.working = false;
          },
          function error(err) {
            toastr.error(err.data.errorMessage);
            $scope.working = false;
          }
        );
      };

    }],
    link: function (scope, element) {

    }
  };
});
