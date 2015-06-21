var app = angular.module('app', []);

app.controller('notificationController', ['$scope', function ($scope) {
  $scope.items = [];
  $scope.addMessage = function (msg) {
    $scope.items.push({message: msg, time: new Date(), enableMessage: true});
  };
}]);
