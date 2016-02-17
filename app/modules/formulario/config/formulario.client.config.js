'use strict';

// Configuring the Customers module
angular.module('formulario').run(['Menus',
	function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Formularios',
      state: 'app.formulario'
    });
	}
]);
