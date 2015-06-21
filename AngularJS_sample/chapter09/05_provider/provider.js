angular.module('app')
  .provider('MyService', function () {
    this.$get = function () {
      var aService = {};
      aService.message = 'This is my provider.';
      aService.value = {
        value1: 11111,
        value2: 77777
      };
      aService.add = function (a, b) {
        return a + b;
      };
      return aService;
    };
  });
