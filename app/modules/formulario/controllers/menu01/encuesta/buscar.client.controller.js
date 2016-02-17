'use strict';

/* jshint -W098 */
angular.module('formulario').controller('Formulario.Encuesta.BuscarController',
    function ($scope, $state) {

      $scope.encuestas = [{name: 'nombre', title: 'titulo'}];
      $scope.query;

    });
