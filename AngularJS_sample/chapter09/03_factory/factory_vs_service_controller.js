angular.module('app')
  .controller('FactoryVsServiceController',
  ['$scope', 'MyServiceByService', 'MyServiceByFactory',
    function ($scope, MyServiceByService, MyServiceByFactory) {
      $scope.messageByService = MyServiceByService.message;
      $scope.valueByService = MyServiceByService.value;
      $scope.funcByService = MyServiceByService.add;

      $scope.messageByFactory = MyServiceByFactory.message;
      $scope.valueByFactory = MyServiceByFactory.value;
      $scope.funcByFactory = MyServiceByFactory.add;
    }]);
