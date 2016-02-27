'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelect', function () {
  return {
    restrict: 'E',
    scope: {
      type: '=',
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.answer;

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.answer = newValue;
      }, true);

      scope.$watch('answer', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
          ngModel.$render();
        }
      }, true);
    }
  };
});
