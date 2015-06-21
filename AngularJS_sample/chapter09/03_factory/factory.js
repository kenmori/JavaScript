angular.module('app')
  .factory('factoryService', function () {
    var aService = {};
    aService.message = 'This is my factory!';
    aService.value = {
      value1: 11111,
      value2: 22222
    };
    aService.add = function (a, b) {
      return a + b;
    };
    return aService;
  });