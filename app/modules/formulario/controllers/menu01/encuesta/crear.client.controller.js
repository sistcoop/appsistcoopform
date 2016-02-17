'use strict';

/* jshint -W098 */
angular.module('formulario').controller('Formulario.Encuesta.CrearController',
    function ($scope, $state, toastr, SGDialog) {

      $scope.working = false;

      $scope.view = {};

      $scope.save = function(){
        SGDialog.confirm('Guardar', 'Estas seguro que quieres crear la encuesta?', function(){
          alert('Opcion no implementada');
        });
      };

    });
