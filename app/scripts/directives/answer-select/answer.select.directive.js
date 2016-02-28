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
      $scope.editableValues = [];
      $scope.notEditableValues = [];
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.editableValues = [];
      scope.notEditableValues = [];

      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if(newValue) {
          scope.editableValues = [];
          scope.notEditableValues = [];

          for(var i = 0; i < newValue.length; i++) {
            if(newValue[i].editable)
              scope.editableValues.push(newValue[i]);
            else {
              scope.notEditableValues.push(newValue[i]);
            }
          }
        }
      }, true);

      scope.$watchCollection('editableValues', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.editableValues) scope.editableValues = [];
          if(!scope.notEditableValues) scope.notEditableValues = [];

          console.log(scope.prueba);
          var values = [];
          values = values.concat(scope.editableValues).concat(scope.notEditableValues);
          ngModel.$setViewValue(values);
          ngModel.$render();
        }
      }, true);
      scope.$watchCollection('notEditableValues', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(!scope.editableValues) scope.editableValues = [];
          if(!scope.notEditableValues) scope.notEditableValues = [];

          var values = [];
          values = values.concat(scope.editableValues).concat(scope.notEditableValues);
          ngModel.$setViewValue(values);
          console.log(values);
          ngModel.$render();
        }
      }, true);
    }
  };
});
