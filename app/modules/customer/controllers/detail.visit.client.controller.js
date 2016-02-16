'use strict';

/* jshint -W098 */
angular.module('customer').controller('Customer.Detail.VisitController', ['$scope', '$state', 'toastr', 'customerDetail', 'SGDialog', 'SRACustomer',
  function ($scope, $state, toastr, customerDetail, SGDialog, SRACustomer) {

    // Disable Save button on submit for prevent double submit
    $scope.working = false;

    $scope.view = {
      date: undefined,
      time: undefined,
      notes: undefined,
      action: undefined
    };

    $scope.combo = {
      action: [
        {value: 'Offer', name: 'Offer'},
        {value: 'Lead', name: 'Lead'},
        {value: 'Opportunity', name: 'Opportunity'},
        {value: 'New Customer', name: 'New Customer'}
      ]
    };

    $scope.save = function () {
      SGDialog.confirm('Save', 'Are you sure to save the Visit?', function () {
        $scope.working = true;
        SRACustomer.$saveVisit($scope.view).then(function (response) {
          $scope.working = false;
          toastr.success('Visit successfully saved.');
          $state.reload();
        });
      });
    };

    $scope.clear = function () {
      $scope.view = {
        date: undefined,
        time: undefined,
        notes: undefined,
        action: undefined
      };
    }

  }
]);
