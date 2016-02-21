'use strict';

/* jshint -W098 */
angular.module('forms').directive('scTextQuestion', function () {
  return {
    restrict: 'E',
    scope: {
      questionType: '=?',//text, number, datetime, select, grid
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
        isEditing: $scope.scQuestionModel ? false : true
      };

      // Load question type if it is defined
      var loadQuestionType = function(){
        if($scope.scQuestionModel) {
          $scope.questionType = $scope.scQuestionModel.question.toLowerCase();
        }
      };
      loadQuestionType();

      // Combo definition
      $scope.combo = {
        type: {
          text: [{name: 'TEXTO CORTO', value: 'SHORT'}, {name: 'TEXTO LARGO', value: 'LARGE'}],
          number: [{name: 'ENTERO', value: 'INTEGER'}, {name: 'DECIMAL', value: 'DECIMAL'}],
          datetime: [{name: 'FECHA', value: 'DATE'}, {name: 'HORA', value: 'TIME'}, {name: 'FECHA Y HORA', value: 'DATETIME'}],
          select: [{name: 'MULTIPLE', value: 'MULTIPLE'}, {name: 'VERIFICACION', value: 'VERIFICATION'}, {name: 'DESPLEGABLE', value: 'DROPDOWN'}],
          grid: []
        },
        section: [$scope.scSectionModel]
      };
      $scope.combo.selected = {
        type: undefined,
        section: $scope.scSectionModel
      };

      // Load combo if questions is defined
      var loadCombo = function () {
        if ($scope.scQuestionModel) {

          var validTypes;
          if($scope.questionType === 'text') {
            validTypes = $scope.combo.type.text;
          } else if($scope.questionType === 'number') {
            validTypes = $scope.combo.type.number;
          } else if($scope.questionType === 'datetime') {
            validTypes = $scope.combo.type.datetime;
          } else if($scope.questionType === 'select') {
            validTypes = $scope.combo.type.select;
          } else if($scope.questionType === 'grid') {
            validTypes = $scope.combo.type.grid;
          }

          for (var index in validTypes) {
            if (validTypes[index].value === $scope.scQuestionModel.type) {
              $scope.combo.selected.type = validTypes[index];
              break;
            }
          }

        }
      };
      loadCombo();

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

        $scope.view.question.question = $scope.questionType.toUpperCase();
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
        $scope.close();
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
