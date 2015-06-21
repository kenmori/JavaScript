var app = angular.module('app', []);
app.controller('ControllerA', ['$scope', 'SharedService',
  function ($scope, SharedService) {
    $scope.setValue = function (value) {
      SharedService.setValue('key', value)
    }

  }]);
app.controller('ControllerB', ['$scope', 'SharedService',
  function ($scope, SharedService) {
    $scope.getValue = function () {
      return SharedService.getValue('key');
    }
  }]);
