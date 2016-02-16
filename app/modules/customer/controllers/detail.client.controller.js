'use strict';

/* jshint -W098 */
angular.module('customer').controller('Customer.DetailController', ['$scope', '$state', 'customerDetail',
  function ($scope, $state, customerDetail) {

    $scope.customerDetail = customerDetail.data;

  }
]);
