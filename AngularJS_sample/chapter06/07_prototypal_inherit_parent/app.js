angular.module('app', [])
  .controller('ParentController2', ['$scope', function ($scope) {
    $scope.value = 123;
    $scope.data = { value: 456 };
  }])
  .controller('ChildController2', ['$scope', function ($scope) {
    $scope.changeValue = function () {
      $scope.$parent.value = 321;
      $scope.data.value = 654;
    };
  }]);

