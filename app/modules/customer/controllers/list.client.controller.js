'use strict';

/* jshint -W098 */
angular.module('customer').controller('Customer.ListController', ['$scope', '$state', 'SRACustomer',
  function ($scope, $state, SRACustomer) {

    $scope.customers = [];

    $scope.filterOptions = {
      filter: {},
      filterBy: '$',
      orderBy: undefined
    };

    $scope.combo = {
      orderBy: [
        {name: 'id', value: 'id'},
        {name: 'Customer Name', value: 'customername'},
        {name: 'Product Name', value: 'productname'},
        {name: 'status', value: 'status'}
      ],
      filterBy: [
        {name: 'Customer Name', value: 'customername'},
        {name: 'Product Name', value: 'productname'}
      ]
    };

    $scope.refresh = function() {
      $scope.filterOptions = {
        filter: {},
        filterBy: '$',
        orderBy: undefined
      };
    };

    $scope.search = function () {
      SRACustomer.$getAll().then(function(response){
        $scope.customers = response.data;
      });
    };
    $scope.search();

    $scope.edit = function (customer) {
      $state.go('app.customer.detail.notes', {customerId: customer.id});
    };

  }
]);
