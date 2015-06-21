angular.module('app', [])
  .controller('RootScopeController', ['$rootScope', function ($rootScope) {
    $rootScope.setMessage = function (message) {
      $rootScope.message = message;
    };
    $rootScope.getMessage = function () {
      return $rootScope.message;
    };
  }]);