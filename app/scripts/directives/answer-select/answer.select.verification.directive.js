'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerSelectVerification', function () {
  return {
    restrict: 'E',
    scope: {
      isRequired: '=',
      isActive: '=?',

      options: '='
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-select/answer.select.verification.html',
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

      scope.$watchCollection('selectedEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.selectedEditable) scope.selectedEditable = [];
          if(!scope.selectedNotEditable) scope.selectedNotEditable = [];
          var values = scope.selectedEditable.concat(scope.selectedNotEditable);
          ngModel.$setViewValue(values);
        }
      }, true);
      scope.$watchCollection('selectedNotEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.selectedEditable) scope.selectedEditable = [];
          if(!scope.selectedNotEditable) scope.selectedNotEditable = [];
          var values = scope.selectedEditable.concat(scope.selectedNotEditable);
          ngModel.$setViewValue(values);
        }
      }, true);
    }
  };
});
