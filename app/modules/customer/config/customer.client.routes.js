'use strict';

// Setting up route
angular.module('customer').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app.customer', {
        url: '/customers',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true
        }
      })

      .state('app.customer.list', {
        url: '/list',
        templateUrl: 'modules/customer/views/list.html',
        controller: 'Customer.ListController',
        ncyBreadcrumb: {
          label: 'Customers'
        }
      })

      .state('app.customer.detail', {
        url: '/:customerId/detail',
        templateUrl: 'modules/customer/views/detail.html',
        controller: 'Customer.DetailController',
        resolve: {
          customerDetail: function ($state, $stateParams, SRACustomer) {
            return SRACustomer.$findDetail($stateParams.customerId);
          }
        },
        ncyBreadcrumb: {
          label: 'Customer detail',
          parent: 'app.customer.list'
        }
      })
      .state('app.customer.detail.notes', {
        url: '/notes',
        templateUrl: 'modules/customer/views/detail.notes.html',
        controller: 'Customer.Detail.NotesController',
        ncyBreadcrumb: {
          label: 'Notes'
        }
      })
      .state('app.customer.detail.visit', {
        url: '/visit',
        templateUrl: 'modules/customer/views/detail.visit.html',
        controller: 'Customer.Detail.VisitController',
        ncyBreadcrumb: {
          label: 'Visit'
        }
      });
  }
]);
