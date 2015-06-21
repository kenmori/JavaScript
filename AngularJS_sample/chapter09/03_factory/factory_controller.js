angular.module('app')
  .controller('FactoryController',
  ['$scope', 'factoryService',
    function ($scope, factoryService) {
      $scope.message = factoryService.message;
      $scope.value = factoryService.value;
      $scope.func = factoryService.add;
    }]);
