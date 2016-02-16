'use strict';

// Configuring the Customers module
angular.module('customer').run(['Menus',
	function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Customers',
      state: 'app.customer.list'
    });
	}
]);
