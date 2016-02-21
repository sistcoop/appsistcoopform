'use strict';

/* jshint -W098 */
angular.module('forms').directive('scSection', function () {
  return {
    restrict: 'AE',
    scope: {
      formModel: '=',
      sectionModel: '=',
      onClose: '&',
      onTransaction: '&'
    },
    replace: true,
    templateUrl: 'modules/forms/directives/section/section.html',
    controller: ['$scope', '$filter','toastr', 'SGDialog', 'SCForm', function ($scope, $filter, toastr, SGDialog, SCForm) {

      $scope.working = false;

      $scope.view = {};
      if($scope.sectionModel) {
        $scope.view.form = $scope.sectionModel;
      } else {
        $scope.view.form = SCForm.$new($scope.formModel.id).SCSection().$build();
      }

      if($scope.view.form.id) {
        $scope.sectionModel.SCQuestion().$getAll(function(response){
          $scope.questions = $filter('orderBy')(response, 'number');
        });
      }

      $scope.save = function () {
        $scope.working = true;
        $scope.view.form.$save().then(
          function () {
            $scope.working = false;
            toastr.success('Seccion guardada');
            $scope.onTransaction();
            $scope.editing = false;
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      };

      $scope.edit = function() {
        $scope.editing = true;
      };
      $scope.remove = function() {
        SGDialog.confirmDelete($scope.view.form.title, 'seccion', function() {
          $scope.working = true;
          $scope.view.form.$remove().then(
            function () {
              $scope.working = false;
              toastr.success('Seccion eliminada');
              $scope.onTransaction();
              $scope.editing = false;
            },
            function error(err) {
              $scope.working = false;
              toastr.error(err.data.errorMessage);
            }
          );
        });
      };

    }],
    link: function (scope, element) {

    }
  };
});
