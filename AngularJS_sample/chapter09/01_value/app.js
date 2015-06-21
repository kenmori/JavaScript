angular.module('app', [])
  .controller('ValueController', ['$scope', 'MyMessage', 'MyValue', 'MyFunc',
    function ($scope, MyMessage, MyValue, MyFunc) {
      $scope.MyMessage = MyMessage;
      $scope.MyValue = MyValue;
      $scope.MyFunc = MyFunc;
    }]);
