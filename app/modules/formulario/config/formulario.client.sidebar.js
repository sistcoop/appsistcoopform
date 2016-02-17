'use strict';

// Setting up sidebar
angular.module('formulario').controller('FormularioSidebarController',
  function ($scope, $menuItemsFormulario) {
    $scope.menuItems = $menuItemsFormulario.prepareSidebarMenu().getAll();
  }
);
