angular.module('app', [])
  .controller('PublisherController', ['$scope', function ($scope) {
    $scope.emitMessage = function () {
      $scope.$emit('MyEvent', $scope.inputText + ' by emit');
    };
    $scope.broadcastMessage = function () {
      $scope.$broadcast('MyEvent', $scope.inputText + ' by broadcast');
    };
  }])
  .controller('UpperSubscriberController', ['$scope', function ($scope) {
    $scope.$on('MyEvent', function (event, data) {
      $scope.upperMessage = data;
    });
  }])
  .controller('LowerSubscriberController1', ['$scope', function ($scope) {
    $scope.$on('MyEvent', function (event, data) {
      $scope.lowerMessage1 = data;
    });
  }])
  .controller('LowerSubscriberController2', ['$scope', function ($scope) {
    $scope.$on('MyEvent', function (event, data) {
      event.preventDefault()
      $scope.lowerMessage2 = data;
    });
  }]);
