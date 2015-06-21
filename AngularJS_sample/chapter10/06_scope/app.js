var app = angular.module('app', []);

app.controller('MyController', ['$scope', function ($scope) {
  $scope.greeting = 'Hello, World!';
  $scope.do_something = function () {
    $scope.greeting = 'Goodbye, World!';
  };
}]);
