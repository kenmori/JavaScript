angular.module('app', [])
  .controller('NormalController', ['$scope', function ($scope) {
    $scope.message = "Hello, World!";
    $scope.goodbye = function () {
      $scope.message = 'Goodbye, Everyone!';
    }
  }]);