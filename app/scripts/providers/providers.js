'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).config( ['$compileProvider',function( $compileProvider ) {
  //For Skype calls
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|skype):/);
}]);
