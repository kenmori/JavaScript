var app = angular.module('app', []);

app.controller('SimpleController', ['$scope', function SimpleController($scope) {
  $scope.times = [
    new Date(),
    new Date('2014/6/18 14:00'),
    new Date('2014/6/18 10:00'),
    new Date('2014/6/10 14:00'),
    new Date('2014/3/18 17:30'),
    new Date('1971/6/09 10:00'),
    new Date('2014/6/18 17:00')
  ];
}]);
