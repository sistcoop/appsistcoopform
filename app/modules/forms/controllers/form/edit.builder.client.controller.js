'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.Edit.BuilderController',
  function ($scope, $state, $filter, toastr, form, SCForm) {

    $scope.working = false;

    $scope.view = {
      form: form
    };

    $scope.view.elementToCreate = {
      selected: undefined,
      section: $scope.view.form.SCSection().$build(),
      question: undefined,
      combo: {
        section: $scope.sections,
        selected: {
          section: undefined
        }
      },
      clear: function () {
        this.section = $scope.view.form.SCSection().$build();
        this.question = undefined;
        this.combo = {
          section: $scope.sections,
          selected: {
            section: undefined
          }
        }
      }
    };

    // Sections utils
    $scope.sections = [];
    $scope.loadSections = function () {
      $scope.view.form.SCSection().$getAll().then(function (response) {
        $scope.sections = [];
        addSection(response);
      });
    };
    $scope.loadSections();

    var addSection = function (section) {
      if (angular.isArray(section)) {
        $scope.sections = $filter('orderBy')($scope.sections.concat(section), 'number');
      } else {
        $scope.sections = $filter('orderBy')($scope.sections.concat([section]), 'number');
      }
    };
    var removeSection = function (index) {
      $scope.sections.splice(index, 1);
    };

    // Navbar methods
    $scope.createSectionElement = function () {
      $scope.working = true;
      $scope.view.elementToCreate.section.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion guardada');
          addSection(response);
          $scope.view.elementToCreate.clear();
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

    $scope.createQuestionElement = function () {
      $scope.working = true;
      var section = $scope.view.elementToCreate.combo.selected.section;
      var question = $scope.view.form.SCSection().$new(section.id).SCQuestion().$build();
      $scope.view.elementToCreate.question = angular.extend(question, $scope.view.elementToCreate.question);

      $scope.view.elementToCreate.question.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Pregunta guardada');
          section.questions.push(response);
          $scope.view.elementToCreate.clear();
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

    // Sections parts
    $scope.saveSection = function(section){
      $scope.working = true;
      section.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion guardada');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };
    $scope.removeSection = function(section, index){
      $scope.working = true;
      section.$remove().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion eliminada');
          removeSection(index);
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

    $scope.saveQuestion = function(question) {
      $scope.working = true;
      question.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Pregunta guardada');
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };
    $scope.removeQuestion = function(section, question, index){
      $scope.working = true;
      question.$remove().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion eliminada');
          section.questions.split(index, 1);
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  });
