angular.module('app', [])
  .controller('ParentController1', ['$scope', function ($scope) {
    $scope.value = 128;
    $scope.incrementValue = function () {
      this.value++;
    };
  }])
  .controller('ChildController1', ['$scope', function ($scope) {
    $scope.decrementValue = function () {
      this.value--;
    };
  }]);
