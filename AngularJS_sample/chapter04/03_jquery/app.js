angular.module('app', [])
  .controller('jQueryController', ['$scope', function ($scope) {
    $scope.jqueryFunctions = [];
    for (var prop in angular.element) {
      if (angular.isFunction(angular.element[prop])) {
        $scope.jqueryFunctions.push(prop);
      }
    }

    $scope.jqueryObjectFunctions = [];
    var obj = angular.element(document);
    for (var prop in obj) {
      if (angular.isFunction(obj[prop])) {
        $scope.jqueryObjectFunctions.push(prop);
      }
    }
  }]);
