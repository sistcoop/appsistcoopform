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
          for(var i = 0; i < scope.options.length; i++) {
            if(scope.options[i].denomination === newValue[0]) {
              if(scope.options[i].editable) {
                scope.selectedEditable = newValue[0]; break;
              } else {
                scope.selectedNotEditable = newValue[0]; break;
              }
            }
          }
        }
      }, true);

      scope.$watchCollection('selectedNotEditable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
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
