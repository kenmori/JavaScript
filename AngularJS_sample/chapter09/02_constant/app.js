angular.module('app', [])
  .controller('ConstantController', ['$scope', 'ConstMessage', 'ConstValue', 'ConstFunc',
    function ($scope, ConstMessage, ConstValue, ConstFunc) {
      $scope.ConstMessage = ConstMessage;
      $scope.ConstValue = ConstValue;
      $scope.ConstFunc = ConstFunc;
    }]);
