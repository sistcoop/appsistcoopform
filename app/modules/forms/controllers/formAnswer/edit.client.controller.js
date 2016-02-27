'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.FormAnswer.EditController',
  function ($scope, $state, $filter, toastr, formAnswer, SGDialog, SCForm) {

    $scope.view = {
      form: angular.extend(SCForm.$build(), formAnswer.form),
      formAnswer: formAnswer
    };

    $scope.paginationOptions = {
      page: 0
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
        section.questions = response;
        angular.forEach(section.questions, function(question) {
          loadAnswerOfQuestion(question);
        });
      });
    };

    $scope.loadSections = function () {
      $scope.view.form.SCSection().$getAll().then(function (response) {
        $scope.sections = response;
        angular.forEach($scope.sections, function(section) {
          loadQuestionsOfSection(section);
        });
      });
    };
    $scope.loadSections();

  });
