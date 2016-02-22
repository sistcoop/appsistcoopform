'use strict';

/* jshint -W098 */
angular.module('forms').directive('scSelect', function () {
  return {
    restrict: 'E',
    scope: {
      type: '=',
      disabled:'=ngDisabled'
    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/select/select.html',
    controller: ['$scope', function ($scope) {
      $scope.elements = [];
      $scope.type = $scope.type.toLowerCase();

      // Functions to add and remove element
      $scope.addElement = function () {
        if (!$scope.elements) $scope.elements = [];
        var elementNumber = $scope.elements.length + 1;
        $scope.elements.push({
          id: undefined,
          number: elementNumber,
          denomination: 'Opcion' + elementNumber,
          editable: false
        });
      };
      $scope.addEditableElement = function () {
        if (!$scope.elements) $scope.elements = [];
        var elementNumber = $scope.elements.length + 1;
        $scope.elements.push({id: undefined, number: elementNumber, denomination: 'Otro', editable: true});
      };
      $scope.removeElement = function (index) {
        $scope.elements.splice(index, 1);
      };
    }],
    link: function (scope, element, attrs, ngModel) {
      scope.$watch(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        scope.elements = newValue;
      }, true);

      scope.$watch('elements', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          ngModel.$setViewValue(newVal);
        }
      }, true);
    }
  };
});
