'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/forms/app', '/forms/app/menu01');
    $urlRouterProvider.when('/forms/app/menu01', '/forms/app/menu01/form');
    $urlRouterProvider.when('/forms/app/menu01/form', '/forms/app/menu01/form/search');
    //$urlRouterProvider.when('/formularios/app/encuesta/encuestas', ' /formularios/app/encuesta/encuestas/buscar');

    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        templateUrl: 'modules/forms/views/_body.html',
        controller: 'FormsController'
      })
      .state('forms.home', {
        url: '/home',
        templateUrl: 'modules/forms/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('forms.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('forms.app.menu01', {
        url: '/menu01',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('forms.app.menu02', {
        url: '/menu02',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('forms.app.menu03', {
        url: '/menu01',
        template: '<div ui-view></div>',
        abstract: true
      })

      //Direccion regional
      .state('forms.app.menu01.form', {
        url: '/form',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('forms.app.menu01.form.search', {
        url: '/search',
        templateUrl: 'modules/forms/views/menu01/form/form-search.html',
        controller: 'Forms.Form.SearchController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('forms.app.menu01.form.create', {
        url: '/create',
        templateUrl: 'modules/forms/views/menu01/form/form-create.html',
        controller: 'Forms.Form.CreateController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Crear encuesta',
          parent: 'forms.app.menu01.form.search'
        }
      })
      .state('forms.app.menu01.form.edit', {
        url: '/edit/:form',
        templateUrl: 'modules/forms/views/menu01/form/form-edit.html',
        resolve: {
          form: function ($state, $stateParams, SCForm) {
            return SCForm.$find($stateParams.form);
          }
        },
        controller: 'Forms.Form.EditController',
        ncyBreadcrumb: {
          label: 'Editar encuesta',
          parent: 'forms.app.menu01.form.search'
        }
      });

  }
]);
