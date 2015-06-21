angular.module('app')
  .controller('ServiceController',
  //['$scope', 'serviceService',
  ['$scope', 'serviceServiceWithPrivateMember',
    function ($scope, serviceService) {
      $scope.message = serviceService.message;
      $scope.value = serviceService.value;
      $scope.func = serviceService.add;
    }]);
