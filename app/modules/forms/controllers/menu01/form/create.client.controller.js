'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.CreateController',
    function ($scope, $state, toastr, SGDialog, SCForm) {

      $scope.working = false;

      $scope.form = SCForm.$build();

      $scope.save = function(){
        SGDialog.confirm('Guardar', 'Estas seguro que quieres crear la encuesta?', function(){
          $scope.working = true;
          $scope.form.$save().then(
            function (response) {
              $scope.working = false;
              toastr.success('Encuesta Guardada satisfactoriamente');
            },
            function error(err){
              $scope.working = false;
              toastr.error('Error al guardar, intentelo nuevamente');
            }
          );
        });
      };

    });
