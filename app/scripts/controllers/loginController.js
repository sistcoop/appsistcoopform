angular.module(ApplicationConfiguration.applicationModuleName)
  .controller('LoginController', function ($scope, $state, toastr, CryptoUtil, SRAAuth, Auth) {

    $scope.failed = false;

    $scope.user = {
      username: undefined,
      password: undefined
    };

    $scope.login = function () {
      var hash = CryptoUtil.MD5Base64Encoded($scope.user.password);
      var token = CryptoUtil.getRandomToken();
      var input = {
        token: token,
        digest: CryptoUtil.MD5Base64Encoded($scope.user.username + ',' + hash + ',' + token),
        user: {username: $scope.user.username, password: hash}
      };

      SRAAuth.$login(input).then(
        function (response) {
          if (response.sessionId) {
            $scope.failed = false;
            Auth.init(response);
            $state.go('app.home');
          } else {
            $scope.failed = true;
            toastr.error('Username and/or password incorrect.');
          }
        }, function error(err) {
          toastr.error(err);
        }
      );
    };

  }
);
