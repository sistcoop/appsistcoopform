'use strict';

/* jshint -W098 */
angular.module('customer').controller('Customer.Detail.NotesController', ['$scope', '$state', 'toastr', 'customerDetail', 'SGDialog', 'SRACustomer',
  function ($scope, $state, toastr, customerDetail, SGDialog, SRACustomer) {

    // Disable Save button on submit for prevent double submit
    $scope.working = false;

    $scope.view = {
      notes: undefined,
      status: undefined
    };

    $scope.combo = {
      status: [
        {value: 'New', name: 'New'},
        {value: 'InProgress', name: 'In Progress'},
        {value: 'OrderPlaced', name: 'Order Placed'},
        {value: 'Support', name: 'Support'},
        {value: 'Cancelled', name: 'Cancelled'},
        {value: 'Rejected', name: 'Rejected'}
      ]
    };

    $scope.save = function () {
      SGDialog.confirm('Save', 'Are you sure to save the Note?', function () {
        SRACustomer.$saveNote($scope.view).then(function (response) {
          $scope.working = true;
          toastr.success('Note successfully saved.');
          $state.reload();
        });
      });
    };

    $scope.clear = function() {
      $scope.view = {
        notes: undefined,
        status: undefined
      };
    };

  }
]);
