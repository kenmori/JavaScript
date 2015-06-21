angular.module('app')
  .controller('ProductsController',
  ['$scope', 'productsService',
    function ($scope, productsService) {
      $scope.products = productsService.get();
    }]);
