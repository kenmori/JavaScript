angular.module('app', [])
  .controller('ParentController', ['$scope', function ($scope) {
    $scope.value = 'parent value';
    $scope.getUpperValue = function () {
      return angular.uppercase($scope.value);
    }
  }])
  .controller('ChildController', ['$scope', function ($scope) {
    $scope.newValue = 'child value';
  }]);
