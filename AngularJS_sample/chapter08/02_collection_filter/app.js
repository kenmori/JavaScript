var app = angular.module('app', []);

app.controller('SimpleController', function SimpleController($scope) {
  $scope.items = [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'Fizz Buzz'];
});

