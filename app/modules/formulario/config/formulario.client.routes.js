'use strict';

// Setting up route
angular.module('formulario').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('formulario', {
        abstract: true,
        url: '/formularios',
        templateUrl: 'modules/formulario/views/_body.html',
        controller: 'FormularioController'
      })
      .state('formulario.home', {
        url: '/home',
        templateUrl: 'modules/formulario/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('formulario.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('formulario.app.menu01', {
        url: '/encuesta',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('formulario.app.menu02', {
        url: '/menu02',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('formulario.app.menu03', {
        url: '/menu01',
        template: '<div ui-view></div>',
        abstract: true
      })

      //Direccion regional
      .state('formulario.app.menu01.encuesta', {
        url: '/encuestas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('formulario.app.menu01.encuesta.buscar', {
        url: '/buscar',
        templateUrl: 'modules/formulario/views/menu01/encuesta/form-buscar.html',
        controller: 'Formulario.Encuesta.BuscarController',
        resolve: {

        },
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('formulario.app.menu01.encuesta.crear', {
        url: '/crear',
        templateUrl: 'modules/formulario/views/menu01/encuesta/form-crear.html',
        controller: 'Formulario.Encuesta.CrearController',
        resolve: {

        },
        ncyBreadcrumb: {
          label: 'Crear encuesta',
          parent: 'formulario.app.menu01.encuesta.buscar'
        }
      })
      .state('formulario.app.menu01.encuesta.editar', {
        url: '/editar/:encuesta',
        templateUrl: 'modules/formulario/views/menu01/encuesta/form-editar.html',
        resolve: {
          encuesta: function ($state, $stateParams, SGEncuesta) {
            return SGEncuesta.$find($stateParams.encuesta);
          }
        },
        controller: 'Formulario.Encuesta.EditarController',
        ncyBreadcrumb: {
          label: 'Editar encuesta',
          parent: 'formulario.app.menu01.encuesta.buscar'
        }
      });

  }
]);
