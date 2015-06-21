var app = angular.module('app', []);
app.controller('timeout', ['$scope', '$timeout', function ($scope, $timeout) {
  var count = 0;
  $scope.count = count;
  var tp = $timeout(function () {
    $scope.count = 100;
  }, 100);
  $timeout.cancel(tp);
}]);
