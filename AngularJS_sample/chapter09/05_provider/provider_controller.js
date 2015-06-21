angular.module('app')
  .controller('ProviderController',
  ['$scope', 'MyService',
    function ($scope, MyService) {
      $scope.message = MyService.message;
      $scope.value = MyService.value;
      $scope.func = MyService.add;
    }]);
