'use strict';

// Configuring the Customers module
angular.module('forms').run(['Menus',
	function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Formularios',
      state: 'forms.app'
    });
	}
]);
