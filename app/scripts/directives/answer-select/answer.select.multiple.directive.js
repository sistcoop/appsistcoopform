'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelectMultiple', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.multiple.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          scope.selected = newValue;
        }
      }, true);

      scope.$watchCollection('selectedNotEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          scope.selectedEditable = undefined;
          ngModel.$setViewValue([scope.selectedNotEditable]);
        }
      }, true);
      scope.$watchCollection('selectedEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          scope.selectedNotEditable = undefined;
          ngModel.$setViewValue([scope.selectedEditable]);
        }
      }, true);

    }
  };
});
