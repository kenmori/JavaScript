angular.module('app')
  .controller('WatchController', ['$scope', function ($scope) {
    $scope.message = 'Hello, World!';
    $scope.result = '';
    $scope.$watch('message', function (newValue, oldValue, scope) {
      if (angular.equals(newValue, 'success')) {
        scope.result = 'ok';
      }
    });
  }]);