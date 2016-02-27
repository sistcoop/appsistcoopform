'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.FormAnswer.EditController',
  function ($scope, $state, $filter, toastr, formAnswer, SGDialog, SCForm) {

    $scope.working = false;

    $scope.view = {
      form: angular.extend(SCForm.$build(), formAnswer.form),
      formAnswer: formAnswer
    };

    $scope.paginationOptions = {
      page: 1
    };

    var loadAnswerOfQuestion = function (question) {
      question.SCAnswer().$getAll().then(function (response) {
        if(response && response.length) {
          question.answer = response[0];
        }
        else {
          question.answer = question.SCAnswer().$build();
        }
      });
    };

    var loadQuestionsOfSection = function (section) {
      $scope.view.form.SCSection().$new(section.id).SCQuestion().$getAll().then(function (response) {
        section.questions = $filter('orderBy')(response, 'number');
        angular.forEach(section.questions, function(question) {
          loadAnswerOfQuestion(question);
        });
      });
    };

    $scope.loadSections = function () {
      $scope.view.form.SCSection().$getAll().then(function (response) {
        $scope.sections = $filter('orderBy')(response, 'number');;
        angular.forEach($scope.sections, function(section) {
          loadQuestionsOfSection(section);
        });
      });
    };
    $scope.loadSections();

    $scope.saveSection = function () {
      $scope.working = true;
      var section = $scope.sections[$scope.paginationOptions.page -1];
      var questions = section.questions;
      $scope.view.formAnswer.SCAnswer().$saveAll(questions).then(
        function (response) {
          $scope.working = false;
          toastr.success('Respuestas guardadas');
          $state.go('^.edit', {form: response.id});
        },
        function error(err){
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

  });
