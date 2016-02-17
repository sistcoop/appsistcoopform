'use strict';

// Setting up sidebar
angular.module('formulario').controller('FormularioSidebarController',
  function ($scope, $menuItemsFormulario) {
    $scope.menuItems = formulario.prepareSidebarMenu().getAll();
  }
);
