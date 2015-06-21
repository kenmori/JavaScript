(function () {
  var MyService = function (a, b) {
    return a + b;
  };
  angular.module('app', []).value('addService', MyService);
})();

(function () {
  var MyController = function ($scope, addService) {
    $scope.x = addService(12, 34);
  };
  angular.module('app').controller('myController', MyController);
})();