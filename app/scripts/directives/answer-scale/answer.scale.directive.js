'use strict';

/* jshint -W098 */
angular.module('forms').directive('scAnswerScale', function () {
  return {
    restrict: 'E',
    scope: {

    },
    require: 'ngModel',
    replace: true,
    templateUrl: 'scripts/directives/answer-scale/answer.scale.html',
    controller: ['$scope', function ($scope) {

    }],
    link: function (scope, element, attrs, ngModel) {

    }
  };
});
