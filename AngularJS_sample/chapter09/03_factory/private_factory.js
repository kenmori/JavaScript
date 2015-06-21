angular.module('app')
  .factory('factoryServiceWithPrivateMember', function () {
    var privateValue = 123;
    var privateMethod = function (a, b) {
      return a * b;
    };
    var aService = {};
    aService.add = function (a, b) {
      return a + b;
    };
    return aService;
  });