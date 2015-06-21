angular.module('app', [])
  .controller('SampleController', ['$scope', function ($scope) {
    $scope.message = "Hello, World!";
  }]);