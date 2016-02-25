'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/forms/app', '/forms/app/form');
    $urlRouterProvider.when('/forms/app/form', '/forms/app/form/search');

    $urlRouterProvider.when('/forms/app/form/edit/:form', '/forms/app/form/edit/:form/summary');

    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        template: '<div ui-view></div>',
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

      //Direccion regional
      .state('forms.app.form', {
        url: '/form',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('forms.app.answer', {
        url: '/answer',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('forms.app.result', {
        url: '/answer',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('forms.app.form.search', {
        url: '/search',
        templateUrl: 'modules/forms/views/form/form-search.html',
        controller: 'Forms.Form.SearchController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('forms.app.form.create', {
        url: '/create',
        templateUrl: 'modules/forms/views/form/form-create.html',
        controller: 'Forms.Form.CreateController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear encuesta',
          parent: 'forms.app.form.search'
        }
      })
      .state('forms.app.form.edit', {
        url: '/edit/:form',
        templateUrl: 'modules/forms/views/form/form-edit.html',
        resolve: {
          form: function ($state, $stateParams, SCForm) {
            return SCForm.$find($stateParams.form);
          }
        },
        controller: 'Forms.Form.EditController',
        ncyBreadcrumb: {
          label: 'Editar encuesta',
          parent: 'forms.app.form.search'
        }
      })
      .state('forms.app.form.edit.summary', {
        url: '/summary',
        templateUrl: 'modules/forms/views/form/form-edit-summary.html',
        controller: 'Forms.Form.Edit.SummaryController',
        resolve: {
        },
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('forms.app.form.edit.principaldata', {
        url: '/principaldata',
        templateUrl: 'modules/forms/views/form/form-edit-principaldata.html',
        controller: 'Forms.Form.Edit.PrincipalDataController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('forms.app.form.edit.builder', {
        url: '/builder',
        templateUrl: 'modules/forms/views/form/form-edit-builder.html',
        controller: 'Forms.Form.Edit.BuilderController',
        resolve: {
        },
        ncyBreadcrumb: {
          label: 'Editor'
        }
      });

  }
]);
