angular.module('app', [])
  .controller('NormalController', ['$scope', function ($scope) {
    $scope.message = "Hello, World!";
    $scope.getMessage = function () {
      console.log('getMessage');
      $scope.message = $scope.message + '!!';
      return $scope.message;
    };
  }]);