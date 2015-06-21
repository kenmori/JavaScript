angular.module('app')
  .controller('WatchCollectionController', ['$scope', function ($scope) {
    $scope.items = [];
    $scope.result = '';
    $scope.$watchCollection('items', function (newCollection, oldCollection, scope) {
      if (newCollection.length == 3) {
        scope.result = 'ok';
      }
    });
  }]);