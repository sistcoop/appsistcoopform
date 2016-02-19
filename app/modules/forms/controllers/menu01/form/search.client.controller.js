'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.SearchController',
    function ($scope, $state, SCForm) {

      SCForm.$getAll();
      $scope.paginationOptions = {
        page: 1,
        pageSize: 10
      };

      $scope.filterOptions = {
        filterText: undefined
      };

      $scope.gridOptions = {
        data: [],
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,

        paginationPageSizes: [10, 25, 50],
        paginationPageSize: 10
      };
      $scope.gridActions = {
        edit: function (row) {
          $state.go('^.edit', {form: row.id});
        }
      };

      $scope.search = function () {
        var criteria = {
          filterText: $scope.filterOptions.filterText,
          filters: [],
          orders: [],
          paging: $scope.paginationOptions
        };
        SCForm.$search(criteria).then(function(response){
          $scope.gridOptions.data = response.items;
          $scope.gridOptions.totalItems = response.totalSize;
        });
      };
      $scope.search();

    });
