angular.module('app')
  .controller('WatchGroupController', ['$scope', function ($scope) {
    $scope.greeting = 'Hello, World!';
    $scope.message2 = 'Hello, World!';
    $scope.message3 = 'Hello, World!';
    $scope.result = '';
    $scope.$watchGroup([
      function () {
        return $scope.greeting;
      },
      function () {
        return $scope.message2;
      },
      function () {
        return $scope.message3;
      }
    ], function (newValue, oldValue, scope) {
      scope.result = angular.toJson(newValue);
    });
  }]);