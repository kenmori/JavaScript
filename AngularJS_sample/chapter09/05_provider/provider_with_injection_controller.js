angular.module('app')
  .controller('ProviderWithInjectionController',
  ['$scope', 'ProviderWithInjection',
    function ($scope, ProviderWithInjection) {
      $scope.value = ProviderWithInjection;
    }]);
