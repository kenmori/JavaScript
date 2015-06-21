var app = angular.module('app', []);

app.controller('SimpleController',
  ['$scope', function SimpleController($scope) {
    $scope.messages = [];
    $scope.addMessage = function (msg) {
      $scope.messages.push(msg);
    }
  }]);

app.filter('heavyFilter', function () {
  return function (value) {

    console.log('Heavy!');

    return value;
  };
});