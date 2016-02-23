'use strict';

/* jshint -W098 */
angular.module('forms').directive('scSection', function () {
  return {
    restrict: 'E',
    scope: {
      isEditing: '=',
      isWorking: '=',
      onSave: '&',
      onRemove: '&',

      scQuestions: '=',
      onQuestionSave: '&',
      onQuestionRemove: '&'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/section/section.html',
    controller: ['$scope', function ($scope) {
      $scope.open = function () {
        $scope.isEditing = true;
      };
      $scope.close = function() {
        $scope.isEditing = false;
      };
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.view = {};
      scope.view.section;

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.view.section = newValue;
      }, true);

      scope.$watch('view.section', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
          ngModel.$render();
        }
      }, true);

    }
  };
});
