'use strict';

// Setting up sidebar
angular.module('forms').controller('FormsSidebarController',
  function ($scope, $menuItemsForms) {
    $scope.menuItems = $menuItemsForms.prepareSidebarMenu().getAll();
  }
);
