angular.module('app')
  .provider('MyService', function () {
    this.prefix = '<';
    this.setPrefix = function (p) {
      this.prefix = p;
    };
    this.suffix = '>';
    this.setSuffix = function (s) {
      this.suffix = s;
    };

    this.$get = function () {
      var aService = {};
      aService.message = this.prefix + 'This is my provider.' + this.suffix;
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
